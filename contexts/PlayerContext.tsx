import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Book } from '../types';
import { BOOKS } from '../constants';

interface PlayerContextType {
  currentBook: Book | null;
  isPlaying: boolean;
  playBook: (book: Book) => void;
  togglePlay: () => void;
  nextTrack: () => void;
  prevTrack: () => void;
}

const PlayerContext = createContext<PlayerContextType | undefined>(undefined);

export const PlayerProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentBook, setCurrentBook] = useState<Book | null>(BOOKS[0]);
  const [isPlaying, setIsPlaying] = useState(false);

  const playBook = (book: Book) => {
    if (currentBook?.id === book.id) {
      togglePlay();
    } else {
      setCurrentBook(book);
      setIsPlaying(true);
    }
  };

  const togglePlay = () => setIsPlaying(!isPlaying);

  const nextTrack = () => {
    // Simples lógica de próximo para demo
    if (currentBook) {
        const currentIndex = BOOKS.findIndex(b => b.id === currentBook.id);
        const nextIndex = (currentIndex + 1) % BOOKS.length;
        setCurrentBook(BOOKS[nextIndex]);
        setIsPlaying(true);
    }
  };

  const prevTrack = () => {
    if (currentBook) {
        const currentIndex = BOOKS.findIndex(b => b.id === currentBook.id);
        const prevIndex = (currentIndex - 1 + BOOKS.length) % BOOKS.length;
        setCurrentBook(BOOKS[prevIndex]);
        setIsPlaying(true);
    }
  };

  return (
    <PlayerContext.Provider value={{ currentBook, isPlaying, playBook, togglePlay, nextTrack, prevTrack }}>
      {children}
    </PlayerContext.Provider>
  );
};

export const usePlayer = () => {
  const context = useContext(PlayerContext);
  if (context === undefined) {
    throw new Error('usePlayer must be used within a PlayerProvider');
  }
  return context;
};