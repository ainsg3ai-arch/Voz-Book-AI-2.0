import React from 'react';
import { Book } from '../types';

interface BookCardProps {
  book: Book;
  variant?: 'portrait' | 'landscape' | 'compact' | 'hero';
  onClick?: () => void;
  showProgress?: boolean;
}

const BookCard: React.FC<BookCardProps> = ({ book, variant = 'portrait', onClick, showProgress = false }) => {
  
  if (variant === 'hero') {
    return (
      <div 
        className="relative w-full aspect-[4/3] md:aspect-[3/1] rounded-3xl overflow-hidden cursor-pointer group shadow-2xl ring-1 ring-white/10"
        onClick={onClick}
      >
        <img src={book.cover} className="absolute inset-0 w-full h-full object-cover opacity-70 group-hover:scale-105 transition-transform duration-700" alt="Cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0C1115] via-[#0C1115]/40 to-transparent"></div>
        
        <div className="absolute bottom-0 left-0 p-6 w-full">
            <div className="flex items-end justify-between">
                <div className="max-w-[75%]">
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full glass-panel text-[10px] font-bold uppercase tracking-widest text-primary mb-3 border-primary/20 backdrop-blur-md">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
                        Tocando agora
                    </span>
                    <h3 className="text-2xl md:text-3xl font-bold leading-tight mb-1 text-white text-shadow-sm">{book.title}</h3>
                    <p className="text-white/80 text-sm font-medium">{book.author}</p>
                </div>
                <button className="h-14 w-14 rounded-full bg-primary text-white flex items-center justify-center shadow-glow hover:scale-110 active:scale-95 transition-all">
                    <span className="material-symbols-outlined text-3xl fill">play_arrow</span>
                </button>
            </div>
            {/* Progress */}
            <div className="mt-5 h-1.5 w-full bg-white/10 rounded-full overflow-hidden backdrop-blur-sm">
                <div className="h-full w-[35%] bg-primary shadow-[0_0_15px_#3AB8FF]"></div>
            </div>
        </div>
      </div>
    );
  }

  if (variant === 'compact') {
    return (
      <div 
          onClick={onClick}
          className="flex items-center gap-4 p-3 rounded-2xl hover:bg-white/5 transition-colors cursor-pointer group"
      >
           <div className="relative h-16 w-16 shrink-0 rounded-xl overflow-hidden shadow-lg">
                <img src={book.cover} className="h-full w-full object-cover" alt={book.title} />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors"></div>
           </div>
           <div className="flex-1 min-w-0">
              <h3 className="font-bold text-sm text-white truncate group-hover:text-primary transition-colors">{book.title}</h3>
              <p className="text-xs text-white/50 truncate">{book.author}</p>
           </div>
           <button className="h-10 w-10 rounded-full border border-white/10 flex items-center justify-center text-white/60 opacity-0 group-hover:opacity-100 transition-all hover:bg-primary hover:text-white hover:border-primary">
              <span className="material-symbols-outlined text-xl">play_arrow</span>
           </button>
      </div>
    );
  }

  // Default Portrait
  return (
    <div 
        className="group cursor-pointer flex flex-col w-full"
        onClick={onClick}
    >
        <div className="relative aspect-[2/3] w-full rounded-2xl overflow-hidden shadow-lg ring-1 ring-white/5 bg-surface-dark mb-3">
            <img 
            src={book.cover} 
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110 opacity-90 group-hover:opacity-100" 
            alt={book.title} 
            />
            
            {/* Play Overlay */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40 backdrop-blur-[2px]">
                <div className="h-12 w-12 rounded-full bg-primary text-white flex items-center justify-center shadow-glow transform scale-50 group-hover:scale-100 transition-transform duration-300">
                     <span className="material-symbols-outlined text-2xl fill">play_arrow</span>
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
            <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-md rounded-full p-1">
                <span className="material-symbols-outlined text-green-400 text-sm font-bold">check</span>
            </div>
            )}
        </div>
        
        <div className="flex-1 min-w-0">
            <h3 className="font-bold text-sm text-white leading-tight truncate mb-1 group-hover:text-primary transition-colors">{book.title}</h3>
            <p className="text-xs text-slate-500 truncate">{book.author}</p>
        </div>
    </div>
  );
};

export default BookCard;
