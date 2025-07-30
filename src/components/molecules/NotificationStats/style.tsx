import { StyleSheet } from "react-native";
import Colors from "../../../utils/Colors";
import Fonts from "../../../utils/Fonts";

export const styles = StyleSheet.create({
  // Stats Card
  statsCard: {
    padding: 20,
  },

  statsHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  statsTitle: {
    ...Fonts.style.h4,
    color: Colors.text.primary,
    fontWeight: "600",
  },

  markAllButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    backgroundColor: Colors.primary.main,
  },

  markAllText: {
    ...Fonts.style.caption,
    color: Colors.neutral.white,
    fontWeight: "600",
  },

  // Filter styles
  filterContainer: {
    flexDirection: "row",
    gap: 12,
  },

  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: Colors.background.default,
    borderWidth: 1,
    borderColor: Colors.border.light,
  },

  activeFilter: {
    backgroundColor: Colors.primary.main,
    borderColor: Colors.primary.main,
  },

  filterText: {
    ...Fonts.style.body2,
    color: Colors.text.secondary,
    fontWeight: "500",
  },

  activeFilterText: {
    color: Colors.neutral.white,
  },
});
