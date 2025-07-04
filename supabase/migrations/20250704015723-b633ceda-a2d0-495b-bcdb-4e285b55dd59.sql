-- Schema VitaTech Dashboard
-- Implementação completa conforme PRD

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

-- === RLS POLICIES ===

-- Empresas - Super admin vê todas, outros veem apenas a sua
CREATE POLICY "Super admin can view all companies" 
ON empresas 
FOR SELECT 
USING (
  EXISTS (
    SELECT 1 FROM usuarios 
    WHERE usuarios.id = auth.uid() 
    AND usuarios.role = 'super_admin'
  )
  OR 
  EXISTS (
    SELECT 1 FROM usuarios 
    WHERE usuarios.id = auth.uid() 
    AND usuarios.empresa_id = empresas.id
  )
);

-- Usuários - Isolamento por empresa
CREATE POLICY "Users can view users from their company"
ON usuarios
FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM usuarios u
    WHERE u.id = auth.uid()
    AND (
      u.role = 'super_admin' 
      OR u.empresa_id = usuarios.empresa_id
    )
  )
);

-- Leads - Isolamento por empresa
CREATE POLICY "Company isolation for leads"
ON leads
FOR ALL
USING (
  EXISTS (
    SELECT 1 FROM usuarios
    WHERE usuarios.id = auth.uid()
    AND (
      usuarios.role = 'super_admin'
      OR usuarios.empresa_id = leads.empresa_id
    )
  )
);

-- Conteúdos - Isolamento por empresa
CREATE POLICY "Company isolation for content"
ON conteudos
FOR ALL
USING (
  EXISTS (
    SELECT 1 FROM usuarios
    WHERE usuarios.id = auth.uid()
    AND (
      usuarios.role = 'super_admin'
      OR usuarios.empresa_id = conteudos.empresa_id
    )
  )
);

-- Comentários - Isolamento via conteúdo
CREATE POLICY "Company isolation for comments"
ON comentarios
FOR ALL
USING (
  EXISTS (
    SELECT 1 FROM usuarios u
    JOIN conteudos c ON c.empresa_id = u.empresa_id
    WHERE u.id = auth.uid()
    AND c.id = comentarios.conteudo_id
    AND (
      u.role = 'super_admin'
      OR u.empresa_id = c.empresa_id
    )
  )
);

-- Chatbot configs - Isolamento por empresa
CREATE POLICY "Company isolation for chatbot configs"
ON chatbot_configs
FOR ALL
USING (
  EXISTS (
    SELECT 1 FROM usuarios
    WHERE usuarios.id = auth.uid()
    AND (
      usuarios.role = 'super_admin'
      OR usuarios.empresa_id = chatbot_configs.empresa_id
    )
  )
);

-- === TRIGGERS PARA UPDATED_AT ===

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_empresas_updated_at 
BEFORE UPDATE ON empresas
FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

CREATE TRIGGER update_usuarios_updated_at 
BEFORE UPDATE ON usuarios
FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

CREATE TRIGGER update_leads_updated_at 
BEFORE UPDATE ON leads
FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

CREATE TRIGGER update_conteudos_updated_at 
BEFORE UPDATE ON conteudos
FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

CREATE TRIGGER update_chatbot_configs_updated_at 
BEFORE UPDATE ON chatbot_configs
FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

-- === DADOS MOCK PARA DESENVOLVIMENTO ===

-- Empresa VitaTech (Super Admin)
INSERT INTO empresas (id, nome, plano, configuracoes) VALUES 
('11111111-1111-1111-1111-111111111111', 'VitaTech Agência', 'enterprise', '{"whatsapp": {"numero": "+5511999999999"}}');

-- Empresas Cliente
INSERT INTO empresas (id, nome, plano, configuracoes) VALUES 
('22222222-2222-2222-2222-222222222222', 'Empresa Demo LTDA', 'professional', '{"marca": {"cores": {"primaria": "#3B82F6", "secundaria": "#10B981"}}}'),
('33333333-3333-3333-3333-333333333333', 'StartUp Tech', 'starter', '{}');

-- Usuários Mock
INSERT INTO usuarios (id, email, nome, empresa_id, role) VALUES 
('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'admin@vitatech.com', 'Admin VitaTech', '11111111-1111-1111-1111-111111111111', 'super_admin'),
('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'carlos@empresa.com', 'Carlos Empresário', '22222222-2222-2222-2222-222222222222', 'client_owner'),
('cccccccc-cccc-cccc-cccc-cccccccccccc', 'maria@startup.com', 'Maria Fundadora', '33333333-3333-3333-3333-333333333333', 'client_owner');

-- Leads Mock
INSERT INTO leads (empresa_id, nome, telefone, email, canal, status, score, observacoes) VALUES 
('22222222-2222-2222-2222-222222222222', 'João Silva', '+5511987654321', 'joao@email.com', 'whatsapp', 'qualificado', 85, 'Interessado no plano professional'),
('22222222-2222-2222-2222-222222222222', 'Ana Santos', '+5511987654322', 'ana@email.com', 'instagram', 'contato', 70, 'Aguardando retorno'),
('22222222-2222-2222-2222-222222222222', 'Pedro Costa', '+5511987654323', 'pedro@email.com', 'site', 'agendado', 90, 'Reunião agendada para sexta'),
('33333333-3333-3333-3333-333333333333', 'Laura Mendes', '+5511987654324', 'laura@email.com', 'facebook', 'novo', 60, 'Primeiro contato');

-- Conteúdos Mock
INSERT INTO conteudos (empresa_id, tipo, titulo, descricao, status, criado_por, plataformas) VALUES 
('22222222-2222-2222-2222-222222222222', 'post', 'Dicas de Produtividade', 'Post sobre ferramentas de produtividade', 'aprovado', 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', ARRAY['instagram', 'linkedin']),
('22222222-2222-2222-2222-222222222222', 'video', 'Tutorial Produto', 'Vídeo explicativo do nosso produto', 'producao', 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', ARRAY['youtube', 'instagram']),
('33333333-3333-3333-3333-333333333333', 'story', 'Bastidores da Startup', 'Stories mostrando o dia a dia', 'ideia', 'cccccccc-cccc-cccc-cccc-cccccccccccc', ARRAY['instagram']);

-- Chatbot Configs Mock
INSERT INTO chatbot_configs (empresa_id, nome, prompt_sistema, personalidade, workflows) VALUES 
('22222222-2222-2222-2222-222222222222', 'Assistente Virtual', 'Você é um assistente da Empresa Demo LTDA. Seja prestativo e profissional.', '{"tom": "profissional", "estilo": "cordial"}', '[{"nome": "Boas-vindas", "trigger": "oi", "ordem": 1}]'),
('33333333-3333-3333-3333-333333333333', 'Bot StartUp', 'Você representa a StartUp Tech. Seja jovem e inovador.', '{"tom": "casual", "estilo": "inovador"}', '[{"nome": "Saudação", "trigger": "olá", "ordem": 1}]');