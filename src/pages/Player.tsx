import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { BOOKS } from '../constants';
import { usePlayer } from '../contexts/PlayerContext';

const Player: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { currentBook, isPlaying, playBook, togglePlay, nextTrack, prevTrack } = usePlayer();
  
  // UI States
  const [showLyrics, setShowLyrics] = useState(false);
  const [imgError, setImgError] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isLooping, setIsLooping] = useState(false);
  const [downloaded, setDownloaded] = useState(false);
  
  // Find book logic
  const displayBook = BOOKS.find(b => b.id === id) || currentBook || BOOKS[0];
  const isCurrentPlaying = isPlaying && currentBook?.id === displayBook.id;

  // Sync logic (keep existing behavior)
  useEffect(() => {
      setImgError(false);
  }, [id, displayBook]);

  const handlePlayToggle = () => {
      if (currentBook?.id !== displayBook.id) {
          playBook(displayBook);
      } else {
          togglePlay();
      }
  };

  return (
    <div className="relative flex h-[100dvh] w-full flex-col bg-[#0d1117] font-display text-white overflow-hidden">
      
      {/* 1. Dynamic Gradient Background (Spotify Style) */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none transition-all duration-1000 ease-in-out">
          <div className="absolute inset-0 bg-[#0d1117]/80 z-10 backdrop-blur-[60px]"></div>
          {/* Dynamic color blob based on cover */}
          <div 
              className="absolute top-[-10%] left-[-10%] w-[120%] h-[80%] opacity-40 blur-[100px] scale-110"
              style={{ 
                  backgroundImage: `url("${displayBook.cover}")`,
                  backgroundPosition: 'center',
                  backgroundSize: 'cover',
              }}
          ></div>
          <div className="absolute bottom-0 w-full h-1/2 bg-gradient-to-t from-[#0d1117] to-transparent z-10"></div>
      </div>

      {/* 2. Header */}
      <div className="relative z-20 flex items-center justify-between px-6 py-6 md:py-8 shrink-0">
        <button 
            onClick={() => navigate(-1)}
            className="flex h-10 w-10 items-center justify-center rounded-full text-white/80 hover:bg-white/10 active:scale-95 transition-all"
        >
          <span className="material-symbols-outlined text-3xl">keyboard_arrow_down</span>
        </button>
        
        <div className="flex flex-col items-center">
            <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-white/60">Tocando da Playlist</span>
            <span className="text-xs font-bold text-white drop-shadow-md">Sua Biblioteca</span>
        </div>

        <button className="flex h-10 w-10 items-center justify-center rounded-full text-white/80 hover:bg-white/10 active:scale-95 transition-all">
          <span className="material-symbols-outlined text-2xl">more_vert</span>
        </button>
      </div>

      {/* 3. Main Content (Art) */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center min-h-0 px-8 py-2">
            {/* Album Art Container */}
            <div className={`relative w-full aspect-square max-h-[45vh] md:max-h-[50vh] max-w-[45vh] md:max-w-[50vh] rounded-2xl shadow-card transition-transform duration-500 ease-out bg-[#161b22] ${isCurrentPlaying ? 'scale-100' : 'scale-95'}`}>
                {imgError ? (
                    <div className="h-full w-full rounded-2xl bg-gradient-to-br from-gray-800 to-black flex items-center justify-center border border-white/5">
                            <span className="material-symbols-outlined text-white/20 text-6xl">music_note</span>
                    </div>
                ) : (
                    <img 
                        src={displayBook.cover} 
                        className="h-full w-full rounded-2xl object-cover shadow-[0_8px_24px_rgba(0,0,0,0.5)] border border-white/5" 
                        alt="Cover" 
                        onError={() => setImgError(true)}
                    />
                )}
            </div>
      </div>

      {/* 4. Player Controls Area */}
      <div className="relative z-20 flex flex-col px-6 md:px-12 pb-[calc(2rem+env(safe-area-inset-bottom))] gap-6">
            
            {/* Track Info & Actions */}
            <div className="flex items-center justify-between">
                <div className="flex-1 pr-4">
                    <h1 className="text-2xl md:text-3xl font-bold text-white leading-tight truncate mb-1">{displayBook.title}</h1>
                    <p className="text-base md:text-lg text-white/60 font-medium truncate">{displayBook.author}</p>
                </div>
                {/* Heart Button */}
                <button 
                    onClick={() => setIsLiked(!isLiked)}
                    className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full transition-all active:scale-90 ${isLiked ? 'text-primary' : 'text-white/40 hover:text-white'}`}
                >
                    <span className="material-symbols-outlined text-3xl" style={{ fontVariationSettings: isLiked ? "'FILL' 1" : "'FILL' 0" }}>favorite</span>
                </button>
            </div>

            {/* Progress Bar */}
            <div className="group w-full select-none cursor-pointer">
                <div className="relative h-1.5 w-full rounded-full bg-white/10 overflow-visible">
                     {/* Hover Interaction Area */}
                     <div className="absolute -top-2 -bottom-2 w-full"></div>
                     {/* Background Bar */}
                     <div className="absolute inset-0 rounded-full bg-white/10"></div>
                     {/* Active Progress */}
                     <div className="absolute h-full w-[35%] rounded-full bg-white group-hover:bg-primary transition-colors"></div>
                     {/* Handle (Knob) */}
                     <div className="absolute left-[35%] top-1/2 -translate-y-1/2 h-3 w-3 bg-white rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>
                <div className="flex justify-between mt-2 text-[11px] font-bold text-white/40 font-mono tracking-wide">
                    <span>12:45</span>
                    <span>-45:10</span>
                </div>
            </div>

            {/* Main Controls (Spotify Layout) */}
            <div className="flex items-center justify-between -mx-2">
                
                {/* Shuffle / Loop Toggle */}
                <button 
                    onClick={() => setIsLooping(!isLooping)}
                    className={`p-3 rounded-full transition-colors active:scale-90 ${isLooping ? 'text-primary' : 'text-white/40 hover:text-white'}`}
                >
                    <span className="material-symbols-outlined text-2xl">shuffle</span>
                </button>

                {/* Skip Back */}
                <button 
                    onClick={prevTrack} 
                    className="p-3 text-white hover:text-white/80 active:scale-90 transition-transform"
                >
                    <span className="material-symbols-outlined text-4xl fill">skip_previous</span>
                </button>

                {/* Play/Pause (Big Circle) */}
                <button 
                    onClick={handlePlayToggle}
                    className="flex h-16 w-16 md:h-20 md:w-20 items-center justify-center rounded-full bg-white text-black shadow-glow hover:scale-105 active:scale-95 transition-all"
                >
                    <span className="material-symbols-outlined text-4xl md:text-5xl fill" style={{ marginLeft: isCurrentPlaying ? '0' : '4px' }}>
                        {isCurrentPlaying ? 'pause' : 'play_arrow'}
                    </span>
                </button>

                {/* Skip Next */}
                <button 
                    onClick={nextTrack} 
                    className="p-3 text-white hover:text-white/80 active:scale-90 transition-transform"
                >
                    <span className="material-symbols-outlined text-4xl fill">skip_next</span>
                </button>

                {/* Download / Time */}
                <button 
                    onClick={() => setDownloaded(!downloaded)}
                    className={`p-3 rounded-full transition-colors active:scale-90 ${downloaded ? 'text-primary' : 'text-white/40 hover:text-white'}`}
                >
                    <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: downloaded ? "'FILL' 1" : "'FILL' 0" }}>
                        {downloaded ? 'download_done' : 'download'}
                    </span>
                </button>
            </div>

            {/* Bottom Devices / Share Area */}
            <div className="flex items-center justify-between pt-2">
                 <button className="flex items-center gap-2 text-primary/80 hover:text-primary transition-colors">
                     <span className="material-symbols-outlined text-xl">speaker_group</span>
                     <span className="text-xs font-bold uppercase tracking-wider">Dispositivos</span>
                 </button>

                 <button className="flex items-center gap-2 text-white/40 hover:text-white transition-colors">
                     <span className="material-symbols-outlined text-xl">share</span>
                 </button>
            </div>

      </div>
    </div>
  );
};

export default Player;