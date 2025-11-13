import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./parentMain.module.css";
import book from "../assets/fairy.png"; // 더미 이미지

// 더미 데이터
const parent_name = "박가연";
const dummyChildren = [
  {
    id: "child-1",
    name: "김하늘",
    recentBook: "우주 탐험대",
    recentBookCover: book,
    progress: 72,
    favoriteTopics: ["과학", "우주", "탐험"],
    age: 8,
    credits: 320,
  },
  {
    id: "child-2",
    name: "이도윤",
    recentBook: "숲속 친구들의 모험",
    recentBookCover: book,
    progress: 63,
    favoriteTopics: ["자연", "모험", "감정 공감"],
    age: 9,
    credits: 210,
  },
  {
    id: "child-3",
    name: "최서연",
    recentBook: "바닷속 신비",
    recentBookCover: book,
    progress: 54,
    favoriteTopics: ["해양", "환경", "상상력"],
    age: 10,
    credits: 180,
  },
];

export default function ParentDashboard() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [children, setChildren] = useState([]);
  const [parentName, setParentName] = useState("");

  useEffect(() => {
    const name = localStorage.getItem("parentName") || parent_name;
    setParentName(name);
    setChildren(dummyChildren);
    setLoading(false);
  }, []);

  const goChildDetail = (child) => {
    navigate(`/parent/${child.id}/detail`);
  };

  const goAddProfile = () => navigate("/addProfile");
  const goSwitchChild = () => navigate("/loginProfile");

  if (loading) return <div className={styles.page}>불러오는 중…</div>;

  return (
    <div className={styles.page}>
      {/* 학부모 인사 + 버튼 */}
      <section className={styles.greeting}>
        <div className={styles.greetText}>
          <strong>{parentName || "학부모"}님</strong>, 자녀 학습 현황을 확인해
          보세요.
        </div>
        <div className={styles.actions}>
          <button onClick={goAddProfile} className={styles.primary}>
            + 자녀 추가
          </button>
          <button onClick={goSwitchChild} className={styles.secondary}>
            자녀 전환
          </button>
        </div>
      </section>

      {/* 자녀 카드 */}
      <section className={styles.grid}>
        {children.map((child) => (
          <article key={child.id} className={styles.card}>
            <div className={styles.cardHeader}>
              <h3>{child.name}</h3>
              <span className={styles.ageBadge}>
                {child.age !== null && child.age !== undefined
                  ? `${child.age}세`
                  : "나이 미입력"}
              </span>
            </div>

            <div className={styles.recent}>
              {/* <div className={styles.thumbWrap}>
                {child.recentBookCover ? (
                  <img
                    src={child.recentBookCover}
                    alt={child.recentBook || "recent book"}
                    className={styles.thumb}
                  />
                ) : (
                  <div className={styles.thumbPlaceholder}>No Image</div>
                )}
              </div> */}
              {/* <div className={styles.recentMeta}>
                <div className={styles.recentLabel}>최근 읽은 책</div>
                <div className={styles.recentTitle}>
                  {child.recentBook || "-"}
                </div>
              </div> */}
            </div>

            <div className={styles.metrics}>
              <div className={styles.metric}>
                <div className={styles.metricLabel}>누적 학습 포인트</div>
                <div className={styles.metricValue}>
                  {typeof child.credits === "number"
                    ? `${child.credits.toLocaleString()}점`
                    : "-"}
                </div>
              </div>
            </div>

            <div className={styles.topics}>
              <div className={styles.metricLabel}>선호 주제</div>
              <div className={styles.topicChips}>
                {(child.favoriteTopics || [])
                  .slice(0, 5)
                  .map((topic, index) => (
                    <span key={index} className={styles.chip}>
                      {topic}
                    </span>
                  ))}
                {(!child.favoriteTopics ||
                  child.favoriteTopics.length === 0) && (
                  <span className={styles.muted}>-</span>
                )}
              </div>
            </div>

            <div className={styles.cardFooter}>
              <button
                type="button"
                className={styles.secondary}
                onClick={() => goChildDetail(child)}
              >
                상세 보기
              </button>
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}
