import { defaultInstance } from "./instance";
import { request } from "../utils/request";

export const getChildMyPage = async (childId) => {
  const token = localStorage.getItem("token");

  const res = await defaultInstance.get(`/mypage/${childId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  //return res.data.responseDto.child;
  return res.data.responseDto; 
};

export const getChildDetail = async (childId) => {
  return request(
    defaultInstance,
    "get", 
    `/mypage/${childId}`,
    {}
  );
};