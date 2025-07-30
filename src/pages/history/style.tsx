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
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginTop: -20,
  },

  content: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingTop: 16,
  },

  // Status Card Styles
  statusCard: {
    padding: 20,
  },

  statusHeader: {
    flexDirection: "row",
    alignItems: "center",
  },

  statusIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#F5F5F5",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 16,
  },

  statusInfo: {
    flex: 1,
  },

  statusTitle: {
    ...Fonts.style.body2,
    color: Colors.text.secondary,
    marginBottom: 8,
  },

  statusBadge: {
    alignSelf: "flex-start",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },

  statusText: {
    ...Fonts.style.caption,
    fontWeight: "600",
  },

  // Document Card Styles
  documentCard: {
    padding: 20,
  },

  documentHeader: {
    flexDirection: "row",
    alignItems: "center",
  },

  documentIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 16,
  },

  documentInfo: {
    flex: 1,
  },

  documentTitle: {
    ...Fonts.style.subtitle1,
    color: Colors.text.primary,
    fontWeight: "600",
    marginBottom: 4,
  },

  documentSubtitle: {
    ...Fonts.style.body2,
    color: Colors.text.secondary,
  },

  // Details Card Styles
  detailsCard: {
    padding: 20,
  },

  cardTitle: {
    ...Fonts.style.subtitle1,
    color: Colors.text.primary,
    fontWeight: "600",
  },

  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    paddingVertical: 12,
  },

  detailLabel: {
    ...Fonts.style.body2,
    color: Colors.text.secondary,
    flex: 1,
  },

  detailValue: {
    ...Fonts.style.body2,
    color: Colors.text.primary,
    fontWeight: "500",
    flex: 2,
    textAlign: "right",
  },

  detailDivider: {
    height: 1,
    backgroundColor: Colors.border.light,
  },

  // Action Buttons Styles
  actionContainer: {
    flexDirection: "row",
    gap: 12,
  },

  actionButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.primary.main,
    backgroundColor: Colors.background.default,
  },

  primaryActionButton: {
    backgroundColor: Colors.primary.main,
    borderColor: Colors.primary.main,
  },

  actionButtonText: {
    ...Fonts.style.body2,
    color: Colors.primary.main,
    fontWeight: "600",
    marginLeft: 8,
  },

  primaryActionButtonText: {
    color: Colors.neutral.white,
  },
});
