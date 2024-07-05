export interface GameState {
  guesses: string[];
  startTime: number;
  isComplete: boolean;
}

export interface GameResult {
  word: string;
  guesses: number;
  won: boolean;
  date: string;
}

export interface WordleStorage {
  currentGames: { [word: string]: GameState };
  clearedGames: GameResult[];
  stats: {
    totalPlays: number;
    wins: number;
    guessDistribution: { [key: number]: number };
  };
}

const STORAGE_KEY = "wordleGameStates";

function getWordleStorage(): WordleStorage {
  if (typeof window !== "undefined") {
    const storage = localStorage.getItem(STORAGE_KEY);
    if (storage) {
      const parsedStorage = JSON.parse(storage);
      // 필요한 모든 키가 있는지 확인하고, 없으면 기본값 제공
      return {
        currentGames: parsedStorage.currentGames || {},
        clearedGames: parsedStorage.clearedGames || [],
        stats: parsedStorage.stats || {
          totalPlays: 0,
          wins: 0,
          guessDistribution: {},
        },
      };
    }
  }
  return {
    currentGames: {},
    clearedGames: [],
    stats: {
      totalPlays: 0,
      wins: 0,
      guessDistribution: {},
    },
  };
}

function setWordleStorage(storage: WordleStorage): void {
  if (typeof window !== "undefined") {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(storage));
  }
}

export function saveGameState(word: string, state: GameState): void {
  const storage = getWordleStorage();
  storage.currentGames[word] = state;
  setWordleStorage(storage);
}

export function loadGameState(word: string): GameState | null {
  const storage = getWordleStorage();
  return storage.currentGames && storage.currentGames[word]
    ? storage.currentGames[word]
    : null;
}

export function clearCurrentGameState(word: string): void {
  const storage = getWordleStorage();
  if (storage.currentGames && storage.currentGames[word]) {
    delete storage.currentGames[word];
  }
  setWordleStorage(storage);
}

export function updateGameStats(
  word: string,
  won: boolean,
  guesses: number
): void {
  const storage = getWordleStorage();
  const result: GameResult = {
    word,
    guesses,
    won,
    date: new Date().toISOString(),
  };

  storage.clearedGames.push(result);
  delete storage.currentGames[word];

  const stats = storage.stats;
  stats.totalPlays++;
  if (won) {
    stats.wins++;
  }

  stats.guessDistribution[guesses] =
    (stats.guessDistribution[guesses] || 0) + 1;

  setWordleStorage(storage);
}

export function getGameStats(): WordleStorage["stats"] {
  return getWordleStorage().stats;
}

export function startNewGame(word: string): GameState {
  clearCurrentGameState(word);
  const newState: GameState = {
    guesses: [],
    startTime: Date.now(),
    isComplete: false,
  };
  saveGameState(word, newState);
  return newState;
}

export function getGameDuration(startTime: number): string {
  return formatTime(Math.floor((Date.now() - startTime) / 1000));
}

const formatTime = (ms: number): string => {
  const seconds = Math.floor(ms / 1000);
  const minutes = Math.floor(seconds / 60);
  return `${minutes}:${(seconds % 60).toString().padStart(2, "0")}`;
};
