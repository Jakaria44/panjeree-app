import { authAtom, checkAuthAction } from "@/store/auth";
import { useAtom, useSetAtom } from "jotai";
import React, { useEffect } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { LoginScreen } from "./LoginScreen";

type AuthWrapperProps = {
  children: React.ReactNode;
};

export function AuthWrapper({ children }: AuthWrapperProps) {
  const [authState] = useAtom(authAtom);
  const checkAuth = useSetAtom(checkAuthAction);

  useEffect(() => {
    // Check authentication status on app startup
    checkAuth();
  }, [checkAuth]);

  // Show loading screen while checking authentication
  if (authState.isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#9333EA" />
      </View>
    );
  }

  // Show login screen if not authenticated
  if (!authState.isAuthenticated) {
    return <LoginScreen />;
  }

  // Show main app if authenticated
  return <>{children}</>;
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
  },
});
