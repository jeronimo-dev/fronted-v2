import React, { useState } from 'react';
import { Client } from '../types';

// FIX: Made the 'client' prop optional as it is not used within the component
// and was causing a type error in AIChatPage where no client data is available.
interface UtilizeBotModalProps {
    isOpen: boolean;
    onClose: () => void;
    client?: Client;
}

const LocalChatMessage: React.FC<{ text: string; isBot: boolean; }> = ({ text, isBot }) => {
    if (isBot) {
        return (
            <div className="flex items-end gap-2 my-2 animate-fade-in-up self-start">
                 <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center flex-shrink-0">
                    <span className="material-icons-outlined text-xl text-gray-600">person</span>
                </div>
                <div className="bg-[#E2E8F0] p-3 rounded-lg max-w-sm rounded-bl-none">
                    <p className="text-sm text-gray-800">{text}</p>
                </div>
            </div>
        );
    }
    return (
        <div className="flex items-end justify-end gap-2 my-2 animate-fade-in-up self-end">
            <div className="bg-[#2D3748] p-3 rounded-lg max-w-sm rounded-br-none">
                <p className="text-sm text-white">{text}</p>
            </div>
            <img src="https://taskdun.com.br/wp-content/uploads/2025/07/FLUXEN_PROFILE.png" alt="Bot as User" className="w-8 h-8 rounded-full"/>
        </div>
    );
};


