import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../../router/AppNavigator";
import { useESSAuth } from "../../hooks/useESSAuth";
import { styles } from "./style";
import { Ionicons } from "@expo/vector-icons";
import Colors from "@/utils/Colors";

type Props = NativeStackScreenProps<RootStackParamList, "Login">;

export default function LoginPage({ navigation }: Props): React.JSX.Element {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // Use the updated hook with proper destructuring
  const { login, loading, error, clearError } = useESSAuth();

  const validateForm = (): boolean => {
    const newErrors: { [key: string]: string } = {};

    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!password.trim()) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async (): Promise<void> => {
    if (!validateForm()) {
      return;
    }

    try {
      const result = await login({
        email: email.trim(),
        password: password,
      });

      if (result.type === "auth/loginESS/fulfilled") {
        navigation.reset({
          index: 0,
          routes: [{ name: "Main" }],
        });
      }
    } catch (err) {
      console.error("Login error:", err);
    }
  };

  // Handle errors from auth state
  useEffect(() => {
    if (error && error.messages) {
      const message =
        typeof error.messages === "string" ? error.messages : "Login failed";
      Alert.alert("Login Failed", message, [
        { text: "OK", onPress: () => clearError() },
      ]);
    }
  }, [error, clearError]);

  return (
    <SafeAreaView
      style={styles.safeArea}
      edges={["top", "left", "right", "bottom"]}
    >
      <StatusBar style="light" />

      {/* Header and Logo */}
      <Image
        source={require("../../assets/images/header-login.png")}
        style={styles.headerImage}
        resizeMode="contain"
      />
      <Image
        source={require("../../assets/images/logo-telkomsigma.png")}
        style={styles.logoTopRight}
        resizeMode="contain"
      />

      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
        >
          <View>
            {/* Title */}
            <View style={styles.titleContainer}>
              <Text style={styles.appTitle}>
                Welcome to{"\n"}Employee Self System
              </Text>
              <Text style={styles.appSubtitle}>
                Please enter your employee account
              </Text>
            </View>

            {/* Login Form */}
            <View style={styles.formContainer}>
              {/* Email Input */}
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Email Address</Text>
                <TextInput
                  style={styles.textInput}
                  placeholder="Enter your email"
                  placeholderTextColor="#95a5a6"
                  value={email}
                  onChangeText={(text) => {
                    setEmail(text);
                    if (errors.email) {
                      setErrors((prev) => ({ ...prev, email: "" }));
                    }
                  }}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                  editable={!loading}
                />
                {errors.email && (
                  <Text style={{ color: "red", fontSize: 12, marginTop: 4 }}>
                    {errors.email}
                  </Text>
                )}
              </View>

              {/* Password Input */}
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Password</Text>
                <View style={styles.passwordContainer}>
                  <TextInput
                    style={styles.passwordInput}
                    placeholder="Enter your password"
                    placeholderTextColor="#95a5a6"
                    value={password}
                    onChangeText={(text) => {
                      setPassword(text);
                      if (errors.password) {
                        setErrors((prev) => ({ ...prev, password: "" }));
                      }
                    }}
                    secureTextEntry={!showPassword}
                    autoCapitalize="none"
                    autoCorrect={false}
                    editable={!loading}
                  />
                  <TouchableOpacity
                    style={styles.passwordToggle}
                    onPress={() => setShowPassword(!showPassword)}
                    disabled={loading}
                  >
                    <Ionicons
                      name={showPassword ? "eye-outline" : "eye-off-outline"}
                      size={20}
                      color={Colors.text.primary}
                    />
                  </TouchableOpacity>
                </View>
                {errors.password && (
                  <Text style={{ color: "red", fontSize: 12, marginTop: 4 }}>
                    {errors.password}
                  </Text>
                )}
              </View>

              {/* Login Button */}
              <TouchableOpacity
                style={[styles.loginButton, loading && { opacity: 0.6 }]}
                onPress={handleLogin}
                disabled={loading}
              >
                <Text style={styles.loginButtonText}>
                  {loading ? "Signing In..." : "Sign In"}
                </Text>
              </TouchableOpacity>

              {/* Footer Text */}
              <View style={styles.footerContainer}>
                <Text style={styles.footerText}>
                  Don't have access yet?{" "}
                  <Text style={styles.footerTextLink}>
                    Contact the HRD Administrator
                  </Text>
                </Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      {/* Footer Image */}
      <Image
        source={require("../../assets/images/footer-login.png")}
        style={styles.footerImage}
        resizeMode="contain"
      />
    </SafeAreaView>
  );
}
