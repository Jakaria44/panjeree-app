import { atom } from 'jotai';
import { Subject, profileAtom, subjectsAtom } from './commons';

export type ExamResults = {
  totalQuestions: number;
  correctAnswers: number;
  incorrectAnswers: number;
  unanswered: number;
  timeTaken: number;
  answers: Record<string, string>;
};

export type ExamConfig = {
  step: number;
  totalSteps: number;
  subject: Subject | null;
  // { [paperId]: { [chapterId]: topicId[] } }
  selectedSections: Record<string, Record<string, number[]>>;
  questionCount: number;
  questionStandard: 'engineering' | 'main-book' | 'varsity' | 'medical';
  examType: 'mcq' | 'written';
  totalTime: number;
  examResults?: ExamResults;
};

export const examConfigAtom = atom<ExamConfig>({
  step: 1,
  totalSteps: 4,
  subject: null,
  selectedSections: {},
  questionCount: 12,
  questionStandard: 'main-book',
  examType: 'mcq',
  totalTime: 10,
});

// Re-export common atoms for convenience
export { profileAtom, subjectsAtom };
