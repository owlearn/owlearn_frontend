import React from "react";
import styles from "./DiagnosisEnd.module.css";
import avatarComplete from "../assets/myAvatar.png"; // 완성된 부엉이 이미지 (백엔드에서 받을 예정)
import { useNavigate, useLocation } from "react-router-dom";
import firework from "../assets/firework.png";

const DiagnosisEnd = () => {
  const navigate = useNavigate();
  const location = useLocation(); 
  const imageUrl = location.state?.imageUrl; // 백엔드에서 전달받은 경로

  const onClick = () => {
    navigate("/studyMain");
  };
  return (
    <div className={styles.diagnosisEnd}>
      {/* 좌우에 불꽃 이미지 배치 */}
      <img
        src={firework}
        alt=""
        className={`${styles.firework} ${styles.left}`}
      />
      <img
        src={firework}
        alt=""
        className={`${styles.firework} ${styles.right}`}
      />
      <h1 className={styles.title}>Complete!</h1>
      <div className={styles.avatarBox}>
        <img
          src={avatarComplete}
          alt="완성된 부엉이"
          className={styles.avatarImg}
        />
      </div>
      <button className={styles.button} onClick={onClick}>
        확인
      </button>
    </div>
  );
};

export default DiagnosisEnd;
