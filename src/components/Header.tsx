'use client';

import { useGameStore } from '@/store/useGameStore';
import { Flame, Star, Volume2, VolumeX } from 'lucide-react';
import { useState } from 'react';

export default function Header() {
  const { players, playerId } = useGameStore();
  const player = playerId ? players[playerId] : null;
  const score = player?.score || 0;
  const streak = player?.streak || 0;
  const [soundEnabled, setSoundEnabled] = useState(true);

  return (
    <header className="w-full glass-panel sticky top-0 z-50 flex items-center justify-between px-6 py-4">
      <div className="flex items-center space-x-2">
        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-cyan-400 to-purple-500 flex items-center justify-center neon-border">
          <span className="font-bold text-white text-xs">TA</span>
        </div>
        <div>
          <h1 className="text-xl font-bold tracking-wider text-white">
            TECH<span className="neon-text">AMUSE</span>
          </h1>
        </div>
      </div>
      
      <div className="flex items-center space-x-6">
        <div className="flex items-center space-x-2">
          <Flame className={`w-5 h-5 ${streak >= 3 ? 'text-orange-500 animate-pulse' : streak > 0 ? 'text-orange-400' : 'text-gray-500'}`} />
          <span className="text-sm font-mono font-bold text-gray-200">x{streak}</span>
        </div>
        
        <div className="flex items-center space-x-2">
          <Star className="w-5 h-5 text-yellow-400" />
          <span className="text-sm font-mono font-bold text-gray-200">{score.toLocaleString()}</span>
        </div>
        
        <button 
          onClick={() => setSoundEnabled(!soundEnabled)}
          className="p-2 rounded-full hover:bg-white/10 transition-colors"
        >
          {soundEnabled ? (
            <Volume2 className="w-5 h-5 text-gray-300" />
          ) : (
            <VolumeX className="w-5 h-5 text-gray-500" />
          )}
        </button>
      </div>
    </header>
  );
}
