import Button from '@/components/Button';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { examConfigAtom } from '@/store/exam';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useAtom } from 'jotai';
import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';

export function Step3ReviewSelection() {
  const [config, setConfig] = useAtom(examConfigAtom);
  
  const selectedChapters = config.chapters?.filter(chapter => 
    config.selectedChapters?.includes(chapter.id)
  );

  const handleContinue = () => {
    setConfig(prev => ({
      ...prev,
      step: 4
    }));
  };

  const handleEdit = () => {
    setConfig(prev => ({
      ...prev,
      step: 2
    }));
  };

  const renderChapterItem = ({ item }: { item: { id: string; name: string } }) => {
    return (
      <View style={styles.chapterItem}>
        <Ionicons name="checkmark-circle" size={18} color="#10B981" />
        <ThemedText style={styles.chapterName}>{item.name}</ThemedText>
      </View>
    );
  };

  return (
    <ThemedView style={styles.container}>
      <View style={styles.header}>
        <ThemedText style={styles.title}>আপনার নির্বাচিত বিষয়সমূহ</ThemedText>
        
        <View style={styles.subjectContainer}>
          <ThemedText style={styles.subheading}>বিষয়:</ThemedText>
          <ThemedText style={styles.value}>{config.subject?.name}</ThemedText>
        </View>
      </View>

      <View style={styles.chaptersSection}>
        <View style={styles.chapterHeader}>
          <ThemedText style={styles.subheading}>নির্বাচিত অধ্যায়সমূহ:</ThemedText>
          <Button 
            variant="ghost" 
            size="sm"
            onPress={handleEdit}
          >
            <View style={styles.editButton}>
              <Ionicons name="pencil-outline" size={16} color="#6B7280" />
              <ThemedText style={styles.editText}>সম্পাদনা</ThemedText>
            </View>
          </Button>
        </View>

        <View style={styles.chaptersList}>
          <FlatList
            data={selectedChapters}
            renderItem={renderChapterItem}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
          />
        </View>
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
  chaptersSection: {
    flex: 1,
  },
  chapterHeader: {
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
  chaptersList: {
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    padding: 12,
  },
  chapterItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 8,
  },
  chapterName: {
    fontSize: 14,
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