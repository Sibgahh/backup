import { StyleSheet } from "react-native";
import Colors from "../../utils/Colors";
import Fonts from "../../utils/Fonts";

export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.primary.main,
  },

  container: {
    flex: 1,
    backgroundColor: Colors.background.default,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingTop: 16,
    marginTop: -20,
  },

  simpleHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: Colors.neutral.white,
    marginHorizontal: 16,
    borderRadius: 16,
    marginBottom: 16,
  },

  todayText: {
    ...Fonts.style.h3,
    color: Colors.neutral.black,
    fontWeight: "600",
  },

  markAsReadText: {
    ...Fonts.style.body2,
    color: Colors.primary.main,
    fontWeight: "600",
  },

  notificationsList: {
    flex: 1,
    paddingHorizontal: 16,
  },
});
