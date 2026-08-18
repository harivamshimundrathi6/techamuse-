'use client';

import { motion } from 'framer-motion';
import { Trophy, Crown } from 'lucide-react';
import { useGameStore } from '@/store/useGameStore';

export default function Leaderboard() {
  const { players, playerId, playerName, playerRoll } = useGameStore();
  
  // Convert players object to array and sort by score
  const sortedPlayers = Object.values(players)
    .sort((a, b) => b.score - a.score)
    .map((p, index) => ({
      ...p,
      rank: index + 1
    }));
    
  const topPlayers = sortedPlayers.slice(0, 5);
  
  // Find current user's rank
  let currentUserRank = null;
  let currentUserScore = 0;
  
  if (playerId) {
    const me = sortedPlayers.find(p => p.id === playerId);
    if (me) {
      currentUserRank = me.rank;
      currentUserScore = me.score;
    }
  }

  return (
    <div className="w-full mt-8">
      <div className="flex items-center justify-center space-x-3 mb-6">
        <Trophy className="w-6 h-6 text-cyan-400" />
        <h3 className="text-2xl font-bold text-white tracking-widest uppercase">Live Leaderboard</h3>
      </div>
      
      <div className="space-y-3">
        {topPlayers.length === 0 ? (
          <div className="text-center text-gray-500">No players found.</div>
        ) : (
          topPlayers.map((player, index) => (
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              key={player.id}
              className={`flex items-center justify-between bg-black/40 border ${player.id === playerId ? 'border-cyan-400' : 'border-white/10'} rounded-xl p-4 transition-colors`}
            >
              <div className="flex items-center space-x-4">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm
                  ${player.rank === 1 ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500' : 
                    player.rank === 2 ? 'bg-gray-300/20 text-gray-300 border border-gray-400' : 
                    player.rank === 3 ? 'bg-orange-700/20 text-orange-400 border border-orange-700' : 
                    'bg-white/5 text-gray-500'}`}
                >
                  {player.rank === 1 ? <Crown className="w-4 h-4" /> : player.rank}
                </div>
                <span className="font-bold text-gray-200">
                  {player.name} {player.roll && <span className="text-xs text-gray-400 ml-1">#{player.roll}</span>}
                  {player.id === playerId && <span className="ml-2 text-xs bg-cyan-400/20 text-cyan-400 px-2 py-0.5 rounded">YOU</span>}
                </span>
              </div>
              <div className="font-mono text-cyan-400 font-bold">
                {player.score.toLocaleString()} <span className="text-xs text-gray-500">PTS</span>
              </div>
            </motion.div>
          ))
        )}
        
        {/* If current user is not in top 5, show them at the bottom */}
        {playerId && currentUserRank && currentUserRank > 5 && (
          <>
            <div className="text-center text-gray-600 my-2">•••</div>
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex items-center justify-between bg-cyan-900/30 border border-cyan-400 neon-border rounded-xl p-4"
            >
              <div className="flex items-center space-x-4">
                <div className="w-8 h-8 rounded-full bg-cyan-400/20 flex items-center justify-center font-bold text-sm text-cyan-400 border border-cyan-400">
                  {currentUserRank}
                </div>
                <span className="font-bold text-white">
                  {playerName || 'YOU'} {playerRoll && <span className="text-xs text-gray-400 ml-1">#{playerRoll}</span>}
                </span>
              </div>
              <div className="font-mono text-cyan-400 font-bold">
                {currentUserScore.toLocaleString()} <span className="text-xs text-cyan-500">PTS</span>
              </div>
            </motion.div>
          </>
        )}
      </div>
    </div>
  );
}
