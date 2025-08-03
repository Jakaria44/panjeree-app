import Button from '@/components/Button';
import { QuestionDisplay } from '@/components/shared/QuestionDisplay';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { mockQuestions } from '@/store/exam';
import React, { useEffect, useState } from 'react';
import { Alert, ScrollView, StyleSheet, View } from 'react-native';
import { TimerProgress } from './TimerProgress';

type Question = {
  id: string;
  text: string;
  options: string[];
  correctAnswer: string;
};

type MockExamProps = {
  totalTime: number; // In seconds
  onComplete: (answers: Record<string, string>) => void;
};

export function MockExam({ totalTime, onComplete }: MockExamProps) {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [timeUp, setTimeUp] = useState(false);
  const [examCompleted, setExamCompleted] = useState(false);

  // Use questions from the store
  const questions = mockQuestions;
  const totalQuestions = questions.length;

  useEffect(() => {
    if (timeUp && !examCompleted) {
      handleSubmitExam();
    }
  }, [timeUp]);

  const handleAnswer = (questionId: string, optionId: string) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: optionId,
    }));
  };

  const confirmSubmit = () => {
    Alert.alert(
      'পরীক্ষা সমাপ্ত করবেন?',
      'আপনি কি নিশ্চিত যে আপনি পরীক্ষা সমাপ্ত করতে চান?',
      [
        {
          text: 'না, ফিরে যান',
          style: 'cancel',
        },
        {
          text: 'হ্যাঁ, সমাপ্ত করুন',
          onPress: handleSubmitExam,
        },
      ],
    );
  };

  const handleSubmitExam = () => {
    setExamCompleted(true);
    onComplete(answers);
  };

  const handleTimeUp = () => {
    Alert.alert('সময় শেষ!', 'পরীক্ষার নির্ধারিত সময় শেষ হয়েছে। আপনার উত্তরগুলো জমা দেয়া হবে।', [
      { text: 'ঠিক আছে', onPress: () => setTimeUp(true) },
    ]);
  };

  const renderQuestion = (question: Question, index: number) => {
    // Convert options to the format expected by QuestionDisplay
    const options = question.options.map((option, optionIndex) => ({
      id: String.fromCharCode(97 + optionIndex), // a, b, c, d
      text: option,
    }));

    return (
      <View key={question.id} style={styles.questionItem}>
        <QuestionDisplay
          questionNumber={index + 1}
          questionText={question.text}
          options={options}
          userAnswer={answers[question.id]}
          onSelectOption={(optionId) => {
            const optionText = question.options[optionId.charCodeAt(0) - 97];
            handleAnswer(question.id, optionId);
          }}
        />
      </View>
    );
  };

  const answeredCount = Object.keys(answers).length;

  return (
    <ThemedView style={styles.container}>
      <View style={styles.header}>
        <TimerProgress totalSeconds={totalTime} onTimeUp={handleTimeUp} isPaused={examCompleted} />
        <View style={styles.progressInfo}>
          <ThemedText style={styles.questionCounter}>
            উত্তর দেওয়া হয়েছে: {answeredCount}/{totalQuestions}
          </ThemedText>
        </View>
      </View>

      <ScrollView 
        style={styles.questionContainer}
        showsVerticalScrollIndicator={true}
        contentContainerStyle={styles.questionContent}
      >
        {questions.map((question, index) => renderQuestion(question, index))}
      </ScrollView>

      <View style={styles.bottomContainer}>
        <View style={styles.progressDots}>
          {questions.map((_, index) => (
            <View
              key={index}
              style={[
                styles.dot,
                answers[questions[index].id] && styles.answeredDot,
              ]}
            />
          ))}
        </View>
        
        <View style={styles.buttonContainer}>
          <Button
            onPress={confirmSubmit}
          >
            পরীক্ষা সমাপ্ত করুন
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
    marginBottom: 16,
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
}); 