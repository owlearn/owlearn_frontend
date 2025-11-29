import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useParams, useLocation } from "react-router-dom";
import html2canvas from "html2canvas";
import styles from "./DiagnosisVer2.module.css";
import avatarBase from "../assets/avatar.png";
import coinIcon from "../assets/credit.png";
import { saveCharacterAPI, getCharacterAPI, getChildDetailAPI, buyItemAPI } from "../api/user";

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
    unlocked: true,
  },
  {
    itemImg: hairFemale4,
    name: "여자머리4",
    type: "female",
    style: { top: "0px", left: "82px", width: "45%" },
    unlocked: true,
  },
  {
    itemImg: hairMale3,
    name: "남자머리3",
    type: "male",
    style: { top: "-18.5px", left: "82px", width: "45%" },
    unlocked: true,
  },
  {
    itemImg: hairMale4,
    name: "남자머리4",
    type: "male",
    style: { top: "-19.5px", left: "82px", width: "45%" },
    unlocked: false,
    price: 200,
  },
  {
    itemImg: hairFemale1,
    name: "여자머리1",
    type: "male",
    style: { top: "7px", left: "80px", width: "45%" },
    unlocked: false,
    price: 200,
  },
  {
    itemImg: hairFemale2,
    name: "여자머리2",
    type: "female",
    style: { top: "-4px", left: "82px", width: "45%" },
    unlocked: false,
    price: 400,
  },
  {
    itemImg: hairFemale3,
    name: "여자머리3",
    type: "female",
    style: { top: "-4px", left: "82px", width: "45%" },
    unlocked: false,
    price: 600,
  },
  {
    itemImg: hairFemale5,
    name: "여자머리5",
    type: "female",
    style: { top: "7px", left: "82px", width: "45%" },
    unlocked: false,
    price: 600,
  },
  {
    itemImg: hairMale2,
    name: "남자머리2",
    type: "male",
    style: { top: "-18.5px", left: "80px", width: "45%" },
    unlocked: false,
    price: 800,
  },
];

const clothes = [
  {
    itemImg: clothes1,
    name: "의상1",
    style: { top: "123px", left: "90px", width: "40%" },
    unlocked: true,
  },
  {
    itemImg: clothes8,
    name: "의상8",
    style: { top: "125px", left: "97px", width: "35%" },
    unlocked: true,
  },
  {
    itemImg: clothes2,
    name: "의상2",
    style: { top: "126px", left: "91px", width: "38%" },
    unlocked: true,
  },
  {
    itemImg: clothes3,
    name: "의상3",
    style: { top: "123px", left: "96px", width: "35%" },
    unlocked: false,
    price: 300,
  },
  {
    itemImg: clothes7,
    name: "의상7",
    style: { top: "125px", left: "97.5px", width: "35%" },
    unlocked: false,
    price: 300,
  },
  {
    itemImg: clothes4,
    name: "의상4",
    style: { top: "123px", left: "92.5px", width: "38%" },
    unlocked: false,
    price: 500,
  },
  {
    itemImg: clothes6,
    name: "의상6",
    style: { top: "122.5px", left: "92px", width: "38%" },
    unlocked: false,
    price: 500,
  },
  {
    itemImg: clothes5,
    name: "의상5",
    style: { top: "125px", left: "92.5px", width: "38%" },
    unlocked: false,
    price: 700,
  },
  {
    itemImg: clothes9,
    name: "의상9",
    style: { top: "125px", left: "94px", width: "37%" },
    unlocked: false,
    price: 700,
  },
];

const shoes = [
  {
    itemImg: shoes1,
    name: "신발1",
    style: { top: "262.5px", left: "94px", width: "37%" },
    unlocked: true,
  },
  {
    itemImg: shoes2,
    name: "신발2",
    style: { top: "263px", left: "94px", width: "37%" },
    unlocked: true,
  },
  {
    itemImg: shoes3,
    name: "신발3",
    style: { top: "257px", left: "102px", width: "32%" },
    unlocked: true,
  },
  {
    itemImg: shoes7,
    name: "신발7",
    style: { top: "263px", left: "93px", width: "38%" },
    unlocked: false,
    price: 200,
  },
  {
    itemImg: shoes5,
    name: "신발5",
    style: { top: "260px", left: "93px", width: "38%" },
    unlocked: false,
    price: 200,
  },
  {
    itemImg: shoes6,
    name: "신발6",
    style: { top: "264px", left: "93px", width: "38%" },
    unlocked: false,
    price: 200,
  },
  {
    itemImg: shoes4,
    name: "신발4",
    style: { top: "241px", left: "94px", width: "37%" },
    unlocked: false,
    price: 400,
  },
  {
    itemImg: shoes8,
    name: "신발8",
    style: { top: "257px", left: "92px", width: "38%" },
    unlocked: false,
    price: 400,
  },
  {
    itemImg: shoes9,
    name: "신발9",
    style: { top: "263px", left: "91px", width: "39%" },
    unlocked: false,
    price: 400,
  },
];

