import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/store/auth";
import { Shield, Users } from "lucide-react";

const Index = () => {
  const { isAuthenticated, user, login } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated && user) {
      if (user.role === 'super_admin') {
        navigate('/admin');
      } else {
        navigate('/client');
      }
    }
  }, [isAuthenticated, user, navigate]);

  const handleLogin = (role: 'super_admin' | 'client_owner') => {
    login(role);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted p-4">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground">Escolha seu tipo de acesso para continuar</p>
        </div>
        
        <div className="grid gap-4">
          <Card className="cursor-pointer transition-all hover:shadow-lg hover:scale-105">
            <CardHeader className="text-center">
              <div className="mx-auto w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center mb-2">
                <Shield className="w-6 h-6 text-primary-foreground" />
              </div>
              <CardTitle>Administrador</CardTitle>
            </CardHeader>
            <CardContent>
              <Button 
                onClick={() => handleLogin('super_admin')}
                className="w-full"
                size="lg"
              >
                Acessar como Admin
              </Button>
            </CardContent>
          </Card>

          <Card className="cursor-pointer transition-all hover:shadow-lg hover:scale-105">
            <CardHeader className="text-center">
              <div className="mx-auto w-12 h-12 bg-gradient-success rounded-full flex items-center justify-center mb-2">
                <Users className="w-6 h-6 text-success-foreground" />
              </div>
              <CardTitle>Cliente</CardTitle>
            </CardHeader>
            <CardContent>
              <Button 
                onClick={() => handleLogin('client_owner')}
                className="w-full"
                variant="outline"
                size="lg"
              >
                Acessar como Cliente
              </Button>
            </CardContent>
          </Card>
        </div>
        
        <p className="text-xs text-center text-muted-foreground">
          * Sistema de demonstração - Use os botões acima para testar diferentes perfis
        </p>
      </div>
    </div>
  );
};

export default Index;
