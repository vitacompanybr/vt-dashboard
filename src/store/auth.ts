import { create } from 'zustand';
import { supabase } from '@/integrations/supabase/client';
import { Empresa, Usuario, UserRole } from '@/types/business';
import { User as SupabaseUser, Session } from '@supabase/supabase-js';

interface User {
  id: string;
  email: string;
  nome: string;
  role: UserRole;
  empresa: Empresa;
}

interface AuthState {
  user: User | null;
  session: Session | null;
  isAuthenticated: boolean;
  currentEmpresa: Empresa | null;
  loading: boolean;
  initialize: () => void;
  logout: () => Promise<void>;
  setEmpresa: (empresa: Empresa) => void;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  session: null,
  isAuthenticated: false,
  currentEmpresa: null,
  loading: true,

  initialize: () => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state change:', event, session?.user?.email);
        
        if (session?.user) {
          // Defer user data fetching to prevent deadlock
          setTimeout(async () => {
            try {
              const { data: userData, error } = await supabase
                .from('usuarios')
                .select(`
                  *,
                  empresa:empresas(*)
                `)
                .eq('id', session.user.id)
                .single();

              if (error) {
                console.error('Error fetching user data:', error);
                set({ 
                  user: null, 
                  session: null, 
                  isAuthenticated: false, 
                  loading: false 
                });
                return;
              }

              if (userData && userData.empresa) {
                const empresa: Empresa = {
                  id: userData.empresa.id,
                  nome: userData.empresa.nome,
                  plano: userData.empresa.plano as any,
                  created_at: userData.empresa.created_at,
                  configuracoes: userData.empresa.configuracoes as any,
                };

                const user: User = {
                  id: userData.id,
                  email: userData.email,
                  nome: userData.nome,
                  role: userData.role as UserRole,
                  empresa,
                };

                set({
                  user,
                  session,
                  isAuthenticated: true,
                  currentEmpresa: empresa,
                  loading: false,
                });
              }
            } catch (error) {
              console.error('Error in auth state change:', error);
              set({ 
                user: null, 
                session: null, 
                isAuthenticated: false, 
                loading: false 
              });
            }
          }, 0);
        } else {
          set({ 
            user: null, 
            session: null, 
            isAuthenticated: false, 
            currentEmpresa: null, 
            loading: false 
          });
        }
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        set({ loading: false });
      }
    });

    return () => subscription.unsubscribe();
  },

  logout: async () => {
    try {
      await supabase.auth.signOut();
      set({ 
        user: null, 
        session: null, 
        isAuthenticated: false, 
        currentEmpresa: null 
      });
    } catch (error) {
      console.error('Error logging out:', error);
    }
  },

  setEmpresa: (empresa: Empresa) => {
    set({ currentEmpresa: empresa });
  },
}));