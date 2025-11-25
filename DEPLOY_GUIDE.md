# Guia Rápido de Deploy - Confraternização Liderança BP

## 📋 Checklist Rápido

- [ ] Criar projeto no Supabase
- [ ] Executar script SQL `supabase-setup.sql`
- [ ] Obter credenciais do Supabase
- [ ] Conectar repositório ao Netlify
- [ ] Configurar variáveis de ambiente no Netlify
- [ ] Deploy automático

---

## 🚀 Passo a Passo

### 1️⃣ Supabase - Criar Banco de Dados

```bash
# Acesse: https://supabase.com
# 1. Clique em "New Project"
# 2. Preencha os dados
# 3. Aguarde a criação
```

### 2️⃣ Supabase - Executar Script SQL

```sql
-- Copie o conteúdo de supabase-setup.sql
-- Cole no SQL Editor do Supabase
-- Clique em "Run"
```

**Credenciais necessárias (copie de Settings > API):**
- `VITE_SUPABASE_URL` → Project URL
- `VITE_SUPABASE_ANON_KEY` → anon public key

### 3️⃣ GitHub - Fazer Push do Código

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/seu-usuario/seu-repo.git
git push -u origin main
```

### 4️⃣ Netlify - Conectar Repositório

```
1. Acesse: https://netlify.com
2. Clique em "Add new site" > "Import an existing project"
3. Selecione GitHub e autorize
4. Selecione seu repositório
5. Configure as variáveis de ambiente (próximo passo)
6. Clique em "Deploy"
```

### 5️⃣ Netlify - Configurar Variáveis de Ambiente

No painel do Netlify, vá para:
**Site Settings → Build & Deploy → Environment**

Adicione as variáveis:

```
VITE_SUPABASE_URL=https://seu-projeto.supabase.co
VITE_SUPABASE_ANON_KEY=sua-chave-anonima
DATABASE_URL=postgresql://postgres:sua-senha@seu-projeto.supabase.co:5432/postgres
```

### 6️⃣ Pronto! 🎉

Seu site estará disponível em:
```
https://seu-site.netlify.app
```

---

## 📱 Testar Localmente (Opcional)

```bash
# Instalar dependências
pnpm install

# Configurar .env.local com as credenciais do Supabase
echo "VITE_SUPABASE_URL=..." > .env.local
echo "VITE_SUPABASE_ANON_KEY=..." >> .env.local

# Executar desenvolvimento
pnpm dev

# Acessar em http://localhost:5173
```

---

## 🔧 Variáveis de Ambiente

| Variável | Onde Obter |
|----------|-----------|
| `VITE_SUPABASE_URL` | Supabase → Settings → API → Project URL |
| `VITE_SUPABASE_ANON_KEY` | Supabase → Settings → API → anon public |
| `DATABASE_URL` | Supabase → Settings → Database → Connection String |

---

## ❓ Problemas Comuns

### "Cannot find module"
```bash
pnpm install
```

### "Database connection failed"
- Verifique as variáveis de ambiente no Netlify
- Certifique-se que o Supabase está acessível

### "CORS error"
- Adicione a URL do Netlify nas configurações CORS do Supabase

---

## 📞 Suporte

- **Supabase Docs**: https://supabase.com/docs
- **Netlify Docs**: https://docs.netlify.com
- **Vite Docs**: https://vitejs.dev

---

## 🎯 Próximas Melhorias

1. Adicionar autenticação de usuários
2. Exportar relatórios em PDF
3. Integração com WhatsApp API
4. Dashboard com gráficos
5. Histórico de transações

