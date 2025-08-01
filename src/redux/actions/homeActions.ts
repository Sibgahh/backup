import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchDashboardData,
  fetchNotifications,
  fetchRecentHistory,
  fetchUserProfile,
  markNotificationAsRead,
} from "../../modules/home/homeModule";

// ===== HOME ACTIONS =====
// Re-export the module actions with consistent naming
export const getDashboardData = fetchDashboardData;
export const getNotifications = fetchNotifications;
export const getRecentHistory = fetchRecentHistory;
export const getUserProfile = fetchUserProfile;
export { markNotificationAsRead };

// Additional home-specific actions
export const homeActions = {
  clearHomeError: createAsyncThunk(
    "home/clearError",
    async (_, { dispatch }) => {
      return { cleared: true };
    }
  ),

  refreshHomeData: createAsyncThunk(
    "home/refreshData",
    async (_, { dispatch }) => {
      // Refresh all home data
      return { refreshed: true };
    }
  ),
};
