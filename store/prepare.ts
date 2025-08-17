import { atom } from 'jotai';
import { Paper, Subject } from './commons';
import { MCQ } from "./exam";

export type PracticeResults = {
  totalQuestions: number;
  correctAnswers: number;
  incorrectAnswers: number;
  skippedQuestions: number;
  timeTaken: number;
  answers: Record<number, number>;
};

export type PracticeConfig = {
  step: number;
  subject: Subject | null;
  paper: Paper | null;
  selectedSections: Record<string, number[]>;
  questions: MCQ[];
  currentQuestionIndex: number;
  answers: Record<number, number>;
  isCompleted: boolean;
  practiceResults?: PracticeResults;
};

export const initialPracticeConfig: PracticeConfig = {
  step: 1,
  subject: null,
  paper: null,
  selectedSections: {},
  questions: [],
  currentQuestionIndex: 0,
  answers: {},
  isCompleted: false,
};

export const practiceConfigAtom = atom<PracticeConfig>(initialPracticeConfig);
