import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BOOKS } from '../constants';
import BookCard from '../components/BookCard';

const Library: React.FC = () => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState('Tudo');
  const [searchFocused, setSearchFocused] = useState(false);

  return (
    <div className="relative flex flex-col w-full min-h-screen">
      
      {/* Header Area */}
      <header className="sticky top-0 z-20 bg-[#0C1115]/90 backdrop-blur-xl pt-10 md:pt-8 pb-4 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
            <div className="mb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
                 <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-white">Biblioteca</h1>
                 <div className="flex gap-3">
                     <button className="h-10 w-10 md:h-12 md:w-12 rounded-full glass-panel flex items-center justify-center hover:bg-white/10 transition-colors">
                        <span className="material-symbols-outlined text-xl">sort</span>
                     </button>
                     <button className="h-10 w-10 md:h-12 md:w-12 rounded-full glass-panel flex items-center justify-center hover:bg-white/10 transition-colors">
                        <span className="material-symbols-outlined text-xl">grid_view</span>
                     </button>
                 </div>
            </div>
            
            {/* Search Bar */}
            <div className="mb-6 max-w-xl">
                <div className={`relative transition-all duration-300 group ${searchFocused ? 'scale-[1.01]' : ''}`}>
                     <span className={`material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 transition-colors z-10 ${searchFocused ? 'text-primary' : 'text-slate-500'}`}>search</span>
                     <input 
                        type="text" 
                        placeholder="Buscar livro, autor ou série..."
                        onFocus={() => setSearchFocused(true)}
                        onBlur={() => setSearchFocused(false)}
                        className="w-full h-12 md:h-14 rounded-2xl border border-white/10 bg-white/5 py-3 pl-12 pr-4 text-white placeholder-slate-500 focus:ring-2 focus:ring-primary/50 focus:border-primary focus:bg-white/10 transition-all outline-none text-base font-medium"
                     />
                </div>
            </div>

            {/* Filters */}
            <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2 mask-gradient-right">
                {['Tudo', 'Em andamento', 'Não ouvidos', 'Concluídos', 'Favoritos'].map(f => (
                    <button 
                        key={f}
                        onClick={() => setFilter(f)}
                        className={`whitespace-nowrap px-5 py-2.5 rounded-full text-xs md:text-sm font-bold transition-all border ${
                            filter === f 
                            ? 'bg-primary text-white border-primary shadow-glow-sm' 
                            : 'bg-white/5 text-slate-400 border-white/5 hover:border-white/20 hover:text-white hover:bg-white/10'
                        }`}
                    >
                        {f}
                    </button>
                ))}
            </div>
        </div>
      </header>

      <main className="flex-grow px-6 md:px-10 pt-8 pb-32 max-w-7xl mx-auto w-full">
         {/* Stats Row */}
         <div className="flex items-center justify-between mb-6 text-xs font-bold uppercase tracking-wider text-slate-500 px-1">
             <span>{BOOKS.length} Títulos</span>
             <span>Recentes</span>
         </div>

         {/* Responsive Grid */}
         <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-4 gap-y-10 md:gap-x-8 md:gap-y-12">
             {/* Upload Placeholder Card */}
             <div 
                onClick={() => navigate('/upload')}
                className="group cursor-pointer flex flex-col h-full"
             >
                <div className="relative aspect-[2/3] w-full rounded-2xl overflow-hidden shadow-sm border-2 border-dashed border-white/10 bg-white/[0.02] flex flex-col items-center justify-center gap-3 hover:bg-white/5 hover:border-primary/50 transition-all mb-3">
                    <div className="h-12 w-12 rounded-full bg-white/5 flex items-center justify-center group-hover:scale-110 group-hover:bg-primary/20 transition-all duration-300">
                        <span className="material-symbols-outlined text-white/40 group-hover:text-primary">add</span>
                    </div>
                    <span className="text-xs font-bold text-white/40 group-hover:text-white/80 transition-colors">Adicionar Novo</span>
                </div>
                <div className="h-10"></div> {/* Spacer to match text height */}
             </div>

             {BOOKS.map((book) => (
                 <BookCard 
                    key={book.id} 
                    book={book} 
                    showProgress 
                    onClick={() => navigate(`/player/${book.id}`)}
                 />
             ))}
         </div>
      </main>
    </div>
  );
};

export default Library;