import Button from '@/components/Button';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useThemeColor } from '@/hooks/useThemeColor';
import { Chapter, Paper, Topic } from '@/store/commons';
import { examConfigAtom } from '@/store/exam';
import { AntDesign, Feather, Ionicons } from '@expo/vector-icons';
import { useAtom } from 'jotai';
import { useState } from 'react';
import {
  FlatList,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { StepIndicator } from './StepIndicator';

export function Step2SelectChapters() {
  const [config, setConfig] = useAtom(examConfigAtom);
  const [selectedSections, setSelectedSections] = useState<
    Record<string, Record<string, number[]>>
  >({});
  const [selectedChapters, setSelectedChapters] = useState<
    Record<string, number[]>
  >({});
  const [selectedPapers, setSelectedPapers] = useState<string[]>([]);
  const [expandedChapters, setExpandedChapters] = useState<
    Record<string, boolean>
  >({});
  const [expandedPapers, setExpandedPapers] = useState<Record<string, boolean>>(
    {}
  );
  const [questionCount, setQuestionCount] = useState<string>(
    config.questionCount.toString()
  );

  // Use global theme colors
  const primaryColor = useThemeColor({}, 'primary');
  const accentColor = '#9333EA'; // Use the design purple color

  const handlePaperToggle = (paperId: string) => {
    setSelectedPapers((prev) => {
      const isSelected = prev.includes(paperId);
      if (isSelected) {
        // Remove paper and all its chapters/topics
        const newSelectedPapers = prev.filter((id) => id !== paperId);
        setSelectedChapters((prevChapters) => {
          const newChapters = { ...prevChapters };
          delete newChapters[paperId];
          return newChapters;
        });
        setSelectedSections((prevSections) => {
          const newSections = { ...prevSections };
          delete newSections[paperId];
          return newSections;
        });
        return newSelectedPapers;
      } else {
        // Add paper and all its chapters/topics
        const paper = config.subject?.papers.find(
          (p) => p.id.toString() === paperId
        );
        if (paper) {
          const allChapterIds = paper.chapters.map((c) => c.id);
          const allTopicIds = paper.chapters.flatMap((c) =>
            c.topics.map((t) => t.id)
          );

          setSelectedChapters((prev) => ({
            ...prev,
            [paperId]: allChapterIds,
          }));

          setSelectedSections((prev) => ({
            ...prev,
            [paperId]: paper.chapters.reduce(
              (acc, chapter) => ({
                ...acc,
                [chapter.id.toString()]: chapter.topics.map((t) => t.id),
              }),
              {}
            ),
          }));
        }
        return [...prev, paperId];
      }
    });
  };

  const handleChapterToggle = (paperId: string, chapterId: string) => {
    setSelectedChapters((prev) => {
      const currentChapters = prev[paperId] || [];
      const isSelected = currentChapters.includes(parseInt(chapterId));

      if (isSelected) {
        // Remove chapter and all its topics
        const newChapters = currentChapters.filter(
          (id) => id !== parseInt(chapterId)
        );
        setSelectedSections((prevSections) => {
          const newSections = { ...prevSections };
          if (newSections[paperId]) {
            delete newSections[paperId][chapterId];
            if (Object.keys(newSections[paperId]).length === 0) {
              delete newSections[paperId];
            }
          }
          return newSections;
        });

        const updatedChapters = { ...prev };
        if (newChapters.length > 0) {
          updatedChapters[paperId] = newChapters;
        } else {
          delete updatedChapters[paperId];
        }
        return updatedChapters;
      } else {
        // Add chapter and all its topics
        const chapter = config.subject?.papers
          .find((p) => p.id.toString() === paperId)
          ?.chapters.find((c) => c.id.toString() === chapterId);

        if (chapter) {
          setSelectedSections((prevSections) => ({
            ...prevSections,
            [paperId]: {
              ...prevSections[paperId],
              [chapterId]: chapter.topics.map((t) => t.id),
            },
          }));

          return {
            ...prev,
            [paperId]: [...(prev[paperId] || []), chapter.id],
          };
        }
        return prev;
      }
    });
  };

  const handleSectionToggle = (
    paperId: string,
    chapterId: string,
    topicId: string
  ) => {
    setSelectedSections((prev) => {
      const currentTopics = prev[paperId]?.[chapterId] || [];
      const isSelected = currentTopics.includes(parseInt(topicId));

      if (isSelected) {
        // Remove topic
        const newTopics = currentTopics.filter(
          (id) => id !== parseInt(topicId)
        );
        const updatedSections = { ...prev };

        if (newTopics.length > 0) {
          updatedSections[paperId] = {
            ...updatedSections[paperId],
            [chapterId]: newTopics,
          };
        } else {
          // Remove chapter if no topics selected
          if (updatedSections[paperId]) {
            delete updatedSections[paperId][chapterId];
            if (Object.keys(updatedSections[paperId]).length === 0) {
              delete updatedSections[paperId];
            }
          }
        }

        // Update chapters selection
        setSelectedChapters((prevChapters) => {
          const currentChapters = prevChapters[paperId] || [];
          const chapter = config.subject?.papers
            .find((p) => p.id.toString() === paperId)
            ?.chapters.find((c) => c.id.toString() === chapterId);

          if (chapter && newTopics.length === 0) {
            const newChapters = currentChapters.filter(
              (id) => id !== chapter.id
            );
            const updatedChapters = { ...prevChapters };
            if (newChapters.length > 0) {
              updatedChapters[paperId] = newChapters;
            } else {
              delete updatedChapters[paperId];
            }
            return updatedChapters;
          }
          return prevChapters;
        });

        return updatedSections;
      } else {
        // Add topic
        const updatedSections = { ...prev };
        updatedSections[paperId] = {
          ...updatedSections[paperId],
          [chapterId]: [...currentTopics, parseInt(topicId)],
        };

        // Update chapters selection
        setSelectedChapters((prevChapters) => {
          const currentChapters = prevChapters[paperId] || [];
          const chapter = config.subject?.papers
            .find((p) => p.id.toString() === paperId)
            ?.chapters.find((c) => c.id.toString() === chapterId);

          if (chapter && !currentChapters.includes(chapter.id)) {
            return {
              ...prevChapters,
              [paperId]: [...currentChapters, chapter.id],
            };
          }
          return prevChapters;
        });

        return updatedSections;
      }
    });
  };

  const handleContinue = () => {
    setConfig((prev) => ({
      ...prev,
      selectedSections,
      questionCount: parseInt(questionCount) || 10,
      step: 3,
    }));
  };

  const handleBack = () => {
    setConfig((prev) => ({
      ...prev,
      step: 1,
      subject: null,
      selectedSections: {},
    }));
  };

  const toggleChapter = (chapterId: string) => {
    setExpandedChapters((prev) => ({
      ...prev,
      [chapterId]: !prev[chapterId],
    }));
  };

  const togglePaper = (paperId: string) => {
    setExpandedPapers((prev) => ({
      ...prev,
      [paperId]: !prev[paperId],
    }));
  };

  const isPaperSelected = (paperId: string) => {
    return selectedPapers.includes(paperId);
  };

  const isChapterSelected = (paperId: string, chapterId: string) => {
    return selectedChapters[paperId]?.includes(parseInt(chapterId)) || false;
  };

  const isSectionSelected = (
    paperId: string,
    chapterId: string,
    topicId: string
  ) => {
    return (
      selectedSections[paperId]?.[chapterId]?.includes(parseInt(topicId)) ||
      false
    );
  };

  const renderSection = ({
    item,
    paperId,
    chapterId,
  }: {
    item: Topic;
    paperId: string;
    chapterId: string;
  }) => {
    const isSelected = isSectionSelected(
      paperId,
      chapterId,
      item.id.toString()
    );

    return (
      <TouchableOpacity
        style={[styles.sectionItem, isSelected && styles.selectedSection]}
        onPress={() =>
          handleSectionToggle(paperId, chapterId, item.id.toString())
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
            {isSelected && <AntDesign name='check' size={12} color='white' />}
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const renderChapter = ({
    item,
    paperId,
  }: {
    item: Chapter;
    paperId: string;
  }) => {
    const isSelected = isChapterSelected(paperId, item.id.toString());
    const isExpanded = expandedChapters[item.id.toString()];

    return (
      <View style={styles.chapterContainer}>
        <TouchableOpacity
          style={[styles.chapterHeader, isSelected && styles.selectedChapter]}
          onPress={() => handleChapterToggle(paperId, item.id.toString())}
          activeOpacity={0.7}
        >
          <View style={styles.chapterContent}>
            <ThemedText
              style={[
                styles.chapterText,
                isSelected && styles.selectedChapterText,
              ]}
            >
              {item.name}
            </ThemedText>
            <View style={styles.chapterActions}>
              <View
                style={[styles.checkbox, isSelected && styles.selectedCheckbox]}
              >
                {isSelected && (
                  <AntDesign name='check' size={12} color='white' />
                )}
              </View>
              <TouchableOpacity
                onPress={() => toggleChapter(item.id.toString())}
                style={styles.expandButton}
              >
                <Ionicons
                  name={isExpanded ? 'chevron-up' : 'chevron-down'}
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
                renderSection({
                  item: topic,
                  paperId,
                  chapterId: item.id.toString(),
                })
              }
              keyExtractor={(topic) => topic.id.toString()}
              scrollEnabled={false}
            />
          </View>
        )}
      </View>
    );
  };

  const renderPaper = ({ item }: { item: Paper }) => {
    const paperId = item.id.toString();
    const isSelected = isPaperSelected(paperId);
    const isExpanded = expandedPapers[paperId];

    return (
      <View style={styles.paperContainer}>
        <TouchableOpacity
          style={[styles.paperHeader, isSelected && styles.selectedPaper]}
          onPress={() => handlePaperToggle(paperId)}
          activeOpacity={0.7}
        >
          <View style={styles.paperContent}>
            <View style={styles.paperInfo}>
              <Feather name='book' size={20} color={accentColor} />
              <ThemedText
                style={[
                  styles.paperText,
                  isSelected && styles.selectedPaperText,
                ]}
              >
                {item.name}
              </ThemedText>
            </View>
            <View style={styles.paperActions}>
              <View
                style={[styles.checkbox, isSelected && styles.selectedCheckbox]}
              >
                {isSelected && (
                  <AntDesign name='check' size={12} color='white' />
                )}
              </View>
              <TouchableOpacity
                onPress={() => togglePaper(paperId)}
                style={styles.expandButton}
              >
                <Ionicons
                  name={isExpanded ? 'chevron-up' : 'chevron-down'}
                  size={16}
                  color={primaryColor}
                />
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>

        {isExpanded && (
          <View style={styles.chaptersContainer}>
            <FlatList
              data={item.chapters}
              renderItem={({ item: chapter }) =>
                renderChapter({ item: chapter, paperId })
              }
              keyExtractor={(chapter) => chapter.id.toString()}
              scrollEnabled={false}
            />
          </View>
        )}
      </View>
    );
  };

  if (!config.subject) return null;

  return (
    <ThemedView style={styles.container}>
      <StepIndicator onBack={handleBack} />

      <ThemedText style={styles.title}>
        কোন কোন টপিকের উপর পরীক্ষা দিতে চাও?
      </ThemedText>

      <FlatList
        data={config.subject.papers}
        renderItem={renderPaper}
        keyExtractor={(paper) => paper.id.toString()}
        contentContainerStyle={styles.papersList}
      />

      <View style={styles.bottomSection}>
        <View style={styles.questionCountContainer}>
          <ThemedText style={styles.questionCountLabel}>
            প্রশ্ন সংখ্যা
          </ThemedText>
          <TextInput
            style={styles.questionCountInput}
            value={questionCount}
            onChangeText={setQuestionCount}
            keyboardType='numeric'
            placeholder='10'
          />
        </View>

        <View style={styles.buttonContainer}>
          <Button
            title='আরেকটি বিষয়'
            onPress={() => setConfig((prev) => ({ ...prev, step: 1 }))}
            style={styles.secondaryButton}
            textStyle={styles.secondaryButtonText}
          />
          <Button
            title='শুরু কর'
            onPress={handleContinue}
            style={styles.primaryButton}
            textStyle={styles.primaryButtonText}
          />
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
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  papersList: {
    flexGrow: 1,
  },
  paperContainer: {
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
  paperHeader: {
    padding: 16,
    backgroundColor: 'white',
  },
  selectedPaper: {
    backgroundColor: '#FAF5FF',
    borderColor: '#9333EA',
    borderWidth: 1,
  },
  paperContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  paperInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  paperText: {
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  selectedPaperText: {
    color: '#9333EA',
  },
  paperActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  chaptersContainer: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  chapterContainer: {
    marginBottom: 8,
  },
  chapterHeader: {
    padding: 12,
    backgroundColor: '#F8F9FA',
    borderRadius: 8,
  },
  selectedChapter: {
    backgroundColor: '#F3E8FF',
    borderColor: '#9333EA',
    borderWidth: 1,
  },
  chapterContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  chapterText: {
    fontSize: 14,
    fontWeight: '500',
    flex: 1,
  },
  selectedChapterText: {
    color: '#9333EA',
  },
  chapterActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sectionsContainer: {
    paddingLeft: 16,
    paddingTop: 8,
  },
  sectionItem: {
    padding: 8,
    marginBottom: 4,
    borderRadius: 6,
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
    fontSize: 13,
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
    marginLeft: 8,
  },
  selectedCheckbox: {
    backgroundColor: '#9333EA',
    borderColor: '#9333EA',
  },
  expandButton: {
    padding: 4,
    marginLeft: 8,
  },
  bottomSection: {
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  questionCountContainer: {
    marginBottom: 16,
  },
  questionCountLabel: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 8,
  },
  questionCountInput: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  secondaryButton: {
    flex: 1,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#D1D5DB',
  },
  secondaryButtonText: {
    color: '#374151',
  },
  primaryButton: {
    flex: 1,
    backgroundColor: '#9333EA',
  },
  primaryButtonText: {
    color: 'white',
  },
});
