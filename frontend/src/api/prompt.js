import { promptInstance } from "./instance";
import { request } from "../utils/request";

// // 프롬프팅 요청
// export const promptAPI = (title, content, characterImage, n) => {
//   return request(promptInstance, "post", "", {
//     title: title,
//     content: content,
//     characterImage: characterImage,
//     n: n,
//   });
// };

// 프롬프팅 요청 (텍스트만으로 이미지 생성))
export const promptAPI = (prompt) => {
  return request(promptInstance, "post", "", { prompt: prompt });
};

// Img2Img (이미지+텍스트->이미지)
export const Image2ImageAPI = (prompt, refImage) => {
  const formData = new FormData();

  // 텍스트
  formData.append("prompt", prompt);
  formData.append("refImage", refImage);

  // 최종 전송
  return request(promptInstance, "post", "", formData);
};
