import React from "react";
import { Text, View, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Card, Gap } from "../../atoms";
import { NotificationCard, NotificationItem } from "../NotificationCard";
import { styles } from "./style";

interface NotificationListProps {
  notifications: NotificationItem[];
  filter: "all" | "unread";
  onNotificationPress: (notification: NotificationItem) => void;
  onMarkAsRead: (id: string) => void;
}

export const NotificationList: React.FC<NotificationListProps> = ({
  notifications,
  filter,
  onNotificationPress,
  onMarkAsRead,
}) => {
  const filteredNotifications =
    filter === "unread"
      ? notifications.filter((n) => !n.isRead)
      : notifications;

  const EmptyState = () => (
    <Card style={styles.emptyState}>
      <View style={styles.emptyContent}>
        <Ionicons name="notifications-off" size={48} color="#9E9E9E" />
        <Gap size={16} />
        <Text style={styles.emptyTitle}>
          {filter === "unread" ? "No unread notifications" : "No notifications"}
        </Text>
        <Text style={styles.emptySubtitle}>
          {filter === "unread"
            ? "All your notifications have been read"
            : "You're all caught up! New notifications will appear here."}
        </Text>
      </View>
    </Card>
  );

  return (
    <ScrollView
      style={styles.notificationsList}
      showsVerticalScrollIndicator={false}
    >
      {filteredNotifications.length > 0 ? (
        filteredNotifications.map((notification) => (
          <View key={notification.id}>
            <NotificationCard
              notification={notification}
              onPress={onNotificationPress}
              onMarkAsRead={onMarkAsRead}
            />
            <Gap size={12} />
          </View>
        ))
      ) : (
        <EmptyState />
      )}

      <Gap size={40} />
    </ScrollView>
  );
};
