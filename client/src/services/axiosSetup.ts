import axios from "axios";
import {
  getItemFromStorage,
  removeItemFromStorage,
} from "../utils/browserStorage";
import { constants } from "../utils/constants";
import { appConfig } from "../config/appConfig";

// Create axios instance with default config
export const apiClient = axios.create({
  baseURL: appConfig.baseUrl || "http://localhost:3001",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor to add auth token
apiClient.interceptors.request.use(
  (config) => {
    const token = getItemFromStorage(constants.AUTH_TOKEN);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access
      removeItemFromStorage(constants.AUTH_TOKEN);
      window.location.href = "/login";
    }
    return Promise.reject(error);
  },
);
