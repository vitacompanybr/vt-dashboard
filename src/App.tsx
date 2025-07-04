import { useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuthStore } from "@/store/auth";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";

// Admin Pages
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminClientes from "./pages/admin/AdminClientes";
import AdminMetricas from "./pages/admin/AdminMetricas";
import AdminSettings from "./pages/admin/AdminSettings";

// Client Pages
import ClientCaptacao from "./pages/client/ClientCaptacao";
import ClientAtendimento from "./pages/client/ClientAtendimento";
import ClientConteudo from "./pages/client/ClientConteudo";
import ClientSettings from "./pages/client/ClientSettings";

const queryClient = new QueryClient();

function AppContent() {
  const { initialize } = useAuthStore();

  useEffect(() => {
    const unsubscribe = initialize();
    return unsubscribe;
  }, [initialize]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/auth" element={<Auth />} />
        
        {/* Admin Routes */}
        <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/clientes" element={<AdminClientes />} />
        <Route path="/admin/metricas" element={<AdminMetricas />} />
        <Route path="/admin/configuracoes" element={<AdminSettings />} />
        
        {/* Client Routes */}
        <Route path="/client" element={<Navigate to="/client/captacao" replace />} />
        <Route path="/client/captacao" element={<ClientCaptacao />} />
        <Route path="/client/atendimento" element={<ClientAtendimento />} />
        <Route path="/client/conteudo" element={<ClientConteudo />} />
        <Route path="/client/configuracoes" element={<ClientSettings />} />
        
        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AppContent />
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
