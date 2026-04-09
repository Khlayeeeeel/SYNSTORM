'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface Notification {
  id: string;
  type: 'clinical' | 'system' | 'achievement';
  title: string;
  message: string;
  timestamp: string;
  isRead: boolean;
}

interface NotificationPanelProps {
  isOpen: boolean;
  onClose: () => void;
  notifications: Notification[];
}

export const NotificationPanel: React.FC<NotificationPanelProps> = ({
  isOpen,
  onClose,
  notifications,
}) => {
  const grouped = {
    clinical: notifications.filter(n => n.type === 'clinical'),
    system: notifications.filter(n => n.type === 'system'),
    achievement: notifications.filter(n => n.type === 'achievement'),
  };

  const NotificationItem = ({ notification }: { notification: Notification }) => (
    <div className={cn(
      "p-4 rounded-xl transition-all border-l-4 hover:shadow-md cursor-pointer",
      notification.type === 'clinical' && "bg-error-container/10 border-error text-error",
      notification.type === 'system' && "bg-primary-container/10 border-primary text-primary",
      notification.type === 'achievement' && "bg-tertiary-container/10 border-tertiary text-on-tertiary-container",
      notification.isRead && "opacity-60"
    )}>
      <div className="flex justify-between items-start mb-1">
        <h5 className="font-bold text-sm leading-tight">{notification.title}</h5>
        <span className="font-mono text-[9px] uppercase tracking-tighter opacity-60">
          {notification.timestamp}
        </span>
      </div>
      <p className="text-xs opacity-80 leading-relaxed font-body">
        {notification.message}
      </p>
    </div>
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-primary/5 backdrop-blur-[2px] z-[80]"
          />

          {/* Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-surface-container-lowest shadow-[0_40px_100px_-20px_rgba(6,29,58,0.2)] z-[90] flex flex-col border-l border-outline-variant/10"
          >
            <div className="p-8 border-b border-outline-variant/10 flex justify-between items-center">
              <div>
                <h3 className="font-headline text-3xl font-bold text-primary italic">Clinical Pulse</h3>
                <p className="text-[10px] font-mono uppercase tracking-widest text-outline mt-1 font-bold">Latest activity stream</p>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-surface-container-low rounded-full transition-colors"
              >
                <span className="material-symbols-outlined text-outline">close</span>
              </button>
            </div>

            <div className="flex-grow overflow-y-auto p-8 space-y-10">
              {/* Clinical Alerts */}
              {grouped.clinical.length > 0 && (
                <div className="space-y-4">
                  <h4 className="font-label text-[10px] uppercase tracking-[0.2em] text-error font-bold flex items-center gap-2">
                    <span className="material-symbols-outlined text-[14px]">emergency_home</span>
                    Clinical Alerts
                  </h4>
                  {grouped.clinical.map(n => <NotificationItem key={n.id} notification={n} />)}
                </div>
              )}

              {/* Achievements */}
              {grouped.achievement.length > 0 && (
                <div className="space-y-4">
                  <h4 className="font-label text-[10px] uppercase tracking-[0.2em] text-tertiary-container font-bold flex items-center gap-2">
                    <span className="material-symbols-outlined text-[14px]">military_tech</span>
                    Achievements
                  </h4>
                  {grouped.achievement.map(n => <NotificationItem key={n.id} notification={n} />)}
                </div>
              )}

              {/* System Updates */}
              {grouped.system.length > 0 && (
                <div className="space-y-4">
                  <h4 className="font-label text-[10px] uppercase tracking-[0.2em] text-primary font-bold flex items-center gap-2">
                    <span className="material-symbols-outlined text-[14px]">sync_alt</span>
                    System Updates
                  </h4>
                  {grouped.system.map(n => <NotificationItem key={n.id} notification={n} />)}
                </div>
              )}

              {notifications.length === 0 && (
                <div className="h-full flex flex-col items-center justify-center opacity-40 grayscale space-y-4 pt-20">
                  <h2 className="font-headline text-2xl font-bold text-primary italic">Clear Mind.</h2>
                  <p className="text-center text-sm font-body max-w-[200px]">
                    No pending alerts at the moment. Your clinical sanctuary is serene.
                  </p>
                </div>
              )}
            </div>

            <div className="p-8 border-t border-outline-variant/10 bg-surface-container-low">
              <button className="w-full py-4 text-[10px] font-sans font-bold uppercase tracking-widest text-primary border border-primary/20 rounded-xl hover:bg-primary/5 transition-colors">
                View Full Audit Log
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
