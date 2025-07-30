import React, { useState, useMemo } from "react";
import { View, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { RootStackParamList } from "@/router/AppNavigator";
import { Gap } from "../../components/atoms";
import {
  PageHeader,
  HistoryItem,
  HistoryItemData,
  SearchFilter,
  FilterStatus,
} from "../../components/molecules";
import { styles } from "./style";

export default function HistoryPage(): React.JSX.Element {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  // State for search and filter
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState<FilterStatus>("all");

  // Mock data - replace with actual data from your API/store
  const historyData: HistoryItemData[] = [
    {
      id: "1",
      documentType: "education",
      title: "#ES-UP001 - Employees Document",
      description: "Change of residential address due to relocation",
      status: "waiting_approval",
      date: "Friday, 20 Jun 2025",
      time: "10:30 AM",
    },
    {
      id: "2",
      documentType: "employee",
      title: "Employment Certificate",
      description: "Current employment verification",
      status: "rejected",
      date: "Friday, 20 Jun 2025",
      time: "02:15 PM",
    },
    {
      id: "3",
      documentType: "medical",
      title: "Health Record",
      description: "Annual health checkup report",
      status: "success",
      date: "Friday, 20 Jun 2025",
      time: "09:45 AM",
    },
    {
      id: "4",
      documentType: "contact",
      title: "Address Verification",
      description: "Current residence proof",
      status: "draft",
      date: "Friday, 20 Jun 2025",
      time: "04:20 PM",
    },
  ];

  // Filter and search logic
  const filteredData = useMemo(() => {
    let filtered = historyData;

    // Apply status filter
    if (selectedFilter !== "all") {
      filtered = filtered.filter((item) => item.status === selectedFilter);
    }

    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (item) =>
          item.title.toLowerCase().includes(query) ||
          item.description.toLowerCase().includes(query) ||
          item.date.toLowerCase().includes(query)
      );
    }

    return filtered;
  }, [historyData, selectedFilter, searchQuery]);

  const handleBackPress = () => {
    navigation.goBack();
  };

  const handleHistoryItemPress = (item: HistoryItemData) => {
    navigation.navigate("HistoryDetailsPage", { historyItem: item });
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
  };

  const handleFilterChange = (filter: FilterStatus) => {
    setSelectedFilter(filter);
  };

  const renderHistoryItem = ({ item }: { item: HistoryItemData }) => (
    <View style={{ marginBottom: 12 }}>
      <HistoryItem item={item} onPress={handleHistoryItemPress} />
    </View>
  );

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
          data={filteredData}
          renderItem={renderHistoryItem}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.content}
          ItemSeparatorComponent={() => <Gap size={0} />}
        />
      </View>
    </SafeAreaView>
  );
}
