// ESSMobile/src/hooks/useHistoryData.ts
import { useState, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { RootState, AppDispatch } from "../redux/store";
import { fetchHistoryData } from "../redux/actions/historyActions";
import { HistoryItem } from "../redux/types";
import { FilterStatus } from "../components/molecules";

export const useHistoryData = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState<FilterStatus>("all");
  const [page, setPage] = useState(1);

  // Select history data from Redux store
  const {
    data: historyData,
    loading,
    error,
  } = useSelector((state: RootState) => state.history);

  // Fetch history data
  const fetchHistory = () => {
    // Map FilterStatus to API status
    const apiStatus = selectedFilter === "all" ? "" : selectedFilter;

    dispatch(
      fetchHistoryData({
        page,
        status: apiStatus,
      })
    ).catch((error) => {
      // Handle authentication error
      if (error.payload === "Authentication required") {
        // Redirect to login page
        navigation.reset({
          index: 0,
          routes: [{ name: "LoginPage" }] as any,
        });
      }
    });
  };

  // Initial and filter/page change data fetch
  useEffect(() => {
    fetchHistory();
  }, [dispatch, selectedFilter, page]);

  // Filtered and searched data
  const filteredData = useMemo(() => {
    let filtered = historyData;

    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (item: HistoryItem) =>
          item.request_id.toLowerCase().includes(query) ||
          item.update.toLowerCase().includes(query) ||
          item.date_change.toLowerCase().includes(query)
      );
    }

    return filtered;
  }, [historyData, searchQuery]);

  // Methods to update state
  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
  };

  const handleFilterChange = (filter: FilterStatus) => {
    setSelectedFilter(filter);
    setPage(1); // Reset to first page when filter changes
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  // Refresh method
  const refreshData = () => {
    fetchHistory();
  };

  return {
    // Data
    historyData: filteredData,
    originalData: historyData,

    // State
    loading,
    error,
    searchQuery,
    selectedFilter,
    page,

    // Methods
    setSearchQuery,
    setSelectedFilter,
    setPage,
    handleSearchChange,
    handleFilterChange,
    handlePageChange,
    refreshData,
  };
};
