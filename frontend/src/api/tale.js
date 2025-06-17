import { taleInstance } from "./instance";
import { request } from "../utils/request";

// 동화 GET 요청
export const getTale = (taleId) =>
  request(taleInstance, "get", `/tales/${taleId}`);

// //공지 POST 요청
// export const setNoticeData = (title, content) =>
//   request(api, "post", `/api/notices`, { title: title, content: content });

// 관리자 동화 삽입 - 이미지 URL 방식으로 수정됨
export const insertTaleAPI = (title, contents, quizzesJson, imageUrls) => {
  return taleInstance.post("/tales/insert", {
    title: title,
    contents: contents,
    quizzesJson: quizzesJson,
    images: imageUrls, // File 객체 대신 URL 문자열 배열
  });
};
