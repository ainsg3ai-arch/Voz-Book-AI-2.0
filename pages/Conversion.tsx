import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Conversion: React.FC = () => {
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Simulate conversion progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => navigate('/player/1'), 500); // Go to player for the dummy book
          return 100;
        }
        return prev + 1;
      });
    }, 50);

    return () => clearInterval(interval);
  }, [navigate]);

  return (
    <div className="relative flex h-screen w-full flex-col bg-background-dark font-display text-white overflow-hidden">
       {/* Background Effects */}
       <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
           <div className="w-[300px] h-[300px] bg-primary/20 blur-[150px] rounded-full animate-pulse-slow"></div>
       </div>

      <header className="flex items-center justify-between p-6 bg-transparent shrink-0 z-10">
        <div className="size-12"></div>
        <div className="size-12"></div>
      </header>

      <main className="flex-grow flex flex-col justify-center items-center px-6 text-center z-10">
        <div className="relative w-full max-w-xs px-4 py-3 mb-10">
            {/* Glow behind cover */}
            <div className="absolute inset-0 bg-primary/30 blur-2xl transform scale-90 rounded-full"></div>
            
            <div 
                className="relative w-full bg-center bg-no-repeat bg-cover rounded-2xl aspect-[3/4] shadow-[0_0_40px_rgba(0,0,0,0.6)] border border-white/10 z-10" 
                style={{ 
                    backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBeRHY5uyk1mt6piSWS28GFiXAP4OOC2xzr5Qs5NwWDlWGQNX8jZCloNsYb9473eysxNaH53yAIvlZmdvjzSF5OdN7k43KA7fkLtGu28dCgpjLF4d3bMHXThgMt466qPz_2lvX5dtOeYTG6X7FHLiUW8lHDbYPRG6IoUUk9xU7va6KhDU8Tkohnb3WRtK_0EvuKlk94gHp9tb92JPN8uqCjvYQtV2SizEmuT9x2WCHRUQF4b6Z3v6AY-B3_x3t2CM2gI_zyG7T1")',
                }}
            >
                {/* Scanning effect */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/20 to-transparent h-[20%] w-full animate-[scan_2s_linear_infinite] border-b border-primary/50"></div>
            </div>
        </div>

        <h2 className="text-2xl font-bold leading-tight px-4 pb-2 text-white">Relatório Anual 2024</h2>
        <p className="text-primary font-medium text-sm mb-12 animate-pulse">Sintetizando voz neural...</p>

        <div className="w-full max-w-sm px-4">
            <div className="flex justify-between mb-3 text-xs font-bold uppercase tracking-wider">
                <span className="text-white/60">Progresso</span>
                <span className="text-white">{progress}%</span>
            </div>
            <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden backdrop-blur-sm">
                <div 
                    className="h-full bg-gradient-premium shadow-[0_0_15px_#3AB8FF] transition-all duration-75 ease-linear rounded-full"
                    style={{ width: `${progress}%` }}
                ></div>
            </div>
            <p className="text-white/40 text-xs mt-4 font-medium">Aprox. {Math.max(0, Math.ceil((100 - progress) / 20))} segundos restantes</p>
        </div>

        <div className="flex gap-4 mt-12 w-full max-w-sm px-4">
            <button 
                onClick={() => navigate('/home')}
                className="flex-1 py-3.5 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-colors font-bold text-sm text-white/80"
            >
                Cancelar
            </button>
            <button 
                onClick={() => navigate('/home')}
                className="flex-1 py-3.5 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-colors font-bold text-sm text-white/80"
            >
                Minimizar
            </button>
        </div>
      </main>

      <style>{`
        @keyframes scan {
            0% { top: 0%; opacity: 0; }
            10% { opacity: 1; }
            90% { opacity: 1; }
            100% { top: 100%; opacity: 0; }
        }
      `}</style>
    </div>
  );
};

export default Conversion;
