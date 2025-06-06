import React from "react";
import { useNavigate, Link } from "react-router-dom";
import styles from "./LoginPage.module.css";
import googleIcon from "../assets/google.png";
import kakaoIcon from "../assets/kakao.png";
import naverIcon from "../assets/naver.png";

function LoginPage() {
  const navigate = useNavigate();

  const goToMain = () => {
    navigate("/studyMain");
  };

  const goToAdmin = () => {
    navigate("/admin");
  };

  return (
    <div className={styles.loginPage}>
      <div className={styles.loginBox}>
        <div className={styles.loginContent}>
          <h1 className={styles.loginTitle}>로그인</h1>

          {/* 흰색 박스: 아이디/비밀번호/버튼만 */}
          <input
            type="text"
            placeholder="아이디"
            className={styles.loginInput}
          />
          <input
            type="password"
            placeholder="비밀번호"
            className={styles.loginInput}
          />
          <button className={styles.loginButton} onClick={goToMain}>
            로그인
          </button>
        </div>

        {/* 나머지 요소는 박스 밖에 그대로 */}
        <div className={styles.or}>
          <hr className={styles.line} />
          <span className={styles.orText}>또는</span>
          <hr className={styles.line} />
        </div>

        <div className={styles.socialButtons}>
          <button className={styles.socialButton}>
            <img src={googleIcon} alt="Google" className={styles.socialIcon} />
          </button>
          <button className={styles.socialButton}>
            <img src={kakaoIcon} alt="Kakao" className={styles.socialIcon} />
          </button>
          <button className={styles.socialButton}>
            <img src={naverIcon} alt="Naver" className={styles.socialIcon} />
          </button>
        </div>

        <div className={styles.signup}>
          처음이신가요? <Link to="/register">회원가입</Link>
        </div>

        <div className={styles.adminLink}>
          <button onClick={goToAdmin} className={styles.adminButton}>
            관리자 대시보드
          </button>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
