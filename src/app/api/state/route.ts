import { NextResponse } from 'next/server';
import { getGameState } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET() {
  const state = getGameState();
  
  // Calculate remaining time for the round if active
  let timeLeft = 0;
  if (state.gameState === 'playing' && state.roundStartTime) {
    const elapsed = Math.floor((Date.now() - state.roundStartTime) / 1000);
    timeLeft = Math.max(0, 10 - elapsed);
    
    // Auto transition to result if time is up, but we handle that in the host polling or a host action.
    // For now, just return 0 if elapsed > 10.
  }
  
  return NextResponse.json({ ...state, timeLeft });
}
