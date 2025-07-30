import { useSelector, useDispatch } from "react-redux";
import { useCallback } from "react";
import { RootState, AppDispatch } from "../redux/store";
import {
  loginESSUser,
  logoutESSUser,
  checkESSAuthStatus,
  refreshESSToken,
  ESSLoginRequest,
  handleAuthenticationError,
} from "../redux/actions/authESS";
import { clearAuthError } from "../redux/reducers/authReducer";

export const useESSAuth = () => {
  const dispatch = useDispatch<AppDispatch>();

  // Get auth state from new auth reducer
  const {
    isAuthenticated,
    user, // This is now ESSUser
    loading,
    error,
    tokenExpiry,
    lastLoginTime,
  } = useSelector((state: RootState) => state.auth);

  // Get global loading state as fallback
  const globalLoading = useSelector(
    (state: RootState) => state.global.isLoading
  );

  const login = useCallback(
    (credentials: ESSLoginRequest) => {
      return dispatch(loginESSUser(credentials));
    },
    [dispatch]
  );

  const logout = useCallback(() => {
    return dispatch(logoutESSUser());
  }, [dispatch]);

  const checkAuthStatus = useCallback(() => {
    return dispatch(checkESSAuthStatus());
  }, [dispatch]);

  const refreshToken = useCallback(() => {
    return dispatch(refreshESSToken());
  }, [dispatch]);

  const clearError = useCallback(() => {
    dispatch(clearAuthError());
  }, [dispatch]);

  const handleAuthError = useCallback(
    (errorMessage: string) => {
      dispatch(handleAuthenticationError(errorMessage));
    },
    [dispatch]
  );

  // Check if token is near expiry
  const isTokenNearExpiry = useCallback(() => {
    if (!tokenExpiry) return false;
    const expiryTime = new Date(tokenExpiry).getTime();
    const now = Date.now();
    const fiveMinutes = 5 * 60 * 1000;
    return expiryTime - now < fiveMinutes;
  }, [tokenExpiry]);

  return {
    // State
    isAuthenticated,
    user, // ESSUser
    loading: loading || globalLoading,
    error,
    tokenExpiry,
    lastLoginTime,

    // Actions
    login,
    logout,
    checkAuthStatus,
    refreshToken,
    clearError,
    handleAuthError,
    // Utilities
    isTokenNearExpiry,
  };
};
