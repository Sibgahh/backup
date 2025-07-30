import React from "react";
import {
  View,
  Text,
  TextInput as RNTextInput,
  TextInputProps,
  StyleSheet,
  ViewStyle,
  TextStyle,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../../../utils/Colors";
import Fonts from "../../../utils/Fonts";

interface CustomTextInputProps extends TextInputProps {
  label: string;
  error?: string;
  containerStyle?: ViewStyle;
  inputStyle?: TextStyle;
  disabled?: boolean;
  rightIcon?: keyof typeof Ionicons.glyphMap;
  onRightIconPress?: () => void;
  rightIconColor?: string;
}

export const TextInput: React.FC<CustomTextInputProps> = ({
  label,
  error,
  containerStyle,
  inputStyle,
  disabled = false,
  rightIcon,
  onRightIconPress,
  rightIconColor = Colors.neutral.grey600,
  ...props
}) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.inputWrapper}>
        <RNTextInput
          style={[
            styles.input,
            rightIcon && styles.inputWithIcon,
            error && styles.inputError,
            disabled && styles.inputDisabled,
            inputStyle,
          ]}
          editable={!disabled}
          placeholderTextColor={Colors.neutral.grey500}
          {...props}
        />
        {rightIcon && (
          <TouchableOpacity
            style={styles.iconContainer}
            onPress={onRightIconPress}
            disabled={!onRightIconPress}
          >
            <Ionicons name={rightIcon} size={20} color={rightIconColor} />
          </TouchableOpacity>
        )}
      </View>
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    ...Fonts.style.body2,
    color: Colors.neutral.grey600,
    marginBottom: 8,
  },
  inputWrapper: {
    position: "relative",
  },
  input: {
    ...Fonts.style.body1,
    borderWidth: 1,
    borderColor: Colors.border.light,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: Colors.neutral.white,
    color: Colors.neutral.black,
  },
  inputWithIcon: {
    paddingRight: 50, // Add space for the icon
  },
  inputError: {
    borderColor: Colors.status.error,
  },
  inputDisabled: {
    backgroundColor: Colors.neutral.grey200,
    color: Colors.neutral.grey500,
  },
  iconContainer: {
    position: "absolute",
    right: 12,
    top: 12,
    padding: 4,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    ...Fonts.style.caption,
    color: Colors.status.error,
    marginTop: 4,
  },
});
