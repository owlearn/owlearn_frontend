import React, { useState, useEffect } from "react";
import styles from "./studyProgress.module.css";
import { useNavigate } from "react-router-dom";

import illust from "../assets/illust.png";

import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import { GiSpeaker } from "react-icons/gi";

import { getTale } from "../api/tale";

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
  const [title, setTitle] = useState("");
  const [contents, setContents] = useState([]);
  const [imageUrls, setImageUrls] = useState([]);
  const entirePage = contents.length;

  const navigate = useNavigate();

  const pageMinus = () => {
    if (page > 1) setPage(page - 1);
  };

  const pageAdd = () => {
    if (page < entirePage) setPage(page + 1);
  };

  useEffect(() => {
    const apiGetTale = async () => {
      try {
        const response = await getTale(13);
        const data = response.data.responseDto;
        setTitle(data.title);
        setContents(
          data.contents.map(
            (text) => text.replace(/([.?!])\s*/g, "$1\n\n") // 문장마다 줄바꿈
          )
        );
        setImageUrls(data.imageUrls);
      } catch (error) {
        console.error("Error fetching tale: ", error);
      }
    };
    apiGetTale(0);
  }, []);

  return (
    <div>
      <div className={styles.tytle}>{title}</div>
      <div className={styles.rightContainer}>
        {imageUrls[page - 1] && (
          <>
            <img
              src={`/image-proxy${imageUrls[page - 1]}`}
              className={styles.illust}
              alt={`Page ${page}`}
            />
            {console.log(
              "[이미지 src]: ",
              `/image-proxy${imageUrls[page - 1]}`
            )}
          </>
        )}
        <div className={styles.storyBox}>
          <p>{contents[page - 1]}</p>
          <div className={styles.pageBtn}>
            <button
              className={styles.arrow}
              onClick={pageMinus}
              style={{ visibility: page === 1 ? "hidden" : "visible" }}
            >
              <IoIosArrowBack />
            </button>

            <span>
              {page}/{entirePage}
            </span>

            <button
              className={styles.arrow}
              onClick={pageAdd}
              style={{ visibility: page === entirePage ? "hidden" : "visible" }}
            >
              <IoIosArrowForward />
            </button>
          </div>
        </div>
      </div>
      <div className={styles.bottomContainer}>
        {<button className={styles.speakerBtn}> {/* <GiSpeaker /> */}</button>}
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
