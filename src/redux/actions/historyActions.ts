// ESSMobile/src/redux/actions/historyActions.ts
import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiClient } from "./authESS";
import { API_ENDPOINTS } from "../api";
import { RootState } from "../store";
import { HistoryResponse } from "../types";
import { tokenManager } from "./authESS"; // Use the existing tokenManager
import { handleAuthenticationError } from "./authESS"; // Import authentication error handler

export const fetchHistoryData = createAsyncThunk<
  HistoryResponse,
  { page?: number; status?: string },
  {
    state: RootState;
    rejectValue: string;
  }
>(
  "history/fetchHistoryData",
  async (params = { page: 1, status: "" }, { dispatch, rejectWithValue }) => {
    try {
      // Get the access token
      const { accessToken } = await tokenManager.get();

      if (!accessToken) {
        // Trigger authentication error handling
        await dispatch(handleAuthenticationError("No access token"));
        return rejectWithValue("Authentication required");
      }

      const { page = 1, status = "" } = params;

      // Use the existing apiClient with token
      const response = await apiClient.get(
        `${API_ENDPOINTS.HISTORY.LIST}?page=${page}${
          status ? `&status=${status}` : ""
        }`,
        accessToken
      );

      // Validate response
      if (!response || !response.data) {
        return rejectWithValue("No data received");
      }

      return response;
    } catch (error) {
      // Handle different types of errors
      if (error instanceof Error) {
        if (
          error.message.includes("401") ||
          error.message.includes("Authentication")
        ) {
          // Trigger authentication error handling
          await dispatch(handleAuthenticationError(error.message));
          return rejectWithValue("Authentication required");
        }
        return rejectWithValue(error.message);
      }
      return rejectWithValue("An unknown error occurred");
    }
  }
);
