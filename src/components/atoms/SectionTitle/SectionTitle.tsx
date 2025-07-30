import React from "react";
import { View, Text, ViewStyle, StyleSheet } from "react-native";
import Fonts from "../../../utils/Fonts";
import Colors from "../../../utils/Colors";

interface SectionTitleProps {
  title: string;
  style?: ViewStyle;
}

export const SectionTitle: React.FC<SectionTitleProps> = ({ title, style }) => {
  return (
    <View style={[styles.container, style]}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 24,
    paddingHorizontal: 20,
  },
  title: {
    ...Fonts.style.h4,
    color: Colors.text.primary,
    marginBottom: 16,
  },
});
