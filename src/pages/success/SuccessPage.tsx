import React from "react";
import { StyleSheet, Text, View } from "react-native";

const SuccessPage: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Success</Text>
      <Text style={styles.subtitle}>Operation completed successfully</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
  },
});

export default SuccessPage;
