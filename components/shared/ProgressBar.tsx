import { ThemedText } from '@/components/ThemedText';
import { useThemeColor } from '@/hooks/useThemeColor';
import React from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';

type ProgressBarProps = {
  value: number;
  max: number;
  showValue?: boolean;
  size?: 'sm' | 'md' | 'lg';
  color?: string;
  style?: ViewStyle;
};

export function ProgressBar({ value, max, showValue = false, size = 'md', color, style }: ProgressBarProps) {
  const primaryColor = color || useThemeColor({}, 'primary');
  const percentage = Math.min(100, Math.max(0, (value / max) * 100));

  const getHeight = () => {
    switch (size) {
      case 'sm':
        return 4;
      case 'lg':
        return 12;
      default:
        return 8;
    }
  };

  return (
    <View style={[styles.container, style]}>
      <View style={[styles.background, { height: getHeight() }]}>
        <View
          style={[
            styles.progress,
            {
              width: `${percentage}%`,
              height: '100%',
              backgroundColor: primaryColor,
            },
          ]}
        />
      </View>
      {showValue && (
        <ThemedText style={styles.valueText}>
          {value}/{max}
        </ThemedText>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  background: {
    backgroundColor: '#E5E7EB',
    borderRadius: 9999,
    overflow: 'hidden',
  },
  progress: {
    borderRadius: 9999,
  },
  valueText: {
    fontSize: 12,
    marginTop: 4,
    textAlign: 'right',
  },
}); 