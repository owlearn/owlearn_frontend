import React, { useState } from "react";
import styles from "./quiz.module.css";
import { useNavigate } from "react-router-dom";

//test

const quizData = {
  reading: [
    {
      id: 1,
      question: "What did Lily love to do the most?",
      options: [
        "Playing with her friends in the village.",
        "Dancing with fairies in the forest.",
        "Swimming in the river.",
        "Climbing oak trees.",
      ],
      answerIndex: 1,
    },
  ],
  grammar: [
    {
      id: 1,
      question: "Which sentence is grammatically correct?",
      options: [
        "She don't like apples.",
        "He go to school every day.",
        "They is happy.",
        "We are ready.",
      ],
      answerIndex: 3,
    },
  ],
  listening: [
    {
      id: 1,
      question: "What sound did Lily hear in the forest?",
      options: [
        "A river flowing.",
        "Birds singing.",
        "Fairies giggling.",
        "Leaves rustling.",
      ],
      answerIndex: 2,
    },
  ],
};

function Quiz() {
  const [activeTab, setActiveTab] = useState("reading"); //카테고리 선택
  const [selected, setSelected] = useState({}); //보기 선택

  const navigate = useNavigate();

  const currentQuiz = quizData[activeTab][0]; // 각 카테고리마다 퀴즈 하나씩 있다고 가정

  const handleSubmit = () => {
    if (selected[activeTab] !== undefined) {
      navigate("/tale/quiz/answer");
    } //선택된 탭에서 선지 눌렀다면 이동
    else alert("정답을 선택해주세요");
  };

  return (
    <div className={styles.container}>
      {/* 탭 */}
      <div className={styles.tabs}>
        {["reading", "grammar", "listening"].map((tab) => (
          <button
            key={tab}
            className={`${styles.tab} ${
              activeTab === tab ? styles.active : ""
            }`}
            onClick={() => {
              setActiveTab(tab);
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* 퀴즈 내용 */}
      <div className={styles.quizBox}>
        <h2>[ Question {currentQuiz.id} ]</h2>
        <p className={styles.questionText}>{currentQuiz.question}</p>
        <div className={styles.options}>
          {currentQuiz.options.map((option, index) => (
            <label key={index} className={styles.optionLabel}>
              <input
                type="radio"
                name={`quiz-${activeTab}`} //탭별로 radio 저장
                checked={selected[activeTab] === index}
                onChange={() =>
                  setSelected((prev) => ({ ...prev, [activeTab]: index }))
                }
              />
              <span>{option}</span>
            </label>
          ))}
        </div>
      </div>

      <button className={styles.submitButton} onClick={handleSubmit}>
        정답 제출
      </button>
    </div>
  );
}

export default Quiz;
