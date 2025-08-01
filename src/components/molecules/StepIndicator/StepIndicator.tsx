import React from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

const { width } = Dimensions.get("window");
const STEP_WIDTH = (width - 64) / 3; // Accounting for horizontal padding

// Default color mapping for different statuses
const DEFAULT_STATUS_COLORS = {
  Draft: "#8E8E93", // Grey
  Submitted: "#004AAD", // Primary Blue
  "In Review": "#004AAD", // Primary Blue
  Success: "#4CAF50", // Green
  Rejected: "#FF3B30", // Red
  Status: "#C7C7CC", // Default Grey
};

interface StepIndicatorProps {
  currentStep: number;
  icons: string[]; // Array of icon names
  stepStatuses: {
    step1?: string; // Draft or Submitted
    step2: string; // Always "In Review"
    step3?: string; // Success or Rejected
  };
  activeColor?: string; // Custom active color
  inactiveColor?: string; // Custom inactive color
  iconColor?: string; // Custom icon color
}

export const StepIndicator: React.FC<StepIndicatorProps> = ({
  currentStep,
  icons,
  stepStatuses,
  activeColor,
  inactiveColor,
  iconColor,
}) => {
  // Define default labels and allow overriding with specific statuses
  const stepLabels = [
    stepStatuses.step1 || "Draft/Submitted",
    "In Review", // Always constant
    stepStatuses.step3 || "Status", // Default to "Status"
  ];

  // Function to get color based on status and custom colors
  const getStatusColor = (status: string, index: number) => {
    // If custom colors are provided, use them
    if (activeColor && inactiveColor) {
      if (index <= currentStep) {
        return activeColor;
      } else {
        return inactiveColor;
      }
    }

    // If the step is not reached yet, use grey
    if (index > currentStep) return DEFAULT_STATUS_COLORS["Status"];

    // Use the color from DEFAULT_STATUS_COLORS, default to grey if not found
    return (
      DEFAULT_STATUS_COLORS[status as keyof typeof DEFAULT_STATUS_COLORS] ||
      DEFAULT_STATUS_COLORS["Status"]
    );
  };

  // Function to get icon color
  const getIconColor = (index: number, statusColor: string) => {
    // If custom icon color is provided, use it for completed steps only
    if (iconColor && index < currentStep) {
      return iconColor;
    }

    // Default icon color logic
    if (index < currentStep) {
      return "white";
    } else if (index === currentStep) {
      return statusColor; // Use status color for current step instead of iconColor
    } else {
      return "#C7C7CC";
    }
  };

  return (
    <View style={styles.container}>
      {stepLabels.map((label, index) => {
        const statusColor = getStatusColor(label, index);
        const iconColorValue = getIconColor(index, statusColor);

        return (
          <View key={index} style={styles.stepContainer}>
            {/* Step Circle */}
            <View
              style={[
                styles.stepCircle,
                {
                  borderColor: statusColor,
                  backgroundColor:
                    index < currentStep
                      ? statusColor
                      : index === currentStep
                      ? "white"
                      : "white",
                },
              ]}
            >
              <Icon name={icons[index]} size={24} color={iconColorValue} />
            </View>

            {/* Connector Line */}
            {index < stepLabels.length - 1 && (
              <View
                style={[
                  styles.connector,
                  {
                    backgroundColor:
                      index < currentStep ? statusColor : "#C7C7CC",
                  },
                ]}
              />
            )}

            {/* Step Label */}
            <View style={styles.labelWrapper}>
              <Text
                numberOfLines={2}
                style={[
                  styles.stepLabel,
                  {
                    color:
                      index < currentStep
                        ? statusColor
                        : index === currentStep
                        ? statusColor
                        : "#8E8E93",
                  },
                ]}
              >
                {label}
              </Text>
            </View>
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 16,
  },
  stepContainer: {
    alignItems: "center",
    position: "relative",
    width: STEP_WIDTH,
  },
  stepCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
    zIndex: 1,
  },
  connector: {
    position: "absolute",
    height: 2,
    top: 24,
    left: "50%",
    right: "-50%",
    zIndex: 0,
  },
  labelWrapper: {
    height: 36,
    justifyContent: "center",
    alignItems: "center",
  },
  stepLabel: {
    fontSize: 12,
    textAlign: "center",
    maxWidth: STEP_WIDTH - 16,
  },
});
