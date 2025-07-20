import Button from '@/components/Button';
import { ProgressBar } from '@/components/shared/ProgressBar';
import { ResultStatCard } from '@/components/shared/ResultStatCard';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import Ionicons from '@expo/vector-icons/Ionicons';
import React from 'react';
import { ScrollView, Share, StyleSheet, View } from 'react-native';

type ExamResultProps = {
  totalQuestions: number;
  correctAnswers: number;
  incorrectAnswers: number;
  unanswered: number;
  timeTaken: number; // in seconds
  subject: string;
  onGoHome: () => void;
  onViewAnswers: () => void;
};

export function ExamResult({
  totalQuestions,
  correctAnswers,
  incorrectAnswers,
  unanswered,
  timeTaken,
  subject,
  onGoHome,
  onViewAnswers,
}: ExamResultProps) {
  const score = Math.round((correctAnswers / totalQuestions) * 100);
  
  // Format time taken
  const formatTimeTaken = () => {
    const minutes = Math.floor(timeTaken / 60);
    const seconds = timeTaken % 60;
    return `${minutes} মি. ${seconds} সে.`;
  };

  // Get performance message
  const getPerformanceMessage = () => {
    if (score >= 80) return 'দারুণ পারফরম্যান্স!';
    if (score >= 60) return 'ভালো করেছ!';
    if (score >= 40) return 'আরো ভালো করতে পারো!';
    return 'আরো অনুশীলন প্রয়োজন!';
  };

  // Handle share result
  const handleShare = async () => {
    try {
      await Share.share({
        message: 
          `আমি ${subject}-এ পরীক্ষায় ${score}% স্কোর করেছি! ${correctAnswers}/${totalQuestions} প্রশ্নের সঠিক উত্তর দিয়েছি।`,
      });
    } catch (error) {
      console.error('Error sharing result:', error);
    }
  };

  return (
    <ThemedView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.resultHeader}>
          <ThemedText style={styles.resultTitle}>পরীক্ষার ফলাফল</ThemedText>
          <ThemedText style={styles.subjectName}>{subject}</ThemedText>
        </View>

        <View style={styles.scoreContainer}>
          <View style={styles.scoreCircle}>
            <ThemedText style={styles.scoreValue}>{score}%</ThemedText>
            <ThemedText style={styles.scoreLabel}>স্কোর</ThemedText>
          </View>
          
          <ThemedText style={styles.performanceText}>
            {getPerformanceMessage()}
          </ThemedText>
        </View>

        <View style={styles.statsContainer}>
          <ResultStatCard
            title="সঠিক"
            value={correctAnswers}
            variant="success"
            style={styles.statCard}
          />
          <ResultStatCard
            title="ভুল"
            value={incorrectAnswers}
            variant="error"
            style={styles.statCard}
          />
          <ResultStatCard
            title="উত্তর দেওয়া হয়নি"
            value={unanswered}
            variant="warning"
            style={styles.statCard}
          />
        </View>

        <View style={styles.progressSection}>
          <ThemedText style={styles.sectionTitle}>পারফরম্যান্স বিশ্লেষণ</ThemedText>
          <View style={styles.progressItem}>
            <View style={styles.progressHeader}>
              <ThemedText style={styles.progressLabel}>সঠিক উত্তর</ThemedText>
              <ThemedText style={styles.progressValue}>{correctAnswers}/{totalQuestions}</ThemedText>
            </View>
            <ProgressBar 
              value={correctAnswers}
              max={totalQuestions}
              color="#10B981"
            />
          </View>
          
          <View style={styles.metaInfo}>
            <View style={styles.metaItem}>
              <Ionicons name="time-outline" size={16} color="#6B7280" />
              <ThemedText style={styles.metaText}>সময় লেগেছে: {formatTimeTaken()}</ThemedText>
            </View>
            <View style={styles.metaItem}>
              <Ionicons name="help-circle-outline" size={16} color="#6B7280" />
              <ThemedText style={styles.metaText}>মোট প্রশ্ন: {totalQuestions}</ThemedText>
            </View>
          </View>
        </View>

        <View style={styles.buttonContainer}>
          <Button 
            onPress={handleShare}
            variant="outline"
            style={styles.shareButton}
          >
            <View style={styles.buttonContent}>
              <Ionicons name="share-outline" size={18} color="#171717" />
              <ThemedText>ফলাফল শেয়ার করুন</ThemedText>
            </View>
          </Button>
          
          <Button 
            onPress={onViewAnswers}
            variant="outline"
            style={styles.viewButton}
          >
            <ThemedText>উত্তরসমূহ দেখুন</ThemedText>
          </Button>
          
          <Button 
            onPress={onGoHome}
            style={styles.homeButton}
          >
            <ThemedText>হোম পেজে ফিরে যান</ThemedText>
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
  scoreContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  scoreCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 8,
    borderColor: '#9333EA',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  scoreValue: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#9333EA',
  },
  scoreLabel: {
    fontSize: 14,
    color: '#6B7280',
  },
  performanceText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#9333EA',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  statCard: {
    flex: 1,
    marginHorizontal: 4,
  },
  progressSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  progressItem: {
    marginBottom: 12,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  progressLabel: {
    fontSize: 14,
  },
  progressValue: {
    fontSize: 14,
    fontWeight: '600',
  },
  metaInfo: {
    marginTop: 16,
    backgroundColor: '#F9FAFB',
    borderRadius: 8,
    padding: 12,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  metaText: {
    fontSize: 14,
    color: '#4B5563',
  },
  buttonContainer: {
    gap: 12,
  },
  shareButton: {
    marginBottom: 8,
  },
  viewButton: {
    marginBottom: 8,
  },
  homeButton: {},
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
}); 