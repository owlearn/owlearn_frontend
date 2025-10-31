import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import html2canvas from "html2canvas";
import styles from "./DiagnosisVer2.module.css";
import avatarBase from "../assets/avatar.png";
import { defaultInstance, imageBaseUrl } from "../api/instance";

import hairMale1 from "../assets/hair_boy_1.png";
import hairMale2 from "../assets/hair_boy_2.png";
import hairMale3 from "../assets/hair_boy_3.png";
import hairMale4 from "../assets/hair_boy_4.png";
import hairFemale1 from "../assets/hair_girl_1.png";
import hairFemale2 from "../assets/hair_girl_2.png";
import hairFemale3 from "../assets/hair_girl_3.png";
import hairFemale4 from "../assets/hair_girl_4.png";
import hairFemale5 from "../assets/hair_girl_5.png";

import clothes1 from "../assets/clothes1.png";
import clothes2 from "../assets/clothes2.png";
import clothes3 from "../assets/clothes3.png";
import clothes4 from "../assets/clothes4.png";
import clothes5 from "../assets/clothes5.png";
import clothes6 from "../assets/clothes6.png";
import clothes7 from "../assets/clothes7.png";
import clothes8 from "../assets/clothes8.png";
import clothes9 from "../assets/clothes9.png";

import shoes1 from "../assets/shoes1.png";
import shoes2 from "../assets/shoes2.png";
import shoes3 from "../assets/shoes3.png";
import shoes4 from "../assets/shoes4.png";
import shoes5 from "../assets/shoes5.png";
import shoes6 from "../assets/shoes6.png";
import shoes7 from "../assets/shoes7.png";
import shoes8 from "../assets/shoes8.png";
import shoes9 from "../assets/shoes9.png";

import itemHeadband from "../assets/accessory1.png";
import itemHat from "../assets/accessory2.png";
import itemGlasses from "../assets/accessory3.png";
import itemCrown from "../assets/accessory4.png";
import itemTie from "../assets/accessory5.png";
import itemBadge from "../assets/accessory6.png";
import itemBag from "../assets/accessory7.png";
import itemRibbon from "../assets/accessory8.png";
import itemHeadband2 from "../assets/accessory9.png";

const hair = [
  {
    itemImg: hairMale1,
    name: "남자머리1",
    type: "male",
    style: { top: "-15px", left: "83px", width: "45%" },
  },
  {
    itemImg: hairMale2,
    name: "남자머리2",
    type: "male",
    style: { top: "-18.5px", left: "80px", width: "45%" },
  },
  {
    itemImg: hairMale3,
    name: "남자머리3",
    type: "male",
    style: { top: "-18.5px", left: "82px", width: "45%" },
  },
  {
    itemImg: hairMale4,
    name: "남자머리4",
    type: "male",
    style: { top: "-19.5px", left: "82px", width: "45%" },
  },
  {
    itemImg: hairFemale1,
    name: "여자머리1",
    type: "male",
    style: { top: "7px", left: "80px", width: "45%" },
  },
  {
    itemImg: hairFemale2,
    name: "여자머리2",
    type: "female",
    style: { top: "-4px", left: "82px", width: "45%" },
  },
  {
    itemImg: hairFemale3,
    name: "여자머리3",
    type: "female",
    style: { top: "-4px", left: "82px", width: "45%" },
  },
  {
    itemImg: hairFemale4,
    name: "여자머리4",
    type: "female",
    style: { top: "0px", left: "82px", width: "45%" },
  },
  {
    itemImg: hairFemale5,
    name: "여자머리5",
    type: "female",
    style: { top: "7px", left: "82px", width: "45%" },
  },
];

const clothes = [
  {
    itemImg: clothes1,
    name: "의상1",
    style: { top: "123px", left: "90px", width: "40%" },
  },
  {
    itemImg: clothes2,
    name: "의상2",
    style: { top: "126px", left: "91px", width: "38%" },
  },
  {
    itemImg: clothes3,
    name: "의상3",
    style: { top: "123px", left: "96px", width: "35%" },
  },
  {
    itemImg: clothes4,
    name: "의상4",
    style: { top: "123px", left: "92.5px", width: "38%" },
  },
  {
    itemImg: clothes5,
    name: "의상5",
    style: { top: "125px", left: "92.5px", width: "38%" },
  },
  {
    itemImg: clothes6,
    name: "의상6",
    style: { top: "122.5px", left: "92px", width: "38%" },
  },
  {
    itemImg: clothes7,
    name: "의상7",
    style: { top: "125px", left: "97.5px", width: "35%" },
  },
  {
    itemImg: clothes8,
    name: "의상8",
    style: { top: "125px", left: "97px", width: "35%" },
  },
  {
    itemImg: clothes9,
    name: "의상9",
    style: { top: "125px", left: "94px", width: "37%" },
  },
];

