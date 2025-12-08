import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { BOOKS } from '../constants';
import { usePlayer } from '../contexts/PlayerContext';

const Player: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { currentBook, isPlaying, playBook, togglePlay, nextTrack, prevTrack } = usePlayer();
  
  // Local state for UI
  const [volume, setVolume] = useState(80);
  const [showLyrics, setShowLyrics] = useState(false);
  const [imgError, setImgError] = useState(false);
  const [visualProgress, setVisualProgress] = useState(0); // Para animação da barra
  const [isLiked, setIsLiked] = useState(false);
  
  // Find book from URL or fallback to context
  const displayBook = BOOKS.find(b => b.id === id) || currentBook || BOOKS[0];
  const isCurrentPlaying = isPlaying && currentBook?.id === displayBook.id;

  // Sync context if URL changes
  useEffect(() => {
      setImgError(false);
  }, [id, displayBook]);

  // Simulação de progresso visual (apenas estético, já que não há audio engine real ainda)
  useEffect(() => {
    let interval: any;
    if (isCurrentPlaying) {
        interval = setInterval(() => {
            setVisualProgress((prev) => (prev >= 100 ? 0 : prev + 0.1));
        }, 1000);
    }
    return () => clearInterval(interval);
  }, [isCurrentPlaying]);

  const bookContent = [
    "Capítulo 1: O Início",
    "A estratégia sem tática é o caminho mais lento para a vitória.",
    "Tática sem estratégia é o ruído antes da derrota.",
    "Se você conhece o inimigo e conhece a si mesmo, não precisa temer o resultado de cem batalhas.",
    "Se você se conhece mas não conhece o inimigo, para cada vitória ganha sofrerá também uma derrota.",
    "Se você não conhece nem o inimigo nem a si mesmo, perderá todas as batalhas.",
    "A invencibilidade está na defesa; a possibilidade de vitória, no ataque."
  ];

  const handlePlayToggle = () => {
      if (currentBook?.id !== displayBook.id) {
          playBook(displayBook);
          setVisualProgress(0);
      } else {
          togglePlay();
      }
  };

  return (
    <div className="relative flex h-[100dvh] w-full flex-col bg-[#0d1117] font-display text-white overflow-hidden">
      
      {/* 1. Dynamic Gradient Background (Spotify Style) */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none transition-all duration-1000 ease-in-out">
          <div className="absolute inset-0 bg-[#0d1117]/60 z-10 backdrop-blur-[80px]"></div>
          {/* Dynamic color blob based on cover */}
          <div 
              className="absolute top-[-10%] left-[-10%] w-[120%] h-[120%] opacity-50 blur-[120px] scale-110 transition-transform duration-[10s] ease-in-out animate-pulse-slow"
              style={{ 
                  backgroundImage: `url("${displayBook.cover}")`,
                  backgroundPosition: 'center',
                  backgroundSize: 'cover',
                  opacity: showLyrics ? 0.15 : 0.35
              }}
          ></div>
          <div className="absolute bottom-0 w-full h-2/3 bg-gradient-to-t from-[#0d1117] via-[#0d1117]/80 to-transparent z-10"></div>
      </div>

      {/* 2. Header */}
      <div className="relative z-20 flex items-center justify-between px-6 py-4 md:py-6 shrink-0 mt-[env(safe-area-inset-top)]">
        <button 
            onClick={() => navigate(-1)}
            className="flex h-10 w-10 items-center justify-center rounded-full text-white/80 hover:bg-white/10 active:scale-95 transition-all"
        >
          <span className="material-symbols-outlined text-3xl">keyboard_arrow_down</span>
        </button>
        
        <div className="flex flex-col items-center opacity-0 animate-[fadeIn_0.5s_ease-out_forwards]">
            <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-white/60 mb-0.5">Tocando da Playlist</span>
            <span className="text-xs font-bold text-white drop-shadow-md">Sua Biblioteca</span>
        </div>

        <button className="flex h-10 w-10 items-center justify-center rounded-full text-white/80 hover:bg-white/10 active:scale-95 transition-all">
          <span className="material-symbols-outlined text-2xl">more_vert</span>
        </button>
      </div>

      {/* 3. Main Content (Art or Lyrics) */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center min-h-0 px-8 py-2">
            {!showLyrics ? (
                /* Album Art Container */
                <div className={`relative w-full aspect-square max-h-[42vh] md:max-h-[50vh] max-w-[42vh] md:max-w-[50vh] rounded-xl md:rounded-2xl shadow-[0_25px_50px_-12px_rgba(0,0,0,0.6)] ring-1 ring-white/10 transition-transform duration-700 cubic-bezier(0.2, 0.8, 0.2, 1) bg-[#161b22] ${isCurrentPlaying ? 'scale-100' : 'scale-95 opacity-90'}`}>
                    {imgError ? (
                        <div className="h-full w-full rounded-xl md:rounded-2xl bg-gradient-to-br from-gray-800 to-black flex items-center justify-center border border-white/5">
                                <span className="material-symbols-outlined text-white/20 text-6xl">music_note</span>
                        </div>
                    ) : (
                        <img 
                            src={displayBook.cover} 
                            className="h-full w-full rounded-xl md:rounded-2xl object-cover" 
                            alt="Cover" 
                            onError={() => setImgError(true)}
                        />
                    )}
                </div>
            ) : (
                /* Lyrics View */
                <div className="w-full h-full max-h-[60vh] overflow-y-auto no-scrollbar mask-gradient animate-[fadeIn_0.4s_ease-out] px-2">
                    <div className="space-y-8 py-8">
                         {bookContent.map((line, i) => (
                             <p key={i} className={`text-2xl md:text-3xl font-bold leading-relaxed transition-all duration-300 cursor-pointer hover:text-white ${i === 1 ? 'text-white scale-100' : 'text-white/30 hover:text-white/60 origin-left scale-95'}`}>
                                 {line}
                             </p>
                         ))}
                         <div className="h-20"></div>
                    </div>
                </div>
            )}
      </div>

      {/* 4. Player Controls Area */}
      <div className="relative z-20 flex flex-col px-6 md:px-12 pb-[calc(2.5rem+env(safe-area-inset-bottom))] gap-6 md:gap-8">
            
            {/* Track Info & Actions */}
            <div className={`flex items-center justify-between transition-all duration-500 ${showLyrics ? 'opacity-0 h-0 overflow-hidden' : 'opacity-100'}`}>
                <div className="flex-1 pr-4 min-w-0">
                    <h1 className="text-2xl md:text-3xl font-bold text-white leading-tight truncate mb-1">{displayBook.title}</h1>
                    <p className="text-base md:text-lg text-white/60 font-medium truncate">{displayBook.author}</p>
                </div>
                {/* Heart Button */}
                <button 
                    onClick={() => setIsLiked(!isLiked)}
                    className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full transition-all active:scale-90 hover:bg-white/5 ${isLiked ? 'text-primary' : 'text-white/40 hover:text-white'}`}
                >
                    <span className="material-symbols-outlined text-3xl" style={{ fontVariationSettings: isLiked ? "'FILL' 1" : "'FILL' 0" }}>favorite</span>
                </button>
            </div>

            {/* Progress Bar */}
            <div className="group w-full select-none cursor-pointer pt-2">
                <div className="relative h-1 w-full rounded-full bg-white/10 overflow-visible touch-none">
                     {/* Hover Interaction Area */}
                     <div className="absolute -top-3 -bottom-3 w-full"></div>
                     {/* Background Bar */}
                     <div className="absolute inset-0 rounded-full bg-white/10 group-hover:bg-white/20 transition-colors"></div>
                     {/* Active Progress */}
                     <div 
                        className="absolute h-full rounded-full bg-white group-hover:bg-primary transition-colors"
                        style={{ width: `${isCurrentPlaying ? visualProgress : (displayBook.progress || 0)}%` }}
                     ></div>
                     {/* Handle (Knob) */}
                     <div 
                        className="absolute top-1/2 -translate-y-1/2 h-3 w-3 bg-white rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
                        style={{ left: `${isCurrentPlaying ? visualProgress : (displayBook.progress || 0)}%` }}
                     ></div>
                </div>
                <div className="flex justify-between mt-2 text-[11px] font-medium text-white/40 font-mono tracking-wide">
                    <span>{Math.floor(visualProgress * 0.6)}:00</span>
                    <span>-{displayBook.duration}</span>
                </div>
            </div>

            {/* Main Controls (Spotify Layout) */}
            <div className="flex items-center justify-between -mx-2">
                
                <button className="p-3 text-white/40 hover:text-white transition-colors active:scale-95">
                    <span className="material-symbols-outlined text-2xl">shuffle</span>
                </button>

                <div className="flex items-center gap-4 md:gap-8">
                    <button 
                        onClick={prevTrack} 
                        className="p-2 text-white hover:text-white/80 active:scale-90 transition-transform"
                    >
                        <span className="material-symbols-outlined text-4xl md:text-5xl fill">skip_previous</span>
                    </button>

                    {/* Play/Pause (Big Circle) */}
                    <button 
                        onClick={handlePlayToggle}
                        className="flex h-16 w-16 md:h-20 md:w-20 items-center justify-center rounded-full bg-white text-black shadow-glow hover:scale-105 active:scale-95 transition-all"
                    >
                        <span className="material-symbols-outlined text-4xl md:text-5xl fill ml-1">
                            {isCurrentPlaying ? 'pause' : 'play_arrow'}
                        </span>
                    </button>

                    <button 
                        onClick={nextTrack} 
                        className="p-2 text-white hover:text-white/80 active:scale-90 transition-transform"
                    >
                        <span className="material-symbols-outlined text-4xl md:text-5xl fill">skip_next</span>
                    </button>
                </div>

                <button className="p-3 text-white/40 hover:text-white transition-colors active:scale-95">
                    <span className="material-symbols-outlined text-2xl">repeat</span>
                </button>
            </div>

            {/* Bottom Devices / Share / Lyrics Area */}
            <div className="flex items-center justify-between pt-1">
                 <button className="flex items-center gap-2 text-primary/80 hover:text-primary transition-colors group">
                     <span className="material-symbols-outlined text-xl group-hover:scale-110 transition-transform">speaker_group</span>
                     <span className="text-xs font-bold uppercase tracking-wider">Dispositivos</span>
                 </button>
                 
                 <div className="flex items-center gap-4">
                    <button className="text-white/40 hover:text-white transition-colors">
                        <span className="material-symbols-outlined text-xl">share</span>
                    </button>
                    {/* Toggle Lyrics Button */}
                    <button 
                        onClick={() => setShowLyrics(!showLyrics)}
                        className={`flex items-center justify-center h-8 w-8 rounded-full transition-all ${showLyrics ? 'bg-white text-black' : 'text-white/40 hover:text-white hover:bg-white/10'}`}
                    >
                        <span className="material-symbols-outlined text-lg">lyrics</span>
                    </button>
                 </div>
            </div>

      </div>
    </div>
  );
};

export default Player;