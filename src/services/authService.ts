import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import {
  ESSErrorResponse,
  ESSLoginRequest,
  ESSLoginResponse,
  ESSUser,
} from "../redux/types/global";

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

// Request interceptor
apiClient.interceptors.request.use(
  (config) => {
    console.log("🚀 Request:", config.method?.toUpperCase(), config.url);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
apiClient.interceptors.response.use(
  (response) => {
    console.log("✅ Response:", response.status, response.config.url);
    return response;
  },
  (error) => {
    const isLogout401 =
      error.config?.url?.includes("/auth/logout") &&
      error.response?.status === 401;

    if (isLogout401) {
      console.log(
        "⚠️ Logout 401 (expected):",
        error.response?.status,
        error.config?.url
      );
    } else {
      console.error(
        "❌ Response Error:",
        error.response?.status,
        error.config?.url
      );
    }
    return Promise.reject(error);
  }
);

// ===== TOKEN MANAGER =====
export const tokenManager = {
  async getToken(): Promise<string | null> {
    try {
      return await AsyncStorage.getItem("auth_token");
    } catch (error) {
      console.error("Error getting token:", error);
      return null;
    }
  },

  async setToken(token: string): Promise<void> {
    try {
      await AsyncStorage.setItem("auth_token", token);
    } catch (error) {
      console.error("Error setting token:", error);
    }
  },

  async clearToken(): Promise<void> {
    try {
      await AsyncStorage.removeItem("auth_token");
    } catch (error) {
      console.error("Error clearing token:", error);
    }
  },

  async getTokenExpiry(): Promise<string | null> {
    try {
      return await AsyncStorage.getItem("token_expiry");
    } catch (error) {
      console.error("Error getting token expiry:", error);
      return null;
    }
  },

  async setTokenExpiry(expiry: string): Promise<void> {
    try {
      await AsyncStorage.setItem("token_expiry", expiry);
    } catch (error) {
      console.error("Error setting token expiry:", error);
    }
  },
};

// ===== AUTH SERVICE =====
export const authService = {
  // Login user
  async login(credentials: ESSLoginRequest): Promise<ESSLoginResponse> {
    try {
      console.log("🔑 Attempting login with credentials:", {
        email: credentials.email,
        password: credentials.password ? "***" : "empty",
        requestBody: credentials,
      });

      const response = await apiClient.post("/auth/login", credentials);
      console.log("✅ Login response:", response.data);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("❌ Login API error:", {
          status: error.response?.status,
          data: error.response?.data,
          url: error.config?.url,
        });

        const errorResponse: ESSErrorResponse = {
          status: false,
          messages: error.response?.data?.messages || "Login failed",
          error_code: error.response?.data?.error_code,
        };
        throw errorResponse;
      }
      console.error("❌ Network error:", error);
      throw {
        status: false,
        messages: "Network error occurred",
      };
    }
  },

  // Logout user
  async logout(): Promise<void> {
    try {
      console.log("🚪 Attempting logout...");
      await apiClient.post("/auth/logout");
      console.log("✅ Logout API call successful");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401) {
          console.log(
            "⚠️ Logout returned 401 (token already invalid) - this is expected behavior"
          );
        } else {
          console.error(
            "❌ Error during logout:",
            error.response?.status,
            error.response?.data
          );
        }
      } else {
        console.error("❌ Network error during logout:", error);
      }
    } finally {
      console.log("🧹 Clearing local token storage...");
      await tokenManager.clearToken();
      console.log("✅ Logout completed - token cleared");
    }
  },

  // Check auth status
  async checkAuthStatus(): Promise<ESSUser> {
    try {
      const token = await tokenManager.getToken();
      console.log("🔍 Checking auth status, token exists:", !!token);

      if (!token) {
        throw new Error("No token found");
      }

      const response = await apiClient.get("/auth/me");
      console.log("✅ Auth status response:", response.data);
      return response.data;
    } catch (error) {
      console.error("❌ Error checking auth status:", error);
      throw error;
    }
  },

  // Refresh token
  async refreshToken(): Promise<{ token: string; expiry: string }> {
    try {
      const response = await apiClient.post("/auth/refresh");
      return response.data;
    } catch (error) {
      console.error("Error refreshing token:", error);
      throw error;
    }
  },
};
