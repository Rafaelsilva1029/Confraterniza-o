-- Script SQL para criar as tabelas no Supabase
-- Execute este script no SQL Editor do Supabase

-- Criar tabela de funcionários
CREATE TABLE IF NOT EXISTS funcionarios (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  nome VARCHAR(255) NOT NULL,
  valor_contribuicao BIGINT NOT NULL,
  status VARCHAR(50) NOT NULL DEFAULT 'Pendente' CHECK (status IN ('Pago', 'Pendente', 'Aguardando Alvará')),
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

-- Habilitar RLS (Row Level Security) - Opcional, desabilitado para acesso público
ALTER TABLE funcionarios DISABLE ROW LEVEL SECURITY;
ALTER TABLE despesas DISABLE ROW LEVEL SECURITY;

-- Dados de exemplo (opcional - remova se não quiser dados iniciais)
INSERT INTO funcionarios (nome, valor_contribuicao, status) VALUES
  ('Alice Silva', 15000, 'Pago'),
  ('Bruno Costa', 10000, 'Pendente'),
  ('Carla Pires', 20000, 'Aguardando Alvará'),
  ('David Souza', 10000, 'Pago'),
  ('Fernanda Lima', 12000, 'Pendente');

INSERT INTO despesas (item, valor, data_compra) VALUES
  ('Buffet Completo', 450000, '2025-11-20'),
  ('Decoração e Iluminação', 120000, '2025-11-21');
