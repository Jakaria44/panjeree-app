import { PracticeResultContainer } from "@/components/prepare/PracticeResultContainer";
import { PracticeSession } from "@/components/prepare/PracticeSession";
import { Step1SelectSubjectAndPaper } from "@/components/prepare/Step1SelectSubjectAndPaper";
import { Step2SelectChapters } from "@/components/prepare/Step2SelectChapters";
import { ThemedView } from "@/components/ThemedView";
import { practiceConfigAtom } from "@/store/prepare";
import { useAtom } from "jotai";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

export default function PrepareScreen() {
  const [config] = useAtom(practiceConfigAtom);

  const renderStep = () => {
    switch (config.step) {
      case 1:
        return <Step1SelectSubjectAndPaper />;
      case 2:
        return <Step2SelectChapters />;
      case 3:
        return <PracticeSession />;
      case 4:
        return <PracticeResultContainer />;
      default:
        return <Step1SelectSubjectAndPaper />;
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }} edges={["top"]}>
      <ThemedView style={{ flex: 1 }}>{renderStep()}</ThemedView>
    </SafeAreaView>
  );
}
