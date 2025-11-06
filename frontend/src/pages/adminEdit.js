import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styles from "./adminEdit.module.css";
import { getTale, editTaleAPI } from "../api/tale";

function EditTalePage() {
  const { taleId } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [contents, setContents] = useState([]);
  const [imageUrls, setImageUrls] = useState([]);
  const [saving, setSaving] = useState(false); // 저장 중 상태
  const [message, setMessage] = useState(""); // 안내 메시지

  useEffect(() => {
    const fetchData = async () => {
      try {
        const taleRes = await getTale(taleId);
        const taleData = taleRes.data?.responseDto;

        setTitle(taleData.title || "");
        setContents(taleData.contents || []);
        setImageUrls(taleData.imageUrls || []);
      } catch (err) {
        console.error("데이터 불러오기 실패:", err);
      }
    };
    fetchData();
  }, [taleId]);

  // 수정 완료 (저장 버튼)
  const handleSave = async () => {
    if (!title.trim()) {
      setMessage("제목을 입력해주세요.");
      return;
    }
    setSaving(true);
    setMessage("");

    try {
      await editTaleAPI(taleId, { title, contents, imageUrls });
      setMessage("수정이 완료되었습니다!");
      alert(message);
      setTimeout(() => navigate(`/admin/view/${taleId}`), 1000);
    } catch (error) {
      console.error("수정 실패:", error);
      setMessage("수정 중 오류가 발생했습니다.");
      alert(message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>동화 수정</h2>

      <h4>제목</h4>
      <input
        className={styles.input}
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="제목"
      />

      <h4>내용</h4>
      {contents.map((content, idx) => (
        <textarea
          key={idx}
          className={styles.textarea}
          value={content}
          onChange={(e) => {
            const updated = [...contents];
            updated[idx] = e.target.value;
            setContents(updated);
          }}
        />
      ))}

      <h4>이미지 URL</h4>
      {imageUrls.map((url, idx) => (
        <input
          key={idx}
          className={styles.input}
          value={url}
          onChange={(e) => {
            const updated = [...imageUrls];
            updated[idx] = e.target.value;
            setImageUrls(updated);
          }}
        />
      ))}

      {/* ✅ 최종 수정 완료 버튼 */}
      <button
        className={styles.saveButton}
        onClick={handleSave}
        disabled={saving}
      >
        {saving ? "저장 중..." : "수정 완료"}
      </button>

      {message && <p className={styles.message}>{message}</p>}
    </div>
  );
}

export default EditTalePage;
