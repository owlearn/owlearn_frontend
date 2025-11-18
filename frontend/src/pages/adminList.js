import React, { useEffect, useState } from "react";
import styles from "./adminList.module.css";
import { getTaleListAPI, deleteTaleAPI } from "../api/tale";
import { useNavigate } from "react-router-dom";

function TaleListPage() {
  const [tales, setTales] = useState([]);
  const navigate = useNavigate();

  const renderTypeLabel = (type) => {
    if (type === "USER_GENERATED") return "생성"; // 사용자가 생성한 동화
    if (type === "PREMADE" || "FROMPREMADE") return "기성"; // 기본 제공 동화
    return type;
  };

  useEffect(() => {
    const fetchTales = async () => {
      try {
        const response = await getTaleListAPI();
        const data = response?.data;
        // 백엔드가 { error, responseDto: [] } 형태로 내려주는 경우 대응
        const list = data?.responseDto;
        setTales(list);
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
        {(tales || []).map((tale) => (
          <li key={tale.id} className={styles.item}>
            <div className={styles.textGroup}>
              <div className={styles.titleRow}>
                <strong>{tale.title}</strong>
                <span className={styles.typeBadge}>
                  {renderTypeLabel(tale.type)}
                </span>
              </div>
              <span className={styles.idText}>ID: {tale.id}</span>
            </div>
            <div className={styles.buttonGroup}>
              <button
                className={styles.viewBtn}
                onClick={() => navigate(`/admin/tale/${tale.id}`)}
              >
                보기
              </button>{" "}
              {/*동화조회*/}
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
