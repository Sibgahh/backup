import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  Alert,
  ScrollView,
  ActivityIndicator,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { RootStackParamList } from "../../router/AppNavigator";
import { Gap } from "../../components/atoms";
import { useESSAuth } from "../../hooks/useESSAuth";
import { useProfile } from "../../hooks/useProfile";
import { styles } from "./style";
import Colors from "../../utils/Colors";

interface WorkInfoItemProps {
  icon: string;
  title: string;
  value: string;
}

interface SettingsItemProps {
  icon: string;
  title: string;
  subtitle: string;
  onPress?: () => void;
  showArrow?: boolean;
  iconColor?: string;
}

interface AvatarWithFallbackProps {
  imageUri?: string;
  name: string;
  size: number;
  style?: any;
}

const AvatarWithFallback: React.FC<AvatarWithFallbackProps> = ({
  imageUri,
  name,
  size,
  style,
}) => {
  const [imageError, setImageError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Get first letter of name for fallback
  const getInitials = (fullName: string) => {
    const names = fullName.trim().split(" ");
    if (names.length === 0) return "U";
    return names[0].charAt(0).toUpperCase();
  };

  // Check if the URI is a dummy/placeholder link
  const isDummyImage = (uri?: string) => {
    if (!uri) return true;
    const dummyPatterns = [
      "unsplash.com",
      "placeholder",
      "example.com",
      "dummy",
      "fake",
      "lorem",
      "...", // This catches the "https://.../profile.jpg" pattern
    ];
    return dummyPatterns.some((pattern) => uri.includes(pattern));
  };

  const shouldShowFallback = !imageUri || isDummyImage(imageUri) || imageError;

  const fallbackStyle = {
    width: size,
    height: size,
    borderRadius: size / 2,
    backgroundColor: Colors.primary.main,
    justifyContent: "center" as const,
    alignItems: "center" as const,
    ...style,
  };

  const imageStyle = {
    width: size,
    height: size,
    borderRadius: size / 2,
    ...style,
  };

  if (shouldShowFallback) {
    return (
      <View style={fallbackStyle}>
        <Text
          style={{
            color: "white",
            fontSize: size * 0.4,
            fontWeight: "bold",
          }}
        >
          {getInitials(name)}
        </Text>
      </View>
    );
  }

  return (
    <Image
      source={{ uri: imageUri }}
      style={imageStyle}
      onError={() => {
        setImageError(true);
        setIsLoading(false);
      }}
      onLoad={() => setIsLoading(false)}
      onLoadStart={() => setIsLoading(true)}
    />
  );
};

const WorkInfoItem: React.FC<WorkInfoItemProps> = ({ icon, title, value }) => (
  <View style={styles.workInfoItem}>
    <View style={styles.workInfoIcon}>
      <Ionicons name={icon as any} size={20} color="#004AAD" />
    </View>
    <View style={styles.workInfoContent}>
      <Text style={styles.workInfoTitle}>{title}</Text>
      <Text style={styles.workInfoValue}>{value}</Text>
    </View>
  </View>
);

const SettingsItem: React.FC<SettingsItemProps> = ({
  icon,
  title,
  subtitle,
  onPress,
  showArrow = true,
  iconColor = "#004AAD",
}) => (
  <TouchableOpacity style={styles.settingsItem} onPress={onPress}>
    <View style={styles.settingsItemContent}>
      <View
        style={[styles.settingsIcon, { backgroundColor: `${iconColor}15` }]}
      >
        <Ionicons name={icon as any} size={20} color={iconColor} />
      </View>
      <View style={styles.settingsTextContent}>
        <Text style={styles.settingsTitle}>{title}</Text>
        <Text style={styles.settingsSubtitle}>{subtitle}</Text>
      </View>
    </View>
    {showArrow && <Ionicons name="chevron-forward" size={20} color="#9E9E9E" />}
  </TouchableOpacity>
);

export default function SettingsPage(): React.JSX.Element {
  const { logout, loading } = useESSAuth();
  const {
    profile,
    fetchProfile,
    loading: profileLoading,
    error,
  } = useProfile();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  // Fetch profile data on component mount
  useEffect(() => {
    console.log("🔍 Settings page: Fetching profile data...");
    fetchProfile();
  }, [fetchProfile]);

  // Log the profile data for debugging
  useEffect(() => {
    if (profile) {
      console.log(
        "📱 Settings - Profile data:",
        JSON.stringify(profile, null, 2)
      );
    }
  }, [profile]);

  // Use real profile data or fallback to loading/error states
  const userData = profile
    ? {
        name: profile.employee_name || "Unknown User",
        email: profile.email || "No email",
        avatar: profile.photo_profile_ess || profile.avatar,
        workInfo: {
          company: profile.company || "N/A",
          companyAddress: profile.company_address || "N/A",
          email: profile.email || "N/A",
          phoneNumber: profile.phone_number
            ? String(profile.phone_number)
            : "N/A",
        },
      }
    : {
        name: profileLoading
          ? "Loading..."
          : error
          ? "Error loading profile"
          : "No profile data",
        email: profileLoading
          ? "Loading..."
          : error
          ? "Please try again"
          : "No email",
        avatar: undefined,
        workInfo: {
          company: profileLoading ? "Loading..." : "N/A",
          companyAddress: profileLoading ? "Loading..." : "N/A",
          email: profileLoading ? "Loading..." : "N/A",
          phoneNumber: profileLoading ? "Loading..." : "N/A",
          division: "",
          position: "",
          startDate: "",
          businessUnit: "",
          directSPV: "",
        },
      };

  const handleViewProfile = () => {
    // Navigate to profile page or show profile details
    navigation.navigate("ProfilePage" as any);
  };

  const handleActiveSessions = () => {
    Alert.alert(
      "Active Sessions",
      "Manage your devices functionality will be implemented here"
    );
  };

  const handleHelp = () => {
    Alert.alert(
      "Help",
      "Get support from helpdesk functionality will be implemented here"
    );
  };

  const handleRetryProfile = () => {
    console.log("🔄 Retrying profile fetch...");
    fetchProfile();
  };

  const handleLogout = () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Logout",
        style: "destructive",
        onPress: async () => {
          try {
            console.log("🚪 Starting logout from Settings...");
            await logout();
            console.log("✅ Logout completed from Settings");
          } catch (error) {
            console.error("❌ Logout error from Settings:", error);
            Alert.alert("Error", "Failed to logout. Please try again.");
          }
        },
      },
    ]);
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "left", "right"]}>
      <StatusBar style="light" />

      {/* Scrollable Container - Everything scrolls together */}
      <ScrollView
        style={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Blue Header Section */}
        <View style={styles.headerSection}>
          <View style={styles.headerContent}>
            {/* Loading indicator in header if fetching profile */}
            {profileLoading && (
              <View style={{ alignItems: "center", paddingTop: 20 }}>
                <ActivityIndicator size="small" color="white" />
                <Text style={{ color: "white", fontSize: 12, marginTop: 4 }}>
                  Loading profile...
                </Text>
              </View>
            )}
          </View>
        </View>

        {/* Avatar positioned between header and body */}
        <View style={styles.avatarTransitionSection}>
          <View style={styles.avatarContainer}>
            <AvatarWithFallback
              imageUri={userData.avatar}
              name={userData.name}
              size={80}
              style={styles.overlappingAvatar}
            />
          </View>
        </View>

        {/* White Content Section */}
        <View style={styles.contentSection}>
          {/* User Info Section */}
          <View style={styles.userInfoSection}>
            <Text style={styles.userName}>{userData.name}</Text>
            <Text style={styles.userEmail}>{userData.email}</Text>

            {/* Show error message if there's an error */}
            {error && (
              <View style={{ marginTop: 8 }}>
                <Text
                  style={{
                    color: Colors.status.error,
                    fontSize: 12,
                    textAlign: "center",
                  }}
                >
                  Failed to load profile data
                </Text>
                <TouchableOpacity
                  onPress={handleRetryProfile}
                  style={{
                    marginTop: 4,
                    alignItems: "center",
                    paddingVertical: 4,
                    paddingHorizontal: 8,
                    backgroundColor: Colors.primary.main + "15",
                    borderRadius: 4,
                    alignSelf: "center",
                  }}
                >
                  <Text
                    style={{
                      color: Colors.primary.main,
                      fontSize: 12,
                      fontWeight: "500",
                    }}
                  >
                    Tap to retry
                  </Text>
                </TouchableOpacity>
              </View>
            )}

            {/* <Gap size={16} />
            <TouchableOpacity
              style={styles.viewProfileButton}
              onPress={handleViewProfile}
            >
              <Text style={styles.viewProfileButtonText}>View Profile</Text>
            </TouchableOpacity> */}
          </View>

          <Gap size={32} />

          {/* Work Information Section */}
          <View style={styles.section}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Text style={styles.sectionTitle}>Work Information</Text>
              {profileLoading && (
                <ActivityIndicator size="small" color={Colors.primary.main} />
              )}
            </View>
            <Gap size={16} />

            {/* Always show these fields from the API response */}
            <WorkInfoItem
              icon="business"
              title="Company"
              value={userData.workInfo.company}
            />

            <WorkInfoItem
              icon="location"
              title="Company Address"
              value={userData.workInfo.companyAddress}
            />

            <WorkInfoItem
              icon="mail"
              title="Email"
              value={userData.workInfo.email}
            />

            <WorkInfoItem
              icon="call"
              title="Phone Number"
              value={userData.workInfo.phoneNumber}
            />

            {/* Only show additional fields if they have actual data */}
            {userData.workInfo.division &&
              userData.workInfo.division.trim() !== "" && (
                <WorkInfoItem
                  icon="library"
                  title="Division"
                  value={userData.workInfo.division}
                />
              )}

            {userData.workInfo.position &&
              userData.workInfo.position.trim() !== "" && (
                <WorkInfoItem
                  icon="briefcase"
                  title="Position"
                  value={userData.workInfo.position}
                />
              )}

            {userData.workInfo.startDate &&
              userData.workInfo.startDate.trim() !== "" && (
                <WorkInfoItem
                  icon="calendar"
                  title="Start date"
                  value={userData.workInfo.startDate}
                />
              )}

            {userData.workInfo.businessUnit &&
              userData.workInfo.businessUnit.trim() !== "" && (
                <WorkInfoItem
                  icon="business"
                  title="Business Unit"
                  value={userData.workInfo.businessUnit}
                />
              )}

            {userData.workInfo.directSPV &&
              userData.workInfo.directSPV.trim() !== "" && (
                <WorkInfoItem
                  icon="person-circle"
                  title="Direct SPV"
                  value={userData.workInfo.directSPV}
                />
              )}
          </View>

          <Gap size={32} />

          {/* Settings Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Settings</Text>
            <Gap size={16} />

            <SettingsItem
              icon="phone-portrait"
              title="Active Sessions"
              subtitle="Manage your devices"
              onPress={handleActiveSessions}
            />

            <SettingsItem
              icon="help-circle"
              title="Help"
              subtitle="Get support from helpdesk"
              onPress={handleHelp}
            />

            <SettingsItem
              icon="log-out"
              title="Logout"
              subtitle="Sign out of your account"
              onPress={handleLogout}
              iconColor="#F44336"
            />
          </View>

          <Gap size={40} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
