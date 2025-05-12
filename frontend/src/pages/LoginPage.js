import React from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';
import googleIcon from '../assets/google.png';
import kakaoIcon from '../assets/kakao.png';
import naverIcon from '../assets/naver.png';

export default function LoginPage() {
  const navigate = useNavigate();

  const goToDiagnosis = () => {
    navigate('/diagnosis'); // 진단 페이지로 이동
  };

  return (
    <>
      <div className="header">
        <div className="logo">LEV<br />STORY</div>
      </div>

      <div className="login-page">
        <div className="login-content">
          <h1 className="login-title">로그인</h1>

          <div className="login-box">
            <input type="text" placeholder="이메일" className="login-input" />
            <input type="password" placeholder="비밀번호" className="login-input" />
            <button className="login-button" onClick={goToDiagnosis}>로그인</button>

          <div className="or">
            <hr className="line" />
            <span className="or-text">또는</span>
            <hr className="line" />
          </div>

            <div className="social-buttons">
              <button className="social-button">
                <img src={googleIcon} alt="Google" className="social-icon" />
              </button>
              <button className="social-button">
                <img src={kakaoIcon} alt="Kakao" className="social-icon" />
              </button>
              <button className="social-button">
                <img src={naverIcon} alt="Naver" className="social-icon" />
              </button>
            </div>

            <div className="signup">
              처음이신가요? <a href="#">회원가입</a>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}
