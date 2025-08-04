import { ExamFlow } from '@/components/exam/ExamFlow';
import { ThemedView } from '@/components/ThemedView';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function ExamScreen() {
  const insets = useSafeAreaInsets();

  return (
    <ThemedView style={{ flex: 1, paddingTop: insets.top }}>
      <ExamFlow />
    </ThemedView>
  );
}
