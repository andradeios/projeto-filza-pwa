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

  const renderIcon = (icon: string) => {
    if (icon.startsWith('http') || icon.startsWith('/')) {
      return (
        <img
          src={icon}
          alt="app-icon"
          className="w-full h-full object-cover rounded-[22%]" 
        />
      );
    }
    return <span className="text-xl">{icon}</span>;
  };

  return (
    /* Ajuste de largura máxima para iPhones modernos */
    <div className="min-h-screen bg-background text-foreground flex flex-col max-w-[430px] mx-auto relative overflow-hidden font-sans">
      
      {isActivated && (
        <div className="absolute top-16 left-1/2 -translate-x-1/2 z-50 animate-in fade-in slide-in-from-top-2 duration-300">
          <div className="bg-green-500 text-white px-5 py-2 rounded-full shadow-lg flex items-center gap-2 border border-white/20">
            <CheckCircle2 size={18} />
            <span className="font-semibold text-sm whitespace-nowrap">Ativado com Sucesso!</span>
          </div>
        </div>
      )}

      {/* Header com altura reduzida e tipografia mais fina */}
      <div className="ios-header bg-background/95 px-4 py-2.5 flex items-center justify-between border-b border-border/50 backdrop-blur-md">
        <button onClick={handleBack} className="text-primary flex items-center gap-0.5 text-[17px]">
          <ChevronLeft size={22} />
          <span>Voltar</span>
        </button>
        <h1 className="text-[17px] font-semibold tracking-tight absolute left-1/2 -translate-x-1/2">
          {selectedItem && showAddFile ? 'Free Fire' : 'Gerenciador de Aplicativos'}
        </h1>
        <button className="text-primary text-[17px]">
          {selectedItem && showAddFile ? '' : 'Editar'}
        </button>
      </div>

      {!showAddFile && (
        <div className="flex items-center justify-between px-5 py-2 border-b border-border/40 bg-background/50">
          <div className="flex items-center gap-2 flex-1">
            <Search size={14} className="text-muted-foreground" />
            <span className="text-[11px] uppercase tracking-wider text-muted-foreground font-bold">Recentes</span>
          </div>
          <div className="flex items-center gap-1 bg-secondary/50 p-0.5 rounded-lg">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1 rounded-md transition-all ${viewMode === 'grid' ? 'bg-background shadow-sm text-primary' : 'text-muted-foreground'}`}
            >
              <Grid3x3 size={15} />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-1 rounded-md transition-all ${viewMode === 'list' ? 'bg-background shadow-sm text-primary' : 'text-muted-foreground'}`}
            >
              <List size={15} />
            </button>
          </div>
        </div>
      )}

      <div className="flex-1 overflow-y-auto">
        {showAddFile ? (
          <div className="flex flex-col p-8">
            <div className="flex flex-col items-center justify-center mb-10 gap-4">
              <div className="w-20 h-20 shadow-xl rounded-[22%] overflow-hidden">
                <img src="freefire.png" alt="Logo" className="w-full h-full object-cover" />
              </div>
              <div className="text-center">
                <h2 className="text-2xl font-bold tracking-tight">Free Fire</h2>
                <p className="text-muted-foreground text-xs mt-1 uppercase tracking-widest font-medium">Selecione o arquivo de Xit</p>
              </div>
            </div>

            <div
              className={`aspect-square border-2 border-dashed rounded-[32px] flex flex-col items-center justify-center transition-all ${
                dragActive ? 'border-primary bg-primary/5 scale-95' : 'border-border'
              }`}
            >
              <div className={`w-14 h-14 rounded-full flex items-center justify-center mb-4 ${isActivated ? 'bg-green-500 text-white' : 'bg-secondary text-muted-foreground'}`}>
                {isActivated ? <CheckCircle2 size={28} /> : <Upload size={28} />}
              </div>
              <p className="text-[15px] font-bold mb-1">Arraste o arquivo ou clique abaixo</p>
              <p className="text-[11px] text-muted-foreground mb-6">Formatos: .txt, .lua, .json</p>
              
              <label className="bg-primary text-primary-foreground px-6 py-2.5 rounded-full font-bold text-sm active:scale-95 transition-transform cursor-pointer shadow-md">
                Selecionar Xit
                <input type="file" onChange={handleFileUpload} className="hidden" accept=".txt,.cfg,.reg,.json,.lua" />
              </label>
            </div>
          </div>
        ) : viewMode === 'list' ? (
          <div className="divide-y divide-border/30">
            {APPS.map((app) => (
              <div
                key={app.id}
                onClick={() => handleItemClick(app)}
                className="px-4 py-2.5 flex items-center gap-3 active:bg-secondary/80 transition-colors cursor-pointer"
              >
                <div className={`${app.bgColor} w-11 h-11 rounded-[22%] flex items-center justify-center shadow-sm overflow-hidden`}>
                  {renderIcon(app.icon)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-[15px] truncate leading-tight">{app.name}</p>
                  <p className="text-[11px] text-muted-foreground">{app.size}</p>
                </div>
                <ChevronRight size={16} className="text-muted-foreground/50" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-4 gap-x-2 gap-y-6 p-5">
            {APPS.map((app) => (
              <div
                key={app.id}
                onClick={() => handleItemClick(app)}
                className="flex flex-col items-center gap-1.5 active:opacity-60 transition-opacity cursor-pointer"
              >
                <div className={`${app.bgColor} w-[60px] h-[60px] rounded-[22%] flex items-center justify-center shadow-md overflow-hidden`}>
                  {renderIcon(app.icon)}
                </div>
                <p className="text-[11px] font-medium text-center truncate w-full px-1">
                  {app.name}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FilzaFileManager;