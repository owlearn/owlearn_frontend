import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Prompting.module.css";

export default function Prompting() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [storyText, setStoryText] = useState("");
  const [characters, setCharacters] = useState([{ name: "", main: false }]);

  const addCharacter = () =>
    setCharacters((prev) => [...prev, { name: "", main: false }]);

  const updateCharacter = (i, key, val) =>
    setCharacters((prev) => {
      const next = [...prev];
      next[i] = { ...next[i], [key]: val };
      return next;
    });

  return (
    <div className={styles.page}>
        <h2 className={styles.header}>나만의 동화 만들기</h2>
          <div className={styles.row}>
            <section className={`${styles.card} ${styles.storybook}`}>
              <h3 className={styles.cardTitle}>동화 입력</h3>
                <div className={styles.contentWrapper}>
                    <input
                      className={styles.input}
                      type="text"
                      placeholder="동화 제목을 입력하세요."
                      onChange={(e) => setTitle("title", e.target.value)}
                      value={title}
                    />
                    <textarea
                      className={styles.textarea}
                      placeholder="동화를 업로드하세요."
                      onChange={(e) => setStoryText("text", e.target.value)}
                      value={storyText}
                    ></textarea>
                </div>
            </section>

            <section className={`${styles.card} ${styles.character}`}>
              <h3 className={styles.cardTitle}>캐릭터 입력</h3>
                <div className={styles.contentWrapper}>
                  {characters.map((c, i) => (
                    <div key={i} className={styles.characterGrid}>
                      <div className={styles.characterSelectArea}>
                        <button
                          className={styles.characterDesignBtn}
                          onClick={() => alert('캐릭터 디자인 페이지로 이동합니다.')}
                        >
                        <span className={styles.characterLine}>캐릭터</span>
                        <span className={styles.characterLine}>선택하기</span>
                      </button>
                    </div>
                <div className={styles.characterInputField}>
                  <label htmlFor={`characterName-${i}`} className={styles.characterNameLabel}>캐릭터 이름</label>
                    <input
                      id={`characterName-${i}`}
                      className={styles.input}
                      type="text"
                      placeholder="캐릭터 이름을 입력하세요."
                      value={c.name}
                      onChange={(e) => updateCharacter(i, "name", e.target.value)}
                    />
                    <label className={styles.mainCharacterCheckbox}>
                      <input
                        type="checkbox"
                        checked={c.main}
                        onChange={(e) => updateCharacter(i, "main", e.target.checked)}
                      />
                      <span className={styles.customCheckbox}></span>
                        주인공
                    </label>
                  </div>
                </div>
              )
            )
          }
        <button type="button" className={styles.subBtn} onClick={addCharacter}>
          + 캐릭터 추가
        </button>
    </div>
    
    <div className={styles.characterFooter}>
      <button 
        type="button" 
        className={styles.ghostBtn}
        onClick={() => window.location.href = '/studyMain'}
      >
        돌아가기
      </button>
      <button 
        type="submit" 
        className={styles.primaryBtn}
        onClick={() => window.location.href = '/create'}
      >
        동화 만들기
      </button>
    </div>
  </section>
</div>
</div>
);
}