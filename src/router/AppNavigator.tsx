import React, { useEffect } from "react";
import { View, ActivityIndicator } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  LoginPage,
  ManageDataPage,
  EmployeeDataEdit,
  HistoryPage,
  HistoryDetailsPage,
  NotificationPage,
  SuccessPage,
} from "../pages";
import { useESSAuth } from "../hooks/useESSAuth";
import BottomTabNavigator from "./BottomTabNavigator";
import Colors from "../utils/Colors";

// Import the type from the molecules
import type { HistoryItemData } from "../components/molecules";

export type RootStackParamList = {
  Login: undefined;
  Main: undefined;
  ManageData: undefined;
  EmployeeDataEdit: undefined;
  HistoryPage: undefined;
  HistoryDetailsPage: {
    historyItem: HistoryItemData;
  };
  NotificationPage: undefined;
  SuccessPage: undefined; // Add this line
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator(): React.JSX.Element {
  const { isAuthenticated, checkAuthStatus, loading } = useESSAuth();

  // Check auth status on app start
  useEffect(() => {
    console.log("🔍 AppNavigator: Checking auth status on startup...");
    checkAuthStatus();
  }, [checkAuthStatus]);

  console.log("🧭 AppNavigator: isAuthenticated =", isAuthenticated);

  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName={isAuthenticated ? "Main" : "Login"}
    >
      {isAuthenticated ? (
        // Authenticated stack
        <>
          <Stack.Screen name="Main" component={BottomTabNavigator} />
          <Stack.Screen name="ManageData" component={ManageDataPage} />
          <Stack.Screen name="EmployeeDataEdit" component={EmployeeDataEdit} />
          <Stack.Screen name="HistoryPage" component={HistoryPage} />
          <Stack.Screen
            name="HistoryDetailsPage"
            component={HistoryDetailsPage}
          />
          <Stack.Screen name="NotificationPage" component={NotificationPage} />
          <Stack.Screen name="SuccessPage" component={SuccessPage} />
        </>
      ) : (
        // Unauthenticated stack
        <Stack.Screen name="Login" component={LoginPage} />
      )}
    </Stack.Navigator>
  );
}
