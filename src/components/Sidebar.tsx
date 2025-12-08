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
            ? 'bg-primary/10 text-primary font-bold shadow-[0_0_15px_rgba(58,184,255,0.1)]' 
            : 'text-white/60 hover:text-white hover:bg-white/5 font-medium'
        }`}
      >
        <span className={`material-symbols-outlined text-2xl ${active ? 'fill' : ''}`}>{icon}</span>
        <span className="text-sm tracking-wide">{label}</span>
      </button>
    );
  };

  return (
    <div className="hidden md:flex flex-col w-64 h-full border-r border-white/5 bg-[#0C1115]">
      {/* Logo */}
      <div className="p-6 pb-8">
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate('/')}>
             <Logo className="h-10 w-10 text-primary shadow-glow-sm" />
             <h1 className="text-xl font-bold tracking-tight text-white">VozBook <span className="text-primary font-light">AI</span></h1>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-4 space-y-2">
        <NavItem path="/home" icon="home" label="Início" />
        <NavItem path="/library" icon="auto_stories" label="Sua Biblioteca" />
        <NavItem path="/search" icon="search" label="Buscar" />
        
        <div className="pt-6 pb-2 px-4">
            <h3 className="text-xs font-bold text-white/40 uppercase tracking-widest">Sua Coleção</h3>
        </div>
        <NavItem path="/upload" icon="add_circle" label="Adicionar Novo" />
        <NavItem path="/favorites" icon="favorite" label="Favoritos" />
        <NavItem path="/settings" icon="settings" label="Ajustes" />
      </nav>

      {/* Install App CTA */}
      <div className="p-4">
        <div className="rounded-2xl bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/5 p-4">
            <p className="text-xs font-bold text-white mb-2">Instalar App</p>
            <p className="text-[10px] text-white/50 mb-3">Tenha a melhor experiência no desktop.</p>
            <button className="w-full py-2 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-bold text-white transition-colors">
                Baixar agora
            </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;