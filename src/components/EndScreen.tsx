'use client';

import { motion } from 'framer-motion';
import { useGameStore } from '@/store/useGameStore';
import { Trophy, Share2, RotateCcw, Medal } from 'lucide-react';
import Leaderboard from './Leaderboard';

export default function EndScreen() {
  const { totalRounds, playerName, playerRoll, players, playerId } = useGameStore();
  const player = playerId ? players[playerId] : null;
  const score = player?.score || 0;
  
  // Basic rank calculation
  const maxPossibleScore = totalRounds * 100 + totalRounds * 100 + (totalRounds * 50); // rough max
  const percentage = Math.min(100, Math.max(0, (score / 2000) * 100)); // normalized against an arbitrary 'good' score
  
  let rank = "Easily Fooled Mortal";
  let color = "text-gray-400";
  
  if (score > 1500) {
    rank = "Zero-G Visionary";
    color = "text-cyan-400";
  } else if (score > 800) {
    rank = "AI Detective";
    color = "text-purple-400";
  }

  return (
    <div className="w-full max-w-3xl mx-auto px-4 py-12 flex flex-col items-center justify-center min-h-[80vh]">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full glass-panel rounded-3xl p-10 text-center relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-cyan-400 to-purple-600" />
        
        <Trophy className="w-20 h-20 text-yellow-400 mx-auto mb-6 drop-shadow-[0_0_15px_rgba(250,204,21,0.5)]" />
        
        <h2 className="text-xl text-gray-400 uppercase tracking-widest font-bold mb-2">Challenge Complete</h2>
        <p className="text-cyan-300 font-mono mb-4">{playerName} {playerRoll ? `(#${playerRoll})` : ''}</p>
        
        <div className="text-6xl font-black text-white font-mono mb-8 neon-text">
          {score.toLocaleString()}
          <span className="text-xl text-cyan-500 ml-2">PTS</span>
        </div>
        
        <div className="bg-black/40 rounded-2xl p-6 border border-white/10 mb-8 inline-block min-w-[300px]">
          <div className="flex items-center justify-center space-x-3 mb-2">
            <Medal className={`w-6 h-6 ${color}`} />
            <span className="text-gray-400 uppercase tracking-wider text-sm">Performance Badge</span>
          </div>
          <div className={`text-2xl font-bold tracking-wide ${color} ${color === 'text-cyan-400' ? 'neon-text' : color === 'text-purple-400' ? 'neon-text-purple' : ''}`}>
            {rank}
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button className="flex items-center justify-center space-x-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white px-8 py-3 rounded-full font-bold tracking-wider transition-all shadow-[0_0_15px_rgba(139,92,246,0.4)]">
            <Share2 className="w-5 h-5" />
            <span>SHARE RESULT</span>
          </button>
        </div>
        
        <div className="mt-12 pt-8 border-t border-white/10">
          <Leaderboard />
        </div>
      </motion.div>
    </div>
  );
}
