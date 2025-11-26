import axios from "axios";

const BASE_URL = process.env.REACT_APP_URL;

// 특정 독후감 상세 조회
export const getReviewDetailAPI = (reviewId) => {
  return axios.get(`${BASE_URL}/api/review/${reviewId}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};
