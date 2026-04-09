'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface Game {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  category: 'Focus' | 'Memory' | 'Calm';
  xpReward: number;
  isUnlocked: boolean;
}

const MOCK_GAMES: Game[] = [
  {
    id: '1',
    title: 'Labyrinth of Echoes',
    description: 'A sound-memory challenge where focus is key to navigation.',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB6N_4k59c9x1-rG7O144-sU4yG8qR_p9yJ3-8v7_yX5-_zG-8L_vJ2G5y-8_z_F1mJ_eC5M_vP9_z_1_eE',
    category: 'Focus',
    xpReward: 250,
    isUnlocked: true,
  },
  {
    id: '2',
    title: 'Alpha Wave Surf',
    description: 'Control your surfboard using the rhythm of your calm mind.',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBV6N_4k59c9x1-rG7O144-sU4yG8qR_p9yJ3-8v7_yX5-_zG-8L_vJ2G5y-8_z_F1mJ_eC5M_vP9_z_1_eE',
    category: 'Calm',
    xpReward: 150,
    isUnlocked: true,
  },
  {
    id: '3',
    title: 'Recall Sanctuary',
    description: 'Restore the ancient library by matching clinical symbols.',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB-VXeEOiGPQsakdMGxTgwVabU0xBL4tp6vFRuQp6Zbn9c_eOWzCcDZvLT5W0a-u9BE_QZI2wWcEIerudMOicrlXmZKnd9XqIrjWhsvs-08dMkiuhEbRpsxZK-nDGtI3TxtojXV68Pwsr9-1EnImbqe40eHVVo7CQoxD974ZZd3bSJus8EqK0ZoREjHrGi8C2t5fIS-ehfA30Jyrzsi2ceH61js4ZPe49i981KQQcPpHkfp6MUWUvh7TC4q0wAbe4FT_EneE-8u7b',
    category: 'Memory',
    xpReward: 200,
    isUnlocked: false,
  },
  {
    id: '4',
    title: 'Zen Gardener',
    description: 'Plant focuses and harvest tranquility in this timing-based game.',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuArXceYhLE9g_s3faJlGyGUCY2Xtrgp_jkHfcrVpAp34-estpD-_DzCMbiWjq88BBKJAKrXTzpJ9guM840btQsKJw4pZUXgyE4e81nnNr0chDjaWHocGXHGSEAJ603IhQEFaCfpYAWeMLSyz4XLvys4GaJL4Gs8b2g7He0SGJN7Gl7ajrYNeA0aVQMRmHnRXT1Mm03l5pkAJVZJbwH4HUbnWXMCDVtk5aUgtiDcItUqpcTuuEySz9jxTdS_ZFPwzURopXwTZKORTKFK',
    category: 'Calm',
    xpReward: 300,
    isUnlocked: false,
  }
];

export const GameView: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="space-y-12"
    >
      <header className="flex justify-between items-end">
        <div className="space-y-2">
          <h2 className="font-headline text-5xl font-bold text-primary italic leading-tight">Focus Games</h2>
          <p className="text-on-surface-variant opacity-70">Train your sanctuary through interactive play.</p>
        </div>
        <div className="flex gap-4 p-2 bg-surface-container-low rounded-2xl border border-outline-variant/10">
          <button className="px-6 py-2 bg-white text-primary font-bold text-xs rounded-xl shadow-sm">All</button>
          <button className="px-6 py-2 text-slate-500 font-bold text-xs rounded-xl hover:bg-white transition-colors">Focus</button>
          <button className="px-6 py-2 text-slate-500 font-bold text-xs rounded-xl hover:bg-white transition-colors">Calm</button>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {MOCK_GAMES.map((game, i) => (
          <motion.div
            key={game.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
            className={`group relative overflow-hidden rounded-[2.5rem] bg-white border border-outline-variant/10 hover:shadow-2xl transition-all ${!game.isUnlocked && "grayscale opacity-80"}`}
          >
            <div className="aspect-video relative overflow-hidden">
              <img src={game.imageUrl} alt={game.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent" />
              
              <div className="absolute top-6 left-6 flex gap-2">
                <span className={`px-4 py-1 rounded-full font-bold text-[10px] uppercase tracking-widest text-white ring-2 ring-white/20 ${
                  game.category === 'Focus' ? "bg-sky-500" :
                  game.category === 'Calm' ? "bg-tertiary" : "bg-secondary"
                }`}>
                  {game.category}
                </span>
              </div>

              {!game.isUnlocked && (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-8">
                  <span className="material-symbols-outlined text-5xl mb-4">lock</span>
                  <p className="font-headline text-xl font-bold italic text-center">Unlocks at Level {i + 5}</p>
                </div>
              )}

              {/* Parental Sync Badge */}
              {game.isUnlocked && (
                <div className="absolute bottom-6 left-6 flex items-center gap-2 bg-on-tertiary-container/30 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/20">
                  <span className="material-symbols-outlined text-[14px] text-white filled-icon" style={{ fontVariationSettings: "'FILL' 1" }}>shield_with_heart</span>
                  <span className="text-[9px] font-bold text-white uppercase tracking-wider">Parent Sync Active</span>
                </div>
              )}
            </div>

            <div className="p-10 space-y-4">
              <div className="flex justify-between items-baseline gap-4">
                <h3 className="font-headline text-3xl font-bold text-primary italic leading-none">{game.title}</h3>
                <span className="font-mono text-sm font-black text-secondary-container bg-secondary-container/10 px-3 py-1 rounded-full shrink-0">+{game.xpReward} XP</span>
              </div>
              <p className="text-on-surface-variant text-sm leading-relaxed max-w-sm font-body font-medium">
                {game.description}
              </p>
              
              {game.isUnlocked && (
                <button className="w-full bg-primary text-on-primary py-4 rounded-2xl font-bold text-sm shadow-xl hover:shadow-primary/20 active:scale-95 transition-all flex items-center justify-center gap-3">
                  Play Now
                  <span className="material-symbols-outlined text-[18px]">play_arrow</span>
                </button>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};
