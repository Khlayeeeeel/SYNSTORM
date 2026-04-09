export type UserRole = 'student' | 'parent' | 'teacher' | 'doctor' | 'enfant' | 'psychiatre';

export interface User {
  id: string;
  nom: string;
  email: string;
  role: UserRole;
  avatar_url?: string;
}

export interface StudentProfile {
  id: string;
  user_id: string;
  parent_id?: string;
  teacher_id?: string;
  focus_score: number;
  status: 'Stable' | 'Needs Attention' | 'Critical';
  notes: string;
  trend_data: number[];
  avatar_url?: string;
}

export interface TeacherProfile {
  id: string;
  user_id: string;
  school_name: string;
  grade: string;
  avatar_url?: string;
}

export interface QuestStep {
  id: string;
  title: string;
  label: string;
  status: 'done' | 'current' | 'locked';
  icon?: string;
}

export interface FocusMetric {
  label: string;
  value: string | number;
  trend?: string;
  icon?: string;
  variant?: 'primary' | 'secondary' | 'error' | 'surface';
}

export interface ClinicalUpdate {
  id: string;
  author: string;
  timestamp: string;
  content: string;
  is_urgent?: boolean;
}
