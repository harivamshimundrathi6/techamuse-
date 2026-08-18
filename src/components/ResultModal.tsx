'use client';

import { motion } from 'framer-motion';
import { useGameStore } from '@/store/useGameStore';
import { mockChallenges } from '@/data/mockChallenges';
import { CheckCircle, XCircle, ArrowRight, Info, Users } from 'lucide-react';

export default function ResultModal() {
  const { players, playerId, currentRoundIndex } = useGameStore();
  const player = playerId ? players[playerId] : null;
  
  // In multiplayer, the host controls nextRound, so we remove the button here
  // and calculate correctness from player state
  const challenge = mockChallenges[currentRoundIndex];
  
  // Since we only transition to this state when an answer is given,
  // we know the current streak state reflects if they got it right.
  // Actually, better to track if last answer was correct in store, but we can infer:
  const isCorrect = player?.lastAnswerCorrect || false;
  
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
        className={`relative w-full max-w-2xl glass-panel rounded-3xl overflow-hidden ${isCorrect ? 'neon-border' : 'border border-red-500/50 shadow-[0_0_15px_rgba(239,68,68,0.3)]'}`}
      >
        <div className={`h-2 w-full ${isCorrect ? 'bg-cyan-400' : 'bg-red-500'}`} />
        
        <div className="p-8">
          {/* Header Status */}
          <div className="flex items-center space-x-4 mb-8">
            {isCorrect ? (
              <div className="w-16 h-16 rounded-full bg-cyan-400/20 flex items-center justify-center neon-border">
                <CheckCircle className="w-8 h-8 text-cyan-400" />
              </div>
            ) : (
              <div className="w-16 h-16 rounded-full bg-red-500/20 flex items-center justify-center border border-red-500">
                <XCircle className="w-8 h-8 text-red-500" />
              </div>
            )}
            <div>
              <h2 className="text-3xl font-bold text-white tracking-wider">
                {isCorrect ? 'AI DETECTED!' : 'FOOLED BY AI!'}
              </h2>
              <p className="text-gray-400">
                {isCorrect ? 'Your eyes are sharp. That was definitely synthetic.' : 'The machines tricked you this time.'}
              </p>
            </div>
          </div>
          
          <div className="space-y-6">
            {/* The Reveal */}
            <div className="bg-white/5 rounded-xl p-5 border border-white/10">
              <div className="flex items-start space-x-3">
                <Info className="w-5 h-5 text-purple-400 mt-0.5 shrink-0" />
                <div>
                  <h4 className="text-purple-400 font-bold uppercase text-sm tracking-wider mb-1">The Giveaway</h4>
                  <p className="text-gray-200">{challenge.aiImage.giveawayClue}</p>
                </div>
              </div>
            </div>
            
            {/* Real Context */}
            <div className="bg-white/5 rounded-xl p-5 border border-white/10">
              <h4 className="text-cyan-400 font-bold uppercase text-sm tracking-wider mb-1">Real Photo Context</h4>
              <p className="text-gray-200">{challenge.realImage.context}</p>
            </div>
            
            {/* Community Stats */}
            <div className="flex items-center justify-between border-t border-white/10 pt-6 mt-6">
              <div className="flex items-center space-x-2 text-gray-400">
                <Users className="w-5 h-5" />
                <span className="text-sm">Community Accuracy</span>
              </div>
              <div className="text-xl font-bold text-white">
                {challenge.globalStats.aiGuessedPercent}% <span className="text-gray-500 text-sm font-normal">got it right</span>
              </div>
            </div>
          </div>
          
          {/* Actions */}
          <div className="mt-8 flex justify-end">
            <div className="mt-8 text-center text-gray-400 flex items-center justify-center space-x-2">
          <div className="w-4 h-4 rounded-full border-2 border-cyan-400 border-t-transparent animate-spin" />
          <span>Waiting for Host to start next round...</span>
        </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
