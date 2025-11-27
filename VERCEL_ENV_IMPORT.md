# 📥 Como Importar Variáveis de Ambiente no Vercel

Este guia mostra como importar o arquivo `.env.vercel` diretamente no Vercel, economizando tempo na configuração manual.

---

## 🚀 Método 1: Importar via Vercel CLI (Recomendado)

### **Passo 1: Instalar Vercel CLI**

Se você ainda não tem o Vercel CLI instalado:

```bash
npm i -g vercel
# ou
yarn global add vercel
# ou
pnpm add -g vercel
```

### **Passo 2: Fazer Login no Vercel**

```bash
vercel login
```

Siga as instruções para autenticar com sua conta Vercel.

### **Passo 3: Navegar para o Diretório do Projeto**

```bash
cd /home/ubuntu/confraternizacao-repo
```

### **Passo 4: Importar as Variáveis**

```bash
vercel env pull .env.vercel
```

Isso vai baixar as variáveis do Vercel para o arquivo `.env.vercel`.

**OU**, para adicionar as variáveis do arquivo ao Vercel:

```bash
vercel env add < .env.vercel
```

---

## 🌐 Método 2: Importar via Dashboard Vercel (Manual)

Se o Método 1 não funcionar, você pode fazer manualmente:

### **Passo 1: Acessar Vercel Dashboard**

1. Acesse [vercel.com](https://vercel.com)
2. Selecione seu projeto: **confraternizacao-app**
3. Vá para **Settings** → **Environment Variables**

### **Passo 2: Copiar Variáveis do Arquivo**

Abra o arquivo `.env.vercel` e copie cada linha:

```
NEXT_PUBLIC_SUPABASE_URL=https://tigumayeglzgsuyrwxys.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
DATABASE_URL=postgresql://postgres:10294560@db.tigumayeglzgsuyrwxys.supabase.co:5432/postgres
JWT_SECRET=sRMYT3WioKNvi8UM2W7nb2FDI6RyW2nuQu2aLQ7EVMadws05q6s82bTUbWwJfs2fdkMF6Mq+RiPHUWXJ4Yi2vA==
OWNER_OPEN_ID=310419663029810655
BUILT_IN_FORGE_API_KEY=sk-K312gDHehg0VYbtS3fwJH4VvHWWa3Cd_pO9V8By8KrR251HdM0QDZep0v6wU62xfUMG67arAuRIICOUyooUAbqViSNmN
OAUTH_SERVER_URL=https://api.manus.im
VITE_OAUTH_PORTAL_URL=https://oauth.manus.im
OWNER_NAME=Rafael Silva
VITE_APP_TITLE=Aplicativo de Confraternização
NODE_ENV=production
```

### **Passo 3: Adicionar no Vercel**

1. Clique em **"Add New"**
2. Cole cada variável (nome e valor)
3. Selecione: **Production**, **Preview**, **Development**
4. Clique em **"Add"**

Repita para cada variável.

### **Passo 4: Salvar**

Clique em **"Save"** quando terminar.

---

## 📋 Arquivo `.env.vercel`

O arquivo está localizado em: `/home/ubuntu/confraternizacao-repo/.env.vercel`

**Conteúdo:**

```env
NEXT_PUBLIC_SUPABASE_URL=https://tigumayeglzgsuyrwxys.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRpZ3VtYXllZ2x6Z3N1eXJ3eHlzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQxMjIxODcsImV4cCI6MjA3OTY5ODE4N30.cmcG_iMLsmduK0ri7RxsYP8AYy9LAp_1GhBS6Q_t5Rc
DATABASE_URL=postgresql://postgres:10294560@db.tigumayeglzgsuyrwxys.supabase.co:5432/postgres
JWT_SECRET=sRMYT3WioKNvi8UM2W7nb2FDI6RyW2nuQu2aLQ7EVMadws05q6s82bTUbWwJfs2fdkMF6Mq+RiPHUWXJ4Yi2vA==
OWNER_OPEN_ID=310419663029810655
BUILT_IN_FORGE_API_KEY=sk-K312gDHehg0VYbtS3fwJH4VvHWWa3Cd_pO9V8By8KrR251HdM0QDZep0v6wU62xfUMG67arAuRIICOUyooUAbqViSNmN
OAUTH_SERVER_URL=https://api.manus.im
VITE_OAUTH_PORTAL_URL=https://oauth.manus.im
OWNER_NAME=Rafael Silva
VITE_APP_TITLE=Aplicativo de Confraternização
NODE_ENV=production
```

---

## ✅ Checklist

- [ ] Instalei Vercel CLI (se usar Método 1)
- [ ] Fiz login no Vercel (`vercel login`)
- [ ] Importei as variáveis (CLI ou Manual)
- [ ] Verifiquei se todas as 11 variáveis foram adicionadas
- [ ] Selecionei Production, Preview e Development
- [ ] Cliquei em Save
- [ ] Fiz Redeploy

---

## 🎉 Próximo Passo

Após importar as variáveis:

1. Vá para **Deployments**
2. Clique em **"Redeploy"**
3. Aguarde 2-5 minutos
4. Seu app estará online! 🚀

---

## 📞 Troubleshooting

### ❌ Erro: "Command not found: vercel"

**Solução**: Instale o Vercel CLI:
```bash
npm install -g vercel
```

### ❌ Erro: "Not authenticated"

**Solução**: Faça login novamente:
```bash
vercel login
```

### ❌ Variáveis não aparecem no Vercel

**Solução**: Use o Método 2 (Manual) para adicionar uma por uma.

---

## 🔒 Segurança

⚠️ **Importante**: O arquivo `.env.vercel` contém suas credenciais sensíveis. 

- ✅ Nunca compartilhe este arquivo publicamente
- ✅ Não faça commit deste arquivo no Git (já está no `.gitignore`)
- ✅ Mantenha seguro em seu computador local

---

**Pronto! Suas variáveis estão importadas no Vercel! 🎉**
