import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Gap, SectionTitle } from "../../components/atoms";
import { PageHeader } from "../../components/molecules";
import type { RootStackParamList } from "../../redux/types/global";
import { styles } from "./style";

type ManageDataNavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function ManageDataPage(): React.JSX.Element {
  const navigation = useNavigation<ManageDataNavigationProp>();

  const dataSections = [
    {
      id: "basic_information",
      title: "Basic Information",
      description: "Personal details and contact information",
      icon: "person-outline",
    },
    {
      id: "address",
      title: "Address",
      description: "Current and permanent addresses",
      icon: "location-outline",
    },
    {
      id: "emergency_contact",
      title: "Emergency Contact",
      description: "Emergency contact information",
      icon: "call-outline",
    },
    {
      id: "payroll_account",
      title: "Payroll Account",
      description: "Bank account for salary payments",
      icon: "card-outline",
    },
    {
      id: "family",
      title: "Family",
      description: "Family member information",
      icon: "people-outline",
    },
    {
      id: "education",
      title: "Education",
      description: "Educational background and qualifications",
      icon: "school-outline",
    },
    {
      id: "social_security",
      title: "Social Security",
      description: "Social security and insurance information",
      icon: "shield-outline",
    },
    {
      id: "medical_record",
      title: "Medical Record",
      description: "Medical history and health information",
      icon: "medical-outline",
    },
    {
      id: "employment_info",
      title: "Employment Information",
      description: "Job details and employment history",
      icon: "briefcase-outline",
    },
  ];

  const handleSectionPress = (sectionId: string) => {
    navigation.navigate("EmployeeDataEdit", {
      section: sectionId as
        | "basic_information"
        | "address"
        | "emergency_contact"
        | "payroll_account"
        | "family"
        | "education"
        | "social_security"
        | "medical_record"
        | "employment_info",
    });
  };

  const handleBackPress = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <PageHeader title="Manage Data" onBackPress={handleBackPress} />
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
      >
        <SectionTitle title="Employee Data Sections" />
        <Gap size={16} />

        {dataSections.map((section) => (
          <TouchableOpacity
            key={section.id}
            style={styles.sectionCard}
            onPress={() => handleSectionPress(section.id)}
          >
            <View style={styles.sectionContent}>
              <View style={styles.sectionInfo}>
                <Text style={styles.sectionTitle}>{section.title}</Text>
                <Text style={styles.sectionDescription}>
                  {section.description}
                </Text>
              </View>
              <View style={styles.arrowContainer}>
                <Text style={styles.arrow}>›</Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}

        <Gap size={24} />
      </ScrollView>
    </SafeAreaView>
  );
}
