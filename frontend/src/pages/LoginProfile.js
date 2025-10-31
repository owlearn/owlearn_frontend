import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./LoginProfile.module.css";
import defaultAvatar from "../assets/owl_hi.png";
import parentIcon from "../assets/parentModeLogo.png";

function ProfileSelectionPage() {
  const navigate = useNavigate();
  const [children, setChildren] = useState([]);

  // // localStorage에서 자녀 정보 불러오기
  // useEffect(() => {
  //   const savedChildren = localStorage.getItem("childProfiles");
  //   if (savedChildren) {
  //     setChildren(JSON.parse(savedChildren));
  //   }
  // }, []);

  //학부모 로그인은 스토리지로, 자녀목록을 불러올때는 스토리지에 저장된 parentID를 기반으로 서버에서 불러올 예정
  useEffect(() => {
    const fetchChildren = async () => {
      try {
        // const response = await defaultInstance.get("/child/list"); //api 연동 예정
        //setChildren(response.data.children); // DB에서 불러오기
      } catch (error) {
        console.error("자녀 목록 불러오기 실패:", error);
        setChildren([]);
      }
    };

    fetchChildren();
  }, []);

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
    // const name = prompt("새 자녀의 이름을 입력하세요:");
    // if (name) {
    //   const newChild = {
    //     id: children.length + 1, // 👈 순번 기반 ID
    //     name,
    //     avatar: defaultAvatar,
    //   };
    //   const updatedChildren = [...children, newChild];
    //   setChildren(updatedChildren);
    //   localStorage.setItem("childProfiles", JSON.stringify(updatedChildren));
    // }
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
