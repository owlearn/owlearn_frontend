import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styles from "./feedbackPage.module.css";

export default function FeedbackPage() {
  // TODO: 실제 API로 교체 예정
  const dummy = {
    taleTitle: "The Magic of Friendship",
    wordList: [
      {
        id: 1,
        word: "shiny",
        pos: "adjective",
        meaning: "bright because it reflects light",
        kor: "빛을 반사해서 반짝이는",
        example: "Liam picked up a shiny stone from the riverbank.",
      },
      {
        id: 2,
        word: "decided",
        pos: "verb",
        meaning: "made a choice",
        kor: "결정한",
        example: "She finally decided to join the music club.",
      },
      {
        id: 3,
        word: "magical",
        pos: "adjective",
        meaning: "having special powers",
        kor: "마법 같은",
        example: "The forest was filled with magical creatures.",
      },
    ],
  };

  const [selectedWord, setSelectedWord] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();
  const taleId = location.state?.taleId;

  const goReport = () => navigate("/tale/report", { state: { taleId } });
  const goRetelling = () => navigate("/tale/retelling", { state: { taleId } });
  const goFinish = () => navigate("/studyMain");

  useEffect(() => {
    if (dummy.wordList.length > 0) {
      setSelectedWord(dummy.wordList[0]);
    }
  }, []);

  return (
    <div className={styles.page}>
      <div className={styles.contentBox}>
        {/* 단어 카드 */}
        <section className={styles.wordContainer}>
          <div className={styles.wordHeader}>
            <h1 className={styles.pageTitle}>단어 복습하기</h1>

            <div className={styles.wordCount}>
              모르는 단어 {dummy.wordList.length}개
            </div>
          </div>

          <div className={styles.wordTags}>
            {dummy.wordList.map((item) => (
              <button
                key={item.id}
                type="button"
                className={`${styles.tag} ${
                  selectedWord?.id === item.id ? styles.activeTag : ""
                }`}
                onClick={() => setSelectedWord(item)}
              >
                {item.word}
              </button>
            ))}
          </div>

          {selectedWord && (
            <div className={styles.wordDetails}>
              <div className={styles.wordName}>
                {selectedWord.word}
                <span className={styles.wordPos}>{selectedWord.pos}</span>
              </div>

              <div className={styles.wordMeaning}>
                <span className={styles.wordLabel}>Meaning · </span>
                {selectedWord.meaning}
              </div>

              <div className={styles.wordKor}>
                <span className={styles.wordLabel}>한국어 뜻 · </span>
                {selectedWord.kor}
              </div>

              <div className={styles.wordExample}>
                <span className={styles.wordLabel}>Example · </span>
                {selectedWord.example}
              </div>
            </div>
          )}
        </section>

        {/* 하단 선택 버튼들 */}
        <div className={styles.actionButtons}>
          <button className={styles.brownBtn} onClick={goReport}>
            독후감 쓰기
          </button>
          <button className={styles.brownBtn} onClick={goRetelling}>
            리텔링 쓰기
          </button>
          <button className={styles.blackBtn} onClick={goFinish}>
            학습 종료하기
          </button>
        </div>
      </div>
    </div>
  );
}
