import Button from '@/components/Button';
import { FeatureCard } from '@/components/shared/FeatureCard';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { subjects } from '@/store/exam';
import { papers, practiceConfigAtom } from '@/store/prepare';
import { useAtom } from 'jotai';
import React from 'react';
import { FlatList, Image, StyleSheet, TouchableOpacity, View } from 'react-native';

export function Step1SelectSubjectAndPaper() {
  const [config, setConfig] = useAtom(practiceConfigAtom);

  const handleSubjectSelect = (subject: { id: string; name: string; icon?: string }) => {
    setConfig((prev) => ({ ...prev, subject, paper: null }));
  };

  const handlePaperSelect = (paper: { id: string; name: string }) => {
    setConfig((prev) => ({ ...prev, paper }));
  };

  const handleContinue = () => {
    setConfig((prev) => ({ ...prev, step: 2 }));
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

  const renderPaper = ({ item }: { item: { id: string; name: string } }) => {
    return (
      <TouchableOpacity
        style={styles.paperItem}
        onPress={() => handlePaperSelect(item)}
        activeOpacity={0.7}
      >
        <FeatureCard
          title={item.name}
          icon={
            <Image
              source={require('@/assets/images/icon.png')}
              style={styles.paperIcon}
            />
          }
          style={config.paper?.id === item.id ? styles.selectedCard : {}}
        />
      </TouchableOpacity>
    );
  };

  const canContinue = config.subject && config.paper;
  const subjectPapers = config.subject?.id ? papers[config.subject.id] || [] : [];

  return (
    <ThemedView style={styles.container}>
      <View style={styles.section}>
        <ThemedText style={styles.sectionTitle}>কোন বিষয়ের অনুশীলন করবে?</ThemedText>
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
          <ThemedText style={styles.sectionTitle}>কোন পেপার অনুশীলন করবে?</ThemedText>
          <FlatList
            data={subjectPapers}
            renderItem={renderPaper}
            keyExtractor={(item) => item.id}
            numColumns={2}
            contentContainerStyle={styles.paperGrid}
          />
        </View>
      )}

      <View style={styles.buttonContainer}>
        <Button
          onPress={handleContinue}
          disabled={!canContinue}
          style={!canContinue ? { opacity: 0.5 } : {}}
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
  paperGrid: {
    paddingBottom: 8,
  },
  subjectItem: {
    width: '50%',
    padding: 6,
  },
  paperItem: {
    width: '50%',
    padding: 6,
  },
  subjectIcon: {
    width: 48,
    height: 48,
    resizeMode: 'contain',
  },
  paperIcon: {
    width: 48,
    height: 48,
    resizeMode: 'contain',
  },
  selectedCard: {
    borderColor: '#9333EA',
    backgroundColor: '#FAF5FF',
  },
  buttonContainer: {
    marginTop: 8,
  },
}); 