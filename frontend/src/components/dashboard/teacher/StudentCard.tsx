import React from 'react';
import { StudentProfile, User } from '@/types';
import { cn } from '@/lib/utils';

interface StudentCardProps {
  student: StudentProfile & { user?: User };
  onClick?: () => void;
}

export const StudentCard: React.FC<StudentCardProps> = ({ student, onClick }) => {
  const statusColors = {
    'Stable': 'bg-success text-success-container border-success/20',
    'Needs Attention': 'bg-warning text-warning-container border-warning/20',
    'Critical': 'bg-error text-error-container border-error/20',
  };

  return (
    <div 
      onClick={onClick}
      className="bg-surface-container-lowest border border-outline-variant/10 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all cursor-pointer group"
    >
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full overflow-hidden bg-slate-100 border-2 border-primary/10">
            <img 
              src={student.user?.avatar_url || "https://lh3.googleusercontent.com/aida-public/AB6AXuArXceYhLE9g_s3faJlGyGUCY2Xtrgp_jkHfcrVpAp34-estpD-_DzCMbiWjq88BBKJAKrXTzpJ9guM840btQsKJw4pZUXgyE4e81nnNr0chDjaWHocGXHGSEAJ603IhQEFaCfpYAWeMLSyz4XLvys4GaJL4Gs8b2g7He0SGJN7Gl7ajrYNeA0aVQMRmHnRXT1Mm03l5pkAJVZJbwH4HUbnWXMCDVtk5aUgtiDcItUqpcTuuEySz9jxTdS_ZFPwzURopXwTZKORTKFK"} 
              alt={student.user?.nom} 
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h3 className="font-headline font-bold text-on-surface group-hover:text-primary transition-colors">
              {student.user?.nom || 'Explorer Node'}
            </h3>
            <p className="text-xs text-on-surface-variant">Class: {student.user?.email.split('@')[0] || 'Gamma'}</p>
          </div>
        </div>
        <span className={cn(
          "px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border",
          statusColors[student.status]
        )}>
          {student.status}
        </span>
      </div>

      <div className="space-y-4">
        <div>
          <div className="flex justify-between items-center mb-1">
            <span className="text-[10px] uppercase font-label text-outline tracking-widest">Focus Level</span>
            <span className="text-xs font-mono font-bold text-primary">{student.focus_score}%</span>
          </div>
          <div className="h-1.5 w-full bg-surface-container-low rounded-full overflow-hidden">
            <div 
              className="h-full bg-primary transition-all duration-1000" 
              style={{ width: `${student.focus_score}%` }}
            />
          </div>
        </div>

        <div className="flex gap-2">
          {student.trend_data.slice(-3).map((val, i) => (
            <div key={i} className="flex-1 h-8 bg-surface-container-low rounded flex items-end p-1">
              <div 
                className="w-full bg-primary/20 rounded-sm" 
                style={{ height: `${val}%` }}
              />
            </div>
          ))}
          <div className="flex flex-col justify-center items-center px-2">
             <span className="material-symbols-outlined text-xs text-primary">analytics</span>
          </div>
        </div>
      </div>
      
      <div className="mt-6 pt-4 border-t border-outline-variant/10 flex justify-between items-center">
        <button className="text-[10px] font-bold text-primary hover:underline flex items-center gap-1">
          <span className="material-symbols-outlined text-sm">history</span>
          View History
        </button>
        <button className="bg-primary-container text-primary p-2 rounded-lg hover:bg-primary hover:text-white transition-colors">
          <span className="material-symbols-outlined text-sm">edit_note</span>
        </button>
      </div>
    </div>
  );
};
