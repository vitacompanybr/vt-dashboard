export default {
  project: {
    name: "dashboard-vitatech",
    description: "Dashboard Agência VitaTech - Admin & Cliente Views",
    version: "1.0.0"
  },
  routes: {
    admin: {
      base: "/admin",
      pages: ["dashboard", "clientes", "metricas", "configuracoes"]
    },
    client: {
      base: "/client", 
      pages: ["captacao", "atendimento", "conteudo", "configuracoes"]
    }
  },
  supabase: {
    enabled: true,
    features: ["auth", "database", "storage", "realtime"]
  },
  views: {
    admin: {
      theme: "dark",
      density: "high",
      focus: "functionality"
    },
    client: {
      theme: "light", 
      density: "low",
      focus: "user-friendly"
    }
  }
}