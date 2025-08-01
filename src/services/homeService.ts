import axios from "axios";
import {
  DashboardData,
  HistoryItemData,
  NotificationItem,
  ProfileData,
} from "../redux/types/global";
import { tokenManager } from "./authService";

// ===== API CONFIGURATION =====
const MOCK_API_BASE_URL =
  "https://apigwsand.telkomsigma.co.id/mockapi/prism/essbe";
const PRODUCTION_API_BASE_URL = "https://ess-api.telkomsigma.co.id/api/v1";
const BASE_URL = __DEV__ ? MOCK_API_BASE_URL : PRODUCTION_API_BASE_URL;

// ===== API CLIENT =====
const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// ===== REQUEST INTERCEPTOR =====
apiClient.interceptors.request.use(
  async (config) => {
    const token = await tokenManager.getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// ===== RESPONSE INTERCEPTOR =====
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      // Handle token refresh or logout
      await tokenManager.clearToken();
    }
    return Promise.reject(error);
  }
);

// ===== HOME SERVICE =====
export const homeService = {
  // Get dashboard data
  async getDashboardData(): Promise<DashboardData> {
    try {
      const response = await apiClient.get("/dashboard");
      return response.data;
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
      throw error;
    }
  },

  // Get notifications
  async getNotifications(): Promise<NotificationItem[]> {
    try {
      const response = await apiClient.get("/notifications");
      return response.data;
    } catch (error) {
      console.error("Error fetching notifications:", error);
      throw error;
    }
  },

  // Get recent history
  async getRecentHistory(): Promise<HistoryItemData[]> {
    try {
      const response = await apiClient.get("/history/recent");
      return response.data;
    } catch (error) {
      console.error("Error fetching recent history:", error);
      throw error;
    }
  },

  // Get user profile
  async getUserProfile(): Promise<ProfileData> {
    try {
      console.log("🔄 Fetching user profile from /employees/profile...");
      const response = await apiClient.get("/employees/profile");
      console.log("✅ Profile data received:", response.data);
      return response.data;
    } catch (error) {
      console.error("❌ Error fetching user profile:", error);
      throw error;
    }
  },

  // Mark notification as read
  async markNotificationAsRead(notificationId: string): Promise<void> {
    try {
      await apiClient.put(`/notifications/${notificationId}/read`);
    } catch (error) {
      console.error("Error marking notification as read:", error);
      throw error;
    }
  },
};
