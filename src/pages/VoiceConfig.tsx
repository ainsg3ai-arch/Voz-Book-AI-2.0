import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Emotion } from '../types';

const VoiceConfig: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { filePath, fileName } = location.state || {};

  const [voiceType, setVoiceType] = useState('Masculina');
  const [emotion, setEmotion] = useState<Emotion>('Neutro');
  
  // State for sliders
  const [speed, setSpeed] = useState(50); // 0-100 map to 0.5x - 2.0x
  const [pitch, setPitch] = useState(50);

  const handleGenerate = () => {
    // Mapeia a seleção de UI para nomes de vozes do Gemini
    let voiceName = 'Fenrir'; // Default Male
    if (voiceType === 'Feminina') voiceName = 'Kore';
    if (voiceType === 'Neutra') voiceName = 'Puck';

    navigate('/conversion', { 
        state: { 
            voiceName, 
            speed: 0.5 + (speed / 100) * 1.5, // Map 0-100 to 0.5-2.0
            emotion,
            filePath,
            fileName
        } 
    });
  };

  return (
    <div className="relative flex min-h-[100dvh] w-full flex-col bg-background-dark font-display text-white">
       {/* Ambient Background */}
       <div className="absolute top-0 left-0 w-full h-[300px] bg-gradient-to-b from-primary/10 to-transparent pointer-events-none"></div>

      <header className="sticky top-0 z-10 flex h-16 shrink-0 items-center justify-between bg-background-dark/80 backdrop-blur-md px-4 border-b border-white/5">
        <button onClick={() => navigate(-1)} className="flex h-10 w-10 items-center justify-center rounded-full glass-panel text-white hover:bg-white/10 transition-colors">
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <h1 className="text-lg font-bold text-white tracking-wide">Configuração da IA</h1>
        <div className="w-10"></div>
      </header>

      <main className="flex-1 overflow-y-auto px-6 pb-44 pt-6">
        
        {/* Voice Gender */}
        <section className="mb-10">
          <h2 className="text-xs font-bold uppercase tracking-widest text-white/40 mb-4 pl-1">Voz</h2>
          <div className="grid grid-cols-3 gap-4">
            {['Masculina', 'Feminina', 'Neutra'].map((type) => (
              <button
                key={type}
                onClick={() => setVoiceType(type)}
                className={`relative flex flex-col items-center justify-center gap-3 rounded-2xl py-5 border transition-all overflow-hidden group ${
                  voiceType === type 
                    ? 'border-primary bg-primary/20 text-white shadow-glow-sm' 
                    : 'border-white/5 bg-white/5 text-white/50 hover:bg-white/10 hover:border-white/10'
                }`}
              >
                {voiceType === type && <div className="absolute inset-0 bg-primary/10 blur-xl"></div>}
                <span className={`material-symbols-outlined text-3xl z-10 ${voiceType === type ? 'text-primary' : ''}`}>
                    {type === 'Masculina' ? 'face' : type === 'Feminina' ? 'face_3' : 'robot_2'}
                </span>
                <span className="text-xs font-bold z-10">{type}</span>
              </button>
            ))}
          </div>
        </section>

        {/* Emotion Selector */}
        <section className="mb-10">
          <h2 className="text-xs font-bold uppercase tracking-widest text-white/40 mb-4 pl-1">Entonação</h2>
          <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2">
             {(['Neutro', 'Alegre', 'Calmo', 'Sério'] as Emotion[]).map((emo) => (
                 <button 
                    key={emo}
                    onClick={() => setEmotion(emo)}
                    className={`shrink-0 rounded-full px-6 py-2.5 text-sm font-bold transition-all border ${
                        emotion === emo 
                        ? 'bg-secondary text-white border-secondary shadow-[0_0_15px_rgba(124,58,237,0.4)]' 
                        : 'bg-transparent text-white/60 border-white/10 hover:bg-white/5 hover:text-white'
                    }`}
                 >
                    {emo}
                 </button>
             ))}
          </div>
        </section>

        {/* Sliders */}
        <section className="space-y-6">
            <Slider label="Velocidade" value={speed} setValue={setSpeed} displayValue={`${(0.5 + (speed / 100) * 1.5).toFixed(1)}x`} icon="speed" />
            <Slider label="Tom" value={pitch} setValue={setPitch} displayValue="Médio" icon="graphic_eq" />
        </section>

      </main>

      {/* Footer Actions */}
      <div className="fixed bottom-0 left-0 right-0 glass-panel border-t border-white/10 p-6 pb-[calc(2rem+env(safe-area-inset-bottom))] backdrop-blur-xl z-20 rounded-t-3xl">
         <div className="flex gap-4">
             <button className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-white/5 border border-white/10 text-primary hover:bg-white/10 transition-colors">
                <span className="material-symbols-outlined fill text-3xl">play_arrow</span>
             </button>
             <button 
                onClick={handleGenerate}
                className="flex-1 rounded-2xl bg-gradient-premium font-bold text-white shadow-glow text-lg hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
                Gerar Audiobook
            </button>
         </div>
      </div>
    </div>
  );
};

// Slider Component
const Slider = ({ label, value, setValue, displayValue, icon }: any) => (
  <div className="glass-panel p-5 rounded-2xl border border-white/5">
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center gap-3 text-white">
         <div className="h-8 w-8 rounded-full bg-white/5 flex items-center justify-center">
            <span className="material-symbols-outlined text-white/60 text-lg">{icon}</span>
         </div>
         <span className="text-sm font-bold">{label}</span>
      </div>
      <span className="text-xs font-bold text-primary bg-primary/10 border border-primary/20 px-2.5 py-1 rounded-lg">{displayValue}</span>
    </div>
    <input 
      type="range" 
      min="0" 
      max="100" 
      value={value} 
      onChange={(e) => setValue(Number(e.target.value))}
      className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-primary"
    />
  </div>
);

export default VoiceConfig;