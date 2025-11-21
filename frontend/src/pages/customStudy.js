import React, { useMemo, useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./customStudy.module.css";
import myAvatar from "../assets/myAvatar.png";
import { AiTaleGen } from "../api/tale";
import { imageBaseUrl } from "../api/instance";

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
  (acc, group) => ({ ...acc, [group.key]: "" }), //누적 acc 객체에 빈 group 초기값
  {}
);

const CustomStoryPage = () => {
  const navigate = useNavigate();
  const [selections, setSelections] = useState(initialSelections); //option 선택 state
  const [isGenerating, setIsGenerating] = useState(false); //모든 옵션 선택 여부로 생성 state
  // const [bestStory, setBestStory] = useState(null); // 베스트셀러 추천 (api 제작중)
  const [characterUrl, setCharacterUrl] = useState(myAvatar);
  const [selectedChild, setSelectedChild] = useState(null);
  // const [statusMessage, setStatusMessage] = useState("");
  // const [recommendLoading, setRecommendLoading] = useState(false);

  const isReady = useMemo(
    () => Object.values(selections).every((v) => Boolean(v)), //selections 값을 배열로 꺼내, 모두 true일때 true 반환
    [selections] //selections 변경 시 재계산
  );

  useEffect(() => {
    const storedChild = localStorage.getItem("selectedChild");
    if (storedChild) {
      try {
        const parsedChild = JSON.parse(storedChild);
        setSelectedChild(parsedChild);
        if (parsedChild?.avatar) {
          setCharacterUrl(`${imageBaseUrl}${parsedChild.avatar}`);
        }
      } catch (error) {
        console.error("선택된 아이 정보 파싱 실패:", error);
      }
    }
  }, []);

  // 베스트셀러 추천 기능 (현재 미사용)
  // useEffect(() => {
  //   if (!isReady) {
  //     setBestStory(null);
  //     setStatusMessage("");
  //     return;
  //   }
  //
  //   if (!userId) {
  //     setStatusMessage("로그인 정보를 확인해주세요.");
  //     return;
  //   }
  //
  //   const { theme, mood, artStyle, ageGroup } = selections;
  //   let cancelled = false;
  //   const fetchRecommendedStory = async () => {
  //     try {
  //       setRecommendLoading(true);
  //       setStatusMessage("");
  //       const payload = buildCustomPayload();
  //       const res = await recommendCustomTaleAPI(payload);
  //       if (cancelled) return;
  //       const story = res.data?.responseDto;
  //       if (story) {
  //         setBestStory({
  //           title: story.title || `${theme}의 ${mood} 동화`,
  //           summary:
  //             story.summary ||
  //             `${ageGroup} 독자를 위한 ${mood} 분위기의 ${theme} 이야기입니다.`,
  //           mood,
  //           artStyle,
  //           ageGroup,
  //           taleId: story.taleId,
  //         });
  //       } else {
  //         setBestStory({
  //           title: `${theme}의 ${mood} 동화`,
  //           summary: `${ageGroup} 독자를 위한 ${mood} 분위기의 ${theme} 이야기입니다.`,
  //           mood,
  //           artStyle,
  //           ageGroup,
  //           taleId: null,
  //         });
  //       }
  //     } catch (err) {
  //       if (cancelled) return;
  //       console.error("추천 동화 불러오기 오류:", err);
  //       setStatusMessage("추천 동화를 불러오지 못했어요.");
  //       setBestStory(null);
  //     } finally {
  //       if (!cancelled) {
  //         setRecommendLoading(false);
  //       }
  //     }
  //   };
  //
  //   fetchRecommendedStory();
  //
  //   return () => {
  //     cancelled = true;
  //   };
  // }, [selections, isReady, buildCustomPayload, userId]);

  // 생성 버튼 클릭 시
  const handleGenerate = async () => {
    if (!isReady) {
      alert("모든 옵션을 선택해주세요!");
      return;
    }

    if (!selectedChild?.id) {
      alert("학생 정보 오류");
      return;
    }

    setIsGenerating(true);

    try {
      const { theme, mood, artStyle, ageGroup } = selections;

      console.log("[선택]:", {
        subject: theme,
        tone: mood,
        artStyle: artStyle,
        ageGroup: ageGroup,
        childId: selectedChild.id,
      });

      const res = await AiTaleGen(
        theme,
        mood,
        artStyle,
        ageGroup,
        selectedChild.id
      );

      const newTaleId = res.data?.responseDto?.taleId;

      if (newTaleId) {
        alert("새로운 동화가 생성되었습니다!");
        navigate("/tale/study", { state: { taleId: newTaleId } });
      } else {
        throw new Error("newTaleId 없음");
      }
    } catch (err) {
      console.error("동화 생성 오류:", err);
      alert("동화를 생성하는 중 오류가 발생했습니다.");
    } finally {
      setIsGenerating(false);
    }
  };

  // const handleStudy = () => {
  //   if (!bestStory?.taleId) {
  //     alert("추천 동화 정보를 불러온 뒤 이용해 주세요.");
  //     return;
  //   }
  //   navigate("/tale/study", { state: { taleId: bestStory.taleId } });
  // };

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
            <img src={characterUrl} alt="개인캐릭터" />{" "}
          </div>
          <div className={styles.textArea}>
            <p className={styles.eyebrow}>AI 생성 동화</p>
            <h1>나만의 맞춤 동화 만들기</h1>
            <p className={styles.subText}>
              선택한 옵션을 기반으로 AI가 생성하고, 검수까지 마친 동화를
              제시합니다.
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
        {/* 베스트셀러 추천 영역 (현재 미사용)
        ...
        */}
        <div className={styles.empty}>
          베스트셀러 추천 기능 준비 중입니다. <br />
        </div>
        <div className={styles.buttonRow}>
          <button
            className={styles.secondaryButton}
            onClick={handleGenerate}
            disabled={isGenerating}
            type="button"
          >
            {isGenerating ? "생성 중..." : "선택한 옵션으로 새로 생성하기"}
          </button>
        </div>
      </section>
      {isGenerating && (
        <div className={styles.loadingOverlay}>
          <div className={styles.loader} />
          <div className={styles.loadingText}>동화를 생성하고 있어요…</div>
        </div>
      )}
    </div>
  );
};

export default CustomStoryPage;
