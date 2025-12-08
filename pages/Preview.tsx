import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { supabase } from '../lib/supabase';

const Preview: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const filePath = searchParams.get('path');
  const fileNameParam = searchParams.get('filename');
  
  const [fileUrl, setFileUrl] = useState<string | null>(null);

  useEffect(() => {
    if (filePath) {
        // Exemplo de como gerar URL assinada (privada)
        // Isso permite que o frontend acesse o arquivo se o usuário tiver permissão (RLS)
        const fetchUrl = async () => {
            try {
                // Cria uma URL válida por 60 segundos (ou mais)
                const { data, error } = await supabase.storage
                    .from('pdfs')
                    .createSignedUrl(filePath, 3600); // 1 hora

                if (data?.signedUrl) {
                    setFileUrl(data.signedUrl);
                } else if (error) {
                    console.error('Erro ao gerar Signed URL:', error);
                }
            } catch (err) {
                console.error(err);
            }
        };
        fetchUrl();
    }
  }, [filePath]);

  return (
    <div className="relative flex min-h-screen w-full flex-col bg-background-dark font-display text-white overflow-hidden">
      {/* Search Header */}
      <header className="sticky top-0 z-20 bg-background-dark/80 backdrop-blur-xl px-4 pt-4 pb-4 border-b border-white/5">
        <div className="flex items-center justify-between gap-4">
          <div className="flex-1 relative group">
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-white/40 group-focus-within:text-primary transition-colors">search</span>
            <input
              className="h-12 w-full rounded-2xl border border-white/5 bg-white/5 pl-12 pr-4 text-white placeholder-white/40 focus:bg-white/10 focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all outline-none"
              placeholder="Pesquisar no texto..."
              type="search"
            />
          </div>
          <button 
             className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full glass-panel text-white/80 hover:text-white hover:bg-white/10 transition-colors"
             onClick={() => navigate('/home')} 
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>
      </header>

      <main className="relative z-10 flex-grow px-6 pb-32 pt-6">
        <h1 className="text-white tracking-tight text-2xl font-bold leading-tight pb-2 truncate">
          {fileNameParam || 'Relatorio_Anual.pdf'}
        </h1>
        <p className="text-white/60 text-sm font-medium pb-4">
          Selecione os capítulos para converter
        </p>
        
        {/* Link para download do arquivo original (se disponível) */}
        {fileUrl && (
            <div className="mb-6">
                <a 
                    href={fileUrl} 
                    target="_blank" 
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors text-xs font-bold text-primary"
                >
                    <span className="material-symbols-outlined text-sm">download</span>
                    Baixar/Visualizar PDF Original
                </a>
            </div>
        )}

        {/* Select All */}
        <div className="flex items-center gap-4 border-b border-white/10 py-4 mb-2">
            <label className="flex w-full cursor-pointer items-center gap-4 group">
                <div className="relative flex items-center">
                    <input
                    type="checkbox"
                    className="peer h-6 w-6 cursor-pointer appearance-none rounded-md border-2 border-white/20 transition-all checked:border-primary checked:bg-primary"
                    />
                    <span className="material-symbols-outlined absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-sm text-white opacity-0 peer-checked:opacity-100 pointer-events-none">check</span>
                </div>
                <span className="flex-1 text-base font-bold text-white group-hover:text-primary transition-colors">Selecionar Tudo</span>
            </label>
        </div>

        {/* Chapters */}
        <div className="space-y-2 mt-4">
            {[1, 2, 3, 4].map((i) => (
                <label key={i} className="flex cursor-pointer gap-x-4 p-4 group rounded-2xl border border-transparent hover:bg-white/5 hover:border-white/5 transition-all">
                    <div className="relative flex items-start pt-1">
                        <input
                            defaultChecked={i < 3}
                            type="checkbox"
                            className="peer h-5 w-5 cursor-pointer appearance-none rounded-md border-2 border-white/20 transition-all checked:border-primary checked:bg-primary"
                        />
                         <span className="material-symbols-outlined absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-sm text-white opacity-0 peer-checked:opacity-100 pointer-events-none mt-1">check</span>
                    </div>
                    <div className="flex-1">
                        <div className="flex justify-between items-center mb-1">
                            <p className="text-base font-bold leading-normal text-white group-hover:text-primary transition-colors">Capítulo {i}: {i === 1 ? 'Introdução' : i === 2 ? 'Desenvolvimento' : i === 3 ? 'Análise' : 'Conclusão'}</p>
                            <span className="text-[10px] font-bold bg-white/10 px-2 py-0.5 rounded text-white/50">5 min</span>
                        </div>
                        <p className="text-sm font-medium text-white/50 line-clamp-2">
                           Neste capítulo, exploramos os conceitos fundamentais que servem de base para o projeto.
                        </p>
                    </div>
                </label>
            ))}
        </div>
      </main>

      {/* FAB to Record/Voice Config */}
      <div className="fixed bottom-8 right-6 z-20">
        <button 
          onClick={() => navigate('/voice-config', { state: { filePath, fileName: fileNameParam } })}
          className="group flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-premium shadow-glow hover:scale-110 active:scale-95 transition-all"
        >
          <span className="material-symbols-outlined text-3xl text-white fill group-hover:animate-pulse">mic</span>
        </button>
      </div>
    </div>
  );
};

export default Preview;