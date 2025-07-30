import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../../../utils/Colors";
import { styles } from "./style";
import Fonts from "@/utils/Fonts";

export type HistoryStatus =
  | "draft"
  | "rejected"
  | "success"
  | "waiting_approval";
export type DocumentType = "education" | "employee" | "medical" | "contact";

export interface HistoryItemData {
  id: string;
  documentType: DocumentType;
  title: string;
  description: string;
  status: HistoryStatus;
  date: string;
  time: string;
}

interface HistoryItemProps {
  item: HistoryItemData;
  onPress?: (item: HistoryItemData) => void;
}

export const HistoryItem: React.FC<HistoryItemProps> = ({ item, onPress }) => {
  const getStatusConfig = (status: HistoryStatus) => {
    switch (status) {
      case "success":
        return {
          text: "Success",
          backgroundColor: "#E8F5E8",
          textColor: Colors.status.success,
        };
      case "draft":
        return {
          text: "Draft",
          backgroundColor: "#E3F2FD",
          textColor: Colors.primary.main,
        };
      case "waiting_approval":
        return {
          text: "Waiting approval",
          backgroundColor: "#E3F2FD",
          textColor: Colors.primary.main,
          fontFamily: Fonts.family.lato.bold,
        };
      case "rejected":
        return {
          text: "Rejected",
          backgroundColor: "#FFEBEE",
          textColor: Colors.status.error,
        };
    }
  };

  const getDocumentIcon = (documentType: DocumentType) => {
    switch (documentType) {
      case "education":
        return {
          name: "refresh" as const,
          backgroundColor: Colors.primary.main,
          iconColor: "white",
        };
      case "employee":
        return {
          name: "close" as const,
          backgroundColor: Colors.status.error,
          iconColor: "white",
        };
      case "medical":
        return {
          name: "checkmark" as const,
          backgroundColor: Colors.status.success,
          iconColor: "white",
        };
      case "contact":
        return {
          name: "document-text" as const,
          backgroundColor: Colors.primary.main,
          iconColor: "white",
        };
    }
  };

  const statusConfig = getStatusConfig(item.status);
  const iconConfig = getDocumentIcon(item.documentType);

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
        <Text style={styles.historyTime}>{item.time}</Text>
      </View>

      <View style={styles.historyItemContent}>
        <View
          style={[
            styles.iconContainer,
            { backgroundColor: iconConfig.backgroundColor },
          ]}
        >
          <Ionicons
            name={iconConfig.name}
            size={24}
            color={iconConfig.iconColor}
          />
        </View>

        <View style={styles.historyItemInfo}>
          <Text style={styles.historyItemTitle}>{item.title}</Text>
          <Text style={styles.historyItemDescription}>{item.description}</Text>
        </View>

        <View
          style={[
            styles.statusBadge,
            { backgroundColor: statusConfig.backgroundColor },
          ]}
        >
          <Text
            style={[styles.statusBadgeText, { color: statusConfig.textColor }]}
          >
            {statusConfig.text}
          </Text>
        </View>
      </View>
    </ContentComponent>
  );
};
