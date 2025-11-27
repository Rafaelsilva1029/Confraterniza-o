# 🚀 Tutorial de Configuração Vercel - Rafael Silva

Este é seu tutorial personalizado com as variáveis corretas para configurar no Vercel.

---

## 📋 Suas Variáveis de Ambiente (ATUALIZADAS)

Copie e cole **exatamente** estas variáveis no Vercel:

### **Variáveis do Supabase**

```
NEXT_PUBLIC_SUPABASE_URL=https://tigumayeglzgsuyrwxys.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRpZ3VtYXllZ2x6Z3N1eXJ3eHlzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQxMjIxODcsImV4cCI6MjA3OTY5ODE4N30.cmcG_iMLsmduK0ri7RxsYP8AYy9LAp_1GhBS6Q_t5Rc
DATABASE_URL=postgresql://postgres.tigumayeglzgsuyrwxys:10294560%40Yuri@aws-1-us-east-2.pooler.supabase.com:6543/postgres
```

### **Variáveis de Autenticação**

```
JWT_SECRET=sRMYT3WioKNvi8UM2W7nb2FDI6RyW2nuQu2aLQ7EVMadws05q6s82bTUbWwJfs2fdkMF6Mq+RiPHUWXJ4Yi2vA==
```

### **Variáveis do Manus**

```
OWNER_OPEN_ID=310419663029810655
BUILT_IN_FORGE_API_KEY=sk-K312gDHehg0VYbtS3fwJH4VvHWWa3Cd_pO9V8By8KrR251HdM0QDZep0v6wU62xfUMG67arAuRIICOUyooUAbqViSNmN
```

### **Variáveis Padrão do Manus (Não altere)**

```
OAUTH_SERVER_URL=https://api.manus.im
VITE_OAUTH_PORTAL_URL=https://oauth.manus.im
OWNER_NAME=Rafael Silva
VITE_APP_TITLE=Aplicativo de Confraternização
NODE_ENV=production
```

---

## 🎯 Passo a Passo para Configurar no Vercel

### **Passo 1: Acessar Configurações do Vercel**

1. Acesse seu projeto no Vercel: [vercel.com](https://vercel.com)
2. Selecione seu projeto: **confraternizacao-app**
3. Vá para **Settings** (Configurações)
4. Clique em **Environment Variables** (Variáveis de Ambiente)

### **Passo 2: Adicionar Variáveis**

Para cada variável abaixo, clique em **"Add New"** e copie/cole:

#### **Grupo 1: Supabase (3 variáveis)**

| Nome | Valor |
|------|-------|
| `NEXT_PUBLIC_SUPABASE_URL` | `https://tigumayeglzgsuyrwxys.supabase.co` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRpZ3VtYXllZ2x6Z3N1eXJ3eHlzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQxMjIxODcsImV4cCI6MjA3OTY5ODE4N30.cmcG_iMLsmduK0ri7RxsYP8AYy9LAp_1GhBS6Q_t5Rc` |
| `DATABASE_URL` | `postgresql://postgres.tigumayeglzgsuyrwxys:10294560%40Yuri@aws-1-us-east-2.pooler.supabase.com:6543/postgres` |

#### **Grupo 2: Autenticação (1 variável)**

| Nome | Valor |
|------|-------|
| `JWT_SECRET` | `sRMYT3WioKNvi8UM2W7nb2FDI6RyW2nuQu2aLQ7EVMadws05q6s82bTUbWwJfs2fdkMF6Mq+RiPHUWXJ4Yi2vA==` |

#### **Grupo 3: Manus (2 variáveis)**

| Nome | Valor |
|------|-------|
| `OWNER_OPEN_ID` | `310419663029810655` |
| `BUILT_IN_FORGE_API_KEY` | `sk-K312gDHehg0VYbtS3fwJH4VvHWWa3Cd_pO9V8By8KrR251HdM0QDZep0v6wU62xfUMG67arAuRIICOUyooUAbqViSNmN` |

#### **Grupo 4: Configuração Padrão (4 variáveis)**

| Nome | Valor |
|------|-------|
| `OAUTH_SERVER_URL` | `https://api.manus.im` |
| `VITE_OAUTH_PORTAL_URL` | `https://oauth.manus.im` |
| `OWNER_NAME` | `Rafael Silva` |
| `NODE_ENV` | `production` |

### **Passo 3: Selecionar Ambientes**

Para **CADA variável**, selecione:
- ✅ **Production**
- ✅ **Preview**
- ✅ **Development**

(Isso garante que funcione em todos os ambientes)

### **Passo 4: Salvar e Deploy**

1. Após adicionar todas as variáveis, clique em **"Save"**
2. Vá para **Deployments**
3. Clique em **"Redeploy"** ou faça um novo push para GitHub
4. Aguarde o deploy completar (2-5 minutos)

---

## ✅ Checklist de Configuração

- [ ] Acessei Settings → Environment Variables no Vercel
- [ ] Adicionei todas as 11 variáveis
- [ ] Selecionei Production, Preview e Development para cada uma
- [ ] Cliquei em Save
- [ ] Fiz o deploy (Redeploy ou push no GitHub)
- [ ] Aguardei 2-5 minutos
- [ ] Acessei meu app em `seu-projeto.vercel.app`

---

## 🧪 Testando Seu App

Após o deploy:

1. Acesse: `https://seu-projeto.vercel.app`
2. Você deve ver a página inicial
3. Clique em **"Login"** ou **"Entrar"**
4. Você será redirecionado para o Manus OAuth
5. Faça login com sua conta
6. Você deve voltar para o app autenticado

---

## 🐛 Troubleshooting

### ❌ Erro: "Database connection failed"

**Solução**: Verifique se `DATABASE_URL` está correto no Vercel

### ❌ Erro: "OAuth callback failed"

**Solução**: Confirme que `OAUTH_SERVER_URL` e `VITE_OAUTH_PORTAL_URL` estão corretos

### ❌ Erro: "Invalid JWT"

**Solução**: Verifique se `JWT_SECRET` foi copiado **exatamente** como está aqui

### ❌ Deploy falhou

**Solução**: 
1. Vá para **Deployments** → seu deployment
2. Clique em **"Build Logs"**
3. Procure pela mensagem de erro
4. Verifique se todas as variáveis foram adicionadas

---

## 📞 Próximos Passos

1. ✅ Configurar variáveis no Vercel (você está aqui)
2. ⏳ Fazer deploy
3. ⏳ Testar autenticação
4. ⏳ Configurar domínio customizado (opcional)

---

## 🎉 Resumo

Você tem **11 variáveis** para adicionar no Vercel:

- 3 do Supabase (URL, Chave Anon, Database URL)
- 1 de Autenticação (JWT Secret)
- 2 do Manus (Owner ID, API Key)
- 4 Padrão (OAuth URLs, Nome, Node Env)

**Tudo pronto! Basta adicionar no Vercel e fazer o deploy! 🚀**
