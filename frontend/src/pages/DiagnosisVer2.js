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
    style: { top: "4%", left: "36%", width: "25%" }, // 세부 위치 조정
  },
  {
    itemImg: itemHat,
    name: "모자",
    style: { top: "3%", left: "38%", width: "28%" },
  },
  {
    itemImg: itemGlasses,
    name: "안경",
    style: { top: "10%", left: "24%", width: "50%" },
  },
  {
    itemImg: itemCrown,
    name: "왕관",
    style: { top: "5%", left: "37%", width: "25%" },
  },
];

const clothItems = [
  {
    itemImg: itemTie,
    name: "넥타이",
    style: { top: "38%", left: "37%", width: "25%" },
  },
  {
    itemImg: itemBadge,
    name: "뱃지",
    style: { top: "125px", left: "48%", width: "15%" },
  },
  {
    itemImg: itemBag,
    name: "가방",
    style: { top: "140px", left: "13%", width: "25%" },
  },
  {
    itemImg: itemRibbon,
    name: "리본",
    style: { top: "35%", left: "39%", width: "20%" },
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
      const scale = 2;
      const targetWidth = 250 * scale;
      const targetHeight = 300 * scale;

      // 1. 너비는 고정하고, 높이는 원본 크기대로 캡처
      const canvas = await html2canvas(avatarElement, {
        width: 250,
        height: 300,
        scale: scale,
        backgroundColor: null, // 배경 투명
      });

      // 2. 캡처된 캔버스를 위쪽 기준으로 크롭 (머리 잘림 방지)
      const sourceY = -50;

      const croppedCanvas = document.createElement("canvas");
      croppedCanvas.width = targetWidth;
      croppedCanvas.height = targetHeight;
      const ctx = croppedCanvas.getContext("2d");

      // drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight)
      ctx.drawImage(
        canvas,
        0, // sx
        sourceY, // sy
        targetWidth, // sWidth
        targetHeight, // sHeight
        0, // dx
        0, // dy
        targetWidth, // dWidth
        targetHeight // dHeight
      );

      const imgData = croppedCanvas.toDataURL("image/png");
      // 완성한 부엉이 이미지 다운로드 (백엔드에 전송 예정)
      const link = document.createElement("a");
      link.href = imgData;
      link.download = "avatar.png";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setTimeout(() => {
        navigate("/diagnosisEnd");
      }, 600);
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