export const UtilizeBotModal: React.FC<UtilizeBotModalProps> = ({ isOpen, onClose, client }) => {
    const botUrl = `taskbot.taskdun.com.br/estetica`;
    const embedCode = `<link rel="stylesheet" href="https://www.gstatic.com/dialogflow-console/fast/df-messenger/prod/v1/themes/df-messenger-default.css">
<script src="https://www.gstatic.com/dialogflow-console/fast/df-messenger/prod/v1/df-messenger.js"></script>
<df-messenger
  project-id="cc-boc-apps64-2ahfa8k5xc9"
  agent-id="ea224ba1-470a-470a-8add-3dd600fa451"
  language-code="pt-br"
  max-query-length="-1">
  <df-messenger-chat-bubble
   chat-title="CENTRAL DE EFICIÊNCIA">
  </df-messenger-chat-bubble>
</df-messenger>
<style>
  df-messenger {
    z-index: 999;
    position: fixed;
    bottom: 16px;
    right: 16px;
  }
</style>`;

    const [linkCopied, setLinkCopied] = useState(false);
    const [codeCopied, setCodeCopied] = useState(false);

    const handleCopy = (textToCopy: string, type: 'link' | 'code') => {
        navigator.clipboard.writeText(textToCopy).then(() => {
            if (type === 'link') {
                setLinkCopied(true);
                setTimeout(() => setLinkCopied(false), 2000);
            } else {
                setCodeCopied(true);
                setTimeout(() => setCodeCopied(false), 2000);
            }
        });
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 animate-fade-in-up" onClick={onClose}>
            <div className="bg-[var(--c-bg-sidebar)] w-full max-w-6xl h-[90vh] rounded-2xl flex flex-col shadow-2xl border border-white/10" onClick={e => e.stopPropagation()}>
                <header className="flex-shrink-0 flex justify-between items-center p-6 border-b border-white/10">
                    <h1 className="text-3xl font-bold text-white tracking-wider font-neue-machina">TASK BOT</h1>
                    <button onClick={onClose} className="text-[var(--c-text-secondary)] hover:text-white">
                        <span className="material-icons text-3xl">close</span>
                    </button>
                </header>

                <main className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-6 overflow-hidden p-6">
                    {/* Left Column */}
                    <div className="flex flex-col gap-4 overflow-y-auto custom-scrollbar pr-2">
                        <h2 className="text-lg font-semibold text-gray-300 text-center uppercase flex-shrink-0">Ambiente de Testes</h2>
                        <div className="bg-gray-800 p-4 rounded-xl border border-gray-700 flex flex-col items-center">
                            <div className="w-full max-w-[280px] bg-black rounded-[30px] border-[8px] border-gray-900 shadow-2xl overflow-hidden aspect-[9/19.5] p-2 flex-shrink-0">
                                <div className="bg-gray-800 h-full w-full rounded-[22px] flex flex-col text-white">
                                    <div className="flex-shrink-0 text-center pt-2">
                                        <p className="text-xs">22:00</p>
                                    </div>
                                    <div className="flex-grow flex flex-col justify-end p-2 space-y-2 overflow-y-auto">
                                        <div className="p-2 bg-blue-600 rounded-lg self-start max-w-[80%] text-sm">Olá!</div>
                                        <div className="p-2 bg-blue-600 rounded-lg self-start max-w-[80%] text-sm">Como posso ajudar?</div>
                                        <div className="p-2 bg-gray-600 rounded-lg self-end max-w-[80%] text-sm">Preciso de informações.</div>
                                    </div>
                                    <div className="flex-shrink-0 p-2 flex items-center gap-2 border-t border-gray-700 mt-auto">
                                        <span className="material-icons-outlined text-gray-400">add_circle</span>
                                        <div className="flex-grow bg-gray-700 h-8 rounded-full"></div>
                                        <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center">
                                           <span className="material-icons-outlined text-lg">psychology</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="w-full mt-4 space-y-3 p-2">
                                <div>
                                    <p className="text-sm font-semibold text-gray-400 mb-1 uppercase">Link Taskdun</p>
                                    <div className="flex items-center gap-2">
                                        <input type="text" readOnly value={botUrl} className="flex-grow bg-gray-900 border border-gray-700 rounded-md p-2 text-sm text-gray-300 focus:outline-none" />
                                        <button onClick={() => handleCopy(botUrl, 'link')} className="p-2 bg-gray-700 rounded-md hover:bg-gray-600 transition-colors">
                                            <span className="material-icons-outlined text-lg text-white">{linkCopied ? 'check' : 'content_copy'}</span>
                                        </button>
                                    </div>
                                </div>
                                <div>
                                    <p className="text-sm font-semibold text-gray-400 mb-1 uppercase">Script Instalação (Head)</p>
                                    <div className="relative">
                                        <pre className="bg-gray-900 border border-gray-700 rounded-md p-2 text-[10px] text-gray-400 whitespace-pre-wrap overflow-x-auto h-24 custom-scrollbar">
                                            <code>{embedCode}</code>
                                        </pre>
                                        <button onClick={() => handleCopy(embedCode, 'code')} className="absolute top-2 right-2 p-1 bg-gray-700 rounded-md hover:bg-gray-600 transition-colors">
                                            <span className="material-icons-outlined text-sm text-white">{codeCopied ? 'check' : 'content_copy'}</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column */}
                     <div className="flex flex-col bg-[var(--c-bg-card)] rounded-lg">
                        <h2 className="text-lg font-semibold text-gray-300 mb-4 px-2 text-center uppercase">Fluxen</h2>
                        <div className="flex-grow bg-black rounded-lg p-4 flex flex-col-reverse overflow-y-auto custom-scrollbar">
                             <div className="flex flex-col gap-2">
                                <LocalChatMessage text="Now that your eyes are open, make the sun jealous with your burning passion to start the day. Make the sun jealous or stay in bed." isBot={false} />
                                <LocalChatMessage text="Now that your eyes are open, make the sun jealous with your burning passion to start the day. Make the sun jealous or stay in bed." isBot={true} />
                            </div>
                        </div>
                        <div className="mt-4 flex items-center gap-2 p-2">
                            <input type="text" className="flex-grow bg-[#1A202C] border border-gray-600 text-white rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[var(--c-accent-focus)]" placeholder="Digite sua mensagem..."/>
                            <button className="bg-gray-600 text-white p-3 rounded-lg hover:bg-gray-500 transition-colors font-semibold">SEND</button>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};