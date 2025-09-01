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

// 관리자 동화목록조회
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
