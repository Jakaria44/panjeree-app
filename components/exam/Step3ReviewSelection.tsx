import Button from '@/components/Button';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { examConfigAtom } from '@/store/exam';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useAtom } from 'jotai';
import { FlatList, StyleSheet, View } from 'react-native';
import { StepIndicator } from './StepIndicator';

export function Step3ReviewSelection() {
  const [config, setConfig] = useAtom(examConfigAtom);

  // Get selected sections from the config
  const selectedSections = config.selectedSections || {};

  // Create a flat list of selected topics with their context
  const selectedItems: Array<{
    id: number;
    name: string;
    paperName: string;
    chapterName: string;
  }> = [];

  Object.entries(selectedSections).forEach(([paperId, chapters]) => {
    const paper = config.subject?.papers.find(
      (p) => p.id.toString() === paperId
    );
    if (!paper) return;

    Object.entries(chapters).forEach(([chapterId, topicIds]) => {
      const chapter = paper.chapters.find((c) => c.id.toString() === chapterId);
      if (!chapter) return;

      topicIds.forEach((topicId) => {
        const topic = chapter.topics.find((t) => t.id === topicId);
        if (topic) {
          selectedItems.push({
            id: topicId,
            name: topic.name,
            paperName: paper.name,
            chapterName: chapter.name,
          });
        }
      });
    });
  });

  const handleContinue = () => {
    setConfig((prev) => ({
      ...prev,
      step: 4,
    }));
  };

  const handleBack = () => {
    setConfig((prev) => ({
      ...prev,
      step: 2,
    }));
  };

  const renderSelectedItem = ({
    item,
  }: {
    item: { id: number; name: string; paperName: string; chapterName: string };
  }) => {
    return (
      <View style={styles.selectedItem}>
        <Ionicons name='checkmark-circle' size={18} color='#10B981' />
        <View style={styles.itemDetails}>
          <ThemedText style={styles.itemName}>{item.name}</ThemedText>
          <ThemedText style={styles.itemContext}>
            {item.paperName} • {item.chapterName}
          </ThemedText>
        </View>
      </View>
    );
  };

  return (
    <ThemedView style={styles.container}>
      <StepIndicator onBack={handleBack} />

      <View style={styles.header}>
        <ThemedText style={styles.title}>আপনার নির্বাচিত বিষয়সমূহ</ThemedText>

        <View style={styles.subjectContainer}>
          <ThemedText style={styles.subheading}>বিষয়:</ThemedText>
          <ThemedText style={styles.value}>{config.subject?.name}</ThemedText>
        </View>
      </View>

      <View style={styles.sectionsSection}>
        <View style={styles.sectionHeader}>
          <ThemedText style={styles.subheading}>নির্বাচিত টপিকসমূহ:</ThemedText>
          <Button variant='ghost' size='sm' onPress={handleBack}>
            <View style={styles.editButton}>
              <Ionicons name='pencil-outline' size={16} color='#6B7280' />
              <ThemedText style={styles.editText}>সম্পাদনা</ThemedText>
            </View>
          </Button>
        </View>

        <View style={styles.selectedItemsContainer}>
          <FlatList
            data={selectedItems}
            renderItem={renderSelectedItem}
            keyExtractor={(item) => item.id.toString()}
            scrollEnabled={false}
            ListEmptyComponent={
              <View style={styles.emptyContainer}>
                <ThemedText style={styles.emptyText}>
                  কোন টপিক নির্বাচিত হয়নি
                </ThemedText>
              </View>
            }
          />
        </View>
      </View>

      <View style={styles.summarySection}>
        <View style={styles.summaryItem}>
          <ThemedText style={styles.summaryLabel}>মোট টপিক:</ThemedText>
          <ThemedText style={styles.summaryValue}>
            {selectedItems.length}
          </ThemedText>
        </View>

        <View style={styles.summaryItem}>
          <ThemedText style={styles.summaryLabel}>প্রশ্ন সংখ্যা:</ThemedText>
          <ThemedText style={styles.summaryValue}>
            {config.questionCount}
          </ThemedText>
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <Button
          title='এগিয়ে যাও'
          onPress={handleContinue}
          style={styles.continueButton}
          textStyle={styles.continueButtonText}
        />
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
    fontWeight: 'bold',
    marginBottom: 16,
  },
  subjectContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  subheading: {
    fontSize: 16,
    fontWeight: '600',
    marginRight: 8,
  },
  value: {
    fontSize: 16,
    color: '#6B7280',
  },
  sectionsSection: {
    flex: 1,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  editText: {
    fontSize: 14,
    color: '#6B7280',
    marginLeft: 4,
  },
  selectedItemsContainer: {
    flex: 1,
  },
  selectedItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#F9FAFB',
    borderRadius: 8,
    marginBottom: 8,
  },
  itemDetails: {
    marginLeft: 12,
    flex: 1,
  },
  itemName: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 2,
  },
  itemContext: {
    fontSize: 12,
    color: '#6B7280',
  },
  emptyContainer: {
    padding: 24,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 14,
    color: '#6B7280',
    fontStyle: 'italic',
  },
  summarySection: {
    marginTop: 24,
    padding: 16,
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
  },
  summaryItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  summaryLabel: {
    fontSize: 14,
    fontWeight: '500',
  },
  summaryValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#9333EA',
  },
  buttonContainer: {
    marginTop: 24,
  },
  continueButton: {
    backgroundColor: '#9333EA',
  },
  continueButtonText: {
    color: 'white',
    fontWeight: '600',
  },
});
