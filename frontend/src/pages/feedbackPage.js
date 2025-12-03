import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styles from "./feedbackPage.module.css";

export default function FeedbackPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const taleId = location.state?.taleId;

  const responseFromState = location.state?.wordResponse;

  const [wordList, setWordList] = useState([]);
  const [selectedWord, setSelectedWord] = useState(null);
  const [loading, setLoading] = useState(true);

  const goReport = () => navigate("/tale/report", { state: { taleId } });
  const goRetelling = () => navigate("/tale/retelling", { state: { taleId } });
  const goFinish = () => navigate("/studyMain");

  useEffect(() => {
    // 이전 페이지에서 전달된 응답만 그대로 매핑해서 사용
    if (responseFromState?.responseDto?.length) {
      const mappedFromState = responseFromState.responseDto.map(
        (item, idx) => ({
          id: item.id || idx + 1,
          word: item.word,
          pos: item.pos,
          meaningEn: item.meaningEn,
          meaningKo: item.meaningKo,
          example: item.example,
        })
      );

      setWordList(mappedFromState);
      console.log(
        "[FeedbackPage] state에서 매핑된 단어 리스트:",
        mappedFromState
      );
      if (mappedFromState.length > 0) {
        setSelectedWord(mappedFromState[0]);
      }
    }

    setLoading(false);
  }, [responseFromState]);

  return (
    <div className={styles.page}>
      <div className={styles.contentBox}>
        {/* 단어 카드 */}
        <section className={styles.wordContainer}>
          <div className={styles.wordHeader}>
            <h1 className={styles.pageTitle}>단어 복습하기</h1>

            <div className={styles.wordCount}>
              모르는 단어 {wordList.length}개
            </div>
          </div>

          {wordList.length === 0 ? (
            <div className={styles.emptyWords}>
              이번 동화에서는 모르는 단어가 없었어요.
              <br />
              바로 독후감이나 리텔링으로 넘어가도 좋아요.
            </div>
          ) : (
            <>
              <div className={styles.wordTags}>
                {wordList.map((item) => (
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
            </>
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
