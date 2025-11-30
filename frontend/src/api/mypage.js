import { defaultInstance } from "./instance";

export const getChildMyPage = async (childId) => {
  const token = localStorage.getItem("token");

  const res = await defaultInstance.get(`/mypage/${childId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return res.data.responseDto.child; 
};
