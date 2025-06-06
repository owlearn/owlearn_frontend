import { userInstance } from "./instance";
import { request } from "../utils/request";

// 회원가입
export const signupAPI = (userId, name, password) =>
  request(userInstance, "post", `/signup`, {
    userId: userId,
    name: name,
    password: password,
  });

// //공지 POST 요청
// export const setNoticeData = (title, content) =>
//   request(api, "post", `/api/notices`, { title: title, content: content });
