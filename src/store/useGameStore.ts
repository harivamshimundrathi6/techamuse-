import { create } from 'zustand';
import { GlobalGameState, Player } from '@/lib/db';

interface GameStore extends GlobalGameState {
  playerId: string | null;
  playerName: string;
  playerRoll: string;
  timeLeft: number;
  
  joinGame: (name: string, roll: string) => Promise<void>;
  submitAnswer: (isCorrect: boolean) => Promise<void>;
  syncState: () => Promise<void>;
}

export const useGameStore = create<GameStore>((set, get) => ({
  gameState: 'waiting',
  currentRoundIndex: 0,
  totalRounds: 3,
  roundStartTime: null,
  players: {},
  
  playerId: null,
  playerName: '',
  playerRoll: '',
  timeLeft: 0,

  joinGame: async (name, roll) => {
    const res = await fetch('/api/player', {
      method: 'POST',
      body: JSON.stringify({ action: 'joinGame', payload: { name, roll } }),
      headers: { 'Content-Type': 'application/json' }
    });
    const data = await res.json();
    if (data.success) {
      set({ 
        playerId: data.playerId, 
        playerName: name, 
        playerRoll: roll,
        ...data.state
      });
    }
  },

  submitAnswer: async (isCorrect) => {
    const { playerId, timeLeft } = get();
    if (!playerId) return;

    await fetch('/api/player', {
      method: 'POST',
      body: JSON.stringify({ 
        action: 'submitAnswer', 
        payload: { playerId, isCorrect, timeLeft } 
      }),
      headers: { 'Content-Type': 'application/json' }
    });
    // Immediately sync state after answering
    await get().syncState();
  },

  syncState: async () => {
    try {
      const res = await fetch('/api/state');
      const data = await res.json();
      set({
        gameState: data.gameState,
        currentRoundIndex: data.currentRoundIndex,
        totalRounds: data.totalRounds,
        roundStartTime: data.roundStartTime,
        players: data.players,
        timeLeft: data.timeLeft
      });
    } catch (e) {
      console.error("Failed to sync state");
    }
  }
}));
