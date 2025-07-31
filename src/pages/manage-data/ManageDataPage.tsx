import { RootStackParamList } from "@/router/AppNavigator";
import { Ionicons } from "@expo/vector-icons";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { BottomSheet, Gap } from "../../components/atoms";
import {
  PageHeader,
  StatusType,
  TabContainer,
  TabItem,
} from "../../components/molecules";
import { useEmployeeData } from "../../hooks";
import { useESSAuth } from "../../hooks/useESSAuth";
import Colors from "../../utils/Colors";
import { styles } from "./style";

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
    emergency_contact: {
      hasTriedLoading: false,
      lastAttempt: 0,
      retryCount: 0,
    },
    payroll_account: { hasTriedLoading: false, lastAttempt: 0, retryCount: 0 },
    family: { hasTriedLoading: false, lastAttempt: 0, retryCount: 0 },
    education: { hasTriedLoading: false, lastAttempt: 0, retryCount: 0 },
    social_security: { hasTriedLoading: false, lastAttempt: 0, retryCount: 0 },
    medical_record: { hasTriedLoading: false, lastAttempt: 0, retryCount: 0 },
    employment_info: { hasTriedLoading: false, lastAttempt: 0, retryCount: 0 },
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

      console.log(`📡 Fetching ${section} data...`);
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
        "address",
        "emergency_contact",
        "payroll_account",
        "family",
        "education",
        "social_security",
        "medical_record",
        "employment_info",
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

      setSelectAll(newSelection.length === 9); // 9 total categories
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

  // Create a reusable download container component
  const renderDownloadContainer = (tabTitle: string) => (
    <View style={styles.downloadContainer}>
      <View style={styles.downloadContent}>
        <View style={styles.downloadInfo}>
          <View style={styles.pdfIconContainer}>
            <Ionicons name="document-text" size={24} color="#004AAD" />
          </View>
          <View>
            <Text style={styles.downloadTitle}>My {tabTitle} Data</Text>
            <Text style={styles.downloadSubtitle}>Last update 13 Mar 2025</Text>
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
  );

  // Create a reusable information header component
  const renderInformationHeader = (title: string) => (
    <View style={styles.informationHeader}>
      <Text style={styles.informationTitle}>{title}</Text>
      <TouchableOpacity style={styles.editButton} onPress={handleEditPress}>
        <Ionicons name="pencil" size={16} color="#FFFFFF" />
        <Text style={styles.editButtonText}>Edit</Text>
      </TouchableOpacity>
    </View>
  );

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

  // Render list item for arrays (family, education)
  const renderListItem = (
    title: string,
    items: any[],
    renderItem: (item: any, index: number) => React.ReactNode
  ) => (
    <View style={styles.formWrapper}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <Gap size={16} />
      {items && items.length > 0 ? (
        items.map((item, index) => (
          <View key={index}>
            {renderItem(item, index)}
            {index < items.length - 1 && <Gap size={20} />}
          </View>
        ))
      ) : (
        <View style={styles.placeholderCard}>
          <Text style={styles.placeholderText}>
            No {title.toLowerCase()} data available
          </Text>
        </View>
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
                <Text style={styles.downloadTitle}>My Basic Info Data</Text>
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
                      "https://static.vecteezy.com/system/resources/previews/036/459/918/non_2x/ai-generated-young-caucasian-woman-corporate-portrait-png.png",
                  }}
                  style={styles.profilePhoto}
                />
              </View>
              <View style={styles.nameSection}>
                <Text style={styles.nameLabel}>Name</Text>
                <Text style={styles.nameValue}>
                  {basicInformation?.employee_name || "Sarah Wijaya"}
                </Text>
              </View>
            </View>

            <Gap size={20} />

            {/* Form Fields Container - Same layout as EmployeeDataEdit but view-only */}
            <View style={styles.formWrapper}>
              {/* KTP Number Row */}
              {renderFieldRow(
                {
                  label: "KTP Number",
                  value: basicInformation?.id_number_ktp || "1234567890123456",
                },
                {
                  label: "Passport Number",
                  value: basicInformation?.passport_number || "A12345678",
                }
              )}

              {/* Private Email - Full Width */}
              {renderFieldFull({
                label: "Private Email",
                value:
                  basicInformation?.private_email ||
                  "example.employee@gmail.com",
              })}

              {/* Birth Place and Date Row */}
              {renderFieldRow(
                {
                  label: "Birth Place",
                  value: basicInformation?.place_of_birth || "Jakarta",
                },
                {
                  label: "Birth Date",
                  value: formatDate(
                    basicInformation?.birth_date || "1990-01-01"
                  ),
                }
              )}

              {/* Religion and Gender Row */}
              {renderFieldRow(
                {
                  label: "Religion",
                  value: basicInformation?.religion || "Islam",
                },
                {
                  label: "Gender",
                  value:
                    basicInformation?.gender === "male"
                      ? "Male"
                      : basicInformation?.gender === "female"
                      ? "Female"
                      : "Male",
                }
              )}

              {/* Marital Status and Nationality Row */}
              {renderFieldRow(
                {
                  label: "Marital Status",
                  value: basicInformation?.marital_status || "Single",
                },
                {
                  label: "Nationality",
                  value: basicInformation?.nationality || "Indonesia",
                }
              )}

              {/* Phone Numbers Row */}
              {renderFieldRow(
                {
                  label: "Main Phone",
                  value: basicInformation?.main_phone_number || "081234567890",
                },
                {
                  label: "Secondary Phone",
                  value:
                    basicInformation?.secondary_phone_number || "081298765432",
                }
              )}

              {/* Clothing Size */}
              {renderFieldRow({
                label: "Clothing Size",
                value: basicInformation?.clothing_size || "M",
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

  const AddressTab = () => {
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
          {/* Download Container */}
          {renderDownloadContainer("Address")}

          <Gap size={20} />
          {/* Address Information Header with Edit Button */}
          {renderInformationHeader("Address Information")}
          <Gap size={16} />

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
              <Gap size={12} />
              {renderFieldFull({
                label: "Address Detail",
                value:
                  address?.official_address?.detail ||
                  "Jalan Telekomunikasi No.1",
              })}
              {renderFieldRow(
                {
                  label: "Province",
                  value: address?.official_address?.province || "Jawa Barat",
                },
                {
                  label: "City",
                  value: address?.official_address?.city || "Bandung",
                }
              )}
              {renderFieldRow(
                {
                  label: "Sub District",
                  value: address?.official_address?.sub_district || "Coblong",
                },
                {
                  label: "Postal Code",
                  value: address?.official_address?.postal_code || "40135",
                }
              )}
              {renderFieldRow(
                {
                  label: "RT",
                  value: address?.official_address?.rt || "003",
                },
                {
                  label: "RW",
                  value: address?.official_address?.rw || "006",
                }
              )}

              <Gap size={20} />
              <Text style={styles.sectionSubtitle}>Domicile Address</Text>
              <Gap size={12} />
              {renderFieldFull({
                label: "Address Detail",
                value:
                  address?.domicile_address?.detail || "Jalan Merdeka No.5",
              })}
              {renderFieldRow(
                {
                  label: "Province",
                  value: address?.domicile_address?.province || "DKI Jakarta",
                },
                {
                  label: "City",
                  value: address?.domicile_address?.city || "Jakarta Pusat",
                }
              )}
              {renderFieldRow(
                {
                  label: "Sub District",
                  value: address?.domicile_address?.sub_district || "Gambir",
                },
                {
                  label: "Postal Code",
                  value: address?.domicile_address?.postal_code || "10210",
                }
              )}
              {renderFieldRow(
                {
                  label: "RT",
                  value: address?.domicile_address?.rt || "005",
                },
                {
                  label: "RW",
                  value: address?.domicile_address?.rw || "002",
                }
              )}
            </View>
          ) : (
            renderErrorStateWithCountdown(
              "address",
              "Address information will be displayed here"
            )
          )}
          <Gap size={64} />
        </View>
      </ScrollView>
    );
  };

  const EmergencyContactTab = () => {
    // Load emergency contact data when this tab is accessed with delay
    useEffect(() => {
      if (isAuthenticated && !tabStates.emergency_contact.hasTriedLoading) {
        fetchSectionWithDelay("emergency_contact");
      }
    }, [isAuthenticated]);

    return (
      <ScrollView
        style={styles.tabContent}
        showsVerticalScrollIndicator={false}
      >
        <Gap size={20} />
        <View style={styles.content}>
          {/* Download Container */}
          {renderDownloadContainer("Emergency Contact")}

          <Gap size={20} />
          {/* Emergency Contact Header with Edit Button */}
          {renderInformationHeader("Emergency Contact Information")}
          <Gap size={16} />
          {loading.emergencyContact ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color={Colors.primary.main} />
              <Text style={styles.loadingText}>
                Loading emergency contact...
              </Text>
            </View>
          ) : emergencyContact ? (
            <View style={styles.formWrapper}>
              <Text style={styles.sectionSubtitle}>Emergency Contact</Text>
              <Gap size={12} />
              {renderFieldRow(
                {
                  label: "Name",
                  value: emergencyContact?.name || "David Chen",
                },
                {
                  label: "Relationship",
                  value: emergencyContact?.relationship || "Brother",
                }
              )}
              {renderFieldFull({
                label: "Phone Number",
                value: emergencyContact?.phone_number || "08123456789",
              })}
              {renderFieldFull({
                label: "Address",
                value: emergencyContact?.address || "Jl. Mawar No. 10, Jakarta",
              })}
            </View>
          ) : (
            renderErrorStateWithCountdown(
              "emergency_contact",
              "Emergency contact will be displayed here"
            )
          )}
          <Gap size={64} />
        </View>
      </ScrollView>
    );
  };

  const PayrollAccountTab = () => {
    // Load payroll account data when this tab is accessed with delay
    useEffect(() => {
      if (isAuthenticated && !tabStates.payroll_account.hasTriedLoading) {
        fetchSectionWithDelay("payroll_account");
      }
    }, [isAuthenticated]);

    return (
      <ScrollView
        style={styles.tabContent}
        showsVerticalScrollIndicator={false}
      >
        <Gap size={20} />
        <View style={styles.content}>
          {/* Download Container */}
          {renderDownloadContainer("Payroll Account")}

          <Gap size={20} />
          {/* Payroll Account Header with Edit Button */}
          {renderInformationHeader("Payroll Account Information")}
          <Gap size={16} />
          {loading.payrollAccount ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color={Colors.primary.main} />
              <Text style={styles.loadingText}>Loading payroll account...</Text>
            </View>
          ) : payrollAccount ? (
            <View style={styles.formWrapper}>
              <Text style={styles.sectionSubtitle}>Bank Account</Text>
              <Gap size={12} />
              {renderFieldRow(
                {
                  label: "Bank Name",
                  value: payrollAccount?.bank_name || "BCA",
                },
                {
                  label: "Account Number",
                  value: payrollAccount?.bank_account_number || "1234567890",
                }
              )}
              {renderFieldFull({
                label: "Account Holder Name",
                value: payrollAccount?.account_holder_name || "Ahmad Rahman",
              })}

              <Gap size={20} />
              <Text style={styles.sectionSubtitle}>Tax Information</Text>
              <Gap size={12} />
              {renderFieldRow(
                {
                  label: "Tax Status",
                  value: payrollAccount?.tax_status || "TK/0",
                },
                {
                  label: "Tax Number (NPWP)",
                  value: payrollAccount?.tax_number || "321654987123000",
                }
              )}
            </View>
          ) : (
            renderErrorStateWithCountdown(
              "payroll_account",
              "Payroll account will be displayed here"
            )
          )}
          <Gap size={64} />
        </View>
      </ScrollView>
    );
  };

  const FamilyTab = () => {
    // Load family data when this tab is accessed with delay
    useEffect(() => {
      if (isAuthenticated && !tabStates.family.hasTriedLoading) {
        fetchSectionWithDelay("family");
      }
    }, [isAuthenticated]);

    // // Mock family data based on API contract
    // const mockFamily = [
    //   {
    //     name: "Fatimah Azzahra",
    //     gender: "female",
    //     birth_date: "1965-10-12",
    //     place_of_birth: "Bandung",
    //     address: "Jl. Bunga No. 8",
    //     occupation: "Ibu Rumah Tangga",
    //     relation: "Ibu",
    //     marital_status: "Married",
    //     member_sequence: 1,
    //     telkomedika_card_number: "TKM123456",
    //     telkomedika_member_status: "Active",
    //   },
    //   {
    //     name: "Muhammad Rizki",
    //     gender: "male",
    //     birth_date: "1960-03-20",
    //     place_of_birth: "Jakarta",
    //     address: "Jl. Bunga No. 8",
    //     occupation: "Wiraswasta",
    //     relation: "Ayah",
    //     marital_status: "Married",
    //     member_sequence: 2,
    //     telkomedika_card_number: "TKM654321",
    //     telkomedika_member_status: "Active",
    //   },
    // ];

    return (
      <ScrollView
        style={styles.tabContent}
        showsVerticalScrollIndicator={false}
      >
        <Gap size={20} />
        <View style={styles.content}>
          {/* Download Container */}
          {renderDownloadContainer("Family")}

          <Gap size={20} />
          {/* Family Information Header with Edit Button */}
          {renderInformationHeader("Family Information")}
          <Gap size={16} />
          {loading.family ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color={Colors.primary.main} />
              <Text style={styles.loadingText}>
                Loading family information...
              </Text>
            </View>
          ) : (
            renderListItem(
              "Family Members",
              family || [], // Use family data or empty array
              (member, index) => (
                <View style={styles.formWrapper}>
                  <Text style={styles.sectionSubtitle}>
                    {member.relation} {index + 1}
                  </Text>
                  <Gap size={12} />
                  {renderFieldRow(
                    { label: "Name", value: member.name },
                    {
                      label: "Gender",
                      value: member.gender === "female" ? "Female" : "Male",
                    }
                  )}
                  {renderFieldRow(
                    {
                      label: "Birth Date",
                      value: formatDate(member.birth_date),
                    },
                    { label: "Birth Place", value: member.place_of_birth }
                  )}
                  {renderFieldRow(
                    { label: "Relation", value: member.relation },
                    { label: "Marital Status", value: member.marital_status }
                  )}
                  {renderFieldFull({
                    label: "Occupation",
                    value: member.occupation,
                  })}
                  {renderFieldFull({ label: "Address", value: member.address })}
                  {renderFieldRow(
                    {
                      label: "Telkomedika Card",
                      value: member.telkomedika_card_number,
                    },
                    { label: "Status", value: member.telkomedika_member_status }
                  )}
                </View>
              )
            )
          )}
          <Gap size={64} />
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

    // Mock education data based on API contract
    // const mockEducation = [
    //   {
    //     level: "S1",
    //     major: "Teknik Informatika",
    //     institution: "Universitas Indonesia",
    //     start_year: 2008,
    //     end_year: 2012,
    //   },
    //   {
    //     level: "SMA",
    //     major: "IPA",
    //     institution: "SMAN 1 Jakarta",
    //     start_year: 2005,
    //     end_year: 2008,
    //   },
    // ];

    return (
      <ScrollView
        style={styles.tabContent}
        showsVerticalScrollIndicator={false}
      >
        <Gap size={20} />
        <View style={styles.content}>
          {/* Download Container */}
          {renderDownloadContainer("Education")}

          <Gap size={20} />
          {/* Education Information Header with Edit Button */}
          {renderInformationHeader("Education Information")}
          <Gap size={16} />
          {loading.education ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color={Colors.primary.main} />
              <Text style={styles.loadingText}>
                Loading education information...
              </Text>
            </View>
          ) : (
            renderListItem(
              "Education History",
              education || [],
              (edu, index) => (
                <View style={styles.formWrapper}>
                  <Text style={styles.sectionSubtitle}>
                    {edu.level} - {edu.institution}
                  </Text>
                  <Gap size={12} />
                  {renderFieldRow(
                    { label: "Level", value: edu.level },
                    { label: "Major", value: edu.major }
                  )}
                  {renderFieldFull({
                    label: "Institution",
                    value: edu.institution,
                  })}
                  {renderFieldRow(
                    { label: "Start Year", value: edu.start_year?.toString() },
                    { label: "End Year", value: edu.end_year?.toString() }
                  )}
                </View>
              )
            )
          )}
          <Gap size={64} />
        </View>
      </ScrollView>
    );
  };

  const SocialSecurityTab = () => {
    // Load social security data when this tab is accessed with delay
    useEffect(() => {
      if (isAuthenticated && !tabStates.social_security.hasTriedLoading) {
        fetchSectionWithDelay("social_security");
      }
    }, [isAuthenticated]);

    return (
      <ScrollView
        style={styles.tabContent}
        showsVerticalScrollIndicator={false}
      >
        <Gap size={20} />
        <View style={styles.content}>
          {/* Download Container */}
          {renderDownloadContainer("Social Security")}

          <Gap size={20} />
          {/* Social Security Information Header with Edit Button */}
          {renderInformationHeader("Social Security Information")}
          <Gap size={16} />
          {loading.socialSecurity ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color={Colors.primary.main} />
              <Text style={styles.loadingText}>Loading social security...</Text>
            </View>
          ) : (
            <View style={styles.formWrapper}>
              <Text style={styles.sectionSubtitle}>Telkomedika</Text>
              <Gap size={12} />
              {renderFieldFull({
                label: "Telkomedika Card Number",
                value: socialSecurity?.telkomedika_card_number,
              })}

              <Gap size={20} />
              <Text style={styles.sectionSubtitle}>BPJS Ketenagakerjaan</Text>
              <Gap size={12} />
              {renderFieldRow({
                label: "BPJS TK Number",
                value: socialSecurity?.bpjs_tk_number,
              })}

              <Gap size={20} />
              <Text style={styles.sectionSubtitle}>BPJS Kesehatan</Text>
              <Gap size={12} />
              {renderFieldFull({
                label: "BPJS Health Number",
                value: socialSecurity?.bpjs_health_number,
              })}
            </View>
          )}
          <Gap size={64} />
        </View>
      </ScrollView>
    );
  };

  const MedicalRecordTab = () => {
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
          {/* Download Container */}
          {renderDownloadContainer("Medical Record")}

          <Gap size={20} />
          {/* Medical Record Information Header with Edit Button */}
          {renderInformationHeader("Medical Record Information")}
          <Gap size={16} />
          {loading.medicalRecord ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color={Colors.primary.main} />
              <Text style={styles.loadingText}>Loading medical records...</Text>
            </View>
          ) : (
            <View style={styles.formWrapper}>
              <Text style={styles.sectionSubtitle}>
                Basic Health Information
              </Text>
              <Gap size={12} />
              {renderFieldRow(
                {
                  label: "Blood Type",
                  value: medicalRecord?.blood_type,
                },
                {
                  label: "Health Status",
                  value: medicalRecord?.health_status,
                }
              )}
              {renderFieldRow(
                {
                  label: "Height (cm)",
                  value: medicalRecord?.height?.toString(),
                },
                {
                  label: "Weight (kg)",
                  value: medicalRecord?.weight?.toString(),
                }
              )}
              {renderFieldRow(
                {
                  label: "Head Size",
                  value: medicalRecord?.head_size,
                },
                {
                  label: "Has Disability",
                  value: medicalRecord?.has_disability,
                }
              )}
              {renderFieldFull({
                label: "Last MCU Date",
                // value: formatDate(
                //   medicalRecord?.last_mcu_date
                // ),
              })}

              <Gap size={20} />
              <Text style={styles.sectionSubtitle}>
                Health Concerns & Treatment
              </Text>
              <Gap size={12} />
              {renderFieldFull({
                label: "Health Concern",
                value: medicalRecord?.health_concern,
              })}
              {renderFieldFull({
                label: "Medical Treatment Record",
                value: medicalRecord?.medical_treatment_record,
              })}
            </View>
          )}
          <Gap size={64} />
        </View>
      </ScrollView>
    );
  };

  const EmploymentInfoTab = () => {
    // Load employment info data when this tab is accessed with delay
    useEffect(() => {
      if (isAuthenticated && !tabStates.employment_info.hasTriedLoading) {
        fetchSectionWithDelay("employment_info");
      }
    }, [isAuthenticated]);

    // Add debugging
    useEffect(() => {
      console.log("🔍 EmploymentInfoTab - employmentInfo:", employmentInfo);
      console.log(
        "🔍 EmploymentInfoTab - loading.employmentInfo:",
        loading.employmentInfo
      );
      console.log("🔍 EmploymentInfoTab - error:", error);
    }, [employmentInfo, loading.employmentInfo, error]);

    return (
      <ScrollView
        style={styles.tabContent}
        showsVerticalScrollIndicator={false}
      >
        <Gap size={20} />
        <View style={styles.content}>
          {/* Download Container */}
          {renderDownloadContainer("Employment Info")}

          <Gap size={20} />
          {/* Employment Information Header with Edit Button */}
          {renderInformationHeader("Employment Information")}
          <Gap size={16} />

          {loading.employmentInfo ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color={Colors.primary.main} />
              <Text style={styles.loadingText}>
                Loading employment information...
              </Text>
            </View>
          ) : employmentInfo ? (
            // Show real data
            <View style={styles.formWrapper}>
              <Text style={styles.sectionSubtitle}>Employee Identity</Text>
              <Gap size={12} />
              {renderFieldRow(
                {
                  label: "NIK",
                  value: String(employmentInfo.nik), // Convert to string
                },
                {
                  label: "NIK Telkom",
                  value: String(employmentInfo.nik_telkom), // Convert to string
                }
              )}
              {renderFieldFull({
                label: "Business Email",
                value: employmentInfo.business_email,
              })}

              <Gap size={20} />
              <Text style={styles.sectionSubtitle}>Organization</Text>
              <Gap size={12} />
              {renderFieldRow(
                {
                  label: "Directorate",
                  value: employmentInfo.directorate,
                },
                {
                  label: "Business Unit",
                  value: employmentInfo.business_unit,
                }
              )}
              {renderFieldFull({
                label: "Division",
                value: employmentInfo.division,
              })}

              <Gap size={20} />
              <Text style={styles.sectionSubtitle}>Position & Grade</Text>
              <Gap size={12} />
              {renderFieldRow(
                {
                  label: "Position",
                  value: employmentInfo.position,
                },
                {
                  label: "Level",
                  value: employmentInfo.level,
                }
              )}
              {renderFieldRow(
                {
                  label: "Grade",
                  value: String(employmentInfo.grade), // Convert to string
                },
                {
                  label: "Band Position",
                  value: employmentInfo.band_position,
                }
              )}
              {renderFieldFull({
                label: "Supervisor",
                value: employmentInfo.supervisor,
              })}

              <Gap size={20} />
              <Text style={styles.sectionSubtitle}>Employment Dates</Text>
              <Gap size={12} />
              {renderFieldRow(
                {
                  label: "Join Date",
                  value: formatDate(employmentInfo.join_date),
                },
                {
                  label: "Start Date",
                  value: formatDate(employmentInfo.start_date),
                }
              )}
              {renderFieldRow(
                {
                  label: "Grade Date",
                  value: formatDate(employmentInfo.grade_date),
                },
                {
                  label: "Band Position Date",
                  value: formatDate(employmentInfo.band_position_date),
                }
              )}
              {renderFieldRow(
                {
                  label: "Status",
                  value: employmentInfo.status,
                },
                {
                  label: "Reason In",
                  value: employmentInfo.reason_employee_in,
                }
              )}
            </View>
          ) : (
            // Show error state when no data
            renderErrorStateWithCountdown(
              "employment_info",
              "Employment information will be displayed here"
            )
          )}
          <Gap size={64} />
        </View>
      </ScrollView>
    );
  };

  const tabs: TabItem[] = [
    {
      id: "basic_information",
      title: "Basic Info",
      component: BasicInformationTab,
    },
    { id: "address", title: "Address", component: AddressTab },
    {
      id: "emergency_contact",
      title: "Emergency",
      component: EmergencyContactTab,
    },
    { id: "payroll_account", title: "Payroll", component: PayrollAccountTab },
    { id: "family", title: "Family", component: FamilyTab },
    {
      id: "education",
      title: "Education",
      component: EducationTab,
    },
    {
      id: "social_security",
      title: "Social Sec.",
      component: SocialSecurityTab,
    },
    { id: "medical_record", title: "Medical", component: MedicalRecordTab },
    {
      id: "employment_info",
      title: "Employment",
      component: EmploymentInfoTab,
    },
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
      >
        <ScrollView
          style={styles.downloadContent}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
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

          {/* Categories List */}
          <View style={styles.categoriesList}>
            {[
              {
                id: "basic_information",
                title: "Basic Information",
                description: "Name, KTP, passport, birth info, contact details",
                icon: "person",
              },
              {
                id: "address",
                title: "Address",
                description: "Official and domicile address information",
                icon: "location",
              },
              {
                id: "emergency_contact",
                title: "Emergency Contact",
                description: "Emergency contact person and details",
                icon: "call",
              },
              {
                id: "payroll_account",
                title: "Payroll Account",
                description: "Bank account and tax information",
                icon: "card",
              },
              {
                id: "family",
                title: "Family",
                description: "Family members and dependents",
                icon: "people-circle",
              },
              {
                id: "education",
                title: "Education",
                description: "Education history and qualifications",
                icon: "school",
              },
              {
                id: "social_security",
                title: "Social Security",
                description: "BPJS and Telkomedika information",
                icon: "shield",
              },
              {
                id: "medical_record",
                title: "Medical Records",
                description: "Health status and medical information",
                icon: "medical",
              },
              {
                id: "employment_info",
                title: "Employment Info",
                description: "Job position and employment details",
                icon: "briefcase",
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
        </ScrollView>
      </BottomSheet>
    </SafeAreaView>
  );
}
