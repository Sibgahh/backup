import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import * as DocumentPicker from "expo-document-picker";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
  Alert,
  Image,
  TextInput as RNTextInput,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  BottomSheet,
  Button,
  Dropdown,
  Gap,
  Popup,
  TextInput,
} from "../../components/atoms";
import { PageHeader } from "../../components/molecules";
import { useProfile } from "../../hooks";
import Colors from "../../utils/Colors";
import Fonts from "../../utils/Fonts";
import { styles } from "./style";

interface ProfileFormData {
  NAME: string;
  BIRTH_PLACE: string;
  BIRTH_DATE: string;
  GENDER: string;
  NO_KTP: string;
  PASSPORT_NUMBER: string;
  RELIGION: string;
  MARITAL_STATUS: string;
  NATIONALITY: string;
  CLOTHING_SIZE: string;
  MAIN_PHONE_NUMBER: string;
  SECONDARY_PHONE_NUMBER: string;
  PRIVATE_EMAIL: string;
  KTP_DOC: string;
}

interface UploadedDocument {
  name: string;
  size: string;
  uploadDate: string;
  type: string; // Add this field
  uri?: string; // Add this for the actual file URI
}

// Dummy employee data (same as ManageDataPage)
const initialEmployeeData: ProfileFormData = {
  NAME: "Sibgah Rabbani Kusuma",
  BIRTH_PLACE: "Tangerang",
  BIRTH_DATE: "12/12/1992",
  GENDER: "Male",
  NO_KTP: "1234567890123456",
  PASSPORT_NUMBER: "A12345678",
  RELIGION: "Islam",
  MARITAL_STATUS: "Single",
  NATIONALITY: "Indonesian",
  CLOTHING_SIZE: "L",
  MAIN_PHONE_NUMBER: "+62 812-3456-7890",
  SECONDARY_PHONE_NUMBER: "+62 821-9876-5432",
  PRIVATE_EMAIL: "sibgah@example.com",
  KTP_DOC: "Available",
};

const PHOTO_URL =
  "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80";

const religionOptions = [
  { label: "Islam", value: "Islam" },
  { label: "Christianity", value: "Christianity" },
  { label: "Catholicism", value: "Catholicism" },
  { label: "Hinduism", value: "Hinduism" },
  { label: "Buddhism", value: "Buddhism" },
  { label: "Others", value: "Others" },
];

const genderOptions = [
  { label: "Male", value: "Male" },
  { label: "Female", value: "Female" },
];

const maritalStatusOptions = [
  { label: "Single", value: "Single" },
  { label: "Married", value: "Married" },
  { label: "Divorced", value: "Divorced" },
  { label: "Widowed", value: "Widowed" },
];

const nationalityOptions = [
  { label: "Indonesian", value: "Indonesian" },
  { label: "Malaysian", value: "Malaysian" },
  { label: "Singaporean", value: "Singaporean" },
  { label: "Others", value: "Others" },
];

const clothingSizeOptions = [
  { label: "XS", value: "XS" },
  { label: "S", value: "S" },
  { label: "M", value: "M" },
  { label: "L", value: "L" },
  { label: "XL", value: "XL" },
  { label: "XXL", value: "XXL" },
];

const documentTypeOptions = [
  { label: "KTP", value: "ktp" },
  { label: "Passport", value: "passport" },
  { label: "Family Card", value: "family_card" },
  { label: "Birth Certificate", value: "birth_certificate" },
  { label: "Other", value: "other" },
];

