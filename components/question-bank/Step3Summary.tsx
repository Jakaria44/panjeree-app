import Button from '@/components/Button';
import { SummaryStatCard } from '@/components/shared/SummaryStatCard';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { institutions, questionBankConfigAtom, sessions } from '@/store/question-bank';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useAtom } from 'jotai';
import React from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';

export function Step3Summary() {
  const [config, setConfig] = useAtom(questionBankConfigAtom);
  
  // Get institution name from id
  const getInstitutionName = () => {
    return institutions.find(i => i.id === config.institution)?.name || '';
  };

  // Get session name from id
  const getSessionName = () => {
    return sessions.find(s => s.id === config.session)?.name || '';
  };

  // Get bank type name
  const getBankTypeName = () => {
    return config.type === 'board' ? 'বোর্ড প্রশ্ন' : 'স্কুল/কলেজ প্রশ্ন';
  };

  const handleStartQuestionBank = () => {
    setConfig((prev) => ({ ...prev, step: 4 }));
  };

  const handleEdit = (step: number) => {
    setConfig((prev) => ({ ...prev, step }));
  };

  return (
    <ThemedView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        <ThemedText style={styles.title}>প্রশ্ন ব্যাঙ্ক সারসংক্ষেপ</ThemedText>
        <ThemedText style={styles.subtitle}>
          প্রশ্ন ব্যাঙ্ক দেখার আগে সমস্ত তথ্য যাচাই করুন
        </ThemedText>

        <View style={styles.summaryContainer}>
          <View style={styles.summaryItem}>
            <View style={styles.summaryHeader}>
              <ThemedText style={styles.itemTitle}>বিষয়</ThemedText>
              <TouchableOpacity onPress={() => handleEdit(1)}>
                <View style={styles.editButton}>
                  <Ionicons name="pencil-outline" size={16} color="#6B7280" />
                  <ThemedText style={styles.editText}>সম্পাদনা</ThemedText>
                </View>
              </TouchableOpacity>
            </View>
            <ThemedText style={styles.itemValue}>{config.subject?.name}</ThemedText>
          </View>

          <View style={styles.summaryItem}>
            <View style={styles.summaryHeader}>
              <ThemedText style={styles.itemTitle}>প্রশ্ন ব্যাঙ্ক ধরন</ThemedText>
              <TouchableOpacity onPress={() => handleEdit(1)}>
                <View style={styles.editButton}>
                  <Ionicons name="pencil-outline" size={16} color="#6B7280" />
                  <ThemedText style={styles.editText}>সম্পাদনা</ThemedText>
                </View>
              </TouchableOpacity>
            </View>
            <ThemedText style={styles.itemValue}>{getBankTypeName()}</ThemedText>
          </View>

          <View style={styles.summaryItem}>
            <View style={styles.summaryHeader}>
              <ThemedText style={styles.itemTitle}>বোর্ড / প্রতিষ্ঠান</ThemedText>
              <TouchableOpacity onPress={() => handleEdit(2)}>
                <View style={styles.editButton}>
                  <Ionicons name="pencil-outline" size={16} color="#6B7280" />
                  <ThemedText style={styles.editText}>সম্পাদনা</ThemedText>
                </View>
              </TouchableOpacity>
            </View>
            <ThemedText style={styles.itemValue}>{getInstitutionName()}</ThemedText>
          </View>

          <View style={styles.summaryItem}>
            <View style={styles.summaryHeader}>
              <ThemedText style={styles.itemTitle}>সাল</ThemedText>
              <TouchableOpacity onPress={() => handleEdit(2)}>
                <View style={styles.editButton}>
                  <Ionicons name="pencil-outline" size={16} color="#6B7280" />
                  <ThemedText style={styles.editText}>সম্পাদনা</ThemedText>
                </View>
              </TouchableOpacity>
            </View>
            <ThemedText style={styles.itemValue}>{getSessionName()}</ThemedText>
          </View>
        </View>

        <View style={styles.statsContainer}>
          <SummaryStatCard
            title="মোট প্রশ্ন"
            value="50"
            icon={<Ionicons name="help-circle-outline" size={20} color="#6B7280" />}
          />
          <SummaryStatCard
            title="MCQ প্রশ্ন"
            value="30"
            icon={<Ionicons name="radio-button-on-outline" size={20} color="#6B7280" />}
          />
          <SummaryStatCard
            title="Written প্রশ্ন"
            value="20"
            icon={<Ionicons name="document-text-outline" size={20} color="#6B7280" />}
          />
        </View>

        <View style={styles.noteContainer}>
          <View style={styles.noteIconContainer}>
            <Ionicons name="information-circle-outline" size={24} color="#2563EB" />
          </View>
          <ThemedText style={styles.noteText}>
            প্রশ্নপত্রের সকল প্রশ্ন দেখতে প্রশ্ন ব্যাঙ্ক দেখুন বোতামে ক্লিক করুন। প্রশ্নের উত্তর দেখতে সংশ্লিষ্ট প্রশ্নে ক্লিক করুন।
          </ThemedText>
        </View>
      </ScrollView>

      <View style={styles.buttonContainer}>
        <Button onPress={handleStartQuestionBank}>
          প্রশ্ন ব্যাঙ্ক দেখুন
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
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 24,
  },
  summaryContainer: {
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  summaryItem: {
    marginBottom: 16,
  },
  summaryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  itemTitle: {
    fontSize: 14,
    color: '#6B7280',
  },
  itemValue: {
    fontSize: 16,
    fontWeight: '600',
  },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  editText: {
    fontSize: 12,
    color: '#6B7280',
  },
  statsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 24,
  },
  noteContainer: {
    flexDirection: 'row',
    backgroundColor: '#EFF6FF',
    borderRadius: 8,
    padding: 12,
    marginBottom: 24,
    gap: 12,
  },
  noteIconContainer: {
    marginTop: 2,
  },
  noteText: {
    flex: 1,
    fontSize: 14,
    color: '#1E40AF',
    lineHeight: 20,
  },
  buttonContainer: {
    marginTop: 8,
  },
}); 