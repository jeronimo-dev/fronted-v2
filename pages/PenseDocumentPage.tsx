import React from 'react';
import { Client } from '../types';
import { MarkdownRenderer } from '../components/MarkdownRenderer';

interface PenseDocumentPageProps {
    client: Client;
    onClose: () => void;
}

const PenseDocumentPage: React.FC<PenseDocumentPageProps> = ({ client, onClose }) => {
    const documentContent = client.penseDocument;

    const ChatMessage: React.FC<{ text: string; isBot: boolean; avatar: string }> = ({ text, isBot, avatar }) => (
        <div className={`flex items-start gap-3 my-2 animate-fade-in-up ${isBot ? 'self-start' : 'self-end justify-end'}`}>
            {isBot && <img alt="Bot avatar" className="w-8 h-8 rounded-full flex-shrink-0" src={avatar} />}
            <div className={`${isBot ? 'bg-gray-700 rounded-tl-none' : 'bg-gray-600 rounded-tr-none'} text-white p-3 rounded-lg max-w-sm shadow`}>
                <p className="text-sm whitespace-pre-wrap">{text}</p>
            </div>
            {!isBot && <div className="w-8 h-8 rounded-full flex-shrink-0 bg-gray-500 flex items-center justify-center text-white font-bold">J</div>}
        </div>
    );
    
    return (
        <div className="fixed inset-0 bg-black/80 z-50 p-4 flex items-center justify-center animate-fade-in-up" onClick={onClose}>
            <div className="bg-[var(--c-bg-sidebar)] w-full max-w-7xl h-[90vh] rounded-2xl flex flex-col shadow-2xl border border-white/10" onClick={e => e.stopPropagation()}>
                <header className="flex-shrink-0 flex justify-between items-center p-6 border-b border-white/10">
                    <div>
                        <h1 className="text-2xl font-bold text-white tracking-wider font-neue-machina">P.E.N.S.E.™</h1>
                        <p className="text-sm text-gray-400">{client.name}</p>
                    </div>
                    <button onClick={onClose} className="text-[var(--c-text-secondary)] hover:text-white">
                        <span className="material-icons text-3xl">close</span>
                    </button>
                </header>
                <main className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-6 min-h-0 p-6">
                    {/* Left Column - Document */}
                    <div className="bg-gray-100 rounded-lg flex flex-col overflow-hidden">
                       <div className="p-4 bg-white sticky top-0 z-10 border-b flex-shrink-0">
                            <h3 className="text-lg font-semibold text-gray-800">ESTRATÉGIA DETALHADA</h3>
                            <p className="text-sm text-gray-500">{documentContent ? 'O Blueprint Estratégico para ' + client.name : 'Documento não disponível'}</p>
                        </div>
                        <div className="flex-1 overflow-y-auto custom-scrollbar">
                         {documentContent ? (
                            <MarkdownRenderer content={documentContent} theme="light" />
                        ) : (
                            <div className="flex-grow flex items-center justify-center text-gray-500 p-4">
                                <p>Nenhum documento P.E.N.S.E. para este cliente.</p>
                            </div>
                        )}
                        </div>
                        <div className="p-4 bg-white sticky bottom-0 z-10 border-t flex-shrink-0 text-center">
                            <button className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded-lg transition-colors flex items-center justify-center mx-auto space-x-2">
                                <span>Enviar</span>
                                <span className="material-icons-outlined text-xl">arrow_circle_right</span>
                            </button>
                        </div>
                    </div>

                    {/* Right Column - Chat */}
                    <div className="flex flex-col bg-black/50 rounded-lg">
                        <div className="p-4 border-b border-white/10 flex-shrink-0">
                            <h3 className="text-lg font-semibold text-white">Dunner ALFA 1.0</h3>
                        </div>
                        <div className="flex-grow p-4 overflow-y-auto custom-scrollbar flex flex-col">
                           <div className="space-y-4 flex-grow">
                                <ChatMessage text="Now that your eyes are open, make the sun jealous with your burning passion to start the day. Make the sun jealous or stay in bed." isBot={true} avatar="https://taskdun.com.br/wp-content/uploads/2025/07/DUNNER_PROFILE.png"/>
                                <ChatMessage text="Now that your eyes are open, make the sun jealous with your burning passion to start the day. Make the sun jealous or stay in bed." isBot={false} avatar=""/>
                            </div>
                        </div>
                        <div className="p-4 border-t border-white/10 mt-auto">
                            <div className="flex items-center gap-2">
                                <input type="text" className="flex-grow bg-[#1A202C] border border-gray-600 text-white rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[var(--c-accent-focus)]" placeholder="Enviar comando..."/>
                                <button className="bg-gray-600 text-white p-3 rounded-lg hover:bg-gray-500 transition-colors font-semibold">SEND</button>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default PenseDocumentPage;
