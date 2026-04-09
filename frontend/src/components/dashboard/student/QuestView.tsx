'use client';

import React from 'react';
import { QuestStep } from '@/types';
import { motion } from 'framer-motion';

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(' ');
}

interface QuestViewProps {
  mockQuests: QuestStep[];
}

export const QuestView: React.FC<QuestViewProps> = ({ mockQuests }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="space-y-12"
    >
      <header>
        <h2 className="font-headline text-5xl font-bold text-primary italic mb-2">Daily Quests</h2>
        <p className="text-on-surface-variant opacity-70">Complete your daily routine to unlock rare focus stones.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Quest Map */}
        <div className="lg:col-span-2 bg-white rounded-[2.5rem] p-10 shadow-sm border border-outline-variant/10 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-5">
            <span className="material-symbols-outlined text-9xl">map</span>
          </div>
          
          <h3 className="font-headline text-2xl font-bold text-primary mb-12 italic">The Labyrinth Map</h3>
          
          <div className="relative space-y-12 py-10">
            {/* Visual Path Line */}
            <div className="absolute left-8 top-0 bottom-0 w-1 bg-sky-100 -z-0" />
            
            {mockQuests.map((step, i) => (
              <div key={step.id} className="flex items-center gap-8 relative z-10">
                <div className={cn(
                  "w-16 h-16 rounded-full flex items-center justify-center transition-all shadow-sm ring-8",
                  step.status === 'done' ? "bg-tertiary text-white ring-tertiary-fixed-dim/20" :
                  step.status === 'current' ? "bg-white border-4 border-sky-500 text-sky-500 ring-sky-100 shadow-xl" :
                  "bg-slate-100 text-slate-300 ring-transparent"
                )}>
                  <span className={`material-symbols-outlined text-2xl ${step.status === 'done' && 'filled-icon'}`}>
                    {step.icon}
                  </span>
                </div>
                <div>
                  <h4 className={cn(
                    "font-bold text-lg",
                    step.status === 'locked' ? "text-slate-400" : "text-primary"
                  )}>
                    {step.title}
                  </h4>
                  <p className="text-xs font-mono uppercase tracking-widest text-outline">
                    {step.status === 'done' ? 'Completed' : step.status === 'current' ? 'In Progress' : 'Locked'}
                  </p>
                </div>
                {step.status === 'current' && (
                  <button className="ml-auto bg-sky-500 text-white px-6 py-2 rounded-xl font-bold text-sm hover:bg-sky-600 transition-colors shadow-lg shadow-sky-200">
                    Resume
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Quest Rewards / Stats */}
        <div className="space-y-8">
          <div className="bg-secondary-container text-on-secondary-container rounded-[2.5rem] p-8 shadow-inner">
            <h4 className="font-headline text-xl font-bold mb-6 italic">Quest Rewards</h4>
            <div className="space-y-4">
              <div className="flex items-center gap-4 bg-white/20 p-4 rounded-2xl">
                <span className="material-symbols-outlined text-yellow-600 filled-icon">diamond</span>
                <div className="flex-1">
                  <p className="text-xs font-bold uppercase opacity-60">Focus Stones</p>
                  <p className="text-lg font-black">+250</p>
                </div>
              </div>
              <div className="flex items-center gap-4 bg-white/20 p-4 rounded-2xl">
                <span className="material-symbols-outlined text-sky-600 filled-icon">auto_awesome</span>
                <div className="flex-1">
                  <p className="text-xs font-bold uppercase opacity-60">XP Boost</p>
                  <p className="text-lg font-black">2.0x</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-surface-container-lowest rounded-[2rem] p-8 border border-outline-variant/20">
            <h4 className="font-headline text-lg font-bold text-primary mb-4 italic">Pro Tip</h4>
            <p className="text-sm text-on-surface-variant leading-relaxed opacity-80">
              Taking a 2-minute "Calm Breath" before starting the Labyrinth session increases your focus score by up to 15%.
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
