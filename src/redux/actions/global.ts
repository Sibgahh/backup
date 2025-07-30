import { createAsyncThunk } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AppTheme, AppLanguage } from "../types";
// ===== ASYNC THUNKS =====
export const initializeApp = createAsyncThunk(
  "global/initialize",
  async (_, { dispatch }) => {
    try {
      const {
        setLoading,
        setTheme,
        setLanguage,
        setInitialized,
        showMessageError,
      } = await import("../reducers/globalReducer");

      dispatch(setLoading(true));

      // Load saved settings
      const savedTheme = await AsyncStorage.getItem("app_theme");
      const savedLanguage = await AsyncStorage.getItem("app_language");

      if (savedTheme) {
        dispatch(setTheme(savedTheme as AppTheme));
      }

      if (savedLanguage) {
        dispatch(setLanguage(savedLanguage as AppLanguage));
      }

      dispatch(setInitialized(true));

      return { initialized: true };
    } catch (error) {
      console.error("App initialization error:", error);
      const { showMessageError } = await import("../reducers/globalReducer");
      dispatch(
        showMessageError({
          message: "Failed to initialize app",
          visible: true,
        })
      );
      throw error;
    } finally {
      const { setLoading } = await import("../reducers/globalReducer");
      dispatch(setLoading(false));
    }
  }
);

export const saveAppSettings = createAsyncThunk(
  "global/saveSettings",
  async (
    settings: { theme?: AppTheme; language?: AppLanguage },
    { dispatch }
  ) => {
    try {
      const { setTheme, setLanguage, showToast, showMessageError } =
        await import("../reducers/globalReducer");

      if (settings.theme) {
        await AsyncStorage.setItem("app_theme", settings.theme);
        dispatch(setTheme(settings.theme));
      }

      if (settings.language) {
        await AsyncStorage.setItem("app_language", settings.language);
        dispatch(setLanguage(settings.language));
      }

      dispatch(
        showToast({
          message: "Settings saved successfully",
          type: "success",
          visible: true,
          duration: 2000,
        })
      );
    } catch (error) {
      const { showMessageError } = await import("../reducers/globalReducer");
      dispatch(
        showMessageError({
          message: "Failed to save settings",
          visible: true,
        })
      );
    }
  }
);

// ===== GLOBAL ERROR HANDLER =====
export const handleGlobalError = createAsyncThunk(
  "global/handleError",
  async (
    error: {
      message: string;
      code?: string;
      type?: "network" | "auth" | "system" | "validation";
    },
    { dispatch }
  ) => {
    const { setLoading, showMessageError, messageErrorLogin, showToast } =
      await import("../reducers/globalReducer");

    dispatch(setLoading(false)); // Always stop loading on error

    switch (error.type) {
      case "network":
        dispatch(
          showMessageError({
            message: "Network error. Please check your connection.",
            visible: true,
          })
        );
        break;
      case "auth":
        dispatch(messageErrorLogin(error.message));
        break;
      case "validation":
        dispatch(
          showToast({
            message: error.message,
            type: "error",
            visible: true,
            duration: 3000,
          })
        );
        break;
      default:
        dispatch(
          showMessageError({
            message: error.message || "An unexpected error occurred",
            visible: true,
          })
        );
    }
  }
);
