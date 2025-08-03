"use client"

import { useAtomValue } from "jotai"
import { prepareConfigAtom } from "./store"
import { Step1SelectSubjectAndPaper } from "@/components/features/prepare/Step1SelectSubjectAndPaper"
import { Step2SelectChapters } from "@/components/features/prepare/Step2SelectChapters"
import { PracticeSession } from "@/components/features/prepare/PracticeSession"
import { PracticeResult } from "@/components/features/prepare/PracticeResult"

export default function PreparePage() {
  const { step } = useAtomValue(prepareConfigAtom)

  const renderStep = () => {
    switch (step) {
      case 1:
        return <Step1SelectSubjectAndPaper />
      case 2:
        return <Step2SelectChapters />
      case 3:
        return <PracticeSession />
      case 4:
        return <PracticeResult />
      default:
        return <Step1SelectSubjectAndPaper />
    }
  }

  return <div className="max-w-4xl mx-auto">{renderStep()}</div>
}
