import { createAsyncThunk } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";

// ===== TYPES =====
export interface ESSUser {
  employee_id: string;
  employee_name: string;
  email: string;
  employee_level: string;
  employee_position: string;
  unit: string;
  organization: string;
  spv_id: string;
  spv_name: string;
  company_code: string;
  authenticator: string;
}

export interface ESSLoginRequest {
  email: string;
  password: string;
}

export interface ESSLoginResponse {
  status: boolean;
  messages: string;
  data: ESSUser;
  token: {
    access_token: string;
    refresh_token: string;
  };
}

export interface ESSErrorResponse {
  status: boolean;
  messages: string | { [key: string]: string[] };
  message?: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: ESSUser | null;
  loading: boolean;
  error: ESSErrorResponse | null;
  tokenExpiry: string | null;
  lastLoginTime: string | null;
}

export interface LoginData {
  loginTime: string;
  method: "credentials" | "biometric" | "sso";
  deviceInfo?: string;
}

// ===== API CONFIGURATION =====
const MOCK_API_BASE_URL =
  "https://apigwsand.telkomsigma.co.id/mockapi/prism/essbe";
const PRODUCTION_API_BASE_URL = "https://ess-api.telkomsigma.co.id/api/v1";
const BASE_URL = __DEV__ ? MOCK_API_BASE_URL : PRODUCTION_API_BASE_URL;

