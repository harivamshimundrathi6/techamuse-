'use client';

import { useEffect, useState } from 'react';
import { GlobalGameState } from '@/lib/db';
import { Shield, Play, FastForward, RotateCcw, Eye } from 'lucide-react';

export default function HostDashboard() {
  const [state, setState] = useState<GlobalGameState | null>(null);

  useEffect(() => {
    const fetchState = async () => {
      const res = await fetch('/api/state');
      const data = await res.json();
      setState(data);
    };
    
    fetchState();
    const interval = setInterval(fetchState, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleAction = async (action: string) => {
    await fetch('/api/host', {
      method: 'POST',
      body: JSON.stringify({ action }),
      headers: { 'Content-Type': 'application/json' }
    });
  };

  if (!state) return <div className="p-10 text-white">Loading Host Dashboard...</div>;

  const players = Object.values(state.players);
  const answeredCount = players.filter(p => p.hasAnsweredCurrentRound).length;

  return (
    <div className="min-h-screen bg-[#0B0F19] text-white p-8">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-12 border-b border-white/10 pb-6">
          <div className="flex items-center space-x-4">
            <Shield className="w-10 h-10 text-cyan-400" />
            <div>
              <h1 className="text-3xl font-bold tracking-widest">HOST DASHBOARD</h1>
              <p className="text-gray-400">TECHAMUSE Antigravity Challenge</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm text-gray-400 uppercase">Status</div>
            <div className="text-2xl font-bold text-cyan-400 capitalize">{state.gameState.replace('_', ' ')}</div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {/* Controls */}
          <div className="col-span-1 glass-panel p-6 rounded-2xl flex flex-col gap-4">
            <h2 className="text-xl font-bold mb-2">Controls</h2>
            
            <button 
              onClick={() => handleAction('startRound')}
              disabled={state.gameState === 'playing' || state.gameState === 'finished'}
              className="flex items-center justify-center space-x-2 bg-green-600 hover:bg-green-500 disabled:opacity-50 disabled:cursor-not-allowed py-3 rounded-lg font-bold transition-colors"
            >
              <Play className="w-5 h-5" /> <span>Start Round {state.currentRoundIndex + 1}</span>
            </button>
            
            <button 
              onClick={() => handleAction('showResult')}
              disabled={state.gameState !== 'playing'}
              className="flex items-center justify-center space-x-2 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed py-3 rounded-lg font-bold transition-colors"
            >
              <Eye className="w-5 h-5" /> <span>Show Results</span>
            </button>
            
            <button 
              onClick={() => handleAction('nextRound')}
              disabled={state.gameState !== 'round_result'}
              className="flex items-center justify-center space-x-2 bg-purple-600 hover:bg-purple-500 disabled:opacity-50 disabled:cursor-not-allowed py-3 rounded-lg font-bold transition-colors"
            >
              <FastForward className="w-5 h-5" /> <span>Next Round</span>
            </button>

            <div className="mt-auto pt-8">
              <button 
                onClick={() => handleAction('resetGame')}
                className="w-full flex items-center justify-center space-x-2 bg-red-600/20 hover:bg-red-600 border border-red-600/50 py-3 rounded-lg font-bold text-red-500 hover:text-white transition-colors"
              >
                <RotateCcw className="w-5 h-5" /> <span>Reset & Kick All</span>
              </button>
            </div>
          </div>

          {/* Player List */}
          <div className="col-span-2 glass-panel p-6 rounded-2xl">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">Connected Players ({players.length})</h2>
              {state.gameState === 'playing' && (
                <div className="bg-cyan-900/50 border border-cyan-400 px-4 py-1 rounded-full text-cyan-400 font-bold text-sm">
                  Answered: {answeredCount} / {players.length}
                </div>
              )}
            </div>

            <div className="space-y-2 max-h-[500px] overflow-y-auto pr-2">
              {players.length === 0 ? (
                <div className="text-center text-gray-500 py-10">Waiting for players to join...</div>
              ) : (
                players.sort((a,b) => b.score - a.score).map((p, i) => (
                  <div key={p.id} className="flex items-center justify-between bg-black/40 p-3 rounded-lg border border-white/5">
                    <div className="flex items-center space-x-4">
                      <div className="w-6 h-6 rounded bg-white/10 flex items-center justify-center text-xs text-gray-400">
                        {i + 1}
                      </div>
                      <div>
                        <div className="font-bold">{p.name} <span className="text-xs text-gray-500 ml-1">#{p.roll}</span></div>
                        <div className="text-xs text-cyan-400">{p.score} PTS</div>
                      </div>
                    </div>
                    <div>
                      {state.gameState === 'playing' && (
                        p.hasAnsweredCurrentRound ? 
                          <span className="text-green-400 text-sm bg-green-400/10 px-2 py-1 rounded">Locked In</span> : 
                          <span className="text-yellow-400 text-sm animate-pulse">Thinking...</span>
                      )}
                      {state.gameState === 'round_result' && (
                        p.lastAnswerCorrect ? 
                          <span className="text-green-400 font-bold">Correct</span> : 
                          <span className="text-red-400 font-bold">Wrong</span>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
