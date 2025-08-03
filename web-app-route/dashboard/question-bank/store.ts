import { atom } from "jotai"
import type { Subject } from "@/app/dashboard/exam/store"

export type Institution = {
  id: string
  name: string
  description: string
}

export type Session = {
  id: string
  name: string
  description: string
}

export type QuestionBankConfig = {
  step: number
  subject: Subject | null
  type: "board" | "school" | null
  institution: Institution | null
  session: Session | null
  showAnswers: boolean
}

export const questionBankConfigAtom = atom<QuestionBankConfig>({
  step: 1,
  subject: null,
  type: null,
  institution: null,
  session: null,
  showAnswers: false,
})
