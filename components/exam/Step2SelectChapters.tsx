import Button from '@/components/Button';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useThemeColor } from '@/hooks/useThemeColor';
import { Chapter, chaptersData, examConfigAtom } from '@/store/exam';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useAtom } from 'jotai';
import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, TouchableOpacity, View } from 'react-native';

export function Step2SelectChapters() {
  const [config, setConfig] = useAtom(examConfigAtom);
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const primaryColor = useThemeColor({}, 'primary');

  useEffect(() => {
    if (config.subject?.id && chaptersData[config.subject.id]) {
      const subjectChapters = chaptersData[config.subject.id].map((chapter) => ({
        ...chapter,
        selected: config.selectedChapters?.includes(chapter.id) || false,
      }));
      setChapters(subjectChapters);
    }
  }, [config.subject]);

  const handleChapterToggle = (id: string) => {
    setChapters((prevChapters) =>
      prevChapters.map((chapter) =>
        chapter.id === id ? { ...chapter, selected: !chapter.selected } : chapter
      )
    );
  };

  const handleContinue = () => {
    const selectedChapters = chapters.filter((chapter) => chapter.selected).map((chapter) => chapter.id);
    
    setConfig((prev) => ({
      ...prev,
      chapters,
      selectedChapters,
      step: 3,
    }));
  };

  const selectAll = () => {
    setChapters((prevChapters) =>
      prevChapters.map((chapter) => ({ ...chapter, selected: true }))
    );
  };

  const unselectAll = () => {
    setChapters((prevChapters) =>
      prevChapters.map((chapter) => ({ ...chapter, selected: false }))
    );
  };

  const renderChapter = ({ item }: { item: Chapter }) => {
    return (
      <TouchableOpacity
        style={[
          styles.chapterItem,
          item.selected && styles.chapterSelected,
        ]}
        onPress={() => handleChapterToggle(item.id)}
        activeOpacity={0.7}
      >
        <ThemedText style={styles.chapterText}>{item.name}</ThemedText>
        {item.selected && (
          <View style={styles.checkIconContainer}>
            <Ionicons name="checkmark-circle" size={20} color={primaryColor} />
          </View>
        )}
      </TouchableOpacity>
    );
  };

  const hasSelectedChapters = chapters.some((chapter) => chapter.selected);

  return (
    <ThemedView style={styles.container}>
      <View style={styles.header}>
        <ThemedText style={styles.title}>কোন অধ্যায়গুলো থেকে প্রশ্ন চাও?</ThemedText>
        
        <View style={styles.actionsContainer}>
          <TouchableOpacity onPress={selectAll}>
            <ThemedText style={styles.actionText}>সব নির্বাচন করুন</ThemedText>
          </TouchableOpacity>
          <TouchableOpacity onPress={unselectAll}>
            <ThemedText style={styles.actionText}>সব বাতিল করুন</ThemedText>
          </TouchableOpacity>
        </View>
      </View>

      <FlatList
        data={chapters}
        renderItem={renderChapter}
        keyExtractor={(item) => item.id}
        style={styles.chapterList}
        contentContainerStyle={styles.chapterListContent}
      />

      <View style={styles.buttonContainer}>
        <Button 
          onPress={handleContinue}
          disabled={!hasSelectedChapters}
          style={!hasSelectedChapters ? styles.disabledButton : {}}
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
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionText: {
    color: '#6B7280',
    fontSize: 14,
  },
  chapterList: {
    flex: 1,
  },
  chapterListContent: {
    paddingBottom: 16,
  },
  chapterItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  chapterSelected: {
    backgroundColor: '#F3F4F6',
  },
  chapterText: {
    fontSize: 16,
  },
  checkIconContainer: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    marginTop: 16,
  },
  disabledButton: {
    opacity: 0.5,
  },
}); 