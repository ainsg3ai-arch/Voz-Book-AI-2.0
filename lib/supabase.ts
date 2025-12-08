import { createClient } from '@supabase/supabase-js';

// No Vite, usamos import.meta.env para acessar variáveis de ambiente.
// Adicionamos valores de fallback para evitar que a aplicação quebre (White Screen) 
// se as chaves não estiverem configuradas.
const supabaseUrl = (import.meta as any).env.VITE_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseAnonKey = (import.meta as any).env.VITE_SUPABASE_ANON_KEY || 'placeholder';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Helper para verificar se o backend está realmente ativo
export const isBackendActive = () => {
    return supabaseUrl !== 'https://placeholder.supabase.co' && supabaseAnonKey !== 'placeholder';
};