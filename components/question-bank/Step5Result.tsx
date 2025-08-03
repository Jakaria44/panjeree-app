import Button from '@/components/Button';
import { ProgressBar } from '@/components/shared/ProgressBar';
import { QuestionDisplay } from '@/components/shared/QuestionDisplay';
import { ResultStatCard } from '@/components/shared/ResultStatCard';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useThemeColor } from '@/hooks/useThemeColor';
import { questionBankConfigAtom } from '@/store/question-bank';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useAtom } from 'jotai';
import React from 'react';
import { ScrollView, Share, StyleSheet, View } from 'react-native';

// Mock question bank questions (same as in Step4QuestionView)
const questionBankQuestions = [
  {
    id: '1',
    text: 'বাংলা ভাষার আদি সাহিত্য কোন যুগে রচিত হয়েছিল?',
    options: [
      { id: 'a', text: 'চর্যাপদ যুগ' },
      { id: 'b', text: 'মঙ্গলকাব্য যুগ' },
      { id: 'c', text: 'বৈষ্ণব পদাবলী যুগ' },
      { id: 'd', text: 'আধুনিক যুগ' },
    ],
    correctAnswer: 'a',
  },
  {
    id: '2',
    text: 'বাংলা সাহিত্যের প্রথম মহিলা কবি কে?',
    options: [
      { id: 'a', text: 'চন্দ্রাবতী' },
      { id: 'b', text: 'মাধবী' },
      { id: 'c', text: 'রুক্মিণী' },
      { id: 'd', text: 'রাধা' },
    ],
    correctAnswer: 'a',
  },
];

