import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  DashboardData,
  HistoryItemData,
  NotificationItem,
  ProfileData,
} from "../../redux/types/global";
import { homeService } from "../../services/homeService";

// ===== HOME MODULE =====
// This module contains all the logic for the HomePage

// ===== ASYNC THUNKS =====
export const fetchDashboardData = createAsyncThunk(
  "home/fetchDashboardData",
  async (_, { rejectWithValue }) => {
    try {
      const data = await homeService.getDashboardData();
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const fetchNotifications = createAsyncThunk(
  "home/fetchNotifications",
  async (_, { rejectWithValue }) => {
    try {
      const data = await homeService.getNotifications();
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const fetchRecentHistory = createAsyncThunk(
  "home/fetchRecentHistory",
  async (_, { rejectWithValue }) => {
    try {
      const data = await homeService.getRecentHistory();
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const fetchUserProfile = createAsyncThunk(
  "home/fetchUserProfile",
  async (_, { rejectWithValue }) => {
    try {
      const data = await homeService.getUserProfile();
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const markNotificationAsRead = createAsyncThunk(
  "home/markNotificationAsRead",
  async (notificationId: string, { rejectWithValue }) => {
    try {
      const data = await homeService.markNotificationAsRead(notificationId);
      return { notificationId, data };
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// ===== MODULE EXPORT =====
export const homeModule = {
  // Data
  dashboardData: null as DashboardData | null,
  notifications: [] as NotificationItem[],
  recentHistory: [] as HistoryItemData[],
  userProfile: null as ProfileData | null,

  // Loading states
  loading: {
    dashboard: false,
    notifications: false,
    recentHistory: false,
    userProfile: false,
  },

  // Error state
  error: null as string | null,

  // Actions
  fetchDashboardData,
  fetchNotifications,
  fetchRecentHistory,
  fetchUserProfile,
  markNotificationAsRead,
};
