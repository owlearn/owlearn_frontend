import React from "react";
import styles from "./StartPage.module.css";
import owlImage from "../assets/owl_girl.png";
import { useNavigate } from "react-router-dom";

export default function StartPage() {
  const navigate = useNavigate();

  const goToLogin = () => {
    navigate("/login");
  };

  return (
    <>
      <div className={styles.homecontainer}>
        <div className={styles.left}>
          <img src={owlImage} alt="Girl with owl" />
        </div>
        <div className={styles.right}>
          <h1>
            나만의 AI 동화책을
            <br /> 만나보세요!
          </h1>
          <p>
            당신의 취향에 딱 맞춘 맞춤형 영어 동화를
            <br />
            AI가 직접 만들어드려요.
          </p>
          <button className={styles.btn} onClick={() => goToLogin()}>
            지금 시작하기
          </button>
        </div>
      </div>
    </>
  );
}
