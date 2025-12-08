import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { BOOKS } from '../constants';
import { usePlayer } from '../contexts/PlayerContext';

const Player: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { currentBook, isPlaying, playBook, togglePlay, nextTrack, prevTrack } = usePlayer();
  
  // Local state for UI only
  const [volume, setVolume] = useState(80);
  const [showLyrics, setShowLyrics] = useState(false);
  const [imgError, setImgError] = useState(false);
  
  // Find book from URL or fallback to context
  const displayBook = BOOKS.find(b => b.id === id) || currentBook || BOOKS[0];

  // Sync context if URL changes
  useEffect(() => {
      if (displayBook && currentBook?.id !== displayBook.id) {
          // Optional: Auto-play when entering page
          // playBook(displayBook); 
      }
      setImgError(false); // Reset error state on book change
  }, [id, displayBook]);

  const chapters = [15, 35, 60, 85];
  const bookContent = [
    "A estratégia sem tática é o caminho mais lento para a vitória. Tática sem estratégia é o ruído antes da derrota.",
    "Se você conhece o inimigo e conhece a si mesmo, não precisa temer o resultado de cem batalhas.",
    "Se você se conhece mas não conhece o inimigo, para cada vitória ganha sofrerá também uma derrota.",
    "Se você não conhece nem o inimigo nem a si mesmo, perderá todas as batalhas.",
    "A suprema arte da guerra é derrotar o inimigo sem lutar.",
    "A invencibilidade está na defesa; a possibilidade de vitória, no ataque.",
    "Quem se destaca na defesa esconde-se nas profundezas da terra; quem se destaca no ataque move-se nas alturas do céu."
  ];

  const handlePlayToggle = () => {
      if (currentBook?.id !== displayBook.id) {
          playBook(displayBook);
      } else {
          togglePlay();
      }
  };

  const isCurrentPlaying = isPlaying && currentBook?.id === displayBook.id;

  return (
    <div className="relative flex h-screen w-full flex-col bg-background-dark font-display text-white overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-black/40 z-10"></div>
          {imgError ? (
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-purple-900/20 z-0"></div>
          ) : (
            <div 
                className="absolute inset-0 opacity-40 blur-[100px] scale-150 transition-opacity duration-700"
                style={{ 
                    backgroundImage: `url("${displayBook.cover}")`,
                    backgroundPosition: 'center',
                    backgroundSize: 'cover',
                    opacity: showLyrics ? 0.2 : 0.4
                }}
            ></div>
          )}
      </div>

      {/* Top Bar */}
      <div className="relative z-10 flex items-center justify-between p-6 pt-8">
        <button 
            onClick={() => navigate(-1)}
            className="flex h-12 w-12 shrink-0 cursor-pointer items-center justify-center rounded-full glass-panel hover:bg-white/10 active:scale-95 transition-all"
        >
          <span className="material-symbols-outlined text-2xl">keyboard_arrow_down</span>
        </button>
        
        <div className="flex flex-col items-center">
            <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/60 mb-1">Tocando de</div>
            <div className="text-xs font-bold text-primary">Sua Biblioteca</div>
        </div>

        <button className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-full glass-panel hover:bg-white/10 active:scale-95 transition-all">
          <span className="material-symbols-outlined text-xl">more_vert</span>
        </button>
      </div>

      {/* Main Content Area */}
      <div className="relative z-10 flex-1 flex flex-col px-8">
        
        <div className="flex-1 flex items-center justify-center py-6 overflow-hidden">
            {!showLyrics ? (
                // --- VIEW 1: ALBUM ART & VISUALIZER ---
                <div className={`relative w-full max-w-[340px] aspect-square rounded-3xl shadow-[0_20px_50px_-12px_rgba(0,0,0,0.5)] ring-1 ring-white/10 transition-all duration-700 ease-out animate-[fadeIn_0.5s_ease-out] bg-[#1a232d] ${isCurrentPlaying ? 'scale-100' : 'scale-95'}`}>
                    {imgError ? (
                        <div className="h-full w-full rounded-3xl bg-gradient-to-br from-gray-800 to-black flex items-center justify-center">
                             <span className="material-symbols-outlined text-white/10 text-8xl">album</span>
                        </div>
                    ) : (
                        <img 
                            src={displayBook.cover} 
                            className="h-full w-full rounded-3xl object-cover" 
                            alt="Cover" 
                            onError={() => setImgError(true)}
                        />
                    )}
                    
                    {/* Visualizer Overlay */}
                    {isCurrentPlaying && (
                        <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/90 via-black/40 to-transparent rounded-b-3xl flex items-end justify-center gap-1.5 pb-6 px-8">
                            {[...Array(16)].map((_, i) => (
                                <div 
                                    key={i} 
                                    className="w-1.5 bg-primary/90 rounded-full animate-equalizer" 
                                    style={{ 
                                        animationDuration: `${0.8 + Math.random() * 0.6}s`,
                                        animationDelay: `${Math.random() * -0.5}s`,
                                        height: `${20 + Math.random() * 40}%`
                                    }}
                                ></div>
                            ))}
                        </div>
                    )}
                </div>
            ) : (
                // --- VIEW 2: LYRICS / READING MODE ---
                <div className="h-full w-full max-w-lg overflow-y-auto no-scrollbar mask-gradient animate-[fadeIn_0.5s_ease-out]">
                    <div className="space-y-6 py-4">
                        {bookContent.map((paragraph, index) => (
                            <p 
                                key={index} 
                                className={`text-xl md:text-2xl font-medium leading-relaxed transition-all duration-500 cursor-pointer ${
                                    index === 1 // Simulate active paragraph
                                    ? 'text-white scale-100 opacity-100' 
                                    : 'text-white/40 hover:text-white/60 scale-[0.98]'
                                }`}
                            >
                                {paragraph}
                            </p>
                        ))}
                        <div className="h-20"></div> {/* Spacer */}
                    </div>
                </div>
            )}
        </div>

        {/* Info Area */}
        <div className={`flex items-end justify-between mb-8 transition-opacity duration-300 ${showLyrics ? 'opacity-0 h-0 overflow-hidden mb-0' : 'opacity-100'}`}>
            <div className="flex-1 min-w-0 mr-6">
                <h1 className="text-2xl md:text-3xl font-bold leading-tight mb-2 truncate text-white text-shadow-sm">{displayBook.title}</h1>
                <p className="text-primary text-base md:text-lg font-medium truncate">{displayBook.author}</p>
            </div>
            <button className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full glass-panel text-white/50 hover:text-red-500 hover:bg-white/10 transition-colors">
                <span className="material-symbols-outlined text-2xl fill-current">favorite</span>
            </button>
        </div>

        {/* Scrubber */}
        <div className="mb-8 group relative select-none">
            <div className="relative h-2 w-full rounded-full bg-white/10 cursor-pointer">
                <div className="absolute inset-0 rounded-full bg-white/10"></div>
                {chapters.map((pos) => (
                    <div key={pos} className="absolute top-0 bottom-0 w-[2px] bg-black/50 z-10" style={{ left: `${pos}%` }} />
                ))}
                <div className="absolute h-full w-[35%] rounded-full bg-gradient-premium shadow-glow-sm group-hover:brightness-110"></div>
                <div className="absolute left-[35%] top-1/2 -translate-y-1/2 h-5 w-5 rounded-full bg-white shadow-glow opacity-0 group-hover:opacity-100 transition-opacity ring-4 ring-primary/30 z-20"></div>
            </div>
            <div className="flex justify-between mt-3 text-xs font-bold text-white/40 font-mono tracking-wide">
                <span>12:45</span>
                <span>-{displayBook.duration}</span>
            </div>
        </div>

        {/* Main Controls */}
        <div className="flex items-center justify-between mb-8">
            <button className="text-white/40 hover:text-white transition-colors p-2">
                <span className="material-symbols-outlined text-2xl">shuffle</span>
            </button>
            <button onClick={prevTrack} className="text-white hover:text-primary transition-colors hover:scale-110 active:scale-95">
                <span className="material-symbols-outlined text-4xl font-light">skip_previous</span>
            </button>
            <button 
                onClick={handlePlayToggle}
                className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-premium text-white shadow-glow hover:scale-105 active:scale-95 transition-all"
            >
                <span className="material-symbols-outlined text-5xl fill">{isCurrentPlaying ? 'pause' : 'play_arrow'}</span>
            </button>
            <button onClick={nextTrack} className="text-white hover:text-primary transition-colors hover:scale-110 active:scale-95">
                <span className="material-symbols-outlined text-4xl font-light">skip_next</span>
            </button>
            <button className="text-white/40 hover:text-white transition-colors p-2">
                <span className="material-symbols-outlined text-2xl">bedtime</span>
            </button>
        </div>

        {/* Bottom Tools */}
        <div className="flex items-center justify-between px-2 pb-8">
             <button className="flex items-center gap-2 text-xs font-bold text-primary bg-primary/10 px-3 py-1.5 rounded-lg border border-primary/20 hover:bg-primary/20 transition-colors">
                 <span className="material-symbols-outlined text-sm">speed</span>
                 1.0x
             </button>

             <div className={`flex items-center gap-3 w-1/2 ${showLyrics ? 'hidden md:flex' : 'flex'}`}>
                 <span className="material-symbols-outlined text-xs text-white/40">volume_down</span>
                 <input 
                    type="range" 
                    min="0" max="100" 
                    value={volume} 
                    onChange={(e) => setVolume(Number(e.target.value))}
                    className="flex-1"
                 />
                 <span className="material-symbols-outlined text-xs text-white/40">volume_up</span>
             </div>

             <button 
                onClick={() => setShowLyrics(!showLyrics)}
                className={`flex items-center gap-2 text-xs font-bold transition-colors px-3 py-1.5 rounded-lg border ${
                    showLyrics 
                    ? 'text-white bg-white/20 border-white/30' 
                    : 'text-white/60 hover:text-white border-transparent hover:bg-white/10'
                }`}
            >
                 <span className="material-symbols-outlined text-lg">
                    {showLyrics ? 'image' : 'description'}
                 </span>
                 {showLyrics ? 'Capa' : 'Texto'}
             </button>
        </div>
      </div>
      
      <style>{`
        .mask-gradient {
            mask-image: linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%);
            -webkit-mask-image: linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%);
        }
      `}</style>
    </div>
  );
};

export default Player;