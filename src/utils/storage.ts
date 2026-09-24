import type { Progress } from '../types';

const KEY = 'bd2-mastery-progress-v1';
const THEME_KEY = 'bd2-theme';

export const defaultProgress: Progress = {
  completedConcepts: [],
  flashcardRatings: {},
  answeredQuestions: {},
  correctQuestions: [],
  completedExercises: [],
  favorites: { concepts: [], flashcards: [], examples: [] },
  xp: 0,
  streak: 1,
  lastActivity: new Date().toISOString(),
  studiedCards: 0,
  answeredCount: 0,
};

export function loadProgress(): Progress {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return { ...defaultProgress };
    return { ...defaultProgress, ...JSON.parse(raw) };
  } catch { return { ...defaultProgress }; }
}

export function saveProgress(p: Progress) {
  localStorage.setItem(KEY, JSON.stringify(p));
  localStorage.setItem('bd2-last-activity', new Date().toISOString());
}

export function getTheme(): 'light'|'dark' {
  const v = localStorage.getItem(THEME_KEY) as any;
  if (v) return v;
  return 'light';
}
export function setTheme(t:'light'|'dark'){ localStorage.setItem(THEME_KEY, t); }
