import React, { useState } from 'react';
import { ChevronLeft, Search, Info, ChevronRight, Plus, Grid3x3, List, Upload, X } from 'lucide-react';

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
  { id: '1', name: 'Free Fire', size: 'Zero KB', icon: '/freefire.png', isFolder: true },

  { id: '2', name: 'Discord', size: 'Zero KB', icon: '/discord.png' },
  { id: '3', name: 'WhatsApp', size: 'Zero KB', icon: '/whatsapp.png' },
  { id: '4', name: 'Telegram', size: 'Zero KB', icon: '/telegram.png' },
  { id: '5', name: 'Youtube', size: 'Zero KB', icon: '/youtube.png' },
  { id: '6', name: 'Pinterest', size: 'Zero KB', icon: '/pinterest.png' },
  { id: '7', name: 'iFood', size: 'Zero KB', icon: '/ifood.png' },
  { id: '8', name: 'Notas', size: 'Zero KB', icon: '/notas.png' },

  { id: '9', name: 'Mail', size: '9.3 MB', icon: '/mail.png' },
  { id: '10', name: 'Nubank', size: 'Zero KB', icon: '/nubank.png' }
];

export const FilzaFileManager: React.FC<FilzaFileManagerProps> = ({ onItemClick }) => {
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [showAddFile, setShowAddFile] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [dragActive, setDragActive] = useState(false);

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
    setUploadedFiles([]);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setUploadedFiles([...uploadedFiles, ...Array.from(e.target.files)]);
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
    if (e.dataTransfer.files) {
      setUploadedFiles([...uploadedFiles, ...Array.from(e.dataTransfer.files)]);
    }
  };

  const removeFile = (index: number) => {
    setUploadedFiles(uploadedFiles.filter((_, i) => i !== index));
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
    <div className="min-h-screen bg-background text-foreground flex flex-col max-w-md mx-auto">
      {/* Header */}
      <div className="ios-header bg-background/95 px-4 py-3 flex items-center justify-between border-b border-border">
        <button
          onClick={handleBack}
          className="text-primary hover:opacity-70 transition-opacity flex items-center gap-1 text-sm font-semibold"
        >
          <ChevronLeft size={20} />
          <span>Voltar</span>
        </button>
        <h1 className="text-base font-bold text-center flex-1 tracking-tight">
          {selectedItem && showAddFile ? 'Free Fire' : 'Gerenciador de Aplicativos'}
        </h1>
        <button className="text-primary hover:opacity-70 transition-opacity text-sm font-semibold">
          {selectedItem && showAddFile ? '' : 'Editar'}
        </button>
      </div>

      {/* Search and View Toggle */}
      {!showAddFile && (
        <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-background">
          <div className="flex items-center gap-3 flex-1">
            <Search size={18} className="text-muted-foreground" />
            <div className="flex items-center gap-2 text-xs text-muted-foreground font-medium">
              <span>Nome</span>
              <span>◇</span>
              <span>Uso de disco</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <ChevronLeft size={16} className="text-muted-foreground" />
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded transition-colors ${
                viewMode === 'grid' ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              <Grid3x3 size={16} />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-1.5 rounded transition-colors ${
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
          // Free Fire Folder View with Upload
          <div className="flex flex-col min-h-[500px] p-6">
            {uploadedFiles.length === 0 ? (
              <div className="flex flex-col items-center justify-center flex-1 gap-6">
                <img 
    src="freefire.png" 
    alt="Logo Free Fire" 
    className="w-24 h-24 object-contain shadow-lg rounded-2xl" 
  />
                <h2 className="text-3xl font-bold">Free Fire</h2>
                <p className="text-muted-foreground text-center text-sm">
                  Pasta vazia. Adicione arquivos para começar.
                </p>
              </div>
            ) : (
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-4">Arquivos Adicionados</h3>
                <div className="space-y-2">
                  {uploadedFiles.map((file, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 bg-secondary/50 rounded-lg"
                    >
                      <div className="flex items-center gap-3 flex-1 min-w-0">
                        <Upload size={18} className="text-primary flex-shrink-0" />
                        <span className="text-sm font-medium truncate">{file.name}</span>
                      </div>
                      <button
                        onClick={() => removeFile(index)}
                        className="p-1 hover:bg-secondary rounded transition-colors flex-shrink-0"
                      >
                        <X size={16} className="text-muted-foreground" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Upload Area */}
            <div
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              className={`flex-1 border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center transition-colors ${
                dragActive
                  ? 'border-primary bg-primary/10'
                  : 'border-border hover:border-primary/50'
              }`}
            >
              <Upload size={32} className="text-muted-foreground mb-3" />
              <p className="text-center text-sm font-medium mb-2">
                Arraste arquivos aqui ou clique para selecionar
              </p>
              <p className="text-xs text-muted-foreground text-center mb-4">
                Suporta imagens, vídeos e documentos
              </p>
              <label className="px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium cursor-pointer hover:opacity-90 transition-opacity">
                Selecionar Arquivo
                <input
                  type="file"
                  multiple
                  onChange={handleFileUpload}
                  className="hidden"
                  accept="image/*,video/*,.pdf,.doc,.docx"
                />
              </label>
            </div>
          </div>
        ) : viewMode === 'list' ? (
          // List View
          <div className="divide-y divide-border">
            {APPS.map((app, index) => (
              <div
                key={app.id}
                onClick={() => handleItemClick(app)}
                className="ios-list-item animate-stagger px-4 py-3 flex items-center gap-3 hover:bg-secondary/50 transition-colors duration-150 cursor-pointer"
                style={{ animationDelay: `${index * 30}ms` }}
              >
                {/* Icon */}
                <div className={`app-icon ${app.bgColor} text-white flex-shrink-0 w-14 h-14 rounded-2xl flex items-center justify-center shadow-md overflow-hidden`}>
                  {renderIcon(app.icon)}
                </div>

                {/* App Name */}
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-foreground text-sm truncate">{app.name}</p>
                </div>

                {/* Size */}
                <div className="text-xs text-muted-foreground text-right flex-shrink-0">
                  {app.size}
                </div>

                {/* Info Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                  className="ml-1 p-2 text-primary hover:opacity-70 transition-opacity flex-shrink-0"
                >
                  <Info size={18} />
                </button>

                {/* Chevron */}
                <ChevronRight size={18} className="text-muted-foreground ml-1 flex-shrink-0" />
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
                className="flex flex-col items-center gap-2 p-2 rounded-lg hover:bg-secondary/50 transition-colors cursor-pointer animate-stagger"
                style={{ animationDelay: `${index * 30}ms` }}
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

      {/* Upload Button in Free Fire */}
      {showAddFile && uploadedFiles.length > 0 && (
        <div className="border-t border-border bg-background/95 px-4 py-3 flex gap-3">
          <button
            onClick={handleBack}
            className="flex-1 px-4 py-2 bg-secondary text-foreground rounded-lg font-semibold hover:opacity-90 transition-opacity"
          >
            Cancelar
          </button>
          <button
            onClick={() => {
              alert(`${uploadedFiles.length} arquivo(s) adicionado(s) com sucesso!`);
              setUploadedFiles([]);
            }}
            className="flex-1 px-4 py-2 bg-primary text-primary-foreground rounded-lg font-semibold hover:opacity-90 transition-opacity"
          >
            Confirmar
          </button>
        </div>
      )}
    </div>
  );
};

export default FilzaFileManager;
