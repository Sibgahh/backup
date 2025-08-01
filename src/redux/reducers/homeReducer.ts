import { createSlice } from "@reduxjs/toolkit";
import {
  getDashboardData,
  getNotifications,
  getRecentHistory,
  getUserProfile,
  markNotificationAsRead,
} from "../actions/homeActions";
import { HomeState } from "../types/global";

const initialState: HomeState = {
  dashboardData: null,
  notifications: [],
  recentHistory: [],
  userProfile: null,
  loading: {
    dashboard: false,
    notifications: false,
    recentHistory: false,
    userProfile: false,
  },
  error: null,
};

const homeSlice = createSlice({
  name: "home",
  initialState,
  reducers: {
    // Manual state updates
    setDashboardData: (state, action) => {
      state.dashboardData = action.payload;
    },
    setNotifications: (state, action) => {
      state.notifications = action.payload;
    },
    setRecentHistory: (state, action) => {
      state.recentHistory = action.payload;
    },
    setUserProfile: (state, action) => {
      state.userProfile = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = { ...state.loading, ...action.payload };
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Dashboard Data
      .addCase(getDashboardData.pending, (state) => {
        state.loading.dashboard = true;
        state.error = null;
      })
      .addCase(getDashboardData.fulfilled, (state, action) => {
        state.loading.dashboard = false;
        state.dashboardData = action.payload;
        state.error = null;
      })
      .addCase(getDashboardData.rejected, (state, action) => {
        state.loading.dashboard = false;
        state.error = action.payload as string;
      })
      // Notifications
      .addCase(getNotifications.pending, (state) => {
        state.loading.notifications = true;
        state.error = null;
      })
      .addCase(getNotifications.fulfilled, (state, action) => {
        state.loading.notifications = false;
        state.notifications = action.payload;
        state.error = null;
      })
      .addCase(getNotifications.rejected, (state, action) => {
        state.loading.notifications = false;
        state.error = action.payload as string;
      })
      // Recent History
      .addCase(getRecentHistory.pending, (state) => {
        state.loading.recentHistory = true;
        state.error = null;
      })
      .addCase(getRecentHistory.fulfilled, (state, action) => {
        state.loading.recentHistory = false;
        state.recentHistory = action.payload;
        state.error = null;
      })
      .addCase(getRecentHistory.rejected, (state, action) => {
        state.loading.recentHistory = false;
        state.error = action.payload as string;
      })
      // User Profile
      .addCase(getUserProfile.pending, (state) => {
        state.loading.userProfile = true;
        state.error = null;
      })
      .addCase(getUserProfile.fulfilled, (state, action) => {
        state.loading.userProfile = false;
        state.userProfile = action.payload;
        state.error = null;
      })
      .addCase(getUserProfile.rejected, (state, action) => {
        state.loading.userProfile = false;
        state.error = action.payload as string;
      })
      // Mark Notification as Read
      .addCase(markNotificationAsRead.fulfilled, (state, action) => {
        const { notificationId } = action.payload;
        state.notifications = state.notifications.map((notification) =>
          notification.id === notificationId
            ? { ...notification, isRead: true }
            : notification
        );
      });
  },
});

export const {
  setDashboardData,
  setNotifications,
  setRecentHistory,
  setUserProfile,
  setLoading,
  setError,
  clearError,
} = homeSlice.actions;

export default homeSlice.reducer;
