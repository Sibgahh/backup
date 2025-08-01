import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducers/authReducer";
import globalReducer from "./reducers/globalReducer";
import homeReducer from "./reducers/homeReducer";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    global: globalReducer,
    home: homeReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST"],
      },
    }),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
