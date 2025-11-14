import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./studyMain.module.css";

import defaultAvatar from "../assets/myAvatar.png";
import book from "../assets/studyMainBook.png"; //추천동화 아이콘
import quiz from "../assets/studyMainQuiz.png"; //생성동화 아이콘
import badge from "../assets/studyMainBadge.png";

// import { getTale } from "../api/tale";
import { getTaleListAPI } from "../api/tale";
import { getCharacterAPI } from "../api/instance";

// const recommendation = [
//   {
//     id: 10,
//     title: "해와 달이 된 오누이",
//     genre: "전래 동화",
//     length: "약 8분",
//     summary: "용감한 남매가 호랑이를 피해 해와 달이 되는 이야기.",
//   },
//   {
//     id: 11,
//     title: "흥부와 놀부",
//     genre: "전래 동화",
//     length: "약 10분",
//     summary: "형제의 다른 마음가짐이 가져온 결과와 나눔의 가치를 전해요.",
//   },
// ];

const StudyMain = () => {
  const [childProfile, setChildProfile] = useState({
    name: "",
    avatar: "",
  });
  const [recommendedTale, setRecommendedTale] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const child = getStoredChild(); //json 파싱된 선택된 child
    if (child) {
      setChildProfile({
        name: child.name || "이름 없음",
        avatar: child.avatar || defaultAvatar,
      });
    }

    // 추천 동화 불러오기
    const fetchRecommendedTale = async () => {
      try {
        const res = await getTaleListAPI(); // 백에서 리스트 받아오기. 우선은 전체동화에서 랜덤선택이지만 추후에는 기성동화 db에서 가져올것
        const list = res?.data || []; // ← 핵심!
        if (!Array.isArray(list) || list.length === 0) return;
        console.log("동화 수:", list.length);

        const randomIndex = Math.floor(Math.random() * list.length);
        const selected = list[randomIndex];
        console.log("읽을 동화 taleId:", selected.id);

        setRecommendedTale(selected); // 추천 동화 상태에 넣기
      } catch (err) {
        console.error("추천 동화 불러오기 실패:", err);
      }
    };

    fetchRecommendedTale();
  }, []);

  const getStoredChild = () => {
    const stored = localStorage.getItem("selectedChild");
    return stored ? JSON.parse(stored) : null;
  };

  const handleStartClassicStudy = () => {
    if (!recommendedTale) return;

    navigate("/tale/study", {
      state: { taleId: recommendedTale.id },
    });
  };

  const handleAiBook = () => {
    navigate("/customStudy");
  };

  const handleMypage = () => {
    navigate("/mypage");
  };

  return (
    <div className={styles.container}>
      <div className={styles.headerRow}>
        <div className={styles.headerContent}>
          <img
            src={childProfile.avatar || defaultAvatar}
            className={styles.owl}
            alt="선택된 아바타"
          />
          <div className={styles.welcomeBox}>
            <span>
              <span className={styles.name}>{childProfile.name}</span>
              <span className={styles.welcome}>님, 환영해요!</span>
            </span>
            <div className={styles.miniTytle}>
              오늘은 어떤 동화를 읽어볼까요?
            </div>
          </div>
        </div>
      </div>
      {recommendedTale && (
        <div className={styles.recommendationSection}>
          <div className={styles.recommendationImage}>
            <img src={book} alt="오늘의 추천 동화" />
          </div>
          <div className={styles.recommendationText}>
            <span className={styles.sectionLabel}>오늘의 추천 동화</span>
            <h2 className={styles.recommendationTitle}>
              {recommendedTale.title}
            </h2>
            {/* <span className={styles.recommendationMeta}>
              {recommendedTale.genre} · {recommendedTale.length}
            </span>
            <p className={styles.recommendationSummary}>
              {recommendedTale.summary}
            </p> */}
          </div>
          <button
            type="button"
            className={styles.recommendationButton}
            onClick={handleStartClassicStudy}
          >
            학습하기
          </button>
        </div>
      )}
      <div className={styles.menuGrid}>
        <button className={styles.boxStudy} onClick={handleAiBook}>
          <img src={quiz} className={styles.icon} alt="맞춤 동화 놀이터" />
          맞춤 동화
          <br />
          학습하기
        </button>
        <button className={styles.boxBadge} onClick={handleMypage}>
          <img src={badge} className={styles.icon} alt="정보 관리" />
          정보 <br />
          관리
        </button>
      </div>
    </div>
  );
};

export default StudyMain;
