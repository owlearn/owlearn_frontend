import { taleInstance } from "./instance";
import { request } from "../utils/request";

// 동화 GET 요청
export const getTale = (taleId) =>
  request(taleInstance, "get", `/tales/${taleId}`);

// //공지 POST 요청
// export const setNoticeData = (title, content) =>
//   request(api, "post", `/api/notices`, { title: title, content: content });
