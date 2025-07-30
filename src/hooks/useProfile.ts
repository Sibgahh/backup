import { useSelector, useDispatch } from "react-redux";
import { useCallback } from "react";
import { RootState, AppDispatch } from "../redux/store";
import { fetchESSProfile } from "../redux/actions/authESS";

export const useProfile = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { profile, profileLoading, profileError } = useSelector(
    (state: RootState) => state.profile
  );

  const fetchProfile = useCallback(() => {
    return dispatch(fetchESSProfile());
  }, [dispatch]);

  const updateProfile = (profileData: any) => {
    // For now, just log or do nothing
    console.log("Profile update:", profileData);
    // TODO: Implement actual profile update logic when needed
  };

  return {
    // State
    profile,
    loading: profileLoading,
    error: profileError,

    // Actions
    fetchProfile,
    updateProfile,
  };
};
