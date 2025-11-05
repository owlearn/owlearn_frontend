import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./childMyPage.module.css";
import owlGirl from "../assets/owl_girl.png";
import defaultCover from "../assets/fairy.png";

const ChildMyPage = () => {
  const navigate = useNavigate();

  const [child, setChild] = useState(null);
  const [isEditing, setIsEditing] = useState(false); //정보수정팝업 버튼 활성화
  const [editableFields, setEditableFields] = useState({
    name: "",
    birthdate: "",
  });

  // 리포트 보기 팝업 관련 state
  const [isReportListOpen, setIsReportListOpen] = useState(false);

  //로컬스토리지에서 자녀 정보 불러오기
  useEffect(() => {
    // 지금은 로컬스토리지 대신 더미데이터로 설정
    const dummyChild = {
      id: 1,
      name: "루루",
      birthdate: "2017-05-14",
      interests: ["모험", "과학", "상상"],
      recentBook: "달나라 탐험대",
      recentBookCover: defaultCover,
      progress: 85,
      credits: 2400,
      // 더미 리포트 여러 개 추가
      reports: [
        {
          title: "달나라 탐험대 독후감",
          summary:
            "루루는 새로운 친구들과 함께 달 탐험을 하며 협동의 중요성을 배웠습니다.",
          updatedAt: "2025-11-04",
        },
        {
          title: "숲속의 비밀 독후감",
          summary: "숲속 친구들과의 모험을 통해 용기를 배웠어요.",
          updatedAt: "2025-10-22",
        },
        {
          title: "하늘을 나는 토끼 독후감",
          summary: "상상력을 통해 꿈을 향해 도전하는 이야기입니다.",
          updatedAt: "2025-09-30",
        },
      ],
    };

    setChild(dummyChild);

    /*
    // 기존 로컬스토리지 코드 
    const stored = localStorage.getItem("selectedChild");
    if (!stored) return;
    try {
      setChild(JSON.parse(stored)); //불러온걸 child에 저장
    } catch (error) {
      console.error("Failed to parse stored child", error);
    }
    */
  }, []);

  //child에서 정보 추출 (?? 연산자: null이면 오른쪽 값 사용)
  const name = child?.name ?? "";
  const birthdate = child?.birthdate ?? "";
  const interests = child?.interests ?? [];
  const recentBook = child?.recentBook;
  const recentBookCover = child?.recentBookCover;
  const progressRate = child?.progress ?? 0;
  const credits = child?.credits ?? 0;
  const reports = Array.isArray(child?.reports) ? child.reports : [];
  const creditBalance = credits;

  useEffect(() => {
    if (!child) return;
    setEditableFields({
      name: child.name || "",
      birthdate: child.birthdate || "",
    });
  }, [child]);

  const openEditModal = () => setIsEditing(true);
  const closeEditModal = () => setIsEditing(false);

  const handleFieldChange = (field, value) => {
    setEditableFields((prev) => ({
      ...prev, //객체 복사
      [field]: value, //특정 필드를 업데이트
    }));
  }; //입력중에 상태업데이트

  const handleSave = () => {
    const trimmedName = editableFields.name.trim();
    if (!trimmedName) {
      alert("이름을 입력해 주세요.");
      return;
    }

    const updatedProfile = {
      ...child,
      name: trimmedName,
      birthdate: editableFields.birthdate,
    }; //변경된 상태를 실제 반영

    setChild(updatedProfile);
    setIsEditing(false);
  };

  // 독후감 팝업 열기 / 닫기
  const openReportList = () => setIsReportListOpen(true);
  const closeReportList = () => setIsReportListOpen(false);

  if (!child) {
    return (
      <div className={styles.page}>
        <div className={styles.empty}>
          <p>자녀 정보를 불러올 수 없습니다.</p>
          <button type="button" onClick={() => navigate("/loginProfile")}>
            돌아가기
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      {/* 프로필 섹션 */}
      <section className={styles.profileSection}>
        <img src={owlGirl} alt="owl" className={styles.profileImage} />

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
              <span className={styles.noTags}>관심 주제를 설정해주세요</span>
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
        </div>
      </section>

      <section className={styles.summarySection}>
        <div className={styles.card}>
          <h3>최근 읽은 책</h3>
          <div className={styles.book}>
            {recentBookCover ? (
              <img src={recentBookCover} alt="최근 읽은 책 표지" />
            ) : (
              <div className={styles.bookPlaceholder} aria-hidden="true" />
            )}
            <div className={styles.bookMeta}>
              <strong>{recentBook || "기록 없음"}</strong>
              <div className={styles.progressRow}>
                <span>학습 진도율</span>
                <strong>{progressRate}%</strong>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.card}>
          <h3>리포트 현황</h3>
          <p>
            총 작성 리포트 수: <strong>{reports.length}개</strong>
          </p>
          <button
            type="button"
            className={styles.primaryBtn}
            onClick={openReportList}
          >
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
              <button
                type="button"
                onClick={closeEditModal}
                className={styles.closeBtn}
              >
                ✕
              </button>
            </div>
            <div className={styles.modalBody}>
              <label className={styles.modalField}>
                <span>이름</span>
                <input
                  type="text"
                  value={editableFields.name}
                  onChange={(e) => handleFieldChange("name", e.target.value)}
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
              <button
                type="button"
                className={styles.primaryBtn}
                onClick={handleSave}
              >
                저장하기
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 독후감 보기 팝업 */}
      {isReportListOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalPanel}>
            <div className={styles.modalHeader}>
              <h2>작성한 독후감 ({reports.length}개)</h2>
              <button
                type="button"
                onClick={closeReportList}
                className={styles.closeBtn}
              >
                ✕
              </button>
            </div>
            <div className={styles.modalBody}>
              {reports.length === 0 ? (
                <div className={styles.reportEmpty}>
                  <p>아직 작성한 독후감이 없어요.</p>
                </div>
              ) : (
                <ul className={styles.reportList}>
                  {reports.map((r, i) => (
                    <li key={i} className={styles.reportItem}>
                      <strong className={styles.reportItemTitle}>
                        {r.title}
                      </strong>
                      <p className={styles.reportSummary}>{r.summary}</p>
                      <span className={styles.reportDate}>{r.updatedAt}</span>
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
