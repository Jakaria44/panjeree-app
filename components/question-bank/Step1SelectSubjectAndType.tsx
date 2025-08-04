import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { FeatureCard } from '@/components/shared/FeatureCard';
import { useSubjects } from '@/hooks/useSubjects';
import { Subject } from '@/store/commons';
import {
  questionBankConfigAtom,
  questionBankTypes,
} from '@/store/question-bank';
import { useAtom } from 'jotai';
import { FlatList, Image, ScrollView, StyleSheet, View } from 'react-native';

export function Step1SelectSubjectAndType() {
  const [config, setConfig] = useAtom(questionBankConfigAtom);
  const { subjects } = useSubjects();

  const handleSubjectSelect = (subject: Subject) => {
    setConfig((prev) => ({ ...prev, subject, type: null }));
  };

  const handleTypeSelect = (type: 'board' | 'school') => {
    setConfig((prev) => ({ ...prev, type, step: 2 }));
  };

  const renderSubject = ({ item }: { item: Subject }) => {
    // Handle ReactNode icon or string icon
    const iconSource =
      typeof item.icon === 'string' && item.icon
        ? { uri: item.icon }
        : require('@/assets/images/icon.png');

    return (
      <View style={styles.subjectItem}>
        <FeatureCard
          title={item.name}
          icon={<Image source={iconSource} style={styles.subjectIcon} />}
          style={config.subject?.id === item.id ? styles.selectedCard : {}}
          onPress={() => handleSubjectSelect(item)}
          activeOpacity={0.7}
        />
      </View>
    );
  };

  const renderType = ({ item }: { item: { id: string; name: string } }) => {
    return (
      <View style={styles.typeItem}>
        <FeatureCard
          title={item.name}
          icon={
            <Image
              source={require('@/assets/images/icon.png')}
              style={styles.typeIcon}
            />
          }
          onPress={() => handleTypeSelect(item.id as 'board' | 'school')}
          activeOpacity={0.7}
        />
      </View>
    );
  };

  return (
    <ThemedView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>
            কোন বিষয়ের প্রশ্ন ব্যাঙ্ক চাও?
          </ThemedText>
          <FlatList
            data={subjects}
            renderItem={renderSubject}
            keyExtractor={(item) => item.id.toString()}
            numColumns={2}
            contentContainerStyle={styles.subjectGrid}
            scrollEnabled={false}
          />
        </View>

        {config.subject && (
          <View style={styles.section}>
            <ThemedText style={styles.sectionTitle}>
              কোন ধরনের প্রশ্ন চাও?
            </ThemedText>
            <FlatList
              data={questionBankTypes}
              renderItem={renderType}
              keyExtractor={(item) => item.id}
              numColumns={2}
              contentContainerStyle={styles.typeGrid}
              scrollEnabled={false}
            />
          </View>
        )}
      </ScrollView>
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
  typeGrid: {
    paddingBottom: 8,
  },
  typeItem: {
    width: '50%',
    padding: 6,
  },
  typeIcon: {
    width: 48,
    height: 48,
    resizeMode: 'contain',
  },
});
