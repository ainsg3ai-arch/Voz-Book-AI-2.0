import { createClient } from '@supabase/supabase-js';

// No Vite, usamos import.meta.env para acessar variáveis de ambiente.
// As variáveis devem começar com VITE_ para serem expostas ao cliente.
// Fix: Cast import.meta to any to resolve TS error 'Property env does not exist on type ImportMeta'
const supabaseUrl = (import.meta as any).env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = (import.meta as any).env.VITE_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Helper para verificar se o backend está ativo
export const isBackendActive = () => {
    return supabaseUrl !== '' && supabaseAnonKey !== '';
};