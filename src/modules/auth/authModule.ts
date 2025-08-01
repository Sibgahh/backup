import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  ESSLoginRequest,
  ESSLoginResponse,
  ESSUser,
  User,
} from "../../redux/types/global";
import { authService, tokenManager } from "../../services/authService";

// ===== AUTH MODULE =====
// This module contains all the logic for authentication

// ===== ASYNC THUNKS =====
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (credentials: ESSLoginRequest, { rejectWithValue }) => {
    try {
      const response: ESSLoginResponse = await authService.login(credentials);

      if (response.status) {
        // Save access token
        await tokenManager.setToken(response.token.access_token);

        // Convert ESSUser to User format
        const user: User = {
          id: response.data.employee_id,
          name: response.data.employee_name,
          employeeId: response.data.employee_id,
          department: response.data.organization || response.data.unit,
          position: response.data.employee_position,
          email: response.data.email,
          avatar: response.data.photo_profile_ess || response.data.avatar,
        };

        return {
          user,
          essUser: response.data,
          token: response.token.access_token,
          lastLoginTime: new Date().toISOString(),
        };
      } else {
        return rejectWithValue(response.messages);
      }
    } catch (error: any) {
      return rejectWithValue(error.message || "Login failed");
    }
  }
);

export const logoutUser = createAsyncThunk(
  "auth/logoutUser",
  async (_, { rejectWithValue }) => {
    try {
      await authService.logout();
      return { success: true, message: "Logged out successfully" };
    } catch (error: any) {
      // Even if the API call fails, we consider logout successful
      // because the token is cleared in the service
      console.log(
        "⚠️ Logout API failed but local logout completed:",
        error.message
      );
      return { success: true, message: "Logged out locally" };
    }
  }
);

export const checkAuthStatus = createAsyncThunk(
  "auth/checkAuthStatus",
  async (_, { rejectWithValue }) => {
    try {
      // First check if token exists
      const token = await tokenManager.getToken();
      if (!token) {
        return rejectWithValue("No authentication token found");
      }

      const essUser: ESSUser = await authService.checkAuthStatus();

      // Convert ESSUser to User format
      const user: User = {
        id: essUser.id || essUser.employee_id,
        name: essUser.employee_name,
        employeeId: essUser.employee_id,
        department: essUser.department || essUser.organization || essUser.unit,
        position: essUser.position || essUser.employee_position,
        email: essUser.email,
        avatar: essUser.photo_profile_ess || essUser.avatar,
      };

      return {
        user,
        essUser,
        isAuthenticated: true,
      };
    } catch (error: any) {
      return rejectWithValue(error.message || "Authentication check failed");
    }
  }
);

export const refreshToken = createAsyncThunk(
  "auth/refreshToken",
  async (_, { rejectWithValue }) => {
    try {
      const { token, expiry } = await authService.refreshToken();
      await tokenManager.setToken(token);
      await tokenManager.setTokenExpiry(expiry);

      return {
        token,
        tokenExpiry: expiry,
      };
    } catch (error: any) {
      return rejectWithValue(error.message || "Token refresh failed");
    }
  }
);

// ===== MODULE EXPORT =====
export const authModule = {
  // Actions
  loginUser,
  logoutUser,
  checkAuthStatus,
  refreshToken,
};
