import React from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { Card, Gap } from "../../atoms";
import { styles } from "./style";

interface NotificationStatsProps {
  unreadCount: number;
  totalCount: number;
  filter: "all" | "unread";
  onFilterChange: (filter: "all" | "unread") => void;
  onMarkAllAsRead: () => void;
}

export const NotificationStats: React.FC<NotificationStatsProps> = ({
  unreadCount,
  totalCount,
  filter,
  onFilterChange,
  onMarkAllAsRead,
}) => {
  return (
    <Card style={styles.statsCard}>
      <View style={styles.statsHeader}>
        <Text style={styles.statsTitle}>
          {unreadCount > 0 ? `${unreadCount} unread` : "All caught up!"}
        </Text>
        {unreadCount > 0 && (
          <TouchableOpacity
            onPress={onMarkAllAsRead}
            style={styles.markAllButton}
          >
            <Text style={styles.markAllText}>Mark all as read</Text>
          </TouchableOpacity>
        )}
      </View>

      <Gap size={16} />

      <View style={styles.filterContainer}>
        <TouchableOpacity
          style={[styles.filterButton, filter === "all" && styles.activeFilter]}
          onPress={() => onFilterChange("all")}
        >
          <Text
            style={[
              styles.filterText,
              filter === "all" && styles.activeFilterText,
            ]}
          >
            All ({totalCount})
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.filterButton,
            filter === "unread" && styles.activeFilter,
          ]}
          onPress={() => onFilterChange("unread")}
        >
          <Text
            style={[
              styles.filterText,
              filter === "unread" && styles.activeFilterText,
            ]}
          >
            Unread ({unreadCount})
          </Text>
        </TouchableOpacity>
      </View>
    </Card>
  );
};
