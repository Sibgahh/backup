import { createSlice } from "@reduxjs/toolkit";
import { GlobalState } from "../types/global";

const initialState: GlobalState = {
  loading: false,
  error: null,
  success: null,
};

const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.success = null;
    },
    setSuccess: (state, action) => {
      state.success = action.payload;
      state.error = null;
    },
    clearError: (state) => {
      state.error = null;
    },
    clearSuccess: (state) => {
      state.success = null;
    },
    clearMessages: (state) => {
      state.error = null;
      state.success = null;
    },
  },
});

export const {
  setLoading,
  setError,
  setSuccess,
  clearError,
  clearSuccess,
  clearMessages,
} = globalSlice.actions;

export default globalSlice.reducer;
