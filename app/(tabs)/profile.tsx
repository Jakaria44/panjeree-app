import Button from "@/components/Button";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { authAtom, logoutAction } from "@/store/auth";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useAtom, useSetAtom } from "jotai";
import React, { useState } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

export default function ProfileScreen() {
  const insets = useSafeAreaInsets();
  const [authState] = useAtom(authAtom);
  const logout = useSetAtom(logoutAction);
  const [isLoading, setIsLoading] = useState(false);

  const userProfile = authState.user;

  const handleLogout = async () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Logout",
        style: "destructive",
        onPress: async () => {
          setIsLoading(true);
          try {
            await logout();
            Alert.alert("Success", "Logged out successfully");
          } catch (error) {
            Alert.alert("Error", "Failed to logout");
          } finally {
            setIsLoading(false);
          }
        },
      },
    ]);
  };

  const menuItems = [
    {
      icon: "person-outline",
      title: "Edit Profile",
      onPress: () =>
        Alert.alert(
          "Coming Soon",
          "Edit profile feature will be available soon"
        ),
    },
    {
      icon: "notifications-outline",
      title: "Notifications",
      onPress: () =>
        Alert.alert(
          "Coming Soon",
          "Notifications feature will be available soon"
        ),
    },
    {
      icon: "settings-outline",
      title: "Settings",
      onPress: () =>
        Alert.alert("Coming Soon", "Settings feature will be available soon"),
    },
    {
      icon: "help-circle-outline",
      title: "Help & Support",
      onPress: () =>
        Alert.alert(
          "Coming Soon",
          "Help & Support feature will be available soon"
        ),
    },
    {
      icon: "information-circle-outline",
      title: "About",
      onPress: () => Alert.alert("About", "Panjeree Education App v1.0.0"),
    },
  ];

  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      <ThemedView style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Header */}
          <View style={styles.header}>
            <ThemedText style={styles.headerTitle}>প্রোফাইল</ThemedText>
          </View>

          {/* Profile Card */}
          <View style={styles.profileCard}>
            <View style={styles.avatarContainer}>
              <View style={styles.avatar}>
                <Ionicons name="person" size={40} color="#9333EA" />
              </View>
            </View>

            <View style={styles.profileInfo}>
              <ThemedText style={styles.userName}>
                {userProfile?.name || "User Name"}
              </ThemedText>
              <ThemedText style={styles.userPhone}>
                {userProfile?.phone || "Phone Number"}
              </ThemedText>
              <ThemedText style={styles.userSchool}>
                {userProfile?.school || "School Name"}
              </ThemedText>
            </View>
          </View>

          {/* Stats Section */}
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <ThemedText style={styles.statNumber}>12</ThemedText>
              <ThemedText style={styles.statLabel}>পরীক্ষা দিয়েছি</ThemedText>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <ThemedText style={styles.statNumber}>85%</ThemedText>
              <ThemedText style={styles.statLabel}>গড় স্কোর</ThemedText>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <ThemedText style={styles.statNumber}>5</ThemedText>
              <ThemedText style={styles.statLabel}>সেরা স্কোর</ThemedText>
            </View>
          </View>

          {/* Menu Items */}
          <View style={styles.menuContainer}>
            {menuItems.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={styles.menuItem}
                onPress={item.onPress}
                activeOpacity={0.7}
              >
                <View style={styles.menuItemLeft}>
                  <Ionicons name={item.icon as any} size={24} color="#6B7280" />
                  <ThemedText style={styles.menuItemTitle}>
                    {item.title}
                  </ThemedText>
                </View>
                <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
              </TouchableOpacity>
            ))}
          </View>

          {/* Logout Button */}
          <View style={styles.logoutContainer}>
            <Button
              onPress={handleLogout}
              isLoading={isLoading}
              style={styles.logoutButton}
            >
              <Ionicons name="log-out-outline" size={20} color="#FFFFFF" />
              <ThemedText style={styles.logoutButtonText}>লগআউট</ThemedText>
            </Button>
          </View>
        </ScrollView>
      </ThemedView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  header: {
    padding: 16,
    paddingTop: 8,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1F2937",
  },
  profileCard: {
    backgroundColor: "#FFFFFF",
    margin: 16,
    borderRadius: 16,
    padding: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  avatarContainer: {
    alignItems: "center",
    marginBottom: 16,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#F3F4F6",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 3,
    borderColor: "#9333EA",
  },
  profileInfo: {
    alignItems: "center",
  },
  userName: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1F2937",
    marginBottom: 4,
  },
  userPhone: {
    fontSize: 14,
    color: "#6B7280",
    marginBottom: 2,
  },
  userSchool: {
    fontSize: 14,
    color: "#6B7280",
  },
  statsContainer: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    margin: 16,
    borderRadius: 16,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  statItem: {
    flex: 1,
    alignItems: "center",
  },
  statNumber: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#9333EA",
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: "#6B7280",
    textAlign: "center",
  },
  statDivider: {
    width: 1,
    backgroundColor: "#E5E7EB",
    marginHorizontal: 8,
  },
  menuContainer: {
    backgroundColor: "#FFFFFF",
    margin: 16,
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
  },
  menuItemLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  menuItemTitle: {
    fontSize: 16,
    color: "#1F2937",
    marginLeft: 12,
  },
  logoutContainer: {
    padding: 16,
    marginBottom: 24,
  },
  logoutButton: {
    backgroundColor: "#EF4444",
    borderRadius: 12,
    paddingVertical: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  logoutButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 8,
  },
});
