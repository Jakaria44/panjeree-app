import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

// Create axios instance with base configuration
export const apiClient = axios.create({
  baseURL: 'https://api.panjeree.com', // Replace with your actual API base URL
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token if available
apiClient.interceptors.request.use(
  async (config) => {
    try {
      const token = await AsyncStorage.getItem('auth_token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (error) {
      console.error('Error getting auth token:', error);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    // Handle common errors (401, 403, 500, etc.)
    if (error.response?.status === 401) {
      // Token expired or invalid, clear storage and redirect to login
      try {
        await AsyncStorage.removeItem('auth_token');
        await AsyncStorage.removeItem('user_profile');
      } catch (clearError) {
        console.error('Error clearing auth data:', clearError);
      }
      // You can add navigation to login screen here
    }

    console.error('API Error:', error);
    return Promise.reject(error);
  }
);

// API functions
export const api = {
  // Get subjects for a specific class
  getSubjects: async (className: string) => {
    try {
      const response = await apiClient.get(
        `/api/classes/nested?className=${className}`
      );
      return response.data;
    } catch (error) {
      console.error('Error fetching subjects:', error);
      throw new Error('Failed to fetch subjects');
    }
  },

  // Get profile information
  getProfile: async () => {
    try {
      const response = await apiClient.get('/api/profile');
      return response.data;
    } catch (error) {
      console.error('Error fetching profile:', error);
      throw new Error('Failed to fetch profile');
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
      const response = await apiClient.post('/api/questions', params);
      return response.data;
    } catch (error) {
      console.error('Error fetching questions:', error);
      throw new Error('Failed to fetch questions');
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
      const response = await apiClient.post('/api/exam-results', results);
      return response.data;
    } catch (error) {
      console.error('Error submitting exam results:', error);
      throw new Error('Failed to submit exam results');
    }
  },

  // Login user
  login: async (credentials: { email: string; password: string }) => {
    try {
      const response = await apiClient.post('/api/auth/login', credentials);
      const { token, user } = response.data;

      // Store auth token and user data
      await AsyncStorage.setItem('auth_token', token);
      await AsyncStorage.setItem('user_profile', JSON.stringify(user));

      return response.data;
    } catch (error) {
      console.error('Error logging in:', error);
      throw new Error('Login failed');
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
      const response = await apiClient.post('/api/auth/register', userData);
      return response.data;
    } catch (error) {
      console.error('Error registering:', error);
      throw new Error('Registration failed');
    }
  },

  // Logout user
  logout: async () => {
    try {
      await AsyncStorage.removeItem('auth_token');
      await AsyncStorage.removeItem('user_profile');
    } catch (error) {
      console.error('Error logging out:', error);
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
      const response = await apiClient.post('/api/practice/questions', params);
      return response.data;
    } catch (error) {
      console.error('Error fetching practice questions:', error);
      throw new Error('Failed to fetch practice questions');
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
      const response = await apiClient.post('/api/practice/results', results);
      return response.data;
    } catch (error) {
      console.error('Error submitting practice results:', error);
      throw new Error('Failed to submit practice results');
    }
  },

  // Get question bank questions
  getQuestionBankQuestions: async (params: {
    subjectId: number;
    type: 'board' | 'school';
    institution?: string;
    session?: string;
    questionCount: number;
  }) => {
    try {
      const response = await apiClient.post(
        '/api/question-bank/questions',
        params
      );
      return response.data;
    } catch (error) {
      console.error('Error fetching question bank questions:', error);
      throw new Error('Failed to fetch question bank questions');
    }
  },

  // Get user progress/analytics
  getUserProgress: async () => {
    try {
      const response = await apiClient.get('/api/user/progress');
      return response.data;
    } catch (error) {
      console.error('Error fetching user progress:', error);
      throw new Error('Failed to fetch user progress');
    }
  },
};
