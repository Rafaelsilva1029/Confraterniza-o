-- ============================================
-- SCRIPT SIMPLES - Criar Tabelas Básicas
-- ============================================
-- Execute este script no Supabase SQL Editor
-- Copie e cole tudo, depois clique em "Run"

-- Passo 1: Criar tipos (ENUMs)
CREATE TYPE user_role AS ENUM ('user', 'admin');
CREATE TYPE funcionario_status AS ENUM ('Pago', 'Pendente', 'Aguardando Alvará');

-- Passo 2: Criar tabela de usuários
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  "openId" VARCHAR(64) NOT NULL UNIQUE,
  name TEXT,
  email VARCHAR(320),
  "loginMethod" VARCHAR(64),
  role user_role NOT NULL DEFAULT 'user',
  "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "lastSignedIn" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Passo 3: Criar tabela de funcionários
CREATE TABLE funcionarios (
  id SERIAL PRIMARY KEY,
  nome VARCHAR(255) NOT NULL,
  valor_contribuicao INTEGER NOT NULL,
  status funcionario_status NOT NULL DEFAULT 'Pendente',
  "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Passo 4: Criar tabela de despesas
CREATE TABLE despesas (
  id SERIAL PRIMARY KEY,
  item VARCHAR(255) NOT NULL,
  valor INTEGER NOT NULL,
  data_compra VARCHAR(10) NOT NULL,
  "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Passo 5: Criar função para atualizar updatedAt
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW."updatedAt" = CURRENT_TIMESTAMP;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Passo 6: Criar triggers para atualizar updatedAt
CREATE TRIGGER update_users_updated_at
BEFORE UPDATE ON users
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_funcionarios_updated_at
BEFORE UPDATE ON funcionarios
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_despesas_updated_at
BEFORE UPDATE ON despesas
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- ✅ PRONTO! As tabelas foram criadas com sucesso!
-- Você pode agora usar a API para inserir dados.
