import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Colors, Fonts } from "../../../utils";

export type StatusType = "draft" | "in_review" | "rejected" | "success";

interface UpdateStatusProps {
  status: StatusType;
  requestId: string;
  lastEditedDate: string;
}

export const UpdateStatus: React.FC<UpdateStatusProps> = ({
  status,
  requestId,
  lastEditedDate,
}) => {
  const getStatusConfig = (status: StatusType) => {
    switch (status) {
      case "draft":
        return {
          text: "Draft",
          backgroundColor: "#E3F2FD",
          textColor: Colors.primary.main,
          fontFamily: Fonts.family.lato.bold,
        };
      case "in_review":
        return {
          text: "In Review",
          backgroundColor: "#FFF3E0",
          textColor: "#FF9800",
          fontFamily: Fonts.family.lato.bold,
        };
      case "rejected":
        return {
          text: "Rejected",
          backgroundColor: "#FFEBEE",
          textColor: Colors.status.error,
          fontFamily: Fonts.family.lato.bold,
        };
      case "success":
        return {
          text: "Approved",
          backgroundColor: "#E8F5E8",
          textColor: Colors.status.success,
          fontFamily: Fonts.family.lato.bold,
        };
      default:
        return {
          text: "Draft",
          backgroundColor: "#E3F2FD",
          textColor: Colors.primary.main,
          fontFamily: Fonts.family.lato.bold,
        };
    }
  };

  const statusConfig = getStatusConfig(status);

  return (
    <View style={styles.statusContainer}>
      <View style={styles.statusHeader}>
        <Text style={styles.statusTitle}>Update Status</Text>
        <View
          style={[
            styles.statusBadge,
            { backgroundColor: statusConfig.backgroundColor },
          ]}
        >
          <Text style={[styles.statusText, { color: statusConfig.textColor }]}>
            {statusConfig.text}
          </Text>
        </View>
      </View>
      <Text style={styles.requestId}>Request ID: {requestId}</Text>
      <View style={styles.lastEditedRow}>
        <Ionicons name="calendar-outline" size={16} color="#9E9E9E" />
        <Text style={styles.lastEditedText}>{lastEditedDate}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  statusContainer: {
    padding: 16,
    backgroundColor: Colors.background.default,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.border.light,
  },

  statusHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },

  statusTitle: {
    ...Fonts.style.subtitle1,
    color: Colors.text.primary,
    fontWeight: "600",
  },

  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },

  statusText: {
    ...Fonts.style.caption,
    fontWeight: "500",
  },

  requestId: {
    ...Fonts.style.body2,
    color: Colors.text.secondary,
    marginBottom: 8,
  },

  lastEditedRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  lastEditedText: {
    ...Fonts.style.body2,
    color: Colors.text.secondary,
    marginLeft: 6,
  },
});
