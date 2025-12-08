import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { supabase } from '../lib/supabase';

const Upload: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [mode, setMode] = useState<'file' | 'text'>(searchParams.get('mode') === 'text' ? 'text' : 'file');
  const [uploading, setUploading] = useState(false);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files || event.target.files.length === 0) {
      return;
    }

    const file = event.target.files[0];
    setUploading(true);

    try {
        // 1. Verificar Sessão (Opcional, mas recomendado para RLS)
        const { data: { session } } = await supabase.auth.getSession();

        // 2. Upload para o Bucket 'pdfs'
        const fileExt = file.name.split('.').pop();
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
        const filePath = `${fileName}`;

        const { data: storageData, error: uploadError } = await supabase.storage
            .from('pdfs')
            .upload(filePath, file, {
                cacheControl: '3600',
                upsert: false
            });

        if (uploadError) throw uploadError;

        // 3. Salvar metadados na tabela 'files'
        const { error: dbError } = await supabase
            .from('files')
            .insert([
                { 
                    user_id: session?.user?.id || null, // Nulo se não logado/modo demo
                    filename: file.name,
                    path: storageData.path,
                    size: file.size,
                    mime_type: file.type
                }
            ]);

        if (dbError) {
            console.error('Erro ao salvar metadados:', dbError);
        }

        // Sucesso: Redireciona para Preview passando os dados via Query Params
        navigate(`/preview?path=${encodeURIComponent(storageData.path)}&filename=${encodeURIComponent(file.name)}`);

    } catch (error: any) {
        console.error('Erro no upload:', error);
        alert('Falha no upload: ' + (error.message || 'Erro desconhecido'));
    } finally {
        setUploading(false);
    }
  };

  return (
    <div className="relative flex min-h-[100dvh] w-full flex-col bg-background-dark font-display text-white overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-[-20%] right-[-20%] w-[50%] h-[50%] bg-primary/10 blur-[120px] rounded-full pointer-events-none"></div>

      {/* Top Bar */}
      <div className="sticky top-0 z-10 flex items-center bg-background-dark/80 backdrop-blur-md px-4 py-4 border-b border-white/5">
        <button 
            onClick={() => navigate(-1)}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full glass-panel text-white hover:bg-white/10 transition-colors"
        >
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <h1 className="flex-1 text-center font-bold text-lg tracking-wide">Nova Conversão</h1>
        <div className="w-10"></div>
      </div>

      <main className="relative z-10 flex-grow px-6 pt-6 pb-24">
        
        {/* Toggle */}
        <div className="flex p-1 rounded-2xl glass-panel mb-8 border border-white/5">
            <button 
                onClick={() => setMode('file')}
                className={`flex-1 py-3 rounded-xl text-sm font-bold transition-all ${mode === 'file' ? 'bg-primary text-white shadow-glow-sm' : 'text-white/40 hover:text-white'}`}
            >
                Arquivo
            </button>
            <button 
                onClick={() => setMode('text')}
                className={`flex-1 py-3 rounded-xl text-sm font-bold transition-all ${mode === 'text' ? 'bg-primary text-white shadow-glow-sm' : 'text-white/40 hover:text-white'}`}
            >
                Texto
            </button>
        </div>

        {mode === 'file' ? (
             <div className="flex flex-col animate-[fadeIn_0.3s_ease-out]">
                <div className={`relative flex flex-col items-center gap-6 rounded-3xl border-2 border-dashed px-6 py-16 transition-all cursor-pointer group ${uploading ? 'border-primary/50 bg-primary/10 cursor-wait' : 'border-white/10 bg-white/[0.02] hover:bg-white/5 hover:border-primary/50'}`}>
                    
                    {uploading ? (
                         <div className="flex flex-col items-center">
                            <div className="h-12 w-12 rounded-full border-4 border-primary border-t-transparent animate-spin mb-4"></div>
                            <p className="text-lg font-bold text-white">Enviando...</p>
                         </div>
                    ) : (
                        <>
                            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 text-primary shadow-glow-sm group-hover:scale-110 transition-transform">
                                <span className="material-symbols-outlined text-4xl">cloud_upload</span>
                            </div>
                            <div className="text-center">
                                <p className="text-lg font-bold text-white mb-2">Arraste e solte</p>
                                <p className="text-sm text-white/40">PDF, DOCX, EPUB ou TXT</p>
                            </div>
                            <label className="cursor-pointer rounded-full bg-primary px-8 py-3 font-bold text-white shadow-glow hover:brightness-110 active:scale-95 transition-all">
                                Escolher Arquivo
                                <input 
                                    type="file" 
                                    className="hidden" 
                                    onChange={handleFileUpload}
                                    accept=".pdf,.docx,.epub,.txt"
                                    disabled={uploading}
                                />
                            </label>
                        </>
                    )}
                </div>
                
                <div className="mt-8">
                    <h3 className="text-xs font-bold text-white/40 uppercase tracking-widest mb-4 pl-2">Recentes</h3>
                    <div className="space-y-3">
                        <div className="flex items-center gap-4 p-4 rounded-2xl glass-panel hover:bg-white/10 transition-colors cursor-pointer border border-white/5">
                             <div className="h-10 w-10 rounded-lg bg-red-500/20 flex items-center justify-center text-red-400">
                                <span className="material-symbols-outlined">picture_as_pdf</span>
                             </div>
                             <div className="flex-1">
                                <p className="font-bold text-sm text-white">Contrato_Final.pdf</p>
                                <p className="text-xs text-white/40">2.4 MB • Ontem</p>
                             </div>
                             <button className="text-white/40 hover:text-white">
                                <span className="material-symbols-outlined">more_vert</span>
                             </button>
                        </div>
                    </div>
                </div>
             </div>
        ) : (
            <div className="flex flex-col h-full animate-[fadeIn_0.3s_ease-out]">
                <div className="relative flex-grow">
                    <textarea 
                        className="w-full h-80 rounded-3xl border border-white/10 bg-white/5 p-6 text-white placeholder-white/30 focus:border-primary/50 focus:ring-1 focus:ring-primary/50 outline-none resize-none glass-panel"
                        placeholder="Cole seu texto aqui ou comece a escrever..."
                    ></textarea>
                    <button className="absolute bottom-4 right-4 px-4 py-2 rounded-lg bg-white/10 text-white/60 hover:text-white hover:bg-white/20 transition-colors text-xs font-bold backdrop-blur-md">
                        Limpar
                    </button>
                </div>
                <div className="mt-6">
                    <button 
                        onClick={() => navigate('/preview')}
                        className="w-full rounded-2xl bg-gradient-premium py-4 font-bold text-white shadow-glow hover:scale-[1.02] active:scale-[0.98] transition-all"
                    >
                        Continuar
                    </button>
                </div>
            </div>
        )}

      </main>
    </div>
  );
};

export default Upload;