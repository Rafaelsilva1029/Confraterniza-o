# Confraternização Liderança BP - TODO

## Banco de Dados
- [x] Criar tabela `funcionarios` (id, nome, valor_contribuicao, status)
- [x] Criar tabela `despesas` (id, item, valor, data_compra)
- [x] Migrar schema com `pnpm db:push`

## Backend (tRPC Procedures)
- [x] Implementar CRUD de funcionários (create, read, update, delete)
- [x] Implementar CRUD de despesas (create, read, update, delete)
- [x] Implementar cálculos de totais (arrecadado, pendente, despesas)
- [x] Implementar filtros e busca de funcionários
- [x] Implementar geração de relatório para compartilhamento

## Frontend - Layout e Header
- [x] Criar header sticky com logo animado (rotate)
- [x] Adicionar efeito de pulsação no nome "Confraternização Liderança BP"
- [x] Implementar navegação por abas (Pagamentos vs Despesas)
- [x] Criar cards de resumo financeiro (Total Arrecadado, Pendente, Despesas, Saldo)

## Frontend - Módulo de Pagamentos
- [x] Implementar tabela de funcionários com colunas (Nome, Valor, Status)
- [x] Implementar filtro por status (Pago, Pendente, Aguardando Alvará)
- [x] Implementar busca por nome de funcionário
- [x] Implementar botão "Adicionar Funcionário" com formulário modal
- [x] Implementar botão "Editar" para cada funcionário
- [x] Implementar seletor de status rápido na tabela
- [x] Implementar botão "Excluir" para cada funcionário
- [x] Implementar notificações toast (sucesso, erro, info)
- [x] Implementar botão "Exportar Resumo (WhatsApp)"
- [x] Implementar pré-visualização de compartilhamento

## Frontend - Módulo de Despesas
- [x] Implementar tabela de despesas com colunas (Item, Valor, Data)
- [x] Implementar botão "Registrar Nova Despesa" com formulário modal
- [x] Implementar botão "Editar" para cada despesa
- [x] Implementar botão "Excluir" para cada despesa
- [x] Implementar total de despesas no rodápé da tabela
- [x] Implementar notificações toast

## Frontend - Compartilhamento
- [x] Criar componente ShareableReport com layout profissional
- [x] Incluir cabeçalho com logo e título "Status de Arrecação"
- [x] Incluir resumo estatístico (Total Arrecadado, Pendente)
- [x] Incluir lista de funcionários com status
- [x] Adicionar data de geração do relatório
- [x] Implementar opção de salvar/compartilhar via WhatsApp

## Testes
- [x] Escrever testes vitest para procedures de funcionários
- [x] Escrever testes vitest para procedures de despesas
- [x] Testar cálculos de totais
- [x] Testar filtros e busca

## Integração Supabase
- [x] Configurar variáveis de ambiente (NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY)
- [x] Testar conexão com banco de dados

## Responsividade e UX
- [x] Garantir layout responsivo para mobile e desktop
- [x] Testar em diferentes tamanhos de tela
- [x] Validar acessibilidade (cores, contraste, navegação)
- [x] Testar fluxo completo de CRUD

## Deploy
- [ ] Criar checkpoint antes de publicar
- [ ] Publicar aplicativo

## Deploy no Netlify
- [ ] Remover autenticação do aplicativo
- [ ] Criar arquivo netlify.toml com configurações
- [ ] Gerar script SQL para Supabase
- [ ] Preparar variáveis de ambiente para Netlify
- [ ] Exportar arquivos do projeto
