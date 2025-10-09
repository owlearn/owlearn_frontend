import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Prompting.module.css";
import { Image2ImageAPI } from "../api/prompt";
import { imageBaseUrl } from "../api/instance";

export default function Prompting() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [prompt, setPrompt] = useState("");
  const [refImage, setRefImage] = useState(null); // 단일 이미지 입력
  const [imageUrls, setImageUrls] = useState([]);
  const [loading, setLoading] = useState(false); // 로딩 상태 추가

  const sendButton = async () => {
    if (!prompt) {
      alert("프롬프트를 작성해주세요!");
      return;
    }

    try {
      setLoading(true); // 요청 시작
      const response = await Image2ImageAPI(prompt, refImage);
      console.log("response:", response);

      if (response && response.data) {
        setImageUrls(response.data); // 서버에서 출력 이미지 배열 받기
        alert("동화 생성이 완료되었습니다!");
      } else {
        console.error("API 응답이 올바르지 않습니다:", response);
        alert("동화 생성 결과가 비어 있습니다.");
      }
    } catch (error) {
      console.error("동화 생성 오류:", error);
      alert("동화 생성 중 문제가 발생했습니다.");
    } finally {
      setLoading(false); // 무조건 로딩 종료
    }
  };

  return (
    <div className={styles.page}>
      <h2 className={styles.header}>나만의 동화 만들기</h2>
      {/* form으로 전체 감싸기 */}
      <form
        className={styles.form}
        onSubmit={sendButton}
        encType="multipart/form-data"
      >
        <div className={styles.row}>
          {/* 동화 입력 */}

          <section className={`${styles.card} ${styles.storybook}`}>
            <h3 className={styles.cardTitle}>동화 입력</h3>
            <div className={styles.contentWrapper}>
              {/* <input
              className={styles.input}
              type="text"
              placeholder="동화 제목을 입력하세요."
              onChange={(e) => {
                setTitle(e.target.value);
                console.log("[title]: ", e.target.value);
              }}
              value={title}
            /> */}
              {/* 우선 제목은 제외하고, 프롬프트로만 이미지 생성 */}
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

          {/* 캐릭터 이미지 업로드 */}
          <section className={`${styles.card} ${styles.refImage}`}>
            <h3 className={styles.cardTitle}>캐릭터 이미지 업로드</h3>
            <div className={styles.contentWrapper}>
              <label className={styles.characterUploadBox}>
                {refImage ? (
                  <img
                    src={URL.createObjectURL(refImage)}
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
                  onChange={(e) => setRefImage(e.target.files[0])}
                />
              </label>
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
                disabled={loading} // 로딩 중이면 버튼 비활성화
              >
                {loading ? "생성 중..." : "동화 만들기"}
              </button>
            </div>
          </section>
        </div>
      </form>

      {/* 출력 이미지 미리보기 */}
      <section className={styles.outputCard}>
        <h3 className={styles.cardTitle}>생성된 동화 이미지</h3>
        <div className={styles.outputGrid}>
          {loading ? (
            <p className={styles.loading}>
              이미지를 생성 중입니다. 잠시만 기다려주세요...
            </p>
          ) : imageUrls.length > 0 ? (
            imageUrls.map((url, idx) => (
              <div key={idx} className={styles.outputItem}>
                <img
                  src={`${imageBaseUrl}${url}`}
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
