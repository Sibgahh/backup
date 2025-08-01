import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import { Colors, Fonts } from "../../../utils";
import { Avatar } from "../../atoms/Avatar";

interface UserHeaderProps {
  userName: string;
  welcomeText?: string;
  avatarSource: string | null; // Changed to string for URL or null
  onNotificationPress: () => void;
  style?: ViewStyle;
}

export const UserHeader: React.FC<UserHeaderProps> = ({
  userName,
  welcomeText = "Welcome back,",
  avatarSource,
  onNotificationPress,
  style,
}) => {
  const headerStyle: ViewStyle = StyleSheet.flatten([styles.header, style]);
  const getAvatarSource = () => {
    if (avatarSource && typeof avatarSource === "string") {
      return { uri: avatarSource };
    }
    return require("../../../assets/icon/icon.png");
  };
  return (
    <View style={headerStyle}>
      <View style={styles.userSection}>
        <Avatar
          source={getAvatarSource()}
          defaultSource={require("../../../assets/icon/icon.png")}
          style={styles.marginRight}
        />
        <View>
          <Text style={styles.welcomeText}>{welcomeText}</Text>
          <Text style={styles.userName}>{userName}</Text>
        </View>
      </View>
      <TouchableOpacity
        onPress={onNotificationPress}
        style={styles.notificationButton}
      >
        <Ionicons
          name="notifications-outline"
          size={30}
          color={Colors.primary.main}
        />
      </TouchableOpacity>
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
    borderBottomWidth: 1,
    borderBottomColor: Colors.border.light,
  },

  userSection: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  marginRight: {
    marginRight: 12,
  },
  welcomeText: {
    ...Fonts.style.body2,
    color: Colors.neutral.white,
  },
  userName: {
    ...Fonts.style.h4,
    color: Colors.neutral.white,
  },
  notificationButton: {
    padding: 6,
    backgroundColor: "white",
    borderRadius: 100,
  },
});
