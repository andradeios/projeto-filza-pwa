import { useEffect } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { FolderOpen, LogOut } from "lucide-react";

export default function Dashboard() {
  const [, setLocation] = useLocation();

  useEffect(() => {
    // Verificar se o usuário está logado
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (!isLoggedIn) {
      // Redirecionar para login se não estiver autenticado
      setLocation("/login");
    }
  }, [setLocation]);

  const handleOpenFilza = () => {
    setLocation("/filza");
  };

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("username");
    setLocation("/login");
  };

  const username = localStorage.getItem("username");

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 relative overflow-hidden">
      {/* Elemento decorativo de fundo - gradiente vermelho sutil */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-red-600 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-red-700 rounded-full blur-3xl"></div>
      </div>

      {/* Container principal */}
      <div className="relative z-10 w-full max-w-md">
        {/* Header com logout */}
        <div className="text-right mb-8">
          <button
            onClick={handleLogout}
            className="inline-flex items-center gap-2 px-4 py-2 bg-red-600/20 hover:bg-red-600/30 text-primary border border-primary rounded-lg text-sm font-medium transition-all duration-200"
          >
            <LogOut size={16} />
            Sair
          </button>
        </div>

        {/* Card principal */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-2" style={{ fontFamily: "'Poppins', sans-serif" }}>
            Bem-vindo!
          </h1>
          <p className="text-gray-400 text-sm mb-4">
            Olá, <span className="text-primary font-semibold">{username}</span>
          </p>
          <p className="text-gray-500 text-xs">Clique no botão abaixo para acessar o gerenciador de arquivos</p>
        </div>

        {/* Card com botão */}
        <div className="bg-card border border-border rounded-xl p-12 shadow-2xl backdrop-blur-sm text-center">
          <div className="mb-6 flex justify-center">
            <div className="p-4 bg-primary/10 rounded-full">
              <FolderOpen size={48} className="text-primary" />
            </div>
          </div>

          <h2 className="text-2xl font-bold text-foreground mb-2" style={{ fontFamily: "'Poppins', sans-serif" }}>
            Gerenciador de Arquivos
          </h2>
          <p className="text-muted-foreground text-sm mb-8">
            Acesse o Injetor de Xit para gerenciar seus arquivos e pastas
          </p>

          <Button
            onClick={handleOpenFilza}
            className="w-full bg-primary hover:bg-red-700 text-primary-foreground font-semibold py-3 rounded-lg transition-all duration-200 shadow-lg shadow-red-600/30 hover:shadow-red-600/50 flex items-center justify-center gap-2"
          >
            <FolderOpen size={20} />
            Abrir Gerenciador de Arquivos
          </Button>
        </div>

        {/* Footer */}
        <p className="text-center text-xs text-muted-foreground mt-8">
          © 2026 Injetor de Xit. Todos os direitos reservados.
        </p>
      </div>
    </div>
  );
}
