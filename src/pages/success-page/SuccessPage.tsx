import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { CommonActions, useNavigation } from "@react-navigation/native";
import Colors from "../../utils/Colors";
import Fonts from "../../utils/Fonts";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

interface SuccessPageProps {
  title?: string;
  message?: string;
  buttonText?: string;
  onButtonPress?: () => void;
}

export default function SuccessPage({
  title = "Success!",
  message = "You've completed updating the form, please wait the next updates from HR",
  buttonText = "Back to profile data",
  onButtonPress,
}: SuccessPageProps): React.JSX.Element {
  const navigation = useNavigation();

  const handleButtonPress = () => {
    if (onButtonPress) {
      onButtonPress();
    } else {
      // Reset navigation stack and navigate to ManageData
      // This removes SuccessPage from navigation history
      navigation.dispatch(
        CommonActions.reset({
          index: 1,
          routes: [
            { name: "Main" as never }, // HomePage (Main tab)
            { name: "ManageData" as never }, // ManageDataPage
          ],
        })
      );
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={["top", "left", "right"]}>
      <StatusBar style="light" />

      {/* Blue Background Section */}
      <View style={styles.topSection}>
        <Text style={styles.title}>{title}</Text>

        {/* Plane Image */}
        <View style={styles.imageContainer}>
          <Image
            source={require("../../assets/images/plane-image.png")}
            style={styles.planeImage}
            resizeMode="contain"
          />
        </View>
      </View>

      {/* White Background Section */}
      <View style={styles.bottomSection}>
        <View style={styles.messageContainer}>
          <Text style={styles.message}>{message}</Text>
        </View>

        <TouchableOpacity style={styles.button} onPress={handleButtonPress}>
          <Text style={styles.buttonText}>{buttonText}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary.main,
  },
  topSection: {
    flex: 0.6,
    backgroundColor: Colors.primary.main,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    position: "relative",
  },
  bottomSection: {
    flex: 0.4,
    backgroundColor: Colors.neutral.white,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    paddingHorizontal: 30,
    paddingTop: 40,
    paddingBottom: 30,
    justifyContent: "space-between",
    marginTop: -20, // Overlap slightly for the curved effect
  },
  title: {
    ...Fonts.style.h1,
    color: Colors.neutral.white,
    fontWeight: "bold",
    marginBottom: 40,
    textAlign: "center",
  },
  imageContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  planeImage: {
    width: SCREEN_WIDTH * 0.6,
    height: 120,
    tintColor: Colors.neutral.white,
  },
  messageContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  message: {
    ...Fonts.style.body1,
    color: Colors.neutral.grey600,
    textAlign: "center",
    lineHeight: 24,
  },
  button: {
    backgroundColor: Colors.primary.main,
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 24,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: Colors.primary.main,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  buttonText: {
    ...Fonts.style.body1,
    color: Colors.neutral.white,
    fontWeight: "600",
  },
});
