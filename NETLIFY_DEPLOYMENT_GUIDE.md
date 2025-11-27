# 🚀 Guia Completo de Deploy no Netlify

Este guia mostra como fazer o deploy do seu aplicativo no Netlify com todas as variáveis de ambiente configuradas corretamente.

---

## 📋 Suas Variáveis de Ambiente

Todas as variáveis necessárias estão em: `.env.netlify`

```
NEXT_PUBLIC_SUPABASE_URL=https://tigumayeglzgsuyrwxys.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
DATABASE_URL=postgresql://postgres.tigumayeglzgsuyrwxys:10294560%40Yuri@aws-1-us-east-2.pooler.supabase.com:6543/postgres
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

## 🎯 Passo 1: Conectar Repositório ao Netlify

1. Acesse [netlify.com](https://netlify.com)
2. Clique em **"Add new site"** → **"Import an existing project"**
3. Selecione **GitHub**
4. Autorize o Netlify a acessar seus repositórios
5. Selecione: `Rafaelsilva1029/Confraterniza-o`
6. Clique em **"Connect & deploy"**

---

## 🔐 Passo 2: Configurar Variáveis de Ambiente

### **Opção A: Via Dashboard Netlify (Recomendado)**

1. Após conectar o repositório, você verá a tela de configuração
2. Clique em **"Show advanced"** (se disponível)
3. Clique em **"New variable"** para cada variável:

| Nome | Valor |
|------|-------|
| `NEXT_PUBLIC_SUPABASE_URL` | `https://tigumayeglzgsuyrwxys.supabase.co` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...` |
| `DATABASE_URL` | `postgresql://postgres.tigumayeglzgsuyrwxys:10294560%40Yuri@aws-1-us-east-2.pooler.supabase.com:6543/postgres` |
| `JWT_SECRET` | `sRMYT3WioKNvi8UM2W7nb2FDI6RyW2nuQu2aLQ7EVMadws05q6s82bTUbWwJfs2fdkMF6Mq+RiPHUWXJ4Yi2vA==` |
| `OWNER_OPEN_ID` | `310419663029810655` |
| `BUILT_IN_FORGE_API_KEY` | `sk-K312gDHehg0VYbtS3fwJH4VvHWWa3Cd_pO9V8By8KrR251HdM0QDZep0v6wU62xfUMG67arAuRIICOUyooUAbqViSNmN` |
| `OAUTH_SERVER_URL` | `https://api.manus.im` |
| `VITE_OAUTH_PORTAL_URL` | `https://oauth.manus.im` |
| `OWNER_NAME` | `Rafael Silva` |
| `VITE_APP_TITLE` | `Aplicativo de Confraternização` |
| `NODE_ENV` | `production` |

4. Clique em **"Deploy"** quando terminar

### **Opção B: Via Arquivo netlify.toml**

O arquivo `netlify.toml` já está configurado no seu repositório. Você só precisa adicionar as variáveis no dashboard.

---

## 🚀 Passo 3: Configuração Automática de Build

O arquivo `netlify.toml` já está configurado com:

- ✅ Build command: `pnpm build`
- ✅ Publish directory: `dist`
- ✅ Node version: 20
- ✅ Redirects automáticos
- ✅ Headers de segurança

**Você não precisa fazer nada! O Netlify usará automaticamente.**

---

## ⏳ Passo 4: Aguardar Deploy

1. O Netlify iniciará o build automaticamente
2. Você verá o progresso em **"Deploys"**
3. Aguarde 3-5 minutos
4. Quando terminar, você verá um link como: `https://seu-projeto.netlify.app`

---

## ✅ Checklist de Deploy

- [ ] Conectei meu repositório GitHub ao Netlify
- [ ] Adicionei todas as 11 variáveis de ambiente
- [ ] Cliquei em "Deploy"
- [ ] Aguardei o build completar (status verde)
- [ ] Acessei meu app em `seu-projeto.netlify.app`

---

## 🧪 Testando Seu App

Após o deploy bem-sucedido:

1. Acesse: `https://seu-projeto.netlify.app`
2. Você deve ver a página inicial
3. Clique em **"Login"** ou **"Entrar"**
4. Você será redirecionado para o Manus OAuth
5. Faça login com sua conta
6. Você deve voltar para o app autenticado

---

## 🐛 Troubleshooting

### ❌ Erro: "Build failed"

**Solução**:
1. Vá para **Deploys** → seu deployment
2. Clique em **"Deploy log"**
3. Procure pela mensagem de erro
4. Verifique se todas as variáveis foram adicionadas

### ❌ Erro: "DATABASE_URL not found"

**Solução**: Verifique se a variável foi adicionada corretamente no dashboard

### ❌ Erro: "OAuth callback failed"

**Solução**: Confirme que `OAUTH_SERVER_URL` e `VITE_OAUTH_PORTAL_URL` estão corretos

### ❌ Erro: "Cannot find module"

**Solução**: Aguarde o build completar. Se persistir, verifique o `package.json`

---

## 📊 Monitorar Deploy

1. Acesse seu projeto no Netlify
2. Vá para **Deploys**
3. Você verá o histórico de todos os deployments
4. Clique em um deployment para ver os detalhes

---

## 🔄 Atualizações Futuras

Sempre que você fizer alterações no código:

1. Faça commit e push para o GitHub:
   ```bash
   git add .
   git commit -m "Sua mensagem"
   git push origin main
   ```

2. O Netlify detectará automaticamente e iniciará um novo deploy

3. Você pode acompanhar em **Deploys**

---

## 🎯 Próximas Etapas

1. ✅ Conectar repositório ao Netlify
2. ⏳ Adicionar variáveis de ambiente
3. ⏳ Iniciar deploy
4. ⏳ Aguardar build completar
5. ⏳ Testar aplicação
6. ⏳ Configurar domínio customizado (opcional)

---

## 📁 Arquivos Importantes

- `netlify.toml` - Configuração do Netlify
- `.env.netlify` - Variáveis de ambiente
- `package.json` - Dependências e scripts

---

## 💡 Dicas

- O Netlify suporta **deploy automático** a cada push no GitHub
- Você pode **reverter** para um deployment anterior a qualquer momento
- Use **branch deploy** para testar em ambientes separados
- Configure **notificações** para ser avisado de falhas

---

## 🎉 Pronto!

Seu app está pronto para ser deployado no Netlify! 

**Siga os passos acima e seu app estará online em minutos! 🚀**

---

## 📞 Suporte

- [Netlify Docs](https://docs.netlify.com)
- [Supabase Docs](https://supabase.com/docs)
- [Manus Support](https://help.manus.im)
