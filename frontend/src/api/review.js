import { reportInstance } from "./instance";
import { request } from "../utils/request";

export const getReviewDetailAPI = (reviewId) => {
  return request(reportInstance, "get", `/${reviewId}`);
};

export const updateReviewAPI = (reviewId, data) => {
  return request(reportInstance, "put", `/${reviewId}`, data);
};