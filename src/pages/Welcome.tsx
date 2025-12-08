import React from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../components/Logo';

const Welcome: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div 
        className="relative flex h-[100dvh] w-full flex-col items-center justify-center bg-[#0d1117] font-display overflow-hidden selection:bg-primary selection:text-[#0d1117]"
        onClick={() => navigate('/home')} // Click anywhere to enter
    >
      
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-gradient-glow pointer-events-none"></div>
      <div className="absolute top-[-20%] left-[-20%] w-[80%] h-[60%] bg-[#00f2fe]/5 blur-[150px] rounded-full animate-pulse-slow pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[80%] h-[60%] bg-[#6a5af9]/10 blur-[150px] rounded-full animate-pulse-slow pointer-events-none" style={{ animationDelay: '2s' }}></div>

      <main className="relative z-10 flex flex-col items-center justify-center animate-[fadeIn_0.8s_ease-out]">
        
        {/* Logo Construction */}
        <div className="relative mb-10 group cursor-pointer">
            <div className="absolute inset-0 bg-gradient-premium blur-[40px] opacity-20 rounded-full scale-150 animate-pulse-slow"></div>
            <Logo className="h-28 w-28 md:h-36 md:w-36 drop-shadow-2xl" />
        </div>

        {/* Brand Name */}
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-[0.05em] text-white mb-2 relative">
            SONARA
            <span className="absolute -top-1 -right-4 h-2 w-2 rounded-full bg-primary animate-ping"></span>
        </h1>
        
        <p className="text-sm md:text-base text-white/40 font-medium tracking-[0.2em] uppercase mt-4">
            The Future of Audio
        </p>

      </main>

      {/* Footer / Powered By */}
      <div className="absolute bottom-10 left-0 right-0 flex flex-col items-center justify-center gap-2 opacity-60">
        <span className="text-[10px] font-bold text-white/30 uppercase tracking-widest">Powered by</span>
        <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/5 backdrop-blur-md">
            <span className="material-symbols-outlined text-sm text-secondary">graphic_eq</span>
            <span className="text-xs font-bold text-white/80">AI Voice Engine</span>
        </div>
      </div>
    </div>
  );
};

export default Welcome;