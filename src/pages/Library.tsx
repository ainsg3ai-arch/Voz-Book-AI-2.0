import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BOOKS } from '../constants';
import BookCard from '../components/BookCard';

const Library: React.FC = () => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState('Tudo');
  const [searchFocused, setSearchFocused] = useState(false);

  return (
    <div className="relative flex flex-col w-full pb-8">
      
      {/* Header Area */}
      <header className="sticky top-0 z-20 bg-[#0C1115]/90 backdrop-blur-xl pt-6 pb-2 border-b border-white/5">
        <div className="px-6 md:px-8 mb-4 flex justify-between items-end">
             <h1 className="text-3xl font-bold tracking-tight text-white">Biblioteca</h1>
             <div className="flex gap-3">
                 <button className="h-10 w-10 rounded-full glass-panel flex items-center justify-center hover:bg-white/10 transition-colors">
                    <span className="material-symbols-outlined text-xl">sort</span>
                 </button>
                 <button className="h-10 w-10 rounded-full glass-panel flex items-center justify-center hover:bg-white/10 transition-colors">
                    <span className="material-symbols-outlined text-xl">grid_view</span>
                 </button>
             </div>
        </div>
        
        {/* Search Bar */}
        <div className="px-6 md:px-8 mb-5">
            <div className={`relative transition-all duration-300 ${searchFocused ? 'scale-[1.01]' : ''}`}>
                 <span className={`material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 transition-colors ${searchFocused ? 'text-primary' : 'text-slate-500'}`}>search</span>
                 <input 
                    type="text" 
                    placeholder="Buscar livro, autor ou série..."
                    onFocus={() => setSearchFocused(true)}
                    onBlur={() => setSearchFocused(false)}
                    className="w-full h-12 rounded-2xl border border-white/5 bg-white/5 py-3 pl-12 pr-4 text-white placeholder-slate-500 focus:ring-1 focus:ring-primary focus:border-primary/50 focus:bg-white/10 transition-all outline-none"
                 />
            </div>
        </div>

        {/* Filters */}
        <div className="flex gap-2 overflow-x-auto no-scrollbar px-6 md:px-8 pb-3">
            {['Tudo', 'Em andamento', 'Não ouvidos', 'Concluídos', 'Favoritos'].map(f => (
                <button 
                    key={f}
                    onClick={() => setFilter(f)}
                    className={`whitespace-nowrap px-5 py-2 rounded-full text-xs font-bold transition-all border ${
                        filter === f 
                        ? 'bg-primary text-white border-primary shadow-glow-sm' 
                        : 'bg-transparent text-slate-400 border-white/10 hover:border-white/30 hover:text-white'
                    }`}
                >
                    {f}
                </button>
            ))}
        </div>
      </header>

      <main className="flex-grow px-6 md:px-8 pt-6">
         {/* Stats Row */}
         <div className="flex items-center justify-between mb-6 text-xs font-bold uppercase tracking-wider text-slate-500">
             <span>{BOOKS.length} Títulos</span>
             <span>Recentes</span>
         </div>

         {/* Kindle Style Grid */}
         <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-4 gap-y-8">
             {BOOKS.map((book) => (
                 <BookCard 
                    key={book.id} 
                    book={book} 
                    showProgress 
                    onClick={() => navigate(`/player/${book.id}`)}
                 />
             ))}
             
             {/* Upload Placeholder Card */}
             <div 
                onClick={() => navigate('/upload')}
                className="group cursor-pointer flex flex-col"
             >
                <div className="relative aspect-[2/3] w-full rounded-2xl overflow-hidden shadow-lg border-2 border-dashed border-white/10 bg-white/5 flex flex-col items-center justify-center gap-2 hover:bg-white/10 hover:border-primary/50 transition-all">
                    <div className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <span className="material-symbols-outlined text-white/50 group-hover:text-primary">add</span>
                    </div>
                    <span className="text-xs font-bold text-white/50">Adicionar</span>
                </div>
             </div>
         </div>
      </main>
    </div>
  );
};

export default Library;