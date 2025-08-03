import { Step1SelectSubjectAndType } from '@/components/question-bank/Step1SelectSubjectAndType';
import { Step2SelectInstitutionAndSession } from '@/components/question-bank/Step2SelectInstitutionAndSession';
import { Step3Summary } from '@/components/question-bank/Step3Summary';
import { Step4QuestionView } from '@/components/question-bank/Step4QuestionView';
import { Step5Result } from '@/components/question-bank/Step5Result';
import { ThemedView } from '@/components/ThemedView';
import { questionBankConfigAtom } from '@/store/question-bank';
import { useAtomValue } from 'jotai';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function QuestionBankScreen() {
  const { step } = useAtomValue(questionBankConfigAtom);

  const renderStep = () => {
    switch (step) {
      case 1:
        return <Step1SelectSubjectAndType />;
      case 2:
        return <Step2SelectInstitutionAndSession />;
      case 3:
        return <Step3Summary />;
      case 4:
        return <Step4QuestionView />;
      case 5:
        return <Step5Result />;
      default:
        return <Step1SelectSubjectAndType />;
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }} edges={['top']}>
      <ThemedView style={{ flex: 1 }}>
        {renderStep()}
      </ThemedView>
    </SafeAreaView>
  );
}
