import { StyleSheet } from "react-native";
import Colors from "../../../utils/Colors";
import Fonts from "../../../utils/Fonts";

export const styles = StyleSheet.create({
  // History Item Styles
  historyItem: {
    backgroundColor: Colors.background.default,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.border.light,
    padding: 16,
  },

  historyItemHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },

  historyDate: {
    ...Fonts.style.body2,
    color: Colors.text.secondary,
  },

  historyTime: {
    ...Fonts.style.body2,
    color: Colors.text.secondary,
  },

  historyItemContent: {
    flexDirection: "row",
    alignItems: "center",
  },

  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },

  historyItemInfo: {
    flex: 1,
    marginRight: 12,
  },

  historyItemTitle: {
    fontFamily: Fonts.family.lato.bold,
    color: Colors.text.primary,
    fontSize: 16,
    marginBottom: 4,
  },

  historyItemDescription: {
    ...Fonts.style.body2,
    color: Colors.text.secondary,
    lineHeight: 20,
  },

  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 2,
    borderRadius: 12,
    alignSelf: "center",
  },

  statusBadgeText: {
    fontFamily: Fonts.family.lato.bold,
    fontSize: 12,
    fontWeight: "500",
    color: Colors.text.primary,
  },
});
