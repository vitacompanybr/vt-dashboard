import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useAuthStore } from '@/store/auth';
import { LogIn, UserPlus, Loader2 } from 'lucide-react';
export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const {
    toast
  } = useToast();
  const {
    isAuthenticated
  } = useAuthStore();
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (isLogin) {
        const {
          error
        } = await supabase.auth.signInWithPassword({
          email,
          password
        });
        if (error) throw error;
        toast({
          title: 'Login realizado com sucesso!',
          description: 'Redirecionando...'
        });

        // Force redirect after successful login
        setTimeout(() => {
          navigate('/');
        }, 500);
      } else {
        // Check if it's a demo user
        const isDemoUser = email === 'admin@vitatech.com' || email === 'carlos@empresa.com';
        if (isDemoUser && password === 'demo123') {
          const created = await createDemoUserIfNeeded(email, password);
          if (created) {
            toast({
              title: 'Conta demo criada!',
              description: 'Agora você pode fazer login.'
            });
            setIsLogin(true);
            return;
          }
        }
        const {
          error
        } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${window.location.origin}/`
          }
        });
        if (error) throw error;
        toast({
          title: 'Cadastro realizado!',
          description: 'Verifique seu email para confirmar a conta.'
        });
      }
    } catch (error: any) {
      toast({
        title: 'Erro',
        description: error.message || 'Ocorreu um erro inesperado',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  // Handle demo signup for specific demo users
  const createDemoUserIfNeeded = async (email: string, password: string) => {
    try {
      // Try to sign up first (will fail if user exists)
      const {
        error: signUpError
      } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/`
        }
      });

      // If signup successful or user already exists, try to create profile
      if (!signUpError || signUpError.message.includes('already registered')) {
        // For demo users, we need to insert into our usuarios table
        if (email === 'admin@vitatech.com' || email === 'carlos@empresa.com') {
          setTimeout(async () => {
            try {
              const {
                data: authUser
              } = await supabase.auth.getUser();
              if (authUser.user) {
                const empresaId = email === 'admin@vitatech.com' ? '11111111-1111-1111-1111-111111111111' : '22222222-2222-2222-2222-222222222222';
                const role = email === 'admin@vitatech.com' ? 'super_admin' : 'client_owner';
                const nome = email === 'admin@vitatech.com' ? 'Admin VitaTech' : 'Carlos Empresário';
                await supabase.from('usuarios').upsert({
                  id: authUser.user.id,
                  email: authUser.user.email,
                  nome,
                  empresa_id: empresaId,
                  role
                });
              }
            } catch (err) {
              console.error('Error creating user profile:', err);
            }
          }, 1000);
        }
        return true;
      }
      return false;
    } catch (error) {
      console.error('Demo user creation error:', error);
      return false;
    }
  };
  return <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted p-4">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-foreground">VitaTech Dashboard</h1>
          <p className="text-muted-foreground">
            {isLogin ? 'Faça login para continuar' : 'Crie sua conta'}
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {isLogin ? <>
                  <LogIn className="w-5 h-5" />
                  Entrar
                </> : <>
                  <UserPlus className="w-5 h-5" />
                  Cadastrar
                </>}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} required placeholder="seu@email.com" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Senha</Label>
                <Input id="password" type="password" value={password} onChange={e => setPassword(e.target.value)} required placeholder="••••••••" />
              </div>

              <Button type="submit" className="w-full" disabled={loading}>
                {loading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                {isLogin ? 'Entrar' : 'Cadastrar'}
              </Button>
            </form>

            <div className="text-center">
              <Button variant="link" onClick={() => setIsLogin(!isLogin)} className="text-sm">
                {isLogin ? 'Não tem conta? Cadastre-se' : 'Já tem conta? Faça login'}
              </Button>
            </div>

            {/* Demo Quick Login */}
            <div className="border-t pt-4 space-y-2">
              <p className="text-sm text-muted-foreground text-center">
                Contas de demonstração:
              </p>
              <div className="space-y-2 text-xs text-muted-foreground">
                <div className="bg-muted p-3 rounded-lg space-y-1">
                  <p className="font-medium">Admin VitaTech:</p>
                  <p>admin@vitatech.com</p>
                  <p>Senha: demo123</p>
                </div>
                <div className="bg-muted p-3 rounded-lg space-y-1">
                  <p className="font-medium">Cliente Demo:</p>
                  <p>Email: carlos@empresa.com</p>
                  <p>Senha: demo123</p>
                </div>
              </div>
              <p className="text-xs text-center text-muted-foreground">
                Primeiro faça o cadastro com estes emails e senha para usar a demo
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>;
}