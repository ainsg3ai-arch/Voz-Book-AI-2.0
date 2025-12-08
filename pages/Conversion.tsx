import React, { useEffect, useState, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { GoogleGenAI, Modality } from "@google/genai";
import { supabase, isBackendActive } from '../lib/supabase';

// --- Wav Helper Functions ---
// O modelo TTS retorna PCM bruto. Precisamos encapsular em um container WAV para ser um arquivo de áudio válido.
const writeString = (view: DataView, offset: number, string: string) => {
  for (let i = 0; i < string.length; i++) {
    view.setUint8(offset + i, string.charCodeAt(i));
  }
};

const floatTo16BitPCM = (output: DataView, offset: number, input: Float32Array) => {
  for (let i = 0; i < input.length; i++, offset += 2) {
    const s = Math.max(-1, Math.min(1, input[i]));
    output.setInt16(offset, s < 0 ? s * 0x8000 : s * 0x7FFF, true);
  }
};

const createWavBlob = (samples: Float32Array, sampleRate: number = 24000) => {
  const buffer = new ArrayBuffer(44 + samples.length * 2);
  const view = new DataView(buffer);

  // RIFF identifier
  writeString(view, 0, 'RIFF');
  // RIFF chunk length
  view.setUint32(4, 36 + samples.length * 2, true);
  // RIFF type
  writeString(view, 8, 'WAVE');
  // format chunk identifier
  writeString(view, 12, 'fmt ');
  // format chunk length
  view.setUint32(16, 16, true);
  // sample format (raw)
  view.setUint16(20, 1, true);
  // channel count
  view.setUint16(22, 1, true);
  // sample rate
  view.setUint32(24, sampleRate, true);
  // byte rate (sampleRate * blockAlign)
  view.setUint32(28, sampleRate * 2, true);
  // block align (channel count * bytes per sample)
  view.setUint16(32, 2, true);
  // bits per sample
  view.setUint16(34, 16, true);
  // data chunk identifier
  writeString(view, 36, 'data');
  // data chunk length
  view.setUint32(40, samples.length * 2, true);

  floatTo16BitPCM(view, 44, samples);

  return new Blob([view], { type: 'audio/wav' });
};

// Decodifica base64 para Float32Array (PCM)
const decodeBase64ToFloat32 = (base64: string): Float32Array => {
  const binaryString = atob(base64);
  const len = binaryString.length;
  // Assumindo que o modelo envia PCM 16-bit Little Endian, precisamos converter para Float32 para processar ou salvar
  // Nota: O modelo Gemini TTS retorna PCM raw. O exemplo da doc usa Int16Array para decodificar.
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  const int16 = new Int16Array(bytes.buffer);
  const float32 = new Float32Array(int16.length);
  for (let i = 0; i < int16.length; i++) {
    float32[i] = int16[i] / 32768.0;
  }
  return float32;
};
// --- End Helper Functions ---

const Conversion: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState('Iniciando...');
  const processingRef = useRef(false);

  // Recupera configurações passadas pela tela anterior
  const { voiceName = 'Fenrir', speed = 1, emotion = 'Neutro', filePath, fileName } = location.state || {};

  useEffect(() => {
    if (processingRef.current) return;
    processingRef.current = true;

    const generateAudiobook = async () => {
        try {
            // 1. Configuração do Texto (Simulado para este exemplo, mas poderia vir do PDF lido)
            // Em uma app real, usaríamos o `filePath` para baixar o PDF e extrair texto.
            const textToRead = "A estratégia sem tática é o caminho mais lento para a vitória. Tática sem estratégia é o ruído antes da derrota. Se você conhece o inimigo e conhece a si mesmo, não precisa temer o resultado de cem batalhas.";
            
            setStatus(`Lendo arquivo: ${fileName || 'Documento'}...`);
            setProgress(10);

            // 2. Chamar Gemini API
            if (!process.env.API_KEY) {
                throw new Error("API_KEY não configurada no ambiente.");
            }

            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
            
            // Simular progresso enquanto a API processa
            const progressInterval = setInterval(() => {
                setProgress(p => Math.min(p + 1, 80));
            }, 100);

            setStatus('Gerando áudio neural (Gemini)...');
            
            const response = await ai.models.generateContent({
                model: "gemini-2.5-flash-preview-tts",
                contents: {
                    parts: [{ text: textToRead }]
                },
                config: {
                    responseModalities: [Modality.AUDIO],
                    speechConfig: {
                        voiceConfig: {
                            prebuiltVoiceConfig: { voiceName: voiceName },
                        },
                    },
                },
            });

            clearInterval(progressInterval);
            setProgress(85);
            setStatus('Processando áudio...');

            // 3. Processar Resposta
            const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
            if (!base64Audio) throw new Error("Nenhum áudio retornado pelo modelo.");

            // Converter Base64 -> PCM -> WAV Blob
            const pcmData = decodeBase64ToFloat32(base64Audio);
            const wavBlob = createWavBlob(pcmData, 24000); // 24kHz é o padrão do modelo

            setStatus('Salvando na nuvem...');
            
            // 4. Upload para Supabase (Se configurado)
            if (isBackendActive()) {
                const audioFilename = `audiobook-${Date.now()}.wav`;
                
                // Upload Storage
                const { data: storageData, error: uploadError } = await supabase.storage
                    .from('audios') // Certifique-se de criar este bucket no painel do Supabase
                    .upload(audioFilename, wavBlob, { contentType: 'audio/wav' });

                if (uploadError) throw uploadError;

                // Insert Metadata
                // Se houver um filePath original, poderíamos linkar. Aqui salvamos na tabela audios.
                const { error: dbError } = await supabase.from('audios').insert({
                    filename: audioFilename,
                    original_file: fileName || 'unknown',
                    path: storageData.path,
                    voice: voiceName,
                    emotion: emotion,
                    duration: pcmData.length / 24000 // duration in seconds
                });

                if (dbError) console.warn("Erro ao salvar metadados:", dbError);
            } else {
                console.warn("Backend inativo. Pulando upload (Modo Demo).");
            }

            setProgress(100);
            setStatus('Concluído!');

            // 5. Redirecionar
            setTimeout(() => {
                navigate('/player/1'); // Redireciona para o player
            }, 800);

        } catch (error: any) {
            console.error(error);
            setStatus('Erro: ' + error.message);
            processingRef.current = false;
        }
    };

    generateAudiobook();
  }, [navigate, voiceName, speed, emotion, filePath, fileName]);

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

        <h2 className="text-2xl font-bold leading-tight px-4 pb-2 text-white">{fileName || 'Relatório Anual 2024'}</h2>
        <p className="text-primary font-medium text-sm mb-12 animate-pulse">{status}</p>

        <div className="w-full max-w-sm px-4">
            <div className="flex justify-between mb-3 text-xs font-bold uppercase tracking-wider">
                <span className="text-white/60">Progresso</span>
                <span className="text-white">{Math.round(progress)}%</span>
            </div>
            <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden backdrop-blur-sm">
                <div 
                    className="h-full bg-gradient-premium shadow-[0_0_15px_#3AB8FF] transition-all duration-300 ease-out rounded-full"
                    style={{ width: `${progress}%` }}
                ></div>
            </div>
            <p className="text-white/40 text-xs mt-4 font-medium">Usando voz: {voiceName}</p>
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