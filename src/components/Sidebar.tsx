import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Logo from './Logo';

const Sidebar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const NavItem = ({ path, icon, label }: { path: string; icon: string; label: string }) => {
    const active = isActive(path);
    return (
      <button 
        onClick={() => navigate(path)}
        className={`flex w-full items-center gap-4 px-4 py-3 rounded-xl transition-all group ${
          active 
            ? 'bg-primary/10 text-primary font-bold shadow-glow-sm border border-primary/10' 
            : 'text-white/60 hover:text-white hover:bg-white/5 font-medium border border-transparent'
        }`}
      >
        <span className={`material-symbols-outlined text-2xl ${active ? 'fill' : ''}`}>{icon}</span>
        <span className="text-sm tracking-wide">{label}</span>
      </button>
    );
  };

  return (
    <div className="hidden md:flex flex-col w-72 h-full border-r border-white/5 bg-[#0d1117]">
      {/* Logo Area */}
      <div className="p-8 pb-10">
        <div className="cursor-pointer hover:opacity-80 transition-opacity" onClick={() => navigate('/')}>
             <Logo className="h-8 w-8" showText={true} />
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-4 space-y-2">
        <div className="px-4 pb-2">
            <h3 className="text-[10px] font-bold text-white/40 uppercase tracking-[0.2em] mb-4">Menu</h3>
        </div>
        <NavItem path="/home" icon="home" label="Início" />
        <NavItem path="/search" icon="search" label="Buscar" />
        <NavItem path="/library" icon="auto_stories" label="Sua Biblioteca" />
        
        <div className="px-4 pb-2 pt-8">
            <h3 className="text-[10px] font-bold text-white/40 uppercase tracking-[0.2em] mb-4">Coleção</h3>
        </div>
        <NavItem path="/upload" icon="add_circle" label="Adicionar Novo" />
        <NavItem path="/favorites" icon="favorite" label="Favoritos" />
        <NavItem path="/settings" icon="settings" label="Ajustes" />
      </nav>

      {/* User / Pro Badge */}
      <div className="p-6 border-t border-white/5">
        <div className="rounded-2xl bg-gradient-to-br from-surface-dark to-black border border-white/5 p-4 shadow-lg group cursor-pointer hover:border-primary/30 transition-colors">
            <div className="flex items-center gap-3 mb-3">
                 <div className="h-8 w-8 rounded-full bg-gradient-premium flex items-center justify-center">
                    <span className="material-symbols-outlined text-sm text-black font-bold">diamond</span>
                 </div>
                 <div>
                    <p className="text-xs font-bold text-white">SONARA Pro</p>
                    <p className="text-[10px] text-white/50">Desbloqueie tudo</p>
                 </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;