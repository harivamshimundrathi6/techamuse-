'use client';

import { useEffect, useState } from 'react';
import { useGameStore } from '@/store/useGameStore';
import Header from '@/components/Header';
import GameArena from '@/components/GameArena';
import ResultModal from '@/components/ResultModal';
import EndScreen from '@/components/EndScreen';
import { Play } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Home() {
  const { gameState, joinGame, playerId, syncState } = useGameStore();

  useEffect(() => {
    // Poll the server state every 1 second
    const interval = setInterval(() => {
      syncState();
    }, 1000);
    return () => clearInterval(interval);
  }, [syncState]);

  return (
    <main className="min-h-screen flex flex-col relative overflow-hidden bg-[#0B0F19]">
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-purple-600/10 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-cyan-600/10 blur-[100px] pointer-events-none" />
      
      <Header />
      
      <div className="flex-grow flex flex-col relative z-10">
        {!playerId && (
          <div className="w-full max-w-3xl mx-auto px-4 py-20 flex flex-col items-center justify-center text-center">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
              <h1 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tight">
                REAL <span className="text-gray-500 font-normal">OR</span> <span className="neon-text-purple">AI?</span>
              </h1>
              <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto">
                Join the live multiplayer arena. Can you spot the AI artifacts?
              </p>
              
              <form 
                onSubmit={(e) => {
                  e.preventDefault();
                  const formData = new FormData(e.currentTarget);
                  joinGame(formData.get('name') as string, formData.get('roll') as string);
                }}
                className="flex flex-col items-center space-y-4 max-w-md mx-auto"
              >
                <input name="name" required placeholder="Enter your Name" className="w-full px-6 py-3 rounded-xl bg-black/40 border border-white/10 text-white focus:outline-none focus:border-cyan-400 focus:shadow-[0_0_15px_rgba(0,229,255,0.3)] transition-all" />
                <input name="roll" required placeholder="Enter your Roll Number" className="w-full px-6 py-3 rounded-xl bg-black/40 border border-white/10 text-white focus:outline-none focus:border-cyan-400 focus:shadow-[0_0_15px_rgba(0,229,255,0.3)] transition-all" />
                <button type="submit" className="w-full group relative inline-flex items-center justify-center px-10 py-4 font-bold text-white transition-all duration-200 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-xl hover:shadow-[0_0_20px_rgba(0,229,255,0.4)] overflow-hidden mt-4">
                  <span className="relative z-10 flex items-center space-x-3 tracking-widest">
                    <Play className="w-5 h-5 fill-current" />
                    <span>JOIN GAME</span>
                  </span>
                </button>
              </form>
            </motion.div>
          </div>
        )}

        {playerId && gameState === 'waiting' && (
          <div className="w-full max-w-3xl mx-auto px-4 py-20 flex flex-col items-center justify-center text-center">
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
              <div className="w-24 h-24 rounded-full border-4 border-cyan-400 border-t-transparent animate-spin mx-auto mb-8" />
              <h2 className="text-3xl font-bold text-white mb-4">WAITING FOR HOST</h2>
              <p className="text-gray-400 text-xl">Get ready. The next round will begin shortly...</p>
            </motion.div>
          </div>
        )}

        {playerId && (gameState === 'playing' || gameState === 'round_result') && (
          <GameArena />
        )}
        
        {playerId && gameState === 'round_result' && (
          <ResultModal />
        )}

        {playerId && gameState === 'finished' && (
          <EndScreen />
        )}
      </div>
    </main>
  );
}
