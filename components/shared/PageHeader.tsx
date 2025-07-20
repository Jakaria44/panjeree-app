import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import React, { ReactNode } from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';

type PageHeaderProps = {
  title: string;
  description?: string;
  rightContent?: ReactNode;
  style?: ViewStyle;
};

export function PageHeader({ title, description, rightContent, style }: PageHeaderProps) {
  return (
    <ThemedView style={[styles.container, style]}>
      <View style={styles.textContainer}>
        <ThemedText type="title" style={styles.title}>{title}</ThemedText>
        {description && (
          <ThemedText style={styles.description}>{description}</ThemedText>
        )}
      </View>
      {rightContent && <View style={styles.rightContent}>{rightContent}</View>}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 24,
    paddingHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  description: {
    fontSize: 16,
    color: '#6B7280',
  },
  rightContent: {
    marginLeft: 16,
  },
}); 