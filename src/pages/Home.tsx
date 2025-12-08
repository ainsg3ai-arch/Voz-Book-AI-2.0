import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BOOKS, RECENTLY_ADDED } from '../constants';
import BookCard from '../components/BookCard';
import { usePlayer } from '../contexts/PlayerContext';
import Logo from '../components/Logo';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const { playBook } = usePlayer();
  const heroBook = BOOKS[0]; 

  return (
    <div className="relative w-full min-h-screen">
        {/* Ambient Background Glow */}
        <div className="fixed top-[-20%] left-[-20%] w-[60%] h-[60%] bg-primary/5 blur-[120px] rounded-full pointer-events-none z-0"></div>
        <div className="fixed bottom-[-20%] right-[-20%] w-[60%] h-[60%] bg-purple-600/5 blur-[120px] rounded-full pointer-events-none z-0"></div>

      {/* Header - Mobile Only */}
      <header className="sticky top-0 z-30 flex md:hidden items-center justify-between px-6 py-4 bg-[#0C1115]/80 backdrop-blur-xl border-b border-white/5">
        <div className="flex items-center gap-3">
             <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-premium shadow-glow-sm">
                 <Logo className="h-5 w-5 text-white" />
             </div>
             <h1 className="text-lg font-bold tracking-tight text-white">VozBook <span className="text-primary font-light">AI</span></h1>
        </div>
        <button 
          onClick={() => navigate('/settings')} 
          className="h-10 w-10 rounded-full glass-panel flex items-center justify-center hover:bg-white/10 transition-colors"
        >
             <span className="material-symbols-outlined text-white/80">manage_accounts</span>
        </button>
      </header>
      
      {/* Desktop Header */}
      <header className="hidden md:flex sticky top-0 z-30 items-center justify-between px-10 py-6 bg-[#0C1115]/80 backdrop-blur-xl border-b border-white/5">
         <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
            <div>
                 <h2 className="text-2xl font-bold text-white">Boa tarde</h2>
                 <p className="text-sm text-white/50">O que vamos ouvir hoje?</p>
            </div>
             <div className="flex items-center gap-4">
                <button className="flex items-center gap-2 px-4 py-2 rounded-full glass-panel hover:bg-white/10 transition-colors text-xs font-bold text-white/80">
                    <span className="material-symbols-outlined text-sm text-primary">premium_quality</span>
                    Premium
                </button>
                <div className="h-11 w-11 rounded-full bg-gradient-to-br from-primary to-purple-500 p-0.5 cursor-pointer hover:scale-105 transition-transform">
                    <img src="https://ui-avatars.com/api/?name=User&background=0D8ABC&color=fff" className="rounded-full h-full w-full border-2 border-[#0C1115]" alt="Profile" />
                </div>
             </div>
         </div>
      </header>

      <main className="relative z-10 flex flex-col gap-10 pt-6 pb-20 md:px-10 max-w-7xl mx-auto w-full">
        
        {/* Continue Listening (Hero) */}
        <section className="px-6 md:px-0">
             <div className="flex items-center justify-between mb-5">
                <h2 className="text-lg md:text-xl font-bold tracking-wide text-white">Continuar ouvindo</h2>
             </div>
             <BookCard 
                book={heroBook} 
                variant="hero" 
                onClick={() => {
                    playBook(heroBook);
                    navigate(`/player/${heroBook.id}`);
                }} 
            />
        </section>

        {/* Recently Added (Horizontal Scroll) */}
        <section>
            <div className="px-6 md:px-0 flex items-center justify-between mb-5">
                <h2 className="text-lg md:text-xl font-bold tracking-wide text-white">Adicionados recentemente</h2>
                <button className="text-xs font-bold text-primary hover:text-white transition-colors px-3 py-1 rounded-full hover:bg-white/5">Ver todos</button>
            </div>
            
            <div className="flex gap-4 overflow-x-auto px-6 md:px-0 pb-4 no-scrollbar snap-x snap-mandatory">
                {RECENTLY_ADDED.map((book) => (
                    <div key={book.id} className="w-[140px] md:w-[180px] shrink-0 snap-start">
                        <BookCard 
                            book={book} 
                            onClick={() => {
                                playBook(book);
                                navigate(`/player/${book.id}`);
                            }}
                        />
                    </div>
                ))}
            </div>
        </section>

        {/* Your Library (Horizontal Scroll) */}
        <section>
            <div className="px-6 md:px-0 flex items-center justify-between mb-5">
                <h2 className="text-lg md:text-xl font-bold tracking-wide text-white">Sua Biblioteca</h2>
            </div>
            
            <div className="flex gap-4 overflow-x-auto px-6 md:px-0 pb-4 no-scrollbar snap-x snap-mandatory">
                {BOOKS.slice(1).map((book) => (
                    <div key={book.id} className="w-[140px] md:w-[180px] shrink-0 snap-start">
                        <BookCard 
                            book={book} 
                            onClick={() => {
                                playBook(book);
                                navigate(`/player/${book.id}`);
                            }}
                        />
                    </div>
                ))}
            </div>
        </section>

        {/* Categories Grid */}
        <section className="px-6 md:px-0">
            <h2 className="text-lg md:text-xl font-bold tracking-wide text-white mb-5">Explorar Categorias</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {['Ficção', 'Negócios', 'Autoajuda', 'História', 'Ciência', 'Tecnologia'].map(category => (
                    <div key={category} className="flex items-center gap-4 p-4 rounded-2xl glass-panel hover:glass-panel-hover cursor-pointer transition-all group">
                        <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-primary/10 to-purple-500/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                            <span className="material-symbols-outlined text-primary/80 group-hover:text-primary transition-colors">category</span>
                        </div>
                        <span className="font-bold text-sm text-white group-hover:translate-x-1 transition-transform">{category}</span>
                    </div>
                ))}
            </div>
        </section>

      </main>
    </div>
  );
};

export default Home;