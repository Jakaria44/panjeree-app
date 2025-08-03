import { ExamResult } from '@/components/exam/ExamResult';
import { MockExam } from '@/components/exam/MockExam';
import { Step1SelectSubject } from '@/components/exam/Step1SelectSubject';
import { Step2SelectChapters } from '@/components/exam/Step2SelectChapters';
import { Step3ReviewSelection } from '@/components/exam/Step3ReviewSelection';
import { Step4SelectStandard } from '@/components/exam/Step4SelectStandard';
import { Step5ConfirmExam } from '@/components/exam/Step5ConfirmExam';
import { ThemedView } from '@/components/ThemedView';
import { examConfigAtom, mockQuestions } from '@/store/exam';
import { useAtom } from 'jotai';
import React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function ExamScreen() {
  const [config, setConfig] = useAtom(examConfigAtom);
  const insets = useSafeAreaInsets();

  const handleStartExam = () => {
    setConfig(prev => ({ ...prev, step: 6 }));
  };

  const handleExamComplete = (answers: Record<string, string>) => {
    // Calculate results
    let correctAnswers = 0;
    let incorrectAnswers = 0;
    let unanswered = 0;

    mockQuestions.forEach(question => {
      const userAnswer = answers[question.id];
      if (!userAnswer) {
        unanswered++;
      } else if (userAnswer === question.correctAnswer) {
        correctAnswers++;
      } else {
        incorrectAnswers++;
      }
    });

    // Store results and move to result page
    setConfig(prev => ({ 
      ...prev, 
      step: 7,
      examResults: {
        totalQuestions: mockQuestions.length,
        correctAnswers,
        incorrectAnswers,
        unanswered,
        timeTaken: 1800, // Mock time taken in seconds
        answers,
      }
    }));
  };

  const handleGoHome = () => {
    setConfig(prev => ({ ...prev, step: 1 }));
  };

  const handleViewAnswers = () => {
    // Navigate to answers review (could be implemented later)
    console.log('View answers');
  };

  const renderStep = () => {
    switch (config.step) {
      case 1:
        return <Step1SelectSubject />;
      case 2:
        return <Step2SelectChapters />;
      case 3:
        return <Step3ReviewSelection />;
      case 4:
        return <Step4SelectStandard />;
      case 5:
        return <Step5ConfirmExam onStartExam={handleStartExam} />;
      case 6: // The actual exam
        return (
          <MockExam 
            totalTime={config.totalTime * 60} // Convert minutes to seconds
            onComplete={handleExamComplete}
          />
        );
      case 7: // The result page
        const results = config.examResults;
        return (
          <ExamResult
            totalQuestions={results?.totalQuestions || 0}
            correctAnswers={results?.correctAnswers || 0}
            incorrectAnswers={results?.incorrectAnswers || 0}
            unanswered={results?.unanswered || 0}
            timeTaken={results?.timeTaken || 0}
            subject={config.subject?.name || ''}
            userAnswers={results?.answers || {}}
            onGoHome={handleGoHome}
            onViewAnswers={handleViewAnswers}
          />
        );
      default:
        return <Step1SelectSubject />;
    }
  };

  return (
    <ThemedView style={{ flex: 1, paddingTop: insets.top }}>
      {renderStep()}
    </ThemedView>
  );
}
