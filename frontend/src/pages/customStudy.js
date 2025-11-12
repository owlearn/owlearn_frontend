import React, { useMemo, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./customStudy.module.css";
import myAvatar from "../assets/myAvatar.png";
import axios from "axios"; //  나중에 API 연결 시 사용

const optionGroups = [
  { key: "theme", label: "주제", options: ["우정", "가족", "모험", "성장"] },
  {
    key: "mood",
    label: "분위기",
    options: ["따뜻한", "신비로운", "유쾌한", "감동적인"],
  },
  {
    key: "artStyle",
    label: "그림체",
    options: ["수채화", "동양화풍", "일러스트", "손그림"],
  },
  {
    key: "ageGroup",
    label: "연령대",
    options: ["유아(3-5세)", "초등저(6-8세)", "초등고(9-11세)"],
  },
];

// 초기 상태
const initialSelections = optionGroups.reduce(
  (acc, group) => ({ ...acc, [group.key]: "" }), //누적 acc 객체에 빈 group 추가 -> 빈 초기값 설정
  {}
);

const CustomStoryPage = () => {
  const navigate = useNavigate();
  const [selections, setSelections] = useState(initialSelections); //option 선택 state
  const [isGenerating, setIsGenerating] = useState(false); //모든 옵션 선택 여부로 생성 state
  const [bestStory, setBestStory] = useState(null); //베스트동화
  const [characterUrl, setCharacterUrl] = useState(myAvatar);

  const userId = 8; //  로그인 후 실제 토큰에서 가져올 예정
  const [taleId, setTaleId] = useState(0); //  현재 진행중인 동화 ID (더미 데이터)

  const isReady = useMemo(
    () => Object.values(selections).every((v) => Boolean(v)), //selections 값을 배열로 꺼내, 모두 true일때 true 반환
    [selections] //selections 변경 시 재계산(useMemo)
  );

  // 옵션이 완성되면 자동으로 추천 스토리 갱신
  useEffect(() => {
    if (!isReady) {
      setBestStory(null);
      return;
    }

    const { theme, mood, artStyle, ageGroup } = selections;

    // 나중에 실제 추천 API 연결 시 이 부분 주석 해제
    /*
    const fetchRecommendedStory = async () => {
      try {
        const mapping = {
          theme: { 우정: "FRIENDSHIP", 가족: "FAMILY", 모험: "ADVENTURE", 성장: "GROWTH" },
          mood: { 따뜻한: "WARM", 신비로운: "MYSTERIOUS", 유쾌한: "CHEERFUL", 감동적인: "TOUCHING" },
          artStyle: { 수채화: "WATERCOLOR", 동양화풍: "EAST_ASIAN", 일러스트: "ILLUSTRATION", 손그림: "HANDDRAWN" },
          ageGroup: { "유아(3-5세)": "TODDLER_3_5", "초등저(6-8세)": "KIDS_6_8", "초등고(9-11세)": "KIDS_9_11" },
        };

        const payload = {
          subject: mapping.theme[theme],
          tone: mapping.mood[mood],
          artStyle: mapping.artStyle[artStyle],
          ageGroup: mapping.ageGroup[ageGroup],
          userId: userId,
        };

        const res = await axios.post("/api/tales/recommend", payload, {
          headers: { "Content-Type": "application/json" },
        });

        const story = res.data?.responseDto;
        if (story) {
          setBestStory({
            title: story.title || `${theme}의 ${mood} 동화`,
            summary: story.summary || `${ageGroup} 독자를 위한 ${mood} 분위기의 ${theme} 이야기입니다.`,
            mood,
            artStyle,
            ageGroup,
            id: story.taleId,
          });
        } else {
          setBestStory({
            title: `${theme}의 ${mood} 동화`,
            summary: `${ageGroup} 독자를 위한 ${mood} 분위기의 ${theme} 이야기입니다.`,
            mood,
            artStyle,
            ageGroup,
          });
        }
      } catch (err) {
        console.error("추천 동화 불러오기 오류:", err);
      }
    };

    fetchRecommendedStory();
    */

    //  지금은 더미 추천 표시만 사용
    setBestStory({
      title: `${theme}주제의 ${mood} 동화`,
      summary: `${ageGroup} 독자를 위한 ${mood} 분위기의 ${theme} 이야기입니다.`,
      mood,
      artStyle,
      ageGroup,
    });
  }, [selections, isReady]);

  // 생성 버튼 클릭 시
  const handleGenerate = async () => {
    if (!isReady) {
      alert("모든 옵션을 선택해주세요!");
      return;
    }

    setIsGenerating(true);

    try {
      // 나중에 실제 동화 생성 API 연결 시 이 부분 주석 해제
      /*
      const mapping = {
        theme: { 우정: "FRIENDSHIP", 가족: "FAMILY", 모험: "ADVENTURE", 성장: "GROWTH" },
        mood: { 따뜻한: "WARM", 신비로운: "MYSTERIOUS", 유쾌한: "CHEERFUL", 감동적인: "TOUCHING" },
        artStyle: { 수채화: "WATERCOLOR", 동양화풍: "EAST_ASIAN", 일러스트: "ILLUSTRATION", 손그림: "HANDDRAWN" },
        ageGroup: { "유아(3-5세)": "TODDLER_3_5", "초등저(6-8세)": "KIDS_6_8", "초등고(9-11세)": "KIDS_9_11" },
      };

      const payload = {
        subject: mapping.theme[selections.theme],
        tone: mapping.mood[selections.mood],
        artStyle: mapping.artStyle[selections.artStyle],
        ageGroup: mapping.ageGroup[selections.ageGroup],
        userId: userId,
      };

      const res = await axios.post("/api/tales/generate", payload, {
        headers: { "Content-Type": "application/json" },
      });

      const newTaleId = res.data?.responseDto?.taleId;
      if (newTaleId) {
        alert("새로운 동화가 생성되었습니다!");
        navigate("/study/progress", { state: { taleId: newTaleId } });
      } else {
        alert("동화 생성에 실패했습니다.");
      }
      */

      //  지금은 더미 데이터 사용
      setTimeout(() => {
        const dummyTaleId = Math.floor(Math.random() * 1000) + 1;
        alert("새로운 동화가 생성되었습니다!");
        setTaleId(1);
        navigate(`/tale/study/${taleId}`, { state: { taleId: dummyTaleId } });
        setIsGenerating(false);
      }, 1000);
    } catch (err) {
      console.error("동화 생성 오류:", err);
      alert("동화를 생성하는 중 오류가 발생했습니다.");
      setIsGenerating(false);
    }
  };

  // 각 옵션 선택 핸들러
  const handleSelect = (groupKey, option) => {
    setSelections((prev) => ({
      ...prev, //이전 selections 객체 가져옴
      [groupKey]: prev[groupKey] === option ? "" : option, //prev[groupKey]의 값이 option 값과 같으면 빈값으로, 없으면 option값으로
    }));
  };

  return (
    <div className={styles.page}>
      {/* 상단 영역 */}

      <div className={styles.header}>
        <div className={styles.heroContent}>
          <div className={styles.characterBox}>
            <div className={styles.characterGlow}></div>
            <img src={characterUrl} alt="내 캐릭터" />
            {/* <p>당신의 캐릭터</p> */}
          </div>
          <div className={styles.textArea}>
            <p className={styles.eyebrow}>AI 생성 동화</p>
            <h1>나만의 맞춤 동화 만들기</h1>
            <p className={styles.subText}>
              선택한 옵션을 기반으로 AI가 생성 및 검수한 동화를 제시합니다.
              <br />
              <strong>이 동화는 당신의 캐릭터를 기반으로 만들어집니다.</strong>
            </p>
          </div>
        </div>

        <button className={styles.backButton} onClick={() => navigate(-1)}>
          ← 돌아가기
        </button>
      </div>

      {/* 옵션 선택 */}
      <section className={styles.optionsCard}>
        <h3>옵션 선택</h3>
        <div className={styles.optionGrid}>
          {optionGroups.map((group) => (
            <div key={group.key} className={styles.optionColumn}>
              <p className={styles.optionLabel}>{group.label}</p>
              <div className={styles.optionButtons}>
                {group.options.map((option) => {
                  const active = selections[group.key] === option; //현재 선택된 옵션과 비교하여 활성 상태 확인
                  return (
                    <button
                      key={option}
                      type="button"
                      className={`${styles.optionButton} ${
                        active ? styles.active : ""
                      }`}
                      onClick={() => handleSelect(group.key, option)}
                    >
                      {option}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 결과 영역 */}
      <section className={styles.resultsWrapper}>
        {isReady && bestStory ? (
          <div className={styles.bestStory}>
            <div className={styles.bestHeader}>
              <span className={styles.badge}>AI 추천 결과</span>
            </div>
            <h3>{bestStory.title}</h3>
            <p className={styles.meta}>
              {bestStory.mood} · {bestStory.artStyle} · {bestStory.ageGroup}
            </p>
            <p>{bestStory.summary}</p>

            <div className={styles.buttonRow}>
              <button
                className={styles.primaryButton}
                onClick={() =>
                  navigate(`tale/study/${taleId}`, {
                    state: { taleId: 2 },
                  })
                }
              >
                이 동화로 학습하기
              </button>
              <button
                className={styles.secondaryButton}
                onClick={handleGenerate}
                disabled={isGenerating}
              >
                같은 조건으로 새로 생성하기
              </button>
            </div>
          </div>
        ) : (
          <div className={styles.empty}>
            모든 옵션을 선택하면 AI가 추천한 동화가 여기에 표시됩니다.
          </div>
        )}
      </section>
    </div>
  );
};

export default CustomStoryPage;
