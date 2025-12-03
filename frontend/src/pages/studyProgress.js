import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import TaleView from "../component/taleView";
import { getTale } from "../api/tale";
import { imageBaseUrl } from "../api/instance";
import { unknownWordsAPI } from "../api/child";
import styles from "./studyProgress.module.css";

const StudyProgress = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const taleId = location.state?.taleId;

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [tale, setTale] = useState({
    title: "",
    contents: [],
    imageUrls: [],
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedWords, setSelectedWords] = useState([]);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchTale = async () => {
      try {
        const response = await getTale(taleId);
        const data = response.data?.responseDto || {};

        setTale({
          title: data.title || "",
          contents: data.contents || [],
          imageUrls: data.imageUrls || [],
        });

        setTotalPages(data.contents?.length || 1);
      } catch (e) {
        setError("동화를 불러오는 중 문제가 발생했어요.");
      } finally {
        setLoading(false);
      }
    };
    fetchTale();
  }, [taleId]);

  const handleWordsChange = (words) => {
    console.log("[StudyProgress] 선택된 단어 목록 업데이트:", words);
    setSelectedWords(words);
  };

  const handleFinish = async () => {
    const selectedChild = JSON.parse(localStorage.getItem("selectedChild"));
    const childId = selectedChild?.id;

    if (!childId) {
      alert("프로필을 먼저 선택해주세요.");
      navigate("/loginProfile");
      return;
    }

    try {
      setSubmitting(true);
      let wordResponse = null;
      if (selectedWords.length > 0) {
        console.log(
          "[StudyProgress] FINISH 클릭 - API 호출 전 선택된 단어들:",
          selectedWords
        );
        const res = await unknownWordsAPI(childId, selectedWords);
        console.log("[StudyProgress] unknownWordsAPI 응답 데이터:", res?.data);
        wordResponse = res?.data ?? null;
      }

      navigate("/tale/feedback", {
        state: { taleId, childId, wordResponse },
      });
    } catch (e) {
      console.error("모르는 단어 저장 실패:", e);
      navigate("/tale/feedback", { state: { taleId, childId } });
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <div className={styles.page}>불러오는 중…</div>;
  if (error) return <div className={styles.page}>{error}</div>;

  return (
    <div className={styles.page}>
      <TaleView
        submitting={submitting}
        selectedWords={selectedWords}
        title={tale.title}
        contents={tale.contents}
        imageUrls={tale.imageUrls}
        imageSrcBuilder={(src) => `${imageBaseUrl}${src}`}
        onPageChange={(p, total) => {
          setCurrentPage(p);
          setTotalPages(total);
        }}
        onWordsChange={handleWordsChange}
        onFinish={handleFinish} // 🔥 TaleView에서 FINISH 호출
        isLastPage={currentPage === totalPages} // 🔥 마지막 페이지 여부 전달
      />
    </div>
  );
};

export default StudyProgress;
