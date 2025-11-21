import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./studyMain.module.css";

import defaultAvatar from "../assets/myAvatar.png";
import book from "../assets/studyMainBook.png"; //추천동화 아이콘
import quiz from "../assets/studyMainQuiz.png"; //생성동화 아이콘
import badge from "../assets/studyMainBadge.png";

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
    <div className={styles.container}>
      <div className={styles.headerRow}>
        <div className={styles.headerContent}>
          <img
            src={getAvatarSrc()}
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
            disabled={loading}
          >
            {loading ? "준비 중..." : "학습하기"}
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
      {loading && (
        <div className={styles.loadingOverlay}>
          <div className={styles.loader} />
          <div className={styles.loadingText}>동화를 재구성중이에요…</div>
        </div>
      )}
    </div>
  );
};

export default StudyMain;
