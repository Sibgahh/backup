import { StyleSheet } from "react-native";
import Colors from "../../utils/Colors";
import Fonts from "../../utils/Fonts";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.default,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
  },
  sectionCard: {
    backgroundColor: Colors.background.paper,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: Colors.border.light,
  },
  sectionContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  sectionInfo: {
    flex: 1,
  },
  sectionTitle: {
    ...Fonts.style.subtitle1,
    color: Colors.text.primary,
    fontWeight: "600",
    marginBottom: 4,
  },
  sectionDescription: {
    ...Fonts.style.body2,
    color: Colors.text.secondary,
  },
  arrowContainer: {
    marginLeft: 12,
  },
  arrow: {
    fontSize: 20,
    color: Colors.text.secondary,
  },
});
