-- ============================================
-- Script de Criação de Tabelas - Supabase PostgreSQL
-- ============================================
-- Este script cria todas as tabelas necessárias para o aplicativo Confraternização
-- Compatível com PostgreSQL 14+
-- Data: 27 de Novembro de 2025

-- ============================================
-- 1. CRIAR ENUMS (Tipos Customizados)
-- ============================================

-- Enum para roles de usuário
CREATE TYPE user_role AS ENUM ('user', 'admin');

-- Enum para status de funcionário
CREATE TYPE funcionario_status AS ENUM ('Pago', 'Pendente', 'Aguardando Alvará');

-- ============================================
-- 2. TABELA DE USUÁRIOS
-- ============================================

CREATE TABLE IF NOT EXISTS users (
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

-- Criar índice para openId (para buscas rápidas)
CREATE INDEX idx_users_openid ON users("openId");

-- ============================================
-- 3. TABELA DE FUNCIONÁRIOS
-- ============================================

CREATE TABLE IF NOT EXISTS funcionarios (
  id SERIAL PRIMARY KEY,
  nome VARCHAR(255) NOT NULL,
  valor_contribuicao INTEGER NOT NULL,
  status funcionario_status NOT NULL DEFAULT 'Pendente',
  "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Criar índice para status (para filtros)
CREATE INDEX idx_funcionarios_status ON funcionarios(status);

-- Criar índice para data de criação (para ordenação)
CREATE INDEX idx_funcionarios_createdat ON funcionarios("createdAt" DESC);

-- ============================================
-- 4. TABELA DE DESPESAS
-- ============================================

CREATE TABLE IF NOT EXISTS despesas (
  id SERIAL PRIMARY KEY,
  item VARCHAR(255) NOT NULL,
  valor INTEGER NOT NULL,
  data_compra VARCHAR(10) NOT NULL,
  "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Criar índice para data de compra (para filtros)
CREATE INDEX idx_despesas_data_compra ON despesas(data_compra);

-- Criar índice para data de criação (para ordenação)
CREATE INDEX idx_despesas_createdat ON despesas("createdAt" DESC);

-- ============================================
-- 5. CRIAR FUNÇÕES PARA ATUALIZAR updatedAt
-- ============================================

-- Função para atualizar updatedAt automaticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW."updatedAt" = CURRENT_TIMESTAMP;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- ============================================
-- 6. CRIAR TRIGGERS PARA updatedAt
-- ============================================

-- Trigger para users
DROP TRIGGER IF EXISTS update_users_updated_at ON users;
CREATE TRIGGER update_users_updated_at
BEFORE UPDATE ON users
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- Trigger para funcionarios
DROP TRIGGER IF EXISTS update_funcionarios_updated_at ON funcionarios;
CREATE TRIGGER update_funcionarios_updated_at
BEFORE UPDATE ON funcionarios
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- Trigger para despesas
DROP TRIGGER IF EXISTS update_despesas_updated_at ON despesas;
CREATE TRIGGER update_despesas_updated_at
BEFORE UPDATE ON despesas
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- 7. CRIAR VIEWS ÚTEIS
-- ============================================

-- View: Resumo de Funcionários
CREATE OR REPLACE VIEW vw_funcionarios_resumo AS
SELECT
  COUNT(*) as total_funcionarios,
  COUNT(CASE WHEN status = 'Pago' THEN 1 END) as total_pagos,
  COUNT(CASE WHEN status = 'Pendente' THEN 1 END) as total_pendentes,
  COUNT(CASE WHEN status = 'Aguardando Alvará' THEN 1 END) as total_aguardando_alvara,
  SUM(valor_contribuicao) as valor_total_contribuicoes,
  ROUND(AVG(valor_contribuicao)::NUMERIC, 2) as valor_medio_contribuicao
FROM funcionarios;

-- View: Resumo de Despesas
CREATE OR REPLACE VIEW vw_despesas_resumo AS
SELECT
  COUNT(*) as total_despesas,
  SUM(valor) as valor_total_despesas,
  ROUND(AVG(valor)::NUMERIC, 2) as valor_medio_despesa,
  MAX(valor) as maior_despesa,
  MIN(valor) as menor_despesa
FROM despesas;

-- View: Resumo por Status
CREATE OR REPLACE VIEW vw_funcionarios_por_status AS
SELECT
  status,
  COUNT(*) as quantidade,
  SUM(valor_contribuicao) as valor_total,
  ROUND(AVG(valor_contribuicao)::NUMERIC, 2) as valor_medio
FROM funcionarios
GROUP BY status
ORDER BY status;

-- ============================================
-- 8. DADOS DE EXEMPLO (Opcional - Comentado)
-- ============================================

-- Descomente as linhas abaixo para inserir dados de exemplo

/*
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
*/

-- ============================================
-- 9. PERMISSÕES E SEGURANÇA (Opcional)
-- ============================================

-- Nota: Se você estiver usando Supabase com Row Level Security (RLS),
-- descomente as linhas abaixo para configurar permissões públicas

/*
-- Habilitar RLS nas tabelas
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE funcionarios ENABLE ROW LEVEL SECURITY;
ALTER TABLE despesas ENABLE ROW LEVEL SECURITY;

-- Criar políticas para acesso público (sem autenticação)
CREATE POLICY "Allow public read users" ON users FOR SELECT USING (true);
CREATE POLICY "Allow public insert users" ON users FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update users" ON users FOR UPDATE USING (true);
CREATE POLICY "Allow public delete users" ON users FOR DELETE USING (true);

CREATE POLICY "Allow public read funcionarios" ON funcionarios FOR SELECT USING (true);
CREATE POLICY "Allow public insert funcionarios" ON funcionarios FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update funcionarios" ON funcionarios FOR UPDATE USING (true);
CREATE POLICY "Allow public delete funcionarios" ON funcionarios FOR DELETE USING (true);

CREATE POLICY "Allow public read despesas" ON despesas FOR SELECT USING (true);
CREATE POLICY "Allow public insert despesas" ON despesas FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update despesas" ON despesas FOR UPDATE USING (true);
CREATE POLICY "Allow public delete despesas" ON despesas FOR DELETE USING (true);
*/

-- ============================================
-- 10. VERIFICAÇÃO FINAL
-- ============================================

-- Listar todas as tabelas criadas
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
ORDER BY table_name;

-- Listar todas as views criadas
SELECT viewname 
FROM pg_views 
WHERE schemaname = 'public' 
ORDER BY viewname;

-- ============================================
-- FIM DO SCRIPT
-- ============================================
