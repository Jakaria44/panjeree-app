import Button from "@/components/Button";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useThemeColor } from "@/hooks/useThemeColor";
import {
  Institution,
  questionBankConfigAtom,
  questionBankUserAnswersAtom,
  Session,
} from "@/store/question-bank";
import { questionBankService } from "@/utils/api";
import { useAtom } from "jotai";
import React, { useEffect } from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";

export function Step2SelectInstitutionAndSession() {
  const [config, setConfig] = useAtom(questionBankConfigAtom);
  const [, setUserAnswers] = useAtom(questionBankUserAnswersAtom);
  const primaryColor = useThemeColor({}, "purple600");

  // Fetch institutes when type is selected
  useEffect(() => {
    if (
      config.type &&
      config.institutes.length === 0 &&
      !config.loadingInstitutes
    ) {
      fetchInstitutes();
    }
  }, [config.type]);

  // Fetch tags when institution is selected
  useEffect(() => {
    if (config.institution && config.tags.length === 0 && !config.loadingTags) {
      fetchTags();
    }
  }, [config.institution]);

  const fetchInstitutes = async () => {
    if (!config.type) return;

    setConfig((prev) => ({ ...prev, loadingInstitutes: true }));
    try {
      const institutes = await questionBankService.getInstitutes(config.type);
      setConfig((prev) => ({
        ...prev,
        institutes,
        loadingInstitutes: false,
      }));
    } catch (error) {
      console.error("Error fetching institutes:", error);
      Alert.alert("Error", "ইনস্টিটিউট লোড করতে সমস্যা হয়েছে");
      setConfig((prev) => ({ ...prev, loadingInstitutes: false }));
    }
  };

  const fetchTags = async () => {
    if (!config.institution) return;

    setConfig((prev) => ({ ...prev, loadingTags: true }));
    try {
      const tags = await questionBankService.getTags(
        parseInt(config.institution.id)
      );
      setConfig((prev) => ({
        ...prev,
        tags,
        loadingTags: false,
      }));
    } catch (error) {
      console.error("Error fetching tags:", error);
      Alert.alert("Error", "সেশন লোড করতে সমস্যা হয়েছে");
      setConfig((prev) => ({ ...prev, loadingTags: false }));
    }
  };

  const handleInstitutionSelect = (institute: any) => {
    const institution: Institution = {
      id: institute.id.toString(),
      name: institute.name,
      description: `${
        institute.type === "board" ? "বোর্ড" : "স্কুল"
      } পরীক্ষার প্রশ্ন`,
    };
    setConfig((prev) => ({
      ...prev,
      institution,
      session: null,
      tags: [],
      mcqs: [],
    }));
    // Clear user answers when selecting new institution
    setUserAnswers({});
  };

  const handleSessionSelect = (tag: any) => {
    const session: Session = {
      id: tag.id.toString(),
      name: `${tag.year} সালের প্রশ্ন`,
      description: `${tag.institute_name} - ${tag.year}`,
    };
    setConfig((prev) => ({ ...prev, session }));
  };

  const goBack = () => {
    setConfig((prev) => ({
      ...prev,
      step: 1,
      type: null,
      institution: null,
      session: null,
      institutes: [],
      tags: [],
      mcqs: [],
    }));
    // Clear user answers when going back
    setUserAnswers({});
  };

  const goToNext = () => setConfig((prev) => ({ ...prev, step: 3 }));

  const renderInstitution = ({ item }: { item: any }) => {
    const isSelected = config.institution?.id === item.id.toString();

    return (
      <TouchableOpacity
        style={[
          styles.institutionItem,
          isSelected && {
            backgroundColor: "#FAF5FF",
            borderColor: primaryColor,
          },
        ]}
        onPress={() => handleInstitutionSelect(item)}
        activeOpacity={0.7}
      >
        <ThemedText
          style={[styles.itemText, isSelected && { color: primaryColor }]}
        >
          {item.name}
        </ThemedText>
        {isSelected && (
          <View style={[styles.checkmark, { backgroundColor: primaryColor }]}>
            <ThemedText style={styles.checkmarkText}>✓</ThemedText>
          </View>
        )}
      </TouchableOpacity>
    );
  };

  const renderSession = ({ item }: { item: any }) => {
    const isSelected = config.session?.id === item.id.toString();

    return (
      <TouchableOpacity
        style={[
          styles.sessionItem,
          isSelected && {
            backgroundColor: "#FAF5FF",
            borderColor: primaryColor,
          },
        ]}
        onPress={() => handleSessionSelect(item)}
        activeOpacity={0.7}
      >
        <ThemedText
          style={[styles.itemText, isSelected && { color: primaryColor }]}
        >
          {item.year} সাল
        </ThemedText>
        {isSelected && (
          <View style={[styles.checkmark, { backgroundColor: primaryColor }]}>
            <ThemedText style={styles.checkmarkText}>✓</ThemedText>
          </View>
        )}
      </TouchableOpacity>
    );
  };

  const canContinue = config.institution && config.session;

  return (
    <ThemedView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>
            {config.type === "board" ? "বোর্ড" : "ইনস্টিটিউট"} সিলেক্ট করুন
          </ThemedText>
          {config.loadingInstitutes ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color={primaryColor} />
              <ThemedText style={styles.loadingText}>লোড হচ্ছে...</ThemedText>
            </View>
          ) : (
            <FlatList
              data={config.institutes}
              renderItem={renderInstitution}
              keyExtractor={(item) => item.id.toString()}
              contentContainerStyle={styles.listContent}
              scrollEnabled={false}
            />
          )}
        </View>

        {config.institution && (
          <View style={styles.section}>
            <ThemedText style={styles.sectionTitle}>
              সাল সিলেক্ট করুন
            </ThemedText>
            {config.loadingTags ? (
              <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color={primaryColor} />
                <ThemedText style={styles.loadingText}>লোড হচ্ছে...</ThemedText>
              </View>
            ) : (
              <FlatList
                horizontal
                data={config.tags}
                renderItem={renderSession}
                keyExtractor={(item) => item.id.toString()}
                contentContainerStyle={styles.sessionsList}
                showsHorizontalScrollIndicator={false}
              />
            )}
          </View>
        )}
      </ScrollView>

      <View style={styles.buttonContainer}>
        <Button onPress={goBack} variant="outline" style={styles.backButton}>
          পূর্ববর্তী
        </Button>
        <Button
          onPress={goToNext}
          disabled={!canContinue}
          style={[styles.nextButton, !canContinue && { opacity: 0.5 }]}
        >
          পরবর্তী ধাপে যান
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
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
  },
  listContent: {
    paddingBottom: 8,
  },
  institutionItem: {
    padding: 16,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 8,
    marginBottom: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  sessionsList: {
    paddingBottom: 8,
  },
  sessionItem: {
    padding: 16,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 8,
    marginRight: 12,
    minWidth: 100,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  itemText: {
    fontSize: 16,
  },
  checkmark: {
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 8,
  },
  checkmarkText: {
    color: "#FFFFFF",
    fontSize: 12,
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
