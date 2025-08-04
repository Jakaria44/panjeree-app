// Mock data that matches the expected API response structure
export const mockSubjectsData = [
  {
    id: 1,
    name: 'পদার্থবিজ্ঞান',
    icon: '/placeholder.svg',
    papers: [
      {
        id: 1,
        name: '১ম পত্র',
        chapters: [
          {
            id: 1,
            name: 'ভৌতজগত ও পরিমাপ',
            topics: [
              { id: 1, name: 'পরিমাপের যন্ত্রপাতি' },
              { id: 2, name: 'এককের রূপান্তর' },
            ],
          },
          {
            id: 2,
            name: 'ভেক্টর',
            topics: [
              { id: 3, name: 'ভেক্টরের প্রকারভেদ ও সূত্রাবলী' },
              { id: 4, name: 'লব্ধি ও মান নির্ণয়' },
              { id: 5, name: 'কোপ ও দিক নির্ণয়' },
              { id: 6, name: 'আপেক্ষিক বেগ' },
            ],
          },
          {
            id: 3,
            name: 'গতিবিদ্যা',
            topics: [
              { id: 7, name: 'প্রাসের গতি' },
              { id: 8, name: 'বৃত্তীয় গতি' },
            ],
          },
        ],
      },
      {
        id: 2,
        name: '২য় পত্র',
        chapters: [
          {
            id: 4,
            name: 'তাপগতিবিদ্যা',
            topics: [
              { id: 9, name: 'তাপগতিবিদ্যার সূত্র' },
              { id: 10, name: 'কার্নো চক্র' },
            ],
          },
          {
            id: 5,
            name: 'স্থির তড়িৎ',
            topics: [
              { id: 11, name: 'কুলম্বের সূত্র' },
              { id: 12, name: 'তড়িৎ ক্ষেত্র' },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 2,
    name: 'উচ্চতর গণিত',
    icon: '/placeholder.svg',
    papers: [
      {
        id: 3,
        name: '১ম পত্র',
        chapters: [
          {
            id: 6,
            name: 'ম্যাট্রিক্স ও নির্ণায়ক',
            topics: [
              { id: 13, name: 'ম্যাট্রিক্সের প্রকারভেদ' },
              { id: 14, name: 'নির্ণায়কের ধর্মাবলী' },
              { id: 15, name: 'ম্যাট্রিক্সের বিপরীত' },
            ],
          },
          {
            id: 7,
            name: 'বাস্তব সংখ্যা ও অসমতা',
            topics: [
              { id: 16, name: 'বাস্তব সংখ্যার ধারণা' },
              { id: 17, name: 'অসমতার সমাধান' },
            ],
          },
        ],
      },
      {
        id: 4,
        name: '২য় পত্র',
        chapters: [
          {
            id: 8,
            name: 'ত্রিকোণমিতি',
            topics: [
              { id: 18, name: 'ত্রিকোণমিতিক অনুপাত' },
              { id: 19, name: 'ত্রিকোণমিতিক সূত্র' },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 3,
    name: 'তথ্য ও যোগাযোগ প্রযুক্তি',
    icon: '/placeholder.svg',
    papers: [
      {
        id: 5,
        name: 'একক পত্র',
        chapters: [
          {
            id: 9,
            name: 'সংখ্যা পদ্ধতি',
            topics: [
              { id: 20, name: 'বাইনারি ও দশমিক' },
              { id: 21, name: 'হেক্সাডেসিমাল' },
            ],
          },
          {
            id: 10,
            name: 'ডিজিটাল ডিভাইস',
            topics: [
              { id: 22, name: 'লজিক গেট' },
              { id: 23, name: 'ফ্লিপ ফ্লপ' },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 4,
    name: 'রসায়ন',
    icon: '/placeholder.svg',
    papers: [
      {
        id: 6,
        name: '১ম পত্র',
        chapters: [
          {
            id: 11,
            name: 'ল্যাবরেটরির নিরাপদ ব্যবহার',
            topics: [
              { id: 24, name: 'নিরাপত্তা সরঞ্জাম' },
              { id: 25, name: 'রাসায়নিক পদার্থের পরিচিতি' },
            ],
          },
        ],
      },
      {
        id: 7,
        name: '২য় পত্র',
        chapters: [
          {
            id: 12,
            name: 'পরিবেশ রসায়ন',
            topics: [
              { id: 26, name: 'বায়ু দূষণ' },
              { id: 27, name: 'জল দূষণ' },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 5,
    name: 'জীববিজ্ঞান',
    icon: '/placeholder.svg',
    papers: [
      {
        id: 8,
        name: '১ম পত্র',
        chapters: [
          {
            id: 13,
            name: 'কোষ ও এর গঠন',
            topics: [
              { id: 28, name: 'কোষ প্রাচীর' },
              { id: 29, name: 'কোষের অঙ্গাণু' },
            ],
          },
        ],
      },
      {
        id: 9,
        name: '২য় পত্র',
        chapters: [
          {
            id: 14,
            name: 'প্রাণীর বিভিন্নতা',
            topics: [
              { id: 30, name: 'শ্রেণিবিন্যাস' },
              { id: 31, name: 'বিবর্তন' },
            ],
          },
        ],
      },
    ],
  },
];

// Mock API response structure
export const mockApiResponse = [
  {
    id: 1,
    name: 'Class 10',
    subjects: mockSubjectsData,
  },
];

// Mock questions for exam
export const mockQuestions = [
  {
    id: 'q1',
    text: 'একটি রেফ্রিজারেটরের কার্যকর সহগ হলো 4.6। ঠাণ্ডা প্রকোষ্ঠ হতে 250 J অপসারণ করতে হলে কত কাজ করতে হবে?',
    options: ['46 J', '77 J', '54 J', '78 J'],
    correctAnswer: '54 J',
  },
  {
    id: 'q2',
    text: 'তাপীয় সমতায় থাকা বস্তুগুলোর মধ্যে নিচের কোনটির আদান-প্রদান ঘটে না?',
    options: ['তাপ', 'তাপমাত্রা', 'বিকিরণ', 'চাপ'],
    correctAnswer: 'তাপমাত্রা',
  },
  {
    id: 'q3',
    text: 'কোনটির তাপন ক্ষমতা সবচেয়ে বেশি?',
    options: ['পিট', 'লিগনাইট', 'অ্যানথ্রাসাইট', 'বিটুমিনাস'],
    correctAnswer: 'অ্যানথ্রাসাইট',
  },
  {
    id: 'q4',
    text: 'একটি কার্নো ইঞ্জিন 1200K ও 600K তাপমাত্রায় যে দক্ষতায় কাজ করে, 100K ও TK তাপমাত্রায় কাজ করলেও একই দক্ষতা প্রদর্শন করে। T এর মান কত?',
    options: ['80 K', '70 K', '50 K', '60 K'],
    correctAnswer: '50 K',
  },
  {
    id: 'q5',
    text: 'নিচের কোন গ্যাসের জন্য রুদ্ধতাপীয় প্রক্রিয়ার ঢাল বেশি খাড়া?',
    options: ['He', 'O2', 'N2', 'CO2'],
    correctAnswer: 'He',
  },
];
