import { useEffect } from "react";
import { useLocation } from "wouter";
import FilzaFileManager from '@/components/FilzaFileManager';

export default function Filza() {
  const [, setLocation] = useLocation();

  useEffect(() => {
    // Verificar se o usuário está logado
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (!isLoggedIn) {
      // Redirecionar para login se não estiver autenticado
      setLocation("/login");
    }
  }, [setLocation]);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("username");
    setLocation("/login");
  };

  const username = localStorage.getItem("username");

  return (
    <div className="w-full min-h-screen bg-background flex flex-col">
      {/* Header com botão de logout */}
      <div className="bg-card border-b border-border px-4 py-3 flex justify-between items-center">
        <h1 className="text-lg font-semibold text-foreground">INJETOR DE XIT</h1>
        <div className="flex items-center gap-4">
          <span className="text-sm text-muted-foreground">Bem-vindo, <span className="text-primary font-semibold">{username}</span></span>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-primary hover:bg-red-700 text-white rounded-lg text-sm font-medium transition-colors"
          >
            Sair
          </button>
        </div>
      </div>

      {/* Conteúdo do Filza */}
      <div className="flex-1 flex items-center justify-center p-2">
        <div className="w-full max-w-md bg-background rounded-3xl shadow-2xl overflow-hidden border border-border/50">
          <FilzaFileManager
            onItemClick={(item) => {
              console.log('Clicked item:', item);
            }}
          />
        </div>
      </div>
    </div>
  );
}
