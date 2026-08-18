'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useGameStore } from '@/store/useGameStore';
import { mockChallenges } from '@/data/mockChallenges';
import { ZoomIn } from 'lucide-react';

export default function GameArena() {
  const { currentRoundIndex, timeLeft, totalRounds, submitAnswer, gameState, players, playerId } = useGameStore();
  const player = playerId ? players[playerId] : null;
  const hasAnswered = player?.hasAnsweredCurrentRound || false;
  const challenge = mockChallenges[currentRoundIndex];
  const logicalRound = Math.floor(currentRoundIndex / 3) + 1;
  const logicalQuestion = (currentRoundIndex % 3) + 1;
  
  // Randomize which card has AI
  const [aiIsLeft, setAiIsLeft] = useState(true);
  
  useEffect(() => {
    setAiIsLeft(Math.random() > 0.5);
  }, [currentRoundIndex]);
  
  // Server handles time, so we just display timeLeft from server. No need for client-side tickTimer interval here.
  
  const leftImage = aiIsLeft ? challenge.aiImage : challenge.realImage;
  const rightImage = aiIsLeft ? challenge.realImage : challenge.aiImage;
  
  const handleSelect = (isAi: boolean) => {
    if (!hasAnswered) submitAnswer(isAi);
  };
  
  if (!challenge) return null;

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-8 flex flex-col h-full relative">
      {hasAnswered && (
        <div className="absolute inset-0 z-40 bg-black/50 backdrop-blur-sm flex flex-col items-center justify-center rounded-3xl">
          <div className="w-16 h-16 rounded-full border-4 border-cyan-400 border-t-transparent animate-spin mb-4" />
          <h3 className="text-2xl font-bold text-white">Answer Locked In!</h3>
          <p className="text-cyan-400">Waiting for other players...</p>
        </div>
      )}
      {/* Header Info */}
      <div className="flex justify-between items-center mb-6">
        <div className="text-cyan-400 font-mono flex items-center space-x-2">
          <span className="bg-white/10 px-3 py-1 rounded-full">ROUND {logicalRound}</span>
          <span>•</span>
          <span>QUESTION {logicalQuestion} / 3</span>
        </div>
        <div className="flex items-center space-x-3">
          <span className="text-gray-400 text-sm uppercase tracking-widest">Time Remaining</span>
          <div className="text-2xl font-bold font-mono text-white neon-text">
            00:{timeLeft.toString().padStart(2, '0')}
          </div>
        </div>
      </div>
      
      {/* Progress Bar */}
      <div className="w-full h-1 bg-gray-800 rounded-full overflow-hidden mb-12">
        <motion.div 
          initial={{ width: '100%' }}
          animate={{ width: `${(timeLeft / 10) * 100}%` }}
          transition={{ duration: 1, ease: 'linear' }}
          className={`h-full ${timeLeft <= 3 ? 'bg-red-500' : 'bg-cyan-400'}`}
        />
      </div>

      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-white tracking-wide mb-2">Which one is <span className="neon-text-purple">AI-Generated?</span></h2>
        <p className="text-gray-400">Select the image that was created by an artificial intelligence.</p>
      </div>

      {/* Cards Container */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 flex-grow">
        
        {/* Card A */}
        <motion.div 
          whileHover={{ scale: 1.02, y: -5 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => handleSelect(aiIsLeft)}
          className="relative group cursor-pointer glass-panel rounded-2xl overflow-hidden hover:neon-border transition-all duration-300"
        >
          <div className="absolute top-4 left-4 z-10 bg-black/60 backdrop-blur-md px-4 py-1 rounded-full border border-white/10">
            <span className="font-bold text-white tracking-widest">IMAGE A</span>
          </div>
          
          <button className="absolute top-4 right-4 z-10 p-2 bg-black/50 hover:bg-black/80 rounded-full transition-colors opacity-0 group-hover:opacity-100 border border-white/10">
            <ZoomIn className="w-5 h-5 text-white" />
          </button>
          
          <div className="aspect-square relative w-full h-full min-h-[300px]">
            <img 
              src={leftImage.url} 
              alt="Challenge Option A" 
              className="object-cover w-full h-full"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6">
              <span className="text-cyan-400 font-bold uppercase tracking-widest border border-cyan-400 px-6 py-2 rounded-full bg-black/50">
                Select as AI
              </span>
            </div>
          </div>
        </motion.div>

        {/* Card B */}
        <motion.div 
          whileHover={{ scale: 1.02, y: -5 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => handleSelect(!aiIsLeft)}
          className="relative group cursor-pointer glass-panel rounded-2xl overflow-hidden hover:neon-border transition-all duration-300"
        >
          <div className="absolute top-4 left-4 z-10 bg-black/60 backdrop-blur-md px-4 py-1 rounded-full border border-white/10">
            <span className="font-bold text-white tracking-widest">IMAGE B</span>
          </div>
          
          <button className="absolute top-4 right-4 z-10 p-2 bg-black/50 hover:bg-black/80 rounded-full transition-colors opacity-0 group-hover:opacity-100 border border-white/10">
            <ZoomIn className="w-5 h-5 text-white" />
          </button>
          
          <div className="aspect-square relative w-full h-full min-h-[300px]">
            <img 
              src={rightImage.url} 
              alt="Challenge Option B" 
              className="object-cover w-full h-full"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6">
              <span className="text-cyan-400 font-bold uppercase tracking-widest border border-cyan-400 px-6 py-2 rounded-full bg-black/50">
                Select as AI
              </span>
            </div>
          </div>
        </motion.div>

      </div>
    </div>
  );
}
