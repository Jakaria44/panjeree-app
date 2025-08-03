import Button from '@/components/Button';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { examConfigAtom } from '@/store/exam';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useAtom } from 'jotai';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { StepIndicator } from './StepIndicator';

type ExamConfirmProps = {
  onStartExam: () => void;
};

const rules = [
  "প্রতিটি MCQ প্রশ্নের জন্য চারটি করে অপশন থাকবে। সঠিক উত্তরটি বাছাই করতে হবে। তবে একাধিক সঠিক উত্তর থাকলে একাধিক উত্তর বাছাই করতে হবে।",
  "প্রতিটি সঠিক উত্তরের জন্য ১ নম্বর পাওয়া যাবে।",
  "প্রতিটি ভুল উত্তরের জন্য ০.২৫ নম্বর কাটা যাবে। [কন্ডিশনাল অন টেস্ট]",
  "সময় শেষ হয়ে গেলে অটো সাবমিট হয়ে যাবে।",
  "ইন্টারনেট জনিত সমস্যা অথবা অন্য কোন কারণে যদি এক্সাম থেকে বের হয়ে যাও, তাহলে নির্দিষ্ট টাইম শেষ হয়ে অটো সাবমিট হয়ে যাবে।",
  "নির্দিষ্ট সময়ের ভেতর দেওয়া শুধুমাত্র প্রথমবারের সাবমিটের মার্কই লিডারবোর্ডে আসবে।",
  "টাইম থেকেও প্র্যাকটিস এক্সাম দেয়া যাবে, তবে সেগুলোর মার্ক লিডারবোর্ডে আসবেনা।",
];

export function Step5ConfirmExam({ onStartExam }: ExamConfirmProps) {
  const [config, setConfig] = useAtom(examConfigAtom);
  const [isLoading, setIsLoading] = useState(false);
  
  const handleBack = () => {
    setConfig(prev => ({
      ...prev,
      step: 4
    }));
  };

  const handleExamTypeChange = (type: "mcq" | "written") => {
    setConfig(prev => ({
      ...prev,
      examType: type
    }));
  };

  const handleTimeChange = (increment: number) => {
    setConfig(prev => ({
      ...prev,
      totalTime: Math.max(1, prev.totalTime + increment)
    }));
  };

  const handleStartExam = () => {
    setIsLoading(true);
    
    // Simulating API call delay
    setTimeout(() => {
      setIsLoading(false);
      onStartExam();
    }, 1000);
  };

  return (
    <ThemedView style={styles.container}>
      <StepIndicator onBack={handleBack} />
      
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <ThemedText style={styles.title}>নিশ্চিত কর</ThemedText>

        <View style={styles.settingsContainer}>
          <View style={styles.settingRow}>
            <View>
              <ThemedText style={styles.settingLabel}>প্রশ্নের ধরন</ThemedText>
              <View style={styles.tabContainer}>
                <TouchableOpacity
                  style={[
                    styles.tab,
                    config.examType === 'mcq' && styles.activeTab
                  ]}
                  onPress={() => handleExamTypeChange('mcq')}
                >
                  <ThemedText style={config.examType === 'mcq' ? styles.activeTabText : styles.tabText}>
                    MCQ
                  </ThemedText>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.tab,
                    config.examType === 'written' && styles.activeTab
                  ]}
                  onPress={() => handleExamTypeChange('written')}
                >
                  <ThemedText style={config.examType === 'written' ? styles.activeTabText : styles.tabText}>
                    WRITTEN
                  </ThemedText>
                </TouchableOpacity>
              </View>
            </View>

            <View>
              <ThemedText style={styles.settingLabel}>মোট সময়</ThemedText>
              <View style={styles.timeControl}>
                <TouchableOpacity 
                  style={styles.timeButton}
                  onPress={() => handleTimeChange(-1)}
                  disabled={config.totalTime <= 1}
                >
                  <Ionicons name="remove" size={20} color="#6B7280" />
                </TouchableOpacity>
                <ThemedText style={styles.timeText}>{config.totalTime} মিনিট</ThemedText>
                <TouchableOpacity 
                  style={styles.timeButton}
                  onPress={() => handleTimeChange(1)}
                >
                  <Ionicons name="add" size={20} color="#6B7280" />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.rulesContainer}>
          {rules.map((rule, index) => (
            <View key={index} style={styles.ruleItem}>
              <Ionicons name="checkmark-circle" size={20} color="#10B981" style={styles.ruleIcon} />
              <ThemedText style={styles.ruleText}>{rule}</ThemedText>
            </View>
          ))}
        </View>
      </ScrollView>

      <View style={styles.buttonContainer}>
        <Button
          onPress={handleStartExam}
          isLoading={isLoading}
        >
          পরীক্ষা শুরু করুন
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
  scrollView: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  settingsContainer: {
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  settingLabel: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 8,
    textAlign: 'center',
  },
  tabContainer: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    overflow: 'hidden',
  },
  tab: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: '#F9FAFB',
  },
  activeTab: {
    backgroundColor: '#9333EA',
  },
  tabText: {
    color: '#6B7280',
    fontWeight: '500',
  },
  activeTabText: {
    color: '#FFFFFF',
    fontWeight: '500',
  },
  timeControl: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    overflow: 'hidden',
  },
  timeButton: {
    padding: 8,
    backgroundColor: '#F3F4F6',
  },
  timeText: {
    paddingHorizontal: 12,
    fontSize: 16,
    fontWeight: '500',
  },
  rulesContainer: {
    marginBottom: 24,
  },
  ruleItem: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  ruleIcon: {
    marginRight: 8,
    marginTop: 2,
  },
  ruleText: {
    flex: 1,
    fontSize: 14,
    lineHeight: 20,
    color: '#4B5563',
  },
  buttonContainer: {
    marginTop: 16,
  },
}); 