import React from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../components/Logo';

const Welcome: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="relative flex h-screen w-full flex-col bg-[#0d1117] font-display overflow-hidden selection:bg-primary selection:text-white">
      
      {/* Background Animated Gradients (Aurora Effect) */}
      <div className="absolute top-[-10%] left-[-10%] w-[70%] h-[50%] bg-primary/20 blur-[120px] rounded-full animate-pulse-slow"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[70%] h-[50%] bg-secondary/20 blur-[120px] rounded-full animate-pulse-slow" style={{ animationDelay: '1s' }}></div>

      <main className="relative z-10 flex flex-1 flex-col items-center justify-center px-6">
        
        {/* Animated Logo Construction */}
        <div className="relative mb-10 group cursor-default">
            {/* Glow behind */}
            <div className="absolute inset-0 bg-primary/30 blur-2xl rounded-full scale-110 group-hover:scale-125 transition-transform duration-700 opacity-50"></div>
            
            {/* Main Logo Container */}
            <div className="relative flex h-32 w-32 items-center justify-center rounded-[2rem] bg-gradient-to-br from-[#161b22] to-[#0d1117] border border-white/10 shadow-2xl ring-1 ring-white/5 group-hover:-translate-y-2 transition-transform duration-500">
                <Logo className="h-16 w-16" />
            </div>
        </div>

        {/* Typography */}
        <div className="text-center space-y-4 max-w-sm animate-[slideUp_0.5s_ease-out]">
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white">
                SONARA
            </h1>
            <p className="text-lg text-white/50 leading-relaxed font-medium">
                Transforme qualquer texto em uma experiência de áudio imersiva.
            </p>
        </div>

        {/* Feature Pills */}
        <div className="mt-8 flex gap-3 opacity-60 animate-[fadeIn_1s_ease-out]">
            <span className="px-3 py-1 rounded-full border border-white/10 text-[10px] font-bold text-white uppercase tracking-wider bg-white/5">PDF & ePUB</span>
            <span className="px-3 py-1 rounded-full border border-white/10 text-[10px] font-bold text-white uppercase tracking-wider bg-white/5">Neural AI</span>
        </div>

      </main>

      {/* Bottom Actions */}
      <div className="relative z-10 w-full p-6 pb-10 animate-[slideUp_0.7s_ease-out]">
        <button 
            onClick={() => navigate('/home')}
            className="group relative w-full overflow-hidden rounded-2xl bg-white py-4 font-bold text-[#0d1117] shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(255,255,255,0.2)] transition-all active:scale-[0.98]"
        >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-black/5 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]"></div>
            <span className="relative text-lg">Começar Agora</span>
        </button>

        <p className="mt-6 text-center text-xs font-medium text-white/40">
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