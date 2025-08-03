"use client"

import { useAtom } from "jotai"
import { examConfigAtom } from "./store"
import { Step1SelectSubject } from "@/components/features/exam/Step1SelectSubject"
import { Step2SelectChapters } from "@/components/features/exam/Step2SelectChapters"
import { Step3ReviewSelection } from "@/components/features/exam/Step3ReviewSelection"
import { Step4SelectStandard } from "@/components/features/exam/Step4SelectStandard"
import { Step5ConfirmExam } from "@/components/features/exam/Step5ConfirmExam"
import { MockExam } from "@/components/features/exam/MockExam"
import { ExamResult } from "@/components/features/exam/ExamResult"

export default function ExamPage() {
  const [config] = useAtom(examConfigAtom)

  const renderStep = () => {
    switch (config.step) {
      case 1:
        return <Step1SelectSubject />
      case 2:
        return <Step2SelectChapters />
      case 3:
        return <Step3ReviewSelection />
      case 4:
        return <Step4SelectStandard />
      case 5:
        return <Step5ConfirmExam />
      case 6: // The actual exam
        return <MockExam />
      case 7: // The result page
        return <ExamResult />
      default:
        return <Step1SelectSubject />
    }
  }

  return <div className="w-full">{renderStep()}</div>
}
