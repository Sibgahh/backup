import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppTheme, AppLanguage } from "../types";

export interface ToastMessage {
  message: string;
  type: "success" | "error" | "warning" | "info";
  visible: boolean;
  duration?: number;
}

export interface ErrorMessage {
  message: string;
  visible: boolean;
}

export interface GlobalState {
  isLoading: boolean;
  token: string | null;
  theme: AppTheme;
  language: AppLanguage;
  isInitialized: boolean;
  toast: ToastMessage;
  errorMessage: ErrorMessage;
  loginErrorMessage: string;
}

const initialState: GlobalState = {
  isLoading: false,
  token: null,
  theme: "light",
  language: "en",
  isInitialized: false,
  toast: {
    message: "",
    type: "info",
    visible: false,
    duration: 3000,
  },
  errorMessage: {
    message: "",
    visible: false,
  },
  loginErrorMessage: "",
};

const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setToken: (state, action: PayloadAction<string | null>) => {
      state.token = action.payload;
    },
    setTheme: (state, action: PayloadAction<AppTheme>) => {
      state.theme = action.payload;
    },
    setLanguage: (state, action: PayloadAction<AppLanguage>) => {
      state.language = action.payload;
    },
    setInitialized: (state, action: PayloadAction<boolean>) => {
      state.isInitialized = action.payload;
    },
    showToast: (state, action: PayloadAction<ToastMessage>) => {
      state.toast = { ...state.toast, ...action.payload };
    },
    hideToast: (state) => {
      state.toast.visible = false;
    },
    showMessageError: (state, action: PayloadAction<ErrorMessage>) => {
      state.errorMessage = action.payload;
    },
    hideMessageError: (state) => {
      state.errorMessage.visible = false;
    },
    messageErrorLogin: (state, action: PayloadAction<string>) => {
      state.loginErrorMessage = action.payload;
    },
    clearLoginError: (state) => {
      state.loginErrorMessage = "";
    },
  },
});

export const {
  setLoading,
  setToken,
  setTheme,
  setLanguage,
  setInitialized,
  showToast,
  hideToast,
  showMessageError,
  hideMessageError,
  messageErrorLogin,
  clearLoginError,
} = globalSlice.actions;

export default globalSlice.reducer;
