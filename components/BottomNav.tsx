import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const BottomNav: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const NavItem = ({ path, icon, label }: { path: string; icon: string; label: string }) => {
      const active = isActive(path);
      return (
        <button 
            onClick={() => navigate(path)}
            className={`flex flex-col items-center justify-center gap-1.5 transition-all duration-300 w-16 ${active ? 'text-primary' : 'text-white/40 hover:text-white/70'}`}
        >
            <div className={`relative flex items-center justify-center transition-all ${active ? '-translate-y-1' : ''}`}>
                <span className={`material-symbols-outlined text-[26px] ${active ? 'shadow-glow-sm' : ''} transition-all`}>
                    {icon}
                </span>
                {active && <div className="absolute -bottom-2 h-1 w-1 rounded-full bg-primary shadow-glow"></div>}
            </div>
            <span className={`text-[10px] font-medium tracking-wide ${active ? 'opacity-100' : 'opacity-0 h-0 overflow-hidden'}`}>{label}</span>
        </button>
      )
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 h-[72px] md:hidden">
        {/* Gradient Fade for content behind */}
        <div className="absolute bottom-0 w-full h-32 bg-gradient-to-t from-[#0C1115] to-transparent pointer-events-none"></div>
        
        <div className="absolute inset-0 glass-panel border-b-0 rounded-t-3xl flex justify-around items-center px-2">
            <NavItem path="/home" icon="home" label="Início" />
            <NavItem path="/library" icon="auto_stories" label="Livros" />
            
            <div className="relative -top-6 group">
                 <div className="absolute inset-0 rounded-full bg-primary blur-md opacity-40 group-hover:opacity-60 transition-opacity"></div>
                <button 
                    onClick={() => navigate('/upload')}
                    className="relative flex h-14 w-14 items-center justify-center rounded-full bg-gradient-premium text-white shadow-glow hover:scale-105 transition-transform"
                >
                    <span className="material-symbols-outlined text-3xl">add</span>
                </button>
            </div>

            <NavItem path="/home" icon="search" label="Buscar" /> {/* Search placeholder */}
            <NavItem path="/settings" icon="settings" label="Ajustes" />
        </div>
    </div>
  );
};

export default BottomNav;
