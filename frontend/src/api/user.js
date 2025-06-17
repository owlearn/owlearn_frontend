import { userInstance } from "./instance";
import { request } from "../utils/request";

// 회원가입
export const signupAPI = (userId, name, password) => {
  return request(userInstance, "post", `/signup`, {
    userId: userId,
    name: name,
    password: password,
  });
};

// 아이디 중복체크
export const idCheckAPI = async (userId) => {
  return request(userInstance, "get", "/checkId", { params: { userId } });
};

//로그인
export const signinAPI = (id, pw) => {
  return request(userInstance, "post", `/signin`, {
    id: id,
    pw: pw,
  });
};
