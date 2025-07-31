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
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginTop: -20,
  },

  content: {
    flex: 1,
    paddingHorizontal: 16,
  },

  // Status Card Styles
  statusCard: {},

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

  contentContainer: {
    padding: 16,
  },

  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 16,
  },
  button: {
    padding: 10,
    backgroundColor: "#007AFF",
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
  },

  navigationContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16,
  },
  navigationButton: {
    padding: 10,
    backgroundColor: "#4CAF50",
    borderRadius: 5,
  },
  navigationButtonText: {
    color: "white",
    textAlign: "center",
  },

  // Details Card Styles
  detailsCard: {
    padding: 20,
  },

  cardTitle: {
    ...Fonts.style.body1,
    color: Colors.text.primary,
    fontFamily: Fonts.family.lato.bold,
  },

  detailRow: {
    flexDirection: "row",
    alignItems: "flex-start",
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
  infoCard: {
    paddingHorizontal: 20,
  },

  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
  },

  infoLabel: {
    ...Fonts.style.body1,
    fontFamily: Fonts.family.lato.bold,
    color: Colors.text.primary,
    flex: 1,
  },

  infoValue: {
    ...Fonts.style.body1,
    color: Colors.text.secondary,
    fontWeight: "500",
    textAlign: "right",
    flex: 1,
  },

  // Progress Card Styles
  progressCard: {
    paddingHorizontal: 20,
  },

  progressContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  stepContainer: {
    flex: 1,
    alignItems: "center",
    position: "relative",
    justifyContent: "space-between",
  },

  stepIndicator: {
    alignItems: "center",
  },

  stepCircle: {
    width: 62,
    height: 62,
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
  },

  stepCircleCompleted: {
    backgroundColor: "#4CAF50",
  },

  stepCircleCurrent: {
    backgroundColor: "#004AAD",
  },

  stepCirclePending: {
    backgroundColor: "#F5F5F5",
    borderWidth: 2,
    borderColor: "#E0E0E0",
  },

  stepLabel: {
    ...Fonts.style.caption,
    color: Colors.text.secondary,
    textAlign: "center",
  },

  stepLabelCompleted: {
    color: Colors.text.primary,
    fontWeight: "500",
  },

  stepConnector: {
    position: "absolute",
    top: 16,
    left: "50%",
    right: "-50%",
    height: 2,
    backgroundColor: "#E0E0E0",
    zIndex: -1,
  },

  stepConnectorCompleted: {
    backgroundColor: "#4CAF50",
  },

  // Changes Card Styles
  changesCard: {
    padding: 20,
  },

  changeItem: {
    paddingVertical: 12,
  },

  changeHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  changeField: {
    ...Fonts.style.body1,
    color: Colors.text.primary,
    fontWeight: "600",
  },

  changeStatusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },

  changeStatusText: {
    ...Fonts.style.caption,
    color: "#FFFFFF",
    fontWeight: "600",
  },

  changeValues: {
    marginTop: 8,
  },

  changeValueItem: {
    flexDirection: "row",
    marginBottom: 4,
  },

  changeValueLabel: {
    ...Fonts.style.body2,
    color: Colors.text.secondary,
    width: 60,
  },

  changeValueText: {
    ...Fonts.style.body2,
    color: Colors.text.primary,
    flex: 1,
  },

  changeValueAfter: {
    color: "#4CAF50",
    fontWeight: "500",
  },

  changeDivider: {
    height: 1,
    backgroundColor: Colors.border.light,
    marginTop: 12,
  },

  // Reason Card Styles
  reasonCard: {
    padding: 20,
  },

  reasonText: {
    ...Fonts.style.body2,
    color: Colors.text.secondary,
    lineHeight: 20,
  },

  // Files Card Styles
  filesCard: {
    padding: 20,
  },

  fileItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border.light,
  },

  fileIcon: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: "#E3F2FD",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },

  fileInfo: {
    flex: 1,
  },

  fileName: {
    ...Fonts.style.body1,
    color: Colors.text.primary,
    fontWeight: "500",
    marginBottom: 4,
  },

  fileDetails: {
    ...Fonts.style.caption,
    color: Colors.text.secondary,
  },

  downloadButton: {
    padding: 8,
  },

  // Review Card Styles
  reviewCard: {
    padding: 20,
  },

  reviewText: {
    ...Fonts.style.body2,
    color: Colors.text.primary,
    lineHeight: 20,
  },

  noReviewContainer: {
    alignItems: "center",
    paddingVertical: 20,
  },

  noReviewText: {
    ...Fonts.style.body2,
    color: Colors.text.secondary,
  },

  // Empty state styles
  emptyContainer: {
    alignItems: "center",
    paddingVertical: 40,
  },

  emptyText: {
    ...Fonts.style.body1,
    color: Colors.text.secondary,
    textAlign: "center",
  },
});
