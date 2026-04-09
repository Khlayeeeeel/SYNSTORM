'use client';

import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { TeacherNav } from '@/components/ui/TeacherNav';
import { StudentCard } from '@/components/dashboard/teacher/StudentCard';
import { BentoSkeleton } from '@/components/ui/SkeletonLoaders';
import { apiClient } from '@/lib/api-client';
import { StudentProfile, User } from '@/types';
import { useAuth } from '@/context/AuthContext';

export default function TeacherDashboard() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('Overview');
  const [students, setStudents] = useState<(StudentProfile & { user?: User })[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [teacherProfile, setTeacherProfile] = useState<any>(null);

  useEffect(() => {
    async function loadDashboardData() {
      try {
        // 1. Fetch Teacher Profile
        const profileRes = await apiClient.get('/teachers/me');
        setTeacherProfile(profileRes.data);

        // 2. Fetch Children and filter by teacher_id
        // In a real app, this filtering should happen on the backend
        const childrenRes = await apiClient.get('/children');
        const allUsersRes = await apiClient.get('/users');
        const allUsers = allUsersRes.data;

        const myStudents = childrenRes.data
          .filter((child: any) => child.teacher_id === profileRes.data.user_id)
          .map((child: any) => ({
            ...child,
            user: allUsers.find((u: any) => u._id === child.user_id)
          }));

        setStudents(myStudents);
      } catch (error) {
        console.error('Failed to load teacher dashboard data:', error);
      } finally {
        setIsLoading(false);
      }
    }

    loadDashboardData();
  }, []);

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <BentoSkeleton className="h-64" />
          <BentoSkeleton className="h-64" />
          <BentoSkeleton className="h-64" />
        </div>
      );
    }

    if (students.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center h-[50vh] text-center">
          <span className="material-symbols-outlined text-6xl text-outline-variant mb-4">person_search</span>
          <h3 className="text-xl font-headline font-bold text-on-surface">No students assigned yet.</h3>
          <p className="text-on-surface-variant max-w-xs mx-auto">Verify your clinical credentials or contact the administrator to link explorer nodes.</p>
        </div>
      );
    }

    return (
      <div className="space-y-8">
        <div className="flex justify-between items-end">
          <div>
            <h2 className="font-headline text-3xl font-bold text-primary italic lowercase tracking-tight">Active Nodes</h2>
            <p className="text-on-surface-variant text-sm">Monitoring {students.length} clinical status profiles.</p>
          </div>
          <div className="flex gap-2">
            <button className="bg-surface-container-low px-4 py-2 rounded-lg border border-outline-variant/20 text-[10px] font-bold uppercase tracking-widest hover:bg-primary/5 transition-colors">
              Export Report
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {students.map(student => (
            <StudentCard key={student.id} student={student} />
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="bg-surface min-h-screen font-body text-on-surface selection:bg-primary-container selection:text-on-primary-container">
      {/* Precision Grid Background */}
      <div className="fixed inset-0 precision-grid pointer-events-none z-0"></div>

      {/* Header */}
      <header className="sticky top-0 z-50 bg-surface/80 backdrop-blur-md border-b border-outline-variant/10">
        <div className="max-w-screen-2xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-12">
            <span className="text-2xl font-black text-primary italic tracking-tight lowercase">
              NeuroFocus <span className="text-on-surface-variant font-normal">Educator</span>
            </span>
          </div>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 bg-surface-container-low px-4 py-1.5 rounded-full border border-outline-variant/20">
              <span className="w-2 h-2 bg-success rounded-full animate-pulse"></span>
              <span className="text-[10px] font-bold tracking-widest uppercase">System Online</span>
            </div>
            <div className="w-10 h-10 rounded-full border-2 border-primary/20 overflow-hidden bg-slate-100">
               <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuB1IhUAEkVeg59cHtChBvK5u8goN10O2rsC24BciQZHH1xUYjC_hKsVHJi7F4ck6t3aCMm8TkJNOYSoA2_CaDsFD3e1cf1PR7gz6iJ7a-UWTPY03VrRtzTUi6BcmkvVrz0ZIGhZskI1z9SH0prYEuoTn2dFofm8vcwEV312EyQ9EJhx6Jh8zNC2FH-B1a5eJrphqAJwm3sZrq8mEHhRp-uP1R_PikpZvaYWA4WuhSpZ56hi_5a-55TqEvcbeDW02sGJ_d379qS3-2FL" alt="Educator" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </header>

      <div className="flex max-w-screen-2xl mx-auto min-h-[calc(100vh-73px)] relative z-10">
        <aside className="hidden lg:flex flex-col w-72 bg-surface-container-low/50 backdrop-blur-sm h-[calc(100vh-73px)] sticky top-[73px] pt-8 pb-8 space-y-2 border-r border-outline-variant/10">
          <div className="px-8 mb-10">
            <p className="text-[10px] font-bold text-outline uppercase tracking-[0.2em] mb-2">Faculty Hub</p>
            <h2 className="font-headline text-2xl font-bold text-on-surface italic">Welcome, Educator</h2>
          </div>
          <TeacherNav activeLabel={activeTab} onNavigate={setActiveTab} />
          
          <div className="mt-auto px-6">
             <div className="bg-primary-container/20 p-6 rounded-2xl border border-primary/10">
                <span className="material-symbols-outlined text-primary mb-2">clinical_notes</span>
                <p className="text-[11px] font-bold text-on-surface mb-1">Weekly Insight</p>
                <p className="text-[10px] text-on-surface-variant leading-relaxed">Explorer focus scores have improved by 14% this week across all active nodes.</p>
             </div>
          </div>
        </aside>

        <main className="flex-1 p-8 lg:p-12">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}
