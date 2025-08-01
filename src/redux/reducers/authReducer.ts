import { createSlice } from "@reduxjs/toolkit";
import {
  checkAuthStatus,
  clearAuthError,
  handleAuthenticationError,
  loginUser,
  logoutUser,
  refreshToken,
} from "../actions/authActions";
import { AuthState } from "../types/global";

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  essUser: null,
  loading: false,
  error: null,
  tokenExpiry: null,
  lastLoginTime: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // Manual state updates
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
    setUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = !!action.payload;
    },
  },
  extraReducers: (builder) => {
    // Login User
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.essUser = action.payload.essUser;
        state.lastLoginTime = action.payload.lastLoginTime;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.isAuthenticated = false;
        state.user = null;
        state.essUser = null;
      });

    // Logout User
    builder
      .addCase(logoutUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.user = null;
        state.essUser = null;
        state.error = null;
        state.tokenExpiry = null;
        state.lastLoginTime = null;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.loading = false;
        // Even if logout API call fails, we should still clear local auth state
        state.isAuthenticated = false;
        state.user = null;
        state.essUser = null;
        state.tokenExpiry = null;
        state.lastLoginTime = null;
        state.error = action.payload as string;
      });

    // Check Auth Status
    builder
      .addCase(checkAuthStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(checkAuthStatus.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = action.payload.isAuthenticated;
        state.user = action.payload.user;
        state.essUser = action.payload.essUser;
        state.error = null;
      })
      .addCase(checkAuthStatus.rejected, (state, action) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.user = null;
        state.essUser = null;
        state.error = action.payload as string;
      });

    // Refresh Token
    builder
      .addCase(refreshToken.pending, (state) => {
        state.loading = true;
      })
      .addCase(refreshToken.fulfilled, (state, action) => {
        state.loading = false;
        state.tokenExpiry = action.payload.tokenExpiry;
        state.error = null;
      })
      .addCase(refreshToken.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Clear Auth Error
    builder.addCase(clearAuthError.fulfilled, (state) => {
      state.error = null;
    });

    // Handle Authentication Error
    builder.addCase(handleAuthenticationError.fulfilled, (state, action) => {
      state.error = action.payload.error;
    });
  },
});

export const { setLoading, clearError, setUser } = authSlice.actions;
export default authSlice.reducer;
