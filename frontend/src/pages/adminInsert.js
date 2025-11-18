import React, { useState, useEffect } from "react";
import styles from "./adminInsert.module.css";
import { insertTaleAPI } from "../api/tale";

const AdminUploadPage = () => {
  const [title, setTitle] = useState("");
  const [contents, setContents] = useState([""]);

  const handleContentChange = (index, value) => {
    const updated = [...contents];
    updated[index] = value;
    setContents(updated);
  };

  const addPage = () => {
    setContents([...contents, ""]);
  };

  const handleUpload = async () => {
    const payload = {
      title,
      contents,
    };
    console.log("보낼 데이터:", payload);
    try {
      await insertTaleAPI(payload);
      alert("업로드 성공!");
    } catch (err) {
      console.error(err);
      alert("업로드 실패: " + err.message);
    }
  };

  useEffect(() => {
    console.log({ title, contents });
  }, [title, contents]);

  return (
    <div className={styles.container}>
      <div className={styles.sectionWrapper}>
        <div className={styles.section}>
          <h3 className={styles.header}>동화 등록</h3>
          <h4>동화 제목</h4>
          <input
            className={styles.input}
            placeholder="동화 제목"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <h4>페이지별 내용</h4>
          {contents.map((text, idx) => (
            <div key={idx} className={styles.pageBlock}>
              <textarea
                className={styles.pageTextarea}
                placeholder={`${idx + 1} 페이지에 들어갈 내용`}
                value={text}
                onChange={(e) => handleContentChange(idx, e.target.value)}
              />
            </div>
          ))}
          <button
            type="button"
            className={styles.addPageButton}
            onClick={addPage}
          >
            + 페이지 추가
          </button>
        </div>
      </div>
      <button
        type="button"
        className={styles.uploadButton}
        onClick={handleUpload}
      >
        동화 전체 업로드
      </button>
    </div>
  );
};

export default AdminUploadPage;
