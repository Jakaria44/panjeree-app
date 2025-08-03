"use client"

import { useAtomValue } from "jotai"
import { questionBankConfigAtom } from "./store"
import { Step1SelectSubjectAndType } from "@/components/features/question-bank/Step1SelectSubjectAndType"
import { Step2SelectInstitutionAndSession } from "@/components/features/question-bank/Step2SelectInstitutionAndSession"
import { Step3Summary } from "@/components/features/question-bank/Step3Summary"
import { Step4QuestionView } from "@/components/features/question-bank/Step4QuestionView"
import { Step5Result } from "@/components/features/question-bank/Step5Result"

export default function QuestionBankPage() {
  const { step } = useAtomValue(questionBankConfigAtom)

  const renderStep = () => {
    switch (step) {
      case 1:
        return <Step1SelectSubjectAndType />
      case 2:
        return <Step2SelectInstitutionAndSession />
      case 3:
        return <Step3Summary />
      case 4:
        return <Step4QuestionView />
      case 5:
        return <Step5Result />
      default:
        return <Step1SelectSubjectAndType />
    }
  }

  return <div className="max-w-4xl mx-auto">{renderStep()}</div>
}
