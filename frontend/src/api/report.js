import { reportInstance } from "./instance";
import { request } from "../utils/request";

// 독후감 제출 API
export const submitReportAPI = ({
  childId,
  taleId,
  rating,
  feeling,
  memorableScene,
  lesson,
  question,
}) => {
  return request(reportInstance, "post", `/child/${childId}/tales/${taleId}`, {
    rating,
    feeling: Array.isArray(feeling) ? feeling.join(",") : feeling,
    memorableScene,
    lesson,
    question,
  });
};
