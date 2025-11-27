# 🤖 Setup Automático do Vercel

Este guia mostra como configurar automaticamente todas as variáveis de ambiente no Vercel usando um script.

---

## 🚀 Como Usar (3 Passos Simples)

### **Passo 1: Abrir Terminal**

Abra o terminal/prompt de comando no seu computador.

### **Passo 2: Navegar para o Projeto**

```bash
cd /caminho/para/seu/projeto/confraternizacao-repo
```

Ou, se você clonou o repositório:

```bash
cd ~/confraternizacao-repo
```

### **Passo 3: Executar o Script**

```bash
bash setup-vercel.sh
```

---

## 📋 O que o Script Faz

1. ✅ Verifica se Vercel CLI está instalado
2. ✅ Instala Vercel CLI (se necessário)
3. ✅ Faz login na sua conta Vercel
4. ✅ Adiciona todas as 11 variáveis de ambiente
5. ✅ Configura para Production, Preview e Development

---

## 🔧 Requisitos

- Node.js instalado (npm)
- Conta no Vercel
- Projeto já criado no Vercel (ou será criado durante o script)

---

## 📝 Variáveis Configuradas

O script adiciona automaticamente:

```
✅ NEXT_PUBLIC_SUPABASE_URL
✅ NEXT_PUBLIC_SUPABASE_ANON_KEY
✅ DATABASE_URL
✅ JWT_SECRET
✅ OWNER_OPEN_ID
✅ BUILT_IN_FORGE_API_KEY
✅ OAUTH_SERVER_URL
✅ VITE_OAUTH_PORTAL_URL
✅ OWNER_NAME
✅ VITE_APP_TITLE
✅ NODE_ENV
```

---

## ⚙️ Instalação Manual do Vercel CLI (Se Necessário)

Se o script não conseguir instalar, execute manualmente:

```bash
npm install -g vercel
```

Ou com yarn:

```bash
yarn global add vercel
```

Ou com pnpm:

```bash
pnpm add -g vercel
```

---

## 🔐 Login no Vercel

Quando o script pedir para fazer login:

1. Uma janela do navegador abrirá
2. Faça login com sua conta Vercel
3. Autorize a CLI
4. Volte para o terminal

---

## ✅ Após o Script Completar

1. Acesse [vercel.com](https://vercel.com)
2. Selecione seu projeto
3. Vá para **Deployments**
4. Clique em **"Redeploy"**
5. Aguarde 2-5 minutos
6. Seu app estará online! 🚀

---

## 🐛 Troubleshooting

### ❌ "Command not found: bash"

**Solução**: Você está no Windows. Use PowerShell ou Git Bash:

```powershell
# PowerShell
powershell -ExecutionPolicy Bypass -File setup-vercel.ps1
```

### ❌ "vercel: command not found"

**Solução**: Instale Vercel CLI manualmente:

```bash
npm install -g vercel
```

### ❌ "Permission denied"

**Solução**: Dê permissão de execução:

```bash
chmod +x setup-vercel.sh
bash setup-vercel.sh
```

---

## 📞 Próximos Passos

1. ✅ Executar o script
2. ⏳ Fazer login no Vercel
3. ⏳ Aguardar configuração das variáveis
4. ⏳ Fazer Redeploy no Vercel
5. ⏳ Acessar seu app online

---

**Pronto! O setup automático vai cuidar de tudo para você! 🎉**
