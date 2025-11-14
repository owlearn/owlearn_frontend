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

// 로그인
export const signinAPI = (userId, password) => {
  return request(userInstance, "post", `/signin`, {
    userId: userId,
    password: password,
  });
};
  
// 캐릭터 커스터마이징 저장
export const saveCharacterAPI = (formData) => {
  return request(userInstance, "post", "/character", formData);
};

// 캐릭터 커스터마이징 조회
export const getCharacterAPI = () => {
  return request(userInstance, "get", "/character");
};

// 자녀 추가
export const addChildAPI = async (childData) => {
  const res = await userInstance.post("/child", childData);
  return res.data.responseDto; 
};

// 자녀 목록 조회
export const getChildAPI = async () => {
  const res = await userInstance.get("/child");
  return res.data.responseDto;   // 배열로 내려옴
};