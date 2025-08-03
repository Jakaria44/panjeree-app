import Button from '@/components/Button';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useThemeColor } from '@/hooks/useThemeColor';
import { Chapter, Paper, Section, examConfigAtom } from '@/store/exam';
import { AntDesign, Feather, Ionicons } from '@expo/vector-icons';
import { useAtom } from 'jotai';
import React, { useState } from 'react';
import { FlatList, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import { StepIndicator } from './StepIndicator';

export function Step2SelectChapters() {
  const [config, setConfig] = useAtom(examConfigAtom);
  const [selectedSections, setSelectedSections] = useState<Record<string, Record<string, string[]>>>({});
  const [selectedChapters, setSelectedChapters] = useState<Record<string, string[]>>({});
  const [selectedPapers, setSelectedPapers] = useState<string[]>([]);
  const [expandedChapters, setExpandedChapters] = useState<Record<string, boolean>>({});
  const [expandedPapers, setExpandedPapers] = useState<Record<string, boolean>>({});
  const [questionCount, setQuestionCount] = useState<string>(config.questionCount.toString());
  
  // Use global theme colors
  const primaryColor = useThemeColor({}, 'primary');
  const accentColor = '#9333EA'; // Use the design purple color

  const handlePaperToggle = (paperId: string) => {
    setSelectedPapers(prev => {
      const isSelected = prev.includes(paperId);
      if (isSelected) {
        // Remove paper and all its chapters/sections
        const newSelectedPapers = prev.filter(id => id !== paperId);
        setSelectedChapters(prevChapters => {
          const newChapters = { ...prevChapters };
          delete newChapters[paperId];
          return newChapters;
        });
        setSelectedSections(prevSections => {
          const newSections = { ...prevSections };
          delete newSections[paperId];
          return newSections;
        });
        return newSelectedPapers;
      } else {
        // Add paper and all its chapters/sections
        const paper = config.subject?.papers.find(p => p.id === paperId);
        if (paper) {
          const allChapterIds = paper.chapters.map(c => c.id);
          const allSectionIds = paper.chapters.flatMap(c => c.sections.map(s => s.id));
          
          setSelectedChapters(prev => ({
            ...prev,
            [paperId]: allChapterIds
          }));
          
          setSelectedSections(prev => ({
            ...prev,
            [paperId]: paper.chapters.reduce((acc, chapter) => ({
              ...acc,
              [chapter.id]: chapter.sections.map(s => s.id)
            }), {})
          }));
        }
        return [...prev, paperId];
      }
    });
  };

  const handleChapterToggle = (paperId: string, chapterId: string) => {
    setSelectedChapters(prev => {
      const currentChapters = prev[paperId] || [];
      const isSelected = currentChapters.includes(chapterId);
      
      if (isSelected) {
        // Remove chapter and all its sections
        const newChapters = currentChapters.filter(id => id !== chapterId);
        setSelectedSections(prevSections => {
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
        // Add chapter and all its sections
        const chapter = config.subject?.papers
          .find(p => p.id === paperId)
          ?.chapters.find(c => c.id === chapterId);
        
        if (chapter) {
          setSelectedSections(prevSections => ({
            ...prevSections,
            [paperId]: {
              ...prevSections[paperId],
              [chapterId]: chapter.sections.map(s => s.id)
            }
          }));
        }
        
        return {
          ...prev,
          [paperId]: [...currentChapters, chapterId]
        };
      }
    });
  };

  const handleSectionToggle = (paperId: string, chapterId: string, sectionId: string) => {
    setSelectedSections(prev => {
      const newSelectedSections = { ...prev };
      
      if (!newSelectedSections[paperId]) {
        newSelectedSections[paperId] = {};
      }
      
      if (!newSelectedSections[paperId][chapterId]) {
        newSelectedSections[paperId][chapterId] = [];
      }
      
      const currentSections = newSelectedSections[paperId][chapterId];
      const isSelected = currentSections.includes(sectionId);
      
      if (isSelected) {
        newSelectedSections[paperId][chapterId] = currentSections.filter(id => id !== sectionId);
      } else {
        newSelectedSections[paperId][chapterId] = [...currentSections, sectionId];
      }
      
      // Remove empty arrays and objects
      if (newSelectedSections[paperId][chapterId].length === 0) {
        delete newSelectedSections[paperId][chapterId];
      }
      if (Object.keys(newSelectedSections[paperId]).length === 0) {
        delete newSelectedSections[paperId];
      }
      
      return newSelectedSections;
    });
  };

  const handleContinue = () => {
    const numQuestions = parseInt(questionCount) || config.questionCount;
    
    setConfig((prev) => ({
      ...prev,
      selectedSections,
      questionCount: numQuestions,
      step: 3,
    }));
  };

  const handleBack = () => {
    setConfig(prev => ({
      ...prev,
      step: 1
    }));
  };

  const toggleChapter = (chapterId: string) => {
    setExpandedChapters(prev => ({
      ...prev,
      [chapterId]: !prev[chapterId]
    }));
  };

  const togglePaper = (paperId: string) => {
    setExpandedPapers(prev => ({
      ...prev,
      [paperId]: !prev[paperId]
    }));
  };

  const isPaperSelected = (paperId: string) => {
    return selectedPapers.includes(paperId);
  };

  const isChapterSelected = (paperId: string, chapterId: string) => {
    return selectedChapters[paperId]?.includes(chapterId) || false;
  };

  const isSectionSelected = (paperId: string, chapterId: string, sectionId: string) => {
    return selectedSections[paperId]?.[chapterId]?.includes(sectionId) || false;
  };

  const hasSelectedSections = Object.keys(selectedSections).length > 0;

  const renderSection = ({ item, paperId, chapterId }: { item: Section; paperId: string; chapterId: string }) => {
    const isSelected = isSectionSelected(paperId, chapterId, item.id);
    
    return (
      <TouchableOpacity
        style={styles.sectionItem}
        onPress={() => handleSectionToggle(paperId, chapterId, item.id)}
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

  const renderChapter = ({ item, paperId }: { item: Chapter; paperId: string }) => {
    const isExpanded = expandedChapters[item.id] || false;
    const isSelected = isChapterSelected(paperId, item.id);
    
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
              onPress={() => handleChapterToggle(paperId, item.id)}
              style={styles.checkbox}
          >
              {isSelected ? (
                <Ionicons name="checkbox" size={22} color={primaryColor} />
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
                {renderSection({ item: section, paperId, chapterId: item.id })}
              </React.Fragment>
            ))}
          </View>
        )}
      </View>
    );
  };

  const renderPaper = ({ item }: { item: Paper }) => {
    const isExpanded = expandedPapers[item.id] || false;
    const isSelected = isPaperSelected(item.id);
    
    return (
      <View style={styles.paperContainer}>
        <TouchableOpacity 
          style={styles.paperHeader}
          onPress={() => togglePaper(item.id)}
          activeOpacity={0.7}
        >
          <View style={styles.paperTitleContainer}>
            <View style={styles.paperIcon}>
              <Feather name="file-text" size={16} color={primaryColor} />
            </View>
            <ThemedText style={styles.paperTitle}>{item.name}</ThemedText>
          </View>
          
          <View style={styles.paperActions}>
          <TouchableOpacity 
              onPress={() => handlePaperToggle(item.id)}
              style={styles.checkbox}
          >
              {isSelected ? (
                <Ionicons name="checkbox" size={22} color={primaryColor} />
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
          <View style={styles.chaptersList}>
            {item.chapters.map(chapter => (
              <React.Fragment key={chapter.id}>
                {renderChapter({ item: chapter, paperId: item.id })}
              </React.Fragment>
            ))}
          </View>
        )}
      </View>
    );
  };

  return (
    <ThemedView style={styles.container}>
      <StepIndicator onBack={handleBack} />

      <View style={styles.header}>
        <ThemedText style={styles.title}>
          {config.subject?.name} - অধ্যায় নির্বাচন
        </ThemedText>
      </View>
      
      <ThemedText style={styles.subtitle}>
        কোন কোন টপিকের উপর পরীক্ষা দিতে চাও?
      </ThemedText>

      <View style={styles.questionCountContainer}>
        <ThemedText style={styles.questionCountLabel}>প্রশ্নের সংখ্যা:</ThemedText>
        <TextInput
          style={styles.questionCountInput}
          value={questionCount}
          onChangeText={setQuestionCount}
          keyboardType="numeric"
          maxLength={3}
        />
      </View>

      <FlatList
        data={config.subject?.papers || []}
        renderItem={renderPaper}
        keyExtractor={(item) => item.id}
        style={styles.paperList}
        contentContainerStyle={styles.paperListContent}
      />

      <View style={styles.buttonContainer}>
        <Button 
          onPress={handleContinue}
          disabled={!hasSelectedSections}
          style={!hasSelectedSections ? styles.disabledButton : {}}
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
  header: {
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 16,
  },
  questionCountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    gap: 8,
  },
  questionCountLabel: {
    fontSize: 16,
    fontWeight: '500',
  },
  questionCountInput: {
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    width: 80,
    fontSize: 16,
    textAlign: 'center',
  },
  paperList: {
    flex: 1,
  },
  paperListContent: {
    paddingBottom: 16,
  },
  paperContainer: {
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    overflow: 'hidden',
  },
  paperHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#F9FAFB',
  },
  paperTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  paperIcon: {
    padding: 4,
  },
  paperTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#374151',
  },
  paperActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  checkbox: {
    padding: 4,
  },
  expandIcon: {
    padding: 4,
  },
  chapterContainer: {
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  chapterHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    paddingLeft: 16,
    backgroundColor: '#F3F4F6',
  },
  chapterTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  chapterIcon: {
    padding: 4,
  },
  chapterTitle: {
    fontSize: 15,
    fontWeight: '500',
    color: '#4B5563',
  },
  chapterActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  sectionsList: {
    paddingLeft: 24,
  },
  chaptersList: {
    paddingLeft: 16,
  },
  sectionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
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