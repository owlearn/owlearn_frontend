import React, { useEffect, useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import styles from "./reportPage.module.css";

const emotionTags = [
  "재미있었어요",
  "감동적이었어요",
  "두근거렸어요",
  "배울 게 많았어요",
  "생각이 많아졌어요",
  "다시 읽고 싶어요",
];

const ReviewDetail = () => {
  const navigate = useNavigate();
  const { reviewId } = useParams();
  const location = useLocation();
  const search = new URLSearchParams(location.search);
  const from = search.get("from");

  const [loading, setLoading] = useState(true);
  const [review, setReview] = useState(null);
  const [taleTitle, setTaleTitle] = useState("");

  // 수정 모드 상태
  const [isEditMode, setIsEditMode] = useState(false);

  // 수정 데이터 상태
  const [editData, setEditData] = useState({
    feeling: [],
    rating: 0,
    memorableScene: "",
    lesson: "",
    question: ""
  });

  useEffect(() => {
  const fetchReview = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch(
        `${process.env.REACT_APP_URL}/api/review/${reviewId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const json = await res.json();
      const dto = json.responseDto;

      setReview(dto);

      if (from === "parent") {
        setTaleTitle("알 수 없는 동화");
        return; 
      }

      try {
        const taleRes = await fetch(
          `${process.env.REACT_APP_URL}/api/tale/${dto.taleId}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        if (taleRes.ok) {
          const taleJson = await taleRes.json();
          setTaleTitle(taleJson.responseDto?.title || "알 수 없는 동화");
        } else {
          console.log("조회 불가");
          setTaleTitle("알 수 없는 동화");
        }

      } catch (err) {
        console.log("조회 중 오류:", err);
        setTaleTitle("알 수 없는 동화");
      }

    } catch (err) {
      console.error("리뷰 조회 실패:", err);
    } finally {
      setLoading(false);
    }
  };

  fetchReview();
}, [reviewId, from]);


  const handleEdit = () => {
    setIsEditMode(true);

    setEditData({
      feeling: review.feeling || [],
      rating: review.rating || 0,
      memorableScene: review.memorableScene || "",
      lesson: review.lesson || "",
      question: review.question || ""
    });
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("token");

      await fetch(`${process.env.REACT_APP_URL}/api/review/${reviewId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(editData)
      });

      alert("수정되었습니다.");
      setIsEditMode(false);

      // 화면에 반영
      setReview((prev) => ({ ...prev, ...editData }));

    } catch (err) {
      console.error("리뷰 수정 실패:", err);
    }
  };

  if (loading) return <div className={styles.page}>불러오는 중...</div>;
  if (!review) return <div className={styles.page}>리뷰를 찾을 수 없습니다.</div>;

  return (
    <div className={styles.page}>
      <button className={styles.backButton} onClick={() => navigate(-1)}>
        ← 뒤로 가기
      </button>

      <header className={styles.hero}>
        <div className={styles.heroText}>
          <p className={styles.eyebrow}>{isEditMode ? "독후감 수정" : "독후감 조회"}</p>
          <h1 className={styles.heroTitle}>
            {review.title || taleTitle || "알 수 없는 동화"}
          </h1>
        </div>
      </header>

      <div className={styles.form}>
        {/* 감정 태그 */}
        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <h3>읽고 난 지금의 기분</h3>
          </div>

          <div className={styles.tagList}>
            {emotionTags.map((tag) => (
              <span
                key={tag}
                className={`${styles.tagButton} ${
                  review.feeling?.includes(tag) ? styles.active : ""
                }`}
              >
                {tag}
              </span>
            ))}
          </div>
        </section>

        {/* 별점 */}
        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <h3>동화 리뷰</h3>
          </div>

          <div className={styles.ratingRow}>
            <div className={styles.stars}>
              {[1, 2, 3, 4, 5].map((value) => (
                <span
                  key={value}
                  className={
                    value <= review.rating
                      ? `${styles.star} ${styles.starActive}`
                      : styles.star
                  }
                >
                  ★
                </span>
              ))}
            </div>
            <span className={styles.ratingValue}>{review.rating} / 5</span>
          </div>
        </section>

        {/* 내용 영역 */}
        <section className={styles.section}>
          <div className={styles.sectionGrid}>
            <div className={styles.fieldCard}>
              <h3>기억에 남는 장면</h3>
              <textarea
                readOnly={!isEditMode}
                value={isEditMode ? editData.memorableScene : review.memorableScene}
                onChange={(e) =>
                  isEditMode &&
                  setEditData((prev) => ({
                    ...prev,
                    memorableScene: e.target.value,
                  }))
                }
                className={styles.textarea}
              />
            </div>

            <div className={styles.fieldCard}>
              <h3>이야기에서 배운 점</h3>
              <textarea
                readOnly={!isEditMode}
                  value={isEditMode ? editData.lesson : review.lesson}
                  onChange={(e) =>
                    isEditMode &&
                    setEditData((prev) => ({
                      ...prev,
                      lesson: e.target.value,
                    }))
                  }
                  className={styles.textarea}
                />
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.fieldCard}>
            <h3>궁금증</h3>
            <textarea
              readOnly={!isEditMode}
              value={isEditMode ? editData.question : review.question}
              onChange={(e) =>
                isEditMode &&
                setEditData((prev) => ({
                  ...prev,
                  question: e.target.value,
                }))
              }
              className={styles.textarea}
            />
          </div>
        </section>

        {/* 수정 버튼은 MyPage에서 왔을 때만 표시 */}
        {from === "mypage" && (
          <div className={styles.actionRow}>
            {!isEditMode ? (
              <>
                <button
                  className={styles.primaryBtn}
                  onClick={handleEdit}
                >
                  수정하기
                </button>
              </>
            ) : (
              <>
                <button
                  className={styles.primaryBtn}
                  onClick={handleSave}
                >
                  저장하기
                </button>
                <button
                  className={styles.cancelBtn}
                  onClick={() => setIsEditMode(false)}
                >
                  취소
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ReviewDetail;
