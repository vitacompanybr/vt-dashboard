import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/store/auth";
import { Shield, Users, LogIn } from "lucide-react";

const Index = () => {
  const { isAuthenticated, user, loading } = useAuthStore();
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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="text-muted-foreground">Carregando...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted p-4">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-foreground">VitaTech Dashboard</h1>
          <p className="text-muted-foreground">Bem-vindo ao sistema de gestão</p>
        </div>
        
        <Card>
          <CardHeader className="text-center">
            <div className="mx-auto w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center mb-2">
              <LogIn className="w-6 h-6 text-primary-foreground" />
            </div>
            <CardTitle>Acesso ao Sistema</CardTitle>
          </CardHeader>
          <CardContent>
            <Button 
              onClick={() => navigate('/auth')}
              className="w-full"
              size="lg"
            >
              Fazer Login
            </Button>
          </CardContent>
        </Card>
        
        <p className="text-xs text-center text-muted-foreground">
          Entre com suas credenciais para acessar o dashboard
        </p>
      </div>
    </div>
  );
};

export default Index;
