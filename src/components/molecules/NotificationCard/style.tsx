import { StyleSheet } from "react-native";
import Colors from "../../../utils/Colors";
import Fonts from "../../../utils/Fonts";

export const styles = StyleSheet.create({
  notificationWrapper: {
    backgroundColor: Colors.neutral.white,
    marginBottom: 8,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: Colors.neutral.grey200,
  },

  topHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 8,
  },

  dateText: {
    ...Fonts.style.caption,
    color: Colors.neutral.grey500,
    fontSize: 12,
    fontWeight: "400",
  },

  timeText: {
    ...Fonts.style.caption,
    color: Colors.neutral.grey500,
    fontSize: 12,
    fontWeight: "400",
  },

  notificationCard: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#F5F5F5",
  },

  unreadCard: {
    backgroundColor: "#FAFBFF",
  },

  iconContainer: {
    width: 60,
    height: 60,
    alignItems: "center",
    justifyContent: "center", // Changed to align with text start
    marginRight: 12,
    paddingTop: 2, // Small padding to align with first line of text
  },

  notificationImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },

  contentContainer: {
    flex: 1,
  },

  title: {
    ...Fonts.style.body1,
    color: Colors.neutral.black,
    fontWeight: "600",
    marginBottom: 4,
    lineHeight: 20, // Consistent line height for alignment
  },

  unreadTitle: {
    fontWeight: "700",
    color: Colors.neutral.black,
  },

  message: {
    ...Fonts.style.body2,
    color: Colors.neutral.grey700,
    lineHeight: 20,
  },
});
