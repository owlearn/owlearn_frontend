import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./register.module.css";

import { signupAPI } from "../api/user";

const SignupPage = () => {
  const navigate = useNavigate();

  const [userId, setUserId] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    console.log("입력 상태:", { userId, name, password });
  }, [userId, name, password]);

  const handleSignup = async (e) => {
    e.preventDefault();

    // 유효성 검사 추가
    if (!userId.trim() || !name.trim() || !password.trim()) {
      alert("모든 항목을 빠짐없이 입력해주세요.");
      return;
    }

    //시연을 위해 api는 잠시 주석처리
    //   try {
    //     console.log("회원가입 요청:", userId, name, password);
    //     const response = await signupAPI(userId, name, password);
    //     console.log("회원가입 성공:", response);
    //     alert("회원가입이 완료되었습니다!");
    //     navigate("/diagnosis");
    //   } catch (error) {
    //     console.error("회원가입 실패:", error);
    //     alert("회원가입에 실패했습니다. 다시 시도해주세요.");
    //   }
    // };
    navigate("/diagnosis");
  };

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <h1 className={styles.title}>어서오세요!</h1>
        <p className={styles.subtitle}>
          간단한 정보를 입력하고 서비스를 시작하세요
        </p>

        <form className={styles.form} onSubmit={handleSignup}>
          <div className={styles.formGroup}>
            <label>아이디</label>
            <input
              placeholder="아이디를 입력하세요"
              required
              className={styles.input}
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
            />
          </div>

          <div className={styles.formGroup}>
            <label>이름</label>
            <input
              placeholder="이름을 입력하세요"
              required
              className={styles.input}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className={styles.formGroup}>
            <label>비밀번호</label>
            <input
              type="password"
              placeholder="비밀번호를 입력하세요"
              required
              className={styles.input}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button type="submit" className={styles.signupButton}>
            회원가입
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignupPage;
