import Button from "@/components/Button";
import { SummaryStatCard } from "@/components/shared/SummaryStatCard";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { questionBankConfigAtom } from "@/store/question-bank";
import { questionBankService } from "@/utils/api";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useAtom } from "jotai";
import React, { useEffect } from "react";
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";

export function Step3Summary() {
  const [config, setConfig] = useAtom(questionBankConfigAtom);

  // Fetch MCQs when session is selected and MCQs are not loaded
  useEffect(() => {
    if (config.session && config.mcqs.length === 0 && !config.loadingMCQs) {
      fetchMCQs();
    }
  }, [config.session]);

  const fetchMCQs = async () => {
    if (!config.session) return;

    setConfig((prev) => ({ ...prev, loadingMCQs: true }));
    try {
      const mcqs = await questionBankService.getMCQs(
        parseInt(config.session.id)
      );
      setConfig((prev) => ({
        ...prev,
        mcqs,
        loadingMCQs: false,
      }));
    } catch (error) {
      console.error("Error fetching MCQs:", error);
      Alert.alert("Error", "প্রশ্ন লোড করতে সমস্যা হয়েছে");
      setConfig((prev) => ({ ...prev, loadingMCQs: false }));
    }
  };

  // Get institution name
  const getInstitutionName = () => {
    return config.institution?.name || "";
  };

  // Get session name
  const getSessionName = () => {
    return config.session?.name || "";
  };

  // Get bank type name
  const getBankTypeName = () => {
    return config.type === "board" ? "বোর্ড প্রশ্ন" : "স্কুল/কলেজ প্রশ্ন";
  };

  const handleStartQuestionBank = () => {
    if (config.mcqs.length === 0) {
      Alert.alert("Error", "কোন প্রশ্ন পাওয়া যায়নি");
      return;
    }
    setConfig((prev) => ({ ...prev, step: 4 }));
  };

  const handleEdit = (step: number) => {
    setConfig((prev) => ({ ...prev, step }));
  };

  return (
    <ThemedView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
      >
        <ThemedText style={styles.title}>প্রশ্ন ব্যাঙ্ক সারসংক্ষেপ</ThemedText>
        <ThemedText style={styles.subtitle}>
          প্রশ্ন ব্যাঙ্ক দেখার আগে সমস্ত তথ্য যাচাই করুন
        </ThemedText>

        <View style={styles.summaryContainer}>
          <View style={styles.summaryItem}>
            <View style={styles.summaryHeader}>
              <ThemedText style={styles.itemTitle}>বিষয়</ThemedText>
              <TouchableOpacity onPress={() => handleEdit(1)}>
                <View style={styles.editButton}>
                  <Ionicons name="pencil-outline" size={16} color="#6B7280" />
                  <ThemedText style={styles.editText}>সম্পাদনা</ThemedText>
                </View>
              </TouchableOpacity>
            </View>
            <ThemedText style={styles.itemValue}>
              {config.subject?.name}
            </ThemedText>
          </View>

          <View style={styles.summaryItem}>
            <View style={styles.summaryHeader}>
              <ThemedText style={styles.itemTitle}>
                প্রশ্ন ব্যাঙ্ক ধরন
              </ThemedText>
              <TouchableOpacity onPress={() => handleEdit(1)}>
                <View style={styles.editButton}>
                  <Ionicons name="pencil-outline" size={16} color="#6B7280" />
                  <ThemedText style={styles.editText}>সম্পাদনা</ThemedText>
                </View>
              </TouchableOpacity>
            </View>
            <ThemedText style={styles.itemValue}>
              {getBankTypeName()}
            </ThemedText>
          </View>

          <View style={styles.summaryItem}>
            <View style={styles.summaryHeader}>
              <ThemedText style={styles.itemTitle}>
                বোর্ড / প্রতিষ্ঠান
              </ThemedText>
              <TouchableOpacity onPress={() => handleEdit(2)}>
                <View style={styles.editButton}>
                  <Ionicons name="pencil-outline" size={16} color="#6B7280" />
                  <ThemedText style={styles.editText}>সম্পাদনা</ThemedText>
                </View>
              </TouchableOpacity>
            </View>
            <ThemedText style={styles.itemValue}>
              {getInstitutionName()}
            </ThemedText>
          </View>

          <View style={styles.summaryItem}>
            <View style={styles.summaryHeader}>
              <ThemedText style={styles.itemTitle}>সাল</ThemedText>
              <TouchableOpacity onPress={() => handleEdit(2)}>
                <View style={styles.editButton}>
                  <Ionicons name="pencil-outline" size={16} color="#6B7280" />
                  <ThemedText style={styles.editText}>সম্পাদনা</ThemedText>
                </View>
              </TouchableOpacity>
            </View>
            <ThemedText style={styles.itemValue}>{getSessionName()}</ThemedText>
          </View>
        </View>

        {config.loadingMCQs ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#9333EA" />
            <ThemedText style={styles.loadingText}>
              প্রশ্ন লোড হচ্ছে...
            </ThemedText>
          </View>
        ) : (
          <View style={styles.statsContainer}>
            <SummaryStatCard
              title="মোট প্রশ্ন"
              value={config.mcqs.length.toString()}
              icon={
                <Ionicons
                  name="help-circle-outline"
                  size={20}
                  color="#6B7280"
                />
              }
            />
            <SummaryStatCard
              title="MCQ প্রশ্ন"
              value={config.mcqs
                .filter((q) => q.type === "mcq")
                .length.toString()}
              icon={
                <Ionicons
                  name="radio-button-on-outline"
                  size={20}
                  color="#6B7280"
                />
              }
            />
            <SummaryStatCard
              title="অন্যান্য প্রশ্ন"
              value={config.mcqs
                .filter((q) => q.type !== "mcq")
                .length.toString()}
              icon={
                <Ionicons
                  name="document-text-outline"
                  size={20}
                  color="#6B7280"
                />
              }
            />
          </View>
        )}

        <View style={styles.noteContainer}>
          <View style={styles.noteIconContainer}>
            <Ionicons
              name="information-circle-outline"
              size={24}
              color="#2563EB"
            />
          </View>
          <ThemedText style={styles.noteText}>
            প্রশ্নপত্রের সকল প্রশ্ন দেখতে প্রশ্ন ব্যাঙ্ক দেখুন বোতামে ক্লিক
            করুন। প্রশ্নের উত্তর দেখতে সংশ্লিষ্ট প্রশ্নে ক্লিক করুন।
          </ThemedText>
        </View>
      </ScrollView>

      <View style={styles.buttonContainer}>
        <Button
          onPress={() => handleEdit(2)}
          variant="outline"
          style={styles.backButton}
        >
          পূর্ববর্তী
        </Button>
        <Button
          onPress={handleStartQuestionBank}
          disabled={config.loadingMCQs || config.mcqs.length === 0}
          style={[
            styles.nextButton,
            (config.loadingMCQs || config.mcqs.length === 0) && {
              opacity: 0.5,
            },
          ]}
        >
          প্রশ্ন ব্যাঙ্ক দেখুন
        </Button>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: "#6B7280",
    marginBottom: 24,
  },
  summaryContainer: {
    backgroundColor: "#F9FAFB",
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  summaryItem: {
    marginBottom: 16,
  },
  summaryHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
  },
  itemTitle: {
    fontSize: 14,
    color: "#6B7280",
  },
  itemValue: {
    fontSize: 16,
    fontWeight: "600",
  },
  editButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  editText: {
    fontSize: 12,
    color: "#6B7280",
  },
  statsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 24,
  },
  noteContainer: {
    flexDirection: "row",
    backgroundColor: "#EFF6FF",
    borderRadius: 8,
    padding: 12,
    marginBottom: 24,
    gap: 12,
  },
  noteIconContainer: {
    marginTop: 2,
  },
  noteText: {
    flex: 1,
    fontSize: 14,
    color: "#1E40AF",
    lineHeight: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    gap: 12,
    marginTop: 8,
  },
  backButton: {
    flex: 1,
  },
  nextButton: {
    flex: 2,
  },
  loadingContainer: {
    padding: 40,
    alignItems: "center",
  },
  loadingText: {
    marginTop: 12,
    fontSize: 14,
    color: "#6B7280",
  },
});
