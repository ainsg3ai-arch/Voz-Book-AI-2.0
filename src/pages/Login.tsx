import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase, isBackendActive } from '../lib/supabase';

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
    <div className="flex min-h-[100dvh] w-full flex-col bg-background-dark px-6 py-12 font-display text-white">
      <div className="flex-1 flex flex-col justify-center">
        <h1 className="text-3xl font-bold mb-2">Bem-vindo de volta</h1>
        <p className="text-slate-400 mb-10">Faça login para acessar sua biblioteca.</p>

        {error && (
            <div className="mb-6 rounded-xl bg-red-500/10 border border-red-500/20 p-4 flex items-center gap-3">
                <span className="material-symbols-outlined text-red-500">error</span>
                <p className="text-sm text-red-400 font-medium">{error}</p>
            </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300">Email</label>
                <input 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="seu@email.com"
                    required
                    className="w-full rounded-xl border border-slate-700 bg-slate-800/50 p-4 text-white placeholder-slate-500 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                />
            </div>
            <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300">Senha</label>
                <input 
                    type="password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    className="w-full rounded-xl border border-slate-700 bg-slate-800/50 p-4 text-white placeholder-slate-500 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                />
            </div>
            <div className="flex justify-end">
                <button type="button" className="text-sm text-primary font-medium hover:text-primary/80 transition-colors">Esqueceu a senha?</button>
            </div>

            <button 
                type="submit"
                disabled={loading}
                className="mt-8 w-full rounded-xl bg-gradient-premium py-4 font-bold text-white shadow-lg shadow-primary/25 hover:brightness-110 active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
                {loading ? (
                    <>
                        <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                        <span>Entrando...</span>
                    </>
                ) : (
                    'Entrar'
                )}
            </button>
        </form>

        <div className="relative my-8 text-center">
            <div className="absolute top-1/2 w-full border-t border-slate-800"></div>
            <span className="relative bg-background-dark px-2 text-xs text-slate-500 uppercase tracking-widest">Ou continue com</span>
        </div>

        <div className="grid grid-cols-2 gap-4">
            <button className="flex items-center justify-center gap-2 rounded-xl border border-slate-700 bg-slate-800/50 py-3 hover:bg-slate-800 transition-colors">
                <span className="material-symbols-outlined">apple</span>
                <span className="font-medium">Apple</span>
            </button>
            <button className="flex items-center justify-center gap-2 rounded-xl border border-slate-700 bg-slate-800/50 py-3 hover:bg-slate-800 transition-colors">
                 {/* Google G icon simulation */}
                <div className="flex h-5 w-5 items-center justify-center rounded-full bg-white text-black font-bold text-xs">G</div>
                <span className="font-medium">Google</span>
            </button>
        </div>
      </div>

      <div className="mt-8 text-center text-sm text-slate-400">
        Não tem uma conta? <button className="font-bold text-white hover:underline decoration-primary">Cadastre-se</button>
      </div>
    </div>
  );
};

export default Login;