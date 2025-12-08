import React, { useState } from 'react';
import { Book } from '../types';

interface BookCardProps {
  book: Book;
  variant?: 'portrait' | 'landscape' | 'compact' | 'hero';
  onClick?: () => void;
  showProgress?: boolean;
}

const BookCard: React.FC<BookCardProps> = ({ book, variant = 'portrait', onClick, showProgress = false }) => {
  const [imgError, setImgError] = useState(false);

  const CoverImage = ({ className, opacity = "" }: { className: string, opacity?: string }) => {
    if (imgError) {
      return (
        <div className={`${className} bg-surface-dark flex items-center justify-center border border-white/5`}>
           <span className="material-symbols-outlined text-white/20 text-4xl">broken_image</span>
        </div>
      );
    }
    return (
      <img 
        src={book.cover} 
        className={`${className} ${opacity}`} 
        alt={book.title}
        onError={() => setImgError(true)} 
        loading="lazy"
      />
    );
  };
  
  // --- HERO VARIANT (Destaque Principal) ---
  if (variant === 'hero') {
    return (
      <div 
        className="relative w-full aspect-[16/10] md:aspect-[2.5/1] rounded-[2rem] overflow-hidden cursor-pointer group shadow-2xl ring-1 ring-white/10 isolate active:scale-[0.99] transition-all"
        onClick={onClick}
      >
        <div className="absolute inset-0 bg-[#161b22] -z-10"></div>
        <CoverImage className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 ease-out" opacity="opacity-70" />
        
        {/* Gradient Overlay for Text Readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d1117] via-[#0d1117]/60 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#0d1117]/90 via-transparent to-transparent"></div>
        
        <div className="absolute bottom-0 left-0 p-6 md:p-10 w-full flex items-end justify-between gap-4">
            <div className="flex-1 min-w-0 z-10">
                <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass-panel text-[10px] md:text-xs font-bold uppercase tracking-widest text-primary mb-3 md:mb-5 backdrop-blur-md border-primary/20 shadow-glow-sm">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                    </span>
                    Tocando agora
                </span>
                <h3 className="text-2xl md:text-5xl font-bold leading-tight mb-2 text-white tracking-tight truncate max-w-2xl">{book.title}</h3>
                <p className="text-white/80 text-sm md:text-lg font-medium truncate">{book.author}</p>
            </div>
            
            <button className="hidden md:flex h-14 w-14 lg:h-16 lg:w-16 rounded-full bg-primary text-[#0d1117] items-center justify-center shadow-glow hover:scale-110 active:scale-95 transition-all group-hover:shadow-[0_0_30px_rgba(0,242,254,0.6)] z-10">
                <span className="material-symbols-outlined text-4xl fill ml-1">play_arrow</span>
            </button>
        </div>
      </div>
    );
  }

  // --- COMPACT VARIANT ---
  if (variant === 'compact') {
    return (
      <div 
          onClick={onClick}
          className="flex items-center gap-4 p-3 pr-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/10 transition-all cursor-pointer group active:scale-[0.99]"
      >
           <div className="relative h-14 w-14 md:h-16 md:w-16 shrink-0 rounded-xl overflow-hidden shadow-lg">
                <CoverImage className="h-full w-full object-cover" />
                {/* Play Overlay on Hover */}
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="material-symbols-outlined text-white text-2xl fill">play_arrow</span>
                </div>
           </div>
           <div className="flex-1 min-w-0">
              <h3 className="font-bold text-sm md:text-base text-white truncate group-hover:text-primary transition-colors">{book.title}</h3>
              <p className="text-xs md:text-sm text-white/50 truncate font-medium">{book.author}</p>
           </div>
      </div>
    );
  }

  // --- PORTRAIT / DEFAULT VARIANT ---
  return (
    <div 
        className="group cursor-pointer flex flex-col w-full animate-fade-in active:scale-[0.98] transition-transform"
        onClick={onClick}
    >
        <div className="relative aspect-[2/3] w-full rounded-2xl overflow-hidden shadow-lg ring-1 ring-white/5 bg-surface-dark mb-3 transform transition-all duration-300 group-hover:shadow-xl group-hover:shadow-primary/5">
            <CoverImage className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-100" />
            
            {/* Play Overlay */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/20 backdrop-blur-[1px]">
                <div className="h-12 w-12 rounded-full bg-primary text-[#0d1117] flex items-center justify-center shadow-glow transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                     <span className="material-symbols-outlined text-3xl fill ml-1">play_arrow</span>
                </div>
            </div>

            {/* Progress Overlay */}
            {showProgress && book.progress > 0 && (
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-black/50 backdrop-blur-sm">
                <div className="h-full bg-primary" style={{ width: `${book.progress}%` }}></div>
            </div>
            )}

            {/* Status Badge */}
            {showProgress && book.progress === 100 && (
            <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-md rounded-full p-1.5">
                <span className="material-symbols-outlined text-primary text-base font-bold">check</span>
            </div>
            )}
        </div>
        
        <div className="flex-1 min-w-0 px-1">
            <h3 className="font-bold text-sm md:text-base text-white leading-tight truncate mb-1 group-hover:text-primary transition-colors">{book.title}</h3>
            <p className="text-xs md:text-sm text-white/50 truncate font-medium">{book.author}</p>
        </div>
    </div>
  );
};

export default BookCard;