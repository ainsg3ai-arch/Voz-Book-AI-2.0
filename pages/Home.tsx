import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BOOKS, RECENTLY_ADDED } from '../constants';
import BookCard from '../components/BookCard';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const currentBook = BOOKS[0]; 

  return (
    <div className="relative w-full pb-8">
        {/* Ambient Background Glow */}
        <div className="fixed top-[-20%] left-[-20%] w-[60%] h-[60%] bg-primary/10 blur-[120px] rounded-full pointer-events-none"></div>
        <div className="fixed bottom-[-20%] right-[-20%] w-[60%] h-[60%] bg-purple-600/10 blur-[120px] rounded-full pointer-events-none"></div>

      {/* Header - Mobile Only (Desktop has sidebar) */}
      <header className="sticky top-0 z-20 flex md:hidden items-center justify-between p-6 bg-[#0C1115]/80 backdrop-blur-md">
        <div className="flex items-center gap-3">
             <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-premium shadow-glow-sm">
                 <span className="material-symbols-outlined text-white">graphic_eq</span>
             </div>
             <h1 className="text-xl font-bold tracking-tight">VozBook <span className="text-primary font-light">AI</span></h1>
        </div>
        <button 
          onClick={() => navigate('/settings')} 
          className="h-10 w-10 rounded-full glass-panel flex items-center justify-center hover:bg-white/10 transition-colors"
        >
             <span className="material-symbols-outlined text-white/80">manage_accounts</span>
        </button>
      </header>
      
      {/* Desktop Header */}
      <header className="hidden md:flex sticky top-0 z-20 items-center justify-between px-8 py-6 bg-[#0C1115]/80 backdrop-blur-md">
         <h2 className="text-2xl font-bold">Boa tarde</h2>
         <div className="flex items-center gap-4">
            <button className="flex items-center gap-2 px-4 py-2 rounded-full glass-panel hover:bg-white/10 transition-colors text-xs font-bold">
                <span className="material-symbols-outlined text-sm">premium_quality</span>
                Premium
            </button>
            <div className="h-10 w-10 rounded-full bg-gradient-to-br from-primary to-purple-500 p-0.5">
                <img src="https://ui-avatars.com/api/?name=User&background=0D8ABC&color=fff" className="rounded-full h-full w-full" alt="Profile" />
            </div>
         </div>
      </header>

      <main className="relative z-10 flex flex-col gap-8 pt-2 md:px-8">
        
        {/* Continue Listening (Hero) */}
        <section className="px-6 md:px-0">
             <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold tracking-wide">Continuar ouvindo</h2>
             </div>
             <BookCard 
                book={currentBook} 
                variant="hero" 
                onClick={() => navigate(`/player/${currentBook.id}`)} 
            />
        </section>

        {/* Recently Added (Horizontal Scroll) */}
        <section>
            <div className="px-6 md:px-0 flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold tracking-wide">Adicionados recentemente</h2>
                <button className="text-xs font-bold text-primary hover:text-white transition-colors">Ver todos</button>
            </div>
            
            <div className="flex gap-4 overflow-x-auto px-6 md:px-0 pb-4 no-scrollbar">
                {RECENTLY_ADDED.map((book) => (
                    <div key={book.id} className="w-[140px] shrink-0">
                        <BookCard 
                            book={book} 
                            onClick={() => navigate(`/player/${book.id}`)}
                        />
                    </div>
                ))}
            </div>
        </section>

        {/* Your Library (Horizontal Scroll) */}
        <section>
            <div className="px-6 md:px-0 flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold tracking-wide">Sua Biblioteca</h2>
            </div>
            
            <div className="flex gap-4 overflow-x-auto px-6 md:px-0 pb-4 no-scrollbar">
                {BOOKS.slice(1).map((book) => (
                    <div key={book.id} className="w-[140px] shrink-0">
                        <BookCard 
                            book={book} 
                            onClick={() => navigate(`/player/${book.id}`)}
                        />
                    </div>
                ))}
            </div>
        </section>

        {/* Featured / Categories Rows (Spotify Style) */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 px-6 md:px-0">
            {['Ficção', 'Negócios', 'Autoajuda', 'História', 'Ciência', 'Tecnologia'].map(category => (
                <div key={category} className="flex items-center gap-4 p-3 rounded-xl bg-white/5 hover:bg-white/10 cursor-pointer transition-colors group">
                    <div className="h-16 w-16 rounded-lg bg-gradient-to-br from-primary/20 to-purple-500/20 flex items-center justify-center">
                        <span className="material-symbols-outlined text-white/50 group-hover:text-white transition-colors">category</span>
                    </div>
                    <span className="font-bold text-sm">{category}</span>
                </div>
            ))}
        </section>

      </main>

      {/* Floating Action Button for Quick Convert (Mobile Only - Desktop has sidebar) */}
      <div className="md:hidden fixed bottom-24 right-6 z-30">
        <button 
            onClick={() => navigate('/upload')}
            className="flex items-center gap-2 pl-4 pr-5 py-4 rounded-full bg-surface-dark border border-white/10 shadow-glass text-white hover:bg-white/5 transition-all group"
        >
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-premium shadow-glow-sm group-hover:scale-110 transition-transform">
                 <span className="material-symbols-outlined text-lg">add</span>
            </div>
            <span className="font-bold text-sm">Converter</span>
        </button>
      </div>
    </div>
  );
};

export default Home;
