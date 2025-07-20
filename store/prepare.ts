import { atom } from 'jotai';
import { Chapter, Subject } from './exam';

export type Paper = {
  id: string;
  name: string;
};

export type PracticeConfig = {
  step: number;
  totalSteps: number;
  subject?: Subject | null;
  paper?: Paper | null;
  chapters?: Chapter[];
  selectedChapters?: string[];
};

export const initialPracticeConfig: PracticeConfig = {
  step: 1,
  totalSteps: 2,
  subject: null,
  paper: null,
  chapters: [],
  selectedChapters: [],
};

export const practiceConfigAtom = atom<PracticeConfig>(initialPracticeConfig);

// Mock data for papers
export const papers: Record<string, Paper[]> = {
  '1': [
    { id: '1-1', name: 'প্রথম পত্র' },
    { id: '1-2', name: 'দ্বিতীয় পত্র' },
  ],
  '2': [
    { id: '2-1', name: 'First Paper' },
    { id: '2-2', name: 'Second Paper' },
  ],
}; 