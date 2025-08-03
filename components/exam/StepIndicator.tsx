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
  
  // Step titles for each step
  const stepTitles = [
    "বিষয় নির্বাচন",
    "অধ্যায় নির্বাচন",
    "পর্যালোচনা",
    "মান নির্বাচন",
    "নিশ্চিত করুন"
  ];

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
        <View>
        <ThemedText style={styles.title}>
          পরীক্ষা দাও
          </ThemedText>
          <View style={styles.stepInfo}>
            <ThemedText style={styles.stepText}>
              {step <= 5 ? stepTitles[step-1] : ""}
            </ThemedText>
            {subject && <ThemedText style={styles.subtitleArrow}> • </ThemedText>}
          {subject && <ThemedText style={styles.subtitle}>{subject.name}</ThemedText>}
          </View>
        </View>
      </View>
      <View style={styles.stepsContainer}>
        {Array.from({length: 5}).map((_, index) => (
          <View 
            key={index} 
            style={[
              styles.stepDot, 
              index + 1 === step ? styles.activeStepDot : 
              index + 1 < step ? styles.completedStepDot : {}
            ]}
          />
        ))}
      </View>
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
    marginRight: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  stepInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  stepText: {
    fontSize: 14,
    color: '#6B7280',
  },
  subtitleArrow: {
    fontSize: 14,
    color: '#9CA3AF',
  },
  subtitle: {
    fontSize: 14,
    color: '#9CA3AF',
  },
  stepsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  stepDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#E5E7EB',
  },
  activeStepDot: {
    backgroundColor: '#9333EA',
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  completedStepDot: {
    backgroundColor: '#10B981',
  },
}); 