import React from "react";
import { ScrollView, Alert, RefreshControl } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../../router/AppNavigator";
import {
  UserHeader,
  QuickMenu,
  TimesheetReminder,
  PerformanceCard,
} from "../../components/molecules";
import { Gap, SectionTitle } from "../../components/atoms";
import { useESSAuth } from "../../hooks/useESSAuth"; // Use ESS Auth
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { styles } from "./style";

type HomePageNavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function HomePage(): React.JSX.Element {
  const navigation = useNavigation<HomePageNavigationProp>();
  const { user } = useSelector((state: RootState) => state.auth); // ESSUser

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
        console.log("📱 Navigating to CutiPage...");
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

  const performanceData = {
    rating: 4.5,
    progressItems: [
      {
        title: "Utilization July",
        percentage: 85,
        subtitle: "17/20 tasks completed",
      },
      {
        title: "Productivity July",
        percentage: 85,
        subtitle: "17/20 tasks completed",
      },
    ],
  };

  // Handle notification press - navigate to notification page
  const handleNotificationPress = () => {
    try {
      console.log("📱 Navigating to NotificationPage...");
      navigation.navigate("NotificationPage");
    } catch (error) {
      console.error("❌ Notification navigation error:", error);
      Alert.alert("Error", "Cannot navigate to Notifications");
    }
  };

  // Use ESSUser fields
  const displayName = user?.employee_name || "User";

  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "left", "right"]}>
      <StatusBar style="light" />
      <UserHeader
        userName={displayName || "User"} // ← Use Redux data
        avatarSource={{
          uri: "https://via.placeholder.com/150", // ← Use Redux data
        }}
        onNotificationPress={handleNotificationPress}
      />

      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Gap size={16} />
        <TimesheetReminder
          title="Don't forget to submit your timesheet today!"
          onClockIn={() => Alert.alert("Info", "Clock in feature coming soon!")}
        />

        <SectionTitle title="Menu" />

        <QuickMenu menuItems={menuItems} />

        <SectionTitle title="Achievement" />

        <PerformanceCard
          rating={performanceData.rating}
          progressItems={performanceData.progressItems}
        />
      </ScrollView>
    </SafeAreaView>
  );
}
