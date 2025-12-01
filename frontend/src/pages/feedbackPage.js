import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styles from "./feedbackPage.module.css";
import { getUnknownWordsAPI } from "../api/child";

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

  // API 데이터 상태 추가
  const [reviewWords, setReviewWords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [selectedWord, setSelectedWord] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();
  const taleId = location.state?.taleId;

  const transmittedWords = location.state?.reviewWords;

  const goReport = () => navigate("/tale/report", { state: { taleId } });
  const goRetelling = () => navigate("/tale/retelling", { state: { taleId } });
  const goFinish = () => navigate("/studyMain");

  // 데이터 로딩 및 초기화 로직
  useEffect(() => {
    const child = JSON.parse(localStorage.getItem("selectedChild"));
    const childId = child?.id;
    
    const fetchWords = async () => {
      setLoading(true);
      setError(null);
      if (!childId) {
        setError("아이디 정보를 찾을 수 없습니다.");
        setLoading(false);
        return;
      }

      try {
        const response = await getUnknownWordsAPI(childId);
        const wordsResponse = response.data?.responseDto;
        const words = Array.isArray(wordsResponse) ? wordsResponse : []; 
        
        setReviewWords(words);
        if (words.length > 0) {
          setSelectedWord(words[0]);
        }
      } catch (e) {
        console.error("단어 조회 실패:", e);
        setError("단어를 불러오는 중 문제가 발생했습니다.");
      } finally {
        setLoading(false);
      }
    };

    if (transmittedWords && transmittedWords.length > 0 && Array.isArray(transmittedWords)) {
        setReviewWords(transmittedWords);
        setSelectedWord(transmittedWords[0]);
        setLoading(false);
        return;
    }

    fetchWords();
  }, [location.state]); 

  if (loading) return <div className={styles.page}>단어 정보를 불러오는 중입니다...</div>;
  if (error) return <div className={styles.page}>{error}</div>;

  const wordListToDisplay = reviewWords.length > 0 ? reviewWords : dummy.wordList;

  return (
    <div className={styles.page}>
      <div className={styles.contentBox}>
        {/* 단어 카드 */}
        <section className={styles.wordContainer}>
          <div className={styles.wordHeader}>
            <h1 className={styles.pageTitle}>단어 복습하기</h1>

            <div className={styles.wordCount}>
              모르는 단어 {wordListToDisplay.length}개 
            </div>
          </div>

          <div className={styles.wordTags}>
            {wordListToDisplay.map((item, index) => ( 
              <button
                key={item.id || item.word || index}
                type="button"
                className={`${styles.tag} ${
                  selectedWord?.word === item.word ? styles.activeTag : ""
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
                {selectedWord.meaningEn}
              </div>

              <div className={styles.wordKor}>
                <span className={styles.wordLabel}>한국어 뜻 · </span>
                {selectedWord.meaningKo}
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