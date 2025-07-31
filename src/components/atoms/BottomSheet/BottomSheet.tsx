// BottomSheet.tsx - Enhanced version with better SafeArea handling

import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  Animated,
  Dimensions,
  Modal,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

interface BottomSheetProps {
  visible: boolean;
  onClose: () => void;
  title?: string;
  message?: string;
  icon?: string;
  iconColor?: string;
  height?: number;
  showCloseButton?: boolean;
  children?: React.ReactNode;
}

export const BottomSheet: React.FC<BottomSheetProps> = ({
  visible,
  onClose,
  title,
  message,
  icon,
  iconColor = "#007AFF",
  height = 400,
  showCloseButton = true,
  children,
}) => {
  const insets = useSafeAreaInsets();
  const slideAnim = React.useRef(new Animated.Value(height)).current;

  // Calculate total height including safe area
  const totalHeight = height + insets.bottom;

  React.useEffect(() => {
    if (visible) {
      Animated.spring(slideAnim, {
        toValue: 0,
        useNativeDriver: true,
        tension: 65,
        friction: 11,
      }).start();
    } else {
      Animated.spring(slideAnim, {
        toValue: totalHeight,
        useNativeDriver: true,
        tension: 65,
        friction: 11,
      }).start();
    }
  }, [visible, totalHeight]);

  if (!visible) return null;

  return (
    <Modal
      transparent
      visible={visible}
      animationType="none"
      onRequestClose={onClose}
      statusBarTranslucent={Platform.OS === "android"}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback>
            <Animated.View
              style={[
                styles.bottomSheet,
                {
                  height: totalHeight,
                  transform: [{ translateY: slideAnim }],
                },
              ]}
            >
              {/* Safe Area Container */}
              <SafeAreaView style={styles.safeContainer} edges={["bottom"]}>
                {/* Handle Bar */}
                <View style={styles.handleBar} />

                {/* Header */}
                {(title || message || showCloseButton) && (
                  <View style={styles.header}>
                    <View style={styles.headerContent}>
                      {icon && (
                        <Ionicons
                          name={icon as any}
                          size={24}
                          color={iconColor}
                          style={styles.headerIcon}
                        />
                      )}
                      <View style={styles.headerText}>
                        {title && <Text style={styles.title}>{title}</Text>}
                        {message && (
                          <Text style={styles.message}>{message}</Text>
                        )}
                      </View>
                    </View>

                    {showCloseButton && (
                      <TouchableOpacity
                        style={styles.closeButton}
                        onPress={onClose}
                        activeOpacity={0.7}
                      >
                        <Ionicons name="close" size={24} color="#666" />
                      </TouchableOpacity>
                    )}
                  </View>
                )}

                {/* Content */}
                <View style={styles.content}>{children}</View>
              </SafeAreaView>
            </Animated.View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
  bottomSheet: {
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  safeContainer: {
    flex: 1,
  },
  handleBar: {
    width: 40,
    height: 4,
    backgroundColor: "#DDD",
    borderRadius: 2,
    alignSelf: "center",
    marginTop: 8,
    marginBottom: 16,
  },
  header: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingBottom: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#E5E5E5",
  },
  headerContent: {
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-start",
  },
  headerIcon: {
    marginRight: 12,
    marginTop: 2,
  },
  headerText: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    marginBottom: 4,
  },
  message: {
    fontSize: 14,
    color: "#666",
    lineHeight: 20,
  },
  closeButton: {
    padding: 8,
    marginLeft: 16,
    borderRadius: 20,
    backgroundColor: "#F5F5F5",
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 8,
  },
});
