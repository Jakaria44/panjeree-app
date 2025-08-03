import Button from '@/components/Button';
import { QuestionDisplay } from '@/components/shared/QuestionDisplay';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { questionBankConfigAtom } from '@/store/question-bank';
import { Ionicons } from '@expo/vector-icons';
import { useAtom } from 'jotai';
import React, { useState } from 'react';
import { Alert, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';

type Question = {
  id: string;
  text: string;
  options: {
    id: string;
    text: string;
  }[];
  correctAnswer: string;
};

// Mock question bank questions
const questionBankQuestions: Question[] = [
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

export function Step4QuestionView() {
  const [config, setConfig] = useAtom(questionBankConfigAtom);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [showAnswers, setShowAnswers] = useState(false);

  const totalQuestions = questionBankQuestions.length;

  const handleAnswer = (questionId: string, optionId: string) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: optionId,
    }));
  };

  const confirmSubmit = () => {
    Alert.alert(
      'প্রশ্ন ব্যাংক সমাপ্ত করবেন?',
      'আপনি কি নিশ্চিত যে আপনি প্রশ্ন ব্যাংক সমাপ্ত করতে চান?',
      [
        {
          text: 'না, ফিরে যান',
          style: 'cancel',
        },
        {
          text: 'হ্যাঁ, সমাপ্ত করুন',
          onPress: handleSubmitQuestionBank,
        },
      ],
    );
  };

  const handleSubmitQuestionBank = () => {
    // Calculate results
    let correctAnswers = 0;
    let incorrectAnswers = 0;
    let unanswered = 0;

    questionBankQuestions.forEach(question => {
      const userAnswer = answers[question.id];
      if (!userAnswer) {
        unanswered++;
      } else if (userAnswer === question.correctAnswer) {
        correctAnswers++;
      } else {
        incorrectAnswers++;
      }
    });

    // Move to result page
    setConfig(prev => ({ 
      ...prev, 
      step: 5,
      questionBankResults: {
        totalQuestions: questionBankQuestions.length,
        correctAnswers,
        incorrectAnswers,
        unanswered,
        timeTaken: 1200, // Mock time taken in seconds
        answers,
      }
    }));
  };

  const renderQuestion = (question: Question, index: number) => {
    return (
      <View key={question.id} style={styles.questionItem}>
        <QuestionDisplay
          questionNumber={index + 1}
          questionText={question.text}
          options={question.options}
          userAnswer={answers[question.id]}
          onSelectOption={(optionId) => handleAnswer(question.id, optionId)}
          showAnswer={showAnswers}
          correctAnswer={question.correctAnswer}
        />
      </View>
    );
  };

  const answeredCount = Object.keys(answers).length;

  return (
    <ThemedView style={styles.container}>
      <View style={styles.header}>
        <ThemedText style={styles.title}>প্রশ্ন ব্যাংক</ThemedText>
        <ThemedText style={styles.subtitle}>
          {config.subject?.name} - {config.type === 'board' ? 'বোর্ড প্রশ্ন' : 'স্কুল প্রশ্ন'}
        </ThemedText>
        <View style={styles.progressInfo}>
          <ThemedText style={styles.questionCounter}>
            উত্তর দেওয়া হয়েছে: {answeredCount}/{totalQuestions}
          </ThemedText>
        </View>
        
        <TouchableOpacity 
          style={styles.showAnswersButton}
          onPress={() => setShowAnswers(!showAnswers)}
        >
          <Ionicons 
            name={showAnswers ? "eye-off" : "eye"} 
            size={20} 
            color="#9333EA" 
          />
          <ThemedText style={styles.showAnswersText}>
            {showAnswers ? 'উত্তর লুকান' : 'উত্তর দেখুন'}
          </ThemedText>
        </TouchableOpacity>
      </View>

      <ScrollView 
        style={styles.questionContainer}
        showsVerticalScrollIndicator={true}
        contentContainerStyle={styles.questionContent}
      >
        {questionBankQuestions.map((question, index) => renderQuestion(question, index))}
      </ScrollView>

      <View style={styles.bottomContainer}>
        <View style={styles.progressDots}>
          {questionBankQuestions.map((question, index) => (
            <View
              key={index}
              style={[
                styles.dot,
                answers[question.id] && styles.answeredDot,
              ]}
            />
          ))}
        </View>
        
        <View style={styles.buttonContainer}>
          <Button
            onPress={confirmSubmit}
            style={styles.submitButton}
          >
            সমাপ্ত করুন
          </Button>
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
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#6B7280',
    marginBottom: 8,
  },
  progressInfo: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 8,
  },
  questionCounter: {
    fontSize: 14,
    fontWeight: '600',
  },
  showAnswersButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginTop: 16,
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: '#FAF5FF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#9333EA',
  },
  showAnswersText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#9333EA',
  },
  questionContainer: {
    flex: 1,
  },
  questionContent: {
    paddingBottom: 16,
  },
  questionItem: {
    marginBottom: 24,
  },
  bottomContainer: {
    marginTop: 16,
  },
  progressDots: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 8,
    marginBottom: 16,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#E5E7EB',
  },
  answeredDot: {
    backgroundColor: '#10B981',
  },
  buttonContainer: {
    marginTop: 8,
  },
  submitButton: {
    backgroundColor: '#9333EA',
  },
}); 