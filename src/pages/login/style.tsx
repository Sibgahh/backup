import { StyleSheet, Dimensions, Platform } from "react-native";
import Colors from "../../utils/Colors";
import Fonts from "@/utils/Fonts";

const { width, height } = Dimensions.get("window");

export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "transparent", // Transparent background
  },

  container: {
    flex: 1,
    backgroundColor: Colors.background.default,
    paddingTop: 150,
    justifyContent: "center",
  },

  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
  },

  // Header Image
  headerImage: {
    position: "absolute",
    top: 0,
    left: 0,
    zIndex: 10,
  },

  // Logo at top right
  logoTopRight: {
    position: "absolute",
    top: 20,
    right: 20,
    width: 120,
    height: 120,
    zIndex: 10,
  },

  // Title Section
  titleContainer: {
    paddingHorizontal: 22,
    alignItems: "flex-start",
    marginBottom: 22,
  },

  appTitle: {
    fontSize: 28,
    fontFamily: "Lato-Bold",
    color: Colors.text.primary,
    marginBottom: 4,
    textAlign: "left",
  },

  appSubtitle: {
    fontSize: 20,
    fontFamily: "Lato-Regular",
    color: Colors.text.secondary,
    textAlign: "left",
  },

  // Form Container
  formContainer: {
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 120,
  },

  // Input Section
  inputContainer: {
    marginBottom: 20,
  },

  inputLabel: {
    fontSize: 16,
    fontFamily: "Lato-Regular",
    color: Colors.primary.main,
    marginBottom: 8,
  },

  textInput: {
    borderWidth: 1,
    borderColor: Colors.border.light,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    fontFamily: "Lato-Regular",
    backgroundColor: Colors.background.paper,
    color: Colors.text.primary,
  },

  // Password Input
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: Colors.border.light,
    borderRadius: 12,
    backgroundColor: Colors.background.paper,
    marginBottom: 20,
  },

  passwordInput: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    fontFamily: "Lato-Regular",
    color: Colors.text.primary,
  },

  passwordToggle: {
    paddingHorizontal: 16,
    paddingVertical: 14,
  },

  passwordToggleText: {
    fontSize: 14,
    fontFamily: "Lato-Bold",
    color: Colors.secondary.main,
  },

  // Forgot Password
  forgotPasswordContainer: {
    alignItems: "flex-end",
    marginBottom: 30,
  },

  forgotPasswordText: {
    fontSize: 14,
    fontFamily: "Lato-Regular",
    color: Colors.secondary.main,
  },

  // Login Button
  loginButton: {
    backgroundColor: Colors.primary.main,
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: "center",
    marginBottom: 30,
    shadowColor: Colors.primary.main,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },

  loginButtonDisabled: {
    backgroundColor: Colors.neutral.grey400,
    shadowOpacity: 0,
    elevation: 0,
  },

  loginButtonText: {
    fontSize: 18,
    fontFamily: "Lato-Bold",
    color: Colors.primary.contrast,
  },

  // Footer Section
  footerContainer: {
    alignItems: "center",
    paddingHorizontal: 20,
  },

  footerText: {
    fontSize: 14,
    fontFamily: "Lato-Regular",
    color: Colors.text.primary,
    textAlign: "center",
    lineHeight: 18,
  },

  // Footer Image
  footerImage: {
    position: "absolute",
    bottom: 0,
    right: 0,
    zIndex: 10,
  },
  // Add these styles to your existing style.tsx file

  // Skip Login Button (Development Only)
  skipLoginButton: {
    position: "absolute",
    top: 20,
    left: 20,
    backgroundColor: Colors.status.warning,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    zIndex: 20,
  },

  skipLoginText: {
    ...Fonts.style.button,
    fontSize: Fonts.size.sm,
    color: Colors.neutral.black,
  },
  // ... existing styles ...

  // Demo credentials styles
  demoButton: {
    backgroundColor: Colors.secondary.main,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginBottom: 16,
    alignSelf: "center",
  },
  demoButtonText: {
    color: Colors.primary.contrast,
    fontSize: 14,
    fontFamily: "Lato-Regular",
    textAlign: "center",
  },
  demoCredentialsContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  demoCredentialsTitle: {
    color: Colors.text.primary,
    fontSize: 16,
    fontFamily: "Lato-Bold",
    marginBottom: 12,
    textAlign: "center",
  },
  demoCredentialItem: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
  },
  demoCredentialEmail: {
    color: Colors.text.primary,
    fontSize: 14,
    fontFamily: "Lato-Regular",
    marginBottom: 4,
  },
  demoCredentialPassword: {
    color: Colors.text.secondary,
    fontSize: 12,
    fontFamily: "Lato-Regular",
  },
  errorContainer: {
    marginBottom: 16,
  },
  errorText: {
    color: Colors.status.error,
    fontSize: 14,
    fontFamily: "Lato-Regular",
    textAlign: "center",
  },
  footerTextLink: {
    color: Colors.primary.main,
    fontSize: 14,
    fontFamily: "Lato-Bold",
  },
});
