import Button from '@/components/Button';
import { ProgressBar } from '@/components/shared/ProgressBar';
import { QuestionDisplay } from '@/components/shared/QuestionDisplay';
import { ResultStatCard } from '@/components/shared/ResultStatCard';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useThemeColor } from '@/hooks/useThemeColor';
import { examConfigAtom } from "@/store/exam";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useAtom } from "jotai";
import React from 'react';
import { ScrollView, Share, StyleSheet, View } from 'react-native';

export function ExamResult() {
  const [config, setConfig] = useAtom(examConfigAtom);

  // Use global theme colors that exist in the theme
  const mutedTextColor = useThemeColor({}, "mutedForeground");
  const purpleColor = "#9333EA"; // Use the design purple color

  const examResults = config.examResults;
  const questions = config.questions || [];
  const subject = config.subject?.name || "Unknown Subject";

  if (!examResults) {
    return (
      <ThemedView style={styles.container}>
        <ThemedText style={styles.errorText}>
          No exam results available
        </ThemedText>
      </ThemedView>
    );
  }

  const {
    totalQuestions,
    correctAnswers,
    incorrectAnswers,
    unanswered,
    timeTaken,
    answers,
  } = examResults;
  const score = Math.round((correctAnswers / totalQuestions) * 100);

  // Format time taken
  const formatTimeTaken = () => {
    const minutes = Math.floor(timeTaken / 60);
    const seconds = timeTaken % 60;
    return `${minutes} মি. ${seconds} সে.`;
  };

  // Get performance message
  const getPerformanceMessage = () => {
    if (score >= 80) return "দারুণ পারফরম্যান্স!";
    if (score >= 60) return "ভালো করেছ!";
    if (score >= 40) return "আরো ভালো করতে পারো!";
    return "আরো অনুশীলন প্রয়োজন!";
  };

  // Handle share result
  const handleShare = async () => {
    try {
      await Share.share({
        message: `আমি ${subject}-এ পরীক্ষায় ${score}% স্কোর করেছি! ${correctAnswers}/${totalQuestions} প্রশ্নের সঠিক উত্তর দিয়েছি।`,
      });
    } catch (error) {
      console.error("Error sharing result:", error);
    }
  };

  // Get verdict for a question
  const getVerdict = (questionId: string) => {
    const userAnswerId = answers[questionId];
    const question = questions.find((q) => q.id.toString() === questionId);

    if (!question) return { status: "unanswered", text: "উত্তর দেওয়া হয়নি" };
    if (!userAnswerId)
      return { status: "unanswered", text: "উত্তর দেওয়া হয়নি" };

    const userAnswerNumber = parseInt(userAnswerId, 10);

    if (userAnswerNumber === question.correct_option_id) {
      return { status: "correct", text: "সঠিক" };
    } else {
      return { status: "incorrect", text: "ভুল" };
    }
  };

  // Handle go home
  const handleGoHome = () => {
    setConfig((prev) => ({
      ...prev,
      step: 1,
      subject: null,
      selectedSections: {},
      examResults: undefined,
      questions: undefined,
      examId: undefined,
    }));
  };

  return (
    <ThemedView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.resultHeader}>
          <ThemedText style={styles.resultTitle}>পরীক্ষার ফলাফল</ThemedText>
          <ThemedText style={styles.subjectName}>{subject}</ThemedText>
        </View>

        <View style={styles.scoreContainer}>
          <View style={[styles.scoreCircle, { borderColor: purpleColor }]}>
            <ThemedText style={[styles.scoreValue, { color: purpleColor }]}>
              {score}%
            </ThemedText>
            <ThemedText style={[styles.scoreLabel, { color: mutedTextColor }]}>
              স্কোর
            </ThemedText>
          </View>

          <ThemedText style={[styles.performanceText, { color: purpleColor }]}>
            {getPerformanceMessage()}
          </ThemedText>
        </View>

        <View style={styles.statsContainer}>
          <ResultStatCard
            title="সঠিক"
            value={correctAnswers}
            variant="success"
            style={styles.statCard}
          />
          <ResultStatCard
            title="ভুল"
            value={incorrectAnswers}
            variant="error"
            style={styles.statCard}
          />
          <ResultStatCard
            title="উত্তর দেওয়া হয়নি"
            value={unanswered}
            variant="warning"
            style={styles.statCard}
          />
        </View>

        <View style={styles.progressSection}>
          <ThemedText style={styles.sectionTitle}>
            পারফরম্যান্স বিশ্লেষণ
          </ThemedText>
          <View style={styles.progressItem}>
            <View style={styles.progressHeader}>
              <ThemedText style={styles.progressLabel}>সঠিক উত্তর</ThemedText>
              <ThemedText style={styles.progressValue}>
                {correctAnswers}/{totalQuestions}
              </ThemedText>
            </View>
            <ProgressBar
              value={correctAnswers}
              max={totalQuestions}
              color="#10B981"
            />
          </View>

          <View style={styles.metaInfo}>
            <View style={styles.metaItem}>
              <Ionicons name="time-outline" size={16} color="#6B7280" />
              <ThemedText style={styles.metaText}>
                সময় লেগেছে: {formatTimeTaken()}
              </ThemedText>
            </View>
            <View style={styles.metaItem}>
              <Ionicons name="help-circle-outline" size={16} color="#6B7280" />
              <ThemedText style={styles.metaText}>
                মোট প্রশ্ন: {totalQuestions}
              </ThemedText>
            </View>
          </View>
        </View>

        <View style={styles.answersSection}>
          <ThemedText style={styles.sectionTitle}>উত্তরপত্র</ThemedText>

          {questions.map((question, index) => {
            const verdict = getVerdict(question.id.toString());
            const options = question.options.map((option, optionIndex) => ({
              id: String.fromCharCode(97 + optionIndex), // a, b, c, d
              text: option.text,
            }));

            // Convert user answer to option ID
            const getUserAnswerId = () => {
              const userAnswerId = answers[question.id.toString()];
              if (!userAnswerId) return null;

              const userAnswerNumber = parseInt(userAnswerId, 10);
              const optionIndex = question.options.findIndex(
                (opt) => opt.id === userAnswerNumber
              );
              return optionIndex >= 0
                ? String.fromCharCode(97 + optionIndex)
                : null;
            };

            // Get correct answer option ID
            const getCorrectAnswerId = () => {
              const correctOptionIndex = question.options.findIndex(
                (opt) => opt.id === question.correct_option_id
              );
              return correctOptionIndex >= 0
                ? String.fromCharCode(97 + correctOptionIndex)
                : null;
            };

            return (
              <View key={question.id} style={styles.questionItem}>
                <View style={styles.questionHeader}>
                  <View style={styles.questionNumber}>
                    <ThemedText style={styles.questionNumberText}>
                      {index + 1}
                    </ThemedText>
                  </View>
                  <View
                    style={[
                      styles.verdictBadge,
                      verdict.status === "correct" && styles.correctBadge,
                      verdict.status === "incorrect" && styles.incorrectBadge,
                      verdict.status === "unanswered" && styles.unansweredBadge,
                    ]}
                  >
                    <ThemedText
                      style={[
                        styles.verdictText,
                        verdict.status === "correct" && styles.correctText,
                        verdict.status === "incorrect" && styles.incorrectText,
                        verdict.status === "unanswered" &&
                          styles.unansweredText,
                      ]}
                    >
                      {verdict.text}
                    </ThemedText>
                  </View>
                </View>

                <QuestionDisplay
                  questionText={question.text}
                  options={options}
                  userAnswer={getUserAnswerId()}
                  correctAnswer={getCorrectAnswerId()}
                  showAnswer={true}
                />
              </View>
            );
          })}
        </View>

        <View style={styles.buttonContainer}>
          <Button
            onPress={handleShare}
            variant="outline"
            style={styles.shareButton}
          >
            <View style={styles.buttonContent}>
              <Ionicons name="share-outline" size={18} color="#171717" />
              <ThemedText>ফলাফল শেয়ার করুন</ThemedText>
            </View>
          </Button>

          <Button onPress={handleGoHome} style={styles.homeButton}>
            <ThemedText>হোম পেজে ফিরে যান</ThemedText>
          </Button>
        </View>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  resultHeader: {
    alignItems: "center",
    marginBottom: 24,
  },
  resultTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 4,
  },
  subjectName: {
    fontSize: 16,
    color: "#6B7280",
  },
  scoreContainer: {
    alignItems: "center",
    marginBottom: 24,
  },
  scoreCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 8,
    borderColor: "#8B5CF6", // Placeholder, will be replaced by purpleColor
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  scoreValue: {
    fontSize: 32,
    fontWeight: "bold",
    // color: '#8B5CF6', // Placeholder, will be replaced by purpleColor
  },
  scoreLabel: {
    fontSize: 14,
    // color: '#9CA3AF', // Placeholder, will be replaced by mutedTextColor
  },
  performanceText: {
    fontSize: 18,
    fontWeight: "bold",
    // color: '#8B5CF6', // Placeholder, will be replaced by purpleColor
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 24,
  },
  statCard: {
    flex: 1,
    marginHorizontal: 4,
  },
  progressSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 12,
  },
  progressItem: {
    marginBottom: 12,
  },
  progressHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 4,
  },
  progressLabel: {
    fontSize: 14,
  },
  progressValue: {
    fontSize: 14,
    fontWeight: "600",
  },
  metaInfo: {
    marginTop: 16,
    backgroundColor: "#F9FAFB",
    borderRadius: 8,
    padding: 12,
  },
  metaItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 8,
  },
  metaText: {
    fontSize: 14,
    color: "#4B5563",
  },
  answersSection: {
    marginBottom: 24,
  },
  questionItem: {
    marginBottom: 16,
  },
  questionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  questionNumber: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#F3F4F6",
    justifyContent: "center",
    alignItems: "center",
  },
  questionNumberText: {
    fontWeight: "600",
    fontSize: 14,
  },
  verdictBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  correctBadge: {
    backgroundColor: "#DCFCE7",
  },
  incorrectBadge: {
    backgroundColor: "#FEE2E2",
  },
  unansweredBadge: {
    backgroundColor: "#FEF3C7",
  },
  verdictText: {
    fontSize: 12,
    fontWeight: "600",
  },
  correctText: {
    color: "#059669",
  },
  incorrectText: {
    color: "#DC2626",
  },
  unansweredText: {
    color: "#D97706",
  },
  buttonContainer: {
    gap: 12,
    marginBottom: 24,
  },
  shareButton: {
    marginBottom: 8,
  },
  homeButton: {},
  buttonContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  errorText: {
    fontSize: 16,
    textAlign: "center",
    color: "#EF4444",
  },
}); 