import { StyleSheet, Dimensions } from "react-native";
import Colors from "../../utils/Colors";
import Fonts from "../../utils/Fonts";

export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.primary.main, // Header color extends to status bar
  },

  container: {
    flex: 1,
    backgroundColor: Colors.primary.main, // Changed from "red" to primary blue
    // borderTopLeftRadius: 20,
    // borderTopRightRadius: 20,
    marginTop: -20, // Slight overlap to ensure smooth transition
  },

  scrollContent: {
    paddingBottom: 22,
  },

  // Tab content styles
  tabContent: {
    flex: 1,
    backgroundColor: "transparent", // Transparent to show your container background
  },

  content: {
    paddingHorizontal: 20,
  },

  // Loading states
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 60,
  },

  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: Colors.neutral.grey600,
    fontFamily: Fonts.family.lato.regular,
  },

  // Status Container Styles
  statusContainer: {
    padding: 16,
    backgroundColor: Colors.background.default,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.border.light,
  },

  statusHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },

  statusTitle: {
    ...Fonts.style.subtitle1,
    color: Colors.text.primary,
    fontWeight: "600",
  },

  draftBadge: {
    backgroundColor: "#E3F2FD",
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },

  draftText: {
    ...Fonts.style.caption,
    color: Colors.primary.main,
    fontWeight: "500",
  },

  requestId: {
    ...Fonts.style.body2,
    color: Colors.text.secondary,
    marginBottom: 8,
  },

  lastEditedRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  lastEditedText: {
    ...Fonts.style.body2,
    color: Colors.text.secondary,
    marginLeft: 6,
  },

  // Download Container Styles
  downloadContainer: {
    padding: 16,
    backgroundColor: Colors.background.default,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.border.light,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  downloadContent: {
    flex: 1,
    width: "100%",
  },

  pdfIconContainer: {
    width: 40,
    height: 40,
    backgroundColor: "#E3F2FD",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },

  downloadInfo: {
    flex: 1,
    flexDirection: "row",
  },

  downloadTitle: {
    ...Fonts.style.subtitle2,
    fontFamily: Fonts.family.lato.regular,
    color: Colors.text.primary,
    marginBottom: 2,
  },

  downloadSubtitle: {
    ...Fonts.style.caption,
    fontFamily: Fonts.family.lato.regular,
    color: Colors.text.secondary,
  },

  downloadButton: {
    padding: 8,
  },

  // Information Header Styles
  informationHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  informationTitle: {
    ...Fonts.style.h4,
    color: Colors.text.primary,
    fontWeight: "600",
  },

  editButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.primary.main,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },

  editButtonText: {
    ...Fonts.style.body2,
    color: Colors.neutral.white,
    marginLeft: 4,
    fontWeight: "500",
  },

  // Photo section styles - Same as EmployeeDataEdit
  photoSection: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    marginTop: 8,
  },

  photoContainer: {
    position: "relative",
  },

  profilePhoto: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: Colors.neutral.grey200,
  },

  nameSection: {
    flex: 1,
  },

  nameLabel: {
    ...Fonts.style.caption,
    color: Colors.neutral.grey600,
    marginBottom: 4,
  },

  nameValue: {
    ...Fonts.style.body1,
    color: Colors.neutral.black,
    fontWeight: "500",
  },

  // Form styles - Same layout as EmployeeDataEdit
  formWrapper: {
    flex: 1,
  },

  formRow: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 8,
  },

  inputHalf: {
    flex: 1,
  },

  // View-only field styles - Styled like TextInput/Dropdown but read-only
  viewOnlyField: {
    marginBottom: 8,
  },

  fieldLabel: {
    ...Fonts.style.body2,
    color: Colors.neutral.grey600,
    marginBottom: 8,
  },

  fieldValue: {
    ...Fonts.style.body1,
    color: Colors.neutral.black,
    backgroundColor: Colors.neutral.white,
    borderWidth: 1,
    borderColor: Colors.border.light,
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    minHeight: 48,
    textAlignVertical: "center",
  },

  fieldValueWithIcon: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.neutral.white,
    borderWidth: 1,
    borderColor: Colors.border.light,
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    minHeight: 48,
  },

  fieldValueText: {
    ...Fonts.style.body1,
    color: Colors.neutral.black,
    flex: 1,
  },

  fieldIcon: {
    marginLeft: 8,
  },

  sectionSubtitle: {
    fontSize: 16,
    fontFamily: Fonts.family.lato.regular,
    color: Colors.neutral.grey900,
    marginBottom: 16,
  },

  // Photo section styles (original)
  photoCard: {
    padding: 24,
    alignItems: "center",
    backgroundColor: Colors.background.default,
    borderRadius: 8,
    borderColor: Colors.border.light,
  },

  employeePhoto: {
    width: 64,
    height: 64,
    borderRadius: 32,
    marginBottom: 12,
  },

  employeeName: {
    ...Fonts.style.subtitle1,
    color: Colors.text.primary,
    textAlign: "center",
  },

  // Information section styles (original)
  infoCard: {
    backgroundColor: Colors.background.default,
    borderRadius: 8,
    borderColor: Colors.border.light,
  },

  sectionTitle: {
    ...Fonts.style.body1,
    color: Colors.text.primary,
    fontWeight: "600",
    marginBottom: 16,
  },

  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border.light,
  },

  infoRowLast: {
    borderBottomWidth: 0,
  },

  infoLabel: {
    ...Fonts.style.body2,
    color: Colors.text.secondary,
    flex: 1,
  },

  infoValue: {
    ...Fonts.style.body2,
    color: Colors.text.primary,
    textAlign: "right",
    flex: 1,
  },

  documentStatus: {
    color: Colors.status.success,
  },

  // Placeholder styles for other tabs
  placeholderCard: {
    padding: 32,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.background.default,
    borderRadius: 8,
    borderColor: Colors.border.light,
  },

  placeholderText: {
    ...Fonts.style.body1,
    color: Colors.text.secondary,
    textAlign: "center",
  },

  // Retry button styles
  loadButton: {
    backgroundColor: Colors.primary.main,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
    marginTop: 16,
  },

  loadButtonText: {
    color: Colors.neutral.white,
    fontSize: 14,
    fontFamily: Fonts.family.lato.bold,
  },

  selectAllContainer: {
    backgroundColor: Colors.primary.light,
    borderRadius: 12,
    padding: 16,
  },
  selectAllContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  selectAllText: {
    ...Fonts.style.body1,
    color: Colors.text.primary,
    fontWeight: "600",
    flex: 1,
    marginLeft: 12,
  },
  categoriesList: {
    flex: 1,
  },
  categoryItem: {
    backgroundColor: Colors.neutral.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 8,
    shadowColor: Colors.neutral.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  categoryContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  checkboxContainer: {
    marginRight: 12,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: Colors.neutral.grey400,
    justifyContent: "center",
    alignItems: "center",
  },
  checkboxSelected: {
    backgroundColor: Colors.primary.main,
    borderColor: Colors.primary.main,
  },
  categoryInfo: {
    flex: 1,
  },
  categoryHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  categoryIcon: {
    marginRight: 8,
  },
  categoryTitle: {
    ...Fonts.style.body1,
    color: Colors.text.primary,
    fontWeight: "600",
  },
  categoryDescription: {
    ...Fonts.style.caption,
    color: Colors.text.secondary,
    marginLeft: 28,
  },
  downloadSheetButton: {
    backgroundColor: Colors.primary.main,
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 24,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: Colors.neutral.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  downloadSheetButtonDisabled: {
    backgroundColor: Colors.neutral.grey400,
  },
  downloadSheetButtonText: {
    ...Fonts.style.body1,
    color: Colors.neutral.white,
    fontWeight: "600",
    marginLeft: 8,
  },
  infoText: {
    ...Fonts.style.caption,
    color: Colors.text.secondary,
    textAlign: "center",
    marginTop: 8,
  },
  countdownText: {
    ...Fonts.style.caption,
    color: Colors.text.secondary,
    textAlign: "center",
    fontStyle: "italic",
  },
});
