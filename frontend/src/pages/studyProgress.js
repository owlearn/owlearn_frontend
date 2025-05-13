import React, { useState, useEffect } from "react";
import styles from "./studyProgress.module.css";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import illust from "../assets/illust.png";

import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import { GiSpeaker } from "react-icons/gi";

const dummyTytle = "Lily and the Magic Within";
const dummyImg = illust;
const dummyStory = [
  // Page 1
  "Once upon a time, in a tiny village nestled between two great oak trees, there lived a little girl named Lily. \n\n She had hair as bright as sunshine and skin as smooth as honey. \n\n Lily loved nothing more than to spend her days exploring the forest, where she would dance with the fairies under the whispering leaves.",

  // Page 2
  "2page ",

  // Page 3
  "3page",

  // Page 4
  "4page",

  // Page 5
  "5page",
];

function StudyProgress() {
  {
    /*const location = useLocation();
  const query = new URLSearchParams(location.search);
  const initialPage = parseInt(query.get("page")) || 1;
  const [page, setPage] = useState(initialPage); 
  페이지로 렌더링하는 방식 시 사용 */
  }

  const [page, setPage] = useState(1);

  const entirePage = 10;

  const navigate = useNavigate();

  const pageMinus = () => {
    if (page > 1) setPage(page - 1);
  };

  const pageAdd = () => {
    if (page < entirePage) setPage(page + 1);
  };

  return (
    <div>
      <div className={styles.tytle}>{dummyTytle}</div>
      <div className={styles.rightContainer}>
        <img src={dummyImg} className={styles.illust}></img>{" "}
        <div className={styles.storyBox}>
          <p>{dummyStory[page - 1]}</p>
          <div className={styles.pageBtn}>
            {page == 1 ? null : (
              <button className={styles.arrow} onClick={pageMinus}>
                <IoIosArrowBack />
              </button>
            )}
            {/* 1페이지면 왼쪽 버튼 삭제 */}
            <span>
              {page}/{entirePage}
            </span>
            <button className={styles.arrow} onClick={pageAdd}>
              {page == entirePage ? null : <IoIosArrowForward />}
            </button>
          </div>
        </div>
      </div>
      <div className={styles.bottomContainer}>
        <button className={styles.speakerBtn}>
          {" "}
          <GiSpeaker />
        </button>{" "}
        {/* 현재 tts 미사용이므로 비활성화 */}
        {/*<div className={styles.progress}>
          <span>진행도 : {(page / entirePage) * 100}%</span>
           진행바 삭제:
          <progress value={page / entirePage} strokeColor="#658864" />
        </div> */}
        <div></div>
        {page == entirePage ? (
          <button
            className={styles.quizBtn}
            onClick={() => navigate("/tale/quiz")}
          >
            QUIZ
          </button>
        ) : null}{" "}
        {/* 끝까지 가면 quiz 버튼 활성화 */}
      </div>
    </div>
  );
}

export default StudyProgress;
