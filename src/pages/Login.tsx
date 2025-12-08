import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase, isBackendActive } from '../lib/supabase';
import Logo from '../components/Logo';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setLoading(true);
    setError(null);

    try {
        // Se o backend Supabase não estiver configurado (sem chaves), permite acesso demo
        if (!isBackendActive()) {
            console.warn("Modo Demo: Backend Supabase não configurado. Realizando login simulado.");
            setTimeout(() => navigate('/home'), 1000);
            return;
        }

        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) throw error;
        navigate('/home');
    } catch (err: any) {
        console.error("Erro no login:", err);
        setError(err.message || 'Falha ao autenticar. Verifique suas credenciais.');
        setLoading(false);
    }
  };

  return (
    <div className="flex min-h-[100dvh] w-full items-center justify-center bg-[#0C1115] px-6 font-display text-white relative overflow-hidden">
      
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-[50vh] bg-gradient-to-b from-primary/10 to-transparent pointer-events-none"></div>
      <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-purple-600/20 blur-[100px] rounded-full pointer-events-none"></div>

      <div className="w-full max-w-md relative z-10 animate-[fadeIn_0.5s_ease-out]">
        
        <div className="mb-10 text-center">
            <div className="flex justify-center mb-6">
                <div className="h-16 w-16 rounded-2xl bg-gradient-premium shadow-glow flex items-center justify-center">
                    <Logo className="h-8 w-8 text-white" />
                </div>
            </div>
            <h1 className="text-3xl font-bold mb-2 tracking-tight">Bem-vindo de volta</h1>
            <p className="text-slate-400">Faça login para acessar sua biblioteca.</p>
        </div>

        {error && (
            <div className="mb-6 rounded-xl bg-red-500/10 border border-red-500/20 p-4 flex items-center gap-3 animate-pulse">
                <span className="material-symbols-outlined text-red-500">error</span>
                <p className="text-sm text-red-400 font-medium">{error}</p>
            </div>
        )}

        <div className="glass-panel p-8 rounded-3xl bg-[#1a232d]/40 border-white/10">
            <form onSubmit={handleLogin} className="space-y-6">
                <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wide text-slate-400 ml-1">Email</label>
                    <div className="relative group">
                        <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-primary transition-colors">mail</span>
                        <input 
                            type="email" 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="seu@email.com"
                            required
                            className="w-full rounded-xl border border-white/10 bg-black/20 p-4 pl-12 text-white placeholder-slate-600 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                        />
                    </div>
                </div>
                <div className="space-y-2">
                    <div className="flex justify-between items-center ml-1">
                         <label className="text-xs font-bold uppercase tracking-wide text-slate-400">Senha</label>
                         <button type="button" className="text-xs text-primary font-bold hover:text-primary/80 transition-colors">Esqueceu?</button>
                    </div>
                    <div className="relative group">
                        <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-primary transition-colors">lock</span>
                        <input 
                            type="password" 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••"
                            required
                            className="w-full rounded-xl border border-white/10 bg-black/20 p-4 pl-12 text-white placeholder-slate-600 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                        />
                    </div>
                </div>

                <button 
                    type="submit"
                    disabled={loading}
                    className="mt-4 w-full rounded-xl bg-white py-4 font-bold text-black shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:bg-gray-100 hover:shadow-[0_0_30px_rgba(255,255,255,0.2)] active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                    {loading ? (
                        <>
                            <div className="h-5 w-5 animate-spin rounded-full border-2 border-black border-t-transparent"></div>
                            <span>Entrando...</span>
                        </>
                    ) : (
                        'Entrar'
                    )}
                </button>
            </form>

            <div className="relative my-8 text-center">
                <div className="absolute top-1/2 w-full border-t border-white/5"></div>
                <span className="relative bg-[#151b22] px-3 text-[10px] font-bold text-slate-500 uppercase tracking-widest rounded-full">Ou continue com</span>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <button className="flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 py-3 hover:bg-white/10 transition-colors">
                    <span className="material-symbols-outlined text-xl">apple</span>
                    <span className="font-bold text-sm">Apple</span>
                </button>
                <button className="flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 py-3 hover:bg-white/10 transition-colors">
                    <div className="flex h-5 w-5 items-center justify-center rounded-full bg-white text-black font-bold text-xs">G</div>
                    <span className="font-bold text-sm">Google</span>
                </button>
            </div>
        </div>

        <div className="mt-8 text-center text-sm text-slate-500 font-medium">
            Não tem uma conta? <button className="font-bold text-white hover:text-primary transition-colors">Cadastre-se</button>
        </div>
      </div>
    </div>
  );
};

export default Login;