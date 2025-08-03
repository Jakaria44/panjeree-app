import Button from '@/components/Button';
import { ResultStatCard } from '@/components/shared/ResultStatCard';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { practiceConfigAtom } from '@/store/prepare';
import { Ionicons } from '@expo/vector-icons';
import { useAtom } from 'jotai';
import React from 'react';
import { ScrollView, Share, StyleSheet, View } from 'react-native';

type PracticeResultProps = {
  totalQuestions: number;
  correctAnswers: number;
  incorrectAnswers: number;
  skippedQuestions: number;
  timeTaken: number; // in seconds
  subject: string;
  onRetry: () => void;
  onGoHome: () => void;
  onViewAnswers: () => void;
};

export function PracticeResult({
  totalQuestions,
  correctAnswers,
  incorrectAnswers,
  skippedQuestions,
  timeTaken,
  subject,
  onRetry,
  onGoHome,
  onViewAnswers,
}: PracticeResultProps) {
  const [, setConfig] = useAtom(practiceConfigAtom);
  
  const score = Math.round((correctAnswers / totalQuestions) * 100);
  
  // Format time taken
  const formatTimeTaken = () => {
    const minutes = Math.floor(timeTaken / 60);
    const seconds = timeTaken % 60;
    return `${minutes} মি. ${seconds} সে.`;
  };

  // Get performance message
  const getPerformanceMessage = () => {
    if (score >= 80) return 'দারুণ অনুশীলন!';
    if (score >= 60) return 'ভালো করেছ!';
    if (score >= 40) return 'আরো ভালো করতে পারো!';
    return 'আরো অনুশীলন প্রয়োজন!';
  };

  // Handle share result
  const handleShare = async () => {
    try {
      await Share.share({
        message: 
          `আমি ${subject}-এ অনুশীলনে ${score}% স্কোর করেছি! ${correctAnswers}/${totalQuestions} প্রশ্নের সঠিক উত্তর দিয়েছি।`,
      });
    } catch (error) {
      console.error('Error sharing result:', error);
    }
  };

  // Reset to home function using atom
  const restart = () => {
    setConfig({
      step: 1,
      subject: null,
      paper: null,
      selectedSections: {},
    });
  };

  return (
    <ThemedView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.resultHeader}>
          <ThemedText style={styles.resultTitle}>অনুশীলন ফলাফল</ThemedText>
          <ThemedText style={styles.subjectName}>{subject}</ThemedText>
        </View>

        <View style={styles.statsContainer}>
          <View style={styles.statCardWrapper}>
            <Ionicons name="checkmark-circle" size={24} color="#10B981" style={styles.statIcon} />
            <ResultStatCard
              title="সঠিক উত্তর"
              value={`${correctAnswers} টি`}
              variant="success"
              style={styles.statCard}
            />
          </View>
          
          <View style={styles.statCardWrapper}>
            <Ionicons name="close-circle" size={24} color="#EF4444" style={styles.statIcon} />
            <ResultStatCard
              title="ভুল উত্তর"
              value={`${incorrectAnswers} টি`}
              variant="error"
              style={styles.statCard}
            />
          </View>
          
          <View style={styles.statCardWrapper}>
            <Ionicons name="alert-circle" size={24} color="#F97316" style={styles.statIcon} />
            <ResultStatCard
              title="উত্তর দেননি"
              value={`${skippedQuestions} টি`}
              variant="warning"
              style={styles.statCard}
            />
          </View>
          
          <View style={styles.statCardWrapper}>
            <Ionicons name="time" size={24} color="#3B82F6" style={styles.statIcon} />
            <ResultStatCard
              title="সময় নিয়েছে"
              value={formatTimeTaken()}
              variant="info"
              style={styles.statCard}
            />
          </View>
        </View>

        <View style={styles.leaderboardPlaceholder}>
          <ThemedText style={styles.leaderboardTitle}>লিডারবোর্ড</ThemedText>
          <View style={styles.emptyLeaderboard}>
            <Ionicons name="trophy" size={36} color="#D1D5DB" />
            <ThemedText style={styles.emptyLeaderboardText}>
              পাঞ্জেরি+ ব্যবহারকারীরা দেখতে পারে লিডারবোর্ডে আপনি কোন স্থানে আছেন!
            </ThemedText>
          </View>
        </View>

        <View style={styles.buttonContainer}>
          <Button 
            onPress={restart} 
            style={styles.tryAgainButton}
          >
            আবার চেষ্টা করুন
          </Button>
        </View>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  resultHeader: {
    alignItems: 'center',
    marginBottom: 24,
  },
  resultTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  subjectName: {
    fontSize: 16,
    color: '#6B7280',
  },
  statsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 24,
  },
  statCardWrapper: {
    flex: 1,
    minWidth: '48%',
    marginBottom: 8,
    position: 'relative',
  },
  statIcon: {
    position: 'absolute',
    top: -4,
    left: -4,
    zIndex: 1,
  },
  statCard: {
    flex: 1,
    paddingTop: 24,
  },
  leaderboardPlaceholder: {
    marginBottom: 24,
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    padding: 16,
  },
  leaderboardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  emptyLeaderboard: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    gap: 12,
  },
  emptyLeaderboardText: {
    textAlign: 'center',
    color: '#6B7280',
  },
  buttonContainer: {
    marginTop: 8,
    alignItems: 'center',
  },
  tryAgainButton: {
    backgroundColor: '#9333EA',
    minWidth: 200,
  },
}); 