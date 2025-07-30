import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";
import Colors from "../../../utils/Colors";
import Fonts from "../../../utils/Fonts";

export interface TabItem {
  id: string | number;
  title: string;
  component: React.ComponentType;
}

interface TabContainerProps {
  tabs: TabItem[];
  initialTab?: string | number;
  onTabChange?: (tabId: string | number) => void;
  scrollable?: boolean;
}

export const TabContainer: React.FC<TabContainerProps> = ({
  tabs,
  initialTab,
  onTabChange,
  scrollable = true,
}) => {
  const [activeTab, setActiveTab] = useState(initialTab || tabs[0]?.id || 0);

  const handleTabPress = (tabId: string | number) => {
    setActiveTab(tabId);
    onTabChange?.(tabId);
  };

  const activeTabData = tabs.find((tab) => tab.id === activeTab);
  const ActiveTabComponent = activeTabData?.component;

  const renderTabs = () => {
    const tabElements = tabs.map((tab) => (
      <TouchableOpacity
        key={tab.id}
        style={[
          styles.tabButton,
          !scrollable && styles.flexTabButton,
          activeTab === tab.id && styles.activeTabButton,
        ]}
        onPress={() => handleTabPress(tab.id)}
      >
        <Text
          style={[styles.tabText, activeTab === tab.id && styles.activeTabText]}
        >
          {tab.title}
        </Text>
        {activeTab === tab.id && <View style={styles.tabIndicator} />}
      </TouchableOpacity>
    ));

    if (scrollable) {
      return (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.scrollableTabContainer}
          contentContainerStyle={styles.scrollableTabContent}
        >
          {tabElements}
        </ScrollView>
      );
    }

    return <View style={styles.tabContainer}>{tabElements}</View>;
  };

  return (
    <View style={styles.container}>
      {/* Tab Navigation */}
      <View style={styles.tabWrapper}>{renderTabs()}</View>

      {/* Tab Content with Border Radius */}
      <View style={styles.tabContent}>
        {ActiveTabComponent && <ActiveTabComponent />}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: 10,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },

  tabWrapper: {
    backgroundColor: "white",
    borderBottomWidth: 1,
    borderBottomColor: Colors.border.light,
    borderTopEndRadius: 10,
    borderTopStartRadius: 10,
  },

  tabContainer: {
    flexDirection: "row",
  },

  scrollableTabContainer: {
    flexGrow: 0,
  },

  scrollableTabContent: {
    flexDirection: "row",
    paddingHorizontal: 20,
  },

  tabButton: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    alignItems: "center",
    position: "relative",
    minWidth: 80,
  },

  flexTabButton: {
    flex: 1,
    paddingHorizontal: 8,
  },

  activeTabButton: {
    // Active tab styling handled by indicator
  },

  tabText: {
    ...Fonts.style.body2,
    color: Colors.text.secondary,
    textAlign: "center",
  },

  activeTabText: {
    ...Fonts.style.subtitle2,
    color: Colors.primary.main,
  },

  tabIndicator: {
    position: "absolute",
    bottom: 0,
    left: 8,
    right: 8,
    height: 3,
    backgroundColor: Colors.primary.main,
  },

  tabContent: {
    flex: 1,
    backgroundColor: Colors.background.default,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginTop: -1, // Slight overlap to hide the border line under active tab
    paddingTop: 1, // Compensate for the negative margin
  },
});
