import React from "react";
import { View, ViewStyle } from "react-native";

interface GapProps {
  size?: number;
  horizontal?: boolean;
  style?: ViewStyle;
}

export const Gap: React.FC<GapProps> = ({
  size = 16,
  horizontal = false,
  style,
}) => {
  const gapStyle: ViewStyle = {
    width: horizontal ? size : undefined,
    height: horizontal ? undefined : size,
    ...style,
  };

  return <View style={gapStyle} />;
};

// Predefined gap sizes for common use cases
export const Gap4: React.FC<{ horizontal?: boolean; style?: ViewStyle }> = ({
  horizontal,
  style,
}) => <Gap size={4} horizontal={horizontal} style={style} />;

export const Gap8: React.FC<{ horizontal?: boolean; style?: ViewStyle }> = ({
  horizontal,
  style,
}) => <Gap size={8} horizontal={horizontal} style={style} />;

export const Gap12: React.FC<{ horizontal?: boolean; style?: ViewStyle }> = ({
  horizontal,
  style,
}) => <Gap size={12} horizontal={horizontal} style={style} />;

export const Gap16: React.FC<{ horizontal?: boolean; style?: ViewStyle }> = ({
  horizontal,
  style,
}) => <Gap size={16} horizontal={horizontal} style={style} />;

export const Gap20: React.FC<{ horizontal?: boolean; style?: ViewStyle }> = ({
  horizontal,
  style,
}) => <Gap size={20} horizontal={horizontal} style={style} />;

export const Gap24: React.FC<{ horizontal?: boolean; style?: ViewStyle }> = ({
  horizontal,
  style,
}) => <Gap size={24} horizontal={horizontal} style={style} />;

export const Gap32: React.FC<{ horizontal?: boolean; style?: ViewStyle }> = ({
  horizontal,
  style,
}) => <Gap size={32} horizontal={horizontal} style={style} />;

export const Gap40: React.FC<{ horizontal?: boolean; style?: ViewStyle }> = ({
  horizontal,
  style,
}) => <Gap size={40} horizontal={horizontal} style={style} />;
