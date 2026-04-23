import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function Login() {
  const [, setLocation] = useLocation();
  const [accessKey, setAccessKey] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false); // Estado para mostrar erro se a key estiver errada

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(false);
    
    setTimeout(() => {
      // AQUI ESTÁ A SUA KEY
      if (accessKey === "INJETOR-DE-XIT") {
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("userKey", accessKey);
        setLocation("/dashboard");
      } else {
        setError(true); // Ativa o erro se a key for diferente
        alert("Chave de Acesso Incorreta!");
      }
      setIsLoading(false);
    }, 1000);
  };

  // O botão só fica desabilitado se o campo estiver vazio ou se estiver carregando
  const isButtonDisabled = accessKey.trim() === "" || isLoading;

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-red-600 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-red-700 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 w-full max-w-md">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-2" style={{ fontFamily: "'Poppins', sans-serif" }}>
            Injetor de Xit
          </h1>
          <p className="text-gray-400 text-sm">Insira sua chave de acesso exclusiva</p>
        </div>

        <div className="bg-card border border-border rounded-xl p-8 shadow-2xl backdrop-blur-sm">
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <Label 
                htmlFor="accessKey" 
                className="text-sm font-medium text-foreground"
              >
                Chave de Acesso (Key)
              </Label>
              <Input
                id="accessKey"
                type="text"
                placeholder="Digite sua Key aqui..."
                value={accessKey}
                onChange={(e) => {
                  setAccessKey(e.target.value);
                  setError(false);
                }}
                className={`bg-secondary border-border text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/30 transition-all duration-200 ${error ? 'border-red-500' : ''}`}
              />
              {error && <p className="text-red-500 text-xs mt-1">Chave inválida. Tente novamente.</p>}
            </div>

            <Button
              type="submit"
              disabled={isButtonDisabled}
              className="w-full bg-primary hover:bg-red-700 text-primary-foreground font-semibold py-2.5 rounded-lg transition-all duration-200 shadow-lg shadow-red-600/30 hover:shadow-red-600/50 disabled:opacity-30 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                  Verificando...
                </span>
              ) : (
                "Entrar no Painel"
              )}
            </Button>
          </form>
        </div>

        <p className="text-center text-xs text-muted-foreground mt-8">
          © 2026 Injetor de Xit. Todos os direitos reservados.
        </p>
      </div>
    </div>
  );
}