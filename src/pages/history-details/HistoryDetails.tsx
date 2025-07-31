import { RootStackParamList } from "@/router/AppNavigator";
import { Ionicons } from "@expo/vector-icons";
import {
  NavigationProp,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Card, Gap } from "../../components/atoms";
import type { HistoryItemData } from "../../components/molecules";
import { PageHeader } from "../../components/molecules";
import { styles } from "./style";
import { StepIndicator } from "@/components/molecules/StepIndicator/StepIndicator";

// Enhanced data interfaces for detailed history
interface ChangeItem {
  field: string;
  before: string;
  after: string;
  status: "modified" | "added";
}

interface SubmittedFile {
  name: string;
  size: string;
  uploadDate: string;
  type: string;
}

interface EnhancedHistoryItemData extends HistoryItemData {
  requestId: string;
  dateChanged: string;
  update: string;
  reviewer: string;
  progressStep: "submitted" | "review" | "completed";
  changes: ChangeItem[];
  changeReason: string;
  submittedFiles: SubmittedFile[];
  hrReviewNotes?: string;
}

export default function HistoryDetailsPage(): React.JSX.Element {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const route = useRoute();
  const [currentStep, setCurrentStep] = useState(0); // 0-indexed steps
  const [stepStatuses, setStepStatuses] = useState({
    step1: "Draft",
    step2: "In Review",
    step3: "Status",
  });

  // Icons for each step (using Material Icons)
  const getStepIcons = () => {
    const icons = [
      "edit-note", // Draft/Submitted
      "visibility", // In review
      stepStatuses.step3 === "Rejected" ? "close" : "check-circle", // Conditional icon for step 3
    ];
    return icons;
  };

  // Get params with proper type checking
  const params = route.params as { historyItem?: HistoryItemData } | undefined;
  const historyItem = params?.historyItem;

  // If no valid history item, show error and navigate back
  if (!historyItem) {
    return (
      <SafeAreaView style={styles.safeArea} edges={["top", "left", "right"]}>
        <StatusBar style="light" />
        <PageHeader
          title="History Details"
          onBackPress={() => navigation.goBack()}
        />
        <View style={styles.container}>
          <View
            style={[
              styles.content,
              { justifyContent: "center", alignItems: "center" },
            ]}
          >
            <View style={styles.emptyContainer}>
              <Ionicons name="alert-circle" size={48} color="#F44336" />
              <Gap size={16} />
              <Text style={styles.emptyText}>No history item data found</Text>
              <Gap size={20} />
              <TouchableOpacity
                style={styles.actionButton}
                onPress={() => navigation.goBack()}
              >
                <Text style={styles.actionButtonText}>Go Back</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </SafeAreaView>
    );
  }

  // Mock enhanced data - in real app this would come from API
  const enhancedData: EnhancedHistoryItemData = {
    ...historyItem,
    requestId: "#ES-UP001",
    dateChanged: "Mar 14, 19:45",
    update: "Employees",
    reviewer: "John doe",
    progressStep: "review",
    changes: [
      {
        field: "NIK",
        before: "123456",
        after: "654321",
        status: "modified",
      },
      {
        field: "Birth Place",
        before: "Jakarta",
        after: "Bandung",
        status: "modified",
      },
      {
        field: "Phone Number",
        before: "",
        after: "081234567",
        status: "added",
      },
    ],
    changeReason: "ketikkan alasan perubahan",
    submittedFiles: [
      {
        name: "Kartu-keluarga.pdf",
        size: "2.4 MB",
        uploadDate: "Jan 15, 2024",
        type: "pdf",
      },
      {
        name: "Foto_KTP.jpg",
        size: "1.8 MB",
        uploadDate: "Jan 15, 2024",
        type: "image",
      },
    ],
    hrReviewNotes: undefined,
  };

  // const getStatusConfig = (status: string) => {
  //   switch (status) {
  //     case "draft":
  //       return {
  //         text: "Draft",
  //         backgroundColor: "#E3F2FD",
  //         textColor: "#004AAD",
  //         icon: "document-text" as const,
  //       };
  //     case "waiting_approval":
  //       return {
  //         text: "Waiting Approval",
  //         backgroundColor: "#FFF3E0",
  //         textColor: "#FF9800",
  //         icon: "time" as const,
  //       };
  //     case "rejected":
  //       return {
  //         text: "Rejected",
  //         backgroundColor: "#FFEBEE",
  //         textColor: "#F44336",
  //         icon: "close-circle" as const,
  //       };
  //     case "success":
  //       return {
  //         text: "Success",
  //         backgroundColor: "#E8F5E8",
  //         textColor: "#4CAF50",
  //         icon: "checkmark-circle" as const,
  //       };
  //     default:
  //       return {
  //         text: "Unknown",
  //         backgroundColor: "#F5F5F5",
  //         textColor: "#757575",
  //         icon: "help-circle" as const,
  //       };
  //   }
  // };

  const getFileIcon = (fileType: string) => {
    if (fileType === "pdf") return "document-text";
    if (fileType === "image") return "image";
    return "document";
  };

  const getChangeStatusConfig = (status: "modified" | "added") => {
    return status === "modified"
      ? { backgroundColor: "#004AAD", text: "Modified" }
      : { backgroundColor: "#4CAF50", text: "Added" };
  };

  const handleBackPress = () => {
    navigation.goBack();
  };

  const handleDownloadFile = (fileName: string) => {
    console.log("Download file:", fileName);
    // Implement download functionality
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "left", "right"]}>
      <StatusBar style="light" />

      <PageHeader title="History Details" onBackPress={handleBackPress} />

      <View style={styles.container}>
        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {/* Basic Info Card */}
          <Card style={styles.infoCard}>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>ID Request</Text>
              <Text style={styles.infoValue}>{enhancedData.requestId}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Date Changed</Text>
              <Text style={styles.infoValue}>{enhancedData.dateChanged}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Update</Text>
              <Text style={styles.infoValue}>{enhancedData.update}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Reviewer</Text>
              <Text style={styles.infoValue}>{enhancedData.reviewer}</Text>
            </View>
          </Card>
          <StepIndicator
            currentStep={currentStep}
            icons={getStepIcons()}
            stepStatuses={stepStatuses}
          />
          {/* Add your history details content here */}
          <View style={styles.contentContainer}>
            {/* Step 1 Status Selection */}
            {currentStep === 0 && (
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() =>
                    setStepStatuses((prev) => ({ ...prev, step1: "Draft" }))
                  }
                >
                  <Text style={styles.buttonText}>Set Draft</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() =>
                    setStepStatuses((prev) => ({ ...prev, step1: "Submitted" }))
                  }
                >
                  <Text style={styles.buttonText}>Set Submitted</Text>
                </TouchableOpacity>
              </View>
            )}

            {/* Step 3 Status Selection */}
            {currentStep === 2 && (
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() =>
                    setStepStatuses((prev) => ({ ...prev, step3: "Success" }))
                  }
                >
                  <Text style={styles.buttonText}>Set Success</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() =>
                    setStepStatuses((prev) => ({ ...prev, step3: "Rejected" }))
                  }
                >
                  <Text style={styles.buttonText}>Set Rejected</Text>
                </TouchableOpacity>
              </View>
            )}

            {/* Step Navigation Buttons */}
            <View style={styles.navigationContainer}>
              {currentStep > 0 && (
                <TouchableOpacity
                  style={styles.navigationButton}
                  onPress={() => setCurrentStep((prev) => prev - 1)}
                >
                  <Text style={styles.navigationButtonText}>Previous Step</Text>
                </TouchableOpacity>
              )}
              {currentStep < 2 && (
                <TouchableOpacity
                  style={styles.navigationButton}
                  onPress={() => setCurrentStep((prev) => prev + 1)}
                >
                  <Text style={styles.navigationButtonText}>Next Step</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>

          <Gap size={16} />

          {/* Changes Summary */}
          <Card style={styles.changesCard}>
            <Text style={styles.cardTitle}>Changes Summary</Text>
            <Gap size={16} />

            {enhancedData.changes.map((change, index) => {
              const statusConfig = getChangeStatusConfig(change.status);
              return (
                <View key={index} style={styles.changeItem}>
                  <View style={styles.changeHeader}>
                    <Text style={styles.changeField}>{change.field}</Text>
                    <View
                      style={[
                        styles.changeStatusBadge,
                        { backgroundColor: statusConfig.backgroundColor },
                      ]}
                    >
                      <Text style={styles.changeStatusText}>
                        {statusConfig.text}
                      </Text>
                    </View>
                  </View>
                  <Gap size={8} />
                  {change.status === "modified" && (
                    <View style={styles.changeValues}>
                      <View style={styles.changeValueItem}>
                        <Text style={styles.changeValueLabel}>Before:</Text>
                        <Text style={styles.changeValueText}>
                          {change.before}
                        </Text>
                      </View>
                      <View style={styles.changeValueItem}>
                        <Text style={styles.changeValueLabel}>After:</Text>
                        <Text
                          style={[
                            styles.changeValueText,
                            styles.changeValueAfter,
                          ]}
                        >
                          {change.after}
                        </Text>
                      </View>
                    </View>
                  )}
                  {change.status === "added" && (
                    <View style={styles.changeValues}>
                      <View style={styles.changeValueItem}>
                        <Text style={styles.changeValueLabel}>New:</Text>
                        <Text
                          style={[
                            styles.changeValueText,
                            styles.changeValueAfter,
                          ]}
                        >
                          {change.after}
                        </Text>
                      </View>
                    </View>
                  )}
                  {index < enhancedData.changes.length - 1 && (
                    <View style={styles.changeDivider} />
                  )}
                </View>
              );
            })}
          </Card>

          <Gap size={16} />

          {/* Change Reason */}
          <Card style={styles.reasonCard}>
            <Text style={styles.cardTitle}>Change Reason*</Text>
            <Gap size={12} />
            <Text style={styles.reasonText}>{enhancedData.changeReason}</Text>
          </Card>

          <Gap size={16} />

          {/* Submitted Files */}
          <Card style={styles.filesCard}>
            <Text style={styles.cardTitle}>Submitted files</Text>
            <Gap size={16} />

            {enhancedData.submittedFiles.map((file, index) => (
              <View key={index} style={styles.fileItem}>
                <View style={styles.fileIcon}>
                  <Ionicons
                    name={getFileIcon(file.type) as any}
                    size={24}
                    color="#004AAD"
                  />
                </View>
                <View style={styles.fileInfo}>
                  <Text style={styles.fileName}>{file.name}</Text>
                  <Text style={styles.fileDetails}>
                    {file.size} • Uploaded {file.uploadDate}
                  </Text>
                </View>
                <TouchableOpacity
                  style={styles.downloadButton}
                  onPress={() => handleDownloadFile(file.name)}
                >
                  <Ionicons name="download-outline" size={20} color="#004AAD" />
                </TouchableOpacity>
              </View>
            ))}
          </Card>

          <Gap size={16} />

          {/* HR Review Notes */}
          <Card style={styles.reviewCard}>
            <Text style={styles.cardTitle}>HR Review Notes</Text>
            <Gap size={16} />
            {enhancedData.hrReviewNotes ? (
              <Text style={styles.reviewText}>
                {enhancedData.hrReviewNotes}
              </Text>
            ) : (
              <View style={styles.noReviewContainer}>
                <Ionicons name="chatbubble-outline" size={24} color="#9E9E9E" />
                <Gap size={8} />
                <Text style={styles.noReviewText}>No messages yet</Text>
              </View>
            )}
          </Card>

          <Gap size={40} />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
