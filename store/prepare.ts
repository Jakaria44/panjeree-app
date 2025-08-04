import { atom } from 'jotai';
import { Paper, Subject } from './commons';

export type PracticeResults = {
  totalQuestions: number;
  correctAnswers: number;
  incorrectAnswers: number;
  skippedQuestions: number;
  timeTaken: number;
  answers: Record<string, string>;
};

export type PracticeConfig = {
  step: number;
  subject: Subject | null;
  paper: Paper | null;
  selectedSections: Record<string, number[]>;
  practiceResults?: PracticeResults;
};

export const initialPracticeConfig: PracticeConfig = {
  step: 1,
  subject: null,
  paper: null,
  selectedSections: {},
};

export const practiceConfigAtom = atom<PracticeConfig>(initialPracticeConfig);
