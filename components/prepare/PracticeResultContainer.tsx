import { practiceConfigAtom } from '@/store/prepare';
import { useAtom } from 'jotai';
import React, { useMemo } from 'react';
import { PracticeResult } from './PracticeResult';

export function PracticeResultContainer() {
  const [config, setConfig] = useAtom(practiceConfigAtom);

  // Calculate results from config
  const results = useMemo(() => {
    const totalQuestions = config.questions.length;
    let correctAnswers = 0;
    let incorrectAnswers = 0;
    let skippedQuestions = 0;

    // Count through the answered questions
    for (const question of config.questions) {
      const userAnswer = config.answers[question.id];
      
      if (userAnswer === undefined || userAnswer === null) {
        skippedQuestions++;
      } else if (userAnswer === question.correct_option_id) {
        correctAnswers++;
      } else {
        incorrectAnswers++;
      }
    }

    return {
      totalQuestions,
      correctAnswers,
      incorrectAnswers,
      skippedQuestions,
    };
  }, [config.questions, config.answers]);

  const restart = () => {
    setConfig({
      step: 1,
      subject: null,
      paper: null,
      selectedSections: {},
      questions: [],
      currentQuestionIndex: 0,
      answers: {},
      isCompleted: false,
    });
  };

  const goHome = () => {
    restart();
  };

  const viewAnswers = () => {
    // TODO: Implement answer review functionality
    console.log('View answers not implemented yet');
  };

  const retryPractice = () => {
    setConfig(prev => ({
      ...prev,
      step: 2, // Go back to chapter selection
      questions: [],
      currentQuestionIndex: 0,
      answers: {},
      isCompleted: false,
    }));
  };

  return (
    <PracticeResult
      totalQuestions={results.totalQuestions}
      correctAnswers={results.correctAnswers}
      incorrectAnswers={results.incorrectAnswers}
      skippedQuestions={results.skippedQuestions}
      timeTaken={0} // TODO: Implement time tracking
      subject={config.subject?.name || 'Unknown Subject'}
      onRetry={retryPractice}
      onGoHome={goHome}
      onViewAnswers={viewAnswers}
    />
  );
}