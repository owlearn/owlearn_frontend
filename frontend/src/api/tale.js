import { taleInstance } from "./instance";
import { request } from "../utils/request";

// 동화 조회 요청
export const getTale = (taleId) => request(taleInstance, "get", `/${taleId}`);

// 기존동화 생성요청
export const oldTale = (taleId, childId) => {
  return request(taleInstance, "get", ``, {
    taleId: taleId,
    childId: childId,
  });
};

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
export const editTaleAPI = (taleId, title, contents, imageUrls, quizzes) => {
  return request(taleInstance, "put", `/${taleId}`, {
    title: title,
    contents: contents,
    imageUrls: imageUrls,
    quizzes: quizzes,
  });
};

// 관리자 특정동화삭제
export const deleteTaleAPI = (taleId) => {
  return request(taleInstance, "delete", `/${taleId}`);
};
