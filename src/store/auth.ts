import { create } from 'zustand';
import { Empresa, Usuario, UserRole } from '@/types/business';

interface User {
  id: string;
  email: string;
  nome: string;
  role: UserRole;
  empresa: Empresa;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  currentEmpresa: Empresa | null;
  login: (role: UserRole) => void;
  logout: () => void;
  setEmpresa: (empresa: Empresa) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  currentEmpresa: null,
  login: (role: UserRole) => {
    // Mock empresa para demonstração
    const mockEmpresa: Empresa = {
      id: '1',
      nome: role === 'super_admin' ? 'VitaTech Agência' : 'Empresa Demo',
      plano: 'professional',
      created_at: new Date().toISOString(),
    };

    const mockUser: User = {
      id: '1',
      email: role === 'super_admin' ? 'admin@vitatech.com' : 'cliente@empresa.com',
      nome: role === 'super_admin' ? 'Admin VitaTech' : 'Carlos Empresário',
      role,
      empresa: mockEmpresa,
    };

    set({ 
      user: mockUser, 
      isAuthenticated: true, 
      currentEmpresa: mockEmpresa 
    });
  },
  logout: () => {
    set({ 
      user: null, 
      isAuthenticated: false, 
      currentEmpresa: null 
    });
  },
  setEmpresa: (empresa: Empresa) => {
    set({ currentEmpresa: empresa });
  },
}));