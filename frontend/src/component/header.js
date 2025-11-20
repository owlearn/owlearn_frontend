import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./header.module.css";

function Header() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user"); 
    localStorage.removeItem("userId");
    localStorage.removeItem("token");
    localStorage.removeItem("selectedChild"); 
    navigate("/login");
  };

  return (
    <div>
      <div className={styles.header}>
        <div>
          <button
            onClick={() => navigate(`/studyMain`)}
            className={styles.logo}
          >
            OWLEARN
          </button>
        </div>

        <div className={styles.rightGroup}>
          <button className={styles.rightbtn} onClick={handleLogout}>
            Logout
          </button>
          <span>|</span>
          <button
            onClick={() => navigate(`/mypage`)}
            className={styles.rightbtn}
          >
            MyPage
          </button>
        </div>
      </div>
    </div>
  );
}

export default Header;
