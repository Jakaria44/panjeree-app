import type { Institute, QuestionBankMCQ, Tag } from "@/utils/api";
import { atom } from "jotai";
import { Subject } from "./commons";

export type Institution = {
  id: string;
  name: string;
  description: string;
};

export type Session = {
  id: string;
  name: string;
  description: string;
};

export type QuestionBankResults = {
  totalQuestions: number;
  correctAnswers: number;
  incorrectAnswers: number;
  unanswered: number;
  timeTaken: number;
  answers: Record<string, string>;
};

export type QuestionBankConfig = {
  step: number;
  totalSteps: number;
  subject: Subject | null;
  type: "board" | "school" | null;
  institution: Institution | null;
  session: Session | null;
  showAnswers: boolean;
  questionBankResults?: QuestionBankResults;
  // API data
  institutes: Institute[];
  tags: Tag[];
  mcqs: QuestionBankMCQ[];
  // Loading states
  loadingInstitutes: boolean;
  loadingTags: boolean;
  loadingMCQs: boolean;
};

export const initialQuestionBankConfig: QuestionBankConfig = {
  step: 1,
  totalSteps: 5,
  subject: null,
  type: null,
  institution: null,
  session: null,
  showAnswers: false,
  institutes: [],
  tags: [],
  mcqs: [],
  loadingInstitutes: false,
  loadingTags: false,
  loadingMCQs: false,
};

export const questionBankConfigAtom = atom<QuestionBankConfig>(
  initialQuestionBankConfig
);

// Separate atom for user answers
export const questionBankUserAnswersAtom = atom<Record<string, string>>({});

// Question bank types
export const questionBankTypes = [
  { id: "board", name: "বোর্ড প্রশ্ন" },
  { id: "school", name: "স্কুল/কলেজ প্রশ্ন" },
];

// Mock data for institutions
export const institutions = [
  { id: "1", name: "ঢাকা বোর্ড" },
  { id: "2", name: "রাজশাহী বোর্ড" },
  { id: "3", name: "চট্টগ্রাম বোর্ড" },
  { id: "4", name: "খুলনা বোর্ড" },
  { id: "5", name: "বরিশাল বোর্ড" },
  { id: "6", name: "সিলেট বোর্ড" },
  { id: "7", name: "দিনাজপুর বোর্ড" },
  { id: "8", name: "যশোর বোর্ড" },
  { id: "9", name: "কুমিল্লা বোর্ড" },
];

// Mock data for sessions
export const sessions = [
  { id: "2023", name: "২০২৩" },
  { id: "2022", name: "২০২২" },
  { id: "2021", name: "২০২১" },
  { id: "2020", name: "২০২০" },
  { id: "2019", name: "২০১৯" },
];
