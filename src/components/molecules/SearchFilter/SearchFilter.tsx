import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "./style";

export type FilterStatus =
  | "all"
  | "draft"
  | "rejected"
  | "success"
  | "waiting_approval";

interface SearchFilterProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedFilter: FilterStatus;
  onFilterChange: (filter: FilterStatus) => void;
}

export const SearchFilter: React.FC<SearchFilterProps> = ({
  searchQuery,
  onSearchChange,
  selectedFilter,
  onFilterChange,
}) => {
  const filterOptions: { key: FilterStatus; label: string }[] = [
    { key: "all", label: "All" },
    { key: "draft", label: "Draft" },
    { key: "rejected", label: "Rejected" },
    { key: "success", label: "Success" },
    { key: "waiting_approval", label: "Waiting Approval" },
  ];

  return (
    <View style={styles.container}>
      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Ionicons
          name="search"
          size={20}
          color="#9E9E9E"
          style={styles.searchIcon}
        />
        <TextInput
          style={styles.searchInput}
          placeholder="Search ..."
          value={searchQuery}
          onChangeText={onSearchChange}
          placeholderTextColor="#9E9E9E"
        />
      </View>

      {/* Filter Container */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.filterScrollView}
        contentContainerStyle={styles.filterContainer}
      >
        {filterOptions.map((option) => (
          <TouchableOpacity
            key={option.key}
            style={[
              styles.filterButton,
              selectedFilter === option.key && styles.activeFilterButton,
            ]}
            onPress={() => onFilterChange(option.key)}
          >
            {selectedFilter === option.key && (
              <Ionicons
                name="checkmark"
                size={16}
                color="#004AAD"
                style={styles.checkIcon}
              />
            )}
            <Text
              style={[
                styles.filterText,
                selectedFilter === option.key && styles.activeFilterText,
              ]}
            >
              {option.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};
