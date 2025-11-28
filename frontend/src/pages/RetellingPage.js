import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./RetellingPage.module.css";
import { getTale } from "../api/tale";
import { imageBaseUrl } from "../api/instance";
import { submitRetellingAPI } from "../api/retelling";

const RetellingPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const taleId = location.state?.taleId;

  const [taleTitle, setTaleTitle] = useState("");
  const [sceneImage, setSceneImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [answer, setAnswer] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!taleId) return;

    let mounted = true;
    const fetchTale = async () => {
      try {
        setLoading(true);
        const res = await getTale(taleId);
        const dto = res.data?.responseDto || {};

        if (!mounted) return;
        setTaleTitle(dto.title || "");

        const images = Array.isArray(dto.imageUrls) ? dto.imageUrls : [];
        if (images.length > 0) {
          const randomIndex = Math.floor(Math.random() * images.length);
          const raw = images[randomIndex];
          setSceneImage(raw ? `${imageBaseUrl}${raw}` : null);
        }
      } catch (err) {
        console.error("리텔링용 동화 불러오기 실패:", err);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchTale();
    return () => {
      mounted = false;
    };
  }, [taleId]);

  const handleBack = () => {
    if (taleId) {
      navigate("/tale/feedback", { state: { taleId } });
    } else {
      navigate("/studyMain");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!answer.trim()) {
      alert("장면에서 어떤 일이 일어났는지 한 번 적어볼까요?");
      return;
    }

    setIsSubmitting(true);
    try {
      // TODO: 백엔드에서 엔드포인트 확정 시 submitRetellingAPI 내부 url 확인
      await submitRetellingAPI({ taleId, answer });
      alert("리텔링이 저장되었어요! (채점 기능은 준비 중입니다)");
      if (taleId) {
        navigate("/tale/feedback", { state: { taleId } });
      } else {
        navigate("/studyMain");
      }
    } catch (err) {
      console.error("리텔링 제출 오류:", err);
      alert("리텔링을 저장하는 중 문제가 발생했어요. 잠시 후 다시 시도해 주세요.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>이 장면, 다시 들려줄래요?</h1>
      <p className={styles.subtitle}>
        동화 속 장면을 떠올리며, 그때 어떤 일이 일어났는지{" "}
        <strong>내 말로 다시 써 보는</strong> 연습이에요.
      </p>

      <div className={styles.contentRow}>
        <section className={styles.sceneCard}>
          <h2 className={styles.sceneTitle}>
            {taleTitle ? `「${taleTitle}」의 한 장면` : "리텔링할 장면 힌트"}
          </h2>
          <p className={styles.sceneHint}>
            아래 그림을 잘 보고, 등장인물·장소·사건을 중심으로 다시 적어 보세요.
          </p>
          <div className={styles.sceneImageBox}>
            {loading && (
              <p className={styles.sceneText}>장면을 불러오는 중이에요...</p>
            )}
            {!loading && sceneImage && (
              <img
                src={sceneImage}
                alt="리텔링할 동화 장면"
                className={styles.sceneImage}
              />
            )}
            {!loading && !sceneImage && (
              <p className={styles.sceneText}>
                방금 읽은 동화의 가장 기억에 남는 장면을 떠올리며 적어보면
                좋아요.
              </p>
            )}
          </div>
        </section>

        <form className={styles.formCard} onSubmit={handleSubmit}>
          <label className={styles.label}>
            이 장면에서 어떤 일이 일어났나요?
          </label>
          <textarea
            className={styles.textarea}
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder="예: 숲 속에서 개미가 겨울을 준비하며 열심히 일하고 있었어요. 그런데 베짱이는 노래만 부르며 놀고 있었어요..."
          />
          <p className={styles.helper}>
            누가, 어디에서, 어떤 일을 했는지 순서대로 써 보세요. 나중에 AI가
            내용 이해도를 채점해 줄 예정이에요.
          </p>

          <div className={styles.buttonRow}>
            <button
              type="button"
              className={styles.ghostButton}
              onClick={handleBack}
              disabled={isSubmitting}
            >
              단어 복습으로 돌아가기
            </button>
            <button
              type="submit"
              className={styles.primaryButton}
              disabled={isSubmitting}
            >
              {isSubmitting ? "제출 중..." : "리텔링 제출하기"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RetellingPage;
