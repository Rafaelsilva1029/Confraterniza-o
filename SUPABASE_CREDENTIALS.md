# Credenciais Supabase Fornecidas

As credenciais abaixo foram fornecidas no prompt inicial. Use-as para configurar o aplicativo:

## URLs e Chaves

```
VITE_SUPABASE_URL=https://yslfifuawvanufyaldjr.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlzbGZpZnVhd3ZhbnVmeWFsZGpyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQwMDQyMDAsImV4cCI6MjA3OTU4MDIwMH0.FGeL8vlc_rLC-CJFUZ9cTHvDH4f85wLJI78t07hC8WM
```

## Como Usar

### 1. No Netlify
Adicione estas variáveis em **Site Settings → Build & Deploy → Environment**:

```
VITE_SUPABASE_URL=https://yslfifuawvanufyaldjr.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlzbGZpZnVhd3ZhbnVmeWFsZGpyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQwMDQyMDAsImV4cCI6MjA3OTU4MDIwMH0.FGeL8vlc_rLC-CJFUZ9cTHvDH4f85wLJI78t07hC8WM
DATABASE_URL=postgresql://postgres:sua-senha@yslfifuawvanufyaldjr.supabase.co:5432/postgres
```

### 2. Localmente
Crie arquivo `.env.local` na raiz do projeto:

```
VITE_SUPABASE_URL=https://yslfifuawvanufyaldjr.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlzbGZpZnVhd3ZhbnVmeWFsZGpyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQwMDQyMDAsImV4cCI6MjA3OTU4MDIwMH0.FGeL8vlc_rLC-CJFUZ9cTHvDH4f85wLJI78t07hC8WM
DATABASE_URL=postgresql://postgres:sua-senha@yslfifuawvanufyaldjr.supabase.co:5432/postgres
```

## Próximos Passos

1. Acesse o Supabase em: https://supabase.com
2. Faça login ou crie uma conta
3. Acesse seu projeto com as credenciais acima
4. Vá para SQL Editor
5. Execute o script em `supabase-setup.sql`
6. As tabelas serão criadas automaticamente

## ⚠️ Importante

- Mantenha estas credenciais seguras
- Não compartilhe a chave ANON_KEY publicamente
- Para produção, considere usar chaves com permissões limitadas
