// Tipos de negócio conforme PRD VitaTech

export interface Empresa {
  id: string;
  nome: string;
  plano: 'starter' | 'professional' | 'enterprise';
  created_at: string;
  configuracoes?: EmpresaConfiguracoes;
}

export interface EmpresaConfiguracoes {
  marca: {
    logo?: string;
    cores: {
      primaria: string;
      secundaria: string;
    };
  };
  whatsapp: {
    numero?: string;
    webhook_url?: string;
  };
}

export interface Usuario {
  id: string;
  email: string;
  nome: string;
  empresa_id: string;
  role: UserRole;
  created_at: string;
}

export type UserRole = 'super_admin' | 'client_owner' | 'client_admin' | 'client_viewer';

// === MÓDULO CAPTAÇÃO ===
export interface CaptacaoMetrics {
  mensagensEnviadas: number;
  respostasRecebidas: number;
  agendamentosRealizados: number;
  taxaResposta: number;
  taxaAgendamento: number;
  tendencia: 'up' | 'down' | 'stable';
  periodo: 'hoje' | 'semana' | 'mes';
}

export interface Lead {
  id: string;
  empresa_id: string;
  nome: string;
  telefone: string;
  email?: string;
  canal: 'whatsapp' | 'instagram' | 'facebook' | 'site';
  status: 'novo' | 'contato' | 'qualificado' | 'agendado' | 'perdido';
  score: number;
  ultimaInteracao: Date;
  observacoes?: string;
  created_at: string;
  updated_at: string;
}

// === MÓDULO CONTEÚDO ===
export interface ConteudoItem {
  id: string;
  empresa_id: string;
  tipo: 'post' | 'story' | 'video' | 'artigo';
  titulo: string;
  descricao?: string;
  status: 'ideia' | 'producao' | 'revisao' | 'aprovado' | 'publicado';
  criadoEm: Date;
  criadoPor: string;
  arquivos: string[]; // URLs Supabase Storage
  comentarios: Comentario[];
  agendamento?: Date;
  plataformas: ('instagram' | 'facebook' | 'linkedin' | 'tiktok')[];
}

export interface Comentario {
  id: string;
  conteudo_id: string;
  autor: string;
  texto: string;
  criadoEm: Date;
  resolvido: boolean;
  tipo: 'feedback' | 'aprovacao' | 'observacao';
}

// === MÓDULO ATENDIMENTO ===
export interface ChatbotConfig {
  id: string;
  empresa_id: string;
  nome: string;
  prompt_sistema: string;
  personalidade: {
    tom: 'formal' | 'casual' | 'amigavel' | 'profissional';
    estilo: string;
  };
  workflows: ChatbotWorkflow[];
  ativo: boolean;
  created_at: string;
  updated_at: string;
}

export interface ChatbotWorkflow {
  id: string;
  nome: string;
  trigger: string;
  acoes: WorkflowAcao[];
  ordem: number;
}

export interface WorkflowAcao {
  tipo: 'resposta' | 'agendamento' | 'transferencia' | 'coleta_dados';
  configuracao: Record<string, any>;
}

export interface AtendimentoMetrics {
  conversasIniciais: number;
  conversasFinalizadas: number;
  tempoMedioResposta: number;
  satisfacaoMedia: number;
  agendamentosGerados: number;
  periodo: 'hoje' | 'semana' | 'mes';
}

// === DASHBOARD ADMIN ===
export interface AdminMetrics {
  totalClientes: number;
  clientesAtivos: number;
  faturamentoMes: number;
  leadsGerados: number;
  conteudosPublicados: number;
  satisfacaoGeral: number;
  crescimentoMensal: number;
}

// === TIPOS GERAIS ===
export interface DashboardFilter {
  periodo: 'hoje' | 'semana' | 'mes' | 'trimestre';
  empresa_id?: string;
  status?: string[];
}

export interface NotificationSettings {
  email: boolean;
  push: boolean;
  whatsapp: boolean;
  tipos: ('leads' | 'conteudo' | 'sistema')[];
}