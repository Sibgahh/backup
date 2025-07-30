import React from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ViewStyle,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../../../utils/Colors";
import Fonts from "../../../utils/Fonts";
import { Button } from "../Button";

interface PopupAction {
  title: string;
  onPress: () => void;
  variant?: "primary" | "secondary" | "danger";
  style?: ViewStyle;
}

interface PopupProps {
  visible: boolean;
  onClose: () => void;
  title: string;
  message: string;
  icon?: keyof typeof Ionicons.glyphMap;
  iconColor?: string;
  actions: PopupAction[];
  showCloseButton?: boolean;
}

export const Popup: React.FC<PopupProps> = ({
  visible,
  onClose,
  title,
  message,
  icon = "information-circle",
  iconColor = "#FFA500",
  actions,
  showCloseButton = true,
}) => {
  // Default button styles
  const getDefaultButtonStyle = (variant: string, index: number): ViewStyle => {
    const baseStyle: ViewStyle = {
      borderRadius: 8,
    };

    // First button (usually secondary/discard) - grey
    if (index === 0 && variant === "secondary") {
      return {
        ...baseStyle,
        backgroundColor: Colors.neutral.grey400,
      };
    }

    // Second button (usually primary/save) - orange
    if (index === 1 && variant === "primary") {
      return {
        ...baseStyle,
        backgroundColor: "#FFA500",
      };
    }

    // Danger button - red
    if (variant === "danger") {
      return {
        ...baseStyle,
        backgroundColor: Colors.status.error,
      };
    }

    return baseStyle;
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.container}>
          {/* Close Button */}
          {showCloseButton && (
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Ionicons name="close" size={24} color={Colors.neutral.grey600} />
            </TouchableOpacity>
          )}

          {/* Icon Section */}
          <View style={styles.iconContainer}>
            <View
              style={[
                styles.iconBackground,
                { backgroundColor: `${iconColor}20` },
              ]}
            >
              <Ionicons name={icon} size={32} color={iconColor} />
            </View>
          </View>

          {/* Content */}
          <View style={styles.content}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.message}>{message}</Text>
          </View>

          {/* Actions */}
          <View style={styles.actions}>
            {actions.map((action, index) => {
              const defaultStyle = getDefaultButtonStyle(
                action.variant || "secondary",
                index
              );
              const combinedStyle = StyleSheet.flatten([
                styles.actionButton,
                defaultStyle,
                action.style, // User's custom style overrides defaults
              ]);

              return (
                <Button
                  key={index}
                  title={action.title}
                  onPress={action.onPress}
                  variant={action.variant || "secondary"}
                  size="small"
                  style={combinedStyle}
                />
              );
            })}
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  container: {
    backgroundColor: Colors.neutral.white,
    borderRadius: 20,
    padding: 22,
    width: "100%",
    maxWidth: 400,
    alignItems: "center",
    shadowColor: Colors.neutral.black,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 8,
  },
  closeButton: {
    position: "absolute",
    top: 16,
    right: 16,
    padding: 8,
    zIndex: 1,
  },
  iconContainer: {
    marginBottom: 24,
  },
  iconBackground: {
    width: 80,
    height: 80,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    alignItems: "center",
    marginBottom: 32,
  },
  title: {
    ...Fonts.style.h3,
    color: Colors.neutral.black,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 12,
  },
  message: {
    ...Fonts.style.body1,
    color: Colors.neutral.grey600,
    textAlign: "center",
    lineHeight: 22,
  },
  actions: {
    flexDirection: "row",
    gap: 12,
    width: "100%",
  },
  actionButton: {
    flex: 1,
  },
});
