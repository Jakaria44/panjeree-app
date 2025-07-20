import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { FeatureCard } from '@/components/shared/FeatureCard';
import { subjects } from '@/store/exam';
import { questionBankConfigAtom, questionBankTypes } from '@/store/question-bank';
import { useAtom } from 'jotai';
import React from 'react';
import { FlatList, Image, StyleSheet, TouchableOpacity, View } from 'react-native';

export function Step1SelectSubjectAndType() {
  const [config, setConfig] = useAtom(questionBankConfigAtom);

  const handleSubjectSelect = (subject: { id: string; name: string; icon?: string }) => {
    setConfig((prev) => ({ ...prev, subject, type: null }));
  };

  const handleTypeSelect = (type: 'board' | 'school') => {
    setConfig((prev) => ({ ...prev, type, step: 2 }));
  };

  const renderSubject = ({ item }: { item: { id: string; name: string; icon?: string } }) => {
    const iconSource = item.icon 
      ? { uri: item.icon }
      : require('@/assets/images/icon.png');
    
    return (
      <TouchableOpacity
        style={styles.subjectItem}
        onPress={() => handleSubjectSelect(item)}
        activeOpacity={0.7}
      >
        <FeatureCard
          title={item.name}
          icon={
            <Image
              source={iconSource}
              style={styles.subjectIcon}
            />
          }
          style={config.subject?.id === item.id ? styles.selectedCard : {}}
        />
      </TouchableOpacity>
    );
  };

  const renderType = ({ item }: { item: { id: string; name: string } }) => {
    return (
      <TouchableOpacity
        style={styles.typeItem}
        onPress={() => handleTypeSelect(item.id as 'board' | 'school')}
        activeOpacity={0.7}
      >
        <FeatureCard
          title={item.name}
          icon={
            <Image
              source={require('@/assets/images/icon.png')}
              style={styles.typeIcon}
            />
          }
        />
      </TouchableOpacity>
    );
  };

  return (
    <ThemedView style={styles.container}>
      <View style={styles.section}>
        <ThemedText style={styles.sectionTitle}>কোন বিষয়ের প্রশ্ন ব্যাঙ্ক চাও?</ThemedText>
        <FlatList
          data={subjects}
          renderItem={renderSubject}
          keyExtractor={(item) => item.id}
          numColumns={2}
          contentContainerStyle={styles.subjectGrid}
        />
      </View>

      {config.subject && (
        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>কোন ধরনের প্রশ্ন চাও?</ThemedText>
          <FlatList
            data={questionBankTypes}
            renderItem={renderType}
            keyExtractor={(item) => item.id}
            numColumns={2}
            contentContainerStyle={styles.typeGrid}
          />
        </View>
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  subjectGrid: {
    paddingBottom: 8,
  },
  typeGrid: {
    paddingBottom: 8,
  },
  subjectItem: {
    width: '50%',
    padding: 6,
  },
  typeItem: {
    width: '50%',
    padding: 6,
  },
  subjectIcon: {
    width: 48,
    height: 48,
    resizeMode: 'contain',
  },
  typeIcon: {
    width: 48,
    height: 48,
    resizeMode: 'contain',
  },
  selectedCard: {
    borderColor: '#9333EA',
    backgroundColor: '#FAF5FF',
  },
}); 