import React, { useState, useEffect } from "react";
import styles from "./studyMain.module.css";
import { useNavigate } from "react-router-dom";

import owl from "../assets/studyMainOwl.png";
import fairytale from "../assets/fairy.png";
import book from "../assets/studyMainBook.png";
import quiz from "../assets/studyMainQuiz.png";
import badge from "../assets/studyMainBadge.png";
import search from "../assets/studyMainSearch.png";

import { getTale } from "../api/tale";

function StudyMain() {
  const [title, setTitle] = useState("");
  const [imageUrls, setImageUrls] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const apiGetTale = async () => {
      try {
        const response = await getTale(13);
        const data = response.data.responseDto;
        setTitle(data.title);
        setImageUrls(data.imageUrls);
      } catch (error) {
        console.error("Error fetching tale: ", error);
      }
    };
    apiGetTale();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <div className={styles.leftTytle}>
          <img src={owl} className={styles.owl}></img>{" "}
          <h3 className={styles.tytle}>
            오늘의 추천 동화, <br /> 도전해볼래요?
          </h3>
        </div>
        <div className={styles.leftContent}>
          <h2 className={styles.bookTytle}>{title}</h2>
          <img
            src={`/image-proxy${imageUrls[0]}`}
            className={styles.image}
          ></img>
        </div>
        <button
          className={styles.readBtn}
          onClick={() => navigate("/tale/study")}
        >
          지금 읽기
        </button>
      </div>
      <div className={styles.right}>
        <div className={styles.rightTytle}>
          <span className={styles.name}>윤현동</span>
          <span>님, 환영해요!</span>
        </div>
        <div className={styles.miniTytle}>오늘은 어떤 동화를 읽어볼까요?</div>
        <div className={styles.boxContainer}>
          <button
            className={styles.boxStudy}
            onClick={() => navigate("/prompting")}
          >
            <img src={book} className={styles.icon}></img>
            동화 학습
            <br />
            시작하기
          </button>
          <button
            className={styles.boxQuiz}
            onClick={() => navigate("/tale/quiz")}
          >
            <img src={quiz} className={styles.icon}></img>
            동화 퀴즈 <br /> 풀기
          </button>
          <button
            className={styles.boxBadge}
            // onClick={() => navigate("/mypage")}
            //마이페이지 구현 후 활성화
          >
            <img src={badge} className={styles.icon}></img>
            나의 <br />
            학습 뱃지
          </button>
          <button
            className={styles.boxSearch}
            // onClick={() => navigate("/tale/list")}
            // 해당 페이지 구현 후 활성화 (동화 리스트는 페이지 존재여부도 미정)
          >
            <img src={search} className={styles.icon}></img>
            동화 <br />
            둘러보기
          </button>
        </div>
      </div>
    </div>
  );
}

export default StudyMain;
