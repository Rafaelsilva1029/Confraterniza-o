import React, { useState, useRef, useCallback, useMemo } from 'react';
import { trpc } from '@/lib/trpc';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { Trash2, Edit2, Plus, Download } from 'lucide-react';

// Tipos
interface Funcionario {
  id: number;
  nome: string;
  valor_contribuicao: number;
  status: 'Pago' | 'Pendente' | 'Aguardando Alvará';
  createdAt: Date;
  updatedAt: Date;
}

interface Despesa {
  id: number;
  item: string;
  valor: number;
  data_compra: string;
  createdAt: Date;
  updatedAt: Date;
}

const STATUS_OPTIONS = [
  { value: 'Pago', label: 'Pago', color: 'bg-green-100 text-green-800 border-green-500' },
  { value: 'Pendente', label: 'Pendente', color: 'bg-yellow-100 text-yellow-800 border-yellow-500' },
  { value: 'Aguardando Alvará', label: 'Aguardando Alvará', color: 'bg-blue-100 text-blue-800 border-blue-500' },
];

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(amount / 100);
};

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState<'pagamentos' | 'despesas'>('pagamentos');
  const [filterStatus, setFilterStatus] = useState('Todos');
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddingEmployee, setIsAddingEmployee] = useState(false);
  const [isAddingExpense, setIsAddingExpense] = useState(false);
  const [editingEmployeeId, setEditingEmployeeId] = useState<number | null>(null);
  const [editingExpenseId, setEditingExpenseId] = useState<number | null>(null);
  const [isSharing, setIsSharing] = useState(false);
  const shareRef = useRef<HTMLDivElement>(null);

  // Queries
  const { data: funcionarios = [], isLoading: loadingFuncionarios } = trpc.funcionarios.list.useQuery();
  const { data: despesas = [], isLoading: loadingDespesas } = trpc.despesas.list.useQuery();

  // Mutations
  const createFuncionarioMutation = trpc.funcionarios.create.useMutation({
    onSuccess: () => {
      toast.success('Funcionário adicionado com sucesso!');
      setIsAddingEmployee(false);
    },
    onError: (error) => {
      toast.error(`Erro ao adicionar funcionário: ${error.message}`);
    },
  });

  const updateFuncionarioMutation = trpc.funcionarios.update.useMutation({
    onSuccess: () => {
      toast.success('Funcionário atualizado com sucesso!');
      setEditingEmployeeId(null);
    },
    onError: (error) => {
      toast.error(`Erro ao atualizar funcionário: ${error.message}`);
    },
  });

  const deleteFuncionarioMutation = trpc.funcionarios.delete.useMutation({
    onSuccess: () => {
      toast.success('Funcionário excluído com sucesso!');
    },
    onError: (error) => {
      toast.error(`Erro ao excluir funcionário: ${error.message}`);
    },
  });

  const createDespesaMutation = trpc.despesas.create.useMutation({
    onSuccess: () => {
      toast.success('Despesa registrada com sucesso!');
      setIsAddingExpense(false);
    },
    onError: (error) => {
      toast.error(`Erro ao registrar despesa: ${error.message}`);
    },
  });

  const updateDespesaMutation = trpc.despesas.update.useMutation({
    onSuccess: () => {
      toast.success('Despesa atualizada com sucesso!');
      setEditingExpenseId(null);
    },
    onError: (error) => {
      toast.error(`Erro ao atualizar despesa: ${error.message}`);
    },
  });

  const deleteDespesaMutation = trpc.despesas.delete.useMutation({
    onSuccess: () => {
      toast.success('Despesa excluída com sucesso!');
    },
    onError: (error) => {
      toast.error(`Erro ao excluir despesa: ${error.message}`);
    },
  });

  // Cálculos
  const totalCollected = useMemo(() => {
    return funcionarios
      .filter((e: Funcionario) => e.status === 'Pago')
      .reduce((sum, emp: Funcionario) => sum + emp.valor_contribuicao, 0);
  }, [funcionarios]);

  const totalPendingValue = useMemo(() => {
    return funcionarios
      .filter((e: Funcionario) => e.status === 'Pendente')
      .reduce((sum, emp: Funcionario) => sum + emp.valor_contribuicao, 0);
  }, [funcionarios]);

  const totalExpenses = useMemo(() => {
    return despesas.reduce((sum, exp: Despesa) => sum + exp.valor, 0);
  }, [despesas]);

  const balance = totalCollected - totalExpenses;

  // Filtros
  const filteredEmployees = useMemo(() => {
    let list = [...funcionarios].sort((a: Funcionario, b: Funcionario) => a.nome.localeCompare(b.nome));

    if (filterStatus !== 'Todos') {
      list = list.filter((emp: Funcionario) => emp.status === filterStatus);
    }

    if (searchTerm) {
      list = list.filter((emp: Funcionario) =>
        emp.nome.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return list;
  }, [funcionarios, filterStatus, searchTerm]);

  // Handlers
  const handleAddEmployee = (name: string, value: number) => {
    if (!name.trim() || isNaN(value) || value <= 0) {
      toast.error('Nome e valor válidos são obrigatórios.');
      return;
    }
    createFuncionarioMutation.mutate({
      nome: name.trim(),
      valor_contribuicao: value,
      status: 'Pendente',
    });
  };

  const handleUpdateEmployee = (id: number, name: string, value: number, status: string) => {
    updateFuncionarioMutation.mutate({
      id,
      nome: name.trim(),
      valor_contribuicao: value,
      status: status as 'Pago' | 'Pendente' | 'Aguardando Alvará',
    });
  };

  const handleDeleteEmployee = (id: number) => {
    if (window.confirm('Tem certeza que deseja excluir este funcionário?')) {
      deleteFuncionarioMutation.mutate({ id });
    }
  };

  const handleAddExpense = (item: string, value: number, date: string) => {
    if (!item || !value || !date || isNaN(value) || value <= 0) {
      toast.error('Preencha todos os campos da despesa corretamente.');
      return;
    }
    createDespesaMutation.mutate({
      item: item.trim(),
      valor: value,
      data_compra: date,
    });
  };

  const handleUpdateExpense = (id: number, item: string, value: number, date: string) => {
    updateDespesaMutation.mutate({
      id,
      item: item.trim(),
      valor: value,
      data_compra: date,
    });
  };

  const handleDeleteExpense = (id: number) => {
    if (window.confirm('Tem certeza que deseja excluir esta despesa?')) {
      deleteDespesaMutation.mutate({ id });
    }
  };

  const handleExport = () => {
    setIsSharing(true);
    toast.info('Pré-visualização gerada. Clique com botão direito para salvar ou compartilhar.');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-indigo-900 shadow-lg text-white sticky top-0 z-10 p-4 border-b-4 border-yellow-500">
        <style>{`
          @keyframes pulse-bright {
            0%, 100% {
              text-shadow: 0 0 5px rgba(255, 255, 255, 0.5);
            }
            50% {
              text-shadow: 0 0 15px rgba(255, 255, 255, 1), 0 0 10px rgba(255, 255, 255, 0.8);
            }
          }
          .pulse-bright {
            animation: pulse-bright 3s infinite ease-in-out;
          }
        `}</style>
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <svg className="w-8 h-8 text-yellow-500 animate-spin" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 2a8 8 0 100 16A8 8 0 0010 2zm0 14a6 6 0 110-12 6 6 0 010 12zm-3-4a1 1 0 011-1h4a1 1 0 110 2H8a1 1 0 01-1-1z" />
            </svg>
            <h1 className="text-2xl font-extrabold tracking-tight pulse-bright">
              Confraternização <span className="text-yellow-500">Liderança BP</span>
            </h1>
          </div>
          <div className="text-sm font-light opacity-80 hidden sm:block">
            Gerenciamento Financeiro
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
        {/* Cards de Resumo */}
        <section className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="p-6 border-l-4 border-green-500">
            <p className="text-sm font-medium text-gray-500">Total Arrecadado</p>
            <p className="text-2xl font-bold text-green-700 mt-1">{formatCurrency(totalCollected)}</p>
          </Card>
          <Card className="p-6 border-l-4 border-yellow-500">
            <p className="text-sm font-medium text-gray-500">Pendente de Receber</p>
            <p className="text-2xl font-bold text-yellow-700 mt-1">{formatCurrency(totalPendingValue)}</p>
          </Card>
          <Card className="p-6 border-l-4 border-red-500">
            <p className="text-sm font-medium text-gray-500">Total de Despesas</p>
            <p className="text-2xl font-bold text-red-700 mt-1">{formatCurrency(totalExpenses)}</p>
          </Card>
          <Card className={`p-6 border-l-4 ${balance >= 0 ? 'border-green-500' : 'border-red-500'}`}>
            <p className="text-sm font-medium text-gray-500">Saldo Atual</p>
            <p className={`text-2xl font-bold mt-1 ${balance >= 0 ? 'text-green-700' : 'text-red-700'}`}>
              {formatCurrency(balance)}
            </p>
          </Card>
        </section>

        {/* Abas */}
        <div className="flex space-x-1 p-1 bg-white rounded-xl shadow-md mb-6">
          <button
            onClick={() => {
              setActiveTab('pagamentos');
              setIsSharing(false);
              setEditingEmployeeId(null);
              setEditingExpenseId(null);
            }}
            className={`flex-1 py-2 px-4 rounded-lg font-semibold transition duration-200 ${
              activeTab === 'pagamentos' ? 'bg-indigo-600 text-white shadow-md' : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            Controle de Pagamentos
          </button>
          <button
            onClick={() => {
              setActiveTab('despesas');
              setIsSharing(false);
              setEditingEmployeeId(null);
              setEditingExpenseId(null);
            }}
            className={`flex-1 py-2 px-4 rounded-lg font-semibold transition duration-200 ${
              activeTab === 'despesas' ? 'bg-indigo-600 text-white shadow-md' : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            Controle de Despesas
          </button>
        </div>

        {/* Aba de Pagamentos */}
        {activeTab === 'pagamentos' && (
          <section className="space-y-6">
            {/* Formulário de Adicionar Funcionário */}
            {isAddingEmployee && (
              <EmployeeForm
                onSave={(name, value) => {
                  handleAddEmployee(name, value);
                }}
                onCancel={() => setIsAddingEmployee(false)}
              />
            )}

            {editingEmployeeId && (
              <EmployeeEditForm
                employee={funcionarios.find((e: Funcionario) => e.id === editingEmployeeId)}
                onSave={(name, value, status) => {
                  handleUpdateEmployee(editingEmployeeId, name, value, status);
                }}
                onCancel={() => setEditingEmployeeId(null)}
              />
            )}

            <Card className="p-4">
              {/* Controles */}
              <div className="flex flex-col sm:flex-row justify-between items-center mb-4 space-y-3 sm:space-y-0 sm:space-x-3">
                <Input
                  type="text"
                  placeholder="Buscar funcionário..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full sm:w-1/3"
                />
                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger className="w-full sm:w-1/4">
                    <SelectValue placeholder="Filtrar por Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Todos">Todos</SelectItem>
                    {STATUS_OPTIONS.map((opt) => (
                      <SelectItem key={opt.value} value={opt.value}>
                        {opt.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Button
                  onClick={handleExport}
                  className="w-full sm:w-auto bg-green-500 hover:bg-green-600"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Exportar (WhatsApp)
                </Button>

                <Button
                  onClick={() => {
                    setIsAddingEmployee(!isAddingEmployee);
                    setEditingEmployeeId(null);
                  }}
                  className="w-full sm:w-auto bg-yellow-500 hover:bg-yellow-600 text-indigo-900"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  {isAddingEmployee ? 'Fechar' : 'Adicionar'}
                </Button>
              </div>

              {/* Pré-visualização de Compartilhamento */}
              {isSharing && (
                <div className="bg-indigo-50 p-4 rounded-xl mb-6 shadow-inner border border-indigo-200">
                  <h3 className="text-lg font-bold text-indigo-800 mb-3">Pré-visualização para Compartilhamento:</h3>
                  <ShareableReport
                    ref={shareRef}
                    employees={funcionarios}
                    totalCollected={totalCollected}
                    totalPendingValue={totalPendingValue}
                  />
                  <div className="mt-4 text-center">
                    <p className="text-sm text-gray-600 mb-2">
                      Clique com o botão direito (ou segure no celular) na imagem acima e use "Salvar Imagem" ou "Compartilhar Imagem".
                    </p>
                    <Button
                      onClick={() => setIsSharing(false)}
                      variant="destructive"
                    >
                      Fechar Pré-visualização
                    </Button>
                  </div>
                </div>
              )}

              {/* Tabela de Funcionários */}
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Funcionário</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Valor</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                      <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">Opções</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredEmployees.length > 0 ? (
                      filteredEmployees.map((employee: Funcionario) => {
                        const currentStatus = STATUS_OPTIONS.find(s => s.value === employee.status);
                        return (
                          <tr key={employee.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 text-sm font-medium text-gray-900">{employee.nome}</td>
                            <td className="px-6 py-4 text-sm text-gray-700 font-mono">{formatCurrency(employee.valor_contribuicao)}</td>
                            <td className="px-6 py-4">
                              <span className={`px-3 py-1 inline-flex text-xs font-semibold rounded-full border ${currentStatus?.color}`}>
                                {currentStatus?.label}
                              </span>
                            </td>
                            <td className="px-6 py-4 text-center text-sm space-x-2 flex justify-center items-center">
                              <button
                                onClick={() => {
                                  setEditingEmployeeId(employee.id);
                                  setIsAddingEmployee(false);
                                }}
                                className="text-indigo-600 hover:text-indigo-900 p-1 rounded hover:bg-indigo-100"
                              >
                                <Edit2 className="w-5 h-5" />
                              </button>
                              <Select
                                value={employee.status}
                                onValueChange={(newStatus) => {
                                  handleUpdateEmployee(employee.id, employee.nome, employee.valor_contribuicao, newStatus);
                                }}
                              >
                                <SelectTrigger className="w-32">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  {STATUS_OPTIONS.map((opt) => (
                                    <SelectItem key={opt.value} value={opt.value}>
                                      {opt.label}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <button
                                onClick={() => handleDeleteEmployee(employee.id)}
                                className="text-red-600 hover:text-red-900 p-1 rounded hover:bg-red-100"
                              >
                                <Trash2 className="w-5 h-5" />
                              </button>
                            </td>
                          </tr>
                        );
                      })
                    ) : (
                      <tr>
                        <td colSpan={4} className="px-6 py-4 text-center text-gray-500">
                          Nenhum funcionário encontrado.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </Card>
          </section>
        )}

        {/* Aba de Despesas */}
        {activeTab === 'despesas' && (
          <section className="space-y-6">
            <Button
              onClick={() => {
                setIsAddingExpense(!isAddingExpense);
                setEditingExpenseId(null);
              }}
              className="w-full md:w-auto bg-red-500 hover:bg-red-600"
            >
              <Plus className="w-5 h-5 mr-2" />
              {isAddingExpense ? 'Fechar Formulário' : 'Registrar Nova Despesa'}
            </Button>

            {/* Formulário de Adicionar Despesa */}
            {isAddingExpense && (
              <ExpenseForm
                onSave={(item, value, date) => {
                  handleAddExpense(item, value, date);
                }}
                onCancel={() => setIsAddingExpense(false)}
              />
            )}

            {editingExpenseId && (
              <ExpenseEditForm
                expense={despesas.find((e: Despesa) => e.id === editingExpenseId)}
                onSave={(item, value, date) => {
                  handleUpdateExpense(editingExpenseId, item, value, date);
                }}
                onCancel={() => setEditingExpenseId(null)}
              />
            )}

            <Card className="p-4">
              <h2 className="text-xl font-bold text-indigo-800 mb-4">Itens Comprados na Confraternização</h2>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Item</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Valor</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Data</th>
                      <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">Opções</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {despesas.map((expense: Despesa) => (
                      <tr key={expense.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 text-sm font-medium text-gray-900">{expense.item}</td>
                        <td className="px-6 py-4 text-sm text-red-600 font-mono">{formatCurrency(expense.valor)}</td>
                        <td className="px-6 py-4 text-sm text-gray-500">
                          {new Date(expense.data_compra).toLocaleDateString('pt-BR')}
                        </td>
                        <td className="px-6 py-4 text-center text-sm space-x-2 flex justify-center items-center">
                          <button
                            onClick={() => {
                              setEditingExpenseId(expense.id);
                              setIsAddingExpense(false);
                            }}
                            className="text-indigo-600 hover:text-indigo-900 p-1 rounded hover:bg-indigo-100"
                          >
                            <Edit2 className="w-5 h-5" />
                          </button>
                          <button
                            onClick={() => handleDeleteExpense(expense.id)}
                            className="text-red-600 hover:text-red-900 p-1 rounded hover:bg-red-100"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr className="bg-gray-100 border-t border-gray-300">
                      <td className="px-6 py-3 text-right text-base font-bold text-gray-700 uppercase" colSpan={2}>
                        Total Gasto:
                      </td>
                      <td className="px-6 py-3 text-base font-bold text-red-700 font-mono" colSpan={2}>
                        {formatCurrency(totalExpenses)}
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </Card>
          </section>
        )}
      </main>
    </div>
  );
}

// Componentes de Formulário
function EmployeeForm({ onSave, onCancel }: { onSave: (name: string, value: number) => void; onCancel: () => void }) {
  const [name, setName] = useState('');
  const [value, setValue] = useState('100.00');

  return (
    <Card className="p-4">
      <h3 className="text-lg font-semibold mb-3 text-indigo-800">Adicionar Novo Funcionário</h3>
      <div className="space-y-3">
        <Input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Nome completo do funcionário"
        />
        <div className="relative">
          <span className="absolute left-3 top-2.5 text-gray-500 font-semibold">R$</span>
          <Input
            type="number"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Valor de Contribuição"
            step="0.01"
            className="pl-10"
          />
        </div>
      </div>
      <div className="flex justify-end space-x-2 mt-4">
        <Button onClick={onCancel} variant="outline">
          Cancelar
        </Button>
        <Button onClick={() => onSave(name, parseFloat(value))}>
          Adicionar
        </Button>
      </div>
    </Card>
  );
}

function EmployeeEditForm({
  employee,
  onSave,
  onCancel,
}: {
  employee: Funcionario | undefined;
  onSave: (name: string, value: number, status: string) => void;
  onCancel: () => void;
}) {
  const [name, setName] = useState(employee?.nome || '');
  const [value, setValue] = useState((employee?.valor_contribuicao || 100) / 100);
  const [status, setStatus] = useState<'Pago' | 'Pendente' | 'Aguardando Alvará'>(employee?.status || 'Pendente');

  return (
    <Card className="p-4">
      <h3 className="text-lg font-semibold mb-3 text-indigo-800">Editar Funcionário</h3>
      <div className="space-y-3">
        <Input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Nome completo do funcionário"
        />
        <div className="relative">
          <span className="absolute left-3 top-2.5 text-gray-500 font-semibold">R$</span>
          <Input
            type="number"
            value={value}
            onChange={(e) => setValue(parseFloat(e.target.value))}
            placeholder="Valor de Contribuição"
            step="0.01"
            className="pl-10"
          />
        </div>
        <Select value={status} onValueChange={(value) => setStatus(value as 'Pago' | 'Pendente' | 'Aguardando Alvará')}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {STATUS_OPTIONS.map((opt) => (
              <SelectItem key={opt.value} value={opt.value}>
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="flex justify-end space-x-2 mt-4">
        <Button onClick={onCancel} variant="outline">
          Cancelar Edição
        </Button>
        <Button onClick={() => onSave(name, value, status)}>
          Salvar Alterações
        </Button>
      </div>
    </Card>
  );
}

function ExpenseForm({
  onSave,
  onCancel,
}: {
  onSave: (item: string, value: number, date: string) => void;
  onCancel: () => void;
}) {
  const [item, setItem] = useState('');
  const [value, setValue] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

  return (
    <Card className="p-4">
      <h3 className="text-lg font-semibold mb-3 text-indigo-800">Registrar Despesa</h3>
      <div className="space-y-3">
        <Input
          type="text"
          value={item}
          onChange={(e) => setItem(e.target.value)}
          placeholder="Item Comprado (ex: Bebidas, Decoração)"
        />
        <div className="relative">
          <span className="absolute left-3 top-2.5 text-gray-500 font-semibold">R$</span>
          <Input
            type="number"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Valor (R$)"
            step="0.01"
            className="pl-10"
          />
        </div>
        <Input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </div>
      <div className="flex justify-end space-x-2 mt-4">
        <Button onClick={onCancel} variant="outline">
          Cancelar
        </Button>
        <Button onClick={() => onSave(item, parseFloat(value), date)}>
          Registrar Compra
        </Button>
      </div>
    </Card>
  );
}

function ExpenseEditForm({
  expense,
  onSave,
  onCancel,
}: {
  expense: Despesa | undefined;
  onSave: (item: string, value: number, date: string) => void;
  onCancel: () => void;
}) {
  const [item, setItem] = useState(expense?.item || '');
  const [value, setValue] = useState((expense?.valor || 0) / 100);
  const [date, setDate] = useState(expense?.data_compra || new Date().toISOString().split('T')[0]);

  return (
    <Card className="p-4">
      <h3 className="text-lg font-semibold mb-3 text-indigo-800">Editar Despesa</h3>
      <div className="space-y-3">
        <Input
          type="text"
          value={item}
          onChange={(e) => setItem(e.target.value)}
          placeholder="Item Comprado"
        />
        <div className="relative">
          <span className="absolute left-3 top-2.5 text-gray-500 font-semibold">R$</span>
          <Input
            type="number"
            value={value}
            onChange={(e) => setValue(parseFloat(e.target.value))}
            placeholder="Valor (R$)"
            step="0.01"
            className="pl-10"
          />
        </div>
        <Input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </div>
      <div className="flex justify-end space-x-2 mt-4">
        <Button onClick={onCancel} variant="outline">
          Cancelar Edição
        </Button>
        <Button onClick={() => onSave(item, value, date)}>
          Salvar Alterações
        </Button>
      </div>
    </Card>
  );
}

// Componente de Relatório Compartilhável
const ShareableReport = React.forwardRef(({ employees, totalCollected, totalPendingValue }: any, ref: any) => {
  const sortedEmployees = [...employees].sort((a: Funcionario, b: Funcionario) => {
    if (a.status === 'Pago' && b.status !== 'Pago') return -1;
    if (a.status !== 'Pago' && b.status === 'Pago') return 1;
    return a.nome.localeCompare(b.nome);
  });

  return (
    <div className="w-full max-w-lg mx-auto bg-white p-6 rounded-2xl shadow-2xl border-t-8 border-indigo-600 mb-8 font-sans">
      <div className="flex items-center justify-between pb-4 border-b border-gray-200">
        <h2 className="text-xl font-extrabold text-indigo-900">Status de Arrecadação</h2>
        <div className="flex items-center space-x-2">
          <svg className="w-6 h-6 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 2a8 8 0 100 16A8 8 0 0010 2zm0 14a6 6 0 110-12 6 6 0 010 12zm-3-4a1 1 0 011-1h4a1 1 0 110 2H8a1 1 0 01-1-1z" />
          </svg>
          <span className="text-sm font-semibold text-gray-700">Liderança BP</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 py-4">
        <div className="p-3 bg-green-50 rounded-lg border border-green-200">
          <p className="text-sm text-green-700 font-medium">Total Arrecadado</p>
          <p className="text-xl font-bold text-green-800">{formatCurrency(totalCollected)}</p>
        </div>
        <div className="p-3 bg-yellow-50 rounded-lg border border-yellow-200">
          <p className="text-sm text-yellow-700 font-medium">Valor Pendente</p>
          <p className="text-xl font-bold text-yellow-800">{formatCurrency(totalPendingValue)}</p>
        </div>
      </div>

      <div className="mt-4 max-h-96 overflow-y-auto">
        <h3 className="text-md font-semibold text-gray-700 mb-2">Detalhe por Funcionário:</h3>
        <ul className="space-y-2">
          {sortedEmployees.map((emp: Funcionario) => {
            const statusConfig = STATUS_OPTIONS.find(s => s.value === emp.status);
            return (
              <li key={emp.id} className="flex justify-between items-center p-2 rounded-lg bg-gray-50 border-l-4 border-indigo-400">
                <span className="text-sm font-medium text-gray-800 truncate pr-2">{emp.nome}</span>
                <span className={`px-2 py-0.5 text-xs font-bold rounded ${statusConfig?.color} border`}>
                  {statusConfig?.label.toUpperCase()}
                </span>
              </li>
            );
          })}
        </ul>
      </div>
      <p className="text-center text-xs text-gray-400 mt-4 pt-4 border-t border-dashed">
        Relatório gerado em {new Date().toLocaleDateString('pt-BR')}
      </p>
    </div>
  );
});

ShareableReport.displayName = 'ShareableReport';
