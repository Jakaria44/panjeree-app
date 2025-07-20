import Button from '@/components/Button';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useThemeColor } from '@/hooks/useThemeColor';
import { institutions, questionBankConfigAtom, sessions } from '@/store/question-bank';
import { useAtom } from 'jotai';
import React from 'react';
import { FlatList, StyleSheet, TouchableOpacity, View } from 'react-native';

export function Step2SelectInstitutionAndSession() {
  const [config, setConfig] = useAtom(questionBankConfigAtom);
  const primaryColor = useThemeColor({}, 'purple600');

  const handleInstitutionSelect = (institution: string) => {
    setConfig((prev) => ({ ...prev, institution }));
  };

  const handleSessionSelect = (session: string) => {
    setConfig((prev) => ({ ...prev, session }));
  };

  const handleContinue = () => {
    setConfig((prev) => ({ ...prev, step: 3 }));
  };

  const renderInstitution = ({ item }: { item: { id: string; name: string } }) => {
    const isSelected = config.institution === item.id;
    
    return (
      <TouchableOpacity
        style={[
          styles.institutionItem,
          isSelected && { backgroundColor: '#FAF5FF', borderColor: primaryColor },
        ]}
        onPress={() => handleInstitutionSelect(item.id)}
        activeOpacity={0.7}
      >
        <ThemedText style={[styles.itemText, isSelected && { color: primaryColor }]}>
          {item.name}
        </ThemedText>
        {isSelected && (
          <View style={[styles.checkmark, { backgroundColor: primaryColor }]}>
            <ThemedText style={styles.checkmarkText}>✓</ThemedText>
          </View>
        )}
      </TouchableOpacity>
    );
  };

  const renderSession = ({ item }: { item: { id: string; name: string } }) => {
    const isSelected = config.session === item.id;
    
    return (
      <TouchableOpacity
        style={[
          styles.sessionItem,
          isSelected && { backgroundColor: '#FAF5FF', borderColor: primaryColor },
        ]}
        onPress={() => handleSessionSelect(item.id)}
        activeOpacity={0.7}
      >
        <ThemedText style={[styles.itemText, isSelected && { color: primaryColor }]}>
          {item.name}
        </ThemedText>
        {isSelected && (
          <View style={[styles.checkmark, { backgroundColor: primaryColor }]}>
            <ThemedText style={styles.checkmarkText}>✓</ThemedText>
          </View>
        )}
      </TouchableOpacity>
    );
  };

  const canContinue = config.institution && config.session;

  return (
    <ThemedView style={styles.container}>
      <View style={styles.section}>
        <ThemedText style={styles.sectionTitle}>বোর্ড সিলেক্ট করুন</ThemedText>
        <FlatList
          data={institutions}
          renderItem={renderInstitution}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
        />
      </View>
      
      <View style={styles.section}>
        <ThemedText style={styles.sectionTitle}>সাল সিলেক্ট করুন</ThemedText>
        <FlatList
          horizontal
          data={sessions}
          renderItem={renderSession}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.sessionsList}
          showsHorizontalScrollIndicator={false}
        />
      </View>
      
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
  listContent: {
    paddingBottom: 8,
  },
  institutionItem: {
    padding: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    marginBottom: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sessionsList: {
    paddingBottom: 8,
  },
  sessionItem: {
    padding: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    marginRight: 12,
    minWidth: 100,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemText: {
    fontSize: 16,
  },
  checkmark: {
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  checkmarkText: {
    color: '#FFFFFF',
    fontSize: 12,
  },
  buttonContainer: {
    marginTop: 8,
  },
}); 