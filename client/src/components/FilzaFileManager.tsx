import React, { useState, useEffect } from 'react';
import { ChevronLeft, Search, Info, ChevronRight, Grid3x3, List, Upload, CheckCircle2 } from 'lucide-react';

interface AppItem {
  id: string;
  name: string;
  size: string;
  icon: string;
  bgColor: string;
  isFolder?: boolean;
}

interface FilzaFileManagerProps {
  onItemClick?: (item: AppItem) => void;
}

const APPS: AppItem[] = [
  { id: '1', name: 'Free Fire', size: 'Zero KB', icon: '/freefire.png', isFolder: true, bgColor: 'bg-orange-500' },
  { id: '2', name: 'Discord', size: 'Zero KB', icon: '/discord.png', bgColor: 'bg-indigo-500' },
  { id: '3', name: 'WhatsApp', size: 'Zero KB', icon: '/whatsapp.png', bgColor: 'bg-green-500' },
  { id: '4', name: 'Telegram', size: 'Zero KB', icon: '/telegram.png', bgColor: 'bg-blue-400' },
  { id: '5', name: 'Youtube', size: 'Zero KB', icon: '/youtube.png', bgColor: 'bg-red-600' },
  { id: '6', name: 'Pinterest', size: 'Zero KB', icon: '/pinterest.png', bgColor: 'bg-red-500' },
  { id: '7', name: 'iFood', size: 'Zero KB', icon: '/ifood.png', bgColor: 'bg-red-600' },
  { id: '8', name: 'Notas', size: 'Zero KB', icon: '/notas.png', bgColor: 'bg-yellow-500' },
  { id: '9', name: 'Mail', size: '9.3 MB', icon: '/mail.png', bgColor: 'bg-blue-500' },
  { id: '10', name: 'Nubank', size: 'Zero KB', icon: '/nubank.png', bgColor: 'bg-purple-600' }
];

