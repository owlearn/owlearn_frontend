import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom"; 
import styles from "./feedbackPage.module.css";

export default function FeedbackPage() {
  // 더미 데이터
  const dummy = {
    taleTitle: "The Magic of Friendship",
    wordList: [
      {
        id: 1,
        word: "shiny",
        pos: "adjective",
        meaning: "bright because it reflects light",
        kor: "빛을 반사해서 반짝이는, 윤이 나는",
        example: "Liam picked up a shiny stone from the riverbank."
      },
      {
        id: 2,
        word: "decided",
        pos: "verb",
        meaning: "made a choice",
        kor: "결정한",
        example: "She finally decided to join the music club."
      },
      {
        id: 3,
        word: "magical",
        pos: "adjective",
        meaning: "having special powers",
        kor: "마법 같은, 신비로운",
        example: "The forest was filled with magical creatures."
      }
    ],
  };

  const [selectedWord, setSelectedWord] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();
  const { taleId } = location.state || {};

  const handleGoReport = () => {
    navigate("/tale/report", { state: { taleId: taleId } });
  };

  // 처음 로드시 첫 단어 자동 선택
  useEffect(() => {
    if (dummy.wordList.length > 0) {
      setSelectedWord(dummy.wordList[0]);
    }
  }, []);

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.container}>

        <div className={styles.titleBox}>
          단어 복습하기
        </div>

        <div className={styles.subtitle}>
          동화를 다 읽은 뒤에 <span className={styles.bold}>모르는 단어</span>로
          체크한 단어들을 한 번에 복습해요.
        </div>

        <div className={styles.layout}>

          <div className={styles.leftColumn}>
          <div className={styles.storyCard}>
            <div className={styles.topGuide}>
              <div className={styles.guideTitle}>
                <span className={styles.guideIcon}>📖</span>
                방금 학습한 동화
              </div>
              <div className={styles.guideText}>
                단어를 클릭하면, 그 단어의 의미와 예문이 아래에 나타납니다.
              </div>
            </div>

            <div className={styles.storyHeaderRow}>
              <div className={styles.storyTitle}>{dummy.taleTitle}</div>

              <div className={styles.wordCountBadge}>
                단어 {dummy.wordList.length}개
              </div>
            </div>
          </div>
        </div>

          <div className={styles.rightColumn}>
            <div className={styles.wordContainer}>

              <div className={styles.wordHeader}>
                <div className={styles.wordTitle}>
                  <span className={styles.wordIcon}>🔤</span>
                  {dummy.taleTitle}</div>
                <div className={styles.wordCount}>
                  모르는 단어 {dummy.wordList.length}개
                </div>
              </div>

              <div className={styles.wordTags}>
                {dummy.wordList.map((item) => (
                  <div
                    key={item.id}
                    className={`${styles.tag} ${
                      selectedWord?.id === item.id ? styles.activeTag : ""
                    }`}
                    onClick={() => setSelectedWord(item)}
                  >
                    ⭐ {item.word}
                  </div>
                ))}
              </div>

              {/* 선택된 단어 상세 */}
              <div className={styles.wordDetails}>
                {selectedWord && (
                  <div className={styles.wordCard}>
                    <div className={styles.wordName}>
                      {selectedWord.word}
                      <span className={styles.wordPos}> {selectedWord.pos}</span>
                    </div>
                    <div className={styles.wordMeaning}>
                      <span className={styles.wordLabel}>Meaning · </span>
                      {selectedWord.meaning}
                    </div>
                    <div className={styles.wordKor}>
                      <span className={styles.wordLabel}>한국어 뜻 : </span>
                      {selectedWord.kor}
                    </div>
                    <div className={styles.wordExample}>
                      <span className={styles.wordLabel}>Example · </span>
                      {selectedWord.example}
                    </div>
                  </div>
                )}
              </div>

              {/* 팁 영역 */}
              <div className={styles.tipBox}>
                <span className={styles.tipIcon}>💡</span>
                <span className={styles.tipText}>
                  팁 : 매일 모르는 단어를 모아서 복습하면 단어가 더 오래 기억돼요.
                </span>
              </div>

              

            </div>

            {/* REPORT 버튼 */}
              <div className={styles.reportWrapper}>
                <button 
                  className={styles.reportBtn}
                  onClick={handleGoReport}
                >
                  REPORT
                </button>
              </div>
          </div>

        </div>
      </div>
    </div>
  );
}