const shoes = [
  {
    itemImg: shoes1,
    name: "신발1",
    style: { top: "262.5px", left: "94px", width: "37%" },
  },
  {
    itemImg: shoes2,
    name: "신발2",
    style: { top: "263px", left: "94px", width: "37%" },
  },
  {
    itemImg: shoes3,
    name: "신발3",
    style: { top: "257px", left: "102px", width: "32%" },
  },
  {
    itemImg: shoes4,
    name: "신발4",
    style: { top: "241px", left: "94px", width: "37%" },
  },
  {
    itemImg: shoes5,
    name: "신발5",
    style: { top: "260px", left: "93px", width: "38%" },
  },
  {
    itemImg: shoes6,
    name: "신발6",
    style: { top: "264x", left: "93px", width: "38%" },
  },
  {
    itemImg: shoes7,
    name: "신발7",
    style: { top: "263px", left: "93px", width: "38%" },
  },
  {
    itemImg: shoes8,
    name: "신발8",
    style: { top: "257px", left: "92px", width: "38%" },
  },
  {
    itemImg: shoes9,
    name: "신발9",
    style: { top: "263px", left: "91px", width: "39%" },
  },
]

const accessory = [
  {
    itemImg: itemHeadband,
    name: "머리띠",
    style: { top: "-35px", left: "36%", width: "25%" }, 
  },
  {
  itemImg: itemHeadband2,
    name: "머리띠2",
    style: { top: "-20px", left: "110px", width: "25%" },
  },
  {
    itemImg: itemHat,
    name: "모자",
    style: { top: "-30px", left: "117px", width: "28%" },
  },
  {
    itemImg: itemGlasses,
    name: "안경",
    style: { top: "30px", left: "35%", width: "30%" },
  },
  {
    itemImg: itemCrown,
    name: "왕관",
    style: { top: "-25px", left: "37%", width: "25%" },
  },
  {
    itemImg: itemTie,
    name: "넥타이",
    style: { top: "110px", left: "37.5%", width: "25%" },
  },
  {
    itemImg: itemBadge,
    name: "뱃지",
    style: { top: "130px", left: "48%", width: "10%" },
  },
  {
    itemImg: itemBag,
    name: "가방",
    style: { top: "190px", left: "55px", width: "25%" },
  },
  {
    itemImg: itemRibbon,
    name: "리본",
    style: { top: "35%", left: "118px", width: "20%" },
  },
    
];

const tabList = ["머리","의상","신발","액세서리"];

