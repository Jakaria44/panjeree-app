import { atom } from 'jotai';
import { Subject, profileAtom, subjectsAtom } from './commons';

export type MCQOption = {
  id: number;
  mcq_id: number;
  text: string;
  image_url: string | null;
};

export type MCQ = {
  id: number;
  text: string;
  type: string;
  stem_id: number | null;
  topic_id: number;
  mark: number;
  correct_option_id: number;
  explanation: string | null;
  image_url: string | null;
  options: MCQOption[];
};

export type ExamCreateRequest = {
  time: number;
  shuffle: boolean;
  no_of_question: number;
  negative_marking_percentage: number;
  topic_ids: number[];
};

export type ExamCreateResponse = {
  topic_ids: number[];
  user_id: number;
  questions: MCQ[];
  total_mark: number;
  time: number;
  totalTime?: number;
  questionCount?: number;
  no_of_question?: number;
  exam_id: number;
};

export type SubmissionRequest = {
  exam_id: number;
  mcq_id: number;
  option_id: number;
};

export type SubmissionResponse = {
  success: string;
};

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
  selectedSections: Record<string, Record<string, string[]>>;
  questionCount: number;
  questionStandard: "engineering" | "main-book" | "varsity" | "medical";
  examType: "mcq" | "written";
  totalTime: number;
  shuffle: boolean;
  negativeMarkingPercentage: number;
  examId?: number;
  questions?: MCQ[];
  totalMark?: number;
  examResults?: ExamResults;
};

export const examConfigAtom = atom<ExamConfig>({
  step: 1,
  totalSteps: 7,
  subject: null,
  selectedSections: {},
  questionCount: 12,
  questionStandard: "main-book",
  examType: "mcq",
  totalTime: 10,
  shuffle: true,
  negativeMarkingPercentage: 0.25,
});

// Utility function to extract topic IDs from selected sections
export const extractTopicIds = (
  selectedSections: Record<string, Record<string, string[]>>
): number[] => {
  const topicIds: number[] = [];

  Object.values(selectedSections).forEach((papers) => {
    Object.values(papers).forEach((chapters) => {
      chapters.forEach((topicId) => {
        const numericTopicId = parseInt(topicId, 10);
        if (!isNaN(numericTopicId) && !topicIds.includes(numericTopicId)) {
          topicIds.push(numericTopicId);
        }
      });
    });
  });

  return topicIds;
};

// Re-export common atoms for convenience
export { profileAtom, subjectsAtom };
