import { ThemedText } from '@/components/ThemedText';
import { useThemeColor } from '@/hooks/useThemeColor';
import React, { ReactNode } from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';

type SummaryStatCardProps = {
  title: string;
  value: string | number;
  icon?: ReactNode;
  style?: ViewStyle;
  description?: string;
};

export function SummaryStatCard({ title, value, icon, style, description }: SummaryStatCardProps) {
  const borderColor = useThemeColor({}, 'border');
  const backgroundColor = useThemeColor({}, 'card');

  return (
    <View
      style={[
        styles.container,
        {
          borderColor,
          backgroundColor,
        },
        style,
      ]}
    >
      <View style={styles.header}>
        <ThemedText style={styles.title}>{title}</ThemedText>
        {icon && <View style={styles.iconContainer}>{icon}</View>}
      </View>
      <View style={styles.content}>
        <ThemedText style={styles.value}>{value}</ThemedText>
        {description && <ThemedText style={styles.description}>{description}</ThemedText>}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    borderWidth: 1,
    padding: 16,
    minWidth: 150,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  iconContainer: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    gap: 4,
  },
  title: {
    fontSize: 14,
    color: '#6B7280',
  },
  value: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 12,
    color: '#6B7280',
  },
}); 