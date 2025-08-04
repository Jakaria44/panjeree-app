import Button from '@/components/Button';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { examConfigAtom } from '@/store/exam';
import { mockQuestions } from '@/utils/mockData';
import { useAtom } from 'jotai';
import { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { TimerProgress } from './TimerProgress';

export function MockExam() {
  const [config, setConfig] = useAtom(examConfigAtom);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [timeLeft, setTimeLeft] = useState(config.totalTime * 60); // Convert to seconds
  const [isExamComplete, setIsExamComplete] = useState(false);

  const currentQuestion = mockQuestions[currentQuestionIndex];

  useEffect(() => {
    if (timeLeft <= 0 && !isExamComplete) {
      handleExamComplete();
    }
  }, [timeLeft, isExamComplete]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleAnswerSelect = (answer: string) => {
    setAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: answer,
    }));
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < mockQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      handleExamComplete();
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleExamComplete = () => {
    setIsExamComplete(true);

    // Calculate results
    const totalQuestions = mockQuestions.length;
    const correctAnswers = mockQuestions.reduce((count, question) => {
      return count + (answers[question.id] === question.correctAnswer ? 1 : 0);
    }, 0);
    const incorrectAnswers = totalQuestions - correctAnswers;
    const timeTaken = config.totalTime * 60 - timeLeft;

    const examResults = {
      totalQuestions,
      correctAnswers,
      incorrectAnswers,
      unanswered: 0,
      timeTaken,
      answers,
    };

    setConfig((prev) => ({
      ...prev,
      examResults,
      step: 5,
    }));
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  if (!currentQuestion) {
    return (
      <ThemedView style={styles.container}>
        <ThemedText style={styles.errorText}>No questions available</ThemedText>
      </ThemedView>
    );
  }

  return (
    <ThemedView style={styles.container}>
      <View style={styles.header}>
        <ThemedText style={styles.title}>
          {config.subject?.name} - পরীক্ষা
        </ThemedText>
        <View style={styles.progressContainer}>
          <ThemedText style={styles.progressText}>
            প্রশ্ন {currentQuestionIndex + 1} / {mockQuestions.length}
          </ThemedText>
          <TimerProgress
            timeLeft={timeLeft}
            totalTime={config.totalTime * 60}
          />
        </View>
      </View>

      <ScrollView
        style={styles.questionContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.questionCard}>
          <ThemedText style={styles.questionText}>
            {currentQuestion.text}
          </ThemedText>

          <View style={styles.optionsContainer}>
            {currentQuestion.options.map((option, index) => {
              const isSelected = answers[currentQuestion.id] === option;
              return (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.optionButton,
                    isSelected && styles.selectedOption,
                  ]}
                  onPress={() => handleAnswerSelect(option)}
                  activeOpacity={0.7}
                >
                  <ThemedText
                    style={[
                      styles.optionText,
                      isSelected && styles.selectedOptionText,
                    ]}
                  >
                    {String.fromCharCode(65 + index)}. {option}
                  </ThemedText>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <View style={styles.navigationButtons}>
          <Button
            title='পূর্ববর্তী'
            onPress={handlePreviousQuestion}
            disabled={currentQuestionIndex === 0}
            style={styles.navButton}
          />
          <Button
            title={
              currentQuestionIndex === mockQuestions.length - 1
                ? 'সমাপ্ত'
                : 'পরবর্তী'
            }
            onPress={handleNextQuestion}
            style={styles.navButton}
          />
        </View>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    marginBottom: 24,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  progressContainer: {
    marginBottom: 16,
  },
  progressText: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 8,
  },
  questionContainer: {
    flex: 1,
  },
  questionCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  questionText: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 20,
  },
  optionsContainer: {
    gap: 12,
  },
  optionButton: {
    padding: 16,
    borderWidth: 2,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    backgroundColor: 'white',
  },
  selectedOption: {
    borderColor: '#9333EA',
    backgroundColor: '#FAF5FF',
  },
  optionText: {
    fontSize: 14,
    lineHeight: 20,
  },
  selectedOptionText: {
    color: '#9333EA',
    fontWeight: '500',
  },
  footer: {
    marginTop: 16,
  },
  navigationButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  navButton: {
    flex: 1,
    backgroundColor: '#9333EA',
  },
  errorText: {
    fontSize: 16,
    textAlign: 'center',
    color: '#EF4444',
  },
});
