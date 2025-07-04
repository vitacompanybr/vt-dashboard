import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

// Admin Pages
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminClients from "./pages/admin/AdminClients";
import AdminMetrics from "./pages/admin/AdminMetrics";
import AdminSettings from "./pages/admin/AdminSettings";

// Client Pages
import ClientDashboard from "./pages/client/ClientDashboard";
import ClientSupport from "./pages/client/ClientSupport";
import ClientContent from "./pages/client/ClientContent";
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
          <Route path="/admin/clients" element={<AdminClients />} />
          <Route path="/admin/metrics" element={<AdminMetrics />} />
          <Route path="/admin/settings" element={<AdminSettings />} />
          
          {/* Client Routes */}
          <Route path="/client" element={<ClientDashboard />} />
          <Route path="/client/support" element={<ClientSupport />} />
          <Route path="/client/content" element={<ClientContent />} />
          <Route path="/client/settings" element={<ClientSettings />} />
          
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
