import React, { useState } from 'react';
import Link from 'next/link';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { NotificationPanel } from '@/components/ui/NotificationPanel';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface HeaderProps {
  className?: string;
}

export const Header: React.FC<HeaderProps> = ({ className }) => {
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  const mockNotifications = [
    {
      id: '1',
      type: 'clinical' as const,
      title: 'Attention Required: Alex M.',
      message: 'Sudden drop in Alpha-wave coherence detected during Session #44.',
      timestamp: '2m ago',
      isRead: false,
    },
    {
      id: '2',
      type: 'achievement' as const,
      title: 'Milestone Reached',
      message: 'Alex has successfully completed the "Labyrinth of Focus" level!',
      timestamp: '1h ago',
      isRead: false,
    },
    {
      id: '3',
      type: 'system' as const,
      title: 'Security Patch Applied',
      message: 'Node #NF-88219-X has been updated with the latest HIPAA protocols.',
      timestamp: '4h ago',
      isRead: true,
    }
  ];

  return (
    <>
      <header className={cn(
        "fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-outline-variant/10 flex justify-between items-center px-8 py-4",
        className
      )}>
        <div className="flex items-center gap-6">
          <Link href="/" className="font-headline italic font-bold text-3xl text-primary tracking-tight">
            NeuroFocus
          </Link>
          <nav className="hidden lg:flex items-center gap-6 border-l border-outline-variant/20 pl-6">
            <Link href="/dashboard/student" className="text-sm font-semibold text-primary/60 hover:text-primary transition-colors">Dashboard</Link>
            <Link href="/settings" className="text-sm font-semibold text-primary/60 hover:text-primary transition-colors">Settings</Link>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setIsNotificationsOpen(true)}
            className="material-symbols-outlined text-outline cursor-pointer hover:bg-surface-container-low p-2.5 transition-all rounded-full relative hover:text-primary"
          >
            notifications
            <span className="absolute top-2 right-2 w-2 h-2 bg-error rounded-full ring-2 ring-white"></span>
          </button>
          <div className="h-8 w-px bg-outline-variant/20 mx-2" />
          <Link href="/settings" className="flex items-center gap-3 group">
            <div className="text-right hidden sm:block">
              <p className="text-[10px] font-mono font-bold text-primary uppercase tracking-wider">Editor-in-Chief</p>
              <p className="text-xs font-bold text-on-surface-variant">Sarah K.</p>
            </div>
            <div className="w-10 h-10 rounded-full border border-outline-variant/30 overflow-hidden group-hover:ring-2 group-hover:ring-primary/20 transition-all">
              <img src="https://i.pravatar.cc/100?u=sarah" alt="Profile" />
            </div>
          </Link>
        </div>
      </header>

      <NotificationPanel 
        isOpen={isNotificationsOpen} 
        onClose={() => setIsNotificationsOpen(false)} 
        notifications={mockNotifications}
      />
    </>
  );
};
