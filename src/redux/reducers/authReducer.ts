import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  loginESSUser,
  logoutESSUser,
  checkESSAuthStatus,
  refreshESSToken,
  AuthState,
  ESSUser,
  ESSErrorResponse,
} from "../actions/authESS";

// Initial auth state
const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  loading: false,
  error: null,
  tokenExpiry: null,
  lastLoginTime: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // Manual state setters
    setAuthenticated: (state, action: PayloadAction<boolean>) => {
      state.isAuthenticated = action.payload;
    },

    setUser: (state, action: PayloadAction<ESSUser | null>) => {
      state.user = action.payload;
    },

    clearAuthError: (state) => {
      state.error = null;
    },

    setTokenExpiry: (state, action: PayloadAction<string | null>) => {
      state.tokenExpiry = action.payload;
    },

    // Clear all auth data
    clearAuth: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.error = null;
      state.tokenExpiry = null;
      state.lastLoginTime = null;
    },
  },
  extraReducers: (builder) => {
    // Login ESS User
    builder
      .addCase(loginESSUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginESSUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user; // ESSUser
        state.lastLoginTime = new Date().toISOString();
      })
      .addCase(loginESSUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as ESSErrorResponse;
      });

    // Logout ESS User
    builder.addCase(logoutESSUser.fulfilled, (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.error = null;
      state.tokenExpiry = null;
    });

    // Check ESS Auth Status
    builder.addCase(checkESSAuthStatus.fulfilled, (state, action) => {
      if (action.payload.hasSession && action.payload.user) {
        // Fix: check if user exists
        state.isAuthenticated = true;
        state.user = action.payload.user;
      }
    });

    // Refresh ESS Token
    builder
      .addCase(refreshESSToken.fulfilled, (state) => {
        // Token refreshed successfully
      })
      .addCase(refreshESSToken.rejected, (state) => {
        state.isAuthenticated = false;
        state.user = null;
      });
  },
});

export const {
  setAuthenticated,
  setUser,
  clearAuthError,
  setTokenExpiry,
  clearAuth,
} = authSlice.actions;

export default authSlice.reducer;
