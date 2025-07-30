import React from "react";
import { View, Text, StyleSheet, ViewStyle } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Card } from "../../atoms/Card";
import Colors from "@/utils/Colors";
import Fonts from "@/utils/Fonts";

interface ProgressItemProps {
  title: string;
  percentage: number;
  subtitle: string;
}

interface PerformanceCardProps {
  rating: number;
  progressItems: ProgressItemProps[];
  style?: ViewStyle;
}

export const PerformanceCard: React.FC<PerformanceCardProps> = ({
  rating,
  progressItems,
  style,
}) => {
  const renderStars = () => {
    const stars = [];
    const fullStars = Math.floor(rating);

    for (let i = 0; i < 5; i++) {
      stars.push(
        <Ionicons
          key={i}
          name={i < fullStars ? "star" : "star-outline"}
          size={20}
          color={i < fullStars ? "#4CAF50" : "#E0E0E0"}
        />
      );
    }
    return stars;
  };

  const renderProgressItem = (item: ProgressItemProps, index: number) => (
    <View key={index} style={styles.progressSection}>
      <View style={styles.progressHeader}>
        <Text style={styles.progressTitle}>{item.title}</Text>
        <Text style={styles.progressPercentage}>{item.percentage}%</Text>
      </View>
      <View style={styles.progressBarContainer}>
        <View style={styles.progressBar}>
          <View
            style={[styles.progressFill, { width: `${item.percentage}%` }]}
          />
        </View>
      </View>
      <Text style={styles.progressSubtext}>{item.subtitle}</Text>
    </View>
  );

  // Use StyleSheet.flatten to properly handle style arrays
  const containerStyle = StyleSheet.flatten([
    {
      marginHorizontal: 20,
      marginVertical: 16,
      borderWidth: 1,
      borderColor: Colors.neutral.grey200,
    },
    style,
  ]);

  return (
    <Card style={containerStyle}>
      {/* Rating Performance */}
      <View style={styles.ratingSection}>
        <View style={styles.ratingHeader}>
          <Text style={styles.ratingTitle}>Ratings Performance</Text>
        </View>
        <View style={styles.starsRow}>
          {renderStars()}
          <Text style={styles.ratingValue}>{rating}</Text>
        </View>
      </View>

      {/* Progress Items */}
      {progressItems.map(renderProgressItem)}
    </Card>
  );
};

const styles = StyleSheet.create({
  ratingSection: {
    marginBottom: 24,
  },
  ratingHeader: {
    marginBottom: 12,
  },
  ratingTitle: {
    ...Fonts.style.subtitle1,
    color: Colors.text.primary,
    fontWeight: "600",
  },
  starsRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  ratingValue: {
    ...Fonts.style.h4,
    color: "#4CAF50",
    fontWeight: "bold",
    marginLeft: 8,
  },
  progressSection: {
    marginBottom: 20,
  },
  progressHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  progressTitle: {
    ...Fonts.style.body1,
    color: Colors.text.primary,
    fontWeight: "500",
  },
  progressPercentage: {
    ...Fonts.style.h4,
    color: Colors.text.primary,
    fontWeight: "bold",
  },
  progressBarContainer: {
    marginBottom: 6,
  },
  progressBar: {
    height: 8,
    backgroundColor: Colors.neutral.grey200,
    borderRadius: 4,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#4CAF50",
    borderRadius: 4,
  },
  progressSubtext: {
    ...Fonts.style.caption,
    color: Colors.text.secondary,
  },
});
