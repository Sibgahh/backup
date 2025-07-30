import React from "react";
import { View, ViewStyle } from "react-native";
import Colors from "../../../utils/Colors";

interface CardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  padding?: number;
  backgroundColor?: string;
}

export const Card: React.FC<CardProps> = ({
  children,
  style,
  padding = 20,
  backgroundColor = Colors.neutral.white,
}) => {
  const cardStyle: ViewStyle = {
    backgroundColor,
    borderRadius: 12,
    padding,
    ...style,
  };

  return <View style={cardStyle}>{children}</View>;
};
