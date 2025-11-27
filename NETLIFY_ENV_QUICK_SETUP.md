# ⚡ Setup Rápido - Netlify

Resumo rápido das variáveis que você precisa adicionar no Netlify.

---

## 🎯 Variáveis para Copiar e Colar

Adicione estas variáveis no Netlify Dashboard → **Site settings** → **Build & deploy** → **Environment**

### **Grupo 1: Supabase**
```
NEXT_PUBLIC_SUPABASE_URL = https://tigumayeglzgsuyrwxys.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRpZ3VtYXllZ2x6Z3N1eXJ3eHlzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQxMjIxODcsImV4cCI6MjA3OTY5ODE4N30.cmcG_iMLsmduK0ri7RxsYP8AYy9LAp_1GhBS6Q_t5Rc
DATABASE_URL = postgresql://postgres.tigumayeglzgsuyrwxys:10294560%40Yuri@aws-1-us-east-2.pooler.supabase.com:6543/postgres
```

### **Grupo 2: Autenticação**
```
JWT_SECRET = sRMYT3WioKNvi8UM2W7nb2FDI6RyW2nuQu2aLQ7EVMadws05q6s82bTUbWwJfs2fdkMF6Mq+RiPHUWXJ4Yi2vA==
```

### **Grupo 3: Manus**
```
OWNER_OPEN_ID = 310419663029810655
BUILT_IN_FORGE_API_KEY = sk-K312gDHehg0VYbtS3fwJH4VvHWWa3Cd_pO9V8By8KrR251HdM0QDZep0v6wU62xfUMG67arAuRIICOUyooUAbqViSNmN
OAUTH_SERVER_URL = https://api.manus.im
VITE_OAUTH_PORTAL_URL = https://oauth.manus.im
```

### **Grupo 4: Configuração**
```
OWNER_NAME = Rafael Silva
VITE_APP_TITLE = Aplicativo de Confraternização
NODE_ENV = production
```

---

## 🚀 Passos Rápidos

1. Acesse [netlify.com](https://netlify.com)
2. Clique em **"Add new site"** → **"Import an existing project"**
3. Selecione seu repositório GitHub: `Rafaelsilva1029/Confraterniza-o`
4. Vá para **"Site settings"** → **"Build & deploy"** → **"Environment"**
5. Adicione as 11 variáveis acima
6. Clique em **"Deploy"**
7. Aguarde 3-5 minutos
8. Seu app estará online! 🎉

---

## 📋 Total de Variáveis

**11 variáveis** no total

---

## ✅ Checklist

- [ ] Conectei repositório ao Netlify
- [ ] Adicionei todas as 11 variáveis
- [ ] Iniciei o deploy
- [ ] Aguardei build completar
- [ ] Acessei meu app online

---

**Pronto! Seu app estará online em minutos! 🚀**
