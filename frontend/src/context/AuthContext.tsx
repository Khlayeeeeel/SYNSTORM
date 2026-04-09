'use client';
import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, UserRole } from '@/types';
import { apiClient } from '@/lib/api-client';
import { useRouter } from 'next/navigation';

interface AuthContextType {
  user: User | null;
  role: UserRole | null;
  isLoading: boolean;
  login: (form_data: FormData) => Promise<void>;
  register: (userData: any) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [role, setRoleState] = useState<UserRole | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const savedRole = localStorage.getItem('neurofocus_role') as UserRole;
    const token = localStorage.getItem('neurofocus_token');

    if (savedRole && token) {
      setRoleState(savedRole);
      // In a real app, we would fetch user profile here with the token
    }
    setIsLoading(false);
  }, []);

  const login = async (form_data: FormData) => {
    try {
      const response = await apiClient.post('/auth/login', form_data, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });

      const { access_token, role: userRole } = response.data;

      localStorage.setItem('neurofocus_token', access_token);
      localStorage.setItem('neurofocus_role', userRole);

      setRoleState(userRole);

      // Dynamic Redirection based on Role
      // Backend roles: enfant -> /dashboard/student, psychiatre -> /dashboard/psychiatre, etc.
      const routeMap: Record<string, string> = {
        'enfant': '/dashboard/student',
        'parent': '/dashboard/parent',
        'enseignant': '/dashboard/teacher',
        'psychiatre': '/dashboard/psychiatre',
      };

      router.push(routeMap[userRole] || '/dashboard/student');
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  };

  const register = async (userData: any) => {
    try {
      // Backend expects: nom, email, role, password
      await apiClient.post('/auth/register', userData);

      // Auto-Login after successful registration
      const loginForm = new FormData();
      loginForm.append('username', userData.email);
      loginForm.append('password', userData.password);

      await login(loginForm);
    } catch (error) {
      console.error('Registration failed:', error);
      throw error;
    }
  };

  const logout = () => {
    setRoleState(null);
    setUser(null);
    localStorage.removeItem('neurofocus_token');
    localStorage.removeItem('neurofocus_role');
    router.push('/login');
  };

  return (
    <AuthContext.Provider value={{ user, role, isLoading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
