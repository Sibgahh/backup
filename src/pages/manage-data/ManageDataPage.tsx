import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  ScrollView,
  View,
  Text,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import {
  PageHeader,
  TabContainer,
  TabItem,
  UpdateStatus,
  StatusType,
} from "../../components/molecules";
import { Gap } from "../../components/atoms";
import { styles } from "./style";
import { RootStackParamList } from "@/router/AppNavigator";
import { useEmployeeData } from "../../hooks";
import { useESSAuth } from "../../hooks/useESSAuth";
import Colors from "../../utils/Colors";
import { BottomSheet } from "../../components/atoms";

// Types for tab states
interface TabLoadState {
  hasTriedLoading: boolean;
  lastAttempt: number;
  retryCount: number;
}

const RETRY_DELAY = 5000; // 5 seconds delay between retries
const MAX_AUTO_RETRIES = 3;

export default function ManageDataPage(): React.JSX.Element {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const { isAuthenticated } = useESSAuth();
  const {
    basicInformation,
    address,
    emergencyContact,
    payrollAccount,
    family,
    education,
    socialSecurity,
    medicalRecord,
    employmentInfo,
    loading,
    error,
    fetchSection,
    clearError,
  } = useEmployeeData();

  // You can change this status to test different states
  const [currentStatus, setCurrentStatus] = useState<StatusType>("draft");
  const [showDownloadSheet, setShowDownloadSheet] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectAll, setSelectAll] = useState(false);

  // Track tab loading states to prevent spam
  const [tabStates, setTabStates] = useState<Record<string, TabLoadState>>({
    address: { hasTriedLoading: false, lastAttempt: 0, retryCount: 0 },
    education: { hasTriedLoading: false, lastAttempt: 0, retryCount: 0 },
    medical_record: { hasTriedLoading: false, lastAttempt: 0, retryCount: 0 },
  });

  // Refs for cleanup
  const timeoutsRef = useRef<Record<string, ReturnType<typeof setTimeout>>>({});

  // Debug log
  useEffect(() => {
    console.log("🚀 ManageDataPage mounted");
    console.log("🔐 Is authenticated:", isAuthenticated);
  }, [isAuthenticated]);

  // Load basic information when component mounts and user is authenticated
  useEffect(() => {
    if (isAuthenticated) {
      console.log("✅ User authenticated, fetching basic information...");
      fetchSection("basic_information");
    } else {
      console.log("❌ User not authenticated, skipping data fetch");
    }
  }, [isAuthenticated, fetchSection]);

  // Handle errors
  useEffect(() => {
    if (error) {
      console.error("❌ Employee data error:", error);
      Alert.alert("Error Loading Data", error, [
        {
          text: "Retry",
          onPress: () => {
            clearError();
            if (isAuthenticated) {
              fetchSection("basic_information");
            }
          },
        },
        { text: "OK", onPress: () => clearError() },
      ]);
    }
  }, [error, clearError, isAuthenticated, fetchSection]);

  // Cleanup timeouts on unmount
  useEffect(() => {
    return () => {
      Object.values(timeoutsRef.current).forEach((timeout) => {
        if (timeout) clearTimeout(timeout);
      });
    };
  }, []);

  // Enhanced fetch with delay and retry logic
  const fetchSectionWithDelay = useCallback(
    (section: string, immediate = false) => {
      if (!isAuthenticated) return;

      const now = Date.now();
      const tabState = tabStates[section];

      // Clear any existing timeout for this section
      if (timeoutsRef.current[section]) {
        clearTimeout(timeoutsRef.current[section]);
        delete timeoutsRef.current[section];
      }

      // Check if we should delay the request
      const shouldDelay =
        !immediate &&
        tabState.hasTriedLoading &&
        now - tabState.lastAttempt < RETRY_DELAY;

      if (shouldDelay) {
        const remainingDelay = RETRY_DELAY - (now - tabState.lastAttempt);
        console.log(
          `⏰ Delaying ${section} fetch by ${remainingDelay}ms to prevent spam`
        );

        timeoutsRef.current[section] = setTimeout(() => {
          delete timeoutsRef.current[section];
          fetchSectionWithDelay(section, true);
        }, remainingDelay);
        return;
      }

      // Update tab state
      setTabStates((prev) => ({
        ...prev,
        [section]: {
          hasTriedLoading: true,
          lastAttempt: now,
          retryCount: immediate ? 0 : prev[section].retryCount,
        },
      }));

      console.log(`�� Fetching ${section} data...`);
      fetchSection(section);
    },
    [isAuthenticated, fetchSection, tabStates]
  );

  // Download button handler
  const handleDownloadPress = () => {
    console.log("📥 Download button pressed");
    setShowDownloadSheet(true);
  };

  // Download data handler
  const handleDownloadData = (selectedCategories: string[]) => {
    console.log("📥 Downloading categories:", selectedCategories);

    // Here you would implement the actual download logic
    Alert.alert(
      "Download Started",
      `Preparing download for ${selectedCategories.length} categories. You will receive an email when ready.`,
      [{ text: "OK" }]
    );

    // Close the sheet after download
    setShowDownloadSheet(false);
  };

  // Select all handler
  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedCategories([]);
      setSelectAll(false);
    } else {
      const allCategoryIds = [
        "basic_information",
        "contact",
        "education",
        "medical_records",
        "family",
      ];
      setSelectedCategories(allCategoryIds);
      setSelectAll(true);
    }
  };

  // Category toggle handler
  const handleCategoryToggle = (categoryId: string) => {
    setSelectedCategories((prev) => {
      const newSelection = prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId];

      setSelectAll(newSelection.length === 5); // 5 total categories
      return newSelection;
    });
  };

  // Manual retry function
  const handleManualRetry = useCallback(
    (section: string) => {
      console.log(`🔄 Manual retry for ${section}`);
      clearError();

      // Reset retry count and fetch immediately
      setTabStates((prev) => ({
        ...prev,
        [section]: {
          ...prev[section],
          retryCount: 0,
        },
      }));

      fetchSectionWithDelay(section, true);
    },
    [clearError, fetchSectionWithDelay]
  );

  // Function to cycle through statuses for demo
  const handleStatusChange = () => {
    const statuses: StatusType[] = [
      "draft",
      "in_review",
      "rejected",
      "success",
    ];
    const currentIndex = statuses.indexOf(currentStatus);
    const nextIndex = (currentIndex + 1) % statuses.length;
    setCurrentStatus(statuses[nextIndex]);
  };

  // Navigate to EmployeeDataEdit for editing
  const handleEditPress = () => {
    navigation.navigate("EmployeeDataEdit" as never);
  };

  // Format date for display
  const formatDate = (dateString: string) => {
    if (!dateString) return "N/A";
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("en-GB");
    } catch {
      return dateString;
    }
  };

  // Manual retry function for basic information
  const handleRetry = () => {
    console.log("🔄 Manual retry for basic information");
    clearError();
    fetchSection("basic_information");
  };

  // Render retry button component
  const renderRetryButton = (section: string, text: string = "Load Data") => (
    <TouchableOpacity
      style={styles.loadButton}
      onPress={() => handleManualRetry(section)}
      disabled={loading[section as keyof typeof loading]}
    >
      {loading[section as keyof typeof loading] ? (
        <ActivityIndicator size="small" color="#FFFFFF" />
      ) : (
        <>
          <Ionicons
            name="refresh-outline"
            size={16}
            color="#FFFFFF"
            style={{ marginRight: 8 }}
          />
          <Text style={styles.loadButtonText}>{text}</Text>
        </>
      )}
    </TouchableOpacity>
  );

  // Render error state with countdown
  const renderErrorStateWithCountdown = (
    section: string,
    errorText: string
  ) => {
    const tabState = tabStates[section];
    const now = Date.now();
    const timeSinceLastAttempt = now - tabState.lastAttempt;
    const remainingDelay = Math.max(0, RETRY_DELAY - timeSinceLastAttempt);
    const shouldShowCountdown = tabState.hasTriedLoading && remainingDelay > 0;

    return (
      <View style={styles.placeholderCard}>
        <Ionicons name="alert-circle-outline" size={48} color={Colors.error} />
        <Gap size={12} />
        <Text style={styles.placeholderText}>{errorText}</Text>
        {shouldShowCountdown ? (
          <>
            <Gap size={8} />
            <Text style={styles.countdownText}>
              Auto-retry in {Math.ceil(remainingDelay / 1000)}s
            </Text>
          </>
        ) : (
          <>
            <Gap size={16} />
            {renderRetryButton(section, "Retry Loading")}
          </>
        )}
      </View>
    );
  };

  // Render field row using EmployeeDataEdit styling
  const renderFieldRow = (leftField: any, rightField?: any) => (
    <View style={styles.formRow}>
      <View style={styles.inputHalf}>
        <View style={styles.viewOnlyField}>
          <Text style={styles.fieldLabel}>{leftField.label}</Text>
          <Text style={styles.fieldValue}>{leftField.value || "N/A"}</Text>
        </View>
      </View>
      {rightField && (
        <View style={styles.inputHalf}>
          <View style={styles.viewOnlyField}>
            <Text style={styles.fieldLabel}>{rightField.label}</Text>
            <Text style={styles.fieldValue}>{rightField.value || "N/A"}</Text>
          </View>
        </View>
      )}
    </View>
  );

  // Render field full width with optional icon
  const renderFieldFull = (field: any, showIcon?: string) => (
    <View style={styles.viewOnlyField}>
      <Text style={styles.fieldLabel}>{field.label}</Text>
      {showIcon ? (
        <View style={styles.fieldValueWithIcon}>
          <Text style={styles.fieldValueText}>{field.value || "N/A"}</Text>
          <Ionicons
            name={showIcon as any}
            size={20}
            color={Colors.primary.main}
            style={styles.fieldIcon}
          />
        </View>
      ) : (
        <Text style={styles.fieldValue}>{field.value || "N/A"}</Text>
      )}
    </View>
  );

  // Inline tab components with status containers
  const BasicInformationTab = () => (
    <ScrollView style={styles.tabContent} showsVerticalScrollIndicator={false}>
      <Gap size={20} />
      <View style={styles.content}>
        {/* Download Container */}
        <View style={styles.downloadContainer}>
          <View style={styles.downloadContent}>
            <View style={styles.downloadInfo}>
              <View style={styles.pdfIconContainer}>
                <Ionicons name="document-text" size={24} color="#004AAD" />
              </View>
              <View>
                <Text style={styles.downloadTitle}>My Contact Data</Text>
                <Text style={styles.downloadSubtitle}>
                  Last update 13 Mar 2025
                </Text>
              </View>
            </View>
          </View>
          <TouchableOpacity
            style={styles.downloadButton}
            onPress={handleDownloadPress}
          >
            <Ionicons name="download-outline" size={24} color="#004AAD" />
          </TouchableOpacity>
        </View>

        <Gap size={20} />
        {/* Your Information Header with Edit Button */}
        <View style={styles.informationHeader}>
          <Text style={styles.informationTitle}>Your Information</Text>
          <TouchableOpacity style={styles.editButton} onPress={handleEditPress}>
            <Ionicons name="pencil" size={16} color="#FFFFFF" />
            <Text style={styles.editButtonText}>Edit</Text>
          </TouchableOpacity>
        </View>
        <Gap size={16} />
        {/* Loading State */}
        {loading.basicInformation ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={Colors.primary.main} />
            <Text style={styles.loadingText}>Loading your information...</Text>
          </View>
        ) : basicInformation ? (
          <>
            {/* Profile Photo Section - Same as EmployeeDataEdit but view-only */}
            <View style={styles.photoSection}>
              <View style={styles.photoContainer}>
                <Image
                  source={{
                    uri:
                      basicInformation?.professional_photo ||
                      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
                  }}
                  style={styles.profilePhoto}
                />
              </View>
              <View style={styles.nameSection}>
                <Text style={styles.nameLabel}>Name</Text>
                <Text style={styles.nameValue}>
                  {basicInformation?.employee_name || "Loading..."}
                </Text>
              </View>
            </View>

            <Gap size={20} />

            {/* Form Fields Container - Same layout as EmployeeDataEdit but view-only */}
            <View style={styles.formWrapper}>
              {/* KTP Number Row */}
              {renderFieldRow(
                { label: "KTP Number", value: basicInformation?.id_number_ktp },
                {
                  label: "Passport Number",
                  value: basicInformation?.passport_number,
                }
              )}

              {/* Private Email - Full Width */}
              {renderFieldFull({
                label: "Private Email",
                value: basicInformation?.private_email,
              })}

              {/* Birth Place and Date Row */}
              {renderFieldRow(
                {
                  label: "Birth Place",
                  value: basicInformation?.place_of_birth,
                },
                {
                  label: "Birth Date",
                  value: formatDate(basicInformation?.birth_date || ""),
                }
              )}

              {/* Religion and Gender Row */}
              {renderFieldRow(
                { label: "Religion", value: basicInformation?.religion },
                {
                  label: "Gender",
                  value:
                    basicInformation?.gender === "male"
                      ? "Male"
                      : basicInformation?.gender === "female"
                      ? "Female"
                      : basicInformation?.gender,
                }
              )}

              {/* Marital Status and Nationality Row */}
              {renderFieldRow(
                {
                  label: "Marital Status",
                  value: basicInformation?.marital_status,
                },
                { label: "Nationality", value: basicInformation?.nationality }
              )}

              {/* Phone Numbers Row */}
              {renderFieldRow(
                {
                  label: "Main Phone",
                  value: basicInformation?.main_phone_number,
                },
                {
                  label: "Secondary Phone",
                  value: basicInformation?.secondary_phone_number,
                }
              )}

              {/* Clothing Size */}
              {renderFieldRow({
                label: "Clothing Size",
                value: basicInformation?.clothing_size,
              })}
            </View>
          </>
        ) : (
          /* No Data State */
          <View style={styles.placeholderCard}>
            <Text style={styles.placeholderText}>
              No employee data available
            </Text>
            {renderRetryButton("basic_information", "Retry Loading")}
          </View>
        )}
        <Gap size={64} />
      </View>
    </ScrollView>
  );

  const ContactTab = () => {
    // Load address data when this tab is accessed with delay
    useEffect(() => {
      if (isAuthenticated && !tabStates.address.hasTriedLoading) {
        fetchSectionWithDelay("address");
      }
    }, [isAuthenticated]);

    return (
      <ScrollView
        style={styles.tabContent}
        showsVerticalScrollIndicator={false}
      >
        <Gap size={20} />
        <View style={styles.content}>
          {loading.address ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color={Colors.primary.main} />
              <Text style={styles.loadingText}>
                Loading address information...
              </Text>
            </View>
          ) : address ? (
            <View style={styles.formWrapper}>
              <Text style={styles.sectionSubtitle}>Official Address</Text>
              {renderFieldFull({
                label: "Address Detail",
                value: address?.official_address?.detail,
              })}
              {renderFieldRow(
                {
                  label: "Province",
                  value: address?.official_address?.province,
                },
                { label: "City", value: address?.official_address?.city }
              )}
              {renderFieldRow(
                {
                  label: "Sub District",
                  value: address?.official_address?.sub_district,
                },
                {
                  label: "Postal Code",
                  value: address?.official_address?.postal_code,
                }
              )}

              <Gap size={20} />
              <Text style={styles.sectionSubtitle}>Domicile Address</Text>
              {renderFieldFull({
                label: "Address Detail",
                value: address?.domicile_address?.detail,
              })}
              {renderFieldRow(
                {
                  label: "Province",
                  value: address?.domicile_address?.province,
                },
                { label: "City", value: address?.domicile_address?.city }
              )}
              {renderFieldRow(
                {
                  label: "Sub District",
                  value: address?.domicile_address?.sub_district,
                },
                {
                  label: "Postal Code",
                  value: address?.domicile_address?.postal_code,
                }
              )}
            </View>
          ) : (
            renderErrorStateWithCountdown(
              "address",
              "Contact information will be displayed here"
            )
          )}
        </View>
      </ScrollView>
    );
  };

  const EducationTab = () => {
    // Load education data when this tab is accessed with delay
    useEffect(() => {
      if (isAuthenticated && !tabStates.education.hasTriedLoading) {
        fetchSectionWithDelay("education");
      }
    }, [isAuthenticated]);

    return (
      <ScrollView
        style={styles.tabContent}
        showsVerticalScrollIndicator={false}
      >
        <Gap size={20} />
        <View style={styles.content}>
          {loading.education ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color={Colors.primary.main} />
              <Text style={styles.loadingText}>
                Loading education information...
              </Text>
            </View>
          ) : education && education.length > 0 ? (
            <View style={styles.formWrapper}>
              {education.map((edu: any, index: number) => (
                <View key={index} style={{ marginBottom: 20 }}>
                  <Text style={styles.sectionSubtitle}>
                    Education {index + 1}
                  </Text>
                  {renderFieldRow(
                    { label: "Institution", value: edu?.institution_name },
                    { label: "Degree", value: edu?.degree }
                  )}
                  {renderFieldRow(
                    { label: "Field of Study", value: edu?.field_of_study },
                    { label: "GPA", value: edu?.gpa }
                  )}
                  {renderFieldRow(
                    { label: "Start Year", value: edu?.start_year },
                    { label: "End Year", value: edu?.end_year }
                  )}
                </View>
              ))}
            </View>
          ) : (
            renderErrorStateWithCountdown(
              "education",
              "Education details will be displayed here"
            )
          )}
        </View>
      </ScrollView>
    );
  };

  const MedicalTab = () => {
    // Load medical data when this tab is accessed with delay
    useEffect(() => {
      if (isAuthenticated && !tabStates.medical_record.hasTriedLoading) {
        fetchSectionWithDelay("medical_record");
      }
    }, [isAuthenticated]);

    return (
      <ScrollView
        style={styles.tabContent}
        showsVerticalScrollIndicator={false}
      >
        <Gap size={20} />
        <View style={styles.content}>
          {loading.medicalRecord ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color={Colors.primary.main} />
              <Text style={styles.loadingText}>Loading medical records...</Text>
            </View>
          ) : medicalRecord ? (
            <View style={styles.formWrapper}>
              {renderFieldRow(
                { label: "Blood Type", value: medicalRecord?.blood_type },
                { label: "Height (cm)", value: medicalRecord?.height }
              )}
              {renderFieldRow(
                { label: "Weight (kg)", value: medicalRecord?.weight },
                {
                  label: "Health Status",
                  value: medicalRecord?.health_status,
                }
              )}
              {renderFieldFull({
                label: "Health Concern",
                value: medicalRecord?.health_concern || "None",
              })}
              {renderFieldFull({
                label: "Medical Treatment Record",
                value: medicalRecord?.medical_treatment_record || "None",
              })}
            </View>
          ) : (
            renderErrorStateWithCountdown(
              "medical_record",
              "Medical records will be displayed here"
            )
          )}
        </View>
      </ScrollView>
    );
  };

  const tabs: TabItem[] = [
    {
      id: "basic_information",
      title: "Basic Information",
      component: BasicInformationTab,
    },
    { id: "contact", title: "Contact", component: ContactTab },
    {
      id: "education",
      title: "Education",
      component: EducationTab,
    },
    { id: "medical", title: "Medical R...", component: MedicalTab },
  ];

  const handleBackPress = () => {
    navigation.goBack();
  };

  const handleHistoryPress = () => {
    navigation.navigate("HistoryPage" as never);
  };

  const handleTabChange = (tabId: string | number) => {
    console.log("Tab changed to:", tabId);
  };

  // Show authentication error if not logged in
  if (!isAuthenticated) {
    return (
      <SafeAreaView style={styles.safeArea} edges={["top", "left", "right"]}>
        <StatusBar style="light" />
        <PageHeader title="Profile Data" onBackPress={handleBackPress} />
        <View style={styles.container}>
          <View style={styles.content}>
            <View style={styles.placeholderCard}>
              <Ionicons
                name="lock-closed"
                size={48}
                color={Colors.neutral.grey400}
              />
              <Gap size={16} />
              <Text style={styles.placeholderText}>
                Please login to view your profile data
              </Text>
              <TouchableOpacity
                style={styles.loadButton}
                onPress={() => navigation.navigate("LoginPage" as never)}
              >
                <Text style={styles.loadButtonText}>Go to Login</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "left", "right"]}>
      <StatusBar style="light" />

      <PageHeader
        title="Profile Data"
        onBackPress={handleBackPress}
        trailingIcon="document-text"
        onTrailingPress={handleHistoryPress}
      />

      {/* Your existing container design with TabContainer inside */}
      <View style={styles.container}>
        <TabContainer
          tabs={tabs}
          initialTab="basic_information"
          onTabChange={handleTabChange}
          scrollable={true}
        />
      </View>

      {/* Download Data Sheet */}
      <BottomSheet
        visible={showDownloadSheet}
        onClose={() => setShowDownloadSheet(false)}
        title="Select Data to Download"
        message="Choose which categories of your data you'd like to download"
        icon="download"
        iconColor={Colors.primary.main}
        height={600}
        showCloseButton={true}
        scrollable={true} // ✅ Enable scrolling
        minHeight={400} // ✅ Set minimum height
        maxHeight={700} // ✅ Set maximum height
      >
        <View style={styles.downloadContent}>
          {/* Select All */}
          <TouchableOpacity
            style={styles.selectAllContainer}
            onPress={handleSelectAll}
          >
            <View style={styles.selectAllContent}>
              <View style={styles.checkboxContainer}>
                <View
                  style={[
                    styles.checkbox,
                    selectAll && styles.checkboxSelected,
                  ]}
                >
                  {selectAll && (
                    <Ionicons name="checkmark" size={16} color="white" />
                  )}
                </View>
              </View>
              <Text style={styles.selectAllText}>Select All</Text>
              {selectAll && (
                <Ionicons
                  name="checkmark-circle"
                  size={24}
                  color={Colors.primary.main}
                />
              )}
            </View>
          </TouchableOpacity>

          <Gap size={16} />

          {/* Categories List - Now scrollable */}
          <View style={styles.categoriesList}>
            {[
              {
                id: "employees",
                title: "Employees",
                description: "Name, email, phone number, date of birth",
                icon: "person",
              },
              {
                id: "contacts",
                title: "Contacts",
                description: "Name, email, phone number, date of birth",
                icon: "people",
              },
              {
                id: "education",
                title: "Education",
                description: "Schools, degrees, certifications",
                icon: "school",
              },
              {
                id: "medical_records",
                title: "Medical Records",
                description: "Name, email, phone number, date of birth",
                icon: "medical",
              },
              {
                id: "family",
                title: "Family",
                description: "Name, email, phone number, date of birth",
                icon: "people-circle",
              },
              // Add more categories to test scrolling
              {
                id: "documents",
                title: "Documents",
                description: "All related documents and files",
                icon: "document",
              },
              {
                id: "payroll",
                title: "Payroll",
                description: "Salary and payment information",
                icon: "card",
              },
              {
                id: "benefits",
                title: "Benefits",
                description: "Employee benefits and insurance",
                icon: "heart",
              },
            ].map((category) => {
              const isSelected = selectedCategories.includes(category.id);

              return (
                <TouchableOpacity
                  key={category.id}
                  style={styles.categoryItem}
                  onPress={() => handleCategoryToggle(category.id)}
                >
                  <View style={styles.categoryContent}>
                    <View style={styles.checkboxContainer}>
                      <View
                        style={[
                          styles.checkbox,
                          isSelected && styles.checkboxSelected,
                        ]}
                      >
                        {isSelected && (
                          <Ionicons name="checkmark" size={16} color="white" />
                        )}
                      </View>
                    </View>

                    <View style={styles.categoryInfo}>
                      <View style={styles.categoryHeader}>
                        <Ionicons
                          name={category.icon as any}
                          size={20}
                          color={Colors.primary.main}
                          style={styles.categoryIcon}
                        />
                        <Text style={styles.categoryTitle}>
                          {category.title}
                        </Text>
                      </View>
                      <Text style={styles.categoryDescription}>
                        {category.description}
                      </Text>
                    </View>

                    {isSelected && (
                      <Ionicons
                        name="checkmark-circle"
                        size={24}
                        color={Colors.primary.main}
                      />
                    )}
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>

          <Gap size={20} />

          {/* Download Button */}
          <TouchableOpacity
            style={[
              styles.downloadSheetButton,
              selectedCategories.length === 0 &&
                styles.downloadSheetButtonDisabled,
            ]}
            onPress={() => handleDownloadData(selectedCategories)}
            disabled={selectedCategories.length === 0}
          >
            <Ionicons name="download" size={20} color="white" />
            <Text style={styles.downloadSheetButtonText}>
              Download Selected Data
            </Text>
          </TouchableOpacity>

          <Text style={styles.infoText}>
            Data will be prepared and sent to your email
          </Text>
        </View>
        <Gap size={100} />
      </BottomSheet>
    </SafeAreaView>
  );
}
