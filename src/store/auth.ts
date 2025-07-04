import { create } from 'zustand';

export type UserRole = 'admin' | 'client';

interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (role: UserRole) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  login: (role: UserRole) => {
    const mockUser: User = {
      id: '1',
      email: role === 'admin' ? 'admin@dashboard.com' : 'client@dashboard.com',
      name: role === 'admin' ? 'Admin User' : 'Client User',
      role,
    };
    set({ user: mockUser, isAuthenticated: true });
  },
  logout: () => {
    set({ user: null, isAuthenticated: false });
  },
}));