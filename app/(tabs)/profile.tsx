import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { PageHeader } from '@/components/shared/PageHeader';
import Ionicons from '@expo/vector-icons/Ionicons';
import React from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ProfileScreen() {
  return (
    <SafeAreaView style={{ flex: 1 }} edges={['top']}>
      <ThemedView style={styles.container}>
        <ScrollView>
          <PageHeader 
            title="প্রোফাইল"
            description="আপনার প্রোফাইল এবং সেটিংস" 
          />
          
          <View style={styles.profileSection}>
            <View style={styles.avatarContainer}>
              <View style={styles.avatar}>
                <Ionicons name="person" size={40} color="#6B7280" />
              </View>
              <View style={styles.userInfo}>
                <ThemedText style={styles.userName}>শিক্ষার্থী</ThemedText>
                <ThemedText style={styles.userEmail}>student@example.com</ThemedText>
              </View>
            </View>
          </View>

          <View style={styles.menuSection}>
            <ThemedText style={styles.sectionTitle}>সেটিংস</ThemedText>
            
            <TouchableOpacity style={styles.menuItem}>
              <Ionicons name="person-outline" size={24} color="#6B7280" />
              <ThemedText style={styles.menuText}>প্রোফাইল সম্পাদনা</ThemedText>
              <Ionicons name="chevron-forward" size={20} color="#6B7280" />
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.menuItem}>
              <Ionicons name="notifications-outline" size={24} color="#6B7280" />
              <ThemedText style={styles.menuText}>বিজ্ঞপ্তি</ThemedText>
              <Ionicons name="chevron-forward" size={20} color="#6B7280" />
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.menuItem}>
              <Ionicons name="language-outline" size={24} color="#6B7280" />
              <ThemedText style={styles.menuText}>ভাষা</ThemedText>
              <Ionicons name="chevron-forward" size={20} color="#6B7280" />
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.menuItem}>
              <Ionicons name="help-circle-outline" size={24} color="#6B7280" />
              <ThemedText style={styles.menuText}>সাহায্য</ThemedText>
              <Ionicons name="chevron-forward" size={20} color="#6B7280" />
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.menuItem}>
              <Ionicons name="information-circle-outline" size={24} color="#6B7280" />
              <ThemedText style={styles.menuText}>সম্পর্কে</ThemedText>
              <Ionicons name="chevron-forward" size={20} color="#6B7280" />
            </TouchableOpacity>
          </View>

          <View style={styles.menuSection}>
            <TouchableOpacity style={[styles.menuItem, styles.logoutItem]}>
              <Ionicons name="log-out-outline" size={24} color="#EF4444" />
              <ThemedText style={[styles.menuText, styles.logoutText]}>লগআউট</ThemedText>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </ThemedView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  profileSection: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  avatarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 14,
    color: '#6B7280',
  },
  menuSection: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 0,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  menuText: {
    flex: 1,
    fontSize: 16,
    marginLeft: 12,
  },
  logoutItem: {
    borderBottomWidth: 0,
  },
  logoutText: {
    color: '#EF4444',
  },
});
