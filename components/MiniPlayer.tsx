import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Book } from '../types';

interface MiniPlayerProps {
  currentBook: Book | null;
}

const MiniPlayer: React.FC<MiniPlayerProps> = ({ currentBook }) => {
  const navigate = useNavigate();

  if (!currentBook) return null;

  return (
    <div 
      className="fixed bottom-[80px] md:bottom-6 left-4 right-4 z-30"
      onClick={() => navigate(`/player/${currentBook.id}`)}
    >
      <div className="glass-panel flex h-[72px] items-center gap-4 rounded-2xl px-3 pr-5 shadow-glass cursor-pointer hover:bg-white/5 transition-all group overflow-hidden relative">
        {/* Progress Bar Background */}
        <div className="absolute bottom-0 left-0 h-[2px] w-full bg-white/5">
            <div className="h-full w-[35%] bg-primary shadow-[0_0_10px_#3AB8FF]"></div>
        </div>

        {/* Rotating Art */}
        <div className="h-12 w-12 shrink-0 rounded-full overflow-hidden shadow-lg border border-white/10 group-hover:scale-105 transition-transform">
           <img
            className="h-full w-full object-cover opacity-90"
            src={currentBook.cover}
            alt="Cover"
          />
        </div>
        
        <div className="flex-1 overflow-hidden flex flex-col justify-center">
          <p className="truncate text-sm font-bold text-white leading-tight">{currentBook.title}</p>
          <p className="truncate text-xs text-primary/80 font-medium">{currentBook.author}</p>
        </div>

        <div className="flex items-center gap-4">
             <button 
                className="text-white/60 hover:text-white transition-colors"
                onClick={(e) => { e.stopPropagation(); }}
            >
                <span className="material-symbols-outlined text-2xl">skip_previous</span>
            </button>
            <button 
                className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/20 text-primary hover:bg-primary hover:text-white transition-all shadow-glow-sm"
                onClick={(e) => {
                    e.stopPropagation();
                }}
            >
                <span className="material-symbols-outlined text-2xl fill">play_arrow</span>
            </button>
             <button 
                className="text-white/60 hover:text-white transition-colors"
                onClick={(e) => { e.stopPropagation(); }}
            >
                <span className="material-symbols-outlined text-2xl">skip_next</span>
            </button>
        </div>
      </div>
    </div>
  );
};

export default MiniPlayer;
