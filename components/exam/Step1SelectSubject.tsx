import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { FeatureCard } from '@/components/shared/FeatureCard';
import { examConfigAtom, Subject, subjects } from '@/store/exam';
import { useAtom } from 'jotai';
import React from 'react';
import { FlatList, Image, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StepIndicator } from './StepIndicator';

export function Step1SelectSubject() {
  const [config, setConfig] = useAtom(examConfigAtom);
  const insets = useSafeAreaInsets();

  const handleSubjectSelect = (subject: Subject) => {
    setConfig((prev) => ({
      ...prev,
      subject,
      step: 2,
    }));
  };

  // Since this is the first step, going back would just do nothing
  const handleBack = () => {
    // No-op for first step
  };

  const renderSubject = ({ item }: { item: Subject }) => {
    // Use default icon for all subjects since placeholder URLs don't work in React Native
    const iconSource = require('@/assets/images/icon.png');
    
    return (
      <View style={styles.subjectItem}>
        <FeatureCard
          title={item.name}
          icon={
            <Image
              source={iconSource}
              style={styles.subjectIcon}
            />
          }
          style={config.subject?.id === item.id ? styles.selectedCard : {}}
          onPress={() => handleSubjectSelect(item)}
          activeOpacity={0.7}
        />
      </View>
    );
  };

  return (
    <ThemedView style={[styles.container, { paddingTop: insets.top > 0 ? 16 : 32 }]}>
      <StepIndicator onBack={handleBack} />
      
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