import React, { useMemo, useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./customStudy.module.css";
import myAvatar from "../assets/myAvatar.png";
import { AiTaleGen } from "../api/tale";
import { imageBaseUrl } from "../api/instance";
import LoadingOverlay from "../component/LoadingOverlay";

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

const initialSelections = optionGroups.reduce(
  (acc, g) => ({ ...acc, [g.key]: "" }),
  {}
);

const CustomStoryPage = () => {
  const navigate = useNavigate();
  const [selections, setSelections] = useState(initialSelections);
  const [isGenerating, setIsGenerating] = useState(false);
  const [characterUrl, setCharacterUrl] = useState(myAvatar);
  const [selectedChild, setSelectedChild] = useState(null);
  const [loadingWord, setLoadingWord] = useState(null);
  const loadingIntervalRef = useRef(null);

  const isReady = useMemo(
    () => Object.values(selections).every((v) => Boolean(v)),
    [selections]
  );

  const loadingWords = [
    { word: "create", meaning: "창조하다" },
    { word: "story", meaning: "이야기" },
    { word: "wonder", meaning: "경이" },
    { word: "dream", meaning: "꿈" },
    { word: "explore", meaning: "탐험하다" },
    { word: "magic", meaning: "마법" },
  ];

  const pickLoadingWord = () => {
    const idx = Math.floor(Math.random() * loadingWords.length);
    setLoadingWord(loadingWords[idx]);
  };

  useEffect(() => {
    if (isGenerating) {
      pickLoadingWord();
      loadingIntervalRef.current = setInterval(pickLoadingWord, 4000);
    } else {
      clearInterval(loadingIntervalRef.current);
      loadingIntervalRef.current = null;
      setLoadingWord(null);
    }
  }, [isGenerating]);

  useEffect(() => {
    const stored = localStorage.getItem("selectedChild");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setSelectedChild(parsed);
        if (parsed?.avatar) {
          setCharacterUrl(`${imageBaseUrl}${parsed.avatar}`);
        }
      } catch (e) {
        console.error("아이 정보 파싱 실패:", e);
      }
    }
  }, []);

  const handleSelect = (groupKey, option) => {
    setSelections((prev) => ({
      ...prev,
      [groupKey]: prev[groupKey] === option ? "" : option,
    }));
  };

  const handleGenerate = async () => {
  if (!isReady) return alert("모든 옵션을 선택해주세요!");
  if (!selectedChild?.id) return alert("학생 정보 오류입니다.");

  setIsGenerating(true);

  try {
    const { theme, mood, artStyle, ageGroup } = selections;
    const res = await AiTaleGen(
      theme,
      mood,
      artStyle,
      ageGroup,
      selectedChild.id
    );

    console.log("생성 API 응답:", res.data.responseDto);
    const newTaleId = res.data?.responseDto?.taleId;

    if (newTaleId) {
      alert("새로운 동화가 생성되었습니다!");
      navigate("/tale/explain", {
        state: {
          taleId: newTaleId,
          story: res.data.responseDto.story,
          selections,
          reason: res.data.responseDto.reason, // ← API가 reason(단수)인지 reasons인지 확인
        },
      });
    }

  } catch (e) {
    alert("동화 생성 중 오류가 발생했습니다.");
  } finally {
    setIsGenerating(false);
  }
};


  return (
    <div className={styles.page}>
      {/* 헤더 */}
      <div className={styles.pageHeader}>
        <p className={styles.headerEyebrow}>AI 생성 동화</p>
        <h2 className={styles.headerTitle}>나만의 맞춤 동화 만들기</h2>
        {/* 설명문 삭제됨 */}
      </div>

      {/* 아바타 + 옵션 */}
      <div className={styles.optionWithAvatar}>
        <div className={styles.avatarCard}>
          <img src={characterUrl} className={styles.avatarImg} />
          <p className={styles.avatarText}>이 아바타로 동화가 생성돼요</p>
        </div>

        <section className={styles.optionsCard}>
          <h3>옵션 선택</h3>
          <div className={styles.optionGrid}>
            {optionGroups.map((group) => (
              <div key={group.key} className={styles.optionColumn}>
                <p className={styles.optionLabel}>{group.label}</p>
                <div className={styles.optionButtons}>
                  {group.options.map((option) => {
                    const active = selections[group.key] === option;
                    return (
                      <button
                        key={option}
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
      </div>

      {/* ===== 결과/버튼 ===== */}
      <section className={styles.resultsWrapper}>
        <div className={styles.resultBox}>
          <p className={styles.resultText}>
            베스트셀러 추천 기능 준비 중입니다.
          </p>
          <p className={styles.resultTextSmall}>
            옵션을 선택해 새로운 동화를 생성해보세요!
          </p>

          <button
            className={styles.primaryButtonInside}
            onClick={handleGenerate}
            disabled={isGenerating}
          >
            {isGenerating ? "생성 중..." : "선택한 옵션으로 생성하기"}
          </button>
        </div>
      </section>

      {isGenerating && (
        <LoadingOverlay
          message="동화를 생성하는 중이에요…"
          subMessage="약 1분 정도 걸려요!"
          word={loadingWord}
        />
      )}
    </div>
  );
};

export default CustomStoryPage;
