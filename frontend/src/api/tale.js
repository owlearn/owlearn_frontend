import { taleInstance } from "./instance";
import { request } from "../utils/request";

// 동화 GET 요청
export const getTale = (taleId) => request(taleInstance, "get", `/${taleId}`);

// 관리자 동화삽입
export const insertTaleAPI = (title, contents, quizzes, images) => {
  const formData = new FormData();

  formData.append("title", title);

  contents.forEach((text) => {
    formData.append("contents", text);
  });

  formData.append("quizzesJson", JSON.stringify(quizzes));

  // 이미지 파일들 (List<MultipartFile>)
  images.forEach((file) => {
    if (file) {
      formData.append("images", file);
    }
  });

  for (let pair of formData.entries()) {
    console.log(`${pair[0]}:`, pair[1]);
  }
  // 최종 요청
  return request(taleInstance, "post", "/insert", formData);
};
