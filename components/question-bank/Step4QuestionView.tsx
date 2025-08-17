import Button from "@/components/Button";
import { QuestionDisplay } from "@/components/shared/QuestionDisplay";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import {
  questionBankConfigAtom,
  questionBankUserAnswersAtom,
} from "@/store/question-bank";
import { Ionicons } from "@expo/vector-icons";
import { useAtom } from "jotai";
import React, { useState } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";

export function Step4QuestionView() {
  const [config, setConfig] = useAtom(questionBankConfigAtom);
  const [userAnswers, setUserAnswers] = useAtom(questionBankUserAnswersAtom);
  const [showAnswers, setShowAnswers] = useState(config.showAnswers);

  const questions = config.mcqs;
  const totalQuestions = questions.length;

  const handleAnswer = (questionId: string, optionId: string) => {
    setUserAnswers((prev) => ({
      ...prev,
      [questionId]: optionId,
    }));
  };

  const toggleShowAnswers = () => {
    const newShowAnswers = !showAnswers;
    setShowAnswers(newShowAnswers);
    setConfig((prev) => ({ ...prev, showAnswers: newShowAnswers }));
  };

  const confirmSubmit = () => {
    Alert.alert(
      "প্রশ্ন ব্যাংক সমাপ্ত করবেন?",
      "আপনি কি নিশ্চিত যে আপনি প্রশ্ন ব্যাংক সমাপ্ত করতে চান?",
      [
        {
          text: "না, ফিরে যান",
          style: "cancel",
        },
        {
          text: "হ্যাঁ, সমাপ্ত করুন",
          onPress: handleSubmitQuestionBank,
        },
      ]
    );
  };

  const handleSubmitQuestionBank = () => {
    // Calculate results
    let correctAnswers = 0;
    let incorrectAnswers = 0;
    let unanswered = 0;

    questions.forEach((question) => {
      const userAnswer = userAnswers[question.id.toString()];
      if (!userAnswer) {
        unanswered++;
      } else {
        // Find the selected option and check if it's correct
        const selectedOption = question.options.find(
          (opt) => opt.id.toString() === userAnswer
        );
        if (selectedOption && selectedOption.is_correct) {
          correctAnswers++;
        } else {
          incorrectAnswers++;
        }
      }
    });

    // Move to result page
    setConfig((prev) => ({
      ...prev,
      step: 5,
      questionBankResults: {
        totalQuestions: questions.length,
        correctAnswers,
        incorrectAnswers,
        unanswered,
        timeTaken: 1200, // Mock time taken in seconds (you can implement real timing)
        answers: userAnswers,
      },
    }));
  };

  const renderQuestion = (question: any, index: number) => {
    // Convert MCQ options to the format expected by QuestionDisplay
    const formattedOptions = question.options.map(
      (option: any, idx: number) => ({
        id: String.fromCharCode(97 + idx), // 'a', 'b', 'c', 'd'
        text: option.text,
      })
    );

    // Find the correct answer in the 'a', 'b', 'c', 'd' format
    const correctOptionIndex = question.options.findIndex(
      (opt: any) => opt.is_correct
    );
    const correctAnswer =
      correctOptionIndex >= 0
        ? String.fromCharCode(97 + correctOptionIndex)
        : "a";

    // Get user answer in the 'a', 'b', 'c', 'd' format
    const userAnswerOptionId = userAnswers[question.id.toString()];
    let userAnswer = null;
    if (userAnswerOptionId) {
      const userAnswerIndex = question.options.findIndex(
        (opt: any) => opt.id.toString() === userAnswerOptionId
      );
      if (userAnswerIndex >= 0) {
        userAnswer = String.fromCharCode(97 + userAnswerIndex);
      }
    }

    return (
      <View key={question.id} style={styles.questionItem}>
        <QuestionDisplay
          questionNumber={index + 1}
          questionText={question.text}
          options={formattedOptions}
          userAnswer={userAnswer}
          onSelectOption={(optionId) => {
            // Convert back to original option ID
            const optionIndex = optionId.charCodeAt(0) - 97;
            const originalOptionId =
              question.options[optionIndex]?.id.toString();
            if (originalOptionId) {
              handleAnswer(question.id.toString(), originalOptionId);
            }
          }}
          showAnswer={showAnswers}
          correctAnswer={correctAnswer}
        />
        {question.image_url && (
          <View style={styles.questionImage}>
            <ThemedText style={styles.imageText}>[Question Image]</ThemedText>
          </View>
        )}
      </View>
    );
  };

  const answeredCount = Object.keys(userAnswers).length;

  return (
    <ThemedView style={styles.container}>
      <View style={styles.header}>
        <ThemedText style={styles.title}>প্রশ্ন ব্যাংক</ThemedText>
        <ThemedText style={styles.subtitle}>
          {config.subject?.name} -{" "}
          {config.type === "board" ? "বোর্ড প্রশ্ন" : "স্কুল প্রশ্ন"}
        </ThemedText>
        <ThemedText style={styles.institutionText}>
          {config.institution?.name} - {config.session?.name}
        </ThemedText>
        <View style={styles.progressInfo}>
          <ThemedText style={styles.questionCounter}>
            উত্তর দেওয়া হয়েছে: {answeredCount}/{totalQuestions}
          </ThemedText>
        </View>

        <TouchableOpacity
          style={styles.showAnswersButton}
          onPress={toggleShowAnswers}
        >
          <Ionicons
            name={showAnswers ? "eye-off" : "eye"}
            size={20}
            color="#9333EA"
          />
          <ThemedText style={styles.showAnswersText}>
            {showAnswers ? "উত্তর লুকান" : "উত্তর দেখুন"}
          </ThemedText>
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.questionContainer}
        showsVerticalScrollIndicator={true}
        contentContainerStyle={styles.questionContent}
      >
        {questions.map((question, index) => renderQuestion(question, index))}
      </ScrollView>

      <View style={styles.bottomContainer}>
        <View style={styles.progressDots}>
          {questions.map((question, index) => (
            <View
              key={index}
              style={[
                styles.dot,
                userAnswers[question.id.toString()] && styles.answeredDot,
              ]}
            />
          ))}
        </View>

        <View style={styles.buttonContainer}>
          <Button
            onPress={() => setConfig((prev) => ({ ...prev, step: 3 }))}
            variant="outline"
            style={styles.backButton}
          >
            পূর্ববর্তী
          </Button>
          <Button onPress={confirmSubmit} style={styles.submitButton}>
            সমাপ্ত করুন
          </Button>
        </View>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    marginBottom: 24,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: "#6B7280",
    marginBottom: 8,
  },
  progressInfo: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 8,
  },
  questionCounter: {
    fontSize: 14,
    fontWeight: "600",
  },
  showAnswersButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    marginTop: 16,
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: "#FAF5FF",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#9333EA",
  },
  showAnswersText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#9333EA",
  },
  questionContainer: {
    flex: 1,
  },
  questionContent: {
    paddingBottom: 16,
  },
  questionItem: {
    marginBottom: 24,
  },
  bottomContainer: {
    marginTop: 16,
  },
  progressDots: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 8,
    marginBottom: 16,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#E5E7EB",
  },
  answeredDot: {
    backgroundColor: "#10B981",
  },
  buttonContainer: {
    flexDirection: "row",
    gap: 12,
    marginTop: 8,
  },
  backButton: {
    flex: 1,
  },
  submitButton: {
    flex: 2,
    backgroundColor: "#9333EA",
  },
  institutionText: {
    fontSize: 14,
    color: "#6B7280",
    marginBottom: 8,
  },
  questionImage: {
    marginTop: 12,
    padding: 16,
    backgroundColor: "#F3F4F6",
    borderRadius: 8,
    alignItems: "center",
  },
  imageText: {
    color: "#6B7280",
    fontStyle: "italic",
  },
});
