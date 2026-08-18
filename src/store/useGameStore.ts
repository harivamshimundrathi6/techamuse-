import { create } from 'zustand';
import { db } from '@/lib/firebase';
import { ref, onValue, set as firebaseSet, update } from 'firebase/database';

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

interface GameStore extends GlobalGameState {
  playerId: string | null;
  playerName: string;
  playerRoll: string;
  timeLeft: number;
  
  initListener: () => void;
  joinGame: (name: string, roll: string) => void;
  submitAnswer: (isCorrect: boolean) => void;
  
  // Host actions
  hostStartRound: () => void;
  hostShowResult: () => void;
  hostNextRound: () => void;
  hostResetGame: () => void;
}

const defaultGlobalState: GlobalGameState = {
  gameState: 'waiting',
  currentRoundIndex: 0,
  totalRounds: 9,
  roundStartTime: null,
  players: {}
};

let unsubFirebase: (() => void) | null = null;

export const useGameStore = create<GameStore>((set, get) => ({
  ...defaultGlobalState,
  
  playerId: null,
  playerName: '',
  playerRoll: '',
  timeLeft: 0,

  initListener: () => {
    if (unsubFirebase) return; // already listening

    const gameRef = ref(db, 'game');
    const unsub = onValue(gameRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        // Calculate time left if playing
        let timeLeft = 0;
        if (data.gameState === 'playing' && data.roundStartTime) {
          const elapsed = Math.floor((Date.now() - data.roundStartTime) / 1000);
          timeLeft = Math.max(0, 10 - elapsed);
        }

        set({
          gameState: data.gameState || 'waiting',
          currentRoundIndex: data.currentRoundIndex || 0,
          totalRounds: data.totalRounds || 9,
          roundStartTime: data.roundStartTime || null,
          players: data.players || {},
          timeLeft
        });
      }
    });
    
    unsubFirebase = unsub;
    
    // Also set up a local interval just to tick the timeLeft smoothly if playing
    setInterval(() => {
      const state = get();
      if (state.gameState === 'playing' && state.roundStartTime) {
        const elapsed = Math.floor((Date.now() - state.roundStartTime) / 1000);
        set({ timeLeft: Math.max(0, 10 - elapsed) });
      }
    }, 1000);
  },

  joinGame: (name, roll) => {
    const id = crypto.randomUUID();
    const newPlayer: Player = {
      id,
      name,
      roll,
      score: 0,
      streak: 0,
      hasAnsweredCurrentRound: false,
      lastAnswerCorrect: false
    };
    
    // Save to firebase
    set({ playerId: id, playerName: name, playerRoll: roll });
    update(ref(db, `game/players/${id}`), newPlayer);
  },

  submitAnswer: (isCorrect) => {
    const { playerId, timeLeft, players } = get();
    if (!playerId) return;
    
    const player = players[playerId];
    if (!player || player.hasAnsweredCurrentRound) return;

    let newScore = player.score;
    let newStreak = player.streak;

    if (isCorrect) {
      newScore += 100 + (timeLeft * 10) + (player.streak * 50);
      newStreak += 1;
    } else {
      newStreak = 0;
    }

    update(ref(db, `game/players/${playerId}`), {
      hasAnsweredCurrentRound: true,
      lastAnswerCorrect: isCorrect,
      score: newScore,
      streak: newStreak
    });
  },

  hostStartRound: () => {
    const { players } = get();
    const updates: any = {
      'game/gameState': 'playing',
      'game/roundStartTime': Date.now(),
    };
    
    // Reset answers for all players
    Object.keys(players).forEach(id => {
      updates[`game/players/${id}/hasAnsweredCurrentRound`] = false;
      updates[`game/players/${id}/lastAnswerCorrect`] = false;
    });
    
    update(ref(db), updates);
  },

  hostShowResult: () => {
    update(ref(db, 'game'), { gameState: 'round_result' });
  },

  hostNextRound: () => {
    const { currentRoundIndex, totalRounds } = get();
    if (currentRoundIndex + 1 >= totalRounds) {
      update(ref(db, 'game'), { gameState: 'finished' });
    } else {
      update(ref(db, 'game'), { 
        currentRoundIndex: currentRoundIndex + 1,
        gameState: 'waiting' 
      });
    }
  },

  hostResetGame: () => {
    firebaseSet(ref(db, 'game'), defaultGlobalState);
  }
}));
