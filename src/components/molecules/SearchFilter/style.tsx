import { StyleSheet } from "react-native";
import Colors from "../../../utils/Colors";
import Fonts from "../../../utils/Fonts";

export const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 18,
    backgroundColor: Colors.neutral.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },

  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 16,
  },

  searchIcon: {
    marginRight: 8,
  },

  searchInput: {
    flex: 1,
    ...Fonts.style.body2,
    color: Colors.neutral.black,
    padding: 0,
  },

  filterScrollView: {
    flexGrow: 0,
  },

  filterContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },

  filterButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: "#F5F5F5",
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },

  activeFilterButton: {
    backgroundColor: "#E3F2FD",
    borderColor: "#004AAD",
  },

  checkIcon: {
    marginRight: 4,
  },

  filterText: {
    ...Fonts.style.body2,
    color: "#666666",
    fontWeight: "500",
  },

  activeFilterText: {
    color: "#004AAD",
    fontWeight: "600",
  },
});
