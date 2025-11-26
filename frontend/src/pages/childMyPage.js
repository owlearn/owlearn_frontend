import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./childMyPage.module.css";
import owlGirl from "../assets/owl_girl.png";
import defaultCover from "../assets/fairy.png";

const ChildMyPage = () => {
  const navigate = useNavigate();

  const [childData, setChildData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editableFields, setEditableFields] = useState({
    name: "",
    birthdate: "",
  });

  const [isReportListOpen, setIsReportListOpen] = useState(false);
  const [reportList, setReportList] = useState([]);
  const [isReportLoading, setIsReportLoading] = useState(false);

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const d = new Date(dateString);
    if (isNaN(d.getTime())) return "";
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const goSwitchChild = () => navigate("/loginProfile");

  useEffect(() => {
    const selectedChild = JSON.parse(localStorage.getItem("selectedChild"));

    if (!selectedChild) {
      alert("프로필을 먼저 선택해주세요.");
      navigate("/loginProfile");
      return;
    }

    const childId = selectedChild.id;

    const fetchChildMyPage = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(
          `${process.env.REACT_APP_URL}/api/mypage/${childId}`,
          {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        const json = await res.json();
        if (!json.success || !json.responseDto) throw new Error("잘못된 응답");

        setChildData(json.responseDto);
      } catch (e) {
        console.error("마이페이지 불러오기 실패:", e);
        alert("자녀 정보를 불러오지 못했습니다.");
      }
    };

    fetchChildMyPage();
  }, [navigate]);

  useEffect(() => {
    if (!childData?.child) return;

    setEditableFields({
      name: childData.child.name || "",
      birthdate: formatDate(childData.child.birthdate) || "",
    });
  }, [childData]);

  if (!childData) {
    return (
      <div className={styles.page}>
        <div className={styles.empty}>
          <p>자녀 정보를 불러오는 중입니다...</p>
        </div>
      </div>
    );
  }

  const { child, recentTale, reportSummary } = childData;

  const name = child?.name ?? "";
  const avatar = child?.characterImageUrl
  ? child.characterImageUrl.startsWith("http")
    ? child.characterImageUrl
    : `${process.env.REACT_APP_URL}${child.characterImageUrl}`
  : owlGirl;

  const creditBalance = child?.credits ?? 0;
  const interests = child?.interests ?? [];
  const recentBookTitle = recentTale?.title ?? "기록 없음";

  const recentBookCover = recentTale?.thumbnail
    ? `${process.env.REACT_APP_URL}${recentTale.thumbnail}`
    : defaultCover;

  const reportCount = reportSummary?.totalCount ?? 0;

  const openEditModal = () => setIsEditing(true);
  const closeEditModal = () => setIsEditing(false);

  const handleFieldChange = (field, value) => {
    setEditableFields((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    const trimmedName = editableFields.name.trim();
    if (!trimmedName) {
      alert("이름을 입력해 주세요.");
      return;
    }

    const updated = {
      ...child,
      name: trimmedName,
      birthdate: editableFields.birthdate,
    };

    setChildData((prev) => ({ ...prev, child: updated }));
    setIsEditing(false);
  };

  const openReportList = async () => {
    setIsReportListOpen(true);
    setIsReportLoading(true);

    const selectedChild = JSON.parse(localStorage.getItem("selectedChild"));
    const childId = selectedChild.id;
    const token = localStorage.getItem("token");

    try {
      const res = await fetch(
        `${process.env.REACT_APP_URL}/api/review/child/${childId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const json = await res.json();
      setReportList(json.responseDto || []);
    } catch (err) {
      console.error("리포트 조회 실패:", err);
      setReportList([]);
    } finally {
      setIsReportLoading(false);
    }
  };

  const closeReportList = () => setIsReportListOpen(false);

  const handleAvatarClick = () => {
    const ok = window.confirm("아바타를 수정하시겠습니까?");
    if (ok) navigate(`/diagnosis/${child.id}`, {
      state: {
        editMode: true,
        selectedItems: {
          hair: child.hair,  
          clothes: child.clothes,
          shoes: child.shoes,
          accessory: child.accessory,
        }
      }
    });
  };

  return (
    <div className={styles.page}>
      {/* --- 프로필 섹션 --- */}
      <section className={styles.profileSection}>
        <img
          src={avatar}
          alt="avatar"
          className={styles.profileImage}
          onClick={handleAvatarClick}
          style={{ cursor: "pointer" }}
        />

        <div className={styles.profileContent}>
          <div className={styles.profileTopRow}>
            <h2 className={styles.greeting}>{name}님, 반가워요!</h2>
            <div className={styles.creditBadge}>
              <span>보유 크레딧</span>
              <strong>{creditBalance.toLocaleString()}C</strong>
            </div>
          </div>

          <div className={styles.tagContainer}>
            {interests.length > 0 ? (
              interests.map((interest) => (
                <span key={interest} className={styles.tag}>
                  #{interest}
                </span>
              ))
            ) : (
              <span className={styles.noTags}>관심 주제가 아직 없어요</span>
            )}
          </div>
        </div>

        <div className={styles.profileAside}>
          <button
            type="button"
            onClick={openEditModal}
            className={styles.editBtnRight}
          >
            정보 수정
          </button>
          <button
            type="button"
            onClick={goSwitchChild}
            className={styles.switchChildBtn}
          >
            자녀 전환
          </button>
        </div>
      </section>

      {/* --- 최근 읽은 책 / 리포트 요약 --- */}
      <section className={styles.summarySection}>
        <div className={styles.card}>
          <h3>최근 읽은 책</h3>

          <div className={styles.book}>
            <img src={recentBookCover} alt="최근 책 표지" />

            <div className={styles.bookMeta}>
              <strong>{recentBookTitle}</strong>
            </div>
          </div>
        </div>

        <div className={styles.card}>
          <h3>리포트 현황</h3>
          <p>
            총 작성 리포트 수: <strong>{reportCount}개</strong>
          </p>
          <button className={styles.primaryBtn} onClick={openReportList}>
            작성한 리포트 보기
          </button>
        </div>
      </section>

      {/* 정보 수정 팝업 */}
      {isEditing && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalPanel}>
            <div className={styles.modalHeader}>
              <h2>내 정보 수정</h2>
              <button className={styles.closeBtn} onClick={closeEditModal}>
                ✕
              </button>
            </div>

            <div className={styles.modalBody}>
              <label className={styles.modalField}>
                <span>이름</span>
                <input
                  type="text"
                  value={editableFields.name}
                  onChange={(e) =>
                    handleFieldChange("name", e.target.value)
                  }
                />
              </label>

              <label className={styles.modalField}>
                <span>생년월일</span>
                <input
                  type="date"
                  value={editableFields.birthdate}
                  onChange={(e) =>
                    handleFieldChange("birthdate", e.target.value)
                  }
                />
              </label>
            </div>

            <div className={styles.modalActions}>
              <button className={styles.primaryBtn} onClick={handleSave}>
                저장하기
              </button>
            </div>
          </div>
        </div>
      )}

      {/* --- 리포트 팝업 --- */}
      {isReportListOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalPanel}>
            <div className={styles.modalHeader}>
              <h2>작성한 독후감 ({reportCount}개)</h2>
              <button className={styles.closeBtn} onClick={closeReportList}>
                ✕
              </button>
            </div>

            <div className={styles.modalBody}>
              {isReportLoading ? (
                <p>로딩중...</p>
              ) : reportList.length === 0 ? (
                <div className={styles.reportEmpty}>
                  <p>아직 작성한 독후감이 없어요.</p>
                </div>
              ) : (
                <ul className={styles.reportList}>
                  {reportList.map((r) => (
                    <li
                      key={r.reviewId}
                      className={styles.reportItem}
                      onClick={() => navigate(`/review/${r.reviewId}?from=mypage`)} // 상세페이지 이동 추가
                      style={{ cursor: "pointer" }}
                    >
                      
                      <strong className={styles.reportItemTitle}>
                        {r.title || "제목 없음"}
                      </strong>

                      <p className={styles.reportSummary}>
                        {r.memorableScene || "내용 없음"}
                      </p>

                      <span className={styles.reportDate}>
                        {(r.updatedAt || r.createdAt).split("T")[0]}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChildMyPage;
