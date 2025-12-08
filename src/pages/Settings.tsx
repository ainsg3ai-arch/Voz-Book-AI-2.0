import React from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';

const Settings: React.FC = () => {
    const navigate = useNavigate();

    const handleLogout = async () => {
        await supabase.auth.signOut();
        navigate('/login');
    };

    return (
        <div className="relative flex flex-col w-full min-h-screen pb-20">
             <header className="sticky top-0 z-10 flex flex-col bg-[#0d1117]/90 backdrop-blur-xl px-6 md:px-10 pt-10 pb-6 border-b border-white/5">
                <div className="max-w-3xl mx-auto w-full">
                    <h1 className="text-3xl font-bold tracking-tight text-white">Ajustes</h1>
                </div>
            </header>

            <main className="flex-1 px-6 md:px-10 space-y-10 mt-8 max-w-3xl mx-auto w-full">
                {/* General */}
                <section>
                    <h3 className="text-primary text-xs font-bold uppercase tracking-widest px-2 pb-4">Geral</h3>
                    <div className="flex flex-col overflow-hidden rounded-3xl glass-panel border border-white/5 bg-[#161b22]/40">
                        <SettingsItem icon="language" label="Idioma do App" value="Português" />
                        <SettingsItem icon="dark_mode" label="Tema" value="Escuro" />
                        <SettingsItem icon="notifications" label="Notificações" toggle last />
                    </div>
                </section>

                {/* Storage / Data */}
                <section>
                    <h3 className="text-primary text-xs font-bold uppercase tracking-widest px-2 pb-4">Dados</h3>
                    <div className="flex flex-col overflow-hidden rounded-3xl glass-panel border border-white/5 bg-[#161b22]/40">
                        <SettingsItem icon="sd_storage" label="Gerenciar Armazenamento" />
                        <SettingsItem icon="download" label="Exportar Biblioteca" />
                        <SettingsItem icon="upload" label="Importar Biblioteca" last />
                    </div>
                </section>
                
                {/* Account Actions */}
                <section>
                    <h3 className="text-primary text-xs font-bold uppercase tracking-widest px-2 pb-4">Conta</h3>
                     <div className="flex flex-col overflow-hidden rounded-3xl glass-panel border border-white/5 bg-[#161b22]/40">
                        <SettingsItem icon="workspace_premium" label="Assinar Premium" value="Pro" />
                        <SettingsItem icon="info" label="Sobre o SONARA" />
                        
                        {/* Logout Button */}
                        <button 
                            onClick={handleLogout}
                            className="flex items-center gap-5 p-5 min-h-[80px] justify-between group hover:bg-red-500/10 transition-colors w-full cursor-pointer"
                        >
                            <div className="flex items-center gap-4">
                                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white/5 text-white/60 group-hover:text-red-500 group-hover:bg-red-500/20 transition-all">
                                    <span className="material-symbols-outlined text-2xl">logout</span>
                                </div>
                                <p className="text-base font-bold text-left text-white/90 group-hover:text-red-500">Sair da Conta</p>
                            </div>
                        </button>
                     </div>
                </section>

                <div className="text-center py-8">
                    <p className="text-xs font-bold text-white/30 font-mono mb-1">SONARA v1.0.0</p>
                    <p className="text-[10px] text-white/20">Feito com ❤️ por AI Studio</p>
                </div>
            </main>
        </div>
    );
};

const SettingsItem = ({ icon, label, value, last, toggle }: { icon: string; label: string; value?: string; last?: boolean, toggle?: boolean }) => (
    <button className={`flex items-center gap-5 p-5 min-h-[80px] justify-between group hover:bg-white/5 transition-colors w-full cursor-pointer ${!last ? 'border-b border-white/5' : ''}`}>
        <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white/5 text-white/60 group-hover:text-primary group-hover:bg-primary/20 transition-all duration-300">
                <span className="material-symbols-outlined text-2xl">{icon}</span>
            </div>
            <p className="text-base font-bold text-left text-white/90 group-hover:text-white">{label}</p>
        </div>
        
        {toggle ? (
            <div className="relative inline-flex h-8 w-14 items-center rounded-full bg-primary/20 border border-primary/50">
                <span className="translate-x-7 inline-block h-6 w-6 transform rounded-full bg-primary shadow-glow-sm transition"/>
            </div>
        ) : (
            <div className="flex items-center gap-3">
                {value && <span className="text-sm font-bold text-primary bg-primary/10 px-3 py-1 rounded-lg border border-primary/20">{value}</span>}
                <span className="material-symbols-outlined text-white/20 text-xl group-hover:text-white/60 transition-colors">arrow_forward_ios</span>
            </div>
        )}
    </button>
);

export default Settings;