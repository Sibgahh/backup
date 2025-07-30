import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ViewStyle,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../../../utils/Colors";
import Fonts from "../../../utils/Fonts";

interface PageHeaderProps {
  title: string;
  onBackPress?: () => void;
  style?: ViewStyle;
  trailingIcon?: keyof typeof Ionicons.glyphMap;
  onTrailingPress?: () => void;
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  onBackPress,
  style,
  trailingIcon,
  onTrailingPress,
}) => {
  const headerStyle: ViewStyle = StyleSheet.flatten([styles.header, style]);

  return (
    <View style={headerStyle}>
      {onBackPress ? (
        <TouchableOpacity onPress={onBackPress} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={Colors.neutral.white} />
        </TouchableOpacity>
      ) : (
        <View style={styles.placeholder} />
      )}
      <Text style={styles.title}>{title}</Text>
      <View style={styles.trailingContainer}>
        {trailingIcon && onTrailingPress ? (
          <TouchableOpacity
            onPress={onTrailingPress}
            style={styles.trailingButton}
          >
            <Ionicons
              name={trailingIcon}
              size={24}
              color={Colors.primary.main}
            />
          </TouchableOpacity>
        ) : (
          <View style={styles.placeholder} />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 16,
    paddingBottom: 40,
    backgroundColor: Colors.primary.main,
  },
  backButton: {
    padding: 4,
    width: 32,
  },
  title: {
    ...Fonts.style.h3,
    color: Colors.neutral.white,
    flex: 1,
    textAlign: "center",
  },
  trailingContainer: {
    width: 42,
    alignItems: "center",
    justifyContent: "center",
  },
  trailingButton: {
    padding: 8,
    backgroundColor: "white",
    borderRadius: 20,
    alignItems: "center",
  },
  placeholder: {
    width: 32, // Same width as backButton to center the title
  },
});
