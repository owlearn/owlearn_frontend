import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import html2canvas from "html2canvas";
import styles from "./DiagnosisVer2.module.css";

import avatarBase from "../assets/avatar.png"; // 기본 부엉이
import itemHeadband from "../assets/faceItem1.png";
import itemHat from "../assets/faceItem2.png";
import itemGlasses from "../assets/faceItem3.png";
import itemCrown from "../assets/faceItem4.png";
import itemTie from "../assets/clothItem1.png";
import itemBadge from "../assets/clothItem2.png";
import itemBag from "../assets/clothItem3.png";
import itemRibbon from "../assets/clothItem4.png";

const faceItems = [
  {
    itemImg: itemHeadband,
    name: "머리띠",
    style: { top: "-10%", left: "27%", width: "37%" }, // 세부 위치 조정
  },
  {
    itemImg: itemHat,
    name: "모자",
    style: { top: "-10%", left: "30%", width: "40%" },
  },
  {
    itemImg: itemGlasses,
    name: "안경",
    style: { top: "0%", left: "15%", width: "63%" },
  },
  {
    itemImg: itemCrown,
    name: "왕관",
    style: { top: "-7%", left: "32%", width: "30%" },
  },
];

const clothItems = [
  {
    itemImg: itemTie,
    name: "넥타이",
    style: { top: "108px", left: "70px", width: "80px" },
  },
  {
    itemImg: itemBadge,
    name: "뱃지",
    style: { top: "120px", left: "110px", width: "20%" },
  },
  {
    itemImg: itemBag,
    name: "가방",
    style: { top: "140px", left: "-12px", width: "80px" },
  },
  {
    itemImg: itemRibbon,
    name: "리본",
    style: { top: "92px", left: "80px", width: "60px" },
  },
];

const tabList = ["얼굴", "의상"];

function DiagnosisPage() {
  const [selectedFace, setSelectedFace] = useState(null);
  const [selectedCloth, setSelectedCloth] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();

  const items = currentIndex === 0 ? faceItems : clothItems;

  // 아이템 클릭 핸들러
  const handleItemClick = (item) => {
    if (currentIndex === 0) {
      if (selectedFace?.name === item.name) {
        setSelectedFace(null); // 이미 선택된 얼굴 아이템이면 해제
      } else {
        setSelectedFace(item);
      }
    } else {
      if (selectedCloth?.name === item.name) {
        setSelectedCloth(null); // 이미 선택된 의상 아이템이면 해제
      } else {
        setSelectedCloth(item);
      }
    }
  };

  const handleCapture = async () => {
    const avatarElement = document.querySelector(`.${styles.avatarLayerWrap}`);
    if (avatarElement) {
      const canvas = await html2canvas(avatarElement, {
        width: 400, // 원하는 캡처 너비(px)
        height: 400, // 원하는 캡처 높이(px)
        scale: 2, // 해상도 배율 (2면 2배로 선명하게)
      });
      const imgData = canvas.toDataURL("image/png");
      // 완성한 부엉이 이미지 다운로드 (백엔드에 전송 예정)
      const link = document.createElement("a");
      link.href = imgData;
      link.download = "avatar.png";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setTimeout(() => {
        navigate("/diagnosisEnd");
      }, 800);
    } else {
      navigate("/diagnosisEnd");
    }
  };

  return (
    <div className={styles.diagnosisPage}>
      <div className={styles.avatar}>
        <div className={styles.avatarLayerWrap}>
          <img src={avatarBase} className={styles.avatarImg} alt="avatar" />
          {selectedFace && (
            <img
              src={selectedFace.itemImg}
              className={styles.avatarLayer}
              alt="face-item"
              style={selectedFace.style}
            />
          )}
          {selectedCloth && (
            <img
              src={selectedCloth.itemImg}
              className={styles.avatarLayer}
              alt="cloth-item"
              style={selectedCloth.style}
            />
          )}
        </div>
        <button className={styles.submitButton} onClick={handleCapture}>
          완료
        </button>
      </div>

      <div className={styles.itemContainer}>
        <div className={styles.container}>
          <div className={styles.tabs}>
            {tabList.map((tab, i) => (
              <button
                key={i}
                className={`${styles.tab} ${
                  currentIndex === i ? styles.active : ""
                }`}
                onClick={() => setCurrentIndex(i)}
              >
                {tab}
              </button>
            ))}
          </div>
          <div className={styles.items}>
            {items.map((item, index) => (
              <img
                key={index}
                src={item.itemImg}
                className={`${styles.itemImg} ${
                  (currentIndex === 0 && selectedFace?.name === item.name) ||
                  (currentIndex === 1 && selectedCloth?.name === item.name)
                    ? styles.selectedItem
                    : ""
                }`}
                alt={item.name}
                onClick={() => handleItemClick(item)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DiagnosisPage;
