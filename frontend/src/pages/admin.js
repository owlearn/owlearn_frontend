import React, { useState } from "react";
import axios from "axios";
import styles from "./admin.module.css";

function AdminUploadPage() {
  const [title, setTitle] = useState("");
  const [contents, setContents] = useState([""]);
  const [imageUrls, setImageUrls] = useState([""]);
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

  const handleImageChange = (index, file) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const updated = [...imageUrls];
      updated[index] = reader.result;
      setImageUrls(updated);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleQuizChange = (index, field, value) => {
    const updated = [...quizzes];
    if (field === "choices") {
      updated[index].choices = [...updated[index].choices];
      updated[index].choices[value.choiceIndex] = value.text;
    } else {
      updated[index][field] = value;
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
    setImageUrls([...imageUrls, ""]);
  };

  const handleUpload = async () => {
    try {
      const taleRes = await axios.post("/api/tales", {
        title,
        contents,
        imageUrls,
      });
      const taleId = taleRes.data.id;

      await axios.post(
        "/api/quizzes",
        quizzes.map((q) => ({ ...q, taleId }))
      );

      alert("동화와 퀴즈가 성공적으로 업로드되었습니다!");
    } catch (error) {
      console.error("업로드 실패:", error);
      alert("업로드에 실패했습니다.");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.sectionWrapper}>
        {/* 왼쪽: 동화 등록 */}
        <div className={styles.section}>
          <h3 className={styles.header}>동화 등록</h3>

          <h4>동화 제목</h4>
          <input
            className={styles.input}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <h4>페이지별 내용</h4>
          {contents.map((text, idx) => (
            <textarea
              key={idx}
              placeholder={`페이지 ${idx + 1}`}
              value={text}
              onChange={(e) => handleContentChange(idx, e.target.value)}
              className={styles.pageTextarea}
            />
          ))}

          <h4>이미지 업로드</h4>
          {imageUrls.map((url, idx) => (
            <input
              key={idx}
              type="file"
              accept="image/*"
              onChange={(e) => handleImageChange(idx, e.target.files[0])}
              className={styles.input}
            />
          ))}

          <button className={styles.addPageButton} onClick={addPage}>
            + 페이지 및 이미지 추가
          </button>
        </div>

        {/* 오른쪽: 퀴즈 등록 */}
        <div className={styles.section}>
          <h2 className={styles.header}>퀴즈 등록</h2>
          {quizzes.map((quiz, idx) => (
            <div key={idx}>
              <h4>문제 {idx + 1}</h4>
              <input
                className={styles.input}
                placeholder="문제 내용"
                value={quiz.question}
                onChange={(e) =>
                  handleQuizChange(idx, "question", e.target.value)
                }
              />
              {quiz.choices.map((choice, cIdx) => (
                <input
                  key={cIdx}
                  className={styles.input}
                  placeholder={`선지 ${cIdx + 1}`}
                  value={choice}
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
                  handleQuizChange(idx, "answerIndex", parseInt(e.target.value))
                }
              >
                <option value={0}>정답: 선지 1</option>
                <option value={1}>정답: 선지 2</option>
                <option value={2}>정답: 선지 3</option>
                <option value={3}>정답: 선지 4</option>
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

          <button className={styles.addQuizButton} onClick={addQuiz}>
            + 퀴즈 추가
          </button>
        </div>
      </div>

      {/* 하단 전체 업로드 버튼 */}
      <button className={styles.uploadButton} onClick={handleUpload}>
        동화 및 퀴즈 전체 업로드
      </button>
    </div>
  );
}

export default AdminUploadPage;