export default function EmployeeDataEdit(): React.JSX.Element {
  const navigation = useNavigation();
  const { updateProfile } = useProfile();

  const [formData, setFormData] =
    useState<ProfileFormData>(initialEmployeeData);
  const [originalData] = useState<ProfileFormData>(initialEmployeeData);
  const [hasChanges, setHasChanges] = useState(false);
  const [showExitPopup, setShowExitPopup] = useState(false);
  const [showDocumentSheet, setShowDocumentSheet] = useState(false);

  // Document upload states
  const [changeReason, setChangeReason] = useState("");
  const [selectedDocumentType, setSelectedDocumentType] = useState("");
  const [uploadedDocuments, setUploadedDocuments] = useState<
    UploadedDocument[]
  >([]);
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  // Check if any field has been changed
  useEffect(() => {
    const dataChanged = Object.keys(formData).some(
      (key) =>
        formData[key as keyof ProfileFormData] !==
        originalData[key as keyof ProfileFormData]
    );
    setHasChanges(dataChanged);
  }, [formData, originalData]);

  const handleInputChange = (field: keyof ProfileFormData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleBackPress = () => {
    if (!hasChanges) {
      navigation.goBack();
    } else {
      setShowExitPopup(true);
    }
  };

  const handleSaveAsDraft = () => {
    console.log("Saving as draft:", formData);
    setShowExitPopup(false);
    navigation.goBack();
    setTimeout(() => {
      Alert.alert("Draft Saved", "Your changes have been saved as draft!");
    }, 500);
  };

  const handleDiscardChanges = () => {
    setFormData(originalData);
    setShowExitPopup(false);
    navigation.goBack();
  };

  const handleClosePopup = () => {
    setShowExitPopup(false);
  };

  const handleSave = () => {
    // Show document upload bottom sheet
    setShowDocumentSheet(true);
  };

  const handlePhotoChange = () => {
    Alert.alert(
      "Change Photo",
      "Photo change functionality will be implemented here"
    );
  };

  const handleDatePickerPress = (field: string) => {
    Alert.alert(
      "Date Picker",
      `Date picker for ${field} will be implemented here`
    );
  };
  const handleChooseFile = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: "*/*",
        copyToCacheDirectory: true,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        if (!selectedDocumentType) {
          Alert.alert("Error", "Please select a document type first.");
          return;
        }

        const asset = result.assets[0];
        const newDoc: UploadedDocument = {
          name: asset.name,
          size: `${(asset.size ? asset.size / (1024 * 1024) : 0).toFixed(
            1
          )} MB`,
          uploadDate: new Date().toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          }),
          type: selectedDocumentType, // Assign the selected document type
          uri: asset.uri,
        };

        setUploadedDocuments([...uploadedDocuments, newDoc]);

        // Reset the selected document type after successful upload
        setSelectedDocumentType("");

        // Optional: Show success message
        Alert.alert(
          "Success",
          "Document uploaded successfully! Please select document type for next upload."
        );
      }
    } catch (error) {
      Alert.alert("Error", "Failed to pick document");
    }
  };

  const handleRemoveDocument = (index: number) => {
    const newDocs = uploadedDocuments.filter((_, i) => i !== index);
    setUploadedDocuments(newDocs);
  };

  const handleSendRequest = () => {
    if (!changeReason.trim()) {
      Alert.alert("Error", "Please provide a reason for the change.");
      return;
    }
    if (uploadedDocuments.length === 0) {
      Alert.alert("Error", "Please upload at least one document.");
      return;
    }
    if (!selectedDocumentType) {
      Alert.alert("Error", "Please select a document type.");
      return;
    }
    if (!agreedToTerms) {
      Alert.alert("Error", "Please agree to the terms and conditions.");
      return;
    }

    // Process the request
    setShowDocumentSheet(false);

    // Navigate to success page instead of showing alert
    navigation.navigate("SuccessPage" as never);
  };

  // Define popup actions for exit confirmation
  const exitPopupActions = [
    {
      title: "Discard Changes",
      onPress: handleDiscardChanges,
      variant: "secondary" as const,
    },
    {
      title: "Save as draft",
      onPress: handleSaveAsDraft,
      variant: "primary" as const,
    },
  ];

  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "left", "right"]}>
      <StatusBar style="light" />
      <PageHeader title="Edit Profile Data" onBackPress={handleBackPress} />

      <View style={styles.container}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 20 }}
        >
          {/* Tab Header */}
          <View style={styles.tabHeader}>
            <View style={styles.tabItem}>
              <Ionicons name="business" size={20} color={Colors.primary.main} />
              <Text style={styles.tabText}>Employees</Text>
            </View>
          </View>

          {/* Warning Message */}
          <View style={styles.warningContainer}>
            <View style={styles.warningIcon}>
              <Ionicons name="warning" size={20} color="#FFA500" />
            </View>
            <Text style={styles.warningText}>
              Please review your changes carefully - once submitted, edits
              cannot be made until your current request is processed.
            </Text>
          </View>

          {/* Section Header */}
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Your Information</Text>
            <Text style={styles.editingText}>Editing</Text>
          </View>

          {/* Profile Photo Section */}
          <View style={styles.photoSection}>
            <View style={styles.photoContainer}>
              <Image source={{ uri: PHOTO_URL }} style={styles.profilePhoto} />
              <TouchableOpacity
                style={styles.cameraButton}
                onPress={handlePhotoChange}
              >
                <Ionicons
                  name="camera"
                  size={16}
                  color={Colors.neutral.white}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.nameSection}>
              <Text style={styles.nameLabel}>Name</Text>
              <Text style={styles.nameValue}>{formData.NAME}</Text>
            </View>
          </View>

          <Text style={styles.photoHint}>Tap to change photo</Text>

          <Gap size={20} />

          {/* Form Fields Container */}
          <View style={styles.formWrapper}>
            {/* KTP Number Row */}
            <View style={styles.formRow}>
              <View style={styles.inputHalf}>
                <TextInput
                  label="KTP Number"
                  value={formData.NO_KTP}
                  onChangeText={(value: string) =>
                    handleInputChange("NO_KTP", value)
                  }
                  keyboardType="numeric"
                  containerStyle={styles.inputContainer}
                />
              </View>
              <View style={styles.inputHalf}>
                <TextInput
                  label="Passport Number"
                  value={formData.PASSPORT_NUMBER}
                  onChangeText={(value: string) =>
                    handleInputChange("PASSPORT_NUMBER", value)
                  }
                  containerStyle={styles.inputContainer}
                />
              </View>
            </View>

            {/* Private Email - Full Width */}
            <TextInput
              label="Private Email"
              value={formData.PRIVATE_EMAIL}
              onChangeText={(value: string) =>
                handleInputChange("PRIVATE_EMAIL", value)
              }
              keyboardType="email-address"
              containerStyle={styles.inputContainer}
            />

            {/* Birth Place and Date Row */}
            <View style={styles.formRow}>
              <View style={styles.inputHalf}>
                <TextInput
                  label="Birth Place"
                  value={formData.BIRTH_PLACE}
                  onChangeText={(value: string) =>
                    handleInputChange("BIRTH_PLACE", value)
                  }
                  containerStyle={styles.inputContainer}
                />
              </View>
              <View style={styles.inputHalf}>
                <TextInput
                  label="Birth Date"
                  value={formData.BIRTH_DATE}
                  onChangeText={(value: string) =>
                    handleInputChange("BIRTH_DATE", value)
                  }
                  placeholder="DD/MM/YYYY"
                  containerStyle={styles.inputContainer}
                  rightIcon="calendar-outline"
                  onRightIconPress={() => handleDatePickerPress("Birth Date")}
                  rightIconColor={Colors.primary.main}
                />
              </View>
            </View>

            {/* Religion and Gender Row */}
            <View style={styles.formRow}>
              <View style={styles.inputHalf}>
                <Dropdown
                  label="Religion"
                  value={formData.RELIGION}
                  options={religionOptions}
                  onSelect={(value: string) =>
                    handleInputChange("RELIGION", value)
                  }
                  containerStyle={styles.inputContainer}
                />
              </View>
              <View style={styles.inputHalf}>
                <Dropdown
                  label="Gender"
                  value={formData.GENDER}
                  options={genderOptions}
                  onSelect={(value: string) =>
                    handleInputChange("GENDER", value)
                  }
                  containerStyle={styles.inputContainer}
                />
              </View>
            </View>

            {/* Marital Status and Nationality Row */}
            <View style={styles.formRow}>
              <View style={styles.inputHalf}>
                <Dropdown
                  label="Marital Status"
                  value={formData.MARITAL_STATUS}
                  options={maritalStatusOptions}
                  onSelect={(value: string) =>
                    handleInputChange("MARITAL_STATUS", value)
                  }
                  containerStyle={styles.inputContainer}
                />
              </View>
              <View style={styles.inputHalf}>
                <Dropdown
                  label="Nationality"
                  value={formData.NATIONALITY}
                  options={nationalityOptions}
                  onSelect={(value: string) =>
                    handleInputChange("NATIONALITY", value)
                  }
                  containerStyle={styles.inputContainer}
                />
              </View>
            </View>

            {/* Phone Numbers Row */}
            <View style={styles.formRow}>
              <View style={styles.inputHalf}>
                <TextInput
                  label="Main Phone"
                  value={formData.MAIN_PHONE_NUMBER}
                  onChangeText={(value: string) =>
                    handleInputChange("MAIN_PHONE_NUMBER", value)
                  }
                  keyboardType="phone-pad"
                  containerStyle={styles.inputContainer}
                />
              </View>
              <View style={styles.inputHalf}>
                <TextInput
                  label="Secondary Phone"
                  value={formData.SECONDARY_PHONE_NUMBER}
                  onChangeText={(value: string) =>
                    handleInputChange("SECONDARY_PHONE_NUMBER", value)
                  }
                  keyboardType="phone-pad"
                  containerStyle={styles.inputContainer}
                />
              </View>
            </View>

            {/* Clothing Size */}
            <View style={styles.formRow}>
              <View style={styles.inputHalf}>
                <Dropdown
                  label="Clothing Size"
                  value={formData.CLOTHING_SIZE}
                  options={clothingSizeOptions}
                  onSelect={(value: string) =>
                    handleInputChange("CLOTHING_SIZE", value)
                  }
                  containerStyle={styles.inputContainer}
                />
              </View>
              <View style={styles.inputHalf}>
                {/* Empty space for alignment */}
              </View>
            </View>
          </View>

          {/* Save Button */}
          <View>
            <Button
              title="Save Changes"
              onPress={handleSave}
              variant="primary"
              size="large"
              icon="checkmark-circle-outline"
              style={{ borderRadius: 8 }}
              disabled={!hasChanges} // Disable when no changes
            />
          </View>
        </ScrollView>
      </View>

      {/* Exit Popup */}
      <Popup
        visible={showExitPopup}
        onClose={handleClosePopup}
        title="Are you sure you want to go back?"
        message="All changes will be lost if you continue."
        icon="information-circle"
        iconColor="#FFA500"
        actions={exitPopupActions}
      />

      {/* Document Upload Bottom Sheet */}
      <BottomSheet
        visible={showDocumentSheet}
        onClose={() => setShowDocumentSheet(false)}
        title="Employees"
        height={600}
        showCloseButton={false}
      >
        <ScrollView
          style={bottomSheetStyles.scrollContainer}
          showsVerticalScrollIndicator={false}
        >
          {/* Requirements Section */}
          <View style={bottomSheetStyles.requirementsSection}>
            <Text style={bottomSheetStyles.requirementsTitle}>
              Ketentuan Update Data Personal
            </Text>
            <Text style={bottomSheetStyles.requirementItem}>
              • Unggah dokumen pendukung.
            </Text>
            <Text style={bottomSheetStyles.requirementItem}>
              • Cantumkan persetujuan data pribadi.
            </Text>
            <Text style={bottomSheetStyles.requirementItem}>
              • Tunggu proses verifikasi
            </Text>
            <Text style={bottomSheetStyles.requirementItem}>
              • Status perubahan akan ditampilkan di notifikasi dan tab History.
            </Text>
          </View>

          {/* Change Reason */}
          <View style={bottomSheetStyles.section}>
            <Text style={bottomSheetStyles.sectionLabel}>
              Change Reason<Text style={bottomSheetStyles.required}>*</Text>
            </Text>
            <RNTextInput
              style={bottomSheetStyles.textArea}
              placeholder="ketikkan alasan perubahan"
              value={changeReason}
              onChangeText={setChangeReason}
              multiline
              numberOfLines={4}
              textAlignVertical="top"
            />
          </View>

          {/* Upload Document */}
          <View style={bottomSheetStyles.section}>
            <Text style={bottomSheetStyles.sectionLabel}>Upload Document</Text>
            <Text style={bottomSheetStyles.uploadHint}>
              Add your documents here, and you can upload up to 5 files max
            </Text>

            {/* Document Type Selector */}
            <View style={bottomSheetStyles.section}>
              <Text style={bottomSheetStyles.sectionLabel}>
                Select your document type
              </Text>
              <Dropdown
                label=""
                value={selectedDocumentType}
                options={documentTypeOptions}
                onSelect={setSelectedDocumentType}
                placeholder="Select Type document"
              />
            </View>

            <TouchableOpacity
              style={[
                bottomSheetStyles.uploadArea,
                !selectedDocumentType && bottomSheetStyles.uploadAreaDisabled,
              ]}
              onPress={handleChooseFile}
              disabled={!selectedDocumentType}
            >
              <View style={bottomSheetStyles.uploadIcon}>
                <Ionicons
                  name="attach"
                  size={32}
                  color={
                    selectedDocumentType
                      ? Colors.primary.main
                      : Colors.neutral.grey400
                  }
                />
              </View>
              <Text
                style={[
                  bottomSheetStyles.uploadText,
                  !selectedDocumentType && bottomSheetStyles.uploadTextDisabled,
                ]}
              >
                {selectedDocumentType
                  ? "Choose a file"
                  : "Select document type first"}
              </Text>
              <View
                style={[
                  bottomSheetStyles.browseButton,
                  !selectedDocumentType &&
                    bottomSheetStyles.browseButtonDisabled,
                ]}
              >
                <Text
                  style={[
                    bottomSheetStyles.browseButtonText,
                    !selectedDocumentType &&
                      bottomSheetStyles.browseButtonTextDisabled,
                  ]}
                >
                  Browse file
                </Text>
              </View>
            </TouchableOpacity>
          </View>

          {/* Uploaded Documents List */}
          {uploadedDocuments.map((doc, index) => (
            <View key={index} style={bottomSheetStyles.documentItem}>
              <View style={bottomSheetStyles.documentIcon}>
                <Ionicons
                  name="document-text"
                  size={24}
                  color={Colors.primary.main}
                />
              </View>
              <View style={bottomSheetStyles.documentInfo}>
                <Text style={bottomSheetStyles.documentName}>{doc.name}</Text>
                <Text style={bottomSheetStyles.documentType}>
                  Type:{" "}
                  {documentTypeOptions.find((opt) => opt.value === doc.type)
                    ?.label || doc.type}
                </Text>
                <Text style={bottomSheetStyles.documentMeta}>
                  {doc.size} • Uploaded {doc.uploadDate}
                </Text>
              </View>
              <TouchableOpacity onPress={() => handleRemoveDocument(index)}>
                <Ionicons
                  name="close-circle"
                  size={24}
                  color={Colors.neutral.grey400}
                />
              </TouchableOpacity>
            </View>
          ))}

          {/* Agreement Checkbox */}
          <TouchableOpacity
            style={bottomSheetStyles.agreementContainer}
            onPress={() => setAgreedToTerms(!agreedToTerms)}
          >
            <View
              style={[
                bottomSheetStyles.checkbox,
                agreedToTerms && bottomSheetStyles.checkboxChecked,
              ]}
            >
              {agreedToTerms && (
                <Ionicons
                  name="checkmark"
                  size={16}
                  color={Colors.neutral.white}
                />
              )}
            </View>

            <Text style={bottomSheetStyles.agreementText}>
              I consent to the transmission and processing of personal data in
              accordance with the privacy policy,
              <Text style={bottomSheetStyles.linkText}> view full consent</Text>
            </Text>
            <Gap size={12} />
          </TouchableOpacity>

          {/* Send Request Button */}
          <View style={bottomSheetStyles.buttonContainer}>
            <Button
              title="Send request update"
              onPress={handleSendRequest}
              variant="primary"
              size="large"
              icon="send"
            />
          </View>
        </ScrollView>
      </BottomSheet>
    </SafeAreaView>
  );
}

