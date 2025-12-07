import React from 'react';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen w-full flex-col bg-background-dark px-6 py-12 font-display text-white">
      <div className="flex-1 flex flex-col justify-center">
        <h1 className="text-3xl font-bold mb-2">Bem-vindo de volta</h1>
        <p className="text-slate-400 mb-10">Faça login para acessar sua biblioteca.</p>

        <div className="space-y-4">
            <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300">Email</label>
                <input 
                    type="email" 
                    placeholder="seu@email.com"
                    className="w-full rounded-xl border border-slate-700 bg-slate-800/50 p-4 text-white placeholder-slate-500 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                />
            </div>
            <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300">Senha</label>
                <input 
                    type="password" 
                    placeholder="••••••••"
                    className="w-full rounded-xl border border-slate-700 bg-slate-800/50 p-4 text-white placeholder-slate-500 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                />
            </div>
            <div className="flex justify-end">
                <button className="text-sm text-primary font-medium">Esqueceu a senha?</button>
            </div>
        </div>

        <button 
          onClick={() => navigate('/home')}
          className="mt-8 w-full rounded-xl bg-gradient-primary py-4 font-bold text-white shadow-lg shadow-primary/25 hover:brightness-110 transition-all"
        >
          Entrar
        </button>

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
        Não tem uma conta? <button className="font-bold text-white hover:underline">Cadastre-se</button>
      </div>
    </div>
  );
};

export default Login;
