import React from 'react';

export const SupportChatWidget: React.FC = () => {
    return (
        <div 
            className="fixed bottom-6 right-6 flex items-end space-x-3 z-50 cursor-pointer group animate-fade-in-up"
            style={{ animationDelay: '0.5s' }}
        >
            <div className="bg-[var(--c-bg-card)] text-white p-3 rounded-xl rounded-br-none shadow-lg max-w-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300 -translate-y-2 group-hover:translate-y-0">
                <p className="text-sm font-medium">Estou aqui se precisar de ajuda, ok?</p>
            </div>
            <div className="w-16 h-16 rounded-full bg-[var(--c-bg-card)] flex items-center justify-center border-4 border-[var(--c-accent-action)] shadow-lg transform group-hover:scale-110 transition-transform duration-300">
                <img
                    src="https://s3.taskdun.com.br/typebot/public/workspaces/cm7t8ijsp0000q0x7yksbteab/typebots/pwyagxkq8mws4iof38gnqvoc/hostAvatar?v=1745448056493"
                    alt="Taila, assistente de suporte"
                    className="w-full h-full rounded-full object-cover"
                />
            </div>
        </div>
    );
};