import { AuthWrapper } from "@/components/auth/AuthWrapper";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Tabs } from "expo-router";
import React from "react";
import { Platform, StyleSheet } from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

import { HapticTab } from "@/components/HapticTab";
import TabBarBackground from "@/components/ui/TabBarBackground";
import { useThemeColor } from "@/hooks/useThemeColor";

export default function TabLayout() {
  const primaryColor = useThemeColor({}, "primary");
  const insets = useSafeAreaInsets();

  return (
    <AuthWrapper>
      <SafeAreaView style={styles.container} edges={["top"]}>
        <Tabs
          screenOptions={{
            tabBarActiveTintColor: primaryColor,
            headerShown: false,
            tabBarButton: HapticTab,
            tabBarBackground: TabBarBackground,
            tabBarStyle: {
              ...Platform.select({
                ios: {
                  // Use a transparent background on iOS to show the blur effect
                  position: "absolute",
                },
                android: {
                  height: 60 + insets.bottom,
                  paddingBottom: insets.bottom,
                },
                default: {},
              }),
            },
          }}
        >
          <Tabs.Screen
            name="index"
            options={{
              title: "হোম",
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="home" size={size} color={color} />
              ),
            }}
          />
          <Tabs.Screen
            name="exam"
            options={{
              title: "পরীক্ষা",
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="document-text" size={size} color={color} />
              ),
            }}
          />
          <Tabs.Screen
            name="question-bank"
            options={{
              title: "প্রশ্ন ব্যাংক",
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="library" size={size} color={color} />
              ),
            }}
          />
          <Tabs.Screen
            name="prepare"
            options={{
              title: "অনুশীলন",
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="school" size={size} color={color} />
              ),
            }}
          />
          <Tabs.Screen
            name="profile"
            options={{
              title: "প্রোফাইল",
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="person" size={size} color={color} />
              ),
            }}
          />
        </Tabs>
      </SafeAreaView>
    </AuthWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "transparent",
  },
});
