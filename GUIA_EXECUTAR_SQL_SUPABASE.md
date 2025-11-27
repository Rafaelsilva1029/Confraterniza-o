# Guia: Executar Script SQL no Supabase

## 📋 Pré-requisitos

- ✅ Projeto Supabase criado
- ✅ Acesso ao painel do Supabase
- ✅ Script SQL: `SCRIPT_SQL_SUPABASE_POSTGRESQL.sql`

## 🚀 Passo a Passo

### Passo 1: Acessar o Supabase

1. Acesse [app.supabase.com](https://app.supabase.com)
2. Faça login com sua conta
3. Selecione o projeto `kxaqdnrxuqfssbquekan`

### Passo 2: Acessar o SQL Editor

1. No painel esquerdo, clique em **"SQL Editor"**
2. Clique em **"New Query"** ou **"+"**

### Passo 3: Copiar e Colar o Script

1. Abra o arquivo `SCRIPT_SQL_SUPABASE_POSTGRESQL.sql`
2. Copie **TODO** o conteúdo
3. Cole no editor SQL do Supabase
4. Clique em **"Run"** (ou pressione `Ctrl+Enter`)

### Passo 4: Verificar a Execução

Você deve ver mensagens de sucesso como:

```
CREATE TYPE
CREATE TABLE
CREATE INDEX
CREATE FUNCTION
CREATE TRIGGER
CREATE VIEW
```

Se houver erros, verifique:
- Se o script foi copiado completamente
- Se não há caracteres especiais corrompidos
- Se o banco de dados está acessível

## 📊 O que o Script Cria

### Tipos (ENUMs)
- `user_role` - Roles de usuário (user, admin)
- `funcionario_status` - Status de funcionário (Pago, Pendente, Aguardando Alvará)

### Tabelas
1. **users** - Usuários do sistema
2. **funcionarios** - Registro de funcionários e contribuições
3. **despesas** - Registro de despesas

### Índices
- `idx_users_openid` - Busca rápida por openId
- `idx_funcionarios_status` - Filtro por status
- `idx_funcionarios_createdat` - Ordenação por data
- `idx_despesas_data_compra` - Filtro por data de compra
- `idx_despesas_createdat` - Ordenação por data

### Triggers
- Atualização automática de `updatedAt` em todas as tabelas

### Views (Relatórios)
1. **vw_funcionarios_resumo** - Resumo geral de funcionários
2. **vw_despesas_resumo** - Resumo geral de despesas
3. **vw_funcionarios_por_status** - Agrupamento por status

## 🔍 Verificar as Tabelas Criadas

### No Supabase:

1. Clique em **"Table Editor"** no painel esquerdo
2. Você deve ver as tabelas:
   - `users`
   - `funcionarios`
   - `despesas`

### Via SQL:

Execute esta query para listar todas as tabelas:

```sql
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
ORDER BY table_name;
```

## 📝 Inserir Dados de Exemplo (Opcional)

Se você quiser adicionar dados de exemplo, descomente a seção 8 do script:

```sql
-- Inserir funcionários de exemplo
INSERT INTO funcionarios (nome, valor_contribuicao, status) VALUES
('João Silva', 50000, 'Pago'),
('Maria Santos', 45000, 'Pendente'),
('Pedro Oliveira', 55000, 'Pago'),
('Ana Costa', 40000, 'Aguardando Alvará'),
('Carlos Mendes', 50000, 'Pago');

-- Inserir despesas de exemplo
INSERT INTO despesas (item, valor, data_compra) VALUES
('Aluguel Salão', 200000, '2025-11-01'),
('Decoração', 50000, '2025-11-05'),
('Comida e Bebida', 150000, '2025-11-10'),
('Música/DJ', 100000, '2025-11-15'),
('Limpeza', 30000, '2025-11-20');
```

## 🔐 Configurar Acesso Público (Sem Autenticação)

Se você quiser que o aplicativo acesse as tabelas **SEM AUTENTICAÇÃO**, descomente a seção 9:

```sql
-- Habilitar RLS nas tabelas
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE funcionarios ENABLE ROW LEVEL SECURITY;
ALTER TABLE despesas ENABLE ROW LEVEL SECURITY;

-- Criar políticas para acesso público
CREATE POLICY "Allow public read funcionarios" ON funcionarios FOR SELECT USING (true);
CREATE POLICY "Allow public insert funcionarios" ON funcionarios FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update funcionarios" ON funcionarios FOR UPDATE USING (true);
CREATE POLICY "Allow public delete funcionarios" ON funcionarios FOR DELETE USING (true);

-- ... (similar para outras tabelas)
```

## 📊 Consultar as Views (Relatórios)

Após criar os dados de exemplo, você pode consultar as views:

### Resumo de Funcionários:
```sql
SELECT * FROM vw_funcionarios_resumo;
```

**Resultado esperado:**
```
total_funcionarios | total_pagos | total_pendentes | total_aguardando_alvara | valor_total_contribuicoes | valor_medio_contribuicao
        5          |      3      |        1        |           1            |        240000             |        48000.00
```

### Resumo de Despesas:
```sql
SELECT * FROM vw_despesas_resumo;
```

**Resultado esperado:**
```
total_despesas | valor_total_despesas | valor_medio_despesa | maior_despesa | menor_despesa
      5        |      530000          |      106000.00      |    200000     |    30000
```

### Funcionários por Status:
```sql
SELECT * FROM vw_funcionarios_por_status;
```

**Resultado esperado:**
```
status              | quantidade | valor_total | valor_medio
Aguardando Alvará   |     1      |    40000    |  40000.00
Pago                |     3      |   155000    |  51666.67
Pendente            |     1      |    45000    |  45000.00
```

## ⚠️ Troubleshooting

### Erro: "relation already exists"
**Solução**: As tabelas já foram criadas. Você pode:
- Deletar as tabelas e executar novamente
- Ou pular este passo

### Erro: "permission denied"
**Solução**: Verifique se sua conta tem permissão para criar tabelas no Supabase.

### Erro: "syntax error"
**Solução**: 
- Certifique-se de que o script foi copiado completamente
- Verifique se não há caracteres especiais corrompidos
- Tente copiar do arquivo original novamente

## 🔄 Próximos Passos

1. ✅ Executar o script SQL
2. ✅ Verificar as tabelas no Table Editor
3. ✅ Fazer o deploy na Vercel
4. ✅ Testar a API

## 📚 Estrutura das Tabelas

### Tabela: users
```
id (SERIAL, PK)
openId (VARCHAR 64, UNIQUE)
name (TEXT)
email (VARCHAR 320)
loginMethod (VARCHAR 64)
role (user_role: 'user' | 'admin')
createdAt (TIMESTAMP)
updatedAt (TIMESTAMP)
lastSignedIn (TIMESTAMP)
```

### Tabela: funcionarios
```
id (SERIAL, PK)
nome (VARCHAR 255)
valor_contribuicao (INTEGER)
status (funcionario_status: 'Pago' | 'Pendente' | 'Aguardando Alvará')
createdAt (TIMESTAMP)
updatedAt (TIMESTAMP)
```

### Tabela: despesas
```
id (SERIAL, PK)
item (VARCHAR 255)
valor (INTEGER)
data_compra (VARCHAR 10)
createdAt (TIMESTAMP)
updatedAt (TIMESTAMP)
```

---

**Criado em**: 27 de Novembro de 2025
**Versão**: 1.0
