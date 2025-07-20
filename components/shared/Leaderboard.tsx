import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useThemeColor } from '@/hooks/useThemeColor';
import React from 'react';
import { FlatList, Image, StyleSheet, View, ViewStyle } from 'react-native';

export type LeaderboardEntry = {
  id: string;
  name: string;
  score: number;
  avatar?: string;
  position: number;
};

type LeaderboardProps = {
  entries: LeaderboardEntry[];
  title?: string;
  style?: ViewStyle;
  highlightPosition?: number;
};

export function Leaderboard({ entries, title, style, highlightPosition }: LeaderboardProps) {
  const borderColor = useThemeColor({}, 'border');
  const accentColor = useThemeColor({}, 'accent');

  const renderItem = ({ item, index }: { item: LeaderboardEntry; index: number }) => {
    const isHighlighted = item.position === highlightPosition;
    const isTopThree = item.position <= 3;

    const positionColors = {
      1: '#FFD700', // Gold
      2: '#C0C0C0', // Silver
      3: '#CD7F32', // Bronze
    };

    const avatarPlaceholder = 'https://ui-avatars.com/api/?name=' + encodeURIComponent(item.name);

    return (
      <View
        style={[
          styles.entryContainer,
          {
            backgroundColor: isHighlighted ? accentColor : 'transparent',
            borderBottomColor: borderColor,
          },
          index === entries.length - 1 && styles.lastEntry,
        ]}
      >
        <View
          style={[
            styles.positionBadge,
            isTopThree && {
              backgroundColor: positionColors[item.position as 1 | 2 | 3] || '#F3F4F6',
            },
          ]}
        >
          <ThemedText style={styles.positionText}>{item.position}</ThemedText>
        </View>

        <View style={styles.avatarContainer}>
          <Image
            source={{ uri: item.avatar || avatarPlaceholder }}
            style={styles.avatar}
            defaultSource={require('@/assets/images/icon.png')}
          />
        </View>

        <ThemedText style={styles.nameText}>{item.name}</ThemedText>

        <ThemedText style={styles.scoreText}>{item.score}</ThemedText>
      </View>
    );
  };

  return (
    <ThemedView style={[styles.container, style]}>
      {title && <ThemedText style={styles.title}>{title}</ThemedText>}
      <FlatList
        data={entries}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    padding: 16,
    paddingBottom: 12,
  },
  listContent: {
    paddingBottom: 8,
  },
  entryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
  },
  lastEntry: {
    borderBottomWidth: 0,
  },
  positionBadge: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  positionText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  avatarContainer: {
    marginLeft: 12,
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
  },
  nameText: {
    flex: 1,
    fontSize: 14,
    fontWeight: '500',
    marginLeft: 12,
  },
  scoreText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
}); 