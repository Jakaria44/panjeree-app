import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { FeatureCard } from '@/components/shared/FeatureCard';
import { PageHeader } from '@/components/shared/PageHeader';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

export default function HomeScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <ThemedView style={styles.container}>
        <ScrollView contentContainerStyle={{ paddingTop: insets.top > 0 ? 0 : 16 }}>
          <PageHeader 
            title="পাঞ্জেরী শিক্ষা"
            description="পাঞ্জেরী শিক্ষা অ্যাপে স্বাগতম। আপনার পড়াশোনার সহায়ক সমাধান।" 
          />
          
          <View style={styles.featuresContainer}>
            <ThemedText style={styles.sectionTitle}>কী কী করতে পারবেন</ThemedText>
            
            <View style={styles.cardsContainer}>
              <FeatureCard
                title="পরীক্ষা দিন"
                description="বিভিন্ন বিষয়ের মক টেস্ট দিয়ে নিজেকে যাচাই করুন"
                icon={<Ionicons name="document-text" size={24} color="#6B7280" />}
                style={styles.card}
                onPress={() => router.navigate('/(tabs)/exam')}
              />
              
              <FeatureCard
                title="প্রশ্ন ব্যাংক"
                description="বোর্ড এবং স্কুল পরীক্ষার প্রশ্নপত্র দেখুন"
                icon={<Ionicons name="library" size={24} color="#6B7280" />}
                style={styles.card}
                onPress={() => router.navigate('/(tabs)/question-bank')}
              />
              
              <FeatureCard
                title="অনুশীলন করুন"
                description="নিয়মিত অনুশীলন করে নিজেকে প্রস্তুত রাখুন"
                icon={<Ionicons name="school" size={24} color="#6B7280" />}
                style={styles.card}
                onPress={() => router.navigate('/(tabs)/prepare')}
              />
            </View>
          </View>
        </ScrollView>
      </ThemedView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  featuresContainer: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  cardsContainer: {
    gap: 12,
  },
  card: {
    marginBottom: 12,
  },
});
