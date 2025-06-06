import axios from "axios";

const BASE_URL = process.env.REACT_APP_URL;

const defaultInstance = axios.create({
  baseURL: BASE_URL,
});

// user 인스턴스
const userInstance = axios.create(defaultInstance.defaults);
userInstance.defaults.baseURL += "";
//임시로 /api 안붙임

// tale 인스턴스
const taleInstance = axios.create(defaultInstance.defaults);
taleInstance.defaults.baseURL += "/api";

export { taleInstance, userInstance };
