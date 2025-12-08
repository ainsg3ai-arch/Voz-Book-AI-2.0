import React from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../components/Logo';

const Welcome: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="relative flex h-[100dvh] w-full flex-col bg-[#0C1115] font-display overflow-hidden selection:bg-primary selection:text-white">
      
      {/* Background Animated Gradients (Aurora Effect) */}
      <div className="absolute top-[-10%] left-[-10%] w-[70%] h-[50%] bg-blue-600/20 blur-[120px] rounded-full animate-pulse-slow"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[70%] h-[50%] bg-purple-600/20 blur-[120px] rounded-full animate-pulse-slow" style={{ animationDelay: '1s' }}></div>

      <main className="relative z-10 flex flex-1 flex-col items-center justify-center px-6">
        
        {/* Animated Logo Construction */}
        <div className="relative mb-10 group cursor-default">
            {/* Glow behind */}
            <div className="absolute inset-0 bg-primary/30 blur-2xl rounded-full scale-110 group-hover:scale-125 transition-transform duration-700 opacity-50"></div>
            
            {/* Main Logo Container */}
            <div className="relative flex h-32 w-32 items-center justify-center rounded-[2rem] bg-gradient-to-br from-[#151e26] to-[#0a0e12] border border-white/10 shadow-2xl ring-1 ring-white/5 group-hover:-translate-y-2 transition-transform duration-500">
                <Logo className="h-16 w-16" />
            </div>
        </div>

        {/* Typography */}
        <div className="text-center space-y-4 max-w-sm animate-[slideUp_0.5s_ease-out]">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white">
                VozBook <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-400">AI</span>
            </h1>
            <p className="text-lg text-slate-400 leading-relaxed">
                Transforme qualquer texto em uma experiência de áudio imersiva com vozes neurais.
            </p>
        </div>

        {/* Feature Pills */}
        <div className="mt-8 flex gap-3 opacity-60 animate-[fadeIn_1s_ease-out]">
            <span className="px-3 py-1 rounded-full border border-white/10 text-[10px] font-bold text-white uppercase tracking-wider bg-white/5">PDF & ePUB</span>
            <span className="px-3 py-1 rounded-full border border-white/10 text-[10px] font-bold text-white uppercase tracking-wider bg-white/5">Neural TTS</span>
        </div>

      </main>

      {/* Bottom Actions */}
      <div className="relative z-10 w-full p-6 pb-[calc(40px+env(safe-area-inset-bottom))] animate-[slideUp_0.7s_ease-out]">
        <button 
            onClick={() => navigate('/home')}
            className="group relative w-full overflow-hidden rounded-2xl bg-white py-4 font-bold text-[#0C1115] shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(255,255,255,0.2)] transition-all active:scale-[0.98]"
        >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-black/5 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]"></div>
            <span className="relative text-lg">Começar Agora</span>
        </button>

        <p className="mt-6 text-center text-xs font-medium text-slate-500">
            Já tem uma conta? <button onClick={() => navigate('/login')} className="text-white hover:underline decoration-primary underline-offset-4">Fazer Login</button>
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