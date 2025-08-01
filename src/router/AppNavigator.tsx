import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import {
  EmployeeDataEdit,
  HistoryDetailsPage,
  HistoryPage,
  HomePage,
  LoginPage,
  ManageDataPage,
  NotificationPage,
  SettingsPage,
  SuccessPage,
} from "../pages";
import { RootState } from "../redux/store";
import type { RootStackParamList } from "../redux/types/global";
import Colors from "../utils/Colors";

// Import the type from the molecules

export type TabParamList = {
  Home: undefined;
  Settings: undefined;
};

// ===== NAVIGATORS =====
const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<TabParamList>();

// ===== BOTTOM TAB NAVIGATOR COMPONENT =====
function BottomTabNavigator(): React.JSX.Element {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap = "home";

          if (route.name === "Home") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "Settings") {
            iconName = focused ? "settings" : "settings-outline";
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: Colors.primary2,
        tabBarInactiveTintColor: "gray",
      })}
    >
      <Tab.Screen name="Home" component={HomePage} />
      <Tab.Screen name="Settings" component={SettingsPage} />
    </Tab.Navigator>
  );
}

// ===== MAIN APP NAVIGATOR =====
export default function AppNavigator(): React.JSX.Element {
  const { isAuthenticated, loading } = useSelector(
    (state: RootState) => state.auth
  );

  // Check auth status on app start
  useEffect(() => {
    console.log("🔍 AppNavigator: Checking auth status on startup...");
    // Auth status is checked in App.tsx, so we don't need to check here
  }, []);

  // Log whenever authentication state changes
  useEffect(() => {
    console.log(
      "🔄 AppNavigator: Auth state changed - isAuthenticated =",
      isAuthenticated,
      "loading =",
      loading
    );
  }, [isAuthenticated, loading]);

  console.log(
    "🧭 AppNavigator: Current state - isAuthenticated =",
    isAuthenticated,
    "loading =",
    loading
  );

  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName={isAuthenticated ? "Main" : "Login"}
    >
      {isAuthenticated ? (
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
        <Stack.Screen name="Login" component={LoginPage} />
      )}
    </Stack.Navigator>
  );
}
