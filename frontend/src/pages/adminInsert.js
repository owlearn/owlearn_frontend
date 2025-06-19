import React, { useState, useEffect } from "react";
import styles from "./adminInsert.module.css";
import { insertTaleAPI } from "../api/tale";

function AdminUploadPage() {
  const [title, setTitle] = useState("");
  const [contents, setContents] = useState([""]);
  const [images, setImages] = useState([null]);
  const [quizzes, setQuizzes] = useState([
    {
      questionNumber: 1,
      question: "",
      choices: ["", "", "", ""],
      answerIndex: 0,
      explanation: "",
    },
  ]);

  const handleContentChange = (index, value) => {
    const updated = [...contents];
    updated[index] = value;
    setContents(updated);
  };

  const handleImageChange = (idx, file) => {
    const updated = [...images];
    updated[idx] = file;
    setImages(updated);
  };

  const handleQuizChange = (idx, field, payload) => {
    const updated = [...quizzes];
    if (field === "choices") {
      const { choiceIndex, text } = payload;
      updated[idx].choices[choiceIndex] = text;
    } else {
      updated[idx][field] = payload;
    }
    setQuizzes(updated);
  };

  const addQuiz = () => {
    setQuizzes([
      ...quizzes,
      {
        questionNumber: quizzes.length + 1,
        question: "",
        choices: ["", "", "", ""],
        answerIndex: 0,
        explanation: "",
      },
    ]);
  };

  const addPage = () => {
    setContents([...contents, ""]);
    setImages([...images, null]);
  };

  const handleUpload = async () => {
    console.log("보낼 quizzes:", JSON.stringify(quizzes));
    try {
      await insertTaleAPI(title, contents, quizzes, images);
      alert("업로드 성공!");
    } catch (err) {
      console.error(err);
      alert("업로드 실패: " + err.message);
    }
  };

  useEffect(() => {
    console.log({ title, contents, images, quizzes });
  }, [title, contents, images, quizzes]);

  return (
    <div className={styles.container}>
      <form
        encType="multipart/form-data"
        onSubmit={(e) => {
          e.preventDefault();
          handleUpload();
        }}
      >
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
                  placeholder={`페이지 ${idx + 1}`}
                  value={text}
                  onChange={(e) => handleContentChange(idx, e.target.value)}
                />
                <h4>이미지 업로드</h4>
                <input
                  type="file"
                  accept="image/*"
                  className={styles.input}
                  onChange={(e) => handleImageChange(idx, e.target.files[0])}
                />
              </div>
            ))}
            <button
              type="button"
              className={styles.addPageButton}
              onClick={addPage}
            >
              + 페이지 및 이미지 추가
            </button>
          </div>

          <div className={styles.section}>
            <h3 className={styles.header}>퀴즈 등록</h3>
            {quizzes.map((quiz, idx) => (
              <div key={idx} className={styles.quizBlock}>
                <h4>문제 {idx + 1}</h4>
                <input
                  className={styles.input}
                  placeholder="문제"
                  value={quiz.question}
                  onChange={(e) =>
                    handleQuizChange(idx, "question", e.target.value)
                  }
                />
                {quiz.choices.map((opt, cIdx) => (
                  <input
                    key={cIdx}
                    className={styles.input}
                    placeholder={`선지 ${cIdx + 1}`}
                    value={opt}
                    onChange={(e) =>
                      handleQuizChange(idx, "choices", {
                        choiceIndex: cIdx,
                        text: e.target.value,
                      })
                    }
                  />
                ))}
                <select
                  className={styles.select}
                  value={quiz.answerIndex}
                  onChange={(e) =>
                    handleQuizChange(
                      idx,
                      "answerIndex",
                      parseInt(e.target.value)
                    )
                  }
                >
                  {quiz.choices.map((_, i) => (
                    <option key={i} value={i}>
                      정답: {quiz.choices[i] || `선지 ${i + 1}`}
                    </option>
                  ))}
                </select>
                <textarea
                  className={styles.textarea}
                  placeholder="해설"
                  value={quiz.explanation}
                  onChange={(e) =>
                    handleQuizChange(idx, "explanation", e.target.value)
                  }
                />
              </div>
            ))}
            <button
              type="button"
              className={styles.addQuizButton}
              onClick={addQuiz}
            >
              + 퀴즈 추가
            </button>
          </div>
        </div>

        <button className={styles.uploadButton}>
          동화 및 퀴즈 전체 업로드
        </button>
      </form>
    </div>
  );
}

export default AdminUploadPage;