const accessory = [
  {
    itemImg: itemHeadband,
    name: "머리띠",
    style: { top: "-35px", left: "36%", width: "25%" },
    unlocked: true,
  },
  {
    itemImg: itemRibbon,
    name: "리본",
    style: { top: "55%", left: "120px", width: "20%" },
    unlocked: true,
  },
  {
    itemImg: itemHat,
    name: "모자",
    style: { top: "-30px", left: "117px", width: "28%" },
    unlocked: true,
  },
  {
    itemImg: itemGlasses,
    name: "안경",
    style: { top: "30px", left: "35%", width: "30%" },
    unlocked: false,
    price: 100,
  },
  {
    itemImg: itemCrown,
    name: "왕관",
    style: { top: "-25px", left: "37%", width: "25%" },
    unlocked: false,
    price: 100,
  },
  {
    itemImg: itemTie,
    name: "넥타이",
    style: { top: "63%", left: "37.5%", width: "25%" },
    unlocked: false,
    price: 100,
  },
  {
    itemImg: itemBadge,
    name: "뱃지",
    style: { top: "140px", left: "50%", width: "10%" },
    unlocked: false,
    price: 300,
  },
  {
    itemImg: itemBag,
    name: "가방",
    style: { top: "190px", left: "55px", width: "25%" },
    unlocked: false,
    price: 300,
  },
  {
    itemImg: itemHeadband2,
    name: "머리띠2",
    style: { top: "-20px", left: "110px", width: "25%" },
    unlocked: false,
    price: 300,
  },
];

const tabList = ["머리", "의상", "신발", "액세서리"];

