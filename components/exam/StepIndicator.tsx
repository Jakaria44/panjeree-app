import { ThemedText } from '@/components/ThemedText';
import { examConfigAtom } from '@/store/exam';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useAtomValue } from 'jotai';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

type StepIndicatorProps = {
  onBack: () => void;
};

export function StepIndicator({ onBack }: StepIndicatorProps) {
  const { step, totalSteps, subject } = useAtomValue(examConfigAtom);
  const currentDisplayStep = step - 1;

  return (
    <View style={styles.container}>
      <View style={styles.leftSection}>
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={onBack}
          activeOpacity={0.7}
        >
          <Ionicons name="arrow-back" size={20} color="#000" />
        </TouchableOpacity>
        <ThemedText style={styles.title}>
          পরীক্ষা দাও
          {subject && <ThemedText style={styles.subtitleArrow}> › </ThemedText>}
          {subject && <ThemedText style={styles.subtitle}>{subject.name}</ThemedText>}
        </ThemedText>
      </View>
      <ThemedText style={styles.stepCounter}>
        {currentDisplayStep}/{totalSteps} ধাপ
      </ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 24,
    paddingHorizontal: 8,
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  subtitleArrow: {
    fontSize: 18,
    color: '#9CA3AF',
  },
  subtitle: {
    fontSize: 18,
    color: '#9CA3AF',
  },
  stepCounter: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6B7280',
  },
}); 