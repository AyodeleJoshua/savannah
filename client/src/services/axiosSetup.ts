import axios from "axios";
import {
  getAuthTokenFromCookie,
  removeAuthTokenCookie,
} from "../utils/browserStorage";
import { appConfig } from "../config/appConfig";

export const apiClient = axios.create({
  baseURL: appConfig.baseUrl || "http://localhost:3001",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    "X-Content-Type-Options": "nosniff",
    "X-Frame-Options": "DENY",
    "X-XSS-Protection": "1; mode=block",
    "Referrer-Policy": "strict-origin-when-cross-origin",
    "Permissions-Policy": "geolocation=(), microphone=(), camera=()",
  },
  withCredentials: true,
});

apiClient.interceptors.request.use(
  (config) => {
    const token = getAuthTokenFromCookie();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      removeAuthTokenCookie();
      window.location.href = "/login";
    }
    return Promise.reject(error);
  },
);
