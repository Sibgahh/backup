import React from "react";
import { View, Text, Image, ViewStyle, StyleSheet } from "react-native";
import { Card } from "../../atoms/Card";
import { Button } from "../../atoms/Button";
import Colors from "../../../utils/Colors";
import Fonts from "../../../utils/Fonts";

interface TimesheetReminderProps {
  title: string;
  onClockIn: () => void;
  style?: ViewStyle;
}
export const TimesheetReminder: React.FC<TimesheetReminderProps> = ({
  title,
  onClockIn,
  style,
}) => {
  // Fix: Use StyleSheet.flatten for style arrays
  const containerStyle = StyleSheet.flatten([
    { marginHorizontal: 20, marginVertical: 16 },
    style,
  ]);

  return (
    <Card backgroundColor={Colors.secondary.light} style={containerStyle}>
      <View style={styles.content}>
        <View style={styles.imageContainer}>
          <Image
            source={require("../../../assets/icon/timesheet-illustration.png")}
            style={styles.image}
            resizeMode="contain"
          />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.title}>{title}</Text>
          <Button
            title="Clock in"
            onPress={onClockIn}
            icon="time-outline"
            variant="primary"
            size="small"
            style={{
              backgroundColor: Colors.primary.main,
              borderRadius: 8,
            }}
          />
        </View>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  content: {
    flexDirection: "row",
    alignItems: "center",
  },
  imageContainer: {
    marginRight: 16,
  },
  image: {
    width: 80,
    height: 80,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    ...Fonts.style.subtitle1,
    color: Colors.primary.main,
    fontWeight: "600",
    marginBottom: 12,
    lineHeight: 22,
  },
});
