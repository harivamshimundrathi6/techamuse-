'use client';

import { motion } from 'framer-motion';
import { useGameStore } from '@/store/useGameStore';
import { CheckCircle, XCircle, Trophy } from 'lucide-react';

export default function ResultModal() {
  const { players, playerId, currentRoundIndex, currentQuestionIndexInRound } = useGameStore();
  const player = playerId ? players[playerId] : null;
  
  let correctCount = 0;
  let totalAnswered = 0;
  for (let q = 0; q < 5; q++) {
    const ans = player?.answers?.[`r${currentRoundIndex}_q${q}`];
    if (ans !== undefined) totalAnswered++;
    if (ans === true) correctCount++;
  }
  
  const isGood = correctCount >= 3;
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
      />
      
      {/* Modal Content */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className={`relative w-full max-w-lg glass-panel rounded-3xl overflow-hidden ${isGood ? 'neon-border' : 'border border-purple-500/50 shadow-[0_0_15px_rgba(168,85,247,0.3)]'}`}
      >
        <div className={`h-2 w-full ${isGood ? 'bg-cyan-400' : 'bg-purple-500'}`} />
        
        <div className="p-8 text-center">
          {/* Header Status */}
          <div className="flex flex-col items-center justify-center space-y-4 mb-8">
            {isGood ? (
              <div className="w-20 h-20 rounded-full bg-cyan-400/20 flex items-center justify-center neon-border">
                <Trophy className="w-10 h-10 text-cyan-400" />
              </div>
            ) : (
              <div className="w-20 h-20 rounded-full bg-purple-500/20 flex items-center justify-center border border-purple-500">
                <XCircle className="w-10 h-10 text-purple-500" />
              </div>
            )}
            <div>
              <h2 className="text-3xl font-bold text-white tracking-wider">
                ROUND {currentRoundIndex + 1} COMPLETE
              </h2>
              <p className="text-gray-400 mt-2 text-lg">
                {isGood ? 'Excellent deduction skills!' : 'The AI was too tricky this time.'}
              </p>
            </div>
          </div>
          
          <div className="space-y-6">
            <div className="bg-white/5 rounded-xl p-6 border border-white/10">
              <h4 className="text-gray-400 font-bold uppercase text-sm tracking-wider mb-2">Your Score</h4>
              <div className="text-5xl font-black text-white neon-text mb-2">
                {correctCount} <span className="text-3xl text-gray-500">/ 5</span>
              </div>
              <p className="text-cyan-400 font-mono">You answered {totalAnswered} questions.</p>
            </div>
          </div>
          
          <div className="mt-8 flex justify-center">
            <div className="text-center text-gray-400 flex items-center justify-center space-x-2">
              <div className="w-4 h-4 rounded-full border-2 border-cyan-400 border-t-transparent animate-spin" />
              <span>Waiting for Host to start next round...</span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

