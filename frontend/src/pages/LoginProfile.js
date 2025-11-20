import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./LoginProfile.module.css";
import defaultAvatar from "../assets/owl_hi.png";
import parentIcon from "../assets/parentModeLogo.png";
import { getChildAPI } from "../api/user";
import { getCharacterAPI } from "../api/user";

function ProfileSelectionPage() {
  const navigate = useNavigate();
  const [children, setChildren] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const BASE_URL = process.env.REACT_APP_URL; // 배포 도메인

  // userId는 참고용 저장, 실제 조회는 JWT 토큰으로 백엔드에서 부모 ID 호출
  // 자녀 목록 불러오기
  useEffect(() => {
  const fetchChildren = async () => {
    try {
      const token = localStorage.getItem("token");
      const userId = localStorage.getItem("userId");

      if (!token) {
        alert("로그인이 필요합니다.");
        navigate("/login");
        return;
      }

      const data = await getChildAPI(); // 자녀 목록

      if (!Array.isArray(data)) {
        setChildren([]);
        return;
      }

      // 자녀별 캐릭터 이미지 조회
      const updatedChildren = await Promise.all(
        data.map(async (child) => {
          try {
            console.log("보내는 childId:", child.id);
            const res = await getCharacterAPI(child.id);

            if (res.data?.responseDto?.imageUrl) {
              // 백엔드에서 준 이미지 URL 저장
              child.avatar = res.data.responseDto.imageUrl;
            } else {
              child.avatar = null;
            }
          } catch (e) {
            child.avatar = null;
          }

          return child;
        })
      );

      setChildren(updatedChildren);

    } catch (err) {
      console.error("자녀 목록 불러오기 실패:", err);
      setError("자녀 목록을 불러오지 못했습니다.");
      setChildren([]);
    } finally {
      setLoading(false);
    }
  };

  fetchChildren();
}, [navigate]);

  // 자녀 선택시 studyMain 이동 + 선택한 자녀 정보 저장
  const handleChildSelect = (child) => {
    console.log("선택한 child:", child);
    localStorage.setItem("selectedChild", JSON.stringify(child));
    if (!child.avatar) {
      // 진단 필요
      navigate(`/diagnosis/${child.id}`);
    } else { // 학습 메인 페이지로 이동
      navigate("/studyMain", { state: { child } });
    }
  };

  // 학부모 관리 모드
  const handleParentMode = () => {
    navigate("/parentMain");
  };

  // 자녀 추가
  const handleAddChild = () => {
    navigate("/addProfile");
  };

  // 기본 아바타가 없는 경우 방어
  const resolveAvatar = (child) => {
    if (child.avatar) {
      // 절대경로면 그대로
      if (child.avatar.startsWith("http")) return child.avatar;

      // 상대경로면 도메인 붙이기
      return `${BASE_URL}${child.avatar}`;
    }
    return defaultAvatar;
  };

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1 className={styles.title}>프로필 선택</h1>
        <button className={styles.parentButton} onClick={handleParentMode}>
          <img
            src={parentIcon}
            alt="부모 아이콘"
            className={styles.parentIcon}
          />
          학부모 관리 모드
        </button>
      </div>

      <div className={styles.cardContainer}>
        {children.map((child) => (
          <div key={child.id} className={styles.card}>
            <img
              src={resolveAvatar(child)}
              alt={`${child.name} 아바타`}
              className={styles.avatar}
            />
            <div className={styles.name}>{child.name}</div>
            <button
              className={styles.selectButton}
              onClick={() => handleChildSelect(child)}
            >
              선택
            </button>
          </div>
        ))}

        <div className={styles.cardAdd} onClick={handleAddChild}>
          <span className={styles.plus}>+</span>
        </div>
      </div>
    </div>
  );
}

export default ProfileSelectionPage;
