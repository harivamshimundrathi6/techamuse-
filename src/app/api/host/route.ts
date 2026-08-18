import { NextResponse } from 'next/server';
import { getGameState, saveGameState } from '@/lib/db';

export async function POST(req: Request) {
  const { action, payload } = await req.json();
  const state = getGameState();

  switch (action) {
    case 'startRound':
      state.gameState = 'playing';
      state.roundStartTime = Date.now();
      
      // Reset player answer status for the new round
      Object.keys(state.players).forEach(id => {
        state.players[id].hasAnsweredCurrentRound = false;
        state.players[id].lastAnswerCorrect = false;
      });
      break;

    case 'showResult':
      state.gameState = 'round_result';
      break;

    case 'nextRound':
      if (state.currentRoundIndex + 1 >= state.totalRounds) {
        state.gameState = 'finished';
      } else {
        state.currentRoundIndex++;
        state.gameState = 'waiting'; // Wait for host to explicitly start next round
      }
      break;

    case 'resetGame':
      state.gameState = 'waiting';
      state.currentRoundIndex = 0;
      state.roundStartTime = null;
      state.players = {}; // Kick all players or keep them? Let's kick them for simplicity
      break;

    default:
      return NextResponse.json({ error: 'Unknown action' }, { status: 400 });
  }

  saveGameState(state);
  return NextResponse.json({ success: true, state });
}
