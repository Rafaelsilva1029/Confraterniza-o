# 🔑 Resumo das Variáveis de Ambiente para Vercel

Este documento fornece um resumo rápido de todas as variáveis que você precisa configurar no Vercel.

---

## 📌 Variáveis Obrigatórias (Você Precisa Fornecer)

Estas variáveis **DEVEM** ser configuradas manualmente no Vercel:

### 1. **DATABASE_URL** (Supabase)
- **O que é**: URL de conexão do seu banco de dados Supabase
- **Onde obter**: Supabase Dashboard → Settings → Database → Connection String
- **Formato**: `mysql://user:password@host:port/database`
- **Exemplo**: `mysql://postgres:abc123@db.supabase.co:3306/postgres`

### 2. **JWT_SECRET** (Sessões)
- **O que é**: Chave secreta para assinar tokens de sessão
- **Como gerar**: 
  ```bash
  node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
  ```
- **Exemplo**: `a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6`

### 3. **VITE_APP_ID** (OAuth Manus)
- **O que é**: ID da sua aplicação no Manus
- **Onde obter**: Manus Dashboard → Settings → OAuth Applications
- **Exemplo**: `app_1234567890abcdef`

### 4. **OAUTH_SERVER_URL** (OAuth Manus)
- **O que é**: URL do servidor OAuth Manus
- **Valor padrão**: `https://api.manus.im`

### 5. **VITE_OAUTH_PORTAL_URL** (OAuth Manus)
- **O que é**: URL do portal de login OAuth Manus
- **Valor padrão**: `https://oauth.manus.im`

---

## 🔄 Variáveis Fornecidas pelo Manus (Já Injetadas)

Estas variáveis são **automaticamente gerenciadas** pelo Manus. Você **NÃO** precisa configurá-las:

```
✅ OWNER_NAME
✅ OWNER_OPEN_ID
✅ BUILT_IN_FORGE_API_URL
✅ BUILT_IN_FORGE_API_KEY
✅ VITE_FRONTEND_FORGE_API_URL
✅ VITE_FRONTEND_FORGE_API_KEY


✅ VITE_APP_TITLE
✅ VITE_APP_LOGO
```

---

## 📋 Checklist de Configuração

### Passo 1: Coletar Informações

- [ ] Obter `DATABASE_URL` do Supabase
- [ ] Gerar `JWT_SECRET`
- [ ] Obter `VITE_APP_ID` do Manus
- [ ] Confirmar `OAUTH_SERVER_URL` = `https://api.manus.im`
- [ ] Confirmar `VITE_OAUTH_PORTAL_URL` = `https://oauth.manus.im`

### Passo 2: Configurar no Vercel

1. Acesse seu projeto no Vercel
2. Vá para **Settings** → **Environment Variables**
3. Adicione cada variável abaixo:

```
DATABASE_URL = [seu-valor-aqui]
JWT_SECRET = [seu-valor-aqui]
VITE_APP_ID = [seu-valor-aqui]
OAUTH_SERVER_URL = https://api.manus.im
VITE_OAUTH_PORTAL_URL = https://oauth.manus.im
NODE_ENV = production
```

4. **Importante**: Adicione em **todos os ambientes** (Production, Preview, Development)

### Passo 3: Deploy

- [ ] Confirmar que todas as variáveis foram adicionadas
- [ ] Fazer push de alterações para o GitHub
- [ ] Aguardar deploy automático no Vercel
- [ ] Testar aplicação em produção

---

## 🎯 Valores Padrão (Copie e Cole)

```
OAUTH_SERVER_URL=https://api.manus.im
VITE_OAUTH_PORTAL_URL=https://oauth.manus.im
NODE_ENV=production
```

---

## ⚠️ Dicas Importantes

1. **Nunca compartilhe** `JWT_SECRET` ou `DATABASE_URL` publicamente
2. **Sempre use HTTPS** para URLs de callback OAuth
3. **Adicione variáveis em todos os ambientes** (Production, Preview, Development)
4. **Teste a autenticação** após o deploy
5. **Monitore os logs** do Vercel em caso de erros

---

## 🔗 Links Úteis

- [Vercel Environment Variables Docs](https://vercel.com/docs/concepts/projects/environment-variables)
- [Supabase Connection Strings](https://supabase.com/docs/guides/database/connecting-to-postgres)
- [Manus OAuth Documentation](https://help.manus.im)

---

## 📞 Próximos Passos

1. ✅ Coletar as 5 variáveis obrigatórias
2. ✅ Acessar Vercel e adicionar as variáveis
3. ✅ Fazer push para GitHub (deploy automático)
4. ✅ Testar a aplicação
5. ✅ Configurar domínio customizado (opcional)

**Você está pronto para hospedar no Vercel! 🚀**