export function Step5Result() {
  const [config, setConfig] = useAtom(questionBankConfigAtom);
  
  // Use actual results from config if available, otherwise use mock
  const results = config.questionBankResults || {
    totalQuestions: 20,
    correctAnswers: 16,
    incorrectAnswers: 3,
    unanswered: 1,
    timeTaken: 1200,
    answers: {},
  };

  const score = Math.round((results.correctAnswers / results.totalQuestions) * 100);
  
  // Use global theme colors
  const mutedTextColor = useThemeColor({}, 'mutedForeground');
  const purpleColor = '#9333EA'; // Use the design purple color
  
  // Format time taken
  const formatTimeTaken = () => {
    const minutes = Math.floor(results.timeTaken / 60);
    const seconds = results.timeTaken % 60;
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
          `আমি ${config.subject?.name}-এ প্রশ্ন ব্যাংকে ${score}% স্কোর করেছি! ${results.correctAnswers}/${results.totalQuestions} প্রশ্নের সঠিক উত্তর দিয়েছি।`,
      });
    } catch (error) {
      console.error('Error sharing result:', error);
    }
  };

  const handleGoHome = () => {
    setConfig(prev => ({ ...prev, step: 1 }));
  };

  // Get verdict for a question
  const getVerdict = (questionId: string) => {
    const userAnswerId = results.answers[questionId];
    const question = questionBankQuestions.find(q => q.id === questionId);
    
    if (!question) return { status: 'unanswered', text: 'উত্তর দেওয়া হয়নি' };
    if (!userAnswerId) return { status: 'unanswered', text: 'উত্তর দেওয়া হয়নি' };
    
    if (userAnswerId === question.correctAnswer) {
      return { status: 'correct', text: 'সঠিক' };
    } else {
      return { status: 'incorrect', text: 'ভুল' };
    }
  };

  return (
    <ThemedView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.resultHeader}>
          <ThemedText style={styles.resultTitle}>প্রশ্ন ব্যাংক ফলাফল</ThemedText>
          <ThemedText style={styles.subjectName}>{config.subject?.name}</ThemedText>
        </View>

        <View style={styles.scoreContainer}>
          <View style={[styles.scoreCircle, { borderColor: purpleColor }]}>
            <ThemedText style={[styles.scoreValue, { color: purpleColor }]}>{score}%</ThemedText>
            <ThemedText style={[styles.scoreLabel, { color: mutedTextColor }]}>স্কোর</ThemedText>
          </View>
          
          <ThemedText style={[styles.performanceText, { color: purpleColor }]}>
            {getPerformanceMessage()}
          </ThemedText>
        </View>

        <View style={styles.statsContainer}>
          <ResultStatCard
            title="সঠিক"
            value={results.correctAnswers}
            variant="success"
            style={styles.statCard}
          />
          <ResultStatCard
            title="ভুল"
            value={results.incorrectAnswers}
            variant="error"
            style={styles.statCard}
          />
          <ResultStatCard
            title="উত্তর দেওয়া হয়নি"
            value={results.unanswered}
            variant="warning"
            style={styles.statCard}
          />
        </View>

        <View style={styles.progressSection}>
          <ThemedText style={styles.sectionTitle}>পারফরম্যান্স বিশ্লেষণ</ThemedText>
          <View style={styles.progressItem}>
            <View style={styles.progressHeader}>
              <ThemedText style={styles.progressLabel}>সঠিক উত্তর</ThemedText>
              <ThemedText style={styles.progressValue}>{results.correctAnswers}/{results.totalQuestions}</ThemedText>
            </View>
            <ProgressBar 
              value={results.correctAnswers}
              max={results.totalQuestions}
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
              <ThemedText style={styles.metaText}>মোট প্রশ্ন: {results.totalQuestions}</ThemedText>
            </View>
          </View>
        </View>

        <View style={styles.answersSection}>
          <ThemedText style={styles.sectionTitle}>উত্তরপত্র</ThemedText>
          
          {questionBankQuestions.map((question, index) => {
            const userAnswerId = results.answers[question.id];
            const verdict = getVerdict(question.id);
            
            return (
              <View key={question.id} style={styles.questionItem}>
                <View style={styles.questionHeader}>
                  <View style={styles.questionNumber}>
                    <ThemedText style={styles.questionNumberText}>{index + 1}</ThemedText>
                  </View>
                  <View style={[
                    styles.verdictBadge,
                    verdict.status === 'correct' && styles.correctBadge,
                    verdict.status === 'incorrect' && styles.incorrectBadge,
                    verdict.status === 'unanswered' && styles.unansweredBadge,
                  ]}>
                    <ThemedText style={[
                      styles.verdictText,
                      verdict.status === 'correct' && styles.correctText,
                      verdict.status === 'incorrect' && styles.incorrectText,
                      verdict.status === 'unanswered' && styles.unansweredText,
                    ]}>
                      {verdict.text}
                    </ThemedText>
                  </View>
                </View>
                
                <QuestionDisplay
                  questionText={question.text}
                  options={question.options}
                  userAnswer={userAnswerId}
                  correctAnswer={question.correctAnswer}
                  showAnswer={true}
                />
              </View>
            );
          })}
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
            onPress={handleGoHome}
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
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  scoreValue: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  scoreLabel: {
    fontSize: 14,
  },
  performanceText: {
    fontSize: 18,
    fontWeight: '600',
  },
  statsContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
  },
  statCard: {
    flex: 1,
  },
  progressSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  progressItem: {
    marginBottom: 16,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  progressLabel: {
    fontSize: 14,
    color: '#6B7280',
  },
  progressValue: {
    fontSize: 14,
    fontWeight: '600',
  },
  metaInfo: {
    gap: 8,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  metaText: {
    fontSize: 14,
    color: '#6B7280',
  },
  answersSection: {
    marginBottom: 24,
  },
  questionItem: {
    marginBottom: 24,
    padding: 16,
    borderRadius: 12,
    backgroundColor: '#F9FAFB',
  },
  questionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  questionNumber: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#E0E7FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  questionNumberText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#4B5563',
  },
  verdictBadge: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 8,
  },
  correctBadge: {
    backgroundColor: '#D1FAE5',
    borderWidth: 1,
    borderColor: '#10B981',
  },
  incorrectBadge: {
    backgroundColor: '#FEE2E2',
    borderWidth: 1,
    borderColor: '#EF4444',
  },
  unansweredBadge: {
    backgroundColor: '#F3F4F6',
    borderWidth: 1,
    borderColor: '#D1D5DB',
  },
  verdictText: {
    fontSize: 12,
    fontWeight: '600',
  },
  correctText: {
    color: '#10B981',
  },
  incorrectText: {
    color: '#EF4444',
  },
  unansweredText: {
    color: '#6B7280',
  },
  buttonContainer: {
    gap: 12,
  },
  shareButton: {
    marginBottom: 8,
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  homeButton: {
    backgroundColor: '#9333EA',
  },
}); 