import React from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../components/Logo';

const Welcome: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="relative flex h-[100dvh] w-full flex-col bg-[#0C1115] font-display overflow-hidden selection:bg-primary selection:text-white">
      
      {/* Background Animated Gradients (Aurora Effect) */}
      <div className="absolute top-[-20%] left-[-20%] w-[80%] h-[60%] bg-blue-600/10 blur-[150px] rounded-full animate-pulse-slow pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[80%] h-[60%] bg-purple-600/10 blur-[150px] rounded-full animate-pulse-slow pointer-events-none" style={{ animationDelay: '1s' }}></div>

      <main className="relative z-10 flex flex-1 flex-col items-center justify-center px-6 w-full max-w-md mx-auto">
        
        {/* Animated Logo Construction */}
        <div className="relative mb-12 group cursor-default">
            {/* Glow behind */}
            <div className="absolute inset-0 bg-primary/30 blur-3xl rounded-full scale-110 group-hover:scale-125 transition-transform duration-700 opacity-60"></div>
            
            {/* Main Logo Container */}
            <div className="relative flex h-36 w-36 items-center justify-center rounded-[2.5rem] bg-gradient-to-br from-[#151e26] to-[#0a0e12] border border-white/10 shadow-2xl ring-1 ring-white/5 group-hover:-translate-y-2 transition-transform duration-500">
                <Logo className="h-20 w-20" />
            </div>
        </div>

        {/* Typography */}
        <div className="text-center space-y-5 animate-[slideUp_0.5s_ease-out]">
            <h1 className="text-5xl font-bold tracking-tight text-white leading-tight">
                VozBook <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-400">AI</span>
            </h1>
            <p className="text-lg text-slate-400 leading-relaxed max-w-xs mx-auto">
                Transforme qualquer texto em uma experiência de áudio imersiva com vozes neurais ultra-realistas.
            </p>
        </div>

        {/* Feature Pills */}
        <div className="mt-10 flex flex-wrap justify-center gap-3 opacity-80 animate-[fadeIn_1s_ease-out]">
            <span className="px-4 py-1.5 rounded-full border border-white/10 text-[11px] font-bold text-white uppercase tracking-wider bg-white/5 backdrop-blur-md">PDF & ePUB</span>
            <span className="px-4 py-1.5 rounded-full border border-white/10 text-[11px] font-bold text-white uppercase tracking-wider bg-white/5 backdrop-blur-md">Neural TTS</span>
            <span className="px-4 py-1.5 rounded-full border border-white/10 text-[11px] font-bold text-white uppercase tracking-wider bg-white/5 backdrop-blur-md">Offline</span>
        </div>

      </main>

      {/* Bottom Actions */}
      <div className="relative z-10 w-full p-8 pb-[calc(2rem+env(safe-area-inset-bottom))] animate-[slideUp_0.7s_ease-out] max-w-md mx-auto">
        <button 
            onClick={() => navigate('/home')}
            className="group relative w-full overflow-hidden rounded-2xl bg-white py-5 font-bold text-[#0C1115] shadow-[0_0_30px_rgba(255,255,255,0.15)] hover:shadow-[0_0_50px_rgba(255,255,255,0.3)] transition-all active:scale-[0.98]"
        >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-black/5 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]"></div>
            <span className="relative text-lg tracking-wide">Começar Agora</span>
        </button>

        <p className="mt-8 text-center text-sm font-medium text-slate-500">
            Já tem uma conta? <button onClick={() => navigate('/login')} className="text-white hover:text-primary transition-colors underline-offset-4 font-bold">Fazer Login</button>
        </p>
      </div>

      <style>{`
        @keyframes shimmer {
            100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  );
};

export default Welcome;