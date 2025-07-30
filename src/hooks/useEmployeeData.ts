import { useSelector, useDispatch } from "react-redux";
import { useCallback } from "react";
import { RootState, AppDispatch } from "../redux/store";
import {
  fetchEmployeeSection,
  clearEmployeeData,
  clearError,
} from "../redux/reducers/employeeReducer";

export const useEmployeeData = () => {
  const dispatch = useDispatch<AppDispatch>();
  const employeeState = useSelector((state: RootState) => state.employee);

  const fetchSection = useCallback(
    (section: string) => {
      dispatch(fetchEmployeeSection(section));
    },
    [dispatch]
  );

  const clearData = useCallback(() => {
    dispatch(clearEmployeeData());
  }, [dispatch]);

  const clearErrorState = useCallback(() => {
    dispatch(clearError());
  }, [dispatch]);

  return {
    ...employeeState,
    fetchSection,
    clearData,
    clearError: clearErrorState,
  };
};
