import { StyleSheet } from "react-native";
import Colors from "../../utils/Colors";
import Fonts from "../../utils/Fonts";

export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.primary.main,
  },

  // Scrollable container - contains everything
  scrollContainer: {
    flex: 1,
  },

  // Blue Header Section (scrollable)
  headerSection: {
    backgroundColor: Colors.primary.main,
    height: 80, // Fixed height for blue header
    paddingHorizontal: 20,
  },

  headerContent: {
    flex: 1,
    // Empty header content - just blue background
  },

  // Avatar Transition Section - positioned between header and body
  avatarTransitionSection: {
    height: 50, // Half of avatar size to create overlap effect
    backgroundColor: "Colors.primary.main",
    alignItems: "center",
    justifyContent: "center",
  },

  avatarContainer: {
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1,
  },

  overlappingAvatar: {
    borderRadius: 100,
    width: 120,
    height: 120,
    marginTop: -10,
    borderWidth: 4,
    borderColor: Colors.neutral.white,
    // Shadow for better visual separation
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },

  // White Content Section (scrollable)
  contentSection: {
    backgroundColor: Colors.background.default,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginTop: -20, // Slight overlap with avatar section
    paddingHorizontal: 20,
    paddingTop: 60, // Space for the overlapping avatar
    minHeight: 600, // Ensure enough height for content
  },

  // User Info Section
  userInfoSection: {
    alignItems: "center",
  },

  userName: {
    ...Fonts.style.h3,
    color: Colors.text.primary,
    fontWeight: "600",
    textAlign: "center",
  },

  userEmail: {
    ...Fonts.style.body1,
    color: Colors.text.secondary,
    textAlign: "center",
  },

  viewProfileButton: {
    backgroundColor: "#00BCD4",
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderRadius: 20,
    minWidth: 120,
  },

  viewProfileButtonText: {
    ...Fonts.style.body2,
    color: Colors.neutral.white,
    fontWeight: "600",
    textAlign: "center",
  },

  // Section Styles
  section: {
    paddingHorizontal: 0,
  },

  sectionTitle: {
    ...Fonts.style.h4,
    color: Colors.text.primary,
    fontWeight: "600",
    marginBottom: 8,
  },

  // Work Information Items
  workInfoItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border.light,
  },

  workInfoIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#E3F2FD",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 16,
  },

  workInfoContent: {
    flex: 1,
  },

  workInfoTitle: {
    ...Fonts.style.body1,
    color: Colors.text.primary,
    fontWeight: "600",
    marginBottom: 4,
  },

  workInfoValue: {
    ...Fonts.style.body2,
    color: Colors.text.secondary,
  },

  // Settings Items
  settingsItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border.light,
  },

  settingsItemContent: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },

  settingsIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 16,
  },

  settingsTextContent: {
    flex: 1,
  },

  settingsTitle: {
    ...Fonts.style.body1,
    color: Colors.text.primary,
    fontWeight: "600",
    marginBottom: 4,
  },

  settingsSubtitle: {
    ...Fonts.style.body2,
    color: Colors.text.secondary,
  },

  // Legacy styles (keeping for backward compatibility)
  container: {
    flex: 1,
    backgroundColor: Colors.background.default,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginTop: -20,
  },

  content: {
    flex: 1,
    paddingHorizontal: 20,
  },

  profileSection: {
    alignItems: "center",
    paddingTop: 32,
    paddingBottom: 20,
  },

  avatar: {
    borderWidth: 3,
    borderColor: Colors.neutral.white,
  },

  userInfo: {
    backgroundColor: Colors.neutral.white,
    padding: 20,
    borderRadius: 12,
    alignItems: "center",
  },

  userDepartment: {
    fontSize: 14,
    color: "gray",
    marginBottom: 2,
  },

  userPosition: {
    fontSize: 14,
    color: "gray",
  },

  settingItem: {
    backgroundColor: Colors.neutral.white,
    padding: 16,
    borderRadius: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },

  settingLabel: {
    fontSize: 16,
    color: Colors.neutral.black,
    fontWeight: "500",
  },

  settingValue: {
    fontSize: 16,
    color: Colors.primary.main,
    fontWeight: "600",
  },

  logoutButton: {
    backgroundColor: "red",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
  },

  logoutButtonDisabled: {
    backgroundColor: "gray",
  },

  logoutButtonText: {
    color: Colors.neutral.white,
    fontSize: 16,
    fontWeight: "bold",
  },

  debugSection: {
    backgroundColor: "#f0f0f0",
    padding: 12,
    borderRadius: 8,
    marginBottom: 20,
  },

  debugText: {
    fontSize: 12,
    color: "#666",
    fontFamily: "monospace",
  },
});
