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
  { id: '8', name: 'Notas', size: 'Zero KB', icon: '/notes.png', bgColor: 'bg-yellow-500' },
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
    <div className="min-h-screen bg-background text-foreground flex flex-col max-w-md mx-auto relative overflow-hidden">
      {/* Success Message Overlay */}
      {isActivated && (
        <div className="absolute top-16 left-1/2 -translate-x-1/2 z-50 animate-in fade-in slide-in-from-top-4 duration-300">
          <div className="bg-green-500 text-white px-5 py-2.5 rounded-full shadow-2xl flex items-center gap-2 border-2 border-white/20 backdrop-blur-sm">
            <CheckCircle2 size={18} />
            <span className="font-bold text-sm whitespace-nowrap">Ativado com Sucesso!</span>
          </div>
        </div>
      )}

      {/* Header - Ajustado para ser mais clean e não quebrar o título */}
      <div className="ios-header bg-background/95 px-4 py-3 flex items-center justify-between border-b border-border">
        <button
          onClick={handleBack}
          className="text-primary hover:opacity-70 transition-opacity flex items-center gap-0.5 text-sm font-semibold min-w-[60px]"
        >
          <ChevronLeft size={20} />
          <span>Voltar</span>
        </button>
        
        {/* Título com tamanho reduzido para caber em uma linha no iPhone */}
        <h1 className="text-[14px] font-bold text-center flex-1 truncate px-2 tracking-tight">
          {selectedItem && showAddFile ? 'Free Fire' : 'Gerenciador de Aplicativos'}
        </h1>

        <button className="text-primary hover:opacity-70 transition-opacity text-sm font-semibold min-w-[60px] text-right">
          {selectedItem && showAddFile ? '' : 'Editar'}
        </button>
      </div>

      {/* Search and View Toggle - Mais compacto e clean */}
      {!showAddFile && (
        <div className="flex items-center justify-between px-4 py-2 border-b border-border bg-background">
          <div className="flex items-center gap-2 flex-1">
            <Search size={16} className="text-muted-foreground" />
            <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground font-medium uppercase tracking-wider">
              <span>Nome</span>
              <span className="opacity-30">◇</span>
              <span>Uso de disco</span>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1 rounded transition-colors ${
                viewMode === 'grid' ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              <Grid3x3 size={16} />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-1 rounded transition-colors ${
                viewMode === 'list' ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              <List size={16} />
            </button>
          </div>
        </div>
      )}

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto">
        {showAddFile ? (
          // Free Fire Folder View with Upload - Mais compacto
          <div className="flex flex-col p-6">
            <div className="flex flex-col items-center justify-center mb-6 gap-4">
              <img 
                src="freefire.png" 
                alt="Logo Free Fire" 
                className="w-20 h-20 object-contain shadow-lg rounded-2xl" 
              />
              <div className="text-center">
                <h2 className="text-2xl font-bold">Free Fire</h2>
                <p className="text-muted-foreground text-xs mt-0.5">
                  Selecione o arquivo
                </p>
              </div>
            </div>

            {/* Upload Area - Ajustada para ser mais clean */}
            <div
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              className={`border-2 border-dashed rounded-3xl p-6 flex flex-col items-center justify-center transition-all duration-300 ${
                dragActive
                  ? 'border-green-500 bg-green-500/10 scale-[1.01]'
                  : 'border-border hover:border-primary/50'
              } ${isActivated ? 'border-green-500 bg-green-500/5' : ''}`}
            >
              <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-3 transition-colors ${isActivated ? 'bg-green-500 text-white' : 'bg-secondary text-muted-foreground'}`}>
                {isActivated ? <CheckCircle2 size={24} /> : <Upload size={24} />}
              </div>
              
              <p className="text-center text-xs font-bold mb-1">
                {isActivated ? 'Arquivo Carregado' : 'Arraste ou clique abaixo'}
              </p>
              <p className="text-[10px] text-muted-foreground text-center mb-4">
                Apenas arquivos .txt, .cfg, .reg, .json
              </p>
              
              <label className={`px-6 py-2.5 rounded-2xl text-xs font-bold cursor-pointer transition-all active:scale-95 shadow-lg ${isActivated ? 'bg-green-600 text-white' : 'bg-primary text-primary-foreground hover:opacity-90'}`}>
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
                  className="mt-3 text-[10px] font-medium text-muted-foreground hover:text-foreground underline underline-offset-4"
                >
                  Trocar Xit
                </button>
              )}
            </div>
          </div>
        ) : viewMode === 'list' ? (
          // List View - Mais compacta e clean com cores originais
          <div className="divide-y divide-border">
            {APPS.map((app, index) => (
              <div
                key={app.id}
                onClick={() => handleItemClick(app)}
                className="px-4 py-2.5 flex items-center gap-3 hover:bg-secondary/50 transition-colors cursor-pointer"
              >
                {/* Icon - Tamanho ajustado */}
                <div className={`flex-shrink-0 w-12 h-12 rounded-2xl flex items-center justify-center shadow-md overflow-hidden ${app.bgColor} text-white`}>
                  {renderIcon(app.icon)}
                </div>

                {/* App Name */}
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-foreground text-[13px] truncate">{app.name}</p>
                  <p className="text-[10px] text-muted-foreground mt-0.5">{app.size}</p>
                </div>

                {/* Info Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                  className="p-1.5 text-primary hover:opacity-70 transition-opacity flex-shrink-0"
                >
                  <Info size={16} />
                </button>

                {/* Chevron */}
                <ChevronRight size={16} className="text-muted-foreground flex-shrink-0" />
              </div>
            ))}
          </div>
        ) : (
          // Grid View - Mais compacta
          <div className="grid grid-cols-3 gap-3 p-4">
            {APPS.map((app, index) => (
              <div
                key={app.id}
                onClick={() => handleItemClick(app)}
                className="flex flex-col items-center gap-1.5 p-2 rounded-lg hover:bg-secondary/50 transition-colors cursor-pointer"
              >
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-md overflow-hidden ${app.bgColor} text-white`}>
                  {renderIcon(app.icon)}
                </div>
                <p className="text-[11px] font-semibold text-center text-foreground truncate w-full">
                  {app.name}
                </p>
                <p className="text-[9px] text-muted-foreground">{app.size}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FilzaFileManager;