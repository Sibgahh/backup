import React, { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../../router/AppNavigator";
import { PageHeader } from "../../components/molecules";
import { NotificationCard, NotificationItem } from "../../components/molecules";
import { styles } from "./style";

type NotificationPageNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "NotificationPage"
>;

const mockNotifications: NotificationItem[] = [
  {
    id: "1",
    type: "warning",
    title: "Status update change to review",
    message:
      "Perubahan data telah berhasil dikirimkan ke HC dan akan segera...",
    timestamp: "2024-06-20T14:00:00Z",
    isRead: false,
    priority: "high",
    actionRequired: true,
    relatedTo: "timesheet",
    customIcon: "alert-circle", // Custom icon example
  },
  {
    id: "2",
    type: "success",
    title: "Profile Update Approved",
    message:
      "Your profile changes have been approved by HR. All information is now updated in the system.",
    timestamp: "2024-06-19T10:30:00Z",
    isRead: false,
    priority: "medium",
    actionRequired: false,
    relatedTo: "profile",
    iconSource:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80", // Image URL example
  },
  {
    id: "3",
    type: "info",
    title: "System Maintenance",
    message:
      "Scheduled system maintenance will occur this Saturday from 2:00 AM to 6:00 AM.",
    timestamp: "2024-06-18T08:15:00Z",
    isRead: true,
    priority: "medium",
    actionRequired: false,
    relatedTo: "system",
    // Uses default icon based on type
  },
  {
    id: "4",
    type: "error",
    title: "Document Rejected",
    message:
      "Your submitted document for ID verification has been rejected. Please check the requirements.",
    timestamp: "2024-06-17T16:45:00Z",
    isRead: false,
    priority: "high",
    actionRequired: true,
    relatedTo: "document",
    customIcon: "document-text", // Another custom icon example
  },
];

export default function NotificationPage(): React.JSX.Element {
  const navigation = useNavigation<NotificationPageNavigationProp>();
  const [notifications, setNotifications] =
    useState<NotificationItem[]>(mockNotifications);

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const handleNotificationPress = (notification: NotificationItem) => {
    // Mark as read when opened
    if (!notification.isRead) {
      handleMarkAsRead(notification.id);
    }

    // Handle different notification actions (simplified)
    console.log("Notification pressed:", notification.title);
  };

  const handleMarkAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((notification) =>
        notification.id === id
          ? { ...notification, isRead: true }
          : notification
      )
    );
  };

  const handleMarkAllAsRead = () => {
    setNotifications((prev) =>
      prev.map((notification) => ({ ...notification, isRead: true }))
    );
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "left", "right"]}>
      <StatusBar style="light" />

      <PageHeader
        title="Notification"
        onBackPress={() => navigation.goBack()}
      />

      <View style={styles.container}>
        {/* Simple Header with Today and Mark as read */}
        <View style={styles.simpleHeader}>
          <Text style={styles.todayText}>Today</Text>
          {unreadCount > 0 && (
            <TouchableOpacity onPress={handleMarkAllAsRead}>
              <Text style={styles.markAsReadText}>Mark as read</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Notifications List */}
        <ScrollView
          style={styles.notificationsList}
          showsVerticalScrollIndicator={false}
        >
          {notifications.map((notification) => (
            <NotificationCard
              key={notification.id}
              notification={notification}
              onPress={handleNotificationPress}
              onMarkAsRead={handleMarkAsRead}
            />
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
