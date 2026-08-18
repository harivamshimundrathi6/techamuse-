import fs from 'fs';
import path from 'path';

export type GameState = 'waiting' | 'playing' | 'round_result' | 'finished';

export interface Player {
  id: string;
  name: string;
  roll: string;
  score: number;
  streak: number;
  hasAnsweredCurrentRound: boolean;
  lastAnswerCorrect: boolean;
}

export interface GlobalGameState {
  gameState: GameState;
  currentRoundIndex: number;
  totalRounds: number;
  roundStartTime: number | null;
  players: Record<string, Player>;
}

const dbPath = path.join(process.cwd(), 'game_state.json');

const defaultState: GlobalGameState = {
  gameState: 'waiting',
  currentRoundIndex: 0,
  totalRounds: 3,
  roundStartTime: null,
  players: {}
};

export function getGameState(): GlobalGameState {
  try {
    if (fs.existsSync(dbPath)) {
      const data = fs.readFileSync(dbPath, 'utf8');
      return JSON.parse(data) as GlobalGameState;
    }
  } catch (error) {
    console.error('Error reading DB', error);
  }
  return defaultState;
}

export function saveGameState(state: GlobalGameState) {
  try {
    fs.writeFileSync(dbPath, JSON.stringify(state, null, 2), 'utf8');
  } catch (error) {
    console.error('Error writing DB', error);
  }
}

export function resetGameState() {
  saveGameState(defaultState);
}
