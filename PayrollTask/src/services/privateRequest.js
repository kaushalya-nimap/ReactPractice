import axios from "axios";
//import { getToken } from "utils/utils";
import { getToken } from "../utils/utils.jsx";
//import toast from "../shared/toast/Toast";
import toast from "../shared/toast/Toast";
export const privateRequest = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 20000,
});


const requestHandler = (request) => {
  const token = getToken();
  if (token) {
    request.headers.Authorization = `Basic ${token}`;
  }
  return request;
};

const clearToken = () => {
  localStorage.removeItem("token");
};

const responseErrorHandler = (error) => {
  if (error.response) {
    const { status, data, message } = error.response;

    switch (status) {
      case 401:
        clearToken();
        toast.error("Session expired, please login.");
        setTimeout(() => (window.location.href = "/"), 500);
        break;
      case 400:
        toast.error(data?.message || "Bad Request");
        break;
      case 403:
        toast.error(data?.message || "Access Denied");
        break;
      case 404:
        toast.error("Resource Not Found");
        break;
      case 500:
        toast.error("Server Error. Please try again later.");
        break;
      default:
        toast.error(data?.message || message || "An error occurred.");
    }
  } else {
    toast.error("Network Error. Please try again.");
  }

  return Promise.reject(error);
};

privateRequest.interceptors.request.use(requestHandler);
privateRequest.interceptors.response.use((response) => response, responseErrorHandler);

export const privateGet = (endPoint, config = {}) => privateRequest.get(endPoint, config);
export const privatePost = (endPoint, data, config = {}) => privateRequest.post(endPoint, data, config);
export const privatePut = (endPoint, data, config = {}) => privateRequest.put(endPoint, data, config);
export const privateDelete = (endPoint, config = {}) => privateRequest.delete(endPoint, config);

export default privateRequest;
