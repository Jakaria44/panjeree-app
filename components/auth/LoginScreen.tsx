import Button from "@/components/Button";
import { ThemedText } from "@/components/ThemedText";
import { loginAction } from "@/store/auth";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useSetAtom } from "jotai";
import React, { useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export function LoginScreen() {
  const [mobile, setMobile] = useState("01700000000"); // Test mobile number
  const [password, setPassword] = useState("123456"); // Test password (working from swagger)
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const login = useSetAtom(loginAction);

  const handleLogin = async () => {
    if (!mobile.trim() || !password.trim()) {
      Alert.alert("Error", "Please enter both mobile number and password");
      return;
    }

    setIsLoading(true);
    try {
      console.log("Login attempt with:", { mobile: mobile.trim(), password });
      await login({ mobile: mobile.trim(), password });
      console.log("Login successful in component");
    } catch (error: any) {
      console.error("Login failed in component:", error);
      Alert.alert(
        "Login Failed",
        error.message || "Invalid mobile number or password"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Ionicons name="school" size={80} color="#9333EA" />
          <ThemedText style={styles.title}>পাঞ্জেরী শিক্ষা</ThemedText>
          <ThemedText style={styles.subtitle}>
            আপনার পড়াশোনার সহায়ক সমাধান
          </ThemedText>
        </View>

        <View style={styles.formContainer}>
          <View style={styles.inputContainer}>
            <Ionicons
              name="call"
              size={20}
              color="#6B7280"
              style={styles.inputIcon}
            />
            <TextInput
              style={styles.input}
              placeholder="মোবাইল নম্বর"
              value={mobile}
              onChangeText={setMobile}
              keyboardType="phone-pad"
              maxLength={11}
              placeholderTextColor="#9CA3AF"
            />
          </View>

          <View style={styles.inputContainer}>
            <Ionicons
              name="lock-closed"
              size={20}
              color="#6B7280"
              style={styles.inputIcon}
            />
            <TextInput
              style={styles.input}
              placeholder="পাসওয়ার্ড"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
              placeholderTextColor="#9CA3AF"
            />
            <TouchableOpacity
              style={styles.eyeIcon}
              onPress={() => setShowPassword(!showPassword)}
            >
              <Ionicons
                name={showPassword ? "eye-off" : "eye"}
                size={20}
                color="#6B7280"
              />
            </TouchableOpacity>
          </View>

          <Button
            onPress={handleLogin}
            isLoading={isLoading}
            style={styles.loginButton}
          >
            <ThemedText style={styles.loginButtonText}>লগইন করুন</ThemedText>
          </Button>

          <View style={styles.footer}>
            <ThemedText style={styles.footerText}>
              অ্যাকাউন্ট নেই?{" "}
              <ThemedText style={styles.linkText}>রেজিস্টার করুন</ThemedText>
            </ThemedText>
            <ThemedText style={styles.debugText}>
              Debug: Using phone: {mobile}, password: {password}
            </ThemedText>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 24,
  },
  header: {
    alignItems: "center",
    marginBottom: 48,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#1F2937",
    marginTop: 16,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#6B7280",
    textAlign: "center",
  },
  formContainer: {
    width: "100%",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 12,
    backgroundColor: "#F9FAFB",
    marginBottom: 16,
    paddingHorizontal: 16,
    paddingVertical: 4,
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: "#1F2937",
    paddingVertical: 16,
  },
  eyeIcon: {
    padding: 8,
  },
  loginButton: {
    backgroundColor: "#9333EA",
    borderRadius: 12,
    paddingVertical: 16,
    marginTop: 8,
  },
  loginButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },
  footer: {
    alignItems: "center",
    marginTop: 24,
  },
  footerText: {
    fontSize: 14,
    color: "#6B7280",
  },
  linkText: {
    color: "#9333EA",
    fontWeight: "600",
  },
  debugText: {
    fontSize: 12,
    color: "#6B7280",
    marginTop: 8,
    textAlign: "center",
  },
});
