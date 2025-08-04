# Panjeree Mobile App - Backend Integration Implementation

This document outlines the implementation of backend integration for the Panjeree mobile app, matching the functionality of the Next.js web version.

## Overview

The implementation provides a complete exam flow with subject selection, chapter/topic selection, and mock exam functionality. The app uses mock data for now but is structured to easily switch to real backend API calls.

## Key Features Implemented

### 1. Store Structure

- **`store/commons.ts`**: Centralized types and atoms for subjects, papers, chapters, and topics
- **`store/exam.ts`**: Exam configuration and state management
- **`store/prepare.ts`**: Practice session configuration
- **`store/question-bank.ts`**: Question bank configuration

### 2. API Integration

- **`utils/api.ts`**: Axios-based API client with interceptors
- **`utils/mockData.ts`**: Mock data provider for development
- **`hooks/useSubjects.ts`**: Custom hook for loading subjects from backend

### 3. Exam Flow Components

- **`Step1SelectSubject`**: Subject selection with backend integration
- **`Step2SelectChapters`**: Chapter and topic selection with hierarchical UI
- **`Step3ReviewSelection`**: Review selected topics before proceeding
- **`MockExam`**: Complete exam interface with timer and question navigation
- **`ExamResult`**: Results display with statistics

### 4. Prepare Flow Components

- **`Step1SelectSubjectAndPaper`**: Subject and paper selection
- **`Step2SelectChapters`**: Topic selection for practice sessions

### 5. Question Bank Components

- **`Step1SelectSubjectAndType`**: Subject and question type selection

## Data Structure

### Subject Structure

```typescript
type Subject = {
  id: number;
  name: string;
  icon: string;
  papers: Paper[];
};

type Paper = {
  id: number;
  name: string;
  chapters: Chapter[];
};

type Chapter = {
  id: number;
  name: string;
  topics: Topic[];
};

type Topic = {
  id: number;
  name: string;
};
```

### Exam Configuration

```typescript
type ExamConfig = {
  step: number;
  totalSteps: number;
  subject: Subject | null;
  selectedSections: Record<string, Record<string, number[]>>;
  questionCount: number;
  questionStandard: 'engineering' | 'main-book' | 'varsity' | 'medical';
  examType: 'mcq' | 'written';
  totalTime: number;
  examResults?: ExamResults;
};
```

## Backend Integration

### API Endpoints

- `GET /api/classes/nested?className={className}` - Get subjects for a class
- `POST /api/questions` - Get questions for exam
- `POST /api/exam-results` - Submit exam results
- `GET /api/profile` - Get user profile

### Mock Data

The app currently uses mock data that matches the expected API response structure. To switch to real backend:

1. Update `utils/api.ts` with your actual API base URL
2. Replace mock data calls in `hooks/useSubjects.ts` with real API calls
3. Add authentication tokens to API requests

## Usage

### Starting an Exam

1. User selects a subject from the grid
2. If subject has multiple papers, user selects a paper
3. User selects chapters and topics for the exam
4. User reviews selections
5. User sets exam parameters (question count, standard, etc.)
6. User confirms and starts the exam
7. User completes the exam and views results

### Practice Sessions

1. User selects subject and paper
2. User selects topics for practice
3. User starts practice session
4. User completes practice and views results

## Key Components

### ExamFlow

Central component that manages the exam step flow and renders appropriate components based on current step.

### useSubjects Hook

Custom hook that loads subjects from backend and manages loading/error states.

### MockExam

Complete exam interface with:

- Question navigation
- Timer with progress
- Answer selection
- Results calculation

## Styling and UI

The implementation uses:

- Consistent purple theme (`#9333EA`)
- Card-based layouts
- Proper loading and error states
- Responsive design for different screen sizes
- Bengali text support

## Next Steps

1. **Backend Integration**: Replace mock data with real API calls
2. **Authentication**: Add user authentication and token management
3. **Offline Support**: Implement offline caching for subjects and questions
4. **Analytics**: Add exam analytics and progress tracking
5. **Push Notifications**: Add notifications for exam reminders
6. **Social Features**: Add leaderboards and sharing functionality

## File Structure

```
├── store/
│   ├── commons.ts          # Shared types and atoms
│   ├── exam.ts            # Exam configuration
│   ├── prepare.ts         # Practice configuration
│   └── question-bank.ts   # Question bank configuration
├── utils/
│   ├── api.ts            # API client
│   └── mockData.ts       # Mock data provider
├── hooks/
│   └── useSubjects.ts    # Subjects loading hook
├── components/
│   ├── exam/             # Exam flow components
│   ├── prepare/          # Practice flow components
│   └── question-bank/    # Question bank components
└── app/(tabs)/
    └── exam.tsx          # Main exam screen
```

This implementation provides a solid foundation for a complete educational exam app with backend integration capabilities.
