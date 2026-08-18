'use client';

import { useEffect } from 'react';
import { useGameStore } from '@/store/useGameStore';
import { Shield, Play, FastForward, RotateCcw, Eye } from 'lucide-react';

export default function HostDashboard() {
  const store = useGameStore();

  useEffect(() => {
    store.initListener();
  }, []);

  const players = Object.values(store.players || {});
  const answeredCount = players.filter(p => p.hasAnsweredCurrentRound).length;
  
  const logicalRound = Math.floor(store.currentRoundIndex / 3) + 1;
  const logicalQuestion = (store.currentRoundIndex % 3) + 1;

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
            <div className="text-2xl font-bold text-cyan-400 capitalize">{store.gameState.replace('_', ' ')}</div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {/* Controls */}
          <div className="col-span-1 glass-panel p-6 rounded-2xl flex flex-col gap-4">
            <h2 className="text-xl font-bold mb-2">Controls</h2>
            
            <button 
              onClick={store.hostStartRound}
              disabled={store.gameState === 'playing' || store.gameState === 'finished'}
              className="flex items-center justify-center space-x-2 bg-green-600 hover:bg-green-500 disabled:opacity-50 disabled:cursor-not-allowed py-3 rounded-lg font-bold transition-colors"
            >
              <Play className="w-5 h-5" /> <span>Start Round {logicalRound}, Q{logicalQuestion}</span>
            </button>
            
            <button 
              onClick={store.hostShowResult}
              disabled={store.gameState !== 'playing'}
              className="flex items-center justify-center space-x-2 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed py-3 rounded-lg font-bold transition-colors"
            >
              <Eye className="w-5 h-5" /> <span>Show Results</span>
            </button>
            
            <button 
              onClick={store.hostNextRound}
              disabled={store.gameState !== 'round_result'}
              className="flex items-center justify-center space-x-2 bg-purple-600 hover:bg-purple-500 disabled:opacity-50 disabled:cursor-not-allowed py-3 rounded-lg font-bold transition-colors"
            >
              <FastForward className="w-5 h-5" /> <span>Next Question</span>
            </button>

            <div className="mt-auto pt-8">
              <button 
                onClick={store.hostResetGame}
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
              {store.gameState === 'playing' && (
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
                      {store.gameState === 'playing' && (
                        p.hasAnsweredCurrentRound ? 
                          <span className="text-green-400 text-sm bg-green-400/10 px-2 py-1 rounded">Locked In</span> : 
                          <span className="text-yellow-400 text-sm animate-pulse">Thinking...</span>
                      )}
                      {store.gameState === 'round_result' && (
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