function DiagnosisPage() {
  // ⭐ 추가됨: 크레딧 상태
  const [childCredit, setChildCredit] = useState(0);

  const [selectedHair, setSelectedHair] = useState(null);
  const [selectedClothes, setSelectedClothes] = useState(null);
  const [selectedShoes, setSelectedShoes] = useState(null);
  const [selectedAccessory, setSelectedAccessory] = useState(null);

  const [currentIndex, setCurrentIndex] = useState(0);

  const navigate = useNavigate();
  const { childId } = useParams();
  const location = useLocation();
  const childData = location.state?.child;
  console.log("childId=", childId)

  // ⭐ 추가됨: 첫 진입 시 크레딧 로드
  useEffect(() => {
    async function fetchCredit() {
      try {
        const detail = await getChildDetailAPI(childId); 
        // /mypage/{childId} 구조가 child.credit 형태임
        setChildCredit(detail.child.credit); // ⭐ 수정됨  
        console.log("childCredit:", detail.child.credit);
      } catch (error) {
        console.error("크레딧 로딩 오류", error);
      }
    }
    fetchCredit();
  }, [childId]);

  // ⭐ 변경됨: 구매 가능 여부 체크 함수
  const canBuy = (item) => {
    if (item.unlocked) return false;
    if (typeof item.price !== "number") return false;
    return childCredit >= item.price;
  };

  // 탭에 따라 아이템 목록 선택
  let items;
  if (currentIndex === 0) items = hair;
  else if (currentIndex === 1) items = clothes;
  else if (currentIndex === 2) items = shoes;
  else if (currentIndex === 3) items = accessory;
  else items = [];

  // ⭐ 변경됨: 아이템 선택 / 구매
  const handleItemClick = async (item) => {
    // 이미 해금된 아이템 → 그냥 선택 처리
    if (item.unlocked) {
      selectItem(item);
      return;
    }

    // 구매 가능
    if (canBuy(item)) {
      const ok = window.confirm(`${item.price} 크레딧으로 구매하시겠습니까?`);
      if (!ok) return;

      try {
        await buyItemAPI(childId, { itemId: item.id, price: item.price }); // ⭐ 추가됨 (buy API 호출)
        alert("구매 완료!");

        item.unlocked = true; // 프론트 즉시 반영
        setChildCredit((c) => c - item.price); // ⭐ 추가됨

        selectItem(item);
      } catch (err) {
        console.error(err);
        alert("구매 중 오류 발생");
      }

      return;
    }

    // 구매 불가
    alert("크레딧이 부족합니다! 🔒");
  };

  // ⭐ 선택 로직(깔끔하게 함수화)
  const selectItem = (item) => {
    if (currentIndex === 0)
      setSelectedHair((prev) => (prev?.name === item.name ? null : item));
    else if (currentIndex === 1)
      setSelectedClothes((prev) => (prev?.name === item.name ? null : item));
    else if (currentIndex === 2)
      setSelectedShoes((prev) => (prev?.name === item.name ? null : item));
    else if (currentIndex === 3)
      setSelectedAccessory((prev) => (prev?.name === item.name ? null : item));
  };

  // 선택된 아이템인지 판별
  const isSelected = (item) => {
    if (currentIndex === 0) return selectedHair?.name === item.name;
    if (currentIndex === 1) return selectedClothes?.name === item.name;
    if (currentIndex === 2) return selectedShoes?.name === item.name;
    if (currentIndex === 3) return selectedAccessory?.name === item.name;
    return false;
  };

  // 기존 handleCapture() 코드 그대로 사용
  const handleCapture = async () => {
    const avatarElement = document.querySelector(`.${styles.avatarLayerWrap}`);
    if (avatarElement) {
      const scale = 2;
      const captureWidth = 270;
      const captureHeight = 330;

      const canvas = await html2canvas(avatarElement, {
        width: captureWidth,
        height: captureHeight,
        scale: scale,
        backgroundColor: null,
        useCORS: true,
        y: -30,
      });

      const croppedCanvas = document.createElement("canvas");
      croppedCanvas.width = captureWidth * scale;
      croppedCanvas.height = captureHeight * scale;
      const ctx = croppedCanvas.getContext("2d");

      ctx.drawImage(
        canvas,
        25 * scale,
        0,
        canvas.width,
        canvas.height,
        0,
        0,
        croppedCanvas.width,
        croppedCanvas.height
      );

      const imgData = croppedCanvas.toDataURL("image/png");
      const blob = await (await fetch(imgData)).blob();

      const formData = new FormData();
      formData.append("image", blob, "avatar.png");
      formData.append("childId", Number(childId));

      formData.append("selectedHair", selectedHair?.name || "");
      formData.append("selectedClothes", selectedClothes?.name || "");
      formData.append("selectedShoes", selectedShoes?.name || "");
      formData.append("selectedAccessory", selectedAccessory?.name || "");

      try {
        const response = await saveCharacterAPI(formData);

        if (response.status === 200) {
          alert("캐릭터 저장 완료!");
          navigate("/diagnosisEnd", {
            state: { imageUrl: response.data.responseDto.imageUrl },
          });
        } else {
          alert("이미지 업로드 실패");
        }
      } catch (error) {
        console.error("전송 오류:", error);
        alert("백엔드 전송 중 오류 발생");
      }
    } else {
      navigate("/diagnosisEnd");
    }
  };

  return (
    <div className={styles.diagnosisPage}>
      <h1 className={styles.title}>나만의 캐릭터 만들기</h1>
      <div className={styles.mainContent}>
        {/* 아바타 */}
        <div className={styles.avatar}>
          <button className={styles.doneChip} onClick={handleCapture}>
            <span className={styles.checkIcon}>✓</span>
            완료
          </button>

          <div className={styles.avatarLayerWrap}>
            <img src={avatarBase} className={styles.avatarImg} alt="avatar" />

            {selectedHair && (
              <img
                src={selectedHair.itemImg}
                className={styles.avatarLayer}
                alt={selectedHair.name}
                style={selectedHair.style}
              />
            )}

            {selectedShoes && (
              <img
                src={selectedShoes.itemImg}
                className={styles.avatarLayer}
                alt={selectedShoes.name}
                style={selectedShoes.style}
              />
            )}

            {selectedClothes && (
              <img
                src={selectedClothes.itemImg}
                className={styles.avatarLayer}
                alt={selectedClothes.name}
                style={selectedClothes.style}
              />
            )}

            {selectedAccessory && (
              <img
                src={selectedAccessory.itemImg}
                className={styles.avatarLayer}
                alt={selectedAccessory.name}
                style={selectedAccessory.style}
              />
            )}
          </div>
        </div>

        {/* 아이템 UI */}
        <div className={styles.itemContainer}>
          <div className={styles.tabs}>
            {tabList.map((tab, idx) => (
              <button
                key={idx}
                className={`${styles.tab} ${
                  currentIndex === idx ? styles.active : ""
                }`}
                onClick={() => setCurrentIndex(idx)}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className={styles.items}>
            {items.map((item, i) => (
              <div
                key={i}
                className={`${styles.itemBox} ${
                  isSelected(item) ? styles.selectedBox : ""
                } ${!item.unlocked ? styles.lockedItem : ""}`}
                onClick={() => handleItemClick(item)}
              >
                <img
                  src={item.itemImg}
                  className={styles.itemImg}
                  alt={item.name}
                />

                {!item.unlocked && (
                  <div className={styles.coinOverlay}>
                    <img
                      src={coinIcon}
                      className={styles.coinIcon}
                      alt=""
                    />
                    <span>{item.price}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DiagnosisPage;
