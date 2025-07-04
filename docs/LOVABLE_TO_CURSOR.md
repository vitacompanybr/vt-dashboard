# Guia de Migração: Lovable → Cursor

## Visão Geral
Este documento orienta a migração do projeto Dashboard VitaTech do Lovable para desenvolvimento local com Cursor + Claude.

## Pré-requisitos
- [ ] Projeto conectado ao GitHub via Lovable
- [ ] Node.js 18+ instalado
- [ ] Cursor editor instalado
- [ ] Acesso ao Supabase project

## Processo de Migração

### 1. Export do Lovable
1. No Lovable, clique em GitHub → Export to GitHub
2. Clone o repositório localmente:
```bash
git clone [repo-url]
cd dashboard-vitatech
```

### 2. Setup Local
```bash
# Instalar dependências
npm install

# Configurar Supabase local (opcional)
npx supabase init
npx supabase start
```

### 3. Variáveis de Ambiente
Criar `.env.local`:
```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 4. Cursor Configuration
O arquivo `.cursorrules` já está configurado com:
- Contexto do projeto VitaTech
- Estrutura das duas views (Admin/Cliente)
- Padrões de código
- Schema do banco

### 5. Verificação Pós-Migração

#### Funcionalidades a Manter:
- [ ] Sistema de autenticação mock funcional
- [ ] Roteamento admin/client
- [ ] Layout responsivo
- [ ] Sidebar colapsável
- [ ] Theme system (dark/light)
- [ ] Componentes shadcn/ui

#### Funcionalidades a Desenvolver:
- [ ] Conexão real com Supabase
- [ ] Módulo Captação completo
- [ ] Módulo Conteúdo avançado
- [ ] Módulo Atendimento
- [ ] Analytics e métricas
- [ ] Sistema de aprovações

## Estrutura Herdada do Lovable

### Pages Structure
```
src/pages/
├── admin/
│   ├── AdminDashboard.tsx ✓
│   ├── AdminClientes.tsx ✓ (renomeado)
│   ├── AdminMetricas.tsx ✓ (renomeado)
│   └── AdminSettings.tsx ✓
└── client/
    ├── ClientCaptacao.tsx ✓ (renomeado)
    ├── ClientAtendimento.tsx ✓ (renomeado)
    ├── ClientConteudo.tsx ✓ (renomeado)
    └── ClientSettings.tsx ✓
```

### Store Management
- `src/store/auth.ts` - Zustand auth store com multi-tenancy
- Tipos de negócio em `src/types/business.ts`

### UI Components
- shadcn/ui components já configurados
- `MetricCard` custom component
- Theme system via Tailwind

## Próximos Passos no Cursor

### Prioridade 1 - Supabase Integration
1. Conectar ao Supabase real
2. Implementar auth real
3. Aplicar schema do banco

### Prioridade 2 - Módulo Captação
1. KPI Cards dinâmicos
2. Gráficos com Recharts
3. Tabela de leads
4. Formulários de lead

### Prioridade 3 - Módulo Conteúdo
1. Kanban board
2. Upload de arquivos
3. Sistema de aprovações
4. Agendamento

## Comandos Úteis

```bash
# Desenvolvimento
npm run dev

# Build
npm run build

# Supabase (se local)
npx supabase status
npx supabase migration up

# Deploy
# [Configurar Vercel/Netlify]
```

## Troubleshooting

### Erros Comuns
1. **Import paths**: Verificar @/ aliases no tsconfig
2. **Environment vars**: Confirmar .env.local
3. **Supabase types**: Regenerar types se schema mudar

### Recursos de Apoio
- `.cursorrules` - Guia completo do projeto
- `lovable.config.js` - Configuração de referência  
- `src/types/business.ts` - Tipos do PRD

## Manutenção da Compatibilidade

### ⚠️ NÃO QUEBRAR:
- Estrutura de rotas existente
- Componentes shadcn/ui configurados
- Sistema de autenticação mock (até Supabase estar pronto)
- Layout responsivo

### ✅ PODE EVOLUIR:
- Migrar pages → app router (futuro)
- Adicionar testes
- Otimizar performance
- Adicionar PWA features

---

**Criado por**: Lovable AI
**Atualizado**: [Data da migração]