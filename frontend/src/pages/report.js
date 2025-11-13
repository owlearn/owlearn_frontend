import React, { useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./report.module.css";

const emotionTags = [
  { label: "재미있었어요", tone: "lavender" },
  { label: "감동적이었어요", tone: "rose" },
  { label: "두근거렸어요", tone: "berry" },
  { label: "배울 게 많았어요", tone: "mint" },
  { label: "생각이 많아졌어요", tone: "sky" },
  { label: "다시 읽고 싶어요", tone: "sunset" },
];

const promptIdeas = [
  "주인공에게 편지를 쓴다면 어떤 말을 해줄까요?",
  "이야기 속 한 장면을 현실에서 다시 만든다면?",
  "나와 닮은 인물을 찾고 이유를 적어보세요.",
];

const ReadingReflection = () => {
  const navigate = useNavigate();
  const location = useLocation();

  //독후감 작성 중인 동화 정보
  const storyInfo = useMemo(
    () =>
      location.state?.story ?? {
        title: "달빛 아래서 만난 친구",
        author: "AI Tale Studio",
        mood: "따뜻한 · 성장 · 일러스트",
        summary:
          "달빛을 따라 숲을 탐험하던 단이는 새로운 친구 루루를 만나며 용기와 우정을 배우게 됩니다.",
      },
    [location.state]
  );

  const [selectedTags, setSelectedTags] = useState([]);
  const [rating, setRating] = useState(4);
  const [highlight, setHighlight] = useState("");
  const [lesson, setLesson] = useState("");
  const [question, setQuestion] = useState("");
  const [chosenPrompt, setChosenPrompt] = useState(promptIdeas[0]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const toggleTag = (tag) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((item) => item !== tag) : [...prev, tag]
    ); //이전 항목에 item있으면 제거(item과 tag가 다른거만 남김), 없으면 추가
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const payload = {
      storyId: location.state?.taleId ?? null,
      storyTitle: storyInfo.title,
      rating,
      highlight,
      lesson,
      question,
      feelingKeywords: selectedTags,
      prompt: chosenPrompt,
      createdAt: new Date().toISOString(),
    };

    console.table(payload);

    setIsSubmitting(true);
    setTimeout(() => {
      alert("독후감이 저장되었습니다!");
      setIsSubmitting(false);
      navigate("/studyMain");
    }, 800);
  };

  return (
    <div className={styles.page}>
      <header className={styles.hero}>
        <button
          type="button"
          className={styles.backButton}
          onClick={() => navigate(-1)}
        >
          ← 학습 목록으로
        </button>

        <div className={styles.heroText}>
          <p className={styles.eyebrow}>독후감 작성</p>
          <h1 className={styles.heroTitle}>
            오늘 읽은 동화를
            <br />
            나만의 언어로 기록해요
          </h1>
          <p className={styles.subtitle}>
            느낀 감정, 기억에 남는 장면, 배운 점을 자유롭게 적어보세요.
            <br />
            아래 가이드가 글을 채우는 데 도움을 줄 거예요.
          </p>
        </div>

        <div className={styles.storyCard}>
          <span className={styles.badge}>현재 작성 중인 동화</span>
          <h2>{storyInfo.title}</h2>
          <p className={styles.meta}>{storyInfo.mood}</p>
          <p className={styles.summary}>{storyInfo.summary}</p>
        </div>
      </header>

      <form className={styles.form} onSubmit={handleSubmit}>
        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <h3>읽고 난 지금의 기분</h3>
            <p>느낌에 가까운 단어를 골라보세요. 여러 개 선택해도 좋아요.</p>
          </div>
          <div className={styles.tagList}>
            {emotionTags.map((tag) => {
              const active = selectedTags.includes(tag.label);
              return (
                <button
                  key={tag.label}
                  type="button"
                  className={`${styles.tagButton} ${
                    styles[`tone-${tag.tone}`]
                  } ${active ? styles.active : ""}`}
                  onClick={() => toggleTag(tag.label)}
                >
                  {tag.label}
                </button>
              );
            })}
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <h3>이야기 몰입도</h3>
            <p>오늘의 동화를 별점으로 표현해볼까요?</p>
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
                  onClick={() => setRating(value)}
                  aria-label={`${value}점`}
                >
                  ★
                </button>
              ))}
            </div>
            <span className={styles.ratingValue}>{rating} / 5</span>
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.sectionGrid}>
            <div className={styles.fieldCard}>
              <label htmlFor="highlight">가장 기억에 남는 장면</label>
              <textarea
                id="highlight"
                placeholder="어떤 장면이 특히 마음에 남았나요?"
                value={highlight}
                onChange={(event) => setHighlight(event.target.value)}
                className={styles.textarea}
              />
            </div>

            <div className={styles.fieldCard}>
              <label htmlFor="lesson">이야기에서 배운 점</label>
              <textarea
                id="lesson"
                placeholder="이 동화가 알려준 가르침은 무엇인가요?"
                value={lesson}
                onChange={(event) => setLesson(event.target.value)}
              />
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <h3>질문으로 마무리하기</h3>
            <p>아래 질문 중 하나를 고르거나 스스로 질문을 만들어보세요.</p>
          </div>
          <div className={styles.promptRow}>
            <select
              value={chosenPrompt}
              onChange={(event) => setChosenPrompt(event.target.value)}
            >
              {promptIdeas.map((idea) => (
                <option key={idea} value={idea}>
                  {idea}
                </option>
              ))}
            </select>
            <input
              type="text"
              placeholder="직접 질문을 적어도 좋아요."
              value={question}
              onChange={(event) => setQuestion(event.target.value)}
            />
          </div>
        </section>

        <div className={styles.submitRow}>
          <button
            type="button"
            className={styles.ghostButton}
            onClick={() => navigate("/studyMain")}
          >
            나중에 작성할래요
          </button>
          <button type="submit" className={styles.primaryButton}>
            {isSubmitting ? "저장 중..." : "독후감 저장하기"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ReadingReflection;
