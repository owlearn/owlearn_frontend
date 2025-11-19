import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./reportPage.module.css";
import { submitReportAPI } from "../api/report";
import { getTale } from "../api/tale";

const emotionTags = [
  { label: "재미있었어요", tone: "lavender" },
  { label: "감동적이었어요", tone: "rose" },
  { label: "두근거렸어요", tone: "berry" },
  { label: "배울 게 많았어요", tone: "mint" },
  { label: "생각이 많아졌어요", tone: "sky" },
  { label: "다시 읽고 싶어요", tone: "sunset" },
];

const ReadingReflection = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const taleId = state?.taleId;

  const [selectedChild, setSelectedChild] = useState(null);
  const [storyInfo, setStoryInfo] = useState({
    title: state?.title || "",
  });
  const [storyLoading, setStoryLoading] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("selectedChild");
      setSelectedChild(stored ? JSON.parse(stored) : null);
    } catch (error) {
      console.error("선택된 아이 정보 파싱 실패:", error);
      setSelectedChild(null);
    }
  }, []);

  useEffect(() => {
    let mounted = true;

    const fetchStory = async () => {
      if (!taleId) return;
      setStoryLoading(true);
      try {
        //동화 제목 가져옴
        const response = await getTale(taleId);
        const dto = response.data?.responseDto || {};
        if (!mounted) return;
        setStoryInfo({
          title: dto.title || "알 수 없는 동화",
        });
      } catch (error) {
        console.error("동화를 불러오지 못했습니다:", error);
      } finally {
        if (mounted) setStoryLoading(false);
      }
    };

    fetchStory();
    return () => {
      mounted = false;
    };
  }, [taleId]);

  // 입력 상태값
  const [selectedTags, setSelectedTags] = useState([]);
  const [rating, setRating] = useState(4);
  const [memorable, setMemorable] = useState("");
  const [lesson, setLesson] = useState("");
  const [questionText, setQuestionText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [payload, setPayload] = useState(null);

  //기분 태그 선택 및 해제
  const toggleTag = (tag) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((item) => item !== tag) : [...prev, tag]
    );
  };

  useEffect(() => {
    if (!taleId || !selectedChild?.id) {
      setPayload(null);
      return;
    }

    setPayload({
      childId: selectedChild.id,
      taleId,
      rating,
      feeling: selectedTags,
      memorableScene: memorable,
      lesson,
      question: questionText,
    });
  }, [
    selectedChild?.id,
    taleId,
    rating,
    selectedTags,
    memorable,
    lesson,
    questionText,
  ]);

  useEffect(() => {
    if (!payload) return;
    console.log("[payload]", payload);
  }, [payload]);

  //독후감 제출
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!taleId) return alert("동화 정보 오류");
    if (!selectedChild?.id) return alert("학생 정보 오류");

    const requestPayload = payload || {
      childId: selectedChild.id,
      taleId,
      rating,
      feeling: selectedTags,
      memorableScene: memorable,
      lesson,
      question: questionText,
    };

    console.log("[입력]", requestPayload);

    try {
      setIsSubmitting(true);

      await submitReportAPI(requestPayload);

      alert("독후감이 저장되었습니다!");
      navigate("/studyMain");
    } catch (error) {
      console.error("독후감 저장 실패:", error);
      alert("독후감 저장에 실패했습니다. 잠시 후 다시 시도해주세요.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.page}>
      <button
        type="button"
        className={styles.backButton}
        onClick={() => navigate(-1)}
      >
        ← 학습 목록으로
      </button>
      <header className={styles.hero}>
        <div className={styles.heroText}>
          <p className={styles.eyebrow}>독후감 작성</p>
          <h1 className={styles.heroTitle}>
            오늘 읽은 동화를
            <br />
            나만의 언어로 기록해요
          </h1>
          <p className={styles.subtitle}>
            느낀 감정, 기억에 남는 장면, 배운 점을 자유롭게 적어보세요.
          </p>
        </div>

        <div className={styles.storyCard}>
          <span className={styles.badge}>현재 작성 중</span>
          <h2>{storyInfo.title || "동화 정보를 불러오는 중..."}</h2>
          {/* {storyInfo.mood && <p className={styles.meta}>{storyInfo.mood}</p>}
          {storyInfo.summary && (
            <p className={styles.summary}>{storyInfo.summary}</p>
          )} */}
          {storyLoading && (
            <p className={styles.meta}>동화 정보를 불러오고 있어요...</p>
          )}
        </div>
      </header>

      <form className={styles.form} onSubmit={handleSubmit}>
        {/* 감정 태그 */}
        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <h3>읽고 난 지금의 기분</h3>
            <p>가장 가까운 느낌을 골라보세요. 여러 개 선택 가능해요.</p>
          </div>

          <div className={styles.tagList}>
            {emotionTags.map((tag) => (
              <button
                key={tag.label}
                type="button"
                className={`${styles.tagButton} ${styles[`tone-${tag.tone}`]} ${
                  selectedTags.includes(tag.label) ? styles.active : ""
                }`}
                onClick={() => toggleTag(tag.label)}
              >
                {tag.label}
              </button>
            ))}
          </div>
        </section>

        {/* 별점 */}
        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <h3>동화 리뷰</h3>
            <p>오늘의 동화를 별점으로 평가해볼까요?</p>
          </div>

          <div className={styles.ratingRow}>
            <div className={styles.stars}>
              {[1, 2, 3, 4, 5].map((value) => (
                <button
                  key={value}
                  type="button"
                  className={
                    value <= rating
                      ? `${styles.star} ${styles.starActive}`
                      : styles.star
                  }
                  onClick={() => {
                    setRating(value);
                    console.log("별점 선택:", value);
                  }}
                  aria-label={`${value}점`}
                >
                  ★
                </button>
              ))}
            </div>
            <span className={styles.ratingValue}>{rating} / 5</span>
          </div>
        </section>

        {/* 기억 남는 장면 & 배운 점 */}
        <section className={styles.section}>
          <div className={styles.sectionGrid}>
            <div className={styles.fieldCard}>
              <h3 htmlFor="memorable">가장 기억에 남는 장면</h3>
              <textarea
                id="memorable"
                placeholder="어떤 장면이 특히 기억에 남았나요?"
                value={memorable}
                onChange={(e) => setMemorable(e.target.value)}
                className={styles.textarea}
              />
            </div>

            <div className={styles.fieldCard}>
              <h3 htmlFor="lesson">이야기에서 배운 점</h3>
              <textarea
                id="lesson"
                placeholder="이 동화가 주는 메시지는 무엇인가요?"
                value={lesson}
                onChange={(e) => setLesson(e.target.value)}
                className={styles.textarea}
              />
            </div>
          </div>
        </section>

        {/* 질문 마무리 */}
        <section className={styles.section}>
          <div className={styles.fieldCard}>
            <h3 htmlFor="questionText">내 궁금증 작성하기</h3>

            <textarea
              id="questionText"
              placeholder="이야기를 읽으며 떠오른 궁금증을 적어보세요. 
              (예: 루루가 다시 나타나면 단이는 어떤 선택을 할까요?)"
              value={questionText}
              onChange={(e) => setQuestionText(e.target.value)}
              className={styles.textarea}
            />
          </div>
        </section>

        {/* 제출 버튼 */}
        <div className={styles.submitRow}>
          <button
            type="submit"
            className={styles.ghostButton}
            disabled={isSubmitting}
          >
            {isSubmitting ? "저장 중..." : "독후감 저장하기"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ReadingReflection;
