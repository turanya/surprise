
export type ScreenView = 'welcome' | 'letters' | 'cake' | 'final';

export interface LoveLetter {
  id: number;
  text: string;
  category: string; // e.g., "Memories That Shaped Us"
  categorySymbol: string; // e.g., "🌠"
}

export interface LetterCategory {
  name: string;
  symbol: string;
  total: number; // Total letters in this category
}

// For LoveLettersScreen component state
export type LoveLetterViewMode = 'categories' | 'letters' | 'finalLetterPending' | 'finalLetterOpen' | 'allComplete';
