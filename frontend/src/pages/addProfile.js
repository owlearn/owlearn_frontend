import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./register.module.css";
// import { defaultInstance } from "../api/instance";

const ChildProfilePage = () => {
  const navigate = useNavigate();
  const [childName, setChildName] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCreateProfile = async () => {
    if (!childName.trim()) {
      alert("자녀 이름을 입력해주세요.");
      return;
    }

    if (!birthdate) {
      alert("자녀의 생년월일을 선택해주세요.");
      return;
    }

    setLoading(true);

    try {
      //  서버 연동 (준비되면 주석 해제)
      // const response = await defaultInstance.post("/child/register", {
      //   name: childName,
      //   birthdate,
      // });

      alert(`"${childName}" 프로필이 생성되었습니다.`);
      navigate("/diagnosisver2");
    } catch (error) {
      console.error("프로필 생성 오류:", error);
      alert("서버 전송 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <h1 className={styles.title}>자녀 프로필 생성</h1>
        <p className={styles.subtitle}>
          자녀의 이름과 생년월일을 입력해 주세요.
        </p>

        <div className={styles.form}>
          <div className={styles.formGroup}>
            <label>자녀 이름</label>
            <input
              placeholder="이름을 입력하세요"
              required
              className={styles.input}
              value={childName}
              onChange={(e) => setChildName(e.target.value)}
              disabled={loading}
            />
          </div>

          <div className={styles.formGroup}>
            <label>생년월일</label>
            <input
              type="date"
              required
              className={styles.input}
              value={birthdate}
              onChange={(e) => setBirthdate(e.target.value)}
              disabled={loading}
            />
          </div>

          <button
            type="button"
            onClick={handleCreateProfile}
            className={styles.signupButton}
            disabled={loading}
          >
            {loading ? "생성 중..." : "프로필 생성"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChildProfilePage;