export const FilzaFileManager: React.FC<FilzaFileManagerProps> = ({ onItemClick }) => {
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [showAddFile, setShowAddFile] = useState(false);
  const [isActivated, setIsActivated] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  useEffect(() => {
    if (isActivated) {
      const timer = setTimeout(() => setIsActivated(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [isActivated]);

  const handleItemClick = (item: AppItem) => {
    setSelectedItem(item.id);
    if (item.isFolder) setShowAddFile(true);
    onItemClick?.(item);
  };

  const handleBack = () => {
    setSelectedItem(null);
    setShowAddFile(false);
    setIsActivated(false);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) setIsActivated(true);
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(e.type === 'dragenter' || e.type === 'dragover');
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) setIsActivated(true);
  };

  const renderIcon = (icon: string) => {
    if (icon.startsWith('http') || icon.startsWith('/')) {
      return (
        <img
          src={icon}
          alt="app-icon"
          className="w-full h-full object-cover rounded-xl"
        />
      );
    }
    return <span className="text-xl">{icon}</span>;
  };

  return (
    /* 
       Ajuste Crítico: h-[100dvh] garante que o app ocupe exatamente a tela do iPhone, 
       mesmo com a barra do navegador/sistema. 
    */
    <div className="h-[100dvh] w-full max-w-[390px] mx-auto bg-background text-foreground flex flex-col relative overflow-hidden">
      
      {/* Success Message Overlay */}
      {isActivated && (
        <div className="absolute top-16 left-1/2 -translate-x-1/2 z-50 animate-in fade-in slide-in-from-top-4 duration-300">
          <div className="bg-green-500 text-white px-4 py-2 rounded-full shadow-lg flex items-center gap-2 border border-white/10">
            <CheckCircle2 size={16} />
            <span className="font-bold text-xs whitespace-nowrap">Ativado com Sucesso!</span>
          </div>
        </div>
      )}

      {/* Header - Removida a classe .ios-header para evitar conflito com o CSS global */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-background/95 backdrop-blur-md flex-shrink-0">
        <button
          onClick={handleBack}
          className="text-primary hover:opacity-70 transition-opacity flex items-center gap-0.5 text-sm font-semibold min-w-[60px]"
        >
          <ChevronLeft size={20} />
          <span>Voltar</span>
        </button>
        
        <h1 className="text-[14px] font-bold text-center flex-1 truncate px-2 tracking-tight">
          {selectedItem && showAddFile ? 'Free Fire' : 'Gerenciador de Aplicativos'}
        </h1>

        <button className="text-primary hover:opacity-70 transition-opacity text-sm font-semibold min-w-[60px] text-right">
          {selectedItem && showAddFile ? '' : 'Editar'}
        </button>
      </div>

      {/* Search and View Toggle - Compacto para não empurrar o conteúdo */}
      {!showAddFile && (
        <div className="flex items-center justify-between px-4 py-2 border-b border-border bg-background flex-shrink-0">
          <div className="flex items-center gap-2 flex-1">
            <Search size={16} className="text-muted-foreground" />
            <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground font-bold uppercase tracking-wider">
              <span>Nome</span>
              <span className="opacity-30">◇</span>
              <span>Uso de disco</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1 rounded transition-colors ${viewMode === 'grid' ? 'text-primary' : 'text-muted-foreground'}`}
            >
              <Grid3x3 size={16} />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-1 rounded transition-colors ${viewMode === 'list' ? 'text-primary' : 'text-muted-foreground'}`}
            >
              <List size={16} />
            </button>
          </div>
        </div>
      )}

      {/* Content Area - Única parte com scroll, travada para não vazar */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden">
        {showAddFile ? (
          /* Tela de Upload (Free Fire) */
          <div className="flex flex-col p-6 min-h-full">
            <div className="flex flex-col items-center justify-center mb-6 gap-4">
              <img 
                src="freefire.png" 
                alt="Logo Free Fire" 
                className="w-20 h-20 object-contain shadow-lg rounded-2xl" 
              />
              <div className="text-center">
                <h2 className="text-2xl font-bold">Free Fire</h2>
                <p className="text-muted-foreground text-xs mt-0.5">Selecione o arquivo</p>
              </div>
            </div>

            <div
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              className={`flex-1 border-2 border-dashed rounded-3xl p-6 flex flex-col items-center justify-center transition-all duration-300 ${
                dragActive ? 'border-green-500 bg-green-500/10' : 'border-border'
              } ${isActivated ? 'border-green-500 bg-green-500/5' : ''}`}
            >
              <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-3 ${isActivated ? 'bg-green-500 text-white' : 'bg-secondary text-muted-foreground'}`}>
                {isActivated ? <CheckCircle2 size={24} /> : <Upload size={24} />}
              </div>
              <p className="text-center text-xs font-bold mb-1">{isActivated ? 'Arquivo Carregado' : 'Arraste ou clique abaixo'}</p>
              <p className="text-[10px] text-muted-foreground text-center mb-4">Apenas .txt, .cfg, .reg, .json</p>
              <label className={`px-6 py-2.5 rounded-xl text-xs font-bold cursor-pointer transition-all active:scale-95 ${isActivated ? 'bg-green-600 text-white' : 'bg-primary text-primary-foreground'}`}>
                Selecionar Xit
                <input type="file" onChange={handleFileUpload} className="hidden" accept=".txt,.cfg,.reg,.json,.lua" />
              </label>
              {isActivated && (
                <button onClick={() => setIsActivated(false)} className="mt-3 text-[10px] text-muted-foreground underline underline-offset-4">Trocar Xit</button>
              )}
            </div>
          </div>
        ) : viewMode === 'list' ? (
          /* List View - Ajustada para ignorar o .ios-list-item global que causava quebra */
          <div className="divide-y divide-border">
            {APPS.map((app) => (
              <div
                key={app.id}
                onClick={() => handleItemClick(app)}
                /* Removida a classe .ios-list-item para usar apenas Tailwind puro e evitar conflito */
                className="px-4 py-2.5 flex items-center gap-3 hover:bg-secondary/50 transition-colors cursor-pointer"
              >
                {/* Icon - Tamanho ajustado para escala clean */}
                <div className={`flex-shrink-0 w-11 h-11 rounded-xl flex items-center justify-center shadow-sm overflow-hidden ${app.bgColor} text-white`}>
                  {renderIcon(app.icon)}
                </div>

                {/* App Name & Size */}
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-foreground text-[14px] leading-tight truncate">{app.name}</p>
                  <p className="text-[11px] text-muted-foreground mt-0.5">{app.size}</p>
                </div>

                {/* Info Button */}
                <button onClick={(e) => e.stopPropagation()} className="p-1 text-primary hover:opacity-70 transition-opacity flex-shrink-0">
                  <Info size={18} />
                </button>

                {/* Chevron */}
                <ChevronRight size={18} className="text-muted-foreground flex-shrink-0" />
              </div>
            ))}
          </div>
        ) : (
          /* Grid View */
          <div className="grid grid-cols-3 gap-3 p-4">
            {APPS.map((app) => (
              <div key={app.id} onClick={() => handleItemClick(app)} className="flex flex-col items-center gap-1.5 p-2 rounded-lg hover:bg-secondary/50 transition-colors cursor-pointer">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center shadow-sm overflow-hidden ${app.bgColor} text-white`}>
                  {renderIcon(app.icon)}
                </div>
                <p className="text-[11px] font-bold text-center text-foreground truncate w-full">{app.name}</p>
                <p className="text-[9px] text-muted-foreground">{app.size}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Home Indicator iOS - Fixo no rodapé para garantir a proporção */}
      <div className="pb-2 pt-1 flex justify-center bg-background flex-shrink-0">
        <div className="w-24 h-1 bg-foreground/10 rounded-full" />
      </div>
    </div>
  );
};

export default FilzaFileManager;