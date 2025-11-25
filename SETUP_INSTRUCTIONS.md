# Instruções de Setup - Confraternização Liderança BP

## 1. Configurar Banco de Dados no Supabase

### Passo 1: Criar Projeto no Supabase
1. Acesse [supabase.com](https://supabase.com)
2. Clique em "New Project"
3. Preencha os dados do projeto
4. Aguarde a criação do projeto

### Passo 2: Executar Script SQL
1. No painel do Supabase, vá para "SQL Editor"
2. Clique em "New Query"
3. Copie e cole o conteúdo do arquivo `supabase-setup.sql`
4. Clique em "Run" para executar o script
5. As tabelas `funcionarios` e `despesas` serão criadas automaticamente

### Passo 3: Obter Credenciais
1. Vá para "Settings" > "API"
2. Copie:
   - **Project URL** (será a `VITE_SUPABASE_URL`)
   - **anon public** (será a `VITE_SUPABASE_ANON_KEY`)

## 2. Configurar Variáveis de Ambiente

### Para Desenvolvimento Local
Crie um arquivo `.env.local` na raiz do projeto:

```
VITE_SUPABASE_URL=https://seu-projeto.supabase.co
VITE_SUPABASE_ANON_KEY=sua-chave-anonima
DATABASE_URL=postgresql://postgres:sua-senha@seu-projeto.supabase.co:5432/postgres
```

### Para Netlify
1. Vá para seu site no Netlify
2. Acesse "Site Settings" > "Build & Deploy" > "Environment"
3. Clique em "Edit Variables"
4. Adicione as mesmas variáveis acima

## 3. Deploy no Netlify

### Opção 1: Via Git (Recomendado)
1. Faça push do código para GitHub/GitLab/Bitbucket
2. No Netlify, clique em "New site from Git"
3. Conecte seu repositório
4. Configure as variáveis de ambiente
5. Clique em "Deploy"

### Opção 2: Deploy Manual
1. Execute `pnpm build` localmente
2. Faça upload da pasta `dist` para Netlify via drag-and-drop

## 4. Estrutura de Arquivos

```
confraternizacao_lideranca_bp/
├── client/                 # Frontend (React)
│   ├── src/
│   │   ├── pages/
│   │   │   └── Dashboard.tsx
│   │   ├── App.tsx
│   │   └── main.tsx
│   └── dist/              # Build output (gerado após pnpm build)
├── server/                # Backend (tRPC)
│   ├── routers.ts
│   └── db.ts
├── drizzle/               # Schema do banco de dados
│   └── schema.ts
├── netlify.toml           # Configuração do Netlify
├── supabase-setup.sql     # Script para criar tabelas
└── package.json
```

## 5. Variáveis de Ambiente Necessárias

| Variável | Descrição | Exemplo |
|----------|-----------|---------|
| `VITE_SUPABASE_URL` | URL do projeto Supabase | `https://seu-projeto.supabase.co` |
| `VITE_SUPABASE_ANON_KEY` | Chave anônima do Supabase | `eyJhbGciOiJIUzI1NiIs...` |
| `DATABASE_URL` | String de conexão PostgreSQL | `postgresql://postgres:senha@host:5432/postgres` |

## 6. Verificar se está Funcionando

1. Acesse sua URL do Netlify
2. Você deve ver o header "Confraternização Liderança BP" com animação
3. Tente adicionar um funcionário clicando em "Adicionar"
4. Os dados devem ser salvos no Supabase

## 7. Troubleshooting

### Erro: "Cannot connect to database"
- Verifique se as variáveis de ambiente estão corretas
- Certifique-se de que o Supabase está acessível

### Erro: "Table does not exist"
- Execute novamente o script `supabase-setup.sql`
- Verifique se as tabelas foram criadas em "Database" > "Tables"

### Erro: "CORS error"
- Verifique as configurações de CORS no Supabase
- Adicione a URL do Netlify nas origens permitidas

## 8. Próximas Etapas

- Customize o design conforme necessário
- Adicione mais funcionalidades
- Configure domínio customizado no Netlify
- Configure SSL/HTTPS (automático no Netlify)

## Suporte

Para dúvidas sobre:
- **Supabase**: https://supabase.com/docs
- **Netlify**: https://docs.netlify.com
- **React/Vite**: https://vitejs.dev
