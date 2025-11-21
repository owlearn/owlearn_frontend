import { taleInstance } from "./instance";
import { request } from "../utils/request";

// 동화 조회 요청
export const getTale = (taleId) => request(taleInstance, "get", `/${taleId}`);

// 기성동화 이미지 생성요청
export const oldTaleImageGen = (taleId, childId) => {
  return request(taleInstance, "post", ``, {
    taleId: taleId,
    childId: childId,
  });
};

// 기성동화 조회
export const getOldTale = () => request(taleInstance, "get", "/premade");

// 맞춤동화 생성
export const AiTaleGen = (subject, tone, artStyle, ageGroup, childId) =>
  request(taleInstance, "post", "/generate", {
    subject,
    tone,
    artStyle,
    ageGroup,
    childId,
  });

// 관리자 동화삽입 (기성동화 텍스트 삽입)
export const insertTaleAPI = ({ title, contents }) => {
  return request(taleInstance, "post", "/insert", {
    title: title,
    contents: contents,
  });
};

// 전체 동화목록조회
export const getTaleListAPI = () => request(taleInstance, "get", "");

// 관리자 특정동화수정
export const editTaleAPI = (taleId, data) => {
  return request(taleInstance, "put", `/${taleId}`, data);
};

// 관리자 특정동화삭제
export const deleteTaleAPI = (taleId) => {
  return request(taleInstance, "delete", `/${taleId}`);
};
