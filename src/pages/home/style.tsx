import { StyleSheet } from "react-native";
import Colors from "../../utils/Colors";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary.main,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
  },
  welcomeSection: {
    marginBottom: 24,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: "bold",
    color: Colors.text.primary,
    marginBottom: 8,
  },
  subtitleText: {
    fontSize: 16,
    color: Colors.text.secondary,
    lineHeight: 22,
  },
  quickMenuSection: {
    marginBottom: 24,
  },
  notificationSection: {
    marginBottom: 24,
  },
  performanceSection: {
    marginBottom: 24,
  },
  timesheetSection: {
    marginBottom: 24,
  },
});
