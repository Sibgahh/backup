import React from "react";
import { TouchableOpacity, Text, ViewStyle, TextStyle } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../../../utils/Colors";
import Fonts from "../../../utils/Fonts";

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: "primary" | "secondary" | "danger";
  size?: "small" | "medium" | "large";
  icon?: keyof typeof Ionicons.glyphMap;
  disabled?: boolean;
  style?: ViewStyle;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = "primary",
  size = "medium",
  icon,
  disabled = false,
  style,
}) => {
  const buttonStyle: ViewStyle = {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: variant === "primary" ? 25 : 8,
    paddingVertical: size === "small" ? 8 : size === "large" ? 16 : 12,
    paddingHorizontal: size === "small" ? 16 : size === "large" ? 24 : 20,
    backgroundColor:
      variant === "primary"
        ? Colors.primary.main
        : variant === "secondary"
        ? Colors.secondary.main
        : Colors.status.error,
    opacity: disabled ? 0.6 : 1,
    ...style,
  };

  const textStyle: TextStyle = {
    ...Fonts.style.button,
    color:
      variant === "secondary" ? Colors.neutral.grey600 : Colors.neutral.white,
    marginLeft: icon ? 8 : 0,
    fontWeight: "600",
  };

  return (
    <TouchableOpacity style={buttonStyle} onPress={onPress} disabled={disabled}>
      {icon && <Ionicons name={icon} size={20} color={Colors.neutral.white} />}
      <Text style={textStyle}>{title}</Text>
    </TouchableOpacity>
  );
};
