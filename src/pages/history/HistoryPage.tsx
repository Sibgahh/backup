// ESSMobile/src/pages/history/HistoryPage.tsx
import React from "react";
import { View, FlatList, Text, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { RootStackParamList } from "@/router/AppNavigator";
import { Gap } from "../../components/atoms";
import {
  PageHeader,
  HistoryItem,
  HistoryItemData,
  HistoryStatus,
  SearchFilter,
} from "../../components/molecules";
import { styles } from "./style";
import { useHistoryData } from "../../hooks";

export default function HistoryPage(): React.JSX.Element {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  // Use the custom hook
  const {
    historyData,
    loading,
    error,
    searchQuery,
    selectedFilter,
    handleSearchChange,
    handleFilterChange,
  } = useHistoryData();

  // Transform API history data to match HistoryItemData
  const transformedHistoryData: HistoryItemData[] = historyData.map((item) => ({
    id: item.request_id,
    documentType: ["education", "employee", "medical", "contact"].includes(
      item.update
    )
      ? (item.update as HistoryItemData["documentType"])
      : "employee",
    title: item.request_id,
    description: item.reason_update,
    status: [
      "success",
      "approved",
      "rejected",
      "draft",
      "waiting_approval",
    ].includes(item.status)
      ? (item.status as HistoryStatus)
      : "draft",
    date: new Date(item.date_change).toLocaleDateString("en-US", {
      weekday: "long",
      day: "numeric",
      month: "short",
      year: "numeric",
    }),
    time: new Date(item.date_change).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    }),
  }));

  const handleBackPress = () => {
    navigation.goBack();
  };

  const handleHistoryItemPress = (item: HistoryItemData) => {
    navigation.navigate("HistoryDetailsPage", { historyItem: item });
  };

  const renderHistoryItem = ({ item }: { item: HistoryItemData }) => (
    <View style={{ marginBottom: 12 }}>
      <HistoryItem item={item} onPress={handleHistoryItemPress} />
    </View>
  );

  // Render loading state
  if (loading) {
    return (
      <SafeAreaView style={styles.safeArea} edges={["top", "left", "right"]}>
        <StatusBar style="light" />
        <PageHeader title="History" onBackPress={handleBackPress} />
        <View style={styles.container}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      </SafeAreaView>
    );
  }

  // Render error state
  if (error) {
    return (
      <SafeAreaView style={styles.safeArea} edges={["top", "left", "right"]}>
        <StatusBar style="light" />
        <PageHeader title="History" onBackPress={handleBackPress} />
        <View style={styles.container}>
          <Text style={{ color: "red", textAlign: "center" }}>{error}</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "left", "right"]}>
      <StatusBar style="light" />

      <PageHeader title="History" onBackPress={handleBackPress} />

      <View style={styles.container}>
        {/* Search and Filter Component */}
        <SearchFilter
          searchQuery={searchQuery}
          onSearchChange={handleSearchChange}
          selectedFilter={selectedFilter}
          onFilterChange={handleFilterChange}
        />

        <FlatList
          data={transformedHistoryData}
          renderItem={renderHistoryItem}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.content}
          ItemSeparatorComponent={() => <Gap size={0} />}
          ListEmptyComponent={() => (
            <View style={{ alignItems: "center", marginTop: 20 }}>
              <Text>No history items found</Text>
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  );
}
