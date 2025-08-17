import Button from '@/components/Button';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useThemeColor } from '@/hooks/useThemeColor';
import { Chapter, Topic } from '@/store/commons';
import { practiceConfigAtom } from '@/store/prepare';
import { AntDesign, Feather, Ionicons } from '@expo/vector-icons';
import { useAtom } from 'jotai';
import { useEffect, useState } from 'react';
import { FlatList, StyleSheet, TouchableOpacity, View } from 'react-native';

export function Step2SelectChapters() {
  const [config, setConfig] = useAtom(practiceConfigAtom);
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [expandedChapters, setExpandedChapters] = useState<
    Record<string, boolean>
  >({});
  const primaryColor = useThemeColor({}, 'primary');

  useEffect(() => {
    if (config.subject && config.paper?.id) {
      // Find the paper in the subject's papers
      const selectedPaper = config.subject.papers.find(
        (p) => p.id === config.paper?.id
      );

      if (selectedPaper && selectedPaper.chapters) {
        setChapters(selectedPaper.chapters);

        // Initialize expanded state for all chapters
        const initialExpanded: Record<string, boolean> = {};
        selectedPaper.chapters.forEach((chapter: Chapter) => {
          initialExpanded[chapter.id.toString()] = true; // Start with all expanded
        });
        setExpandedChapters(initialExpanded);
      }
    }
  }, [config.subject, config.paper]);

  const toggleChapter = (chapterId: string) => {
    setExpandedChapters((prev) => ({
      ...prev,
      [chapterId]: !prev[chapterId],
    }));
  };

  const handleSectionChange = (
    chapterId: string,
    topicId: string,
    checked: boolean
  ) => {
    setConfig((prev) => {
      const newSelected = { ...prev.selectedSections };

      if (!newSelected[chapterId]) {
        newSelected[chapterId] = [];
      }

      if (checked) {
        newSelected[chapterId] = [...newSelected[chapterId], parseInt(topicId)];
      } else {
        newSelected[chapterId] = newSelected[chapterId].filter(
          (id) => id !== parseInt(topicId)
        );
      }

      if (newSelected[chapterId].length === 0) {
        delete newSelected[chapterId];
      }

      return { ...prev, selectedSections: newSelected };
    });
  };

  const handleChapterSelectAll = (chapter: Chapter, checked: boolean) => {
    setConfig((prev) => {
      const newSelected = { ...prev.selectedSections };

      if (checked) {
        newSelected[chapter.id.toString()] = chapter.topics.map((t) => t.id);
      } else {
        delete newSelected[chapter.id.toString()];
      }

      return { ...prev, selectedSections: newSelected };
    });
  };

  const getChapterCheckedState = (chapter: Chapter) => {
    const selectedCount =
      config.selectedSections[chapter.id.toString()]?.length || 0;
    if (selectedCount === 0) return false;
    if (selectedCount === chapter.topics.length) return true;
    return "indeterminate";
  };

  const goBack = () => {
    setConfig((prev) => ({
      ...prev,
      step: 1,
      paper: null,
      selectedSections: {},
    }));
  };

  const startPractice = () => {
    setConfig((prev) => ({ ...prev, step: 3 }));
  };

  // Check if any sections are selected
  const hasSelectedSections = Object.keys(config.selectedSections).length > 0;

  // If no chapters exist, show a notice and a back button
  if (chapters.length === 0) {
    return (
      <ThemedView style={styles.container}>
        <View style={styles.emptyContainer}>
          <ThemedText style={styles.emptyText}>
            এই পত্রটির জন্য এখনও কোন অধ্যায়/টপিক যোগ করা হয়নি।
          </ThemedText>
          <Button onPress={goBack} style={styles.backButton}>
            পূর্বের ধাপে ফিরে যান
          </Button>
        </View>
      </ThemedView>
    );
  }

  const renderSection = ({
    item,
    chapterId,
  }: {
    item: Topic;
    chapterId: string;
  }) => {
    const isSelected =
      config.selectedSections[chapterId]?.includes(item.id) || false;

    return (
      <TouchableOpacity
        style={[styles.sectionItem, isSelected && styles.selectedSection]}
        onPress={() =>
          handleSectionChange(chapterId, item.id.toString(), !isSelected)
        }
        activeOpacity={0.7}
      >
        <View style={styles.sectionContent}>
          <ThemedText
            style={[
              styles.sectionText,
              isSelected && styles.selectedSectionText,
            ]}
          >
            {item.name}
          </ThemedText>
          <View
            style={[styles.checkbox, isSelected && styles.selectedCheckbox]}
          >
            {isSelected && <AntDesign name="check" size={12} color="white" />}
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const renderChapter = ({ item }: { item: Chapter }) => {
    const isExpanded = expandedChapters[item.id.toString()] || false;
    const checkedState = getChapterCheckedState(item);

    return (
      <View style={styles.chapterContainer}>
        <TouchableOpacity
          style={styles.chapterHeader}
          onPress={() => toggleChapter(item.id.toString())}
          activeOpacity={0.7}
        >
          <View style={styles.chapterContent}>
            <View style={styles.chapterInfo}>
              <Feather name="book" size={16} color={primaryColor} />
              <ThemedText style={styles.chapterText}>{item.name}</ThemedText>
            </View>
            <View style={styles.chapterActions}>
              <TouchableOpacity
                onPress={() =>
                  handleChapterSelectAll(item, checkedState !== true)
                }
                style={styles.selectAllButton}
              >
                <View
                  style={[
                    styles.checkbox,
                    checkedState && styles.selectedCheckbox,
                  ]}
                >
                  {checkedState && (
                    <AntDesign name="check" size={12} color="white" />
                  )}
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => toggleChapter(item.id.toString())}
              >
                <Ionicons
                  name={isExpanded ? "chevron-up" : "chevron-down"}
                  size={16}
                  color={primaryColor}
                />
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>

        {isExpanded && (
          <View style={styles.sectionsContainer}>
            <FlatList
              data={item.topics}
              renderItem={({ item: topic }) =>
                renderSection({ item: topic, chapterId: item.id.toString() })
              }
              keyExtractor={(topic) => topic.id.toString()}
              scrollEnabled={false}
            />
          </View>
        )}
      </View>
    );
  };

  return (
    <ThemedView style={styles.container}>
      <View style={styles.header}>
        <ThemedText style={styles.title}>
          {config.subject?.name} ({config.paper?.name})
        </ThemedText>
        <ThemedText style={styles.subtitle}>
          কোন কোন টপিকের উপর প্রস্তুতি নিতে চাও?
        </ThemedText>
      </View>

      <FlatList
        data={chapters}
        renderItem={renderChapter}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.chaptersList}
      />

      <View style={styles.buttonContainer}>
        <Button
          onPress={startPractice}
          disabled={!hasSelectedSections}
          style={
            !hasSelectedSections ? styles.disabledButton : styles.primaryButton
          }
        >
          শুরু কর
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
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  emptyText: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 24,
    color: '#6B7280',
  },
  backButton: {
    backgroundColor: '#9333EA',
  },
  header: {
    marginBottom: 24,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#6B7280',
  },
  chaptersList: {
    flexGrow: 1,
  },
  chapterContainer: {
    marginBottom: 16,
    backgroundColor: 'white',
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  chapterHeader: {
    padding: 16,
    backgroundColor: 'white',
  },
  chapterContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  chapterInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  chapterText: {
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  chapterActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  selectAllButton: {
    marginRight: 12,
  },
  sectionsContainer: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  sectionItem: {
    padding: 12,
    marginBottom: 4,
    borderRadius: 8,
  },
  selectedSection: {
    backgroundColor: '#F3E8FF',
  },
  sectionContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sectionText: {
    fontSize: 14,
    flex: 1,
  },
  selectedSectionText: {
    color: '#9333EA',
    fontWeight: '500',
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#D1D5DB',
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedCheckbox: {
    backgroundColor: '#9333EA',
    borderColor: '#9333EA',
  },
  buttonContainer: {
    marginTop: 24,
  },
  primaryButton: {
    backgroundColor: '#9333EA',
  },
  disabledButton: {
    backgroundColor: '#D1D5DB',
  },
});
