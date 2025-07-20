import { ThemedText } from '@/components/ThemedText';
import { useThemeColor } from '@/hooks/useThemeColor';
import React, { ReactNode } from 'react';
import { StyleSheet, TouchableOpacity, TouchableOpacityProps, View, ViewStyle } from 'react-native';

type FeatureCardProps = TouchableOpacityProps & {
  title: string;
  icon: ReactNode;
  description?: string;
  style?: ViewStyle;
};

export function FeatureCard({ title, icon, description, style, ...rest }: FeatureCardProps) {
  const borderColor = useThemeColor({}, 'border');
  const backgroundColor = useThemeColor({}, 'card');

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={[
        styles.container,
        {
          borderColor,
          backgroundColor,
        },
        style,
      ]}
      {...rest}
    >
      <View style={styles.iconContainer}>{icon}</View>
      <View style={styles.content}>
        <ThemedText style={styles.title}>{title}</ThemedText>
        {description && <ThemedText style={styles.description}>{description}</ThemedText>}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    borderWidth: 1,
    padding: 16,
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: 12,
    width: '100%',
    minHeight: 120,
  },
  iconContainer: {
    height: 48,
    width: 48,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    gap: 4,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
  },
  description: {
    fontSize: 14,
    color: '#6B7280',
  },
}); 