import Button from '@/components/Button';
import { ProgressBar } from '@/components/shared/ProgressBar';
import { QuestionDisplay } from '@/components/shared/QuestionDisplay';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { mockQuestions } from '@/store/exam';
import { practiceConfigAtom } from '@/store/prepare';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useAtom } from 'jotai';
import React, { useEffect, useState } from 'react';
import { Alert, StyleSheet, TouchableOpacity, View } from 'react-native';

export function PracticeSession() {
  const [config, setConfig] = useAtom(practiceConfigAtom);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | undefined>(undefined);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isAnswered, setIsAnswered] = useState(false);
  const [timeSpent, setTimeSpent] = useState(0);

  // Timer effect
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeSpent(prev => prev + 1);
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);

  const totalQuestions = 10; // Fixed number of questions as per web version
  const currentQuestion = mockQuestions[currentQuestionIndex % mockQuestions.length];

  const handleAnswerSelect = (answer: string) => {
    if (!isAnswered) {
      setSelectedAnswer(answer);
      setAnswers(prev => ({
        ...prev,
        [currentQuestion.id]: answer
      }));
      setIsAnswered(true);
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setSelectedAnswer(undefined);
      setIsAnswered(false);
    } else {
      // Go to results page
      submitPractice();
    }
  };

  const submitPractice = () => {
    // Calculate results
    let correctAnswers = 0;
    let incorrectAnswers = 0;
    let skippedQuestions = 0;

    // Count through the answered questions
    for (let i = 0; i < totalQuestions; i++) {
      const questionId = mockQuestions[i % mockQuestions.length].id;
      const userAnswer = answers[questionId];
      const correctAnswer = mockQuestions[i % mockQuestions.length].correctAnswer;
      
      if (!userAnswer) {
        skippedQuestions++;
      } else if (userAnswer === correctAnswer) {
        correctAnswers++;
      } else {
        incorrectAnswers++;
      }
    }

    // Move to result page
    setConfig(prev => ({ 
      ...prev, 
      step: 4,
      practiceResults: {
        totalQuestions,
        correctAnswers,
        incorrectAnswers,
        skippedQuestions,
        timeTaken: timeSpent,
        answers,
      }
    }));
  };

  const goBack = () => {
    Alert.alert(
      'সেশন বাতিল করুন?',
      'আপনি কি নিশ্চিত আপনি সেশন বাতিল করতে চান?',
      [
        {
          text: 'না',
          style: 'cancel'
        },
        {
          text: 'হ্যাঁ',
          onPress: () => setConfig(prev => ({
            ...prev,
            step: 2,
            selectedSections: {},
          }))
        }
      ]
    );
  };

  // Format time function
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <ThemedView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={goBack} style={styles.closeButton}>
          <Ionicons name="close" size={24} color="#4B5563" />
        </TouchableOpacity>
        
        <View style={styles.progressContainer}>
          <ProgressBar 
            value={currentQuestionIndex + 1}
            max={totalQuestions}
            size="md"
          />
        </View>
        
        <View style={styles.timeContainer}>
          <ThemedText style={styles.timeText}>{formatTime(timeSpent)}</ThemedText>
        </View>
      </View>

      <LinearGradient
        colors={['#8B5CF6', '#6366F1']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.premiumBanner}
      >
        <View style={styles.premiumContent}>
          <Ionicons name="sparkles" size={20} color="#FFFFFF" />
          <ThemedText style={styles.premiumText}>
            ব্যাখ্যা আনলক করতে পাঞ্জেরি+ আপগ্রেড কর
          </ThemedText>
        </View>
        <Ionicons name="chevron-forward" size={20} color="#FFFFFF" />
      </LinearGradient>

      <View style={styles.questionContainer}>
        <QuestionDisplay
          key={currentQuestionIndex}
          questionNumber={currentQuestionIndex + 1}
          questionText={currentQuestion.text}
          options={currentQuestion.options.map((opt, index) => ({ 
            id: opt, 
            text: opt,
            key: `option-${index}`
          }))}
          userAnswer={selectedAnswer}
          onSelectOption={handleAnswerSelect}
        />
      </View>

      {isAnswered && (
        <View style={styles.buttonContainer}>
          <Button 
            onPress={handleNext} 
            style={styles.nextButton}
          >
            {currentQuestionIndex < totalQuestions - 1 ? 'পরবর্তী' : 'ফলাফল দেখুন'}
          </Button>
        </View>
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    gap: 12,
  },
  closeButton: {
    padding: 4,
  },
  progressContainer: {
    flex: 1,
  },
  timeContainer: {
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 16,
  },
  timeText: {
    fontSize: 14,
    color: '#4B5563',
    fontWeight: '600',
  },
  premiumBanner: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    borderRadius: 12,
    marginBottom: 16,
  },
  premiumContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  premiumText: {
    color: '#FFFFFF',
    fontWeight: '500',
  },
  questionContainer: {
    flex: 1,
  },
  buttonContainer: {
    marginTop: 16,
    alignItems: 'flex-end',
  },
  nextButton: {
    backgroundColor: '#9333EA',
    paddingHorizontal: 24,
    minWidth: 120,
  },
}); 