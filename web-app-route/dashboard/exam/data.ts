import type { Subject } from "./store"

export const subjects: Subject[] = [
  {
    id: "physics",
    name: "পদার্থবিজ্ঞান",
    icon: "/placeholder.svg?width=48&height=48",
    papers: [
      {
        id: "physics-1",
        name: "১ম পত্র",
        chapters: [
          { id: "p1-c1", name: "ভৌতজগত ও পরিমাপ", sections: [{ id: "p1c1s1", name: "পরিমাপের যন্ত্রপাতি" }] },
          {
            id: "p1-c2",
            name: "ভেক্টর",
            sections: [
              { id: "p1c2s1", name: "ভেক্টরের প্রকারভেদ ও সূত্রাবলী" },
              { id: "p1c2s2", name: "লব্ধি ও মান নির্ণয়" },
              { id: "p1c2s3", name: "কোপ ও দিক নির্ণয়" },
              { id: "p1c2s4", name: "আপেক্ষিক বেগ" },
            ],
          },
          { id: "p1-c3", name: "গতিবিদ্যা", sections: [{ id: "p1c3s1", name: "প্রাসের গতি" }] },
          { id: "p1-c4", name: "নিউটনিয়ান বলবিদ্যা", sections: [{ id: "p1c4s1", name: "বল ও তার প্রভাব" }] },
        ],
      },
      {
        id: "physics-2",
        name: "২য় পত্র",
        chapters: [
          { id: "p2-c1", name: "তাপগতিবিদ্যা", sections: [{ id: "p2c1s1", name: "তাপগতিবিদ্যার সূত্র" }] },
          { id: "p2-c2", name: "স্থির তড়িৎ", sections: [{ id: "p2c2s1", name: "কুলম্বের সূত্র" }] },
        ],
      },
    ],
  },
  {
    id: "math",
    name: "উচ্চতর গণিত",
    icon: "/placeholder.svg?width=48&height=48",
    papers: [
      {
        id: "math-1",
        name: "১ম পত্র",
        chapters: [
          {
            id: "m1-c1",
            name: "ম্যাট্রিক্স ও নির্ণায়ক",
            sections: [
              { id: "m1c1s1", name: "ম্যাট্রিক্সের প্রকারভেদ" },
              { id: "m1c1s2", name: "নির্ণায়কের ধর্মাবলী" },
            ],
          },
        ],
      },
      {
        id: "math-2",
        name: "২য় পত্র",
        chapters: [
          {
            id: "m2-c1",
            name: "বাস্তব সংখ্যা ও অসমতা",
            sections: [
              { id: "m2c1s1", name: "বাস্তব সংখ্যার ধারণা" },
              { id: "m2c1s2", name: "অসমতার সমাধান" },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "ict",
    name: "তথ্য ও যোগাযোগ প্রযুক্তি",
    icon: "/placeholder.svg?width=48&height=48",
    papers: [
      {
        id: "ict-paper",
        name: "একক পত্র",
        chapters: [
          { id: "ict-c1", name: "সংখ্যা পদ্ধতি", sections: [{ id: "ict-c1s1", name: "বাইনারি ও দশমিক" }] },
          { id: "ict-c2", name: "ডিজিটাল ডিভাইস", sections: [{ id: "ict-c2s1", name: "লজিক গেট" }] },
        ],
      },
    ],
  },
  {
    id: "chemistry",
    name: "রসায়ন",
    icon: "/placeholder.svg?width=48&height=48",
    papers: [
      {
        id: "chem-1",
        name: "১ম পত্র",
        chapters: [
          { id: "ch1-c1", name: "ল্যাবরেটরির নিরাপদ ব্যবহার", sections: [{ id: "ch1c1s1", name: "নিরাপত্তা সরঞ্জাম" }] },
        ],
      },
      {
        id: "chem-2",
        name: "২য় পত্র",
        chapters: [{ id: "ch2-c1", name: "পরিবেশ রসায়ন", sections: [{ id: "ch2c1s1", name: "বায়ু দূষণ" }] }],
      },
    ],
  },
  {
    id: "statistics",
    name: "পরিসংখ্যান",
    icon: "/placeholder.svg?width=48&height=48",
    papers: [],
  },
  {
    id: "biology",
    name: "জীববিজ্ঞান",
    icon: "/placeholder.svg?width=48&height=48",
    papers: [
      {
        id: "bio-1",
        name: "১ম পত্র",
        chapters: [{ id: "b1-c1", name: "কোষ ও এর গঠন", sections: [{ id: "b1c1s1", name: "কোষ প্রাচীর" }] }],
      },
      {
        id: "bio-2",
        name: "২য় পত্র",
        chapters: [{ id: "b2-c1", name: "প্রাণীর বিভিন্নতা", sections: [{ id: "b2c1s1", name: "শ্রেণিবিন্যাস" }] }],
      },
    ],
  },
  {
    id: "gk",
    name: "সাধারণ জ্ঞান",
    icon: "/placeholder.svg?width=48&height=48",
    papers: [],
  },
]

export const mockQuestions = [
  {
    id: "q1",
    text: "একটি রেফ্রিজারেটরের কার্যকর সহগ হলো 4.6। ঠাণ্ডা প্রকোষ্ঠ হতে 250 J অপসারণ করতে হলে কত কাজ করতে হবে?",
    options: ["46 J", "77 J", "54 J", "78 J"],
    correctAnswer: "54 J",
  },
  {
    id: "q2",
    text: "তাপীয় সমতায় থাকা বস্তুগুলোর মধ্যে নিচের কোনটির আদান-প্রদান ঘটে না?",
    options: ["তাপ", " তাপমাত্রা", "বিকিরণ", "চাপ"],
    correctAnswer: "তাপ",
  },
  {
    id: "q3",
    text: "কোনটির তাপন ক্ষমতা সবচেয়ে বেশি?",
    options: ["পিট", "লিগনাইট", "অ্যানথ্রাসাইট", "বিটুমিনাস"],
    correctAnswer: "অ্যানথ্রাসাইট",
  },
  {
    id: "q4",
    text: "একটি কার্নো ইঞ্জিন 1200K ও 600K তাপমাত্রায় যে দক্ষতায় কাজ করে, 100K ও TK তাপমাত্রায় কাজ করলেও একই দক্ষতা প্রদর্শন করে। T এর মান কত?",
    options: ["80 K", "70 K", "50 K", "60 K"],
    correctAnswer: "50 K",
  },
  {
    id: "q5",
    text: "নিচের কোন গ্যাসের জন্য রুদ্ধতাপীয় প্রক্রিয়ার ঢাল বেশি খাড়া?",
    options: ["He", "O2", "N2", "CO2"],
    correctAnswer: "He",
  },
]
