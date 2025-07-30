import { StyleSheet, Dimensions } from "react-native";
import Colors from "../../utils/Colors";
export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.primary.main, // Header color extends to status bar
  },

  container: {
    flex: 1,
    backgroundColor: Colors.background.default,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginTop: -20, // Slight overlap to ensure smooth transition
  },

  scrollContent: {
    paddingBottom: 22,
  },
});
