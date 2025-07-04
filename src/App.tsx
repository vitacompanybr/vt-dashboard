import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
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

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          
          {/* Admin Routes */}
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/clientes" element={<AdminClientes />} />
          <Route path="/admin/metricas" element={<AdminMetricas />} />
          <Route path="/admin/configuracoes" element={<AdminSettings />} />
          
          {/* Client Routes */}
          <Route path="/client" element={<ClientCaptacao />} />
          <Route path="/client/atendimento" element={<ClientAtendimento />} />
          <Route path="/client/conteudo" element={<ClientConteudo />} />
          <Route path="/client/configuracoes" element={<ClientSettings />} />
          
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
