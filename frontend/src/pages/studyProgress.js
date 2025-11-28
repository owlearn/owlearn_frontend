import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import TaleView from "../component/taleView";
import { getTale } from "../api/tale";
import { imageBaseUrl } from "../api/instance";
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

  const handleFinish = () => {
    navigate("/tale/feedback", { state: { taleId } });
  };

  if (loading) return <div className={styles.page}>불러오는 중…</div>;
  if (error) return <div className={styles.page}>{error}</div>;

  return (
    <div className={styles.page}>
      <TaleView
        title={tale.title}
        contents={tale.contents}
        imageUrls={tale.imageUrls}
        imageSrcBuilder={(src) => `${imageBaseUrl}${src}`}
        onPageChange={(p, total) => {
          setCurrentPage(p);
          setTotalPages(total);
        }}
        onFinish={handleFinish} // 🔥 TaleView에서 FINISH 호출
        isLastPage={currentPage === totalPages} // 🔥 마지막 페이지 여부 전달
      />
    </div>
  );
};

export default StudyProgress;
