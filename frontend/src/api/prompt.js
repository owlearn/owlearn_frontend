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
