import Button from '@/components/Button';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useThemeColor } from '@/hooks/useThemeColor';
import { examConfigAtom } from '@/store/exam';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useAtom } from 'jotai';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { StepIndicator } from './StepIndicator';

type StandardOption = {
  id: "engineering" | "main-book" | "varsity" | "medical";
  name: string;
  description: string;
  icon: string;
};

const standards: StandardOption[] = [
  {
    id: "main-book",
    name: "মূল বই",
    description: "পাঠ্যপুস্তক ভিত্তিক প্রশ্ন",
    icon: "book-outline",
  },
  {
    id: "engineering",
    name: "ইঞ্জিনিয়ারিং",
    description: "ইঞ্জিনিয়ারিং ভর্তি পরীক্ষার মান",
    icon: "construct-outline",
  },
  {
    id: "medical",
    name: "মেডিকেল",
    description: "মেডিকেল ভর্তি পরীক্ষার মান",
    icon: "medical-outline",
  },
  {
    id: "varsity",
    name: "বিশ্ববিদ্যালয়",
    description: "বিশ্ববিদ্যালয় ভর্তি পরীক্ষার মান",
    icon: "school-outline",
  },
];

export function Step4SelectStandard() {
  const [config, setConfig] = useAtom(examConfigAtom);
  const primaryColor = useThemeColor({}, 'primary');
  const purpleColor = useThemeColor({}, 'purple500');

  const handleStandardSelect = (standard: "engineering" | "main-book" | "varsity" | "medical") => {
    setConfig((prev) => ({
      ...prev,
      questionStandard: standard,
      step: 5,
    }));
  };

  const handleBack = () => {
    setConfig(prev => ({
      ...prev,
      step: 3
    }));
  };

  return (
    <ThemedView style={styles.container}>
      <StepIndicator onBack={handleBack} />
      
      <ThemedText style={styles.title}>কোন মানের পরীক্ষা দিতে চাও?</ThemedText>
      <ThemedText style={styles.subtitle}>পরীক্ষার কঠিনতা মান নির্বাচন কর</ThemedText>

      <View style={styles.optionsContainer}>
        {standards.map((option) => (
          <TouchableOpacity
            key={option.id}
            style={[
              styles.optionCard,
              config.questionStandard === option.id && styles.selectedCard,
            ]}
            onPress={() => handleStandardSelect(option.id)}
            activeOpacity={0.7}
          >
            <View style={styles.optionHeader}>
              <View style={[styles.iconContainer, config.questionStandard === option.id && { backgroundColor: purpleColor }]}>
                <Ionicons name={option.icon as any} size={24} color={config.questionStandard === option.id ? '#fff' : '#6B7280'} />
              </View>
              <ThemedText style={styles.optionTitle}>{option.name}</ThemedText>
            </View>
            <ThemedText style={styles.optionDescription}>{option.description}</ThemedText>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.buttonContainer}>
        <Button
          onPress={() => handleStandardSelect(config.questionStandard || 'main-book')}
          disabled={!config.questionStandard}
        >
          পরবর্তী ধাপে যান
        </Button>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 24,
  },
  optionsContainer: {
    flex: 1,
    gap: 16,
  },
  optionCard: {
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    padding: 16,
    gap: 8,
  },
  selectedCard: {
    borderColor: '#9333EA',
    backgroundColor: '#FAF5FF',
  },
  optionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  optionTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  optionDescription: {
    fontSize: 14,
    color: '#6B7280',
  },
  buttonContainer: {
    marginTop: 24,
  },
}); 