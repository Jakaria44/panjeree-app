import type { Institution, Session } from "./store"

export const questionBankTypes = [
  { id: "board", name: "বোর্ড পরীক্ষা" },
  { id: "school", name: "স্কুলের পরীক্ষা" },
]

export const boards: Institution[] = [
  { id: "dhaka", name: "ঢাকা বোর্ড", description: "বিগত বছরের প্রশ্ন" },
  { id: "rajshahi", name: "রাজশাহী বোর্ড", description: "বিগত বছরের প্রশ্ন" },
  { id: "chittagong", name: "চট্টগ্রাম বোর্ড", description: "বিগত বছরের প্রশ্ন" },
  { id: "jessore", name: "যশোর বোর্ড", description: "বিগত বছরের প্রশ্ন" },
]

export const schools: Institution[] = [
  { id: "notre-dame", name: "নটরডেম কলেজ", description: "বিগত বছরের প্রশ্ন" },
  { id: "holy-cross", name: "হলি ক্রস কলেজ", description: "বিগত বছরের প্রশ্ন" },
  { id: "viqarunnisa", name: "ভিকারুননিসা নূন স্কুল", description: "বিগত বছরের প্রশ্ন" },
  { id: "ideal-school", name: "আইডিয়াল স্কুল এন্ড কলেজ", description: "বিগত বছরের প্রশ্ন" },
]

export const sessions: Session[] = [
  { id: "23-24-mcq", name: "23-24 MCQ", description: "২০ প্রশ্ন - ২০ মিনিট" },
  { id: "23-24-cq", name: "23-24 CQ", description: "৮ প্রশ্ন - ৪০ মিনিট" },
  { id: "22-23-mcq", name: "22-23 MCQ", description: "২০ প্রশ্ন - ২০ মিনিট" },
  { id: "22-23-cq", name: "22-23 CQ", description: "৮ প্রশ্ন - ৪০ মিনিট" },
]
