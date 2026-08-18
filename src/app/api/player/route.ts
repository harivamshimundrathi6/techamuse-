import { NextResponse } from 'next/server';
import { getGameState, saveGameState } from '@/lib/db';
import crypto from 'crypto';

export async function POST(req: Request) {
  const { action, payload } = await req.json();
  const state = getGameState();

  switch (action) {
    case 'joinGame': {
      const { name, roll } = payload;
      const id = crypto.randomUUID();
      
      state.players[id] = {
        id,
        name,
        roll,
        score: 0,
        streak: 0,
        hasAnsweredCurrentRound: false,
        lastAnswerCorrect: false
      };
      
      saveGameState(state);
      return NextResponse.json({ success: true, playerId: id, state });
    }

    case 'submitAnswer': {
      const { playerId, isCorrect, timeLeft } = payload;
      
      if (state.gameState !== 'playing') {
        return NextResponse.json({ error: 'Round not active' }, { status: 400 });
      }

      const player = state.players[playerId];
      if (!player) {
        return NextResponse.json({ error: 'Player not found' }, { status: 404 });
      }

      if (player.hasAnsweredCurrentRound) {
        return NextResponse.json({ success: true }); // Already answered
      }

      player.hasAnsweredCurrentRound = true;
      player.lastAnswerCorrect = isCorrect;
      
      if (isCorrect) {
        const basePoints = 100;
        const timeBonus = timeLeft * 10;
        const streakBonus = player.streak * 50;
        player.score += basePoints + timeBonus + streakBonus;
        player.streak += 1;
      } else {
        player.streak = 0;
      }

      saveGameState(state);
      return NextResponse.json({ success: true, state });
    }

    default:
      return NextResponse.json({ error: 'Unknown action' }, { status: 400 });
  }
}
