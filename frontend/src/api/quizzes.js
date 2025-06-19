import { quizzesInstance } from "./instance";
import { request } from "../utils/request";

// 퀴즈 GET 요청
export const getQuizAPI = (taleId) =>
  request(quizzesInstance, "get", `quizzes/${taleId}`);
