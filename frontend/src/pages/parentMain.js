import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./parentMain.module.css";
import { getChildAPI } from "../api/user";
import book from "../assets/fairy.png";
import creditIcon from "../assets/credit.png";

export default function ParentDashboard() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [children, setChildren] = useState([]);
  const [parentName, setParentName] = useState("");

  // 삭제 모드
  const [deleteMode, setDeleteMode] = useState(false);
  const [selectedToDelete, setSelectedToDelete] = useState([]);

  useEffect(() => {
    // 로그인 시 저장한 "name" 불러오기
    const savedName = localStorage.getItem("name");
    setParentName(savedName || "학부모");
    
    async function loadChildren() {
      try {
        const data = await getChildAPI();

        // 응답 예시 기반 매핑
        const mapped = data.map((c) => ({
          id: c.id,
          name: c.name,
          age: c.age,
          credits: c.taleCount * 10 ?? 0, // credits 없어서 임의 계산
          favoriteTopics: [c.prefer], 
          recentBook: "최근 기록 없음",
          recentBookCover: book,
          progress: 0, 
        }));

        setChildren(mapped);
      } catch (e) {
        console.error("자녀 조회 실패", e);
        setChildren([]);
      } finally {
        setLoading(false);
      }
    }
    loadChildren();
  }, []);

  const goChildDetail = (child) => {
    navigate(`/parent/${child.id}/detail`);
  };

  const goAddProfile = () => navigate("/addProfile");
  const goBack = () => navigate("/loginProfile");

  // 체크박스 선택 토글
  const toggleSelect = (childId) => {
    setSelectedToDelete((prev) =>
      prev.includes(childId)
        ? prev.filter((id) => id !== childId)
        : [...prev, childId]
    );
  };

  const handleDeleteMode = () => {
    if (!deleteMode) setSelectedToDelete([]);

    setDeleteMode((prev) => !prev);
  };

  // 선택한 자녀 삭제
  const handleDeleteConfirm = () => {
    if (selectedToDelete.length === 0) return;

    const yes = window.confirm("선택한 자녀를 삭제하시겠습니까?");
    if (!yes) return;

    setChildren((prev) =>
      prev.filter((child) => !selectedToDelete.includes(child.id))
    );

    setDeleteMode(false);
    setSelectedToDelete([]);
  };

  if (loading) return <div className={styles.page}>불러오는 중…</div>;

  return (
    <div className={styles.page}>
      {/* 상단 Greeting + 버튼 */}
      <section className={styles.greeting}>
        <div className={styles.greetText}>
          <strong>{parentName || "학부모"}님</strong>, 자녀 학습 현황을 확인해 보세요.
        </div>

        <div className={styles.actions}>
          {/* 일반 상태 */}
          {!deleteMode && (
            <>
              <button onClick={goAddProfile} className={styles.primary}>
                + 자녀 추가
              </button>
              <button onClick={handleDeleteMode} className={styles.deleteModeBtn}>
                자녀 삭제
              </button>
            </>
          )}

          {/* 삭제 모드 상태 */}
          {deleteMode && (
            <>
              <button
                onClick={() => setDeleteMode(false)}
                className={styles.cancelDelete}
              >
                취소
              </button>

              <button
                onClick={handleDeleteConfirm}
                className={styles.deleteConfirm}
                disabled={selectedToDelete.length === 0}
              >
                선택 삭제
              </button>
            </>
          )}
        </div>
      </section>

      {/* 카드 리스트 */}
      <section className={styles.grid}>
        {children.map((child) => (
          <article
            key={child.id}
            className={`${styles.card} ${
              deleteMode ? styles.cardDeleteMode : ""
            }`}
          >
            {/* 체크박스 (삭제 모드일 때만 표시) */}
            {deleteMode && (
              <input
                type="checkbox"
                className={styles.checkbox}
                checked={selectedToDelete.includes(child.id)}
                onChange={() => toggleSelect(child.id)}
              />
            )}

            <div className={styles.cardHeader}>
              <h3>{child.name}</h3>
              <div className={styles.headerBadges}>
                <span className={styles.ageBadge}>
                  {child.age !== null && child.age !== undefined
                    ? `${child.age}세`
                    : "나이 미입력"}
                </span>
                {typeof child.credits === "number" && (
                  <span className={styles.creditPill}>
                    <img
                      src={creditIcon}
                      alt="크레딧"
                      className={styles.creditIcon}
                    />
                    <span>{child.credits.toLocaleString()}C</span>
                  </span>
                )}
              </div>
            </div>

            <div className={styles.topics}>
              <div className={styles.metricLabel}>선호 주제</div>
              <div className={styles.topicChips}>
                {(child.favoriteTopics || []).map((topic, index) => (
                  <span key={index} className={styles.chip}>
                    {topic}
                  </span>
                ))}
              </div>
            </div>

            {/* 상세 보기 버튼 (삭제 모드일 때는 숨김) */}
            {!deleteMode && (
              <div className={styles.cardFooter}>
                <button
                  type="button"
                  className={styles.secondary}
                  onClick={() => goChildDetail(child)}
                >
                  상세 보기
                </button>
              </div>
            )}
          </article>
        ))}
      </section>

      {/* 돌아가기 버튼 */}
      <div className={styles.backWrapper}>
        <button className={styles.backButton} onClick={goBack}>
          ← 돌아가기
        </button>
      </div>
    </div>
  );
}
