import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  ESSUser,
  LoginData,
  UserPreferences,
  ESSErrorResponse,
  ProfileData,
} from "../types";
import { fetchESSProfile } from "../actions/authESS";

export interface ProfileState {
  user: ESSUser | null;
  isAuthenticated: boolean;
  loginData: LoginData | null;
  preferences: UserPreferences;
  profile: ProfileData | null;
  profileLoading: boolean;
  profileError: ESSErrorResponse | null;
}

const initialState: ProfileState = {
  user: null,
  isAuthenticated: false,
  loginData: null,
  preferences: {
    language: "en",
    notifications: true,
    theme: "light",
    autoSync: true,
  },
  profile: null,
  profileLoading: false,
  profileError: null,
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    // Login Data Actions
    saveLogin: (state, action: PayloadAction<LoginData>) => {
      state.loginData = action.payload;
    },

    // User Actions
    setUser: (state, action: PayloadAction<ESSUser | null>) => {
      state.user = action.payload;
    },
    updateUserProfile: (state, action: PayloadAction<Partial<ESSUser>>) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
      }
    },

    // Authentication Actions
    setAuthenticated: (state, action: PayloadAction<boolean>) => {
      state.isAuthenticated = action.payload;
    },

    // Preferences Actions
    updatePreferences: (
      state,
      action: PayloadAction<Partial<UserPreferences>>
    ) => {
      state.preferences = { ...state.preferences, ...action.payload };
    },

    // Clear Actions
    clearProfile: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.loginData = null;
      state.profile = null;
      state.profileError = null;
    },

    // Reset to Initial State
    resetProfile: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      // Fetch Profile
      .addCase(fetchESSProfile.pending, (state) => {
        state.profileLoading = true;
        state.profileError = null;
      })
      .addCase(fetchESSProfile.fulfilled, (state, action) => {
        state.profileLoading = false;
        state.profile = action.payload;
      })
      .addCase(fetchESSProfile.rejected, (state, action) => {
        state.profileLoading = false;
        state.profileError = action.payload as ESSErrorResponse;
      });
  },
});

export const {
  saveLogin,
  setUser,
  updateUserProfile,
  setAuthenticated,
  updatePreferences,
  clearProfile,
  resetProfile,
} = profileSlice.actions;

export default profileSlice.reducer;
