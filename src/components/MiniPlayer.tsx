import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Book } from '../types';
import { usePlayer } from '../contexts/PlayerContext';

interface MiniPlayerProps {
  currentBook: Book | null;
}

const MiniPlayer: React.FC<MiniPlayerProps> = ({ currentBook }) => {
  const navigate = useNavigate();
  const { isPlaying, togglePlay, nextTrack, prevTrack } = usePlayer();
  const [imgError, setImgError] = useState(false);

  if (!currentBook) return null;

  return (
    <div 
      className="fixed bottom-[80px] md:bottom-6 left-4 right-4 z-30 md:left-[300px]"
      onClick={() => navigate(`/player/${currentBook.id}`)}
    >
      <div className="flex h-[72px] items-center gap-4 rounded-xl px-3 pr-5 shadow-card cursor-pointer bg-[#161b22] hover:bg-[#1c2128] transition-all group overflow-hidden relative border border-white/10 backdrop-blur-md">
        {/* Progress Bar Background */}
        <div className="absolute bottom-0 left-0 h-[2px] w-full bg-white/5">
            <div className={`h-full bg-primary shadow-[0_0_10px_#00f2fe] transition-all duration-1000 ${isPlaying ? 'w-full animate-[loading_30s_linear]' : 'w-[35%]'}`}></div>
        </div>

        {/* Rotating Art */}
        <div className="h-12 w-12 shrink-0 rounded-lg overflow-hidden shadow-lg border border-white/5 group-hover:scale-105 transition-transform bg-[#0d1117]">
          {imgError ? (
            <div className="h-full w-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                 <span className="material-symbols-outlined text-white/50 text-sm">music_note</span>
            </div>
          ) : (
             <img
                className={`h-full w-full object-cover opacity-90`}
                src={currentBook.cover}
                alt="Cover"
                onError={() => setImgError(true)}
            />
          )}
        </div>
        
        <div className="flex-1 overflow-hidden flex flex-col justify-center">
          <p className="truncate text-sm font-bold text-white leading-tight">{currentBook.title}</p>
          <p className="truncate text-xs text-primary/80 font-medium">{currentBook.author}</p>
        </div>

        <div className="flex items-center gap-2 md:gap-4">
             <button 
                className="hidden md:block text-white/60 hover:text-white transition-colors p-2"
                onClick={(e) => { e.stopPropagation(); prevTrack(); }}
            >
                <span className="material-symbols-outlined text-2xl">skip_previous</span>
            </button>
            <button 
                className="flex h-10 w-10 items-center justify-center rounded-full text-white hover:scale-105 transition-all"
                onClick={(e) => {
                    e.stopPropagation();
                    togglePlay();
                }}
            >
                <span className="material-symbols-outlined text-4xl fill">{isPlaying ? 'pause' : 'play_arrow'}</span>
            </button>
             <button 
                className="text-white/60 hover:text-white transition-colors p-2"
                onClick={(e) => { e.stopPropagation(); nextTrack(); }}
            >
                <span className="material-symbols-outlined text-2xl">skip_next</span>
            </button>
        </div>
      </div>
    </div>
  );
};

export default MiniPlayer;