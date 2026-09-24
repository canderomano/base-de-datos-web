export type ModuleId = 1|2|3|4|5|6;

export interface Concept {
  id: string;
  moduleId: number;
  title: string;
  theory: string;
  detail?: string;
  sqlExample: string;
  explanation: string;
  errors: string[];
  tip: string;
}

export interface Module {
  id: number;
  title: string;
  shortTitle: string;
  description: string;
  icon: string;
  color: string;
  concepts: Concept[];
}

export interface Flashcard {
  id: string;
  moduleId: number;
  question: string;
  answer: string;
  tag: string;
}

export type QuestionType = 'multiple' | 'truefalse' | 'choose_query' | 'interpret';

export interface Question {
  id: string;
  moduleId: number;
  type: QuestionType;
  question: string;
  code?: string;
  options: string[];
  correct: number;
  explanation: string;
  whyIncorrect?: string[];
}

export interface Exercise {
  id: string;
  moduleId: number;
  title: string;
  instructions: string;
  starterCode: string;
  expected: string;
  resultHeaders: string[];
  resultRows: string[][];
  hint: string;
  difficulty: 'Facil'|'Medio'|'Dificil';
}

export interface CommonError {
  id: string;
  title: string;
  moduleId: number;
  description: string;
  incorrect: string;
  correct: string;
  explanation: string;
}

export interface Achievement {
  id: string;
  title: string;
  desc: string;
  icon: string;
  xp: number;
}

export interface Progress {
  completedConcepts: string[];
  flashcardRatings: Record<string, 'facil'|'normal'|'dificil'>;
  answeredQuestions: Record<string, boolean>;
  correctQuestions: string[];
  completedExercises: string[];
  favorites: { concepts: string[]; flashcards: string[]; examples: string[] };
  xp: number;
  streak: number;
  lastActivity: string;
  studiedCards: number;
  answeredCount: number;
}

export type View = 'dashboard'|'modules'|'module-detail'|'flashcards'|'quiz'|'lab'|'simulacro'|'session'|'review'|'favorites'|'errors'|'search'|'evaluative';
