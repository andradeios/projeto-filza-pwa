import { useState, useEffect } from "react"; // 1. Adicione o useEffect aqui
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function Login() {
  const [, setLocation] = useLocation();
  const [accessKey, setAccessKey] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  
  // 2. Estado para saber se o usuário quer ser lembrado
  const [rememberMe, setRememberMe] = useState(false);

  // 3. Carregar a chave salva quando abrir a página
  useEffect(() => {
    const savedKey = localStorage.getItem("key_salva");
    if (savedKey) {
      setAccessKey(savedKey);
      setRememberMe(true);
    }
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(false);
    
    setTimeout(() => {
      if (accessKey === "INJETOR-DE-XIT") {
        // 4. Lógica para salvar ou remover a chave da memória
        if (rememberMe) {
          localStorage.setItem("key_salva", accessKey);
        } else {
          localStorage.removeItem("key_salva");
        }

        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("userKey", accessKey);
        setLocation("/dashboard");
      } else {
        setError(true);
        alert("Chave de Acesso Incorreta!");
      }
      setIsLoading(false);
    }, 1000);
  };

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
              <Label htmlFor="accessKey" className="text-sm font-medium text-foreground">
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
                className={`bg-secondary border-border text-foreground focus:ring-primary/30 ${error ? 'border-red-500' : ''}`}
              />
            </div>

            {/* 5. O BOTÃO/CHECKBOX DE LEMBRAR KEY */}
            <div className="flex items-center gap-2 px-1">
              <input 
                type="checkbox" 
                id="remember" 
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 accent-red-600 cursor-pointer"
              />
              <label htmlFor="remember" className="text-sm text-gray-400 cursor-pointer select-none">
                Lembrar minha chave
              </label>
            </div>

            <Button
              type="submit"
              disabled={isButtonDisabled}
              className="w-full bg-primary hover:bg-red-700 text-primary-foreground font-semibold py-2.5 rounded-lg shadow-lg shadow-red-600/30"
            >
              {isLoading ? "Verificando..." : "Entrar no Painel"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}