-- ============================================================
-- SCRIPT SQL PARA SUPABASE
-- Copie e cole este script no SQL Editor do Supabase
-- ============================================================

-- Criar tabela de funcionários
CREATE TABLE IF NOT EXISTS funcionarios (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  nome VARCHAR(255) NOT NULL,
  valor_contribuicao BIGINT NOT NULL,
  status VARCHAR(50) NOT NULL CHECK (status IN ('Pago', 'Pendente', 'Aguardando Alvará')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL
);

-- Criar tabela de despesas
CREATE TABLE IF NOT EXISTS despesas (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  item VARCHAR(255) NOT NULL,
  valor BIGINT NOT NULL,
  data_compra VARCHAR(10) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL
);

-- Criar índices para melhor performance
CREATE INDEX IF NOT EXISTS idx_funcionarios_status ON funcionarios(status);
CREATE INDEX IF NOT EXISTS idx_funcionarios_nome ON funcionarios(nome);
CREATE INDEX IF NOT EXISTS idx_despesas_data ON despesas(data_compra);

-- Habilitar acesso público (sem autenticação)
ALTER TABLE funcionarios DISABLE ROW LEVEL SECURITY;
ALTER TABLE despesas DISABLE ROW LEVEL SECURITY;

-- Inserir dados de exemplo
INSERT INTO funcionarios (nome, valor_contribuicao, status) VALUES
  ('João Silva', 15000, 'Pendente'),
  ('Maria Santos', 20000, 'Pago'),
  ('Carlos Oliveira', 10000, 'Aguardando Alvará');

INSERT INTO despesas (item, valor, data_compra) VALUES
  ('Buffet Completo', 450000, '2025-11-20'),
  ('Decoração', 120000, '2025-11-21');
