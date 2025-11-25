# Guia Completo: Configurar Supabase + Deploy no Netlify

## PARTE 1: CRIAR PROJETO SUPABASE

### Passo 1.1: Acessar Supabase
1. Acesse https://supabase.com
2. Clique em **"Sign Up"** (ou faça login se já tem conta)
3. Use email e crie uma senha

### Passo 1.2: Criar Novo Projeto
1. Clique em **"New Project"**
2. Preencha os dados:
   - **Project Name**: `confraternizacao-lideranca-bp`
   - **Database Password**: Crie uma senha forte (salve em local seguro!)
   - **Region**: Escolha a região mais próxima (ex: São Paulo)
3. Clique em **"Create new project"**
4. Aguarde 2-3 minutos enquanto o projeto é criado

### Passo 1.3: Obter Credenciais
Após criar o projeto, você verá a página de dashboard. Procure por:

1. **Ir para SQL Editor**
   - No menu lateral esquerdo, clique em **"SQL Editor"**
   - Clique em **"New Query"**

2. **Copiar o script SQL abaixo e colar no editor:**

```sql
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
```

3. **Executar o script**
   - Clique em **"Run"** (botão azul)
   - Aguarde a execução

### Passo 1.4: Obter String de Conexão (DATABASE_URL)

1. No menu lateral, clique em **"Settings"** (engrenagem)
2. Clique em **"Database"**
3. Procure por **"Connection string"**
4. Selecione **"URI"** (não "Connection pooler")
5. Copie a string completa (começará com `postgresql://`)
6. **IMPORTANTE**: Substitua `[YOUR-PASSWORD]` pela senha que você criou no Passo 1.2

**Exemplo de como ficará:**
```
postgresql://postgres:sua_senha_aqui@seu-projeto.supabase.co:5432/postgres
```

---

## PARTE 2: CONFIGURAR NETLIFY PARA DEPLOY

### Passo 2.1: Fazer Upload do Código para GitHub

1. **Criar repositório no GitHub**
   - Acesse https://github.com/new
   - Nome: `confraternizacao-lideranca-bp`
   - Clique em **"Create repository"**

2. **Fazer push do código** (execute no seu computador):
   ```bash
   cd caminho/para/confraternizacao_lideranca_bp
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/seu-usuario/confraternizacao-lideranca-bp.git
   git push -u origin main
   ```

### Passo 2.2: Conectar ao Netlify

1. Acesse https://netlify.com
2. Clique em **"Sign up"** (ou faça login)
3. Clique em **"Add new site"** → **"Import an existing project"**
4. Selecione **"GitHub"**
5. Autorize o Netlify a acessar seu GitHub
6. Selecione o repositório `confraternizacao-lideranca-bp`
7. Clique em **"Deploy site"**

### Passo 2.3: Configurar Variáveis de Ambiente

1. No Netlify, vá para **"Site settings"**
2. Clique em **"Build & deploy"** → **"Environment"**
3. Clique em **"Edit variables"**
4. Adicione as variáveis:

| Chave | Valor |
|-------|-------|
| `DATABASE_URL` | `postgresql://postgres:sua_senha@seu-projeto.supabase.co:5432/postgres` |

**Importante**: Substitua `sua_senha` e `seu-projeto` pelos valores reais do seu Supabase!

5. Clique em **"Save"**

### Passo 2.4: Fazer Deploy

1. Volte para a página principal do site no Netlify
2. Clique em **"Trigger deploy"** → **"Deploy site"**
3. Aguarde a build completar (2-5 minutos)
4. Quando terminar, você verá uma URL como: `https://seu-site.netlify.app`

---

## PARTE 3: TESTAR O APLICATIVO

### Acessar o Site
1. Clique no link do Netlify fornecido
2. Você deve ver o aplicativo com:
   - Logo animado no header
   - Cards de resumo financeiro
   - Abas de "Controle de Pagamentos" e "Controle de Despesas"

### Testar Funcionalidades
1. **Adicionar Funcionário**
   - Clique em **"Adicionar"** (botão amarelo)
   - Preencha nome e valor
   - Clique em **"Adicionar"**
   - Deve aparecer na tabela

2. **Editar Funcionário**
   - Clique no ícone de lápis
   - Modifique os dados
   - Clique em **"Atualizar"**

3. **Deletar Funcionário**
   - Clique no ícone de lixo
   - Confirme a exclusão

4. **Adicionar Despesa**
   - Clique na aba **"Controle de Despesas"**
   - Clique em **"Adicionar"**
   - Preencha os dados
   - Clique em **"Adicionar"**

5. **Exportar Relatório**
   - Clique em **"Exportar (WhatsApp)"**
   - Veja a pré-visualização do relatório

---

## TROUBLESHOOTING

### Erro: "Database connection failed"
**Solução:**
1. Verifique se a DATABASE_URL está correta no Netlify
2. Confirme que a senha não tem caracteres especiais (se tiver, use URL encoding)
3. Verifique se o Supabase está ativo

### Erro: "Failed to execute 'json' on 'Response'"
**Solução:**
1. Verifique se as tabelas foram criadas no Supabase
2. Confirme que o script SQL foi executado com sucesso
3. Limpe o cache do navegador (Ctrl+Shift+Delete)

### Erro: "Connection timeout"
**Solução:**
1. Verifique se a região do Supabase é acessível
2. Tente usar "Connection pooler" em vez de "URI" (mais estável)
3. Aguarde alguns minutos e tente novamente

---

## PRÓXIMAS ETAPAS

Após confirmar que tudo funciona:

1. **Adicionar mais dados** no aplicativo
2. **Compartilhar o link** com sua equipe
3. **Fazer backup** dos dados regularmente no Supabase
4. **Considerar adicionar autenticação** para segurança

---

## DÚVIDAS FREQUENTES

**P: Posso usar um banco de dados existente?**
R: Sim! Basta usar a DATABASE_URL do seu banco existente na variável de ambiente.

**P: Os dados são perdidos se eu fazer redeploy?**
R: Não! Os dados ficam no Supabase. Apenas o código é atualizado.

**P: Como fazer backup dos dados?**
R: No Supabase, vá para "Backups" nas settings e faça um backup manual.

**P: Posso usar outro banco de dados?**
R: Sim! O código suporta qualquer banco MySQL/PostgreSQL. Basta atualizar a DATABASE_URL.

---

**Versão:** 1.0.0
**Data:** 25 de Novembro de 2025
**Status:** Pronto para Configuração!
