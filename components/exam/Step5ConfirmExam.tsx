import Button from '@/components/Button';
import { SummaryStatCard } from '@/components/shared/SummaryStatCard';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { examConfigAtom } from '@/store/exam';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useAtom } from 'jotai';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';

type ExamConfirmProps = {
  onStartExam: () => void;
};

export function Step5ConfirmExam({ onStartExam }: ExamConfirmProps) {
  const [config, setConfig] = useAtom(examConfigAtom);
  const [isLoading, setIsLoading] = useState(false);
  
  const selectedChaptersCount = config.selectedChapters?.length || 0;

  // Standard to difficulty mapping
  const getDifficultyText = () => {
    switch (config.standard) {
      case 'basic':
        return 'সহজ';
      case 'intermediate':
        return 'মধ্যম';
      case 'advanced':
        return 'কঠিন';
      default:
        return 'মধ্যম';
    }
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
      <ThemedText style={styles.title}>পরীক্ষার সারসংক্ষেপ</ThemedText>
      <ThemedText style={styles.subtitle}>
        পরীক্ষা শুরু করার আগে সমস্ত তথ্য যাচাই করুন
      </ThemedText>

      <View style={styles.statsContainer}>
        <View style={styles.statsRow}>
          <SummaryStatCard
            title="বিষয়"
            value={config.subject?.name || ''}
            icon={<Ionicons name="book-outline" size={20} color="#6B7280" />}
          />
          
          <SummaryStatCard
            title="অধ্যায়"
            value={selectedChaptersCount}
            icon={<Ionicons name="list-outline" size={20} color="#6B7280" />}
          />
        </View>
        
        <View style={styles.statsRow}>
          <SummaryStatCard
            title="সময়"
            value={`${config.time} মিনিট`}
            icon={<Ionicons name="timer-outline" size={20} color="#6B7280" />}
          />
          
          <SummaryStatCard
            title="কঠিনতা"
            value={getDifficultyText()}
            icon={<Ionicons name="speedometer-outline" size={20} color="#6B7280" />}
          />
        </View>
        
        <SummaryStatCard
          title="মোট প্রশ্ন"
          value={config.totalQuestions?.toString() || '20'}
          icon={<Ionicons name="help-circle-outline" size={20} color="#6B7280" />}
        />
      </View>

      <View style={styles.noteContainer}>
        <View style={styles.noteIconContainer}>
          <Ionicons name="information-circle-outline" size={24} color="#2563EB" />
        </View>
        <ThemedText style={styles.noteText}>
          পরীক্ষা শুরু করার পর আপনি {config.time} মিনিটের মধ্যে {config.totalQuestions} টি প্রশ্নের উত্তর দিতে হবে। সময় শেষ হলে পরীক্ষা স্বয়ংক্রিয়ভাবে সমাপ্ত হবে।
        </ThemedText>
      </View>

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
  statsContainer: {
    flex: 1,
    gap: 12,
  },
  statsRow: {
    flexDirection: 'row',
    gap: 12,
  },
  noteContainer: {
    flexDirection: 'row',
    backgroundColor: '#EFF6FF',
    borderRadius: 8,
    padding: 12,
    marginVertical: 24,
    gap: 12,
  },
  noteIconContainer: {
    marginTop: 2,
  },
  noteText: {
    flex: 1,
    fontSize: 14,
    color: '#1E40AF',
    lineHeight: 20,
  },
  buttonContainer: {
    marginTop: 8,
  },
}); 