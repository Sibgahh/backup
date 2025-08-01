import { createAsyncThunk } from "@reduxjs/toolkit";
import { authModule } from "../../modules/auth/authModule";

// ===== AUTH ACTIONS =====
// Re-export the module actions
export const { loginUser, logoutUser, checkAuthStatus, refreshToken } =
  authModule;

// Additional auth-specific actions
export const clearAuthError = createAsyncThunk(
  "auth/clearError",
  async (_, { dispatch }) => {
    return { cleared: true };
  }
);

export const handleAuthenticationError = createAsyncThunk(
  "auth/handleError",
  async (errorMessage: string, { dispatch }) => {
    // Handle authentication errors
    return { error: errorMessage };
  }
);
