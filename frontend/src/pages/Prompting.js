import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Prompting.module.css";
import { promptAPI } from "../api/prompt";

export default function Prompting() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [prompt, setPrompt] = useState("");
  const [characters, setCharacters] = useState([
    { name: "", main: false, image: null },
  ]);
  const [imageUrls, setImageUrls] = useState([]);

  const addCharacter = () =>
    setCharacters((prev) => [...prev, { name: "", main: false }]);

  const updateCharacter = (i, key, val) =>
    setCharacters((prev) => {
      const next = [...prev];
      next[i] = { ...next[i], [key]: val };
      return next;
    });

  const sendButton = async () => {
    try {
      const response = await promptAPI(prompt); // API 응답 기다리기
      console.log("response:", response);

      if (response && response.data) {
        setImageUrls(response.data); // 이미지 배열 들어감
        alert("동화 생성이 완료되었습니다!");
      } else {
        console.error("API 응답이 올바르지 않습니다:", response);
        alert("동화 생성 결과가 비어 있습니다.");
      }

      // navigate("/output");
    } catch (error) {
      console.error("동화 생성 오류:", error);
      alert("동화 생성 중 문제가 발생했습니다.");
    }
  };

  return (
    <div className={styles.page}>
      <h2 className={styles.header}>나만의 동화 만들기</h2>
      <div className={styles.row}>
        {/* 동화 입력 */}
        <section className={`${styles.card} ${styles.storybook}`}>
          <h3 className={styles.cardTitle}>동화 입력</h3>
          <div className={styles.contentWrapper}>
            <input
              className={styles.input}
              type="text"
              placeholder="동화 제목을 입력하세요."
              onChange={(e) => {
                setTitle(e.target.value);
                console.log("[title]: ", e.target.value);
              }}
              value={title}
            />
            <textarea
              className={styles.textarea}
              placeholder="프롬프트 입력"
              onChange={(e) => {
                setPrompt(e.target.value);
                console.log("[text]: ", e.target.value);
              }}
              value={prompt}
            ></textarea>
          </div>
        </section>

        {/* 캐릭터 입력 */}
        <section className={`${styles.card} ${styles.character}`}>
          <h3 className={styles.cardTitle}>캐릭터 입력</h3>
          <div className={styles.contentWrapper}>
            {characters.map((c, i) => (
              <div key={i} className={styles.characterGrid}>
                {/* 캐릭터 이미지 업로드 */}
                <div className={styles.characterSelectArea}>
                  <label className={styles.characterUploadBox}>
                    {c.image ? (
                      <img
                        src={URL.createObjectURL(c.image)}
                        alt="캐릭터 미리보기"
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          borderRadius: "12px",
                        }}
                      />
                    ) : (
                      <>
                        <span>캐릭터</span>
                        <span>선택하기</span>
                      </>
                    )}
                    <input
                      type="file"
                      accept="image/*"
                      className={styles.characterFileInput}
                      onChange={(e) =>
                        updateCharacter(i, "image", e.target.files[0])
                      }
                    />
                  </label>
                </div>

                {/* 캐릭터 이름 & 주인공 여부 */}
                <div className={styles.characterInputField}>
                  <label
                    htmlFor={`characterName-${i}`}
                    className={styles.characterNameLabel}
                  >
                    캐릭터 이름
                  </label>
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
                      onChange={(e) =>
                        updateCharacter(i, "main", e.target.checked)
                      }
                    />
                    <span className={styles.customCheckbox}></span>
                    주인공
                  </label>
                </div>
              </div>
            ))}
            <button
              type="button"
              className={styles.subBtn}
              onClick={addCharacter}
            >
              + 캐릭터 추가
            </button>
          </div>

          {/* 버튼 영역 */}
          <div className={styles.characterFooter}>
            <button
              type="button"
              className={styles.ghostBtn}
              onClick={() => (window.location.href = "/studyMain")}
            >
              돌아가기
            </button>
            <button
              type="submit"
              className={styles.primaryBtn}
              onClick={sendButton}
            >
              동화 만들기
            </button>
          </div>
        </section>
      </div>

      {/* 출력 이미지 미리보기 */}
      <section className={styles.outputCard}>
        <h3 className={styles.cardTitle}>생성된 동화 이미지</h3>
        <div className={styles.outputGrid}>
          {imageUrls.length > 0 ? (
            imageUrls.map((url, idx) => (
              <div key={idx} className={styles.outputItem}>
                <img
                  src={`/image-proxy${url}`}
                  className={styles.illust}
                  alt={`동화 이미지 ${idx + 1}`}
                />
              </div>
            ))
          ) : (
            <p className={styles.noImage}>아직 생성된 이미지가 없습니다.</p>
          )}
        </div>
      </section>
    </div>
  );
}
