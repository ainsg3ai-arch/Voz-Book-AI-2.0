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
          // playBook(displayBook); 
      }
      setImgError(false); 
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
    <div className="relative flex h-[100dvh] w-full flex-col bg-[#0C1115] font-display text-white overflow-hidden">
      
      {/* Dynamic Background Blur */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <div className="absolute inset-0 bg-[#0C1115]/60 z-10 backdrop-blur-3xl"></div>
          {imgError ? (
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-purple-900/20 z-0"></div>
          ) : (
            <div 
                className="absolute inset-0 opacity-30 blur-[120px] scale-125 transition-all duration-1000 ease-in-out"
                style={{ 
                    backgroundImage: `url("${displayBook.cover}")`,
                    backgroundPosition: 'center',
                    backgroundSize: 'cover',
                }}
            ></div>
          )}
      </div>

      {/* Main Container - Centered Max Width */}
      <div className="relative z-10 flex flex-col h-full w-full max-w-md mx-auto md:max-w-2xl lg:max-w-4xl px-6 md:px-12 py-6 justify-between">
        
        {/* Header */}
        <div className="flex items-center justify-between shrink-0">
            <button 
                onClick={() => navigate(-1)}
                className="flex h-12 w-12 items-center justify-center rounded-full glass-panel text-white/80 hover:bg-white/10 active:scale-95 transition-all"
            >
            <span className="material-symbols-outlined text-2xl">keyboard_arrow_down</span>
            </button>
            
            <div className="flex flex-col items-center">
                <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/50 mb-1">Tocando de</div>
                <div className="text-xs font-bold text-primary tracking-wide">Sua Biblioteca</div>
            </div>

            <button className="flex h-12 w-12 items-center justify-center rounded-full glass-panel text-white/80 hover:bg-white/10 active:scale-95 transition-all">
            <span className="material-symbols-outlined text-xl">more_vert</span>
            </button>
        </div>

        {/* Content: Art or Text */}
        <div className="flex-1 flex flex-col items-center justify-center min-h-0 py-6 md:py-10">
            {!showLyrics ? (
                // --- ARTWORK ---
                <div className={`relative w-full aspect-square max-h-[40vh] md:max-h-[50vh] max-w-[40vh] md:max-w-[50vh] rounded-[2rem] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.6)] ring-1 ring-white/10 transition-all duration-700 ease-out bg-[#1a232d] ${isCurrentPlaying ? 'scale-100' : 'scale-[0.92] opacity-90'}`}>
                    {imgError ? (
                        <div className="h-full w-full rounded-[2rem] bg-gradient-to-br from-gray-800 to-black flex items-center justify-center">
                             <span className="material-symbols-outlined text-white/10 text-8xl">album</span>
                        </div>
                    ) : (
                        <img 
                            src={displayBook.cover} 
                            className="h-full w-full rounded-[2rem] object-cover" 
                            alt="Cover" 
                            onError={() => setImgError(true)}
                        />
                    )}
                </div>
            ) : (
                // --- LYRICS ---
                <div className="h-full w-full max-w-xl overflow-y-auto no-scrollbar mask-gradient animate-fade-in px-2">
                    <div className="space-y-8 py-8">
                        {bookContent.map((paragraph, index) => (
                            <p 
                                key={index} 
                                className={`text-xl md:text-3xl font-medium leading-relaxed transition-all duration-500 cursor-pointer ${
                                    index === 1 
                                    ? 'text-white scale-100 opacity-100' 
                                    : 'text-white/30 hover:text-white/60 scale-[0.98]'
                                }`}
                            >
                                {paragraph}
                            </p>
                        ))}
                        <div className="h-32"></div>
                    </div>
                </div>
            )}
        </div>

        {/* Controls Section */}
        <div className="flex flex-col gap-6 md:gap-8 shrink-0 pb-safe-area-bottom">
            
            {/* Title Info */}
            <div className={`flex items-end justify-between transition-opacity duration-300 ${showLyrics ? 'opacity-0 h-0 overflow-hidden' : 'opacity-100'}`}>
                <div className="flex-1 min-w-0 mr-6">
                    <h1 className="text-2xl md:text-4xl font-bold leading-tight mb-1 truncate text-white">{displayBook.title}</h1>
                    <p className="text-primary text-base md:text-lg font-medium truncate opacity-90">{displayBook.author}</p>
                </div>
                <button className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full glass-panel text-white/50 hover:text-red-500 hover:bg-white/10 transition-colors active:scale-95">
                    <span className="material-symbols-outlined text-2xl fill-current">favorite</span>
                </button>
            </div>

            {/* Scrubber */}
            <div className="group relative select-none w-full">
                <div className="relative h-2 w-full rounded-full bg-white/10 cursor-pointer overflow-hidden md:h-2.5">
                    {chapters.map((pos) => (
                        <div key={pos} className="absolute top-0 bottom-0 w-[1px] bg-white/20 z-10" style={{ left: `${pos}%` }} />
                    ))}
                    <div className="absolute h-full w-[35%] rounded-full bg-primary shadow-[0_0_15px_#3AB8FF]"></div>
                </div>
                <div className="flex justify-between mt-2 text-xs font-bold text-white/40 font-mono tracking-wide">
                    <span>12:45</span>
                    <span>-45:10</span>
                </div>
            </div>

            {/* Playback Controls */}
            <div className="flex items-center justify-between px-2 md:px-12">
                <button className="text-white/40 hover:text-white transition-colors p-2 active:scale-95">
                    <span className="material-symbols-outlined text-2xl md:text-3xl">shuffle</span>
                </button>
                <button onClick={prevTrack} className="text-white hover:text-primary transition-colors p-2 active:scale-90">
                    <span className="material-symbols-outlined text-4xl md:text-5xl font-light">skip_previous</span>
                </button>
                <button 
                    onClick={handlePlayToggle}
                    className="flex h-20 w-20 md:h-24 md:w-24 items-center justify-center rounded-full bg-white text-black shadow-glow hover:scale-105 active:scale-95 transition-all"
                >
                    <span className="material-symbols-outlined text-5xl md:text-6xl fill text-primary">{isCurrentPlaying ? 'pause' : 'play_arrow'}</span>
                </button>
                <button onClick={nextTrack} className="text-white hover:text-primary transition-colors p-2 active:scale-90">
                    <span className="material-symbols-outlined text-4xl md:text-5xl font-light">skip_next</span>
                </button>
                <button className="text-white/40 hover:text-white transition-colors p-2 active:scale-95">
                    <span className="material-symbols-outlined text-2xl md:text-3xl">bedtime</span>
                </button>
            </div>

            {/* Bottom Tools */}
            <div className="flex items-center justify-between pt-2">
                 <button className="flex items-center gap-2 text-xs font-bold text-primary bg-primary/10 px-4 py-2 rounded-full border border-primary/20 hover:bg-primary/20 transition-colors">
                     <span className="material-symbols-outlined text-sm">speed</span>
                     1.0x
                 </button>

                 <div className={`flex items-center gap-3 w-1/2 max-w-[200px] ${showLyrics ? 'hidden md:flex' : 'hidden sm:flex'}`}>
                     <span className="material-symbols-outlined text-xs text-white/40">volume_down</span>
                     <input 
                        type="range" 
                        min="0" max="100" 
                        value={volume} 
                        onChange={(e) => setVolume(Number(e.target.value))}
                        className="flex-1 h-1"
                     />
                     <span className="material-symbols-outlined text-xs text-white/40">volume_up</span>
                 </div>

                 <button 
                    onClick={() => setShowLyrics(!showLyrics)}
                    className={`flex items-center gap-2 text-xs font-bold transition-colors px-4 py-2 rounded-full border ${
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

      </div>
    </div>
  );
};

export default Player;