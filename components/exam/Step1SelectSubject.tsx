import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { FeatureCard } from '@/components/shared/FeatureCard';
import { useSubjects } from '@/hooks/useSubjects';
import { Subject } from '@/store/commons';
import { examConfigAtom } from '@/store/exam';
import { useAtom } from 'jotai';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Image,
  StyleSheet,
  View,
} from "react-native";
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StepIndicator } from './StepIndicator';

export function Step1SelectSubject() {
  const [config, setConfig] = useAtom(examConfigAtom);
  const { subjects, loading, error } = useSubjects();
  const insets = useSafeAreaInsets();

  const handleSubjectSelect = (subject: Subject) => {
    // If subject has no papers, show an alert
    if (subject.papers.length === 0) {
      Alert.alert('Notice', 'এই বিষয়ের জন্য এখনও কোন পত্র যোগ করা হয়নি।');
      return;
    }

    // If subject has only one paper, skip paper selection and go directly to chapter selection
    if (subject.papers.length === 1) {
      setConfig((prev) => ({
        ...prev,
        subject,
        step: 2,
        selectedSections: { [subject.papers[0].id.toString()]: {} },
      }));
    } else {
      setConfig((prev) => ({ ...prev, subject, step: 2 }));
    }
  };

  // Since this is the first step, going back would just do nothing
  const handleBack = () => {
    // No-op for first step
  };

  const renderSubject = ({ item }: { item: Subject }) => {
    // Use default icon for all subjects since placeholder URLs don't work in React Native
    const iconSource = require("@/assets/images/icon.png");

    return (
      <View style={styles.subjectItem}>
        <FeatureCard
          title={item.name}
          icon={<Image source={iconSource} style={styles.subjectIcon} />}
          style={config.subject?.name === item.name ? styles.selectedCard : {}}
          onPress={() => handleSubjectSelect(item)}
          activeOpacity={0.7}
        />
      </View>
    );
  };

  if (loading) {
    return (
      <ThemedView
        style={[styles.container, { paddingTop: insets.top > 0 ? 16 : 32 }]}
      >
        <StepIndicator onBack={handleBack} />
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#9333EA" />
          <ThemedText style={styles.loadingText}>
            Loading subjects...
          </ThemedText>
        </View>
      </ThemedView>
    );
  }

  if (error) {
    return (
      <ThemedView
        style={[styles.container, { paddingTop: insets.top > 0 ? 16 : 32 }]}
      >
        <StepIndicator onBack={handleBack} />
        <View style={styles.errorContainer}>
          <ThemedText style={styles.errorText}>{error}</ThemedText>
        </View>
      </ThemedView>
    );
  }

  return (
    <ThemedView
      style={[styles.container, { paddingTop: insets.top > 0 ? 16 : 32 }]}
    >
      <StepIndicator onBack={handleBack} />

      <ThemedText style={styles.title}>
        কোন বিষয়ের পরীক্ষা দিতে চাও?
      </ThemedText>

      <FlatList
        data={subjects}
        renderItem={renderSubject}
        keyExtractor={(item) => item.name}
        numColumns={2}
        contentContainerStyle={styles.subjectGrid}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <ThemedText style={styles.emptyText}>
              No subjects available
            </ThemedText>
          </View>
        }
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  subjectGrid: {
    paddingBottom: 24,
  },
  subjectItem: {
    width: '50%',
    padding: 6,
  },
  subjectIcon: {
    width: 48,
    height: 48,
    resizeMode: 'contain',
  },
  selectedCard: {
    borderColor: '#9333EA',
    backgroundColor: '#FAF5FF',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#666',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  errorText: {
    fontSize: 16,
    color: '#EF4444',
    textAlign: 'center',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
  },
});
