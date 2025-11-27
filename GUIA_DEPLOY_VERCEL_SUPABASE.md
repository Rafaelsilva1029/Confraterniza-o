# Guia de Deployment na Vercel com Supabase

## 📋 Pré-requisitos

- ✅ Conta na Vercel
- ✅ Projeto Supabase criado
- ✅ Repositório GitHub sincronizado

## 🚀 Passo a Passo para Deploy

### Passo 1: Acessar a Vercel

1. Acesse [vercel.com/new](https://vercel.com/new)
2. Você será redirecionado para a tela de importação de projeto

### Passo 2: Importar o Repositório

1. Na tela "Import Project", selecione **"Import from Git"**
2. Procure por `Rafaelsilva1029/Confraterniza-o`
3. Clique em **"Import"**

### Passo 3: Configurar o Projeto

Na tela de configuração do projeto:

- **Project Name**: `confraterniza-o-5hyf` (ou o nome que você preferir)
- **Framework Preset**: `Vite` (já selecionado)
- **Root Directory**: `./` (padrão)

### Passo 4: Adicionar Variáveis de Ambiente

Na seção **"Environment Variables"**, adicione as seguintes variáveis:

#### Opção A: Importar arquivo .env (Recomendado)

1. Clique em **"Import .env"** ou **"Paste the .env contents above"**
2. Cole o conteúdo abaixo:

```
DATABASE_URL=postgres://postgres.kxaqdnrxuqfssbquekan:aOYeQc0L3Ygr9oGx@aws-1-us-east-1.pooler.supabase.com:6543/postgres?sslmode=require&pgbouncer=true
NEXT_PUBLIC_SUPABASE_URL=https://kxaqdnrxuqfssbquekan.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt4YXFkbnJ4dXFmc3NicXVla2FuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQyNDIwNDQsImV4cCI6MjA3OTgxODA0NH0.c4DzGE7CU5pmmq2h9cbH7kxb4TkiZDBs3TXfqSTBvNI
SUPABASE_URL=https://kxaqdnrxuqfssbquekan.supabase.co
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt4YXFkbnJ4dXFmc3NicXVla2FuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQyNDIwNDQsImV4cCI6MjA3OTgxODA0NH0.c4DzGE7CU5pmmq2h9cbH7kxb4TkiZDBs3TXfqSTBvNI
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt4YXFkbnJ4dXFmc3NicXVla2FuIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2NDI0MjA0NCwiZXhwIjoyMDc5ODE4MDQ0fQ.cSF7CHtLsLTB6LQi5F38a1DXAXPvs5yp2yFGC306nBk
SUPABASE_JWT_SECRET=i+gw4BaFKCXjr4L7YNCCIQoX/A5Jv6a2IJjOmf6RTNJ9VivLF6bvd/Gne/52SjaDmaxG5zBeE69IaeoEHeRKUQ==
NODE_ENV=production
```

#### Opção B: Adicionar Manualmente

Clique em **"Add More"** e adicione cada variável:

| Chave | Valor |
|-------|-------|
| `DATABASE_URL` | `postgres://postgres.kxaqdnrxuqfssbquekan:aOYeQc0L3Ygr9oGx@aws-1-us-east-1.pooler.supabase.com:6543/postgres?sslmode=require&pgbouncer=true` |
| `NEXT_PUBLIC_SUPABASE_URL` | `https://kxaqdnrxuqfssbquekan.supabase.co` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt4YXFkbnJ4dXFmc3NicXVla2FuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQyNDIwNDQsImV4cCI6MjA3OTgxODA0NH0.c4DzGE7CU5pmmq2h9cbH7kxb4TkiZDBs3TXfqSTBvNI` |
| `SUPABASE_URL` | `https://kxaqdnrxuqfssbquekan.supabase.co` |
| `SUPABASE_ANON_KEY` | `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt4YXFkbnJ4dXFmc3NicXVla2FuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQyNDIwNDQsImV4cCI6MjA3OTgxODA0NH0.c4DzGE7CU5pmmq2h9cbH7kxb4TkiZDBs3TXfqSTBvNI` |
| `SUPABASE_SERVICE_ROLE_KEY` | `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt4YXFkbnJ4dXFmc3NicXVla2FuIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2NDI0MjA0NCwiZXhwIjoyMDc5ODE4MDQ0fQ.cSF7CHtLsLTB6LQi5F38a1DXAXPvs5yp2yFGC306nBk` |
| `SUPABASE_JWT_SECRET` | `i+gw4BaFKCXjr4L7YNCCIQoX/A5Jv6a2IJjOmf6RTNJ9VivLF6bvd/Gne/52SjaDmaxG5zBeE69IaeoEHeRKUQ==` |
| `NODE_ENV` | `production` |

### Passo 5: Deploy

1. Clique em **"Deploy"**
2. Aguarde o build completar (pode levar 2-5 minutos)
3. Você verá a URL do seu projeto quando o deploy terminar

## ✅ Verificação Pós-Deploy

Após o deploy ser concluído:

1. **Acesse a URL do projeto** fornecida pela Vercel
2. **Teste as rotas da API**:
   - `GET /api/trpc/funcionarios.list` - Lista de funcionários
   - `GET /api/trpc/despesas.list` - Lista de despesas

3. **Verifique se não há login**: A aplicação deve estar acessível sem autenticação

## 🔍 Troubleshooting

### Erro: "DATABASE_URL is required"

**Solução**: Verifique se a variável `DATABASE_URL` foi adicionada corretamente nas Environment Variables da Vercel.

### Erro: "Connection refused"

**Solução**: Verifique se o Supabase está ativo e se a DATABASE_URL está correta.

### Erro: "Build failed"

**Solução**: Verifique os logs de build na Vercel. Geralmente é um problema de dependências. Execute `pnpm install` localmente para validar.

## 📚 Estrutura do Projeto

```
confraterniza-o/
├── client/           # Frontend React
├── server/           # Backend Express + tRPC
├── drizzle/          # Schema e migrações (PostgreSQL)
├── shared/           # Código compartilhado
├── package.json      # Dependências
├── vercel.json       # Configuração Vercel
└── .env.supabase.vercel  # Variáveis de ambiente
```

## 🎯 Endpoints Disponíveis

### Funcionários
- `GET /api/trpc/funcionarios.list` - Listar todos
- `POST /api/trpc/funcionarios.create` - Criar novo
- `POST /api/trpc/funcionarios.update` - Atualizar
- `POST /api/trpc/funcionarios.delete` - Deletar

### Despesas
- `GET /api/trpc/despesas.list` - Listar todas
- `POST /api/trpc/despesas.create` - Criar nova
- `POST /api/trpc/despesas.update` - Atualizar
- `POST /api/trpc/despesas.delete` - Deletar

## 🔐 Segurança

⚠️ **AVISO**: Este aplicativo foi configurado **SEM AUTENTICAÇÃO** ou segurança. Qualquer pessoa com acesso à URL pode:
- Visualizar todos os dados
- Criar, editar e deletar registros
- Acessar a API diretamente

Se você precisar adicionar segurança no futuro, entre em contato.

## 📞 Suporte

Para problemas ou dúvidas:
1. Verifique os logs da Vercel
2. Verifique o status do Supabase
3. Valide as variáveis de ambiente

---

**Criado em**: 27 de Novembro de 2025
**Versão**: 1.0
