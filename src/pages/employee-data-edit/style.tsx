import { StyleSheet } from "react-native";
import Colors from "../../utils/Colors";
import Fonts from "@/utils/Fonts";

export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.primary.main, // Header color extends to status bar
  },

  container: {
    padding: 20,
    flex: 1,
    backgroundColor: Colors.background.default,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginTop: -20, // Slight overlap to ensure smooth transition
  },

  scrollContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },

  // Add these new styles while keeping existing container style
  tabHeader: {
    backgroundColor: Colors.neutral.white,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border.light,
    marginHorizontal: -20,
    paddingHorizontal: 20,
    marginTop: -20,
  },

  tabItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },

  tabText: {
    ...Fonts.style.body1,
    fontWeight: "600",
  },

  warningContainer: {
    flexDirection: "row",
    backgroundColor: "#FFF8E1",
    padding: 12,
    borderRadius: 8,
    marginTop: 16,
    alignItems: "center",
    gap: 8,
  },

  warningIcon: {
    marginTop: 2,
  },

  warningText: {
    ...Fonts.style.caption,
    color: "#F57C00",
    flex: 1,
    lineHeight: 16,
  },

  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20,
    marginBottom: 16,
  },

  sectionTitle: {
    ...Fonts.style.h4,
    color: Colors.neutral.black,
    fontWeight: "600",
  },

  editingText: {
    ...Fonts.style.body2,
    color: Colors.primary.main,
    fontWeight: "500",
  },

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

  cameraButton: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: Colors.primary.main,
    borderRadius: 16,
    width: 32,
    height: 32,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: Colors.neutral.white,
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

  photoHint: {
    ...Fonts.style.caption,
    color: Colors.neutral.grey600,
    textAlign: "left",
    marginTop: 8,
  },

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

  inputContainer: {
    marginBottom: 8,
  },

  inputLabel: {
    ...Fonts.style.body2,
    color: Colors.neutral.grey600,
    marginBottom: 8,
  },

  dateInputWrapper: {
    position: "relative",
  },

  dateInputContainer: {
    marginBottom: 0,
  },

  saveButton: {
    backgroundColor: Colors.primary.main,
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },

  saveButtonText: {
    ...Fonts.style.body1,
    color: Colors.neutral.white,
    fontWeight: "600",
  },
  // Modal styles
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },

  modalContent: {
    backgroundColor: Colors.neutral.white,
    borderRadius: 16,
    padding: 24,
    width: "100%",
    maxWidth: 400,
    shadowColor: Colors.neutral.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },

  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },

  modalTitle: {
    ...Fonts.style.h3,
    color: Colors.neutral.black,
    fontWeight: "600",
  },

  closeButton: {
    padding: 4,
  },

  modalMessage: {
    ...Fonts.style.body1,
    color: Colors.neutral.grey700,
    marginBottom: 24,
    lineHeight: 20,
  },

  modalActions: {
    gap: 12,
  },

  modalButton: {
    marginBottom: 0,
  },
});
