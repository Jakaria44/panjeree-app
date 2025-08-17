import Button from '@/components/Button';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { examConfigAtom } from '@/store/exam';
import { questionService } from "@/utils/api";
import { useAtom } from "jotai";
import { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { TimerProgress } from "./TimerProgress";

export function MockExam() {
  const [config, setConfig] = useAtom(examConfigAtom);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [timeLeft, setTimeLeft] = useState(config.totalTime * 60); // Convert to seconds
  const [isExamComplete, setIsExamComplete] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittingQuestions, setSubmittingQuestions] = useState<Set<string>>(
    new Set()
  );

  const questions = config.questions || [];
  const totalTimeInSeconds = config.totalTime * 60;

  const handleAnswerChange = async (questionId: string, answer: string) => {
    if (!config.examId) {
      return;
    }

    // Update local state immediately for UI responsiveness
    setAnswers((prev) => ({ ...prev, [questionId]: answer }));

    // Mark this question as submitting
    setSubmittingQuestions((prev) => new Set(prev).add(questionId));

    try {
      await questionService.submitAnswer({
        exam_id: config.examId,
        mcq_id: parseInt(questionId),
        option_id: parseInt(answer),
      });

      // Success - answer submitted to server
      console.log(
        `Answer submitted for question ${questionId}: option ${answer}`
      );
    } catch (error) {
      console.error("Error submitting answer:", error);

      // Revert the local answer on error
      setAnswers((prev) => {
        const newAnswers = { ...prev };
        delete newAnswers[questionId];
        return newAnswers;
      });
    } finally {
      // Remove from submitting set
      setSubmittingQuestions((prev) => {
        const newSet = new Set(prev);
        newSet.delete(questionId);
        return newSet;
      });
    }
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    return () => clearInterval(timer);
  }, []);

  const handleSubmit = useCallback(async () => {
    setIsExamComplete(true);
    setIsSubmitting(true);

    try {
      // Calculate results
      const totalQuestions = questions.length;
      const correctAnswers = questions.reduce((count, question) => {
        const selectedAnswer = answers[question.id.toString()];
        return (
          count +
          (selectedAnswer &&
          parseInt(selectedAnswer) === question.correct_option_id
            ? 1
            : 0)
        );
      }, 0);
      const answeredQuestions = Object.keys(answers).length;
      const incorrectAnswers = answeredQuestions - correctAnswers;
      const unanswered = totalQuestions - answeredQuestions;
      const timeTaken = totalTimeInSeconds - timeLeft;

      const examResults = {
        totalQuestions,
        correctAnswers,
        incorrectAnswers,
        unanswered,
        timeTaken,
        answers,
      };

      setConfig((prev) => ({
        ...prev,
        examResults,
        step: 7, // Move to results page
      }));
    } catch (error) {
      console.error("Error completing exam:", error);
      Alert.alert("Error", "Failed to complete exam. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }, [questions, answers, totalTimeInSeconds, timeLeft, setConfig]);

  if (questions.length === 0) {
    return (
      <ThemedView style={styles.container}>
        <ThemedText style={styles.errorText}>No questions available</ThemedText>
      </ThemedView>
    );
  }

  return (
    <ThemedView style={styles.container}>
      <View style={styles.header}>
        <ThemedText style={styles.title}>
          {config.subject?.name} - পরীক্ষা
        </ThemedText>
        <View style={styles.progressContainer}>
          <ThemedText style={styles.progressText}>
            মোট প্রশ্ন: {questions.length} | উত্তর দেওয়া:{" "}
            {Object.keys(answers).length}
          </ThemedText>
          <TimerProgress
            totalSeconds={totalTimeInSeconds}
            isPaused={isExamComplete}
          />
        </View>
      </View>

      <ScrollView
        style={styles.questionsContainer}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContentContainer}
      >
        {questions.map((question, questionIndex) => {
          const questionId = question.id.toString();
          const selectedAnswer = answers[questionId];
          const isSubmitting = submittingQuestions.has(questionId);

          return (
            <View key={question.id} style={styles.questionCard}>
              <View style={styles.questionHeader}>
                <ThemedText style={styles.questionNumber}>
                  প্রশ্ন {questionIndex + 1}
                </ThemedText>
                {isSubmitting && (
                  <View style={styles.loadingContainer}>
                    <ActivityIndicator size="small" />
                    <ThemedText style={styles.loadingText}>
                      জমা দেওয়া হচ্ছে...
                    </ThemedText>
                  </View>
                )}
              </View>

              <ThemedText style={styles.questionText}>
                {question.text}
              </ThemedText>

              {question.image_url && (
                <View style={styles.imageContainer}>
                  <ThemedText style={styles.imageText}>
                    [Image will be displayed here]
                  </ThemedText>
                </View>
              )}

              <View style={styles.optionsContainer}>
                {question.options.map((option, optionIndex) => {
                  const isSelected = selectedAnswer === option.id.toString();

                  return (
                    <TouchableOpacity
                      key={option.id}
                      style={[
                        styles.optionButton,
                        isSelected && styles.selectedOption,
                        isSubmitting && styles.disabledOption,
                      ]}
                      onPress={() =>
                        !isSubmitting &&
                        handleAnswerChange(questionId, option.id.toString())
                      }
                      activeOpacity={0.7}
                      disabled={isSubmitting}
                    >
                      <ThemedText
                        style={[
                          styles.optionText,
                          isSelected && styles.selectedOptionText,
                          isSubmitting && styles.disabledOptionText,
                        ]}
                      >
                        {String.fromCharCode(65 + optionIndex)}. {option.text}
                      </ThemedText>
                      {option.image_url && (
                        <ThemedText style={styles.optionImageText}>
                          [Option Image]
                        </ThemedText>
                      )}
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>
          );
        })}
      </ScrollView>

      <View style={styles.footer}>
        <Button
          onPress={handleSubmit}
          style={styles.submitButton}
          isLoading={isSubmitting}
        >
          পরীক্ষা সমাপ্ত করুন
        </Button>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  header: {
    backgroundColor: "#9333EA",
    paddingHorizontal: 20,
    paddingVertical: 16,
    paddingTop: 50,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
    marginBottom: 12,
  },
  progressContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  progressText: {
    fontSize: 14,
    color: "#ffffff",
  },
  questionsContainer: {
    flex: 1,
  },
  scrollContentContainer: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    gap: 20,
  },
  questionCard: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  questionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  questionNumber: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#9333EA",
  },
  loadingContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  loadingText: {
    fontSize: 12,
    color: "#6B7280",
  },
  questionText: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 20,
  },
  imageContainer: {
    marginBottom: 16,
    padding: 16,
    backgroundColor: "#F3F4F6",
    borderRadius: 8,
    alignItems: "center",
  },
  imageText: {
    color: "#6B7280",
    fontStyle: "italic",
  },
  optionsContainer: {
    gap: 12,
  },
  optionButton: {
    padding: 16,
    borderWidth: 2,
    borderColor: "#E5E7EB",
    borderRadius: 8,
    backgroundColor: "white",
  },
  selectedOption: {
    borderColor: "#9333EA",
    backgroundColor: "#FAF5FF",
  },
  disabledOption: {
    opacity: 0.6,
  },
  optionText: {
    fontSize: 14,
    lineHeight: 20,
  },
  selectedOptionText: {
    color: "#9333EA",
    fontWeight: "500",
  },
  disabledOptionText: {
    color: "#9CA3AF",
  },
  optionImageText: {
    fontSize: 12,
    color: "#6B7280",
    fontStyle: "italic",
    marginTop: 4,
  },
  footer: {
    backgroundColor: "white",
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: "#E5E7EB",
  },
  submitButton: {
    backgroundColor: "#9333EA",
  },
  errorText: {
    fontSize: 16,
    textAlign: "center",
    color: "#EF4444",
  },
});
