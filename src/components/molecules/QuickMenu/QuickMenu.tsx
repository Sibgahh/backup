import React from "react";
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import { Colors, Fonts } from "../../../utils";

interface MenuItem {
  id: string;
  title: string;
  icon: any;
  onPress: () => void;
}

interface QuickMenuProps {
  menuItems: MenuItem[];
  style?: ViewStyle;
}

export const QuickMenu: React.FC<QuickMenuProps> = ({ menuItems, style }) => {
  const containerStyle: ViewStyle = StyleSheet.flatten([
    styles.container,
    style,
  ]);

  return (
    <View style={containerStyle}>
      {menuItems.map((item) => (
        <TouchableOpacity
          key={item.id}
          style={styles.menuItem}
          onPress={item.onPress}
        >
          <View style={styles.menuIconContainer}>
            <Image
              source={item.icon}
              style={styles.menuIcon}
              resizeMode="contain"
            />
          </View>
          <Text style={styles.menuText}>{item.title}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  menuItem: {
    alignItems: "center",
    flex: 1,
    marginHorizontal: 5,
  },
  menuIconContainer: {
    width: 110,
    height: 110,
    borderRadius: 16,
    backgroundColor: Colors.secondary.light,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  menuIcon: {
    width: 80,
    height: 80,
  },
  menuText: {
    ...Fonts.style.body2,
    color: Colors.text.primary,
    textAlign: "center",
    marginTop: 2,
  },
});
