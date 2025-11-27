import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Loader2, LogIn } from "lucide-react";
import { getLoginUrl } from "@/const";
import { useLocation } from "wouter";
import { useEffect } from "react";

export default function Home() {
  const { user, loading, isAuthenticated, logout } = useAuth();
  const [location, setLocation] = useLocation();

  // Redirecionar para Dashboard se autenticado
  useEffect(() => {
    if (isAuthenticated && !loading) {
      setLocation("/dashboard");
    }
  }, [isAuthenticated, loading, setLocation]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-blue-50">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-indigo-600 mx-auto mb-4" />
          <p className="text-gray-600 font-medium">Carregando...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-blue-50 p-4">
        <Card className="w-full max-w-md p-8 shadow-xl">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-indigo-900 mb-2">
              Confraternização
            </h1>
            <p className="text-gray-600">
              Liderança BP - Gerenciamento de Arrecadação
            </p>
          </div>

          <div className="space-y-4 mb-6">
            <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-200">
              <h2 className="font-semibold text-indigo-900 mb-2">
                Bem-vindo ao Sistema
              </h2>
              <p className="text-sm text-gray-700">
                Faça login para acessar o painel de controle de arrecadação e
                despesas.
              </p>
            </div>
          </div>

          <Button
            onClick={() => {
              window.location.href = getLoginUrl();
            }}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-6 text-lg font-semibold"
          >
            <LogIn className="w-5 h-5 mr-2" />
            Fazer Login
          </Button>

          <p className="text-xs text-gray-500 text-center mt-4">
            Você será redirecionado para o painel após autenticar
          </p>
        </Card>
      </div>
    );
  }

  // Se autenticado, mostra mensagem de redirecionamento
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-blue-50">
      <div className="text-center">
        <Loader2 className="w-12 h-12 animate-spin text-indigo-600 mx-auto mb-4" />
        <p className="text-gray-600 font-medium">
          Redirecionando para o Dashboard...
        </p>
      </div>
    </div>
  );
}
