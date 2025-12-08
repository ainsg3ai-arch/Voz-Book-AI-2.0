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
  
  // --- HERO VARIANT ---
  if (variant === 'hero') {
    return (
      <div 
        className="relative w-full aspect-[16/10] md:aspect-[21/9] rounded-3xl overflow-hidden cursor-pointer group shadow-2xl ring-1 ring-white/10 isolate"
        onClick={onClick}
      >
        <div className="absolute inset-0 bg-surface-dark -z-10"></div>
        <CoverImage className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" opacity="opacity-80" />
        
        {/* Gradient Overlay for Text Readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0C1115] via-[#0C1115]/50 to-transparent opacity-90"></div>
        
        <div className="absolute bottom-0 left-0 p-6 md:p-10 w-full flex items-end justify-between gap-4">
            <div className="flex-1 min-w-0">
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-panel text-[10px] md:text-xs font-bold uppercase tracking-widest text-primary mb-3 md:mb-4 backdrop-blur-md border-primary/20">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                    </span>
                    Continuar Ouvindo
                </span>
                <h3 className="text-2xl md:text-4xl lg:text-5xl font-bold leading-tight mb-2 text-white text-shadow-lg truncate">{book.title}</h3>
                <p className="text-white/80 text-sm md:text-lg font-medium truncate">{book.author}</p>
                
                {/* Progress Bar */}
                <div className="mt-6 md:mt-8 h-1.5 w-full max-w-md bg-white/20 rounded-full overflow-hidden backdrop-blur-sm">
                    <div className="h-full w-[35%] bg-primary shadow-[0_0_15px_#3AB8FF]"></div>
                </div>
            </div>
            
            <button className="hidden md:flex h-16 w-16 rounded-full bg-primary text-white items-center justify-center shadow-glow hover:scale-110 active:scale-95 transition-all group-hover:shadow-[0_0_30px_rgba(58,184,255,0.5)]">
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
          className="flex items-center gap-4 p-3 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/10 transition-all cursor-pointer group"
      >
           <div className="relative h-16 w-16 md:h-20 md:w-20 shrink-0 rounded-xl overflow-hidden shadow-lg">
                <CoverImage className="h-full w-full object-cover" />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors"></div>
           </div>
           <div className="flex-1 min-w-0">
              <h3 className="font-bold text-sm md:text-base text-white truncate group-hover:text-primary transition-colors">{book.title}</h3>
              <p className="text-xs md:text-sm text-white/50 truncate">{book.author}</p>
           </div>
           <button className="h-10 w-10 md:h-12 md:w-12 rounded-full border border-white/10 flex items-center justify-center text-white/60 group-hover:bg-primary group-hover:text-white group-hover:border-primary transition-all shadow-sm">
              <span className="material-symbols-outlined text-2xl">play_arrow</span>
           </button>
      </div>
    );
  }

  // --- PORTRAIT / DEFAULT VARIANT ---
  return (
    <div 
        className="group cursor-pointer flex flex-col w-full animate-fade-in"
        onClick={onClick}
    >
        <div className="relative aspect-[2/3] w-full rounded-2xl overflow-hidden shadow-lg ring-1 ring-white/5 bg-surface-dark mb-3 transform transition-all duration-300 group-hover:shadow-2xl group-hover:shadow-primary/10">
            <CoverImage className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-95 group-hover:opacity-100" />
            
            {/* Play Overlay */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40 backdrop-blur-[2px]">
                <div className="h-14 w-14 rounded-full bg-primary text-white flex items-center justify-center shadow-glow transform scale-50 group-hover:scale-100 transition-transform duration-300">
                     <span className="material-symbols-outlined text-3xl fill ml-1">play_arrow</span>
                </div>
            </div>

            {/* Progress Overlay */}
            {showProgress && book.progress > 0 && (
            <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-black/50 backdrop-blur-sm">
                <div className="h-full bg-primary" style={{ width: `${book.progress}%` }}></div>
            </div>
            )}

            {/* Status Badge */}
            {showProgress && book.progress === 100 && (
            <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-md rounded-full p-1.5">
                <span className="material-symbols-outlined text-green-400 text-base font-bold">check</span>
            </div>
            )}
        </div>
        
        <div className="flex-1 min-w-0 px-1">
            <h3 className="font-bold text-sm md:text-base text-white leading-tight truncate mb-1 group-hover:text-primary transition-colors">{book.title}</h3>
            <p className="text-xs md:text-sm text-slate-400 truncate font-medium">{book.author}</p>
        </div>
    </div>
  );
};

export default BookCard;