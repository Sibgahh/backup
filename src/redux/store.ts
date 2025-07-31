import { configureStore } from "@reduxjs/toolkit";
import globalReducer from "./reducers/globalReducer";
import profileReducer from "./reducers/profileReducers";
import authReducer from "./reducers/authReducer";
import employeeReducer from "./reducers/employeeReducer";
import historyReducer from "./reducers/historyReducer";

export const store = configureStore({
  reducer: {
    global: globalReducer,
    profile: profileReducer,
    auth: authReducer,
    employee: employeeReducer,
    history: historyReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Only export what you actually use
export { setLoading, setToken } from "./reducers/globalReducer";
export {
  loginESSUser,
  logoutESSUser,
  checkESSAuthStatus,
} from "./actions/authESS";
export {
  fetchEmployeeSection,
  clearEmployeeData,
  clearError,
} from "./reducers/employeeReducer";

export { fetchHistoryData } from "./actions/historyActions";
export { resetHistoryState } from "./reducers/historyReducer";
