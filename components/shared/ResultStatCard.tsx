import { ThemedText } from '@/components/ThemedText';
import { useThemeColor } from '@/hooks/useThemeColor';
import React from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';

type ResultStatCardProps = {
  title: string;
  value: string | number;
  style?: ViewStyle;
  variant?: 'default' | 'success' | 'error' | 'warning' | 'info';
};

export function ResultStatCard({ title, value, style, variant = 'default' }: ResultStatCardProps) {
  const getVariantColors = () => {
    switch (variant) {
      case 'success':
        return {
          bg: '#ECFDF5',
          text: '#059669',
          border: '#A7F3D0',
        };
      case 'error':
        return {
          bg: '#FEF2F2',
          text: '#DC2626',
          border: '#FECACA',
        };
      case 'warning':
        return {
          bg: '#FFFBEB',
          text: '#D97706',
          border: '#FDE68A',
        };
      case 'info':
        return {
          bg: '#EFF6FF',
          text: '#2563EB',
          border: '#BFDBFE',
        };
      default:
        return {
          bg: useThemeColor({}, 'card'),
          text: useThemeColor({}, 'text'),
          border: useThemeColor({}, 'border'),
        };
    }
  };

  const colors = getVariantColors();

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: colors.bg,
          borderColor: colors.border,
        },
        style,
      ]}
    >
      <ThemedText style={[styles.value, { color: colors.text }]}>{value}</ThemedText>
      <ThemedText style={[styles.title, { color: colors.text }]}>{title}</ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    borderWidth: 1,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 100,
  },
  value: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  title: {
    fontSize: 14,
    textAlign: 'center',
  },
}); 