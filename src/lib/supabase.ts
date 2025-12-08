import { createClient } from '@supabase/supabase-js';

// Usamos ImportMeta para tipar corretamente (TS) e evitar erros de build
const env = (import.meta as any).env || {};

// Adicionamos valores de fallback para evitar que a aplicação quebre (White Screen) 
// se as chaves não estiverem configuradas no .env.local
const supabaseUrl = env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = env.VITE_SUPABASE_ANON_KEY || '';

// Se as chaves estiverem vazias, o cliente Supabase ainda é criado, mas falhará em chamadas de rede.
// A função isBackendActive() deve ser usada para verificar isso antes de tentar operações.
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Helper para verificar se o backend está realmente ativo e configurado
export const isBackendActive = (): boolean => {
    return !!supabaseUrl && !!supabaseAnonKey && supabaseUrl !== '' && supabaseAnonKey !== '';
};