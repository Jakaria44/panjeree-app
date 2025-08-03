import Button from '@/components/Button';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useThemeColor } from '@/hooks/useThemeColor';
import { Chapter, Section } from '@/store/exam';
import { practiceConfigAtom } from '@/store/prepare';
import { AntDesign, Feather, Ionicons } from '@expo/vector-icons';
import { useAtom } from 'jotai';
import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, TouchableOpacity, View } from 'react-native';

export function Step2SelectChapters() {
  const [config, setConfig] = useAtom(practiceConfigAtom);
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [expandedChapters, setExpandedChapters] = useState<Record<string, boolean>>({});
  const primaryColor = useThemeColor({}, 'primary');

  useEffect(() => {
    if (config.subject?.id && config.paper?.id) {
      // Find the paper in the subject's papers
      const selectedPaper = config.subject.papers.find(p => p.id === config.paper?.id);
      
      if (selectedPaper && selectedPaper.chapters) {
        setChapters(selectedPaper.chapters);
        
        // Initialize expanded state for all chapters
        const initialExpanded: Record<string, boolean> = {};
        selectedPaper.chapters.forEach((chapter: Chapter) => {
          initialExpanded[chapter.id] = true; // Start with all expanded
        });
        setExpandedChapters(initialExpanded);
      }
    }
  }, [config.subject, config.paper]);

  const toggleChapter = (chapterId: string) => {
    setExpandedChapters(prev => ({
      ...prev,
      [chapterId]: !prev[chapterId]
    }));
  };

  const handleSectionChange = (chapterId: string, sectionId: string, checked: boolean) => {
    setConfig(prev => {
      const newSelected = { ...prev.selectedSections };
      
      if (!newSelected[chapterId]) {
        newSelected[chapterId] = [];
      }
      
      if (checked) {
        newSelected[chapterId] = [...newSelected[chapterId], sectionId];
      } else {
        newSelected[chapterId] = newSelected[chapterId].filter(id => id !== sectionId);
      }
      
      if (newSelected[chapterId].length === 0) {
        delete newSelected[chapterId];
      }
      
      return { ...prev, selectedSections: newSelected };
    });
  };

  const handleChapterSelectAll = (chapter: Chapter, checked: boolean) => {
    setConfig(prev => {
      const newSelected = { ...prev.selectedSections };
      
      if (checked) {
        newSelected[chapter.id] = chapter.sections.map(s => s.id);
      } else {
        delete newSelected[chapter.id];
      }
      
      return { ...prev, selectedSections: newSelected };
    });
  };

  const getChapterCheckedState = (chapter: Chapter) => {
    const selectedCount = config.selectedSections[chapter.id]?.length || 0;
    if (selectedCount === 0) return false;
    if (selectedCount === chapter.sections.length) return true;
    return 'indeterminate';
  };

  const goBack = () => {
    setConfig(prev => ({ ...prev, step: 1, paper: null, selectedSections: {} }));
  };

  const startPractice = () => {
    setConfig(prev => ({ ...prev, step: 3 }));
  };

  // Check if any sections are selected
  const hasSelectedSections = Object.keys(config.selectedSections).length > 0;

  // If no chapters exist, show a notice and a back button
  if (chapters.length === 0) {
    return (
      <ThemedView style={styles.container}>
        <View style={styles.noChaptersNotice}>
          <ThemedText style={styles.noChaptersText}>
            এই পত্রটির জন্য এখনও কোন অধ্যায়/সেকশন যোগ করা হয়নি।
          </ThemedText>
          <Button onPress={goBack}>পূর্বের ধাপে ফিরে যান</Button>
        </View>
      </ThemedView>
    );
  }

  const renderSection = ({ item, chapterId }: { item: Section; chapterId: string }) => {
    const isSelected = config.selectedSections[chapterId]?.includes(item.id) || false;
    
    return (
      <TouchableOpacity
        key={item.id}
        style={styles.sectionItem}
        onPress={() => handleSectionChange(chapterId, item.id, !isSelected)}
        activeOpacity={0.7}
      >
        <ThemedText style={styles.sectionText}>{item.name}</ThemedText>
        <View style={styles.checkbox}>
          {isSelected ? (
            <Ionicons name="checkbox" size={22} color={primaryColor} />
          ) : (
            <Ionicons name="checkbox-outline" size={22} color="#9CA3AF" />
          )}
        </View>
      </TouchableOpacity>
    );
  };

  const renderChapter = ({ item }: { item: Chapter }) => {
    const isSelected = getChapterCheckedState(item);
    const isExpanded = expandedChapters[item.id];
    
    return (
      <View style={styles.chapterContainer}>
        <TouchableOpacity
          style={styles.chapterHeader}
          onPress={() => toggleChapter(item.id)}
          activeOpacity={0.7}
        >
          <View style={styles.chapterTitleContainer}>
            <View style={styles.chapterIcon}>
              <Feather name="book" size={16} color={primaryColor} />
            </View>
            <ThemedText style={styles.chapterTitle}>{item.name}</ThemedText>
          </View>
          
          <View style={styles.chapterActions}>
            <TouchableOpacity 
              onPress={() => handleChapterSelectAll(item, !isSelected)}
              style={styles.checkbox}
            >
              {isSelected === true ? (
                <Ionicons name="checkbox" size={22} color={primaryColor} />
              ) : isSelected === 'indeterminate' ? (
                <Ionicons name="remove-circle" size={22} color={primaryColor} />
              ) : (
                <Ionicons name="checkbox-outline" size={22} color="#9CA3AF" />
              )}
            </TouchableOpacity>
            
            <AntDesign 
              name={isExpanded ? "up" : "down"} 
              size={16} 
              color="#6B7280" 
              style={styles.expandIcon}
            />
          </View>
        </TouchableOpacity>
        
        {isExpanded && (
          <View style={styles.sectionsList}>
            {item.sections.map(section => (
              <React.Fragment key={section.id}>
                {renderSection({ item: section, chapterId: item.id })}
              </React.Fragment>
            ))}
          </View>
        )}
      </View>
    );
  };

  return (
    <ThemedView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={goBack} style={styles.backButton}>
          <AntDesign name="arrowleft" size={20} color="#4B5563" />
        </TouchableOpacity>
        
        <ThemedText style={styles.title}>
          {config.subject?.name} ({config.paper?.name})
        </ThemedText>
      </View>
      
      <ThemedText style={styles.subtitle}>
        কোন কোন টপিকের উপর প্রস্তুতি নিতে চাও?
      </ThemedText>

      <FlatList
        data={chapters}
        renderItem={renderChapter}
        keyExtractor={(item) => item.id}
        style={styles.chaptersList}
        contentContainerStyle={styles.chaptersListContent}
      />

      <View style={styles.buttonContainer}>
        <Button 
          onPress={startPractice}
          disabled={!hasSelectedSections}
          style={!hasSelectedSections ? styles.disabledButton : {}}
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  backButton: {
    padding: 8,
    marginRight: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    flex: 1,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 16,
  },
  noChaptersNotice: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    backgroundColor: '#F9FAFB',
    borderRadius: 8,
    marginVertical: 16,
  },
  noChaptersText: {
    textAlign: 'center',
    marginBottom: 16,
    color: '#6B7280',
  },
  chaptersList: {
    flex: 1,
  },
  chaptersListContent: {
    paddingBottom: 16,
  },
  chapterContainer: {
    marginBottom: 8,
    backgroundColor: '#F9FAFB',
    borderRadius: 8,
    overflow: 'hidden',
  },
  chapterHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  chapterTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  chapterIcon: {
    width: 28,
    height: 28,
    borderRadius: 6,
    backgroundColor: '#EDE9FE',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  chapterTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  chapterActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    padding: 4,
  },
  expandIcon: {
    marginLeft: 8,
  },
  sectionsList: {
    paddingLeft: 16,
  },
  sectionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  sectionText: {
    fontSize: 14,
    flex: 1,
  },
  buttonContainer: {
    marginTop: 16,
  },
  disabledButton: {
    opacity: 0.5,
  },
}); 