const bottomSheetStyles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
    width: "100%",
  },
  requirementsSection: {
    borderRadius: 8,
    marginBottom: 20,
  },
  requirementsTitle: {
    ...Fonts.style.h4,
    color: Colors.neutral.black,
    marginBottom: 12,
  },
  requirementItem: {
    ...Fonts.style.body2,
    color: Colors.neutral.grey700,
    marginBottom: 4,
  },
  section: {
    marginBottom: 20,
  },
  sectionLabel: {
    ...Fonts.style.body1,
    color: Colors.neutral.black,
    fontWeight: "600",
    marginBottom: 8,
  },
  required: {
    color: Colors.status.error,
  },
  textArea: {
    borderWidth: 1,
    borderColor: Colors.border.light,
    borderRadius: 8,
    padding: 12,
    minHeight: 100,
    backgroundColor: Colors.neutral.white,
    ...Fonts.style.body1,
  },
  uploadHint: {
    ...Fonts.style.caption,
    color: Colors.neutral.grey600,
    marginBottom: 12,
  },
  uploadArea: {
    borderWidth: 2,
    borderColor: Colors.primary.main,
    borderStyle: "dashed",
    borderRadius: 8,
    padding: 32,
    alignItems: "center",
    backgroundColor: Colors.neutral.white,
  },
  uploadIcon: {
    marginBottom: 12,
  },
  uploadText: {
    ...Fonts.style.body1,
    color: Colors.neutral.black,
    marginBottom: 12,
  },
  browseButton: {
    backgroundColor: Colors.neutral.white,
    borderWidth: 1,
    borderColor: Colors.border.light,
    borderRadius: 6,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  browseButtonText: {
    ...Fonts.style.body2,
    color: Colors.neutral.black,
  },
  documentItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    backgroundColor: Colors.neutral.white,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.border.light,
    marginBottom: 8,
  },
  documentIcon: {
    marginRight: 12,
  },
  documentInfo: {
    flex: 1,
  },
  documentName: {
    ...Fonts.style.body1,
    color: Colors.neutral.black,
    fontWeight: "600",
  },
  documentMeta: {
    ...Fonts.style.caption,
    color: Colors.neutral.grey600,
  },
  agreementContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 24,
    paddingHorizontal: 4,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: Colors.border.main,
    borderRadius: 4,
    marginRight: 12,
    marginTop: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  checkboxChecked: {
    backgroundColor: Colors.primary.main,
    borderColor: Colors.primary.main,
  },
  agreementText: {
    ...Fonts.style.body2,
    color: Colors.neutral.grey700,
    flex: 1,
    lineHeight: 20,
  },
  linkText: {
    color: Colors.primary.main,
    textDecorationLine: "underline",
  },
  buttonContainer: {
    marginTop: 8,
    marginBottom: 20,
  },

  uploadAreaDisabled: {
    borderColor: Colors.neutral.grey300,
    backgroundColor: Colors.neutral.grey100,
  },
  uploadTextDisabled: {
    color: Colors.neutral.grey400,
  },
  browseButtonDisabled: {
    backgroundColor: Colors.neutral.grey100,
    borderColor: Colors.neutral.grey300,
  },
  browseButtonTextDisabled: {
    color: Colors.neutral.grey400,
  },
  documentType: {
    ...Fonts.style.caption,
    color: Colors.primary.main,
    fontWeight: "600",
    marginBottom: 2,
  },
});
