import { createClient } from '@supabase/supabase-js';

// Função para acessar variáveis de ambiente de forma segura no Vite
const getEnv = (key: string) => {
    const env = (import.meta as any).env || {};
    return env[key] || '';
};

// Tenta ler primeiro as variáveis NEXT_PUBLIC_ (conforme solicitado), 
// com fallback para VITE_ (padrão do bundler)
const supabaseUrl = getEnv('NEXT_PUBLIC_SUPABASE_URL') || getEnv('VITE_SUPABASE_URL');
const supabaseAnonKey = getEnv('NEXT_PUBLIC_SUPABASE_ANON_KEY') || getEnv('VITE_SUPABASE_ANON_KEY');

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Helper para verificar se o backend está ativo
export const isBackendActive = () => {
    return supabaseUrl !== '' && supabaseAnonKey !== '';
};