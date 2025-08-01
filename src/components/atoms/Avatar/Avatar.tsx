import React from "react";
import {
  Image,
  ImageSourcePropType,
  ImageStyle,
  ImageURISource,
} from "react-native";
import { Colors } from "../../../utils"; // Note the path from Avatar to utils

interface AvatarProps {
  source: ImageSourcePropType | { uri: string };
  size?: number;
  style?: ImageStyle;
  defaultSource?: number | ImageURISource; // Fixed type
}

export const Avatar: React.FC<AvatarProps> = ({
  source,
  size = 48,
  style,
  defaultSource,
}) => {
  const avatarStyle: ImageStyle = {
    width: size,
    height: size,
    borderRadius: size / 2,
    backgroundColor: Colors.neutral.white,
    ...style,
  };

  return (
    <Image source={source} style={avatarStyle} defaultSource={defaultSource} />
  );
};
