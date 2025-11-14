import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./LoginProfile.module.css";
import defaultAvatar from "../assets/owl_hi.png";
import parentIcon from "../assets/parentModeLogo.png";
import { userInstance } from "../api/instance"; 

function ProfileSelectionPage() {
  const navigate = useNavigate();
  const [children, setChildren] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // userId는 참고용 저장, 실제 조회는 JWT 토큰으로 백엔드에서 부모 ID 호출
  // 자녀 목록 불러오기
  useEffect(() => {
    const fetchChildren = async () => {
      try {
        const token = localStorage.getItem("token");
        console.log("저장된 토큰:", token);
        const userId = localStorage.getItem("userId");

        if (!token || !userId) {
          alert("로그인이 필요합니다.");
          navigate("/login");
          return;
        }

        // 백엔드 자녀 조회 API 호출
        const response = await userInstance.get("/child", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log("자녀 목록 응답:", response);

        const data = response?.data?.responseDto;
        if (data) {
          // 백엔드 응답 구조에 따라 조정 (예: data.children)
          setChildren(Array.isArray(data.children) ? data.children : [data]);
        } else {
          setChildren([]);
        }
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
    localStorage.setItem("selectedChild", JSON.stringify(child));
    navigate("/studyMain");
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
  const resolveAvatar = (child) => child.avatar || defaultAvatar;

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
