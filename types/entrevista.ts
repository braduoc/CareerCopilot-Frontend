export type QuestionCategory = "technical" | "behavioral" | "situational";

export interface InterviewQuestion {
  id: string;
  category: QuestionCategory;
  question: string;
  contextOrTips?: string;
}

export interface AnswerFeedback {
  score: number; // 0 - 100
  strengths: string[];
  areasForImprovement: string[];
  suggestedAnswer: string;
}

export interface InterviewSessionConfig {
  jobTitle: string;
  category: QuestionCategory | "mixed";
  numberOfQuestions: number;
}