import React, { useEffect, useRef, useState } from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Dimensions,
  ViewStyle,
  PanResponder,
  ScrollView,
  PanResponderGestureState,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../../../utils/Colors";
import Fonts from "../../../utils/Fonts";
import { Button } from "../Button";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

interface BottomSheetAction {
  title: string;
  onPress: () => void;
  variant?: "primary" | "secondary" | "danger";
  style?: ViewStyle;
}

interface BottomSheetProps {
  visible: boolean;
  onClose: () => void;
  title: string;
  message?: string;
  icon?: keyof typeof Ionicons.glyphMap;
  iconColor?: string;
  actions?: BottomSheetAction[];
  children?: React.ReactNode;
  showCloseButton?: boolean;
  height?: number; // Custom height for the bottom sheet
  scrollable?: boolean; // New prop to enable scrolling
  minHeight?: number; // New prop for minimum height
  maxHeight?: number; // New prop for maximum height
}

export const BottomSheet: React.FC<BottomSheetProps> = ({
  visible,
  onClose,
  title,
  message,
  icon,
  iconColor = "#4CAF50",
  actions = [],
  children,
  showCloseButton = true,
  height = SCREEN_HEIGHT * 0.7,
  scrollable = false,
  minHeight = 200,
  maxHeight = SCREEN_HEIGHT * 0.9,
}) => {
  const slideAnim = useRef(new Animated.Value(SCREEN_HEIGHT)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;
  const lastGestureY = useRef(0);
  const [isDragging, setIsDragging] = useState(false);
  const [currentHeight, setCurrentHeight] = useState(height);

  useEffect(() => {
    if (visible) {
      // Slide up and fade in
      Animated.parallel([
        Animated.spring(slideAnim, {
          toValue: SCREEN_HEIGHT - currentHeight,
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      // Slide down and fade out
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: SCREEN_HEIGHT,
          duration: 250,
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnim, {
          toValue: 0,
          duration: 250,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [visible, slideAnim, opacityAnim, currentHeight]);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: (
        _,
        gestureState: PanResponderGestureState
      ) => {
        // Only respond to vertical swipes
        return (
          Math.abs(gestureState.dy) > Math.abs(gestureState.dx) &&
          Math.abs(gestureState.dy) > 10
        );
      },

      onPanResponderGrant: () => {
        lastGestureY.current = 0;
        setIsDragging(true);
      },

      onPanResponderMove: (_, gestureState: PanResponderGestureState) => {
        const { dy } = gestureState;

        // Allow both upward and downward dragging with constraints
        const newHeight = Math.max(
          minHeight,
          Math.min(maxHeight, currentHeight - dy)
        );
        const newY = SCREEN_HEIGHT - newHeight;

        slideAnim.setValue(newY);
        setCurrentHeight(newHeight);
      },

      onPanResponderRelease: (_, gestureState: PanResponderGestureState) => {
        const { dy, vy } = gestureState;
        setIsDragging(false);

        // Determine if we should close, expand, or snap back
        const dragDistance = Math.abs(dy);
        const dragVelocity = Math.abs(vy);

        // Close if dragged down more than 30% of height or with sufficient velocity
        const shouldClose =
          (dy > 0 && dragDistance > currentHeight * 0.3) ||
          (dy > 0 && dragVelocity > 1000);

        // Expand if dragged up more than 20% of height
        const shouldExpand = dy < 0 && dragDistance > currentHeight * 0.2;

        if (shouldClose) {
          // Close the bottom sheet
          Animated.parallel([
            Animated.timing(slideAnim, {
              toValue: SCREEN_HEIGHT,
              duration: 200,
              useNativeDriver: true,
            }),
            Animated.timing(opacityAnim, {
              toValue: 0,
              duration: 200,
              useNativeDriver: true,
            }),
          ]).start(() => {
            onClose();
            setCurrentHeight(height); // Reset to original height
          });
        } else if (shouldExpand) {
          // Expand to maximum height
          const expandedHeight = maxHeight;
          setCurrentHeight(expandedHeight);
          Animated.spring(slideAnim, {
            toValue: SCREEN_HEIGHT - expandedHeight,
            useNativeDriver: true,
            tension: 100,
            friction: 8,
          }).start();
        } else {
          // Snap back to original position
          setCurrentHeight(height);
          Animated.spring(slideAnim, {
            toValue: SCREEN_HEIGHT - height,
            useNativeDriver: true,
            tension: 100,
            friction: 8,
          }).start();
        }
      },
    })
  ).current;

  const handleBackdropPress = () => {
    onClose();
  };

  const renderContent = () => {
    if (scrollable) {
      return (
        <ScrollView
          style={styles.scrollableContent}
          showsVerticalScrollIndicator={false}
          nestedScrollEnabled={true}
          scrollEnabled={!isDragging}
        >
          {children}
        </ScrollView>
      );
    }
    return children;
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="none"
      onRequestClose={onClose}
    >
      <Animated.View style={[styles.overlay, { opacity: opacityAnim }]}>
        <TouchableOpacity
          style={styles.backdrop}
          activeOpacity={1}
          onPress={handleBackdropPress}
        />

        <Animated.View
          style={[
            styles.container,
            {
              height: currentHeight,
              transform: [{ translateY: slideAnim }],
            },
          ]}
          {...panResponder.panHandlers}
        >
          {/* Enhanced Handle Bar - Better visual feedback */}
          <View style={styles.handleContainer}>
            <View
              style={[styles.handleBar, isDragging && styles.handleBarActive]}
            />
          </View>

          {/* Close Button */}
          {showCloseButton && (
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Ionicons name="close" size={24} color={Colors.neutral.grey600} />
            </TouchableOpacity>
          )}

          {/* Content */}
          <View style={styles.content}>
            {/* Icon Section */}
            {icon && (
              <View style={styles.iconContainer}>
                <View
                  style={[
                    styles.iconBackground,
                    { backgroundColor: `${iconColor}20` },
                  ]}
                >
                  <Ionicons name={icon} size={32} color={iconColor} />
                </View>
              </View>
            )}

            {/* Title and Message */}
            <View style={styles.textContent}>
              <Text style={styles.title}>{title}</Text>
              {message && <Text style={styles.message}>{message}</Text>}
            </View>

            {/* Custom Children with Scroll Support */}
            {renderContent()}

            {/* Actions */}
            {actions.length > 0 && (
              <View style={styles.actions}>
                {actions.map((action, index) => (
                  <Button
                    key={index}
                    title={action.title}
                    onPress={action.onPress}
                    variant={action.variant || "primary"}
                    size="medium"
                    style={StyleSheet.flatten([
                      styles.actionButton,
                      action.style,
                    ])}
                  />
                ))}
              </View>
            )}
          </View>
        </Animated.View>
      </Animated.View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  backdrop: {
    flex: 1,
  },
  container: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: Colors.neutral.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 20,
    paddingBottom: 20,
    shadowColor: Colors.neutral.black,
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8,
  },
  handleContainer: {
    paddingVertical: 12,
    alignItems: "center",
  },
  handleBar: {
    width: 50,
    height: 5,
    backgroundColor: Colors.neutral.grey300,
    borderRadius: 3,
  },
  handleBarActive: {
    backgroundColor: Colors.primary.main,
    width: 60,
    height: 6,
  },
  closeButton: {
    position: "absolute",
    top: 16,
    right: 16,
    padding: 8,
    zIndex: 1,
  },
  content: {
    flex: 1,
    alignItems: "center",
    paddingTop: 8,
  },
  scrollableContent: {
    flex: 1,
    width: "100%",
  },
  iconContainer: {
    marginBottom: 20,
  },
  iconBackground: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  textContent: {
    alignItems: "center",
    marginBottom: 24,
  },
  title: {
    ...Fonts.style.h3,
    color: Colors.neutral.black,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 8,
  },
  message: {
    ...Fonts.style.body1,
    color: Colors.neutral.grey600,
    textAlign: "center",
    lineHeight: 22,
  },
  actions: {
    flexDirection: "row",
    gap: 12,
    width: "100%",
    marginTop: "auto", // Push actions to bottom
  },
  actionButton: {
    flex: 1,
  },
});
