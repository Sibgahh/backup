// ESSMobile/src/components/molecules/HistoryItem/HistoryItem.tsx
import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { HistoryItemData } from "../index";
import { styles } from "./style";
import Colors from "../../../utils/Colors";

export const HistoryItem: React.FC<{
  item: HistoryItemData;
  onPress?: (item: HistoryItemData) => void;
}> = ({ item, onPress }) => {
  // Get icon configuration based on status
  const getStatusIconConfig = (status: string) => {
    switch (status) {
      case "draft":
        return {
          name: "document-outline",
          backgroundColor: Colors.designSystem.primaryBlue[500],
          iconColor: "white",
        };
      case "waiting_approval":
        return {
          name: "time-outline",
          backgroundColor: Colors.designSystem.primaryBlue[500],
          iconColor: "white",
        };
      case "success":
      case "approved":
        return {
          name: "checkmark-circle-outline",
          backgroundColor: Colors.success,
          iconColor: "white",
        };
      case "rejected":
        return {
          name: "close-circle-outline",
          backgroundColor: Colors.error,
          iconColor: "white",
        };
      default:
        return {
          name: "document-outline",
          backgroundColor: Colors.primary.light,
          iconColor: "white",
        };
    }
  };

  const iconConfig = getStatusIconConfig(item.status);

  const handlePress = () => {
    onPress?.(item);
  };

  const ContentComponent = onPress ? TouchableOpacity : View;

  return (
    <ContentComponent
      style={styles.historyItem}
      onPress={onPress ? handlePress : undefined}
      activeOpacity={onPress ? 0.7 : 1}
    >
      <View style={styles.historyItemHeader}>
        <Text style={styles.historyDate}>{item.date}</Text>
        <View
          style={[
            styles.statusBadge,
            {
              backgroundColor:
                item.status === "success" || item.status === "approved"
                  ? Colors.success2
                  : item.status === "rejected"
                  ? Colors.designSystem.errorRed[200]
                  : Colors.designSystem.primaryBlue[50],
            },
          ]}
        >
          <Text
            style={[
              styles.statusBadgeText,
              {
                color:
                  item.status === "success" || item.status === "approved"
                    ? Colors.success
                    : item.status === "rejected"
                    ? Colors.designSystem.errorRed[500]
                    : Colors.designSystem.primaryBlue[500],
              },
            ]}
          >
            {item.status.replace("_", " ")}
          </Text>
        </View>
      </View>

      <View style={styles.historyItemContent}>
        <View
          style={[
            styles.iconContainer,
            { backgroundColor: iconConfig.backgroundColor },
          ]}
        >
          <Ionicons
            name={iconConfig.name as any}
            size={24}
            color={iconConfig.iconColor}
          />
        </View>

        <View style={styles.historyItemInfo}>
          <Text style={styles.historyItemTitle}>{item.title}</Text>
          <Text style={styles.historyItemDescription}>{item.description}</Text>
        </View>
      </View>
    </ContentComponent>
  );
};
