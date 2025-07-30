import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ViewStyle,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Avatar } from "../../atoms/Avatar";
import Colors from "../../../utils/Colors";
import Fonts from "../../../utils/Fonts";

interface UserHeaderProps {
  userName: string;
  welcomeText?: string;
  avatarSource: any;
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

  return (
    <View style={headerStyle}>
      <View style={styles.userSection}>
        <Avatar
          source={avatarSource}
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
