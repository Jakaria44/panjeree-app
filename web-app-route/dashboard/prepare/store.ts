import { atom } from "jotai"
import type { Subject, Paper } from "@/app/dashboard/exam/store"

export type PrepareConfig = {
  step: number
  subject: Subject | null
  paper: Paper | null
  // { [chapterId]: sectionId[] }
  selectedSections: Record<string, string[]>
}

export const prepareConfigAtom = atom<PrepareConfig>({
  step: 1,
  subject: null,
  paper: null,
  selectedSections: {},
})
