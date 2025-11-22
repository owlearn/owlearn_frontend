import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./register.module.css";
import { addChildAPI } from "../api/user";

const ChildProfilePage = () => {
  const navigate = useNavigate();
  const [childName, setChildName] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [loading, setLoading] = useState(false);

  // 만나이 계산 함수 (생년월일 기반)
  const calculateAge = (birthdate) => {
    const birth = new Date(`${birthdate}T00:00:00`);
    if (Number.isNaN(birth.getTime())) {
      console.warn("[AgeCalc] 잘못된 생년월일 입력:", birthdate);
      return null;
    }

    const today = new Date();
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    const dayDiff = today.getDate() - birth.getDate();

    if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
      age -= 1;
    }

    return age;
  };

  // 입력 변화 시 콘솔로 확인
  useEffect(() => {
    const age = birthdate ? calculateAge(birthdate) : null;
    console.log("[AgeCalc] 입력 변경 확인:", {
      childName,
      birthdate,
      age,
    });
  }, [childName, birthdate]);

  const handleCreateProfile = async () => {
    if (!childName.trim()) {
      alert("자녀 이름을 입력해주세요.");
      return;
    }

    if (!birthdate) {
      alert("자녀의 생년월일을 선택해주세요.");
      return;
    }

    const age = calculateAge(birthdate);
    if (age === null || age < 0) {
      alert("생년월일이 올바르지 않습니다. 다시 확인해주세요.");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      alert("로그인이 필요합니다.");
      navigate("/login");
      return;
    }

    setLoading(true);

    try {
      const response = await addChildAPI({
        childName: childName,
        age,
      });

      console.log("addChild API 응답:", response);
      const childId = response.childId;

      alert(`"${childName}" 프로필이 생성되었습니다.`);
      navigate(`/diagnosis/${childId}`);
    } catch (error) {
      console.error("프로필 생성 오류:", error);
      alert("서버 전송 중 오류가 발생했습니다.");
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
