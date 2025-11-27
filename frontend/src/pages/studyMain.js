import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./studyMain.module.css";

import defaultAvatar from "../assets/myAvatar.png";
import book from "../assets/studyMainBook.png"; //추천동화 아이콘
import LoadingOverlay from "../component/LoadingOverlay";
// import { getTale } from "../api/tale";
import { imageBaseUrl } from "../api/instance"; //백엔드 이미지 서버
import { getOldTale } from "../api/tale"; //기성동화조회
import { oldTaleImageGen } from "../api/tale"; //기성동화이미지생성

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
  const [child, setChild] = useState(null); // 로컬스토리지에 저장된 아이 상태
  const [loading, setLoading] = useState(false);
  const [loadingWord, setLoadingWord] = useState(null);
  const loadingIntervalRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const syncChild = () => {
      const stateChild = location.state?.child;
      if (stateChild) {
        localStorage.setItem("selectedChild", JSON.stringify(stateChild));
        return stateChild;
      }
      const stored = getStoredChild();
      if (!stored) return null;
      return stored;
    };

    const activeChild = syncChild();
    if (activeChild) {
      setChild(activeChild);
      setChildProfile({
        name: activeChild.name || "이름 없음",
        avatar: activeChild.avatar || defaultAvatar,
      });
    } else {
      setChildProfile({
        name: "자녀를 선택해 주세요",
        avatar: defaultAvatar,
      });
    }

    // 추천 동화 불러오기
    const fetchRecommendedTale = async () => {
      try {
        const res = await getOldTale(); // 기성동화 db에서 가져올것
        const list = res?.data.responseDto || [];
        //if (!Array.isArray(list) || list.length === 0) return;
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
  }, [location.state]);

  const getStoredChild = () => {
    const stored = localStorage.getItem("selectedChild");
    return stored ? JSON.parse(stored) : null;
  };

  const loadingWords = [
    { word: "adventure", meaning: "모험, 신나는 경험" },
    { word: "imagine", meaning: "상상하다" },
    { word: "curious", meaning: "호기심 많은" },
    { word: "sparkle", meaning: "반짝이다, 빛나다" },
    { word: "journey", meaning: "여행, 여정" },
    { word: "whisper", meaning: "속삭이다" },
    { word: "wonder", meaning: "경이로움, 놀라움" },
    { word: "brave", meaning: "용감한" },
    { word: "dream", meaning: "꿈, 상상하다" },
    { word: "explore", meaning: "탐험하다" },
    { word: "gleam", meaning: "희미하게 빛나다" },
  ];

  const pickLoadingWord = () => {
    const idx = Math.floor(Math.random() * loadingWords.length);
    setLoadingWord(loadingWords[idx]);
  };

  useEffect(() => {
    if (loading) {
      pickLoadingWord();
      loadingIntervalRef.current = setInterval(() => {
        pickLoadingWord();
      }, 4000);
    } else {
      if (loadingIntervalRef.current) {
        clearInterval(loadingIntervalRef.current);
        loadingIntervalRef.current = null;
      }
      setLoadingWord(null);
    }
    return () => {
      if (loadingIntervalRef.current) {
        clearInterval(loadingIntervalRef.current);
        loadingIntervalRef.current = null;
      }
    };
  }, [loading]);

  const handleStartClassicStudy = async () => {
    if (!recommendedTale) {
      alert("추천 동화 오류");
      return;
    }
    const childId = child?.id;
    if (!childId) {
      alert("아이 정보 오류");
      return;
    }

    // 기성동화학습 누르면 로딩
    setLoading(true);
    pickLoadingWord();

    try {
      const res = await oldTaleImageGen(recommendedTale.id, childId);
      const newTaleId = res.data.responseDto.taleId;

      navigate("/tale/study", { state: { taleId: newTaleId } });
    } catch (err) {
      console.error("기성 동화 이미지 생성 실패:", err);
      alert("동화를 준비하는 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  const handleAiBook = () => {
    navigate("/customStudy");
  };

  const handleMypage = () => {
    navigate("/mypage");
  };

  const getAvatarSrc = () => {
    const avatar = childProfile.avatar;
    if (!avatar) return defaultAvatar; // 없으면 기본 이미지
    return `${imageBaseUrl}${avatar}`; // backend path
  };

  return (
    <div className={styles.page}>
      <div className={styles.headerRow}>
        <div className={styles.headerContent}>
          <img
            src={getAvatarSrc()}
            className={styles.owl}
            alt="선택된 아바타"
          />
          <div className={styles.welcomeBox}>
            <span className={styles.pill}>🧚‍♀️ 오늘의 동화 준비 완료</span>
            <div className={styles.welcomeLine}>
              <span className={styles.name}>{childProfile.name}</span>
              <span className={styles.welcome}>님, 환영해요!</span>
            </div>
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
            <div className={styles.attributeRow}>
              {recommendedTale.subject && (
                <span className={styles.attributeChip}>
                  <span className={styles.attributeLabel}>주제</span>
                  {recommendedTale.subject}
                </span>
              )}
              {recommendedTale.tone && (
                <span className={styles.attributeChip}>
                  <span className={styles.attributeLabel}>톤</span>
                  {recommendedTale.tone}
                </span>
              )}
              {recommendedTale.artStyle && (
                <span className={styles.attributeChip}>
                  <span className={styles.attributeLabel}>화풍</span>
                  {recommendedTale.artStyle}
                </span>
              )}
              {recommendedTale.ageGroup && (
                <span className={styles.attributeChip}>
                  <span className={styles.attributeLabel}>연령</span>
                  {recommendedTale.ageGroup}
                </span>
              )}
            </div>
          </div>
          <button
            type="button"
            className={styles.recommendationButton}
            onClick={handleStartClassicStudy}
            disabled={loading}
          >
            {loading ? "준비 중..." : "학습하기"}
          </button>
        </div>
      )}

      <div className={styles.menuGrid}>
        <button
          className={styles.menuCard}
          onClick={handleAiBook}
          aria-label="맞춤 동화 학습하기"
        >
          <div className={styles.menuBadge}>AI 동화</div>
          <div className={styles.menuTitle}>맞춤 동화 만들기</div>
          <div className={styles.menuDesc}>아이 취향에 맞는 새로운 이야기</div>
        </button>
        <button className={styles.menuCard} onClick={handleMypage}>
          <div className={styles.menuBadge}>My Page</div>
          <div className={styles.menuTitle}>내 기록 보러가기</div>
          <div className={styles.menuDesc}>학습 이력과 리포트를 확인해요</div>
        </button>
      </div>

      {loading && (
        <LoadingOverlay
          message="동화를 재구성중이에요…"
          subMessage="약 1분 정도 걸려요. 잠시만 기다려주세요!"
          word={loadingWord}
        />
      )}
    </div>
  );
};

export default StudyMain;
