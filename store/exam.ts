import { atom } from 'jotai';

export type Subject = {
  id: string;
  name: string;
  icon?: string;
};

export type Chapter = {
  id: string;
  name: string;
  selected?: boolean;
};

export type ExamConfig = {
  step: number;
  totalSteps: number;
  subject?: Subject | null;
  chapters?: Chapter[];
  selectedChapters?: string[];
  standard?: 'basic' | 'intermediate' | 'advanced' | null;
  time?: number;
  totalQuestions?: number;
};

export const initialExamConfig: ExamConfig = {
  step: 1,
  totalSteps: 5,
  subject: null,
  chapters: [],
  selectedChapters: [],
  standard: null,
  time: 30,
  totalQuestions: 20,
};

export const examConfigAtom = atom<ExamConfig>(initialExamConfig);

// Mock data for subjects
export const subjects: Subject[] = [
  { id: '1', name: 'বাংলা', icon: '/icons/subjects/bangla.png' },
  { id: '2', name: 'ইংরেজি', icon: '/icons/subjects/english.png' },
  { id: '3', name: 'গণিত', icon: '/icons/subjects/math.png' },
  { id: '4', name: 'বিজ্ঞান', icon: '/icons/subjects/science.png' },
  { id: '5', name: 'সমাজ', icon: '/icons/subjects/social.png' },
  { id: '6', name: 'ধর্ম', icon: '/icons/subjects/religion.png' },
];

// Mock data for chapters
export const chaptersData: Record<string, Chapter[]> = {
  '1': [
    { id: '1-1', name: 'গদ্য' },
    { id: '1-2', name: 'পদ্য' },
    { id: '1-3', name: 'ব্যাকরণ' },
    { id: '1-4', name: 'রচনা' },
  ],
  '2': [
    { id: '2-1', name: 'Grammar' },
    { id: '2-2', name: 'Reading' },
    { id: '2-3', name: 'Writing' },
    { id: '2-4', name: 'Vocabulary' },
  ],
}; 