import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { FeatureCard } from '@/components/shared/FeatureCard';
import { examConfigAtom, Subject, subjects } from '@/store/exam';
import { useAtom } from 'jotai';
import React from 'react';
import { FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native';

export function Step1SelectSubject() {
  const [config, setConfig] = useAtom(examConfigAtom);

  const handleSubjectSelect = (subject: Subject) => {
    setConfig((prev) => ({
      ...prev,
      subject,
      step: 2,
    }));
  };

  const renderSubject = ({ item }: { item: Subject }) => {
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

  return (
    <ThemedView style={styles.container}>
      <ThemedText style={styles.title}>কোন বিষয়ের পরীক্ষা দিতে চাও?</ThemedText>
      
      <FlatList
        data={subjects}
        renderItem={renderSubject}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.subjectGrid}
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
}); 