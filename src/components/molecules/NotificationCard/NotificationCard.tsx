import React from "react";
import { Text, View, TouchableOpacity, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "./style";

// Notification types
export type NotificationType =
  | "info"
  | "success"
  | "warning"
  | "error"
  | "system";

export interface NotificationItem {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  timestamp: string;
  isRead: boolean;
  priority: "high" | "medium" | "low";
  actionRequired?: boolean;
  relatedTo?: string;
  // New properties for icon/image flexibility
  iconSource?: string | number; // URL string or local image require()
  customIcon?: string; // Custom icon name
}

interface NotificationCardProps {
  notification: NotificationItem;
  onPress: (notification: NotificationItem) => void;
  onMarkAsRead: (id: string) => void;
}

export const NotificationCard: React.FC<NotificationCardProps> = ({
  notification,
  onPress,
  onMarkAsRead,
}) => {
  const getNotificationIcon = (type: NotificationType) => {
    switch (type) {
      case "success":
        return { icon: "checkmark-circle", color: "#4CAF50" };
      case "warning":
        return { icon: "warning", color: "#FF9800" };
      case "error":
        return { icon: "close-circle", color: "#F44336" };
      case "system":
        return { icon: "settings", color: "#9C27B0" };
      default: // info
        return { icon: "information-circle", color: "#FF6B35" };
    }
  };

  // Function to format timestamp into date and time
  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);

    // Format date as "Friday, 20 Jun 2025"
    const dateString = date.toLocaleDateString("en-US", {
      weekday: "long",
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

    // Format time as "14:00"
    const timeString = date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });

    return { dateString, timeString };
  };

  const iconConfig = getNotificationIcon(notification.type);
  const { dateString, timeString } = formatTimestamp(notification.timestamp);

  // Render icon or image based on notification data
  const renderIconOrImage = () => {
    // If there's a custom image source (URL or local image)
    if (notification.iconSource) {
      const imageSource =
        typeof notification.iconSource === "string"
          ? { uri: notification.iconSource }
          : notification.iconSource;

      return (
        <Image
          source={imageSource}
          style={styles.notificationImage}
          resizeMode="cover"
        />
      );
    }

    // If there's a custom icon name
    if (notification.customIcon) {
      return (
        <Ionicons
          name={notification.customIcon as any}
          size={40}
          color={iconConfig.color}
        />
      );
    }

    // Default icon based on type
    return (
      <Ionicons
        name={iconConfig.icon as any}
        size={40}
        color={iconConfig.color}
      />
    );
  };

  return (
    <View style={styles.notificationWrapper}>
      {/* Top Header with Date and Time */}
      <View style={styles.topHeader}>
        <Text style={styles.dateText}>{dateString}</Text>
        <Text style={styles.timeText}>{timeString}</Text>
      </View>

      {/* Main Notification Content */}
      <TouchableOpacity
        style={[styles.notificationCard]}
        onPress={() => onPress(notification)}
        activeOpacity={0.7}
      >
        {/* Left Icon/Image Container - Aligned to text center */}
        <View style={styles.iconContainer}>{renderIconOrImage()}</View>

        {/* Content */}
        <View style={styles.contentContainer}>
          <Text style={styles.title}>{notification.title}</Text>

          <Text style={styles.message} numberOfLines={2}>
            {notification.message}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};
