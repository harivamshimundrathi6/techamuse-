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
  answers: Record<string, boolean>;
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
  currentQuestionIndexInRound: number;
  
  initListener: () => void;
  joinGame: (name: string, roll: string) => void;
  submitAnswer: (isCorrect: boolean, rIdx: number, qIdx: number) => void;
  
  hostStartRound: () => void;
  hostShowResult: () => void;
  hostNextRound: () => void;
  hostResetGame: () => void;
}

const defaultGlobalState: GlobalGameState = {
  gameState: 'waiting',
  currentRoundIndex: 0,
  totalRounds: 3,
  roundStartTime: null,
  players: {}
};

let unsubFirebase: (() => void) | null = null;
let timeInterval: NodeJS.Timeout | null = null;

export const useGameStore = create<GameStore>((set, get) => ({
  ...defaultGlobalState,
  
  playerId: null,
  playerName: '',
  playerRoll: '',
  timeLeft: 0,
  currentQuestionIndexInRound: 0,

  initListener: () => {
    if (unsubFirebase) return;

    const gameRef = ref(db, 'game');
    const unsub = onValue(gameRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        let timeLeft = 0;
        let currentQuestionIndexInRound = 0;
        
        if (data.gameState === 'playing' && data.roundStartTime) {
          const elapsedMs = Date.now() - data.roundStartTime;
          const qIdx = Math.floor(elapsedMs / 10000);
          if (qIdx >= 5) {
            currentQuestionIndexInRound = 5;
            timeLeft = 0;
          } else {
            currentQuestionIndexInRound = qIdx;
            timeLeft = Math.ceil((10000 - (elapsedMs % 10000)) / 1000);
          }
        }

        set({
          gameState: data.gameState || 'waiting',
          currentRoundIndex: data.currentRoundIndex || 0,
          totalRounds: data.totalRounds || 3,
          roundStartTime: data.roundStartTime || null,
          players: data.players || {},
          timeLeft,
          currentQuestionIndexInRound
        });
      }
    });
    
    unsubFirebase = unsub;
    
    if (timeInterval) clearInterval(timeInterval);
    timeInterval = setInterval(() => {
      const state = get();
      if (state.gameState === 'playing' && state.roundStartTime) {
        const elapsedMs = Date.now() - state.roundStartTime;
        const qIdx = Math.floor(elapsedMs / 10000);
        if (qIdx >= 5) {
          set({ currentQuestionIndexInRound: 5, timeLeft: 0 });
        } else {
          const msLeftInQ = 10000 - (elapsedMs % 10000);
          set({ 
            currentQuestionIndexInRound: qIdx, 
            timeLeft: Math.ceil(msLeftInQ / 1000) 
          });
        }
      }
    }, 200);
  },

  joinGame: (name, roll) => {
    const id = crypto.randomUUID();
    const newPlayer: Player = {
      id,
      name,
      roll,
      score: 0,
      streak: 0,
      answers: {}
    };
    
    set({ playerId: id, playerName: name, playerRoll: roll });
    update(ref(db, `game/players/${id}`), newPlayer);
  },

  submitAnswer: (isCorrect, rIdx, qIdx) => {
    const { playerId, timeLeft, players } = get();
    if (!playerId) return;
    
    const player = players[playerId];
    const ansKey = `r${rIdx}_q${qIdx}`;
    
    if (!player || player.answers?.[ansKey] !== undefined) return;

    let newScore = player.score;
    let newStreak = player.streak;

    if (isCorrect) {
      newScore += 100 + (timeLeft * 10) + (player.streak * 50);
      newStreak += 1;
    } else {
      newStreak = 0;
    }

    const updates: any = {
      score: newScore,
      streak: newStreak
    };
    updates[`answers/${ansKey}`] = isCorrect;

    update(ref(db, `game/players/${playerId}`), updates);
  },

  hostStartRound: () => {
    update(ref(db), {
      'game/gameState': 'playing',
      'game/roundStartTime': Date.now(),
    });
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
