import React, { useEffect, useState } from "react";
import styles from "./DiagnosisEnd.module.css";
import { useNavigate, useLocation } from "react-router-dom";
import firework from "../assets/firework.png";

const DiagnosisEnd = () => {
  const navigate = useNavigate();
  const location = useLocation(); 
  
  const receivedUrl = location.state?.imageUrl;
  const BASE_URL = process.env.REACT_APP_URL; // 배포 도메인

  const [imageUrl, setImageUrl] = useState(
    receivedUrl || sessionStorage.getItem("imageUrl") || ""
  );

  useEffect(() => {
    if (receivedUrl) {
      sessionStorage.setItem("imageUrl", receivedUrl);
      setImageUrl(receivedUrl);
    }
  }, [receivedUrl]);

  console.log("이미지 URL:", imageUrl);

  const onClick = () => {
    navigate("/loginProfile");
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
        {imageUrl && (
         <img 
          src={`${BASE_URL}${imageUrl}`}
            alt="완성된 아바타"
            className={styles.avatarImg}
          />
        )}
      </div>
      
      <button className={styles.button} onClick={onClick}>
        확인
      </button>
    </div>
  );
};

export default DiagnosisEnd;
