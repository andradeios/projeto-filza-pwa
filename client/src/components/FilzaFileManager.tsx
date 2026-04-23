import React, { useState, useEffect } from 'react';
import { ChevronLeft, Search, Info, ChevronRight, Plus, Grid3x3, List, Upload, X, CheckCircle2 } from 'lucide-react';

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

  // Auto-hide activation message after 3 seconds
  useEffect(() => {
    if (isActivated) {
      const timer = setTimeout(() => {
        setIsActivated(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isActivated]);

  const handleItemClick = (item: AppItem) => {
    setSelectedItem(item.id);
    if (item.isFolder) {
      setShowAddFile(true);
    }
    onItemClick?.(item);
  };

  const handleBack = () => {
    setSelectedItem(null);
    setShowAddFile(false);
    setIsActivated(false);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      // Logic for headtrick file selection
      setIsActivated(true);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      setIsActivated(true);
    }
  };

  const renderIcon = (icon: string) => {
    if (icon.startsWith('http') || icon.startsWith('/')) {
      return (
        <img
          src={icon}
          alt="app-icon"
          className="w-full h-full object-cover rounded-2xl"
        />
      );
    }
    return <span className="text-2xl">{icon}</span>;
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col max-w-[390px] mx-auto relative overflow-hidden">
      {/* Success Message Overlay */}
      {isActivated && (
        <div className="absolute top-20 left-1/2 -translate-x-1/2 z-50 animate-in fade-in slide-in-from-top-4 duration-300">
          <div className="bg-green-500 text-white px-6 py-3 rounded-full shadow-2xl flex items-center gap-2 border-2 border-white/20 backdrop-blur-sm">
            <CheckCircle2 size={20} />
            <span className="font-bold whitespace-nowrap">Ativado com Sucesso!</span>
          </div>
        </div>
      )}

      {/* Header - Ajustado apenas o tamanho do título para caber na proporção da imagem */}
      <div className="ios-header bg-background/95 px-4 py-3 flex items-center justify-between border-b border-border">
        <button
          onClick={handleBack}
          className="text-primary hover:opacity-70 transition-opacity flex items-center gap-1 text-sm font-semibold min-w-[60px]"
        >
          <ChevronLeft size={20} />
          <span>Voltar</span>
        </button>
        <h1 className="text-[15px] font-bold text-center flex-1 truncate px-2 tracking-tight">
          {selectedItem && showAddFile ? 'Free Fire' : 'Gerenciador de Aplicativos'}
        </h1>
        <button className="text-primary hover:opacity-70 transition-opacity text-sm font-semibold min-w-[60px] text-right">
          {selectedItem && showAddFile ? '' : 'Editar'}
        </button>
      </div>

      {/* Search and View Toggle - Ajustado para ser mais compacto na proporção da imagem */}
      {!showAddFile && (
        <div className="flex items-center justify-between px-4 py-2 border-b border-border bg-background">
          <div className="flex items-center gap-3 flex-1">
            <Search size={18} className="text-muted-foreground" />
            <div className="flex items-center gap-2 text-[10px] text-muted-foreground font-bold uppercase tracking-wide">
              <span>Nome</span>
              <span className="opacity-40">◇</span>
              <span>Uso de disco</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1 rounded transition-colors ${
                viewMode === 'grid' ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              <Grid3x3 size={18} />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-1 rounded transition-colors ${
                viewMode === 'list' ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              <List size={18} />
            </button>
          </div>
        </div>
      )}

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto">
        {showAddFile ? (
          // Free Fire Folder View with Upload
          <div className="flex flex-col p-6">
            <div className="flex flex-col items-center justify-center mb-8 gap-6">
              <img 
                src="freefire.png" 
                alt="Logo Free Fire" 
                className="w-24 h-24 object-contain shadow-lg rounded-2xl" 
              />
              <div className="text-center">
                <h2 className="text-3xl font-bold">Free Fire</h2>
                <p className="text-muted-foreground text-sm mt-1">
                  Selecione o arquivo
                </p>
              </div>
            </div>

            {/* Upload Area */}
            <div
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              className={`flex-1 border-2 border-dashed rounded-3xl p-8 flex flex-col items-center justify-center transition-all duration-300 ${
                dragActive
                  ? 'border-green-500 bg-green-500/10 scale-[1.02]'
                  : 'border-border hover:border-primary/50'
              } ${isActivated ? 'border-green-500 bg-green-500/5' : ''}`}
            >
              <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 transition-colors ${isActivated ? 'bg-green-500 text-white' : 'bg-secondary text-muted-foreground'}`}>
                {isActivated ? <CheckCircle2 size={32} /> : <Upload size={32} />}
              </div>
              
              <p className="text-center text-sm font-bold mb-2">
                {isActivated ? 'Arquivo Carregado' : 'Arraste o arquivo ou clique abaixo'}
              </p>
              <p className="text-xs text-muted-foreground text-center mb-6">
                Apenas arquivos de configuração (.txt, .cfg, .reg, .json)
              </p>
              
              <label className={`px-8 py-3 rounded-2xl font-bold cursor-pointer transition-all active:scale-95 shadow-lg ${isActivated ? 'bg-green-600 text-white' : 'bg-primary text-primary-foreground hover:opacity-90'}`}>
                Selecionar Xit
                <input
                  type="file"
                  onChange={handleFileUpload}
                  className="hidden"
                  accept=".txt,.cfg,.reg,.json,.lua"
                />
              </label>
              
              {isActivated && (
                <button 
                  onClick={() => setIsActivated(false)}
                  className="mt-4 text-xs font-medium text-muted-foreground hover:text-foreground underline underline-offset-4"
                >
                  Trocar Xit
                </button>
              )}
            </div>
          </div>
        ) : viewMode === 'list' ? (
          // List View - Ajustado apenas o tamanho dos ícones e fontes para a proporção da imagem
          <div className="divide-y divide-border">
            {APPS.map((app, index) => (
              <div
                key={app.id}
                onClick={() => handleItemClick(app)}
                className="px-4 py-3 flex items-center gap-4 hover:bg-secondary/50 transition-colors duration-150 cursor-pointer"
              >
                {/* Icon - Proporção ajustada para a imagem */}
                <div className={`app-icon ${app.bgColor} text-white flex-shrink-0 w-[52px] h-[52px] rounded-[14px] flex items-center justify-center shadow-md overflow-hidden`}>
                  {renderIcon(app.icon)}
                </div>

                {/* App Name & Size */}
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-foreground text-[16px] leading-tight truncate">{app.name}</p>
                  <p className="text-[12px] text-muted-foreground mt-0.5">{app.size}</p>
                </div>

                {/* Info Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                  className="p-1 text-primary hover:opacity-70 transition-opacity flex-shrink-0"
                >
                  <Info size={20} />
                </button>

                {/* Chevron */}
                <ChevronRight size={18} className="text-muted-foreground flex-shrink-0" />
              </div>
            ))}
          </div>
        ) : (
          // Grid View
          <div className="grid grid-cols-3 gap-4 p-4">
            {APPS.map((app, index) => (
              <div
                key={app.id}
                onClick={() => handleItemClick(app)}
                className="flex flex-col items-center gap-2 p-2 rounded-lg hover:bg-secondary/50 transition-colors cursor-pointer"
              >
                <div className={`app-icon ${app.bgColor} text-white w-14 h-14 rounded-2xl flex items-center justify-center shadow-md overflow-hidden`}>
                  {renderIcon(app.icon)}
                </div>
                <p className="text-xs font-semibold text-center text-foreground truncate w-full">
                  {app.name}
                </p>
                <p className="text-xs text-muted-foreground">{app.size}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Home Indicator iOS - Para manter a proporção da imagem */}
      <div className="pb-2 pt-1 flex justify-center bg-background">
        <div className="w-32 h-1.5 bg-foreground/20 rounded-full" />
      </div>
    </div>
  );
};

export default FilzaFileManager;