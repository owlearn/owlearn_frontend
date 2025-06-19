import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styles from "./adminEdit.module.css";
import { getTale, editTaleAPI } from "../api/tale";
import { getQuizAPI } from "../api/quizzes";

function EditTalePage() {
  const { taleId } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [contents, setContents] = useState([]);
  const [imageUrls, setImageUrls] = useState([]);
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const taleRes = await getTale(taleId);
        const taleData = taleRes.data?.responseDto;

        const quizRes = await getQuizAPI(taleId);
        const quizData = quizRes.data || [];

        setTitle(taleData.title || "");
        setContents(taleData.contents || []);
        setImageUrls(taleData.imageUrls || []);
        setQuizzes(quizData);
      } catch (err) {
        console.error("데이터 불러오기 실패:", err);
      }
    };
    fetchData();
  }, [taleId]);

  const handleQuizChange = (idx, field, payload) => {
    const updated = [...quizzes];
    if (field === "choices") {
      const { optionIndex, text } = payload;
      if (!Array.isArray(updated[idx].choices))
        updated[idx].choices = ["", "", "", ""];
      updated[idx].choices[optionIndex] = text;
    } else {
      updated[idx][field] = payload;
    }
    setQuizzes(updated);
  };

  const handleUpdate = async () => {
    try {
      // 백엔드에서 요구하는 구조로 quizzes 변환
      const formattedQuizzes = quizzes.map((q) => ({
        question: q.question,
        options: q.choices || [], // ← 백엔드는 "options"를 요구함
        answer: q.answer, // ← 문자열이 아닌 숫자여야 하면 parseInt 필요
      }));

      // // await editTaleAPI(taleId, {
      // //   title,
      // //   contents,
      // //   imageUrls,
      // //   quizzes: formattedQuizzes,
      // // });

      // alert("수정 완료!");
      navigate("/admin/list");
    } catch (error) {
      alert("수정 실패: " + error.message);
    }
  };
  const addQuiz = () => {
    setQuizzes((prev) => [
      ...prev,
      {
        question: "",
        options: ["", "", "", ""],
        answer: "0",
      },
    ]);
  };

  const deleteQuiz = (idx) => {
    const updated = [...quizzes];
    updated.splice(idx, 1);
    setQuizzes(updated);
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>동화 수정</h2>
      <input
        className={styles.input}
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="제목"
      />
      <h4>내용</h4>
      {contents.map((content, idx) => (
        <textarea
          key={idx}
          className={styles.textarea}
          value={content}
          onChange={(e) => {
            const updated = [...contents];
            updated[idx] = e.target.value;
            setContents(updated);
          }}
        />
      ))}
      <h4>이미지 URL</h4>
      {imageUrls.map((url, idx) => (
        <input
          key={idx}
          className={styles.input}
          value={url}
          onChange={(e) => {
            const updated = [...imageUrls];
            updated[idx] = e.target.value;
            setImageUrls(updated);
          }}
        />
      ))}
      <h4>퀴즈</h4>
      {quizzes.map((quiz, idx) => (
        <div key={idx} className={styles.quizBox}>
          <input
            className={styles.question}
            placeholder="문제"
            value={quiz.question || ""}
            onChange={(e) => handleQuizChange(idx, "question", e.target.value)}
          />

          {(quiz.choices || []).map((opt, oIdx) => (
            <input
              key={oIdx}
              className={styles.input}
              placeholder={`선지 ${oIdx + 1}`}
              value={opt}
              onChange={(e) =>
                handleQuizChange(idx, "choices", {
                  optionIndex: oIdx,
                  text: e.target.value,
                })
              }
            />
          ))}

          <select
            className={styles.select}
            value={quiz.answer}
            onChange={(e) => handleQuizChange(idx, "answer", e.target.value)}
          >
            {(quiz.choices || []).map((opt, i) => (
              <option key={i} value={i.toString()}>
                정답: {opt || `선지 ${i + 1}`}
              </option>
            ))}
          </select>

          {/* 삭제 버튼 */}
          <button
            className={styles.deleteBtn}
            type="button"
            onClick={() => deleteQuiz(idx)}
          >
            퀴즈 삭제
          </button>
        </div>
      ))}
      <button className={styles.submitButton} onClick={handleUpdate}>
        수정 완료
      </button>
    </div>
  );
}

export default EditTalePage;