function DiagnosisPage() {
  const [selectedHair, setSelectedHair] = useState(null);
  const [selectedClothes, setSelectedClothes] = useState(null);
  const [selectedShoes, setSelectedShoes] = useState(null);
  const [selectedAccessory, setSelectedAccessory] = useState(null);
  // 현재 탭 인덱스도 0으로 고정하거나, 필요하다면 여러 탭으로 확장 가능
  const [currentIndex, setCurrentIndex] = useState(0);

  const navigate = useNavigate();

  let items;
  if (currentIndex === 0) {
    items = hair; 
  } else if (currentIndex === 1) {
    items = clothes; 
  } else if (currentIndex === 2) {
    items = shoes;
  } else if (currentIndex === 3) { 
    items = accessory; 
  } else {
    // 정의되지 않은 currentIndex 값에 대한 기본값 또는 오류 처리
    items = [];
    console.warn("정의되지 않은 currentIndex:", currentIndex);
  }

  const handleItemClick = (item) => {
    if (currentIndex === 0) {
      // '머리' 탭일 때
      if (selectedHair?.name === item.name) {
        setSelectedHair(null); 
      } else {
        setSelectedHair(item); 
      }
    } else if (currentIndex === 1) {
      // '의상' 탭일 때
      if (selectedClothes?.name === item.name) {
        setSelectedClothes(null); 
      } else {
        setSelectedClothes(item); 
      }
    } else if (currentIndex === 2) {
      // '신발' 탭일 때
      if (selectedShoes?.name === item.name) {
        setSelectedShoes(null); 
      } else {
        setSelectedShoes(item); 
      }
    } else if (currentIndex === 3) {
      // '액세서리' 탭일 때
      if (selectedAccessory?.name === item.name) {
        setSelectedAccessory(null); 
      } else {
        setSelectedAccessory(item); 
      }
    }
  };

  const handleCapture = async () => {
    const avatarElement = document.querySelector(`.${styles.avatarLayerWrap}`);    
    if (avatarElement) {
      const scale = 2; // 이미지 품질을 높이기 위한 스케일
      const captureWidth = 270;
      const captureHeight = 330;

      const canvas = await html2canvas(avatarElement, {
        width: captureWidth,
        height: captureHeight,
        scale: scale,
        backgroundColor: null, // 배경 투명하게 캡처
        useCORS: true, 
        y:-40,
        /*x: 10,  // ← 왼쪽 여백 잘라내기
        scrollX: 0,
        scrollY: 0,*/
      });

      const sourceY = 0; // 초기 크롭 시작점을 0으로 설정하여 전체 캡처
      const croppedCanvasWidth = captureWidth * scale;
      const croppedCanvasHeight = captureHeight * scale;

      const croppedCanvas = document.createElement("canvas");
      croppedCanvas.width = croppedCanvasWidth;
      croppedCanvas.height = croppedCanvasHeight;
      const ctx = croppedCanvas.getContext("2d");

      ctx.drawImage(
        canvas,
        25*scale, 
        sourceY, 
        canvas.width, 
        canvas.height - sourceY, 
        0,
        0, 
        croppedCanvasWidth,
        croppedCanvasHeight 
      );

      const imgData = croppedCanvas.toDataURL("image/png");
      
      // 백엔드 전송 로직
      try {
        // base64 → Blob 변환
        const blob = await (await fetch(imgData)).blob();

        const formData = new FormData();
        formData.append("image", blob, "avatar.png");

        formData.append("selectedHair", selectedHair?.name || "");
        formData.append("selectedClothes", selectedClothes?.name || "");
        formData.append("selectedShoes", selectedShoes?.name || "");
        formData.append("selectedAccessory", selectedAccessory?.name || "");
        
        for (let [key, value] of formData.entries()) {
          console.log("FormData Key:", key, "Value:", value);
        }

      const response = await defaultInstance.post("/user/character", formData); // axios 자동 처리

      if (response.status === 200) {
        console.log("업로드 성공:", response.data);
        console.log("응답 전체:", response);
        console.log("응답 데이터:", response.data);
        alert("서버 전송 완료");
        navigate("/diagnosisEnd", { state: { imageUrl: response.data.responseDto.message } });
      } else {
        console.error("업로드 실패:", response.statusText);
        alert("이미지 업로드 실패");
      } 
    } catch (error) {
      console.error("전송 오류:", error);
      alert("백엔드 전송 중 오류 발생");
    }
      
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
      // avatarElement를 찾지 못했거나 캡처할 필요가 없는 경우
      navigate("/diagnosisEnd");
    }
  };

  return (
    <div className={styles.diagnosisPage}>
      <h1 className={styles.title}>나만의 캐릭터 만들기</h1>
      <div className={styles.mainContent}>
        {/* 아바타 표시 영역 */}
        <div className={styles.avatar}>
          <div className={styles.avatarLayerWrap}>
            {/* 기본 아바타 이미지 */}
            <img src={avatarBase} className={styles.avatarImg} alt="avatar" />
            
            {/* 선택된 머리 스타일 이미지 */}
            {selectedHair && (
              <img
                src={selectedHair.itemImg}
                className={styles.avatarLayer}
                alt={selectedHair.name}
                style={selectedHair.style}
              />
            )}

            {/* 선택된 신발 스타일 이미지 */}
            {selectedShoes && (
              <img
                src={selectedShoes.itemImg}
                className={styles.avatarLayer}
                alt={selectedShoes.name}
                style={selectedShoes.style}
              />
            )}

            {/* 선택된 의상 스타일 이미지 */}
            {selectedClothes && (
              <img
                src={selectedClothes.itemImg}
                className={styles.avatarLayer}
                alt={selectedClothes.name}
                style={selectedClothes.style}
              />
            )}
  
            {/* 선택된 액세서리 이미지 */}
            {selectedAccessory && (
              <img
                src={selectedAccessory.itemImg}
                className={styles.avatarLayer}
                alt={selectedAccessory.name}
                style={selectedAccessory.style} 
              />
            )}
          </div>
          {/* 완료 버튼 */}
          <button className={styles.submitButton} onClick={handleCapture}>
            완료
          </button>
        </div>

        {/* 아이템 선택 UI 영역 */}
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
              {/* 현재 탭에 맞는 아이템 목록을 렌더링 */}
              {items.map((item, index) => (
                <img
                  key={index}
                  src={item.itemImg}
                  className={`${styles.itemImg} ${
                    (currentIndex === 0 && selectedHair?.name === item.name) ||
                    (currentIndex === 1 && selectedClothes?.name === item.name) ||
                    (currentIndex === 2 && selectedShoes?.name === item.name) ||
                    (currentIndex === 3 && selectedAccessory?.name === item.name)
                      ? styles.selectedItem // 선택된 아이템에만 스타일 적용
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
    </div>
  );
}

export default DiagnosisPage;