import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import { Alert, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import { Gap, SectionTitle } from "../../components/atoms";
import {
  PerformanceCard,
  QuickMenu,
  TimesheetReminder,
  UserHeader,
} from "../../components/molecules";
import { homeModule } from "../../modules/home/homeModule";
import { RootState } from "../../redux/store";
import type { RootStackParamList } from "../../redux/types/global";
import { styles } from "./style";

type HomePageNavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function HomePage(): React.JSX.Element {
  const navigation = useNavigation<HomePageNavigationProp>();
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.auth);

  // Use the new home module
  const {
    dashboardData,
    notifications,
    recentHistory,
    userProfile,
    loading,
    error,
    fetchDashboardData,
    fetchNotifications,
    fetchRecentHistory,
    fetchUserProfile,
    markNotificationAsRead,
  } = homeModule;

  // Fetch data on component mount
  useEffect(() => {
    fetchDashboardData();
    fetchNotifications();
    fetchRecentHistory();
    fetchUserProfile();
  }, []);

  const userData = userProfile
    ? {
        name: userProfile.employee_name || "Unknown User",
        email: userProfile.email || "No email",
        avatar: userProfile.photo_profile_ess || userProfile.avatar || null,
        workInfo: {
          company: userProfile.company || "N/A",
          companyAddress: userProfile.company_address || "N/A",
          email: userProfile.email || "N/A",
          phoneNumber: userProfile.phone_number
            ? String(userProfile.phone_number)
            : "N/A",
        },
      }
    : {
        name: loading.userProfile
          ? "Loading..."
          : error
          ? "Error loading profile"
          : "No profile data",
        email: loading.userProfile
          ? "Loading..."
          : error
          ? "Please try again"
          : "No email",
        avatar: null,
        workInfo: {
          company: loading.userProfile ? "Loading..." : "N/A",
          companyAddress: loading.userProfile ? "Loading..." : "N/A",
          email: loading.userProfile ? "Loading..." : "N/A",
          phoneNumber: loading.userProfile ? "Loading..." : "N/A",
          division: "",
          position: "",
          startDate: "",
          businessUnit: "",
          directSPV: "",
        },
      };

  const menuItems = [
    {
      id: "1",
      title: "Manage Data",
      icon: require("../../assets/icon/menu1.png"),
      onPress: () => {
        try {
          console.log("📱 Navigating to ManageData...");
          navigation.navigate("ManageData");
        } catch (error) {
          console.error("❌ Navigation error:", error);
          Alert.alert("Error", "Cannot navigate to Manage Data");
        }
      },
    },
    {
      id: "2",
      title: "Cuti",
      icon: require("../../assets/icon/menu2.png"),
      onPress: () => {
        console.log(" Navigating to CutiPage...");
      },
    },
    {
      id: "3",
      title: "Timesheet",
      icon: require("../../assets/icon/menu3.png"),
      onPress: () => {
        Alert.alert("Info", "Timesheet feature coming soon!");
      },
    },
  ];

  const handleNotificationPress = () => {
    try {
      console.log("📱 Navigating to NotificationPage...");
      navigation.navigate("NotificationPage");
    } catch (error) {
      console.error("❌ Navigation error:", error);
      Alert.alert("Error", "Cannot navigate to Notifications");
    }
  };

  const handleHistoryPress = () => {
    try {
      console.log("📱 Navigating to HistoryPage...");
      navigation.navigate("HistoryPage");
    } catch (error) {
      console.error("❌ Navigation error:", error);
      Alert.alert("Error", "Cannot navigate to History");
    }
  };

  const handleSettingsPress = () => {
    try {
      console.log("📱 Navigating to SettingsPage...");
      navigation.navigate("SettingsPage");
    } catch (error) {
      console.error("❌ Navigation error:", error);
      Alert.alert("Error", "Cannot navigate to Settings");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
      >
        <UserHeader
          userName={userData.name}
          avatarSource={userData.avatar}
          onNotificationPress={handleNotificationPress}
        />
        <Gap size={24} />

        <SectionTitle title="Welcome back!" />
        <Gap size={16} />

        <PerformanceCard
          rating={4.5}
          progressItems={[
            {
              title: "Task Completion",
              percentage: 85,
              subtitle: "85% of tasks completed",
            },
            {
              title: "Time Management",
              percentage: 92,
              subtitle: "92% efficiency",
            },
          ]}
        />
        <Gap size={24} />

        <SectionTitle title="Quick Menu" />
        <Gap size={16} />

        <QuickMenu menuItems={menuItems} />
        <Gap size={24} />

        <SectionTitle title="Recent Activity" />
        <Gap size={16} />

        <TimesheetReminder
          title="Don't forget to clock in today!"
          onClockIn={handleHistoryPress}
        />
        <Gap size={24} />
      </ScrollView>
    </SafeAreaView>
  );
}
