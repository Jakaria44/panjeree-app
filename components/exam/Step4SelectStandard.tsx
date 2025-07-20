import Button from '@/components/Button';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useThemeColor } from '@/hooks/useThemeColor';
import { examConfigAtom } from '@/store/exam';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useAtom } from 'jotai';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

type StandardOption = {
  id: 'basic' | 'intermediate' | 'advanced';
  name: string;
  description: string;
  icon: string;
};

const standards: StandardOption[] = [
  {
    id: 'basic',
    name: 'সহজ',
    description: 'সাধারণ প্রশ্ন, পরীক্ষার জন্য মৌলিক প্রস্তুতি',
    icon: 'leaf-outline',
  },
  {
    id: 'intermediate',
    name: 'মধ্যম',
    description: 'অপেক্ষাকৃত কঠিন প্রশ্ন, পাঠ্যপুস্তকের বিস্তারিত জ্ঞান',
    icon: 'flame-outline',
  },
  {
    id: 'advanced',
    name: 'কঠিন',
    description: 'চ্যালেঞ্জিং প্রশ্ন, গভীর বিশ্লেষণাত্মক দক্ষতা প্রয়োজন',
    icon: 'flash-outline',
  },
];

export function Step4SelectStandard() {
  const [config, setConfig] = useAtom(examConfigAtom);
  const primaryColor = useThemeColor({}, 'primary');
  const purpleColor = useThemeColor({}, 'purple500');

  const handleStandardSelect = (standard: 'basic' | 'intermediate' | 'advanced') => {
    setConfig((prev) => ({
      ...prev,
      standard,
      step: 5,
    }));
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedText style={styles.title}>কোন মানের পরীক্ষা দিতে চাও?</ThemedText>
      <ThemedText style={styles.subtitle}>পরীক্ষার কঠিনতা মান নির্বাচন কর</ThemedText>

      <View style={styles.optionsContainer}>
        {standards.map((option) => (
          <TouchableOpacity
            key={option.id}
            style={[
              styles.optionCard,
              config.standard === option.id && styles.selectedCard,
            ]}
            onPress={() => handleStandardSelect(option.id)}
            activeOpacity={0.7}
          >
            <View style={styles.optionHeader}>
              <View style={[styles.iconContainer, config.standard === option.id && { backgroundColor: purpleColor }]}>
                <Ionicons name={option.icon as any} size={24} color={config.standard === option.id ? '#fff' : '#6B7280'} />
              </View>
              <ThemedText style={styles.optionTitle}>{option.name}</ThemedText>
            </View>
            <ThemedText style={styles.optionDescription}>{option.description}</ThemedText>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.buttonContainer}>
        <Button
          onPress={() => handleStandardSelect(config.standard || 'intermediate')}
          disabled={!config.standard}
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