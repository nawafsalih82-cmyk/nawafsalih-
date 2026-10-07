import { Question } from '../types';

export const QUESTIONS_DATA: Question[] = [
  {
    id: 1,
    verb: 'go',
    verbArabic: 'يذهب',
    options: ['goes', 'went', 'going'],
    correctIndex: 1, // went
    pastForm: 'went',
    explanation: 'فعل غير منتظم (شاذ): go يتحول إلى went في الماضي البسيط.'
  },
  {
    id: 2,
    verb: 'do',
    verbArabic: 'يفعل / يعمل',
    options: ['does', 'doing', 'did'],
    correctIndex: 2, // did
    pastForm: 'did',
    explanation: 'فعل غير منتظم: do يتحول إلى did في الماضي البسيط.'
  },
  {
    id: 3,
    verb: 'see',
    verbArabic: 'يرى / يشاهد',
    options: ['saw', 'seen', 'seed'],
    correctIndex: 0, // saw
    pastForm: 'saw',
    explanation: 'فعل غير منتظم: see يتحول إلى saw في الماضي البسيط (وليس seed).'
  },
  {
    id: 4,
    verb: 'write',
    verbArabic: 'يكتب',
    options: ['writing', 'written', 'wrote'],
    correctIndex: 2, // wrote
    pastForm: 'wrote',
    explanation: 'فعل غير منتظم: write يتحول إلى wrote في الماضي البسيط.'
  },
  {
    id: 5,
    verb: 'is',
    verbArabic: 'يكون (للمفرد)',
    options: ['ised', 'was', 'ising'],
    correctIndex: 1, // was
    pastForm: 'was',
    explanation: 'تصريف Verb to be في الماضي للمفرد هو was (I/He/She/It was).'
  },
  {
    id: 6,
    verb: 'drink',
    verbArabic: 'يشرب',
    options: ['drank', 'drunk', 'drinking'],
    correctIndex: 0, // drank
    pastForm: 'drank',
    explanation: 'فعل غير منتظم: drink يتحول إلى drank بحرف a في الماضي البسيط.'
  },
  {
    id: 7,
    verb: 'eat',
    verbArabic: 'يأكل',
    options: ['eating', 'ate', 'ote'],
    correctIndex: 1, // ate
    pastForm: 'ate',
    explanation: 'فعل غير منتظم: eat يتحول إلى ate في الماضي البسيط.'
  },
  {
    id: 8,
    verb: 'sleep',
    verbArabic: 'ينام',
    options: ['slept', 'sleeping', 'seelped'],
    correctIndex: 0, // slept
    pastForm: 'slept',
    explanation: 'فعل غير منتظم: sleep يتحول إلى slept في الماضي البسيط.'
  },
  {
    id: 9,
    verb: 'find',
    verbArabic: 'يجد / يعثر على',
    options: ['found', 'finded', 'finding'],
    correctIndex: 0, // found
    pastForm: 'found',
    explanation: 'فعل غير منتظم: find يتحول إلى found في الماضي البسيط (وليس finded).'
  },
  {
    id: 10,
    verb: 'have',
    verbArabic: 'يملك / لديه / يتناول',
    options: ['had', 'has', 'having'],
    correctIndex: 0, // had
    pastForm: 'had',
    explanation: 'فعل غير منتظم: have يتحول إلى had في الماضي البسيط لجميع الضمائر.'
  }
];
