import { childWordInstance } from "./instance";
import { request } from "../utils/request";

// 모르는 단어 저장 + 뜻 조회 API
// words 배열 그대로 전달
export const unknownWordsAPI = (childId, words) => {
  return request(childWordInstance, "post", `/${childId}/words`, words);
};

// 단어장 조회(로딩컴포넌트에 사용): GET /api/child/{childId}/words
export const wordMeanAPI = (childId) => {
  return request(childWordInstance, "get", `/${childId}/words`);
};
