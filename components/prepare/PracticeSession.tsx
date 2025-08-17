import Button from '@/components/Button';
import { ProgressBar } from '@/components/shared/ProgressBar';
import { QuestionDisplay } from '@/components/shared/QuestionDisplay';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from "@/components/ThemedView";
import { practiceConfigAtom } from "@/store/prepare";
import { extractTopicIds, questionService } from "@/utils/api";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useAtom } from "jotai";
import React, { useEffect, useState } from "react";
import { Alert, StyleSheet, TouchableOpacity, View } from "react-native";

export function PracticeSession() {
  const [config, setConfig] = useAtom(practiceConfigAtom);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [timeSpent, setTimeSpent] = useState(0);

  // Timer effect
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeSpent((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const totalQuestions = config.questions?.length || 0;
  const currentQuestion = config.questions?.[config.currentQuestionIndex];

  // Load questions when component mounts
  useEffect(() => {
    const loadQuestions = async () => {
      if (!config.questions || config.questions.length === 0) {
        setIsLoading(true);
        try {
          const topicIds = extractTopicIds(config.selectedSections);
          if (topicIds.length === 0) {
            Alert.alert("Error", "Please select at least one topic");
            return;
          }

          const topicIdsString = topicIds.join(",");
          const questions = await questionService.getMCQs(topicIdsString);

          setConfig((prev) => ({
            ...prev,
            questions,
            currentQuestionIndex: 0,
            answers: {},
            isCompleted: false,
          }));
        } catch (error) {
          console.error("Error loading questions:", error);
          Alert.alert("Error", "Failed to load questions. Please try again.");
        } finally {
          setIsLoading(false);
        }
      }
    };

    loadQuestions();
  }, [config.selectedSections, config.questions?.length, setConfig]);

  const handleAnswerSelect = (answerId: string | number) => {
    if (!isAnswered) {
      console.log(answerId);
      setSelectedAnswer(
        typeof answerId === "number" ? answerId : parseInt(answerId)
      );
      setIsAnswered(true);
    }
  };

  const handleNext = () => {
    if (config.currentQuestionIndex < totalQuestions - 1) {
      setConfig((prev) => ({
        ...prev,
        currentQuestionIndex: prev.currentQuestionIndex + 1,
        answers: {
          ...prev.answers,
          [currentQuestion.id]: selectedAnswer!,
        },
      }));
      setSelectedAnswer(null);
      setIsAnswered(false);
    } else {
      // Complete the practice session
      setConfig((prev) => ({
        ...prev,
        answers: {
          ...prev.answers,
          [currentQuestion.id]: selectedAnswer!,
        },
        isCompleted: true,
        step: 4,
      }));
    }
  };

  const goBack = () => {
    Alert.alert(
      "সেশন বাতিল করুন?",
      "আপনি কি নিশ্চিত আপনি সেশন বাতিল করতে চান?",
      [
        {
          text: "না",
          style: "cancel",
        },
        {
          text: "হ্যাঁ",
          onPress: () =>
            setConfig((prev) => ({
              ...prev,
              step: 2,
              selectedSections: {},
            })),
        },
      ]
    );
  };

  // Format time function
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <ThemedView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={goBack} style={styles.closeButton}>
          <Ionicons name="close" size={24} color="#4B5563" />
        </TouchableOpacity>

        <View style={styles.progressContainer}>
          <ProgressBar
            value={config.currentQuestionIndex + 1}
            max={totalQuestions}
            size="md"
          />
        </View>

        <View style={styles.timeContainer}>
          <ThemedText style={styles.timeText}>
            {formatTime(timeSpent)}
          </ThemedText>
        </View>
      </View>

      <LinearGradient
        colors={["#8B5CF6", "#6366F1"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.premiumBanner}
      >
        <View style={styles.premiumContent}>
          <Ionicons name="sparkles" size={20} color="#FFFFFF" />
          <ThemedText style={styles.premiumText}>
            ব্যাখ্যা আনলক করতে পাঞ্জেরি+ আপগ্রেড কর
          </ThemedText>
        </View>
        <Ionicons name="chevron-forward" size={20} color="#FFFFFF" />
      </LinearGradient>

      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ThemedText>Loading questions...</ThemedText>
        </View>
      ) : currentQuestion ? (
        <View style={styles.questionContainer}>
          <QuestionDisplay
            key={config.currentQuestionIndex}
            questionNumber={config.currentQuestionIndex + 1}
            questionText={currentQuestion.text}
            options={currentQuestion.options.map((opt) => ({
              id: opt.id.toString(),
              text: opt.text,
              key: `option-${opt.id}`,
            }))}
            userAnswer={selectedAnswer?.toString()}
            correctAnswer={currentQuestion.correct_option_id.toString()}
            showAnswer={isAnswered}
            onSelectOption={handleAnswerSelect}
          />

          {isAnswered && selectedAnswer !== null && (
            <View style={styles.feedbackContainer}>
              {selectedAnswer === currentQuestion.correct_option_id ? (
                <View style={styles.correctFeedback}>
                  <Ionicons name="checkmark-circle" size={24} color="#22C55E" />
                  <ThemedText style={styles.correctText}>
                    সঠিক উত্তর!
                  </ThemedText>
                </View>
              ) : (
                <View style={styles.incorrectFeedback}>
                  <Ionicons name="close-circle" size={24} color="#EF4444" />
                  <ThemedText style={styles.incorrectText}>
                    ভুল উত্তর!
                  </ThemedText>
                </View>
              )}
            </View>
          )}
        </View>
      ) : (
        <View style={styles.loadingContainer}>
          <ThemedText>No questions available</ThemedText>
        </View>
      )}

      {isAnswered && (
        <View style={styles.buttonContainer}>
          <Button onPress={handleNext} style={styles.nextButton}>
            {config.currentQuestionIndex < totalQuestions - 1
              ? "পরবর্তী"
              : "ফলাফল দেখুন"}
          </Button>
        </View>
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    gap: 12,
  },
  closeButton: {
    padding: 4,
  },
  progressContainer: {
    flex: 1,
  },
  timeContainer: {
    backgroundColor: "#F3F4F6",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 16,
  },
  timeText: {
    fontSize: 14,
    color: "#4B5563",
    fontWeight: "600",
  },
  premiumBanner: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 12,
    borderRadius: 12,
    marginBottom: 16,
  },
  premiumContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  premiumText: {
    color: "#FFFFFF",
    fontWeight: "500",
  },
  questionContainer: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonContainer: {
    marginTop: 16,
    alignItems: "flex-end",
  },
  nextButton: {
    backgroundColor: "#9333EA",
    paddingHorizontal: 24,
    minWidth: 120,
  },
  feedbackContainer: {
    marginTop: 16,
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  correctFeedback: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: "#DCFCE7",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#22C55E",
  },
  incorrectFeedback: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: "#FEE2E2",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#EF4444",
  },
  correctText: {
    color: "#15803D",
    fontWeight: "600",
    fontSize: 16,
  },
  incorrectText: {
    color: "#DC2626",
    fontWeight: "600",
    fontSize: 16,
  },
}); 