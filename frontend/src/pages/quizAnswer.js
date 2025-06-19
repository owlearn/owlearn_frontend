import React, { useState, useEffect } from "react";
import styles from "./quizAnswer.module.css";
import { useNavigate, useLocation } from "react-router-dom";
import { getQuizAPI } from "../api/quizzes";

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
      why: "정답은 [Dancing with fairies in the forest.] 입니다.\n 동화 속에서 Lily는 숲 속에서 요정들과 춤추는 것을 가장 좋아했습니다. \n 'Lily loved nothing more than to spend her days exploring the forest'에서 요정들과 춤추었다고 명시되어 있습니다.\n다른 보기들은 본문 내용과 일치하지 않습니다.",
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
      why: "정답은 [We are ready.]입니다. \n이 문장은 문법적으로 올바른 주어-동사 일치를 보여줍니다. \n\n She don’t like apples. → She는 3인칭 단수이므로 [doesn’t]를 써야 합니다.\n He go to school every day. → He는 3인칭 단수이므로 [goes]가 맞습니다.\nThey is happy. → They는 복수이므로 [are]을 써야 합니다.",
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
      why: "정답은 [Fairies giggling]입니다. \n 동화 속에서 Lily는 숲 속을 걷다가 희미하게 들려오는 요정들의 웃음소리(giggling)를 듣고 발걸음을 멈추게 됩니다.\n 이는 요정들과의 마법 같은 만남을 암시하는 중요한 단서로, 이야기의 전개에서도 핵심적인 역할을 합니다.",
    },
  ],
};

const QuizAnswer = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();
  const result = location.state?.result || [];

  const studyEnd = () => navigate("/studyMain");

  useEffect(() => {
    const getQuiz = async () => {
      try {
        const response = await getQuizAPI(13);
        setQuizzes(response.data);
      } catch (error) {
        console.error("Error fetching quiz: ", error);
      }
    };
    getQuiz();
  }, []);

  const isCorrect = result[currentIndex]?.isCorrect;
  const explanation = result[currentIndex]?.explanation;
  const question = quizzes[currentIndex]?.question;

  return (
    <div className={styles.container}>
      {/* 문제 번호 탭 */}
      <div className={styles.tabs}>
        {quizzes.map((_, i) => (
          <button
            key={i}
            className={`${styles.tab} ${
              currentIndex === i ? styles.active : ""
            }`}
            onClick={() => setCurrentIndex(i)}
          >
            {i + 1}
          </button>
        ))}
      </div>

      {/* 퀴즈 해설 */}
      {quizzes.length > 0 && (
        <div className={styles.quizBox}>
          <h2>{isCorrect ? "정답입니다!" : "오답입니다!"}</h2>
          <p className={styles.questionText}>Q. {question}</p>
          <p className={styles.answer}>[해설] {explanation}</p>
        </div>
      )}

      <button className={styles.submitButton} onClick={studyEnd}>
        학습 종료
      </button>
    </div>
  );
};

export default QuizAnswer;
