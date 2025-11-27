import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./parentDetail.module.css";
import { defaultInstance, reportInstance, imageBaseUrl } from "../api/instance";
import book from "../assets/fairy.png";

export default function ChildDetail() {
  const { childId } = useParams();
  const navigate = useNavigate();

  // 백엔드 응답 저장
  const [childDetail, setChildDetail] = useState(null);

  // 리포트 목록
  const [reportList, setReportList] = useState([]);
  const [isReportListOpen, setIsReportListOpen] = useState(false);

  const totalReports = childDetail?.reportSummary?.totalCount ?? 0;

  useEffect(() => {
    if (!childId) return;

    async function loadChildDetail() {
      try {
        const res = await defaultInstance.get(`/mypage/${childId}`);
        setChildDetail(res.data.responseDto); 
      } catch (e) {
        console.error("조회 실패", e);
      }
    }

    loadChildDetail();
  }, [childId]);

  // 독후감 작성 책 목록을 가져옴
  useEffect(() => {
    const fetchReviewTitles = async () => {
      try {
        const res = await reportInstance.get(`/child/${childId}`);
        setReportList(res.data.responseDto || []);
      } catch (e) {
        console.error("리뷰 제목 목록 조회 실패", e);
      }
    };

    fetchReviewTitles();
  }, [childId]);

  // 리포트 목록 가져오기
  const loadReportList = async () => {
    try {
      const res = await reportInstance.get(`/child/${childId}`);
      setReportList(res.data.responseDto);
      setIsReportListOpen(true);
    } catch (e) {
      console.error("리포트 목록 조회 실패", e);
    }
  };

  if (!childDetail) return <div>로딩중...</div>;

  return (
    <>
      <div className={styles.page}>
        <button className={styles.backButton} onClick={() => navigate("/parentMain")}>
          ← 목록으로
        </button>

        <section className={styles.childSummary}>
          <div className={styles.headerBox}>

            {/* 최근 읽은 책 이미지 */}
            <img
              src={
                childDetail.recentTale?.thumbnail
                  ? `${imageBaseUrl}${childDetail.recentTale.thumbnail}`
                  : book
              }
              alt="book cover"
              className={styles.bookImg}
            />

            <div className={styles.childInfo}>
              <h2>{childDetail.child?.name}</h2>

              {/* 최근 읽은 책 제목 */}
              <p>
                최근 읽은 책:{" "}
                <strong>{childDetail.recentTale?.title ?? "없음"}</strong>
              </p>

              {/* 리포트 개수 */}
              <div className={styles.reportOverview}>
                <div
                  className={styles.reportCount}
                  onClick={loadReportList}
                  style={{ cursor: "pointer" }}
                >
                  <span className={styles.reportLabel}>작성한 리포트</span>
                  <span className={styles.reportValue}>{totalReports}건</span>
                </div>
              </div>

              <div className={styles.reportBooks}> 
                {reportList.length > 0 ? (
                  reportList.map((r) => (
                    <span key={r.reviewId} className={styles.bookChip}>
                      {r.title}
                    </span>
                  ))
                ) : (
                  <span className={styles.reportEmpty}>작성한 책이 없습니다.</span>
                )}
              </div>

            </div>
          </div>
        </section>

        {/* 학습 주제 밸런스 */}
        <section className={styles.topicBalance}>
          <h3>학습 주제 밸런스</h3>
          <p className={styles.topicNote}>자녀의 학습 주제 편향을 한눈에 볼 수 있습니다.</p>

          <div className={styles.topicBars}>
          </div>
        </section>
      </div>

      {/* 리포트 팝업 */}
      {isReportListOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalPanel}>
            <div className={styles.modalHeader}>
              <h2>작성한 독후감 ({reportList.length}개)</h2>
              <button
                type="button"
                onClick={() => setIsReportListOpen(false)}
                className={styles.closeBtn}
              >
                ✕
              </button>
            </div>

            <div className={styles.modalBody}>
              {reportList.length === 0 ? (
                <p>아직 작성한 독후감이 없어요.</p>
              ) : (
                <ul className={styles.reportList}>
                  {reportList.map((r, index) => (
                    <li
                      key={r.reviewId || index}
                      className={styles.reportItem}
                      onClick={() => navigate(`/review/${r.reviewId}?from=parent`)}
                      style={{ cursor: "pointer" }}
                    >
                      {/* 제목 */}
                      <strong className={styles.reportItemTitle}>
                        {r.title}
                      </strong>

                      {/* 내용(memorableScene) */}
                      <p className={styles.reportSummary}>
                        {r.memorableScene || "내용 없음"}
                      </p>

                      {/* 날짜 */}
                      <span className={styles.reportDate}>
                        {(r.updatedAt || r.createdAt)?.split("T")[0]}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
