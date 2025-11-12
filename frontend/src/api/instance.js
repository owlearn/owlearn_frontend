import axios from "axios";

const BASE_URL = process.env.REACT_APP_URL;

const defaultInstance = axios.create({
  baseURL: `${BASE_URL}/api`,
});

// user 인스턴스
const userInstance = axios.create(defaultInstance.defaults);
userInstance.defaults.baseURL += "/user";

// tale 인스턴스
const taleInstance = axios.create(defaultInstance.defaults);
taleInstance.defaults.baseURL += "/tales";

const quizzesInstance = axios.create(defaultInstance.defaults);
quizzesInstance.defaults.baseURL += "/quizzes";

// gemini 이미지생성 인스턴스
const promptInstance = axios.create(defaultInstance.defaults);
promptInstance.defaults.baseURL += "/gemini";

// 서버 저장된 이미지 접근용 인스턴스
const imageBaseUrl = `${BASE_URL}`;

userInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export {
  defaultInstance,
  taleInstance,
  userInstance,
  quizzesInstance,
  promptInstance,
  imageBaseUrl,
};
