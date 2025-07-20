import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useThemeColor } from '@/hooks/useThemeColor';
import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, View, ViewStyle } from 'react-native';

type QuestionOption = {
  id: string;
  text: string;
};

type QuestionDisplayProps = {
  questionNumber: number;
  questionText: string;
  options: QuestionOption[];
  correctAnswer?: string;
  userAnswer?: string;
  onSelectOption?: (optionId: string) => void;
  showAnswer?: boolean;
  style?: ViewStyle;
};

export function QuestionDisplay({
  questionNumber,
  questionText,
  options,
  correctAnswer,
  userAnswer,
  onSelectOption,
  showAnswer = false,
  style,
}: QuestionDisplayProps) {
  const [selectedOption, setSelectedOption] = useState<string | undefined>(userAnswer);
  
  const handleSelectOption = (optionId: string) => {
    if (!showAnswer && onSelectOption) {
      setSelectedOption(optionId);
      onSelectOption(optionId);
    }
  };

  const getOptionStyle = (optionId: string) => {
    if (!showAnswer) {
      return {
        backgroundColor: selectedOption === optionId ? useThemeColor({}, 'accent') : 'transparent',
        borderColor: selectedOption === optionId ? useThemeColor({}, 'primary') : useThemeColor({}, 'border'),
      };
    }

    if (optionId === correctAnswer) {
      return {
        backgroundColor: '#DCFCE7',
        borderColor: '#22C55E',
      };
    }

    if (optionId === userAnswer && optionId !== correctAnswer) {
      return {
        backgroundColor: '#FEE2E2',
        borderColor: '#EF4444',
      };
    }

    return {
      backgroundColor: 'transparent',
      borderColor: useThemeColor({}, 'border'),
    };
  };

  return (
    <ThemedView style={[styles.container, style]}>
      <View style={styles.questionHeader}>
        <View style={styles.questionNumber}>
          <ThemedText style={styles.questionNumberText}>{questionNumber}</ThemedText>
        </View>
        <ThemedText style={styles.questionText}>{questionText}</ThemedText>
      </View>

      <View style={styles.optionsContainer}>
        {options.map((option) => (
          <TouchableOpacity
            key={option.id}
            style={[styles.option, getOptionStyle(option.id)]}
            onPress={() => handleSelectOption(option.id)}
            disabled={showAnswer}
            activeOpacity={0.7}
          >
            <View style={styles.optionContent}>
              <View style={styles.optionBullet}>
                <ThemedText>{option.id}</ThemedText>
              </View>
              <ThemedText style={styles.optionText}>{option.text}</ThemedText>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 24,
  },
  questionHeader: {
    padding: 16,
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  questionNumber: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 2,
  },
  questionNumberText: {
    fontWeight: '600',
    fontSize: 14,
  },
  questionText: {
    flex: 1,
    fontSize: 16,
    lineHeight: 24,
  },
  optionsContainer: {
    padding: 8,
  },
  option: {
    borderWidth: 1,
    borderRadius: 8,
    marginVertical: 4,
    overflow: 'hidden',
  },
  optionContent: {
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  optionBullet: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  optionText: {
    flex: 1,
    fontSize: 14,
  },
}); 