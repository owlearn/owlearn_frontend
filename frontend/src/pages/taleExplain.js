import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./taleExplain.css";
import { getTale } from "../api/tale";

export default function TaleExplain() {
  const { state } = useLocation();
  const navigate = useNavigate();
  
  // 🔥 title 상태 추가
  const [title, setTitle] = useState(state?.title || "");

  // 🔥 state가 undefined일 수도 있으므로 optional chaining
  const taleId = state?.taleId;
  const selections = state?.selections;
const reasons = state?.reasons;
const story = state?.story;

  // 🔥 taleId 기반으로 상세 조회 API 호출
  useEffect(() => {
  if (!taleId) return;

  getTale(taleId)
    .then((res) => {
      console.log("동화 상세:", res.data);
      setTitle(res.data.responseDto.title);
    })
    .catch((err) => console.error("제목 불러오기 실패:", err));
}, [taleId]);

  if (!state) return <p>잘못된 접근입니다.</p>;

  const handleGoStudy = () => {
    navigate("/tale/study", {
      state: {
        taleId,
        title,
        story,
      },
    });
  };

  return (
    <div className="explain-wrapper">

      {/* 페이지 제목 */}
      <div className="explain-title">
        <h1>동화 생성이 완료되었어요!</h1>
        <p>이번 동화가 어떻게 만들어졌는지 확인해볼까요?</p>
      </div>

      <div className="explain-card">

        {/* 동화 제목 */}
        <div className="story-title-box">
          <h2 className="story-title">{title || "제목 불러오는 중..."}</h2>
          <span className="story-badge">AI 맞춤 생성</span>
        </div>

        {/* 가로 2박스 */}
        <div className="explain-flex">

          {/* 선택한 옵션 */}
          <div className="explain-box">
            <h3>🍀 선택한 옵션</h3>

            <div className="option-grid">
                <div className="option-item">
                    <span className="option-label">주제</span>
                    <span className="option-sep"> | </span>
                    <span className="option-value">{selections?.theme}</span>
                </div>

                <div className="option-item">
                    <span className="option-label">분위기</span>
                    <span className="option-sep"> | </span>
                    <span className="option-value">{selections?.mood}</span>
                </div>

                <div className="option-item">
                    <span className="option-label">그림체</span>
                    <span className="option-sep"> | </span>
                    <span className="option-value">{selections?.artStyle}</span>
                </div>

                <div className="option-item">
                    <span className="option-label">연령대</span>
                    <span className="option-sep"> | </span>
                    <span className="option-value">{selections?.ageGroup}</span>
                </div>
                </div>
          </div>

          {/* 생성 이유 */}
          <div className="explain-box">
            <h3>✨ 이렇게 생성되었어요</h3>

            <ul className="reason-list">
                {reasons?.map((r, idx) => (
                    <li key={idx} className="reason-item">
                    {r}
                    </li>
                ))}
            </ul>
          </div>
        </div>

        {/* 버튼 */}
        <button className="explain-button" onClick={handleGoStudy}>
          학습 시작하기
        </button>
      </div>
    </div>
  );
}
