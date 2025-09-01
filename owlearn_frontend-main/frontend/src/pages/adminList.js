import React, { useEffect, useState } from "react";
import styles from "./adminList.module.css";
import { getTaleListAPI, deleteTaleAPI } from "../api/tale";
import { useNavigate } from "react-router-dom";

function TaleListPage() {
  const [tales, setTales] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTales = async () => {
      try {
        const response = await getTaleListAPI();
        setTales(response.data);
      } catch (error) {
        console.error("동화 목록 조회 실패:", error);
      }
    };
    fetchTales();
  }, []);

  const handleDelete = async (taleId) => {
    if (!window.confirm("정말 삭제하시겠어요?")) return;
    try {
      await deleteTaleAPI(taleId);
      setTales(tales.filter((t) => t.id !== taleId));
      alert("성공적으로 삭제되었습니다.");
    } catch (err) {
      console.error("삭제 실패:", err);
      alert("삭제 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>전체 동화 목록</h2>
      <ul className={styles.list}>
        {tales.map((tale) => (
          <li key={tale.id} className={styles.item}>
            <div className={styles.textGroup}>
              <strong>{tale.title}</strong>
              <span className={styles.idText}>ID: {tale.id}</span>
            </div>
            <div className={styles.buttonGroup}>
              <button
                className={styles.detailBtn}
                onClick={() => navigate(`/admin/edit/${tale.id}`)}
              >
                수정
              </button>
              <button
                className={styles.deleteBtn}
                onClick={() => handleDelete(tale.id)}
              >
                삭제
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TaleListPage;
