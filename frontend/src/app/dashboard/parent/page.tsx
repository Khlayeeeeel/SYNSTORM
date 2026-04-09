'use client';

import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Header } from '@/components/layout/Header';
import { SharedProgress } from '@/components/dashboard/shared/SharedProgress';
import { BentoSkeleton } from '@/components/ui/SkeletonLoaders';
import { apiClient } from '@/lib/api-client';
import { StudentProfile, User } from '@/types';
import { useAuth } from '@/context/AuthContext';

export default function ParentDashboard() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('Overview');
  const [children, setChildren] = useState<(StudentProfile & { user?: User })[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [parentProfile, setParentProfile] = useState<any>(null);

  useEffect(() => {
    async function loadParentData() {
      try {
        // 1. Fetch Parent Profile
        const profileRes = await apiClient.get('/parents/me');
        setParentProfile(profileRes.data);

        // 2. Fetch Children (In a real app, parents should only fetch their own children)
        const childrenRes = await apiClient.get('/children');
        const allUsersRes = await apiClient.get('/users');
        const allUsers = allUsersRes.data;

        const myChildren = childrenRes.data
          .filter((child: any) => child.parent_id === profileRes.data.user_id)
          .map((child: any) => ({
            ...child,
            user: allUsers.find((u: any) => u._id === child.user_id)
          }));

        setChildren(myChildren);
      } catch (error) {
        console.error('Failed to load parent dashboard data:', error);
      } finally {
        setIsLoading(false);
      }
    }

    loadParentData();
  }, []);

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="space-y-8">
          <BentoSkeleton className="h-[300px]" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <BentoSkeleton className="h-[400px]" />
            <BentoSkeleton className="h-[400px]" />
          </div>
        </div>
      );
    }

    return (
      <div className="space-y-12">
        {/* Collaborative Section */}
        <SharedProgress 
          currentScore={740} 
          totalGoal={1000} 
          goalLabel="Family Sanctuary Expansion" 
        />

        {/* Children Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {children.map(child => (
            <div key={child.id} className="bg-surface-container-lowest rounded-3xl p-8 border border-outline-variant/10 shadow-sm relative overflow-hidden group">
               <div className="absolute top-0 right-0 p-8">
                  <span className="material-symbols-outlined text-4xl text-primary/10 group-hover:text-primary/20 transition-colors">child_care</span>
               </div>
               
               <div className="flex items-center gap-6 mb-8">
                  <div className="w-20 h-20 rounded-2xl overflow-hidden border-4 border-primary/10">
                     <img src={child.user?.avatar_url || "https://lh3.googleusercontent.com/aida-public/AB6AXuArXceYhLE9g_s3faJlGyGUCY2Xtrgp_jkHfcrVpAp34-estpD-_DzCMbiWjq88BBKJAKrXTzpJ9guM840btQsKJw4pZUXgyE4e81nnNr0chDjaWHocGXHGSEAJ603IhQEFaCfpYAWeMLSyz4XLvys4GaJL4Gs8b2g7He0SGJN7Gl7ajrYNeA0aVQMRmHnRXT1Mm03l5pkAJVZJbwH4HUbnWXMCDVtk5aUgtiDcItUqpcTuuEySz9jxTdS_ZFPwzURopXwTZKORTKFK"} alt="Child" className="w-full h-full object-cover" />
                  </div>
                  <div>
                     <h3 className="text-2xl font-headline font-bold text-on-surface italic">{child.user?.nom}</h3>
                     <p className="text-on-surface-variant font-medium">Status: <span className={cn(
                        "font-bold",
                        child.status === 'Stable' ? "text-success" : "text-error"
                     )}>{child.status}</span></p>
                  </div>
               </div>

               <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="bg-surface-container-low p-4 rounded-2xl">
                     <p className="text-[10px] font-bold text-outline uppercase tracking-widest mb-1">Focus Score</p>
                     <p className="text-2xl font-black text-primary italic">{child.focus_score}%</p>
                  </div>
                  <div className="bg-surface-container-low p-4 rounded-2xl">
                     <p className="text-[10px] font-bold text-outline uppercase tracking-widest mb-1">Active Time</p>
                     <p className="text-2xl font-black text-secondary italic">42m</p>
                  </div>
               </div>

               <button className="w-full bg-primary text-on-primary py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:shadow-lg transition-all active:scale-95">
                  View Clinical Details
                  <span className="material-symbols-outlined">analytics</span>
               </button>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="bg-surface min-h-screen font-body text-on-surface">
      <div className="fixed inset-0 precision-grid pointer-events-none z-0"></div>
      
      <header className="sticky top-0 z-50 bg-surface/80 backdrop-blur-md border-b border-outline-variant/10">
        <div className="max-w-screen-2xl mx-auto px-6 py-4 flex justify-between items-center">
          <span className="text-2xl font-black text-primary italic tracking-tight lowercase">
            NeuroFocus <span className="text-on-surface-variant font-normal">Parent</span>
          </span>
          <div className="flex items-center gap-4">
             <div className="w-10 h-10 rounded-full border-2 border-primary/20 overflow-hidden bg-slate-100">
                <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuArXceYhLE9g_s3faJlGyGUCY2Xtrgp_jkHfcrVpAp34-estpD-_DzCMbiWjq88BBKJAKrXTzpJ9guM840btQsKJw4pZUXgyE4e81nnNr0chDjaWHocGXHGSEAJ603IhQEFaCfpYAWeMLSyz4XLvys4GaJL4Gs8b2g7He0SGJN7Gl7ajrYNeA0aVQMRmHnRXT1Mm03l5pkAJVZJbwH4HUbnWXMCDVtk5aUgtiDcItUqpcTuuEySz9jxTdS_ZFPwzURopXwTZKORTKFK" alt="Parent" className="w-full h-full object-cover" />
             </div>
          </div>
        </div>
      </header>

      <main className="relative z-10 max-w-screen-2xl mx-auto p-6 md:p-12">
        <div className="mb-12">
           <p className="text-[10px] font-bold text-primary uppercase tracking-[0.2em] mb-2">Guardian Portal</p>
           <h1 className="font-headline text-5xl font-bold text-on-surface italic lowercase tracking-tight">Parental Node Dashboard</h1>
        </div>

        {renderContent()}
      </main>
    </div>
  );
}
