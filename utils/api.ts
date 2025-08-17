import { Subject } from "@/store/commons";
import {
  ExamCreateRequest,
  ExamCreateResponse,
  SubmissionRequest,
  SubmissionResponse,
} from "@/store/exam";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

// Create axios instance with base configuration
export const axiosClient = axios.create({
  baseURL: "https://2ebbdc1322aa.ngrok-free.app", // Replace with your actual API base URL
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
    "ngrok-skip-browser-warning": "true",
  },
});

// Request interceptor to add auth token if available
axiosClient.interceptors.request.use(
  async (config) => {
    try {
      const token = await AsyncStorage.getItem("auth_token");

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (error) {
      console.error("Error getting auth token:", error);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
axiosClient.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    // Handle common errors (401, 403, 500, etc.)
    if (error.response?.status === 401) {
      // Token expired or invalid, clear storage and redirect to login
      try {
        await AsyncStorage.removeItem("auth_token");
        await AsyncStorage.removeItem("user_profile");
      } catch (clearError) {
        console.error("Error clearing auth data:", clearError);
      }
      // You can add navigation to login screen here
    }

    console.error("API Error:", error);
    return Promise.reject(error);
  }
);

// Transformation function to convert API response to our expected format
export const transformSubjectsResponse = (data: any): Subject[] => {
  if (!data || !Array.isArray(data)) {
    return [];
  }

  return data.flatMap(
    (classItem: any) =>
      classItem.subjects?.map((subject: any) => ({
        name: subject.name,
        icon: subject.icon || "/placeholder.svg",
        papers:
          subject.papers?.map((paper: any) => ({
            id: paper.id,
            name: paper.name,
            chapters:
              paper.chapters?.map((chapter: any) => ({
                id: chapter.id,
                name: chapter.name,
                created_at: chapter.created_at,
                updated_at: chapter.updated_at,
                topics:
                  chapter.topics?.map((topic: any) => ({
                    id: topic.id,
                    name: topic.name,
                    created_at: topic.created_at,
                    updated_at: topic.updated_at,
                  })) || [],
              })) || [],
          })) || [],
      })) || []
  );
};

// Question service functions
export const questionService = {
  getMCQs: async (topicIds: string) => {
    const response = await axiosClient.get(`/api/mcqs?topicIds=${topicIds}`);
    return response.data;
  },

  createExam: async (
    examData: ExamCreateRequest
  ): Promise<ExamCreateResponse> => {
    try {
      console.log("Creating exam:", examData);
      const response = await axiosClient.post("/api/exams", examData);

      return response.data;
    } catch (error: any) {
      console.error("Error creating exam:", error);
      console.error("Error response:", error.response?.data);

      if (error.response?.data?.message) {
        throw new Error(error.response.data.message);
      } else if (error.response?.status >= 500) {
        throw new Error("Server error. Please try again later.");
      } else {
        throw new Error("Failed to create exam. Please check your connection.");
      }
    }
  },

  submitAnswer: async (
    submissionData: SubmissionRequest
  ): Promise<SubmissionResponse> => {
    const response = await axiosClient.post("/api/submissions", submissionData);
    return response.data;
  },
};

// Auth service functions
export const authService = {
  login: async (mobile: string, password: string) => {
    try {
      console.log("Attempting login with:", { mobile, password });

      const response = await axiosClient.post("/api/auth/login", {
        phone: mobile, // Changed from 'mobile' to 'phone' to match swagger
        password,
      });

      console.log("Login response:", response.data);

      const { token, status } = response.data;

      if (status === "success" && token) {
        // Store auth token
        await AsyncStorage.setItem("auth_token", token);
        console.log("Login successful, token stored");
        return response.data;
      } else {
        console.error("Login failed: Invalid response", response.data);
        throw new Error("Login failed: Invalid response");
      }
    } catch (error: any) {
      console.error("Error logging in:", error);
      console.error("Error response:", error.response?.data);

      if (error.response?.data?.message) {
        throw new Error(error.response.data.message);
      } else if (error.response?.status === 401) {
        throw new Error("Invalid phone number or password");
      } else if (error.response?.status >= 500) {
        throw new Error("Server error. Please try again later.");
      } else {
        throw new Error("Login failed. Please check your connection.");
      }
    }
  },

  logout: async () => {
    try {
      await AsyncStorage.removeItem("auth_token");
      await AsyncStorage.removeItem("user_profile");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  },

  getStoredToken: async () => {
    try {
      return await AsyncStorage.getItem("auth_token");
    } catch (error) {
      console.error("Error getting stored token:", error);
      return null;
    }
  },
};

// Question Bank Service Types
export type Institute = {
  id: number;
  name: string;
  type: "board" | "school";
  createdAt: string;
  updatedAt: string;
};

export type Tag = {
  id: number;
  institute_id: number;
  type: string | null;
  year: number;
  created_at: string;
  updated_at: string;
  institute_name: string;
};

export type QuestionBankMCQOption = {
  id: number;
  mcq_id: number;
  text: string;
  is_correct: boolean;
  image_url: string | null;
};

export type QuestionBankMCQ = {
  id: number;
  text: string;
  type: string;
  stem_id: number | null;
  topic_id: number;
  mark: number;
  correct_option_id: number;
  explanation: string | null;
  image_url: string | null;
  options: QuestionBankMCQOption[];
};

// Question Bank Service
export const questionBankService = {
  getInstitutes: async (type: "board" | "school"): Promise<Institute[]> => {
    const response = await axiosClient.get(`/api/institutes?type=${type}`);
    return response.data;
  },

  getTags: async (instituteId: number): Promise<Tag[]> => {
    const response = await axiosClient.get(
      `/api/question-bank/institutes/${instituteId}/tags`
    );
    return response.data;
  },

  getMCQs: async (tagId: number): Promise<QuestionBankMCQ[]> => {
    const response = await axiosClient.get(
      `/api/question-bank/tags/${tagId}/mcqs`
    );
    return response.data;
  },
};

// API functions
export const api = {
  // Get subjects for a specific class
  getSubjects: async (className: string) => {
    try {
      const response = await axiosClient.get(
        `/api/classes/nested?className=${className}`
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching subjects:", error);
      throw new Error("Failed to fetch subjects");
    }
  },

  // Get profile information
  getProfile: async () => {
    try {
      const response = await axiosClient.get("/api/profile");
      return response.data;
    } catch (error) {
      console.error("Error fetching profile:", error);
      throw new Error("Failed to fetch profile");
    }
  },

  // Get questions for exam
  getQuestions: async (params: {
    subjectId: number;
    paperIds: number[];
    chapterIds: number[];
    topicIds: number[];
    questionCount: number;
    standard: string;
  }) => {
    try {
      const response = await axiosClient.post("/api/questions", params);
      return response.data;
    } catch (error) {
      console.error("Error fetching questions:", error);
      throw new Error("Failed to fetch questions");
    }
  },

  // Submit exam results
  submitExamResults: async (results: {
    subjectId: number;
    totalQuestions: number;
    correctAnswers: number;
    incorrectAnswers: number;
    unanswered: number;
    timeTaken: number;
    answers: Record<string, string>;
  }) => {
    try {
      const response = await axiosClient.post("/api/exam-results", results);
      return response.data;
    } catch (error) {
      console.error("Error submitting exam results:", error);
      throw new Error("Failed to submit exam results");
    }
  },

  // Register user
  register: async (userData: {
    name: string;
    email: string;
    password: string;
    className: string;
  }) => {
    try {
      const response = await axiosClient.post("/api/auth/register", userData);
      return response.data;
    } catch (error) {
      console.error("Error registering:", error);
      throw new Error("Registration failed");
    }
  },

  // Get practice questions
  getPracticeQuestions: async (params: {
    subjectId: number;
    paperId: number;
    topicIds: number[];
    questionCount: number;
  }) => {
    try {
      const response = await axiosClient.post(
        "/api/practice/questions",
        params
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching practice questions:", error);
      throw new Error("Failed to fetch practice questions");
    }
  },

  // Submit practice results
  submitPracticeResults: async (results: {
    subjectId: number;
    paperId: number;
    totalQuestions: number;
    correctAnswers: number;
    incorrectAnswers: number;
    skippedQuestions: number;
    timeTaken: number;
    answers: Record<string, string>;
  }) => {
    try {
      const response = await axiosClient.post("/api/practice/results", results);
      return response.data;
    } catch (error) {
      console.error("Error submitting practice results:", error);
      throw new Error("Failed to submit practice results");
    }
  },

  // Get question bank questions
  getQuestionBankQuestions: async (params: {
    subjectId: number;
    type: "board" | "school";
    institution?: string;
    session?: string;
    questionCount: number;
  }) => {
    try {
      const response = await axiosClient.post(
        "/api/question-bank/questions",
        params
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching question bank questions:", error);
      throw new Error("Failed to fetch question bank questions");
    }
  },

  // Get user progress/analytics
  getUserProgress: async () => {
    try {
      const response = await axiosClient.get("/api/user/progress");
      return response.data;
    } catch (error) {
      console.error("Error fetching user progress:", error);
      throw new Error("Failed to fetch user progress");
    }
  },
};

// Utility function to extract topic IDs from selected sections
export const extractTopicIds = (
  selectedSections: Record<string, number[]>
): number[] => {
  const topicIds: number[] = [];

  Object.values(selectedSections).forEach((sectionTopics) => {
    topicIds.push(...sectionTopics);
  });

  return topicIds;
};
