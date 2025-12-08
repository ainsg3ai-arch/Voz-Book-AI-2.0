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
        <div className="relative flex flex-col w-full pb-8">
             <header className="sticky top-0 z-10 flex flex-col bg-background-dark/90 backdrop-blur-xl px-6 md:px-8 pt-8 pb-4 border-b border-white/5">
                <h1 className="text-3xl font-bold tracking-tight">Ajustes</h1>
            </header>

            <main className="flex-1 px-6 md:px-8 space-y-8 mt-6 max-w-4xl">
                {/* General */}
                <section>
                    <h3 className="text-white/40 text-xs font-bold uppercase tracking-widest px-2 pb-4">Geral</h3>
                    <div className="flex flex-col overflow-hidden rounded-3xl glass-panel border border-white/5">
                        <SettingsItem icon="language" label="Idioma do App" value="Português" />
                        <SettingsItem icon="dark_mode" label="Tema" value="Escuro" />
                        <SettingsItem icon="notifications" label="Notificações" toggle last />
                    </div>
                </section>

                {/* Storage / Data */}
                <section>
                    <h3 className="text-white/40 text-xs font-bold uppercase tracking-widest px-2 pb-4">Dados</h3>
                    <div className="flex flex-col overflow-hidden rounded-3xl glass-panel border border-white/5">
                        <SettingsItem icon="sd_storage" label="Gerenciar Armazenamento" />
                        <SettingsItem icon="download" label="Exportar Biblioteca" />
                        <SettingsItem icon="upload" label="Importar Biblioteca" last />
                    </div>
                </section>
                
                {/* Account Actions */}
                <section>
                    <h3 className="text-white/40 text-xs font-bold uppercase tracking-widest px-2 pb-4">Conta</h3>
                     <div className="flex flex-col overflow-hidden rounded-3xl glass-panel border border-white/5">
                        <SettingsItem icon="workspace_premium" label="Assinar Premium" value="Pro" />
                        <SettingsItem icon="info" label="Sobre o VozBook AI" />
                        
                        {/* Logout Button */}
                        <button 
                            onClick={handleLogout}
                            className="flex items-center gap-4 p-5 min-h-[72px] justify-between group hover:bg-red-500/10 transition-colors w-full"
                        >
                            <div className="flex items-center gap-4">
                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/5 text-white/60 group-hover:text-red-500 group-hover:bg-red-500/10 transition-colors">
                                    <span className="material-symbols-outlined text-xl">logout</span>
                                </div>
                                <p className="text-base font-bold text-left text-white/90 group-hover:text-red-500">Sair da Conta</p>
                            </div>
                        </button>
                     </div>
                </section>

                <p className="text-center text-xs text-white/30 pt-4 pb-8 font-mono">
                    VozBook AI v2.1.0 • Build 4829
                </p>
            </main>
        </div>
    );
};

const SettingsItem = ({ icon, label, value, last, toggle }: { icon: string; label: string; value?: string; last?: boolean, toggle?: boolean }) => (
    <button className={`flex items-center gap-4 p-5 min-h-[72px] justify-between group hover:bg-white/5 transition-colors w-full ${!last ? 'border-b border-white/5' : ''}`}>
        <div className="flex items-center gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/5 text-white/60 group-hover:text-primary group-hover:bg-primary/10 transition-colors">
                <span className="material-symbols-outlined text-xl">{icon}</span>
            </div>
            <p className="text-base font-bold text-left text-white/90 group-hover:text-white">{label}</p>
        </div>
        
        {toggle ? (
            <div className="relative inline-flex h-7 w-12 items-center rounded-full bg-primary/20 border border-primary/50">
                <span className="translate-x-6 inline-block h-5 w-5 transform rounded-full bg-primary shadow-glow-sm transition"/>
            </div>
        ) : (
            <div className="flex items-center gap-2">
                {value && <span className="text-sm font-bold text-primary">{value}</span>}
                <span className="material-symbols-outlined text-white/30 text-lg">arrow_forward_ios</span>
            </div>
        )}
    </button>
);

export default Settings;