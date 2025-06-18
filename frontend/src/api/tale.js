import { taleInstance } from "./instance";
import { request } from "../utils/request";

// 동화 GET 요청
export const getTale = (taleId) =>
  request(taleInstance, "get", `/tales/${taleId}`);

export const insertTaleAPI = (title, contents, quizzes, images) => {
  const formData = new FormData();

  // 제목
  formData.append("title", title);

  // 페이지별 본문
  contents.forEach((text) => {
    formData.append("contents", text);
  });

  // 이미지 파일들 (List<MultipartFile>)
  images.forEach((file) => {
    if (file) {
      formData.append("images", file);
    }
  });

  // 퀴즈 JSON을 문자열로 변환 후 전송 (String 형태로 백에서 파싱)
  const quizzesJsonString = JSON.stringify(quizzes);
  formData.append("quizzesJson", quizzesJsonString);

  // 최종 요청
  return request(taleInstance, "post", "/tales/insert", formData);
};
