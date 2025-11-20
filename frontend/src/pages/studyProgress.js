import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import TaleView from "../component/taleView";
import { getTale } from "../api/tale"; // 새 동화 조회용
import { imageBaseUrl } from "../api/instance";
import styles from "./studyProgress.module.css";

const StudyProgress = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const taleId = location.state?.taleId; //지난 페이지에서 전달된 taleId

  console.log("받은 taleId:", taleId);

  // 상태 관리
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [tale, setTale] = useState({
    title: "",
    contents: [],
    imageUrls: [],
  });

  // 동화 데이터 불러오기
  useEffect(() => {
    let mounted = true;

    if (!taleId) {
      setError("동화 전달 오류");
      setLoading(false);
      return undefined;
    }

    const fetchTale = async () => {
      setLoading(true);
      setError("");
      try {
        const response = await getTale(taleId);
        const taleData = response.data?.responseDto || {};

        if (!mounted) return;

        setTale({
          title: taleData.title || "",
          contents: Array.isArray(taleData.contents) ? taleData.contents : [],
          imageUrls: Array.isArray(taleData.imageUrls)
            ? taleData.imageUrls
            : [],
        });
      } catch (error) {
        console.error("Error fetching tale: ", error);
        if (!mounted) return;
        setError("동화를 불러오는 중 문제가 발생했어요.");
      } finally {
        if (mounted) setLoading(false);
      }
    };
    fetchTale();
    return () => {
      mounted = false;
    };
  }, [taleId]);

  const handleReport = () => {
    navigate("/tale/report", { state: { taleId: taleId } });
  };

  if (loading) {
    return (
      <div className={styles.page}>
        <div className={styles.stateMessage}>동화를 불러오는 중입니다…</div>
      </div>
    );
  }

  // 에러일 때
  if (error) {
    return (
      <div className={styles.page}>
        <div className={`${styles.stateMessage} ${styles.error}`}>{error}</div>
      </div>
    );
  }

  // 메인 렌더링
  return (
    <div className={styles.page}>
      <TaleView
        title={tale.title}
        contents={tale.contents}
        imageUrls={tale.imageUrls}
        imageSrcBuilder={(src) => (src ? `${imageBaseUrl}${src}` : src)}
        renderFooter={({ page, totalPages }) =>
          totalPages > 0 && page === totalPages ? (
            <button
              type="button"
              className={styles.quizBtn}
              onClick={handleReport}
            >
              REPORT
            </button>
          ) : null
        }
      />
    </div>
  );
};

export default StudyProgress;
