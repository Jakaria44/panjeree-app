import Button from '@/components/Button';
import { QuestionDisplay } from '@/components/shared/QuestionDisplay';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import React, { useEffect, useState } from 'react';
import { Alert, FlatList, StyleSheet, View } from 'react-native';
import { TimerProgress } from './TimerProgress';

type Question = {
  id: string;
  text: string;
  options: {
    id: string;
    text: string;
  }[];
  correctAnswer: string;
};

type MockExamProps = {
  questions: Question[];
  totalTime: number; // In seconds
  onComplete: (answers: Record<string, string>) => void;
};

export function MockExam({ questions, totalTime, onComplete }: MockExamProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [timeUp, setTimeUp] = useState(false);
  const [examCompleted, setExamCompleted] = useState(false);

  const currentQuestion = questions[currentQuestionIndex];
  const totalQuestions = questions.length;
  const isLastQuestion = currentQuestionIndex === totalQuestions - 1;

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

  const handleNext = () => {
    if (isLastQuestion) {
      confirmSubmit();
    } else {
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
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

  const renderItem = ({ item, index }: { item: Question; index: number }) => {
    const isActive = index === currentQuestionIndex;
    if (!isActive) return null;

    return (
      <QuestionDisplay
        questionNumber={index + 1}
        questionText={item.text}
        options={item.options}
        userAnswer={answers[item.id]}
        onSelectOption={(optionId) => handleAnswer(item.id, optionId)}
      />
    );
  };

  return (
    <ThemedView style={styles.container}>
      <View style={styles.header}>
        <TimerProgress totalSeconds={totalTime} onTimeUp={handleTimeUp} isPaused={examCompleted} />
        <View style={styles.progressInfo}>
          <ThemedText style={styles.questionCounter}>
            {currentQuestionIndex + 1}/{totalQuestions}
          </ThemedText>
        </View>
      </View>

      <FlatList
        data={questions}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        style={styles.questionsList}
      />

      <View style={styles.bottomContainer}>
        <View style={styles.progressDots}>
          {questions.map((_, index) => (
            <View
              key={index}
              style={[
                styles.dot,
                index === currentQuestionIndex && styles.activeDot,
                answers[questions[index].id] && styles.answeredDot,
              ]}
            />
          ))}
        </View>
        
        <View style={styles.buttonContainer}>
          <Button
            onPress={handlePrevious}
            disabled={currentQuestionIndex === 0}
            variant="outline"
            style={currentQuestionIndex === 0 ? {...styles.navButton, ...styles.disabledButton} : styles.navButton}
          >
            পূর্ববর্তী
          </Button>

          <Button
            onPress={handleNext}
            style={{...styles.navButton, ...styles.nextButton}}
          >
            {isLastQuestion ? 'সমাপ্ত করুন' : 'পরবর্তী'}
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
  progressInfo: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 8,
  },
  questionCounter: {
    fontSize: 14,
    fontWeight: '600',
  },
  questionsList: {
    flex: 1,
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
  activeDot: {
    backgroundColor: '#9333EA',
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  answeredDot: {
    backgroundColor: '#10B981',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  navButton: {
    flex: 1,
  },
  nextButton: {
    backgroundColor: '#9333EA',
  },
  disabledButton: {
    opacity: 0.5,
  },
}); 