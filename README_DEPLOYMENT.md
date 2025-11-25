# Confraternização Liderança BP - Guia de Deploy

## 📦 Arquivos Inclusos

Este pacote contém tudo que você precisa para hospedar o aplicativo no Netlify:

### Documentação
- **DEPLOY_GUIDE.md** - Guia rápido passo a passo
- **SETUP_INSTRUCTIONS.md** - Instruções detalhadas
- **SUPABASE_CREDENTIALS.md** - Credenciais do Supabase fornecidas
- **README_DEPLOYMENT.md** - Este arquivo

### Scripts SQL
- **supabase-setup.sql** - Script para criar tabelas no Supabase

### Configuração
- **netlify.toml** - Configuração para deploy no Netlify
- **.env.example** - Variáveis de ambiente necessárias
- **package.json** - Dependências do projeto

### Código Fonte
- **client/src/pages/Dashboard.tsx** - Interface principal do aplicativo
- **server/routers.ts** - API tRPC (backend)
- **drizzle/schema.ts** - Schema do banco de dados

---

## 🚀 Início Rápido (3 Passos)

### 1. Supabase - Executar Script SQL
```sql
-- Copie o conteúdo de supabase-setup.sql
-- Cole no SQL Editor do Supabase
-- Clique em "Run"
```

### 2. GitHub - Fazer Push do Código
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/seu-usuario/seu-repo.git
git push -u origin main
```

### 3. Netlify - Deploy
1. Acesse https://netlify.com
2. Clique em "Add new site" > "Import an existing project"
3. Conecte seu repositório GitHub
4. Configure variáveis de ambiente (veja SUPABASE_CREDENTIALS.md)
5. Clique em "Deploy"

---

## 🔐 Variáveis de Ambiente

As seguintes variáveis devem ser configuradas no Netlify:

| Variável | Valor |
|----------|-------|
| `VITE_SUPABASE_URL` | https://yslfifuawvanufyaldjr.supabase.co |
| `VITE_SUPABASE_ANON_KEY` | [Veja SUPABASE_CREDENTIALS.md] |
| `DATABASE_URL` | postgresql://postgres:senha@yslfifuawvanufyaldjr.supabase.co:5432/postgres |

---

## 📱 Funcionalidades

✅ **Controle de Pagamentos**
- Adicionar/editar/deletar funcionários
- Definir valor de contribuição
- Atualizar status (Pago, Pendente, Aguardando Alvará)
- Filtrar por status
- Buscar por nome

✅ **Controle de Despesas**
- Registrar despesas
- Editar/deletar despesas
- Ver total de gastos

✅ **Relatórios**
- Visualizar resumo financeiro
- Exportar relatório para compartilhamento
- Pré-visualização profissional

✅ **Interface**
- Header com animação
- Layout responsivo (mobile/desktop)
- Notificações toast
- Abas para navegação

---

## 🛠️ Tecnologias

- **Frontend**: React 19 + Vite + Tailwind CSS
- **Backend**: tRPC + Express
- **Banco de Dados**: PostgreSQL (Supabase)
- **Hospedagem**: Netlify
- **Linguagem**: TypeScript

---

## 📞 Suporte

### Documentação Oficial
- [Supabase Docs](https://supabase.com/docs)
- [Netlify Docs](https://docs.netlify.com)
- [Vite Docs](https://vitejs.dev)
- [React Docs](https://react.dev)

### Troubleshooting
Veja a seção de "Problemas Comuns" em SETUP_INSTRUCTIONS.md

---

## 📝 Próximas Etapas

Após o deploy bem-sucedido, você pode:

1. **Customizar Design** - Edite as cores em `client/src/index.css`
2. **Adicionar Funcionalidades** - Estenda `server/routers.ts`
3. **Configurar Domínio** - Adicione domínio customizado no Netlify
4. **Melhorar UX** - Adicione mais recursos conforme necessário

---

## ✨ Recursos Futuros

- Autenticação de usuários
- Exportação em PDF
- Integração com WhatsApp API
- Dashboard com gráficos
- Histórico de transações
- Relatórios mensais

---

## 📄 Licença

Este projeto é fornecido como está para uso pessoal.

---

**Última atualização**: 25 de Novembro de 2025
**Versão**: 1.0.0
