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

  // Função de logout (caso queira chamar de dentro do Filza no futuro)
  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("username");
    setLocation("/login");
  };

  return (
    <div className="w-full min-h-screen bg-background">
      {/* O FilzaFileManager agora ocupa 100% da viewport.
          Removidos: Header externo, títulos, bordas arredondadas e sombras.
      */}
      <FilzaFileManager
        onItemClick={(item) => {
          console.log('Item selecionado:', item.name);
          // Se quiser que o botão de "Sair" funcione dentro do Filza, 
          // você pode passar o handleLogout como prop para ele.
        }}
      />
    </div>
  );
}