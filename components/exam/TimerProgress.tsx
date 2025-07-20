import { ThemedText } from '@/components/ThemedText';
import { useThemeColor } from '@/hooks/useThemeColor';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';

type TimerProgressProps = {
  totalSeconds: number;
  onTimeUp?: () => void;
  isPaused?: boolean;
};

export function TimerProgress({ totalSeconds, onTimeUp, isPaused = false }: TimerProgressProps) {
  const [secondsLeft, setSecondsLeft] = useState(totalSeconds);
  const destructiveColor = useThemeColor({}, 'destructive');

  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          if (onTimeUp) onTimeUp();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [totalSeconds, isPaused, onTimeUp]);

  const percentage = Math.max(0, (secondsLeft / totalSeconds) * 100);
  
  const formatTime = (seconds: number): string => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    if (hrs > 0) {
      return `${hrs}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getProgressColor = () => {
    if (percentage > 50) return '#10B981'; // Green
    if (percentage > 20) return '#F59E0B'; // Yellow/Orange
    return destructiveColor; // Red
  };

  return (
    <View style={styles.container}>
      <View style={styles.progressBarContainer}>
        <View
          style={[
            styles.progressBar,
            {
              width: `${percentage}%`,
              backgroundColor: getProgressColor(),
            },
          ]}
        />
      </View>
      <ThemedText style={styles.timeText}>{formatTime(secondsLeft)}</ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  progressBarContainer: {
    height: 8,
    backgroundColor: '#E5E7EB',
    borderRadius: 9999,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    borderRadius: 9999,
  },
  timeText: {
    fontSize: 12,
    fontWeight: 'bold',
    marginTop: 4,
    textAlign: 'center',
  },
}); 