// ===== API CLIENT =====
export const apiClient = {
  post: async (url: string, data?: any) => {
    const response = await fetch(`${BASE_URL}${url}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (response.status === 401) {
      throw new Error("Authentication required");
    }

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  },

  get: async (url: string, token?: string) => {
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };

    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    const response = await fetch(`${BASE_URL}${url}`, {
      method: "GET",
      headers,
    });

    if (response.status === 401) {
      throw new Error("Authentication required");
    }

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  },
};

// ===== API ENDPOINTS =====
const AUTH_ENDPOINTS = {
  LOGIN: "/auth/login",
  LOGOUT: "/auth/logout",
  REFRESH: "/auth/refresh",
  CHECK: "/auth/check",
};

// ===== STORAGE KEYS =====
const STORAGE_KEYS = {
  ACCESS_TOKEN: "ess_access_token",
  REFRESH_TOKEN: "ess_refresh_token",
  USER_DATA: "ess_user_data",
  LOGIN_TIME: "ess_login_time",
} as const;

// ===== UTILITIES =====
export const tokenManager = {
  save: async (accessToken: string, refreshToken: string) => {
    await AsyncStorage.multiSet([
      [STORAGE_KEYS.ACCESS_TOKEN, accessToken],
      [STORAGE_KEYS.REFRESH_TOKEN, refreshToken],
    ]);
  },

  get: async () => {
    const tokens = await AsyncStorage.multiGet([
      STORAGE_KEYS.ACCESS_TOKEN,
      STORAGE_KEYS.REFRESH_TOKEN,
    ]);
    return {
      accessToken: tokens[0][1],
      refreshToken: tokens[1][1],
    };
  },

  clear: async () => {
    await AsyncStorage.multiRemove([
      STORAGE_KEYS.ACCESS_TOKEN,
      STORAGE_KEYS.REFRESH_TOKEN,
      STORAGE_KEYS.USER_DATA,
      STORAGE_KEYS.LOGIN_TIME,
    ]);
  },
};

export const authUtils = {
  isTokenExpired: (token: string): boolean => {
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      return Date.now() >= payload.exp * 1000;
    } catch {
      return true;
    }
  },
};

// ===== THUNKS =====
export const loginESSUser = createAsyncThunk(
  "auth/loginESS",
  async (credentials: ESSLoginRequest, { dispatch, rejectWithValue }) => {
    try {
      // Import only the actions that exist
      const { setLoading, setToken } = await import(
        "../reducers/globalReducer"
      );
      const { setUser, setAuthenticated, saveLogin } = await import(
        "../reducers/profileReducers"
      );

      dispatch(setLoading(true));

      console.log("🔐 Attempting ESS login:", credentials.email);

      // API call
      const response: ESSLoginResponse = await apiClient.post(
        AUTH_ENDPOINTS.LOGIN,
        credentials
      );

      console.log("📡 ESS API Response:", response);

      if (response.status && response.data) {
        // Fixed: Extract tokens from response.token, not response.data
        const { access_token, refresh_token } = response.token || {};
        const userData = response.data;

        // Check if tokens exist
        if (!access_token || !refresh_token) {
          console.error("❌ No tokens found in response");
          return rejectWithValue({
            messages: "No authentication tokens received",
            status: false,
          });
        }

        // Save tokens
        await tokenManager.save(access_token, refresh_token);
        dispatch(setToken(access_token));

        // Save user data
        await AsyncStorage.setItem(
          STORAGE_KEYS.USER_DATA,
          JSON.stringify(userData)
        );
        dispatch(setUser(userData));
        dispatch(setAuthenticated(true));

        // Save login data
        const loginData: LoginData = {
          loginTime: new Date().toISOString(),
          method: "credentials",
        };
        dispatch(saveLogin(loginData));

        console.log("✅ ESS login successful");
        return { user: userData, token: access_token };
      } else {
        const errorMsg = response.messages || "Login failed";
        console.log("❌ ESS login failed:", errorMsg);
        return rejectWithValue({ messages: errorMsg, status: false });
      }
    } catch (error) {
      console.error("❌ ESS login error:", error);
      const errorMsg = error instanceof Error ? error.message : "Network error";
      return rejectWithValue({ messages: errorMsg, status: false });
    } finally {
      const { setLoading } = await import("../reducers/globalReducer");
      dispatch(setLoading(false));
    }
  }
);

export const logoutESSUser = createAsyncThunk(
  "auth/logoutESS",
  async (_, { dispatch }) => {
    try {
      const { setLoading, setToken } = await import(
        "../reducers/globalReducer"
      );
      const { clearProfile } = await import("../reducers/profileReducers");

      dispatch(setLoading(true));

      // Call logout API
      try {
        await apiClient.post(AUTH_ENDPOINTS.LOGOUT);
        console.log("📡 ESS logout API call successful");
      } catch (apiError) {
        console.warn("⚠️ ESS logout API failed, continuing with local cleanup");
      }

      // Clear local storage
      await tokenManager.clear();

      // Clear Redux state
      dispatch(setToken(null));
      dispatch(clearProfile());

      console.log("✅ ESS logout completed");
      return { success: true };
    } catch (error) {
      console.error("❌ ESS logout error:", error);
      throw error;
    } finally {
      const { setLoading } = await import("../reducers/globalReducer");
      dispatch(setLoading(false));
    }
  }
);

export const handleAuthenticationError = createAsyncThunk(
  "auth/handleAuthError",
  async (errorMessage: string, { dispatch }) => {
    try {
      console.log("🔐 Authentication error detected:", errorMessage);

      // Clear tokens and user data
      await tokenManager.clear();

      // Clear Redux auth state
      const { setToken } = await import("../reducers/globalReducer");
      const { clearProfile } = await import("../reducers/profileReducers");
      const { clearAuth } = await import("../reducers/authReducer");

      dispatch(setToken(null));
      dispatch(clearProfile());
      dispatch(clearAuth());

      console.log("🔐 Auto-logout completed due to authentication error");
      return { success: true };
    } catch (error) {
      console.error("❌ Error during auto-logout:", error);
      throw error;
    }
  }
);

export const checkESSAuthStatus = createAsyncThunk(
  "auth/checkStatus",
  async (_, { dispatch }) => {
    try {
      const { setLoading, setToken } = await import(
        "../reducers/globalReducer"
      );
      const { setUser, setAuthenticated } = await import(
        "../reducers/profileReducers"
      );

      dispatch(setLoading(true));

      const { accessToken } = await tokenManager.get();

      if (!accessToken) {
        console.log("🔍 No access token found");
        return { isAuthenticated: false };
      }

      // Check if token is expired
      if (authUtils.isTokenExpired(accessToken)) {
        console.log("🔍 Access token expired");
        await tokenManager.clear();
        dispatch(setToken(null));
        return { isAuthenticated: false };
      }

      // Get stored user data
      const userData = await AsyncStorage.getItem(STORAGE_KEYS.USER_DATA);
      if (userData) {
        const user: ESSUser = JSON.parse(userData);
        dispatch(setUser(user));
        dispatch(setAuthenticated(true));
        dispatch(setToken(accessToken));

        console.log("✅ ESS auth status: authenticated");
        return { isAuthenticated: true, user };
      }

      console.log("🔍 No user data found");
      return { isAuthenticated: false };
    } catch (error) {
      console.error("❌ ESS auth check error:", error);
      return { isAuthenticated: false };
    } finally {
      const { setLoading } = await import("../reducers/globalReducer");
      dispatch(setLoading(false));
    }
  }
);

export const refreshESSToken = createAsyncThunk(
  "auth/refreshToken",
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const { setLoading, setToken } = await import(
        "../reducers/globalReducer"
      );

      dispatch(setLoading(true));

      const { refreshToken } = await tokenManager.get();

      if (!refreshToken) {
        return rejectWithValue({
          messages: "No refresh token available",
          status: false,
        });
      }

      const response = await apiClient.post(AUTH_ENDPOINTS.REFRESH, {
        refresh_token: refreshToken,
      });

      if (response.status && response.data?.access_token) {
        const newAccessToken = response.data.access_token;
        const newRefreshToken = response.data.refresh_token || refreshToken;

        await tokenManager.save(newAccessToken, newRefreshToken);
        dispatch(setToken(newAccessToken));

        console.log("✅ ESS token refreshed successfully");
        return { token: newAccessToken };
      } else {
        return rejectWithValue({
          messages: "Token refresh failed",
          status: false,
        });
      }
    } catch (error) {
      console.error("❌ ESS token refresh error:", error);
      return rejectWithValue({
        messages: "Token refresh failed",
        status: false,
      });
    } finally {
      const { setLoading } = await import("../reducers/globalReducer");
      dispatch(setLoading(false));
    }
  }
);

// ===== PROFILE ACTIONS =====
export const fetchESSProfile = createAsyncThunk(
  "profile/fetchProfile",
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const { setLoading } = await import("../reducers/globalReducer");
      dispatch(setLoading(true));

      console.log("🔍 Fetching ESS profile...");

      // Get stored token
      const { accessToken } = await tokenManager.get();

      if (!accessToken) {
        console.log("❌ No access token found for profile fetch");
        return rejectWithValue({ messages: "No access token", status: false });
      }

      // API call to fetch profile
      const response = await apiClient.get("/employees/profile", accessToken);

      console.log("📡 ESS Profile API Response:", response);

      // FIXED: Check if response has profile data directly (not response.data)
      if (
        response &&
        (response.company || response.employee_name || response.email)
      ) {
        console.log("✅ ESS profile fetch successful");
        return response; // Return the response directly since it contains the profile data
      } else {
        const errorMsg = response.messages || "Failed to fetch profile";
        console.log("❌ ESS profile fetch failed:", errorMsg);
        return rejectWithValue({ messages: errorMsg, status: false });
      }
    } catch (error) {
      console.error("❌ ESS profile fetch error:", error);
      return rejectWithValue({
        messages:
          error instanceof Error ? error.message : "Profile fetch failed",
        status: false,
      });
    } finally {
      const { setLoading } = await import("../reducers/globalReducer");
      dispatch(setLoading(false));
    }
  }
);
