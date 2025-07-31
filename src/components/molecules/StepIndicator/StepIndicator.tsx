import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

const { width } = Dimensions.get("window");
const STEP_WIDTH = (width - 64) / 3; // Accounting for horizontal padding

// Color mapping for different statuses
const STATUS_COLORS = {
  Draft: "#8E8E93", // Grey
  Submitted: "#007AFF", // Primary Blue
  "In Review": "#007AFF", // Primary Blue
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
}

export const StepIndicator: React.FC<StepIndicatorProps> = ({
  currentStep,
  icons,
  stepStatuses,
}) => {
  // Define default labels and allow overriding with specific statuses
  const stepLabels = [
    stepStatuses.step1 || "Draft/Submitted",
    "In Review", // Always constant
    stepStatuses.step3 || "Status", // Default to "Status"
  ];

  // Function to get color based on status
  const getStatusColor = (status: string, index: number) => {
    // If the step is not reached yet, use grey
    if (index > currentStep) return STATUS_COLORS["Status"];

    // Use the color from STATUS_COLORS, default to grey if not found
    return (
      STATUS_COLORS[status as keyof typeof STATUS_COLORS] ||
      STATUS_COLORS["Status"]
    );
  };

  return (
    <View style={styles.container}>
      {stepLabels.map((label, index) => {
        const statusColor = getStatusColor(label, index);

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
              <Icon
                name={icons[index]}
                size={24}
                color={
                  index < currentStep
                    ? "white"
                    : index === currentStep
                    ? statusColor
                    : "#C7C7CC"
                }
              />
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
