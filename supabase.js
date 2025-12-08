// Configuração do Supabase via CDN
// Substitua as chaves abaixo pelas suas chaves do projeto Supabase
const SUPABASE_URL = 'https://seu-projeto.supabase.co';
const SUPABASE_ANON_KEY = 'sua-chave-anonima-publica';

// Inicializa o cliente globalmente se a biblioteca estiver carregada
let supabase = null;

if (window.supabase) {
    supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
} else {
    console.error("Supabase CDN não carregado corretamente.");
}

// Funções de Autenticação
async function login(email, password) {
    if(!supabase) return { error: { message: "Supabase não configurado" }};
    return await supabase.auth.signInWithPassword({ email, password });
}

async function logout() {
    if(!supabase) return;
    return await supabase.auth.signOut();
}

async function checkSession() {
    if(!supabase) return null;
    const { data } = await supabase.auth.getSession();
    return data.session;
}

// Expor para o window para uso no script.js
window.appSupabase = {
    client: supabase,
    login,
    logout,
    checkSession
};