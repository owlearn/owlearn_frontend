import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./parentDetail.module.css";
import defaultCover from "../assets/fairy.png";

// 더미 데이터 (서버 연동 전 테스트용)
const dummyChild = {
  id: "child-1",
  name: "김하늘",
  recentBook: "우주 탐험대",
  recentBookCover: defaultCover,
  reports: [
    {
      id: "report-1",
      title: "우주 여행 일지",
      excerpt: "탐사 중 만난 친구들과 배운 점을 기록했어요.",
      submittedAt: "2024-04-08",
      visibleToParent: true,
      bookTitle: "우주 탐험대",
    },
    {
      id: "report-2",
      title: "행성 비교표",
      excerpt: "태양계 행성의 특징을 비교하며 핵심 정보를 정리했어요.",
      submittedAt: "2024-04-02",
      visibleToParent: true,
      bookTitle: "지구에서 가장 먼 여행",
    },
    {
      id: "report-3",
      title: "비밀의 모험 편지",
      excerpt: "마음 속 생각을 편지로 남겼지만, 이번엔 혼자 간직하고 싶대요.",
      submittedAt: "2024-03-29",
      visibleToParent: false,
      bookTitle: "토끼와 거북이",
    },
  ],
  report: {
    title: "우주 여행 일지",
    summary: "탐사 중 만난 친구들과 배운 점을 기록했어요.",
    updatedAt: "2024-04-08",
  },
  favoriteTopics: ["과학 탐구", "논리적 사고", "호기심 발산"],
};

// 맞춤형 추천 예시
const dummyRecommendation = {
  title: "달빛을 먹은 고양이",
  reason: "최근 ‘호기심 발산’ 테마에 반응이 높았어요.",
  topics: ["상상력", "감정 이해"],
};

// 주제 밸런스 예시
const dummyTopicBalance = [
  { topic: "과학", percent: 45 },
  { topic: "상상력", percent: 25 },
  { topic: "감정 이해", percent: 15 },
  { topic: "자연", percent: 10 },
  { topic: "언어", percent: 5 },
];

export default function ChildDetail() {
  const { childId } = useParams();
  const navigate = useNavigate();
  const [child, setChild] = useState(dummyChild);
  const [recommendation, setRecommendation] = useState(dummyRecommendation);
  const [topics, setTopics] = useState(dummyTopicBalance);
  const reports = collectReports(child);
  const reportCount = reports.length;
  const reportBookTitles = extractReportBooks(reports, child.recentBook);

  useEffect(() => {
    // ✅ 실제 서버 연동 시:
    // const { data } = await defaultInstance.get(`/child/${childId}/summary`);
    // setChild(data);
    // setRecommendation(data.recommendation);
    // setTopics(data.topicStats);
  }, [childId]);

  const handleBookAction = (action) => {
    if (action === "reserve") {
      alert(`"${recommendation.title}"을(를) 자녀에게 추천했습니다.`);
      // 서버에 parent_recommended = true 로 전송
    } else if (action === "skip") {
      alert("이 동화를 추천에서 제외했습니다.");
    }
  };

  return (
    <div className={styles.page}>
      <button
        className={styles.backButton}
        onClick={() => navigate("/parentMain")}
      >
        ← 목록으로
      </button>

      <section className={styles.childSummary}>
        <div className={styles.headerBox}>
          <img
            src={child.recentBookCover}
            alt="book cover"
            className={styles.bookImg}
          />
          <div className={styles.childInfo}>
            <h2>{child.name}</h2>
            <p>
              최근 읽은 책: <strong>{child.recentBook}</strong>
            </p>
            <div className={styles.reportOverview}>
              <div className={styles.reportCount}>
                <span className={styles.reportLabel}>작성한 리포트</span>
                <span className={styles.reportValue}>{reportCount}건</span>
              </div>
              <div className={styles.reportBooks}>
                {reportBookTitles.length > 0 ? (
                  reportBookTitles.map((title) => (
                    <span key={title} className={styles.bookChip}>
                      {title}
                    </span>
                  ))
                ) : (
                  <span className={styles.reportEmpty}>
                    아직 작성한 리포트가 없어요.
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 우선보류 */}
      {/* 맞춤형 동화 큐레이션
      <section className={styles.recommendation}>
        <h3> 이번 주 추천 동화</h3>
        <div className={styles.recCard}>
          <div className={styles.recMedia}>
            <img src={defaultCover} alt={`${recommendation.title} 표지`} />
          </div>
          <div className={styles.recBody}>
            <div className={styles.recTitle}>{recommendation.title}</div>
            <div className={styles.recReason}>{recommendation.reason}</div>
            <div className={styles.topicTags}>
              {recommendation.topics.map((t, i) => (
                <span key={i} className={styles.tag}>
                  #{t}
                </span>
              ))}
            </div>
          </div>
          <div className={styles.recButtons}>
            <button onClick={() => handleBookAction("reserve")}>
              읽기 예약
            </button>
            <button onClick={() => handleBookAction("skip")}>추천 제외</button>
          </div>
        </div>
      </section> */}

      {/* 학습 주제 밸런스 */}
      <section className={styles.topicBalance}>
        <h3>학습 주제 밸런스</h3>
        <p className={styles.topicNote}>
          자녀의 학습 주제 편향을 한눈에 볼 수 있습니다.
        </p>
        <div className={styles.topicBars}>
          {topics.map((t, i) => (
            <div key={i} className={styles.topicRow}>
              <span className={styles.topicLabel}>{t.topic}</span>
              <div className={styles.topicBarWrap}>
                <div
                  className={styles.topicBar}
                  style={{
                    width: `${t.percent}%`, //비율만큼 길이
                    backgroundColor: getColor(t.topic), //주제별 색 다르게
                  }}
                ></div>
              </div>
              <span className={styles.topicValue}>{t.percent}%</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

//주제별 색 다르게 만들어주는 함수
function getColor(topic, index) {
  // 색상 팔레트
  const colors = [
    "#7CA982", // green
    "#B5CDA3", // mint
    "#EFC88B", // yellow
    "#B8C480", // olive
    "#F1A66A", // orange
    "#99B2DD", // blue
    "#CBAACB", // purple
  ];

  // 주제 이름을 기반으로, 해시로 인덱스
  let hash = 0;
  for (let i = 0; i < topic.length; i++) {
    hash = topic.charCodeAt(i) + ((hash << 5) - hash);
  }
  const colorIndex = Math.abs(hash) % colors.length;
  return colors[colorIndex];
}

function collectReports(child) {
  if (!child) return [];

  let reports = [];

  if (Array.isArray(child.reports) && child.reports.length > 0) {
    reports = child.reports;
  } else if (child.report) {
    reports = [
      {
        id: `${child.id}-report`,
        title: child.report.title || "리포트",
        excerpt: child.report.summary || "",
        submittedAt: child.report.updatedAt,
        bookTitle: child.recentBook,
      },
    ];
  }

  return reports.sort((a, b) => {
    const aTime = new Date(a.submittedAt || 0).getTime();
    const bTime = new Date(b.submittedAt || 0).getTime();
    return bTime - aTime;
  });
}

function extractReportBooks(reports, fallbackBook) {
  const titles = reports
    .map((report) => report.bookTitle || fallbackBook)
    .filter(Boolean);
  return [...new Set(titles)];
}
