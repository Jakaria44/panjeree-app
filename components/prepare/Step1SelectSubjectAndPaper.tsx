import { FeatureCard } from '@/components/shared/FeatureCard';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useSubjects } from '@/hooks/useSubjects';
import { Paper, Subject } from '@/store/commons';
import { practiceConfigAtom } from '@/store/prepare';
import { useAtom } from 'jotai';
import { FlatList, Image, ScrollView, StyleSheet, View } from 'react-native';

export function Step1SelectSubjectAndPaper() {
  const [config, setConfig] = useAtom(practiceConfigAtom);
  const { subjects } = useSubjects();

  const handleSubjectSelect = (subject: Subject) => {
    setConfig((prev) => ({ ...prev, subject, paper: null }));
  };

  const handlePaperSelect = (paper: Paper) => {
    setConfig((prev) => ({ ...prev, paper, step: 2 }));
  };

  const renderSubject = ({ item }: { item: Subject }) => {
    // Handle ReactNode icon or string icon
    const iconSource =
      typeof item.icon === "string" && item.icon
        ? { uri: item.icon }
        : require("@/assets/images/icon.png");

    return (
      <View style={styles.subjectItem}>
        <FeatureCard
          title={item.name}
          icon={<Image source={iconSource} style={styles.subjectIcon} />}
          style={config.subject?.name === item.name ? styles.selectedCard : {}}
          onPress={() => handleSubjectSelect(item)}
          activeOpacity={0.7}
        />
      </View>
    );
  };

  const renderPaper = ({ item }: { item: Paper }) => {
    return (
      <View style={styles.paperItem}>
        <FeatureCard
          title={`${config.subject?.name || ""} ${item.name}`}
          icon={
            <Image
              source={require("@/assets/images/icon.png")}
              style={styles.paperIcon}
            />
          }
          style={config.paper?.id === item.id ? styles.selectedCard : {}}
          onPress={() => handlePaperSelect(item)}
          activeOpacity={0.7}
        />
      </View>
    );
  };

  // Use subject's papers directly instead of papers object that was removed
  const subjectPapers = config.subject?.papers || [];

  return (
    <ThemedView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.section}>
          <ThemedText style={styles.sectionTitle}>
            কি বিষয়ে প্রস্তুতি নিতে চাও?
          </ThemedText>
          <FlatList
            data={subjects}
            renderItem={renderSubject}
            keyExtractor={(item) => item.name}
            numColumns={2}
            contentContainerStyle={styles.subjectGrid}
            scrollEnabled={false}
          />
        </View>

        {config.subject && subjectPapers.length > 0 && (
          <View style={styles.section}>
            <ThemedText style={styles.sectionTitle}>
              কোন পত্র প্রস্তুতি নিতে চাও?
            </ThemedText>
            <FlatList
              data={subjectPapers}
              renderItem={renderPaper}
              keyExtractor={(item) => item.id.toString()}
              numColumns={1}
              contentContainerStyle={styles.paperGrid}
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
  paperGrid: {
    paddingBottom: 8,
  },
  paperItem: {
    width: '100%',
    padding: 6,
  },
  paperIcon: {
    width: 48,
    height: 48,
    resizeMode: 'contain',
  },
});
