import { examConfigAtom } from '@/store/exam';
import { useAtomValue } from 'jotai';
import { ExamResult } from './ExamResult';
import { MockExam } from './MockExam';
import { Step1SelectSubject } from './Step1SelectSubject';
import { Step2SelectChapters } from './Step2SelectChapters';
import { Step3ReviewSelection } from './Step3ReviewSelection';
import { Step4SelectStandard } from './Step4SelectStandard';
import { Step5ConfirmExam } from './Step5ConfirmExam';

export function ExamFlow() {
  const config = useAtomValue(examConfigAtom);

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
      return <Step5ConfirmExam />;
    case 6:
      return <MockExam />;
    case 7:
      return <ExamResult />;
    default:
      return <Step1SelectSubject />;
  }
}
