import Button from '@/components/Button';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { examConfigAtom } from '@/store/exam';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useAtom } from 'jotai';
import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { StepIndicator } from './StepIndicator';

export function Step3ReviewSelection() {
  const [config, setConfig] = useAtom(examConfigAtom);
  
  // Get selected sections from the config
  const selectedSections = config.selectedSections || {};
  
  // Create a flat list of selected sections with their context
  const selectedItems: Array<{
    id: string;
    name: string;
    paperName: string;
    chapterName: string;
  }> = [];

  Object.entries(selectedSections).forEach(([paperId, chapters]) => {
    const paper = config.subject?.papers.find(p => p.id === paperId);
    if (!paper) return;

    Object.entries(chapters).forEach(([chapterId, sectionIds]) => {
      const chapter = paper.chapters.find(c => c.id === chapterId);
      if (!chapter) return;

      sectionIds.forEach(sectionId => {
        const section = chapter.sections.find(s => s.id === sectionId);
        if (section) {
          selectedItems.push({
            id: sectionId,
            name: section.name,
            paperName: paper.name,
            chapterName: chapter.name,
          });
        }
      });
    });
  });

  const handleContinue = () => {
    setConfig(prev => ({
      ...prev,
      step: 4
    }));
  };

  const handleBack = () => {
    setConfig(prev => ({
      ...prev,
      step: 2
    }));
  };

  const renderSelectedItem = ({ item }: { item: { id: string; name: string; paperName: string; chapterName: string } }) => {
    return (
      <View style={styles.selectedItem}>
        <Ionicons name="checkmark-circle" size={18} color="#10B981" />
        <View style={styles.itemDetails}>
          <ThemedText style={styles.itemName}>{item.name}</ThemedText>
          <ThemedText style={styles.itemContext}>{item.paperName} • {item.chapterName}</ThemedText>
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
          <ThemedText style={styles.subheading}>নির্বাচিত বিভাগসমূহ:</ThemedText>
          <Button 
            variant="ghost" 
            size="sm"
            onPress={handleBack}
          >
            <View style={styles.editButton}>
              <Ionicons name="pencil-outline" size={16} color="#6B7280" />
              <ThemedText style={styles.editText}>সম্পাদনা</ThemedText>
            </View>
          </Button>
        </View>

        <View style={styles.sectionsList}>
          <FlatList
            data={selectedItems}
            renderItem={renderSelectedItem}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
          />
        </View>
      </View>

      <View style={styles.questionCountContainer}>
        <ThemedText style={styles.subheading}>প্রশ্নের সংখ্যা:</ThemedText>
        <ThemedText style={styles.value}>{config.questionCount}</ThemedText>
      </View>

      <View style={styles.buttonContainer}>
        <Button onPress={handleContinue}>
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
    marginBottom: 24,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  subjectContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  sectionsSection: {
    flex: 1,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  subheading: {
    fontSize: 16,
    fontWeight: '600',
  },
  value: {
    fontSize: 16,
  },
  sectionsList: {
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    padding: 12,
  },
  selectedItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
    paddingVertical: 8,
  },
  itemDetails: {
    flex: 1,
  },
  itemName: {
    fontSize: 14,
    fontWeight: '500',
  },
  itemContext: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 2,
  },
  questionCountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 16,
    marginBottom: 16,
  },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  editText: {
    color: '#6B7280',
    fontSize: 14,
  },
  buttonContainer: {
    marginTop: 24,
  },
}); 