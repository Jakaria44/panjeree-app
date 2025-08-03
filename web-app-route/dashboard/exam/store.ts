import type React from "react"
import { atom } from "jotai"

export type Section = {
  id: string
  name: string
}

export type Chapter = {
  id: string
  name: string
  sections: Section[]
}

export type Paper = {
  id: string
  name: string
  chapters: Chapter[]
}

export type Subject = {
  id: string
  name: string
  icon: React.ReactNode | string
  papers: Paper[]
}

export type ExamConfig = {
  step: number
  totalSteps: number
  subject: Subject | null
  // { [paperId]: { [chapterId]: sectionId[] } }
  selectedSections: Record<string, Record<string, string[]>>
  questionCount: number
  questionStandard: "engineering" | "main-book" | "varsity" | "medical"
  examType: "mcq" | "written"
  totalTime: number
}

export const examConfigAtom = atom<ExamConfig>({
  step: 1,
  totalSteps: 4,
  subject: null,
  selectedSections: {},
  questionCount: 12,
  questionStandard: "main-book",
  examType: "mcq",
  totalTime: 10,
})
