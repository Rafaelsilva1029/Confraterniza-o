# 🚀 Guia Completo de Deploy no Vercel

Este guia fornece instruções passo a passo para hospedar o aplicativo **Confraternização** no Vercel com integração total ao Supabase e OAuth Manus.

---

## 📋 Pré-requisitos

Antes de começar, certifique-se de ter:

1. ✅ Conta no [Vercel](https://vercel.com)
2. ✅ Repositório GitHub conectado ([Rafaelsilva1029/Confraterniza-o](https://github.com/Rafaelsilva1029/Confraterniza-o))
3. ✅ Projeto Supabase criado e banco de dados configurado
4. ✅ Credenciais OAuth Manus (fornecidas pelo Manus)
5. ✅ Variáveis de ambiente prontas

---

## 🔑 Variáveis de Ambiente Necessárias

O Manus já gerencia automaticamente as seguintes variáveis. Você precisa obtê-las do seu painel Manus:

### **Variáveis Críticas (Obrigatórias)**

| Variável | Descrição | Exemplo |
|----------|-----------|---------|
| `DATABASE_URL` | URL de conexão Supabase | `mysql://user:pass@db.supabase.co:3306/postgres` |
| `JWT_SECRET` | Chave para assinar sessões | `sua-chave-secreta-super-segura` |
| `VITE_APP_ID` | ID da app OAuth Manus | `app_1234567890` |
| `OAUTH_SERVER_URL` | URL servidor OAuth | `https://api.manus.im` |
| `VITE_OAUTH_PORTAL_URL` | URL portal OAuth | `https://oauth.manus.im` |

### **Variáveis Fornecidas pelo Manus (Já Injetadas)**

Estas variáveis são **automaticamente gerenciadas** pelo Manus e não precisam ser configuradas manualmente:

```
OWNER_NAME
OWNER_OPEN_ID
BUILT_IN_FORGE_API_URL
BUILT_IN_FORGE_API_KEY
VITE_FRONTEND_FORGE_API_URL
VITE_FRONTEND_FORGE_API_KEY


VITE_APP_TITLE
VITE_APP_LOGO
```

---

## 📝 Passo 1: Preparar as Variáveis de Ambiente

### 1.1 Obter DATABASE_URL do Supabase

1. Acesse [supabase.com](https://supabase.com) e faça login
2. Selecione seu projeto
3. Vá para **Settings** → **Database**
4. Copie a **Connection String** (URI format)
5. Formato esperado: `mysql://user:password@host:port/database`

### 1.2 Gerar JWT_SECRET

Execute o comando abaixo para gerar uma chave segura:

```bash
# No seu terminal local
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Ou use um gerador online: [Generate Random String](https://www.random.org/strings/)

### 1.3 Obter Credenciais OAuth Manus

No seu painel Manus:

1. Vá para **Settings** → **OAuth Applications**
2. Copie:
   - `VITE_APP_ID`
   - `OAUTH_SERVER_URL`
   - `VITE_OAUTH_PORTAL_URL`

---

## 🚀 Passo 2: Conectar Repositório ao Vercel

### 2.1 Criar Projeto no Vercel

1. Acesse [vercel.com](https://vercel.com)
2. Clique em **"New Project"**
3. Selecione **"Import Git Repository"**
4. Escolha `Rafaelsilva1029/Confraterniza-o`
5. Clique em **"Import"**

### 2.2 Configurar Projeto

Na tela de configuração:

- **Project Name**: `confraternizacao-app` (ou seu nome preferido)
- **Framework Preset**: Deixe em branco (Vercel detectará automaticamente)
- **Build Command**: `pnpm build`
- **Output Directory**: `dist`
- **Install Command**: `pnpm install`

---

## 🔐 Passo 3: Adicionar Variáveis de Ambiente no Vercel

### 3.1 Acessar Configurações de Ambiente

1. No projeto Vercel, vá para **Settings** → **Environment Variables**
2. Clique em **"Add New"**

### 3.2 Adicionar Cada Variável

Adicione as seguintes variáveis (copie e cole os valores):

```
DATABASE_URL = mysql://seu-usuario:sua-senha@db.supabase.co:3306/postgres
JWT_SECRET = sua-chave-secreta-gerada-acima
VITE_APP_ID = seu-app-id-manus
OAUTH_SERVER_URL = https://api.manus.im
VITE_OAUTH_PORTAL_URL = https://oauth.manus.im
OWNER_NAME = Seu Nome
OWNER_OPEN_ID = seu-open-id
BUILT_IN_FORGE_API_URL = https://api.manus.im
BUILT_IN_FORGE_API_KEY = sua-chave-api-forge
VITE_FRONTEND_FORGE_API_URL = https://api.manus.im
VITE_FRONTEND_FORGE_API_KEY = sua-chave-api-forge-frontend


VITE_APP_TITLE = Aplicativo de Confraternização
VITE_APP_LOGO = https://seu-dominio.com/logo.png
NODE_ENV = production
```

**⚠️ Importante**: Adicione as variáveis em **todos os ambientes**: Production, Preview, e Development

---

## 🔗 Passo 4: Configurar Domínio (Opcional)

### 4.1 Usar Domínio Padrão Vercel

Seu app estará disponível em: `seu-projeto.vercel.app`

### 4.2 Usar Domínio Customizado

1. Vá para **Settings** → **Domains**
2. Clique em **"Add"**
3. Digite seu domínio (ex: `confraternizacao.com`)
4. Siga as instruções para configurar DNS

---

## ✅ Passo 5: Deploy

### 5.1 Iniciar Deploy

1. Volte para a aba **Deployments**
2. Clique em **"Deploy"** (ou o deploy começará automaticamente)
3. Aguarde a conclusão (geralmente 2-5 minutos)

### 5.2 Verificar Status

- ✅ **Status Verde**: Deploy bem-sucedido
- ⚠️ **Status Amarelo**: Em andamento
- ❌ **Status Vermelho**: Erro (verifique os logs)

### 5.3 Acessar Aplicação

Após o deploy bem-sucedido, acesse:
- `https://seu-projeto.vercel.app`
- ou seu domínio customizado

---

## 🐛 Troubleshooting

### Erro: "DATABASE_URL not found"

**Solução**: Verifique se a variável foi adicionada em **todos os ambientes** (Production, Preview, Development)

### Erro: "OAuth callback failed"

**Solução**: Confirme que `VITE_OAUTH_PORTAL_URL` está correto e que a URL de callback está registrada no Manus

### Erro: "Build failed"

**Solução**: Verifique os logs do Vercel:
1. Vá para **Deployments**
2. Clique no deployment com erro
3. Abra a aba **"Build Logs"**
4. Procure pela mensagem de erro

### Erro: "Connection refused to database"

**Solução**: Verifique se:
1. `DATABASE_URL` está correto
2. O Supabase está online
3. Seu IP está na whitelist do Supabase (se aplicável)

---

## 📊 Monitoramento

### Verificar Logs em Tempo Real

1. Vá para **Deployments** → Seu deployment
2. Clique em **"Runtime Logs"**
3. Monitore erros e avisos

### Configurar Alertas

1. Vá para **Settings** → **Notifications**
2. Configure alertas para falhas de deploy

---

## 🔄 Atualizações Futuras

Após fazer alterações no código:

1. Faça commit e push para o GitHub:
   ```bash
   git add .
   git commit -m "Sua mensagem"
   git push origin main
   ```

2. O Vercel detectará automaticamente e iniciará um novo deploy

3. Você pode acompanhar em **Deployments**

---

## 📞 Suporte

Se encontrar problemas:

1. **Vercel Docs**: https://vercel.com/docs
2. **Supabase Docs**: https://supabase.com/docs
3. **Manus Support**: https://help.manus.im

---

## ✨ Checklist Final

- [ ] Variáveis de ambiente adicionadas no Vercel
- [ ] Repositório GitHub conectado
- [ ] Build bem-sucedido
- [ ] Aplicação acessível online
- [ ] Autenticação OAuth funcionando
- [ ] Banco de dados conectado
- [ ] Domínio configurado (se customizado)

**Parabéns! 🎉 Seu aplicativo está no ar!**
