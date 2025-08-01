import { StyleSheet } from "react-native";
import { Colors, Fonts } from "../../../utils";

export const styles = StyleSheet.create({
  // Notifications List
  notificationsList: {
    flex: 1,
  },

  // Empty State
  emptyState: {
    padding: 40,
  },

  emptyContent: {
    alignItems: "center",
  },

  emptyTitle: {
    ...Fonts.style.h4,
    color: Colors.text.primary,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 8,
  },

  emptySubtitle: {
    ...Fonts.style.body2,
    color: Colors.text.secondary,
    textAlign: "center",
    lineHeight: 20,
  },
});
