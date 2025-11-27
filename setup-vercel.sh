#!/bin/bash

# Script para configurar automaticamente as variáveis de ambiente no Vercel
# Uso: bash setup-vercel.sh

echo "🚀 Iniciando configuração automática do Vercel..."
echo ""

# Verificar se Vercel CLI está instalado
if ! command -v vercel &> /dev/null; then
    echo "❌ Vercel CLI não está instalado."
    echo "Instalando Vercel CLI..."
    npm install -g vercel
fi

echo "✅ Vercel CLI encontrado"
echo ""

# Fazer login no Vercel
echo "🔐 Fazendo login no Vercel..."
vercel login

echo ""
echo "📝 Configurando variáveis de ambiente..."
echo ""

# Variáveis de Ambiente
VARS=(
    "NEXT_PUBLIC_SUPABASE_URL=https://tigumayeglzgsuyrwxys.supabase.co"
    "NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRpZ3VtYXllZ2x6Z3N1eXJ3eHlzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQxMjIxODcsImV4cCI6MjA3OTY5ODE4N30.cmcG_iMLsmduK0ri7RxsYP8AYy9LAp_1GhBS6Q_t5Rc"
    "DATABASE_URL=postgresql://postgres.tigumayeglzgsuyrwxys:10294560%40Yuri@aws-1-us-east-2.pooler.supabase.com:6543/postgres"
    "JWT_SECRET=sRMYT3WioKNvi8UM2W7nb2FDI6RyW2nuQu2aLQ7EVMadws05q6s82bTUbWwJfs2fdkMF6Mq+RiPHUWXJ4Yi2vA=="
    "OWNER_OPEN_ID=310419663029810655"
    "BUILT_IN_FORGE_API_KEY=sk-K312gDHehg0VYbtS3fwJH4VvHWWa3Cd_pO9V8By8KrR251HdM0QDZep0v6wU62xfUMG67arAuRIICOUyooUAbqViSNmN"
    "OAUTH_SERVER_URL=https://api.manus.im"
    "VITE_OAUTH_PORTAL_URL=https://oauth.manus.im"
    "OWNER_NAME=Rafael Silva"
    "VITE_APP_TITLE=Aplicativo de Confraternização"
    "NODE_ENV=production"
)

# Adicionar cada variável
for var in "${VARS[@]}"; do
    KEY=$(echo $var | cut -d'=' -f1)
    VALUE=$(echo $var | cut -d'=' -f2-)
    
    echo "Adicionando: $KEY"
    vercel env add $KEY --value "$VALUE" --environment production,preview,development
done

echo ""
echo "✅ Todas as variáveis foram configuradas!"
echo ""
echo "🚀 Próximos passos:"
echo "1. Acesse https://vercel.com"
echo "2. Selecione seu projeto"
echo "3. Vá para Deployments"
echo "4. Clique em 'Redeploy'"
echo "5. Aguarde o deploy completar"
echo ""
echo "🎉 Pronto! Seu app estará online em breve!"
