export interface Question {
  id: number;
  verb: string;
  verbArabic: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  pastForm: string;
}

export type QuizStatus = 'start' | 'playing' | 'result';

export interface AnswerRecord {
  questionIndex: number;
  selectedOptionIndex: number | null; // null if timed out
  isCorrect: boolean;
  timeSpent: number;
}
