// ESSMobile/src/redux/reducers/historyReducer.ts
import { createSlice } from "@reduxjs/toolkit";
import { fetchHistoryData } from "../actions/historyActions";
import { HistoryResponse } from "../types";

// Define the state interface
export interface HistoryState extends HistoryResponse {
  loading: boolean;
  error: string | null;
}

// Initial state
const initialState: HistoryState = {
  data: [],
  status_summary: {
    approved: 0,
    rejected: 0,
    draft: 0,
    waiting_approval: 0,
  },
  loading: false,
  error: null,
};

const historySlice = createSlice({
  name: "history",
  initialState,
  reducers: {
    resetHistoryState: (state) => {
      state.data = [];
      state.status_summary = {
        approved: 0,
        rejected: 0,
        draft: 0,
        waiting_approval: 0,
      };
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchHistoryData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchHistoryData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data;
        state.status_summary = action.payload.status_summary;
      })
      .addCase(fetchHistoryData.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || "Failed to fetch history";
      });
  },
});

export const { resetHistoryState } = historySlice.actions;
export default historySlice.reducer;
