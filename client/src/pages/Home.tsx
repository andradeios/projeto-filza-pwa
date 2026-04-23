import FilzaFileManager from '@/components/FilzaFileManager';

/**
 * Filza File Manager - Web Version
 * 
 * Design Philosophy: Premium Dark Minimalism
 * - Deep charcoal background (#0a0a0a) for authenticity
 * - iOS-style rounded rectangle icons
 * - Minimal color palette with blue accents (#0a84ff)
 * - Smooth, subtle animations
 * - Typography hierarchy inspired by SF Pro
 * - Responsive design optimized for iPhone (max-width: 428px)
 */

export default function Home() {
  return (
    <div className="w-full min-h-screen bg-background flex items-center justify-center p-2">
      <div className="w-full max-w-md bg-background rounded-3xl shadow-2xl overflow-hidden border border-border/50">
        <FilzaFileManager
          onItemClick={(item) => {
            console.log('Clicked item:', item);
          }}
        />
      </div>
    </div>
  );
}
