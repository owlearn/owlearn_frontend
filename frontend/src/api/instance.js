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

export { taleInstance, userInstance, quizzesInstance };
