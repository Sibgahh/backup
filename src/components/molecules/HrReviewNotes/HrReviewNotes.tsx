import React from "react";
import { Text, View, ViewStyle, StyleSheet } from "react-native";
import { Colors, Fonts } from "../../../utils";

interface HrReviewNotesProps {
  title?: string;
  message: string;
  reviewerName?: string;
  timestamp?: string;
  style?: ViewStyle;
}

export const HrReviewNotes: React.FC<HrReviewNotesProps> = ({
  title = "HR Review Notes",
  message,
  reviewerName = "(HC Name)",
  timestamp = "2 hours ago",
  style,
}) => {
  return (
    <View style={[styles.container, style]}>
      {/* Title */}
      <Text style={styles.title}>{title}</Text>

      {/* Content Card */}
      <View style={styles.card}>
        {/* Orange-yellow vertical bar */}
        <View style={styles.verticalBar} />

        {/* Content */}
        <View style={styles.content}>
          <Text style={styles.message}>{message}</Text>
          <Text style={styles.reviewerInfo}>
            Reviewed by: {reviewerName} • {timestamp}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingHorizontal: 8,
  },
  title: {
    fontFamily: Fonts.family.lato.bold,
    fontSize: 16,
    lineHeight: 24,
    color: Colors.designSystem.grey[900],
    marginBottom: 16,
  },
  card: {
    backgroundColor: Colors.designSystem.warningOrange[100], // Light beige color
    borderRadius: 12,
    flexDirection: "row" as const,
    overflow: "hidden" as const,
  },
  verticalBar: {
    width: 6,
    backgroundColor: Colors.designSystem.warningOrange[500], // Orange-yellow color
    borderRadius: 3,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  message: {
    ...Fonts.style.body2,
    color: Colors.neutral.grey700,
    marginBottom: 8,
    lineHeight: 20,
  },
  reviewerInfo: {
    ...Fonts.style.caption,
    color: Colors.neutral.grey500,
    fontSize: 12,
  },
});
