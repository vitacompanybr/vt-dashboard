-- Schema VitaTech Dashboard
-- Será importado quando conectar Supabase

-- === CORE TABLES ===

CREATE TABLE empresas (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nome TEXT NOT NULL,
  plano TEXT NOT NULL DEFAULT 'starter' CHECK (plano IN ('starter', 'professional', 'enterprise')),
  configuracoes JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE usuarios (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  nome TEXT NOT NULL,
  empresa_id UUID REFERENCES empresas(id) ON DELETE CASCADE,
  role TEXT NOT NULL DEFAULT 'client_viewer' CHECK (role IN ('super_admin', 'client_owner', 'client_admin', 'client_viewer')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- === MÓDULO CAPTAÇÃO ===

CREATE TABLE leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  empresa_id UUID REFERENCES empresas(id) ON DELETE CASCADE,
  nome TEXT NOT NULL,
  telefone TEXT NOT NULL,
  email TEXT,
  canal TEXT NOT NULL CHECK (canal IN ('whatsapp', 'instagram', 'facebook', 'site')),
  status TEXT NOT NULL DEFAULT 'novo' CHECK (status IN ('novo', 'contato', 'qualificado', 'agendado', 'perdido')),
  score INTEGER DEFAULT 0 CHECK (score >= 0 AND score <= 100),
  ultima_interacao TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  observacoes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- === MÓDULO CONTEÚDO ===

CREATE TABLE conteudos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  empresa_id UUID REFERENCES empresas(id) ON DELETE CASCADE,
  tipo TEXT NOT NULL CHECK (tipo IN ('post', 'story', 'video', 'artigo')),
  titulo TEXT NOT NULL,
  descricao TEXT,
  status TEXT NOT NULL DEFAULT 'ideia' CHECK (status IN ('ideia', 'producao', 'revisao', 'aprovado', 'publicado')),
  criado_por UUID REFERENCES usuarios(id),
  arquivos TEXT[] DEFAULT '{}',
  agendamento TIMESTAMP WITH TIME ZONE,
  plataformas TEXT[] DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE comentarios (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  conteudo_id UUID REFERENCES conteudos(id) ON DELETE CASCADE,
  autor UUID REFERENCES usuarios(id),
  texto TEXT NOT NULL,
  tipo TEXT NOT NULL DEFAULT 'observacao' CHECK (tipo IN ('feedback', 'aprovacao', 'observacao')),
  resolvido BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- === MÓDULO ATENDIMENTO ===

CREATE TABLE chatbot_configs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  empresa_id UUID REFERENCES empresas(id) ON DELETE CASCADE,
  nome TEXT NOT NULL,
  prompt_sistema TEXT NOT NULL,
  personalidade JSONB DEFAULT '{}',
  workflows JSONB DEFAULT '[]',
  ativo BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- === ÍNDICES PARA PERFORMANCE ===

CREATE INDEX idx_usuarios_empresa ON usuarios(empresa_id);
CREATE INDEX idx_leads_empresa ON leads(empresa_id);
CREATE INDEX idx_leads_status ON leads(status);
CREATE INDEX idx_conteudos_empresa ON conteudos(empresa_id);
CREATE INDEX idx_conteudos_status ON conteudos(status);
CREATE INDEX idx_comentarios_conteudo ON comentarios(conteudo_id);

-- === ROW LEVEL SECURITY ===

ALTER TABLE empresas ENABLE ROW LEVEL SECURITY;
ALTER TABLE usuarios ENABLE ROW LEVEL SECURITY;
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE conteudos ENABLE ROW LEVEL SECURITY;
ALTER TABLE comentarios ENABLE ROW LEVEL SECURITY;
ALTER TABLE chatbot_configs ENABLE ROW LEVEL SECURITY;

-- Policies serão criadas via interface Supabase após conexão
-- Exemplo de policy básica:
-- CREATE POLICY "Isolamento por empresa - leads" ON leads
--   FOR ALL USING (empresa_id = auth.jwt() ->> 'empresa_id');

-- === TRIGGERS PARA UPDATED_AT ===

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_empresas_updated_at BEFORE UPDATE ON empresas
    FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

CREATE TRIGGER update_usuarios_updated_at BEFORE UPDATE ON usuarios
    FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

CREATE TRIGGER update_leads_updated_at BEFORE UPDATE ON leads
    FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

CREATE TRIGGER update_conteudos_updated_at BEFORE UPDATE ON conteudos
    FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

CREATE TRIGGER update_chatbot_configs_updated_at BEFORE UPDATE ON chatbot_configs
    FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();