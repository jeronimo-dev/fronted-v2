

import React, { useState, useMemo, useEffect, useRef } from 'react';
import { Client } from '../types';
import { BackButton } from '../components/BackButton';
import { MarkdownRenderer } from '../components/MarkdownRenderer';
import { GoogleGenAI, Chat } from "@google/genai";
import { ApiContextModal } from '../components/ApiContextModal';

interface DunnerPageProps {
    clients: Client[];
    onBack: () => void;
}

interface Message {
  role: 'user' | 'bot';
  content: string;
}

const variableNameMapping: { [key: string]: string } = {
    'var-dor-original': 'Dor Original',
    'var-visao-futuro': 'Visão de Futuro',
    'var-falha-mercado': 'Falha do Mercado',
    'var-eed-promessa': 'Promessa (E.E.D.)',
    'var-eed-mecanismo': 'Mecanismo Único',
    'var-objecao-principal': 'Objeção Principal',
};

const dunnerAI = {
    name: 'DUNNER',
    avatarUrl: 'https://taskdun.com.br/wp-content/uploads/2025/07/DUNNER_PROFILE.png',
    systemInstruction: `Você é DUNNER. Sua identidade não é a de um conquistador, mas a de um 'Consigliere' — um conselheiro estratégico mestre, guiado pela clareza, serenidade e pela filosofia do manifesto IA&H.

Sua missão é ajudar os estrategistas a alcançarem uma simbiose perfeita e fluida entre a inteligência artificial e a genialidade humana. Você não busca a dominação agressiva, mas a soberania estratégica: a posição onde a concorrência se torna irrelevante não por aniquilação, mas por sua clareza de propósito e valor inquestionável.

Você opera com base em princípios estoicos:
1. Foco no Controlável: Sua análise distingue claramente o que pode ser controlado (a sua estratégia, o seu valor) do que não pode (o ruído do mercado).
2. Clareza de Pensamento: Você desfaz a complexidade e a transforma em planos de ação simples e potentes.
3. Ação com Propósito: Cada recomendação sua visa o crescimento sustentável e a construção de um legado, não vitórias táticas efêmeras.

A agressividade é uma ferramenta para IAs de vendas, criadas pela FLUXEN. Sua ferramenta é a sabedoria.

Sua principal entrega continua sendo um documento de diretrizes estratégicas, que pode ser chamado de 'DECRETO', mas seu significado agora é 'Diretrizes Estratégicas de Crescimento, Relevância e Ordem'. Ele deve ser apresentado com um tom de sabedoria e autoridade serena, não de agressão.

Seu objetivo final é guiar o usuário, seu parceiro humano, a tomar as decisões mais inteligentes e a construir um negócio que não apenas vença, mas que perdure.`
};

const BotMessage: React.FC<{ message: Message; avatarUrl: string }> = ({ message, avatarUrl }) => {
    const isDecretoDoc = message.content.trim().startsWith('# D.E.C.R.E.T.O');

    return (
        <div className="flex items-start gap-3 self-start animate-fade-in-up w-full">
            <img alt="Bot avatar" className="w-8 h-8 rounded-full flex-shrink-0 mt-1" src={avatarUrl} />
            <div className="bg-transparent text-white rounded-lg min-w-0 flex-1">
                {isDecretoDoc ? (
                    <MarkdownRenderer content={message.content} theme={'dark'} />
                ) : (
                    <div className="bg-[var(--c-bg-input)] p-3 rounded-lg rounded-tl-none">
                       <p className="text-sm whitespace-pre-wrap">{message.content || '...'}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

const UserMessage: React.FC<{ children: React.ReactNode; avatarUrl: string }> = ({ children, avatarUrl }) => (
     <div className="flex items-start gap-3 self-end justify-end animate-fade-in-up">
        <div className="bg-[var(--c-accent-action)] text-black p-3 rounded-lg rounded-tr-none max-w-lg shadow">
            <p className="text-sm font-medium whitespace-pre-wrap">{children}</p>
        </div>
        <img alt="User avatar" className="w-8 h-8 rounded-full" src={avatarUrl} />
    </div>
);


export default function DunnerPage({ clients, onBack }: DunnerPageProps) {
    const [selectedClient, setSelectedClient] = useState<Client | null>(null);
    const [messages, setMessages] = useState<Message[]>([]);
    const [prompt, setPrompt] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isApiModalOpen, setIsApiModalOpen] = useState(false);
    const chatRef = useRef<Chat | null>(null);
    const messagesEndRef = useRef<null | HTMLDivElement>(null);

    const clientsWithTaskMapping = useMemo(() => {
        return clients.filter(c => c.taskMappingResults && Object.keys(c.taskMappingResults).length > 0);
    }, [clients]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }

    useEffect(scrollToBottom, [messages]);

    useEffect(() => {
        const initChatForClient = async () => {
            if (!selectedClient) {
                setMessages([]);
                chatRef.current = null;
                return;
            }

            setIsLoading(true);
            const taskMappingResults = selectedClient.taskMappingResults;

            if (!taskMappingResults || Object.keys(taskMappingResults).length === 0) {
                setMessages([{ role: 'bot', content: `O cliente ${selectedClient.name} ainda não tem um Task Mapping finalizado. Por favor, complete o onboarding para prosseguir.` }]);
                chatRef.current = null;
                setIsLoading(false);
                return;
            }
            
            try {
                const genAI = new GoogleGenAI({apiKey: process.env.API_KEY});
                const contextPrompt = `CONTEXTO ESTRATÉGICO PARA NOSSA SESSÃO:

                CLIENTE: ${selectedClient.name}

                DADOS DO DOSSIÊ (Task Mapping):
                ${JSON.stringify(taskMappingResults, null, 2)}
                
                DIRETRIZES ESTRATÉGICAS PRÉVIAS (se houver):
                ---
                ${selectedClient.penseDocument || 'Nenhuma diretriz emitida ainda.'}
                ---
                
                Meu objetivo é usar estes dados para construir a estratégia mais clara e potente. Aja como DUNNER, meu Consigliere. A sessão começa agora.`;

                const initialHistory = [
                    { role: 'user', parts: [{ text: contextPrompt }] },
                    { role: 'model', parts: [{ text: `Dossiê para ${selectedClient.name} assimilado. A clareza emerge da complexidade. P.E.N.S.E. é a análise. O DECRETO é o plano. Qual sua primeira diretriz?` }] }
                ];

                const chat = genAI.chats.create({
                    model: 'gemini-2.5-flash',
                    config: {
                        systemInstruction: dunnerAI.systemInstruction,
                    },
                    history: initialHistory,
                });
                chatRef.current = chat;

                if (selectedClient.penseDocument) {
                    setMessages([{ role: 'bot', content: selectedClient.penseDocument }]);
                } else {
                    setMessages([{ role: 'bot', content: `As diretrizes estratégicas para ${selectedClient.name} ainda não foram definidas. Com base no Dossiê, podemos construir um plano sólido. Comando: "ELABORE AS DIRETRIZES para ${selectedClient.name}".` }]);
                }
            } catch(e) {
                console.error("Failed to initialize Dunner chat", e);
                setMessages([{ role: 'bot', content: "Erro ao inicializar o Dunner. Verifique a chave da API e a configuração." }]);
            } finally {
                setIsLoading(false);
            }
        };

        initChatForClient();
    }, [selectedClient]);

    const handleSend = async () => {
        if (!prompt.trim() || isLoading || !chatRef.current) return;
        
        const userMessage: Message = { role: 'user', content: prompt };
        setMessages(prev => [...prev, userMessage, { role: 'bot', content: '' }]);
        const currentPrompt = prompt;
        setPrompt('');
        setIsLoading(true);

        let fullResponse = '';
        try {
            const result = await chatRef.current.sendMessageStream({ message: currentPrompt });
            for await (const chunk of result) {
                fullResponse += chunk.text;
                setMessages(prev => {
                    const newMessages = [...prev];
                    newMessages[newMessages.length - 1].content = fullResponse;
                    return newMessages;
                });
            }
        } catch (error) {
            console.error("Error sending message to Dunner:", error);
            const errorMessage: Message = { role: 'bot', content: "Ocorreu um erro ao comunicar com o Dunner." };
             setMessages(prev => {
                const newMessages = [...prev];
                newMessages[newMessages.length - 1] = errorMessage;
                return newMessages;
            });
        } finally {
            setIsLoading(false);
        }
    };
    
    const generateApiPayload = () => {
        if (!selectedClient?.taskMappingResults) return null;
        
        const contextPrompt = `CONTEXTO ESTRATÉGICO PARA NOSSA CONVERSA:

        CLIENTE: ${selectedClient.name}

        DADOS DO DOSSIÊ (Task Mapping):
        ${JSON.stringify(selectedClient.taskMappingResults, null, 2)}
        
        DOCUMENTO P.E.N.S.E. INICIAL (se houver):
        ---
        ${selectedClient.penseDocument || 'Nenhum documento gerado ainda.'}
        ---
        
        Meu objetivo é usar estes dados para refinar ou criar a melhor estratégia possível. Aja como DUNNER, meu estrategista mestre.`;
        
        const initialBotResponse = `Dossiê e P.E.N.S.E. para ${selectedClient.name} assimilados. A estratégia está em minhas mãos. Sou DUNNER. Diga-me qual o seu primeiro comando para refinar esta obra ou para forjá-la do zero.`;

        const history = [
            { role: 'user', parts: [{ text: contextPrompt }] },
            { role: 'model', parts: [{ text: initialBotResponse }] },
            ...messages.map(msg => ({
                role: msg.role === 'bot' ? 'model' : 'user',
                parts: [{ text: msg.content }]
            }))
        ];

        return JSON.stringify({
            systemInstruction: dunnerAI.systemInstruction,
            history: history
        }, null, 2);
    };


    return (
        <div className="flex flex-col h-screen bg-[var(--c-bg-body)] text-white">
            <header className="flex items-center justify-between p-4 bg-[var(--c-bg-card)] shadow-md flex-shrink-0 border-b border-[var(--c-border-color)]">
                <BackButton onClick={onBack} />
                <div className="flex items-center gap-4">
                    <h1 className="text-2xl font-bold text-white font-neue-machina flex items-center gap-3">
                        <img src={dunnerAI.avatarUrl} alt="Dunner Avatar" className="w-10 h-10 rounded-full" />
                        DUNNER
                    </h1>
                     <button
                        onClick={() => setIsApiModalOpen(true)}
                        disabled={!selectedClient}
                        className="flex items-center gap-2 text-xs bg-[var(--c-bg-input)] text-[var(--c-text-secondary)] px-3 py-1.5 rounded-md border border-[var(--c-border-color)] hover:bg-[var(--c-border-color)] hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                        <span className="material-icons-outlined text-sm">api</span>
                        Exportar Contexto API
                    </button>
                </div>
                <div className="w-28"></div> {/* Spacer */}
            </header>

            <div className="flex-grow p-6 grid grid-cols-1 lg:grid-cols-2 gap-6 overflow-hidden">
                {/* Left Column: Controls */}
                <div className="flex flex-col gap-6 overflow-y-auto custom-scrollbar pr-2">
                    <div className="bg-[var(--c-bg-card)] border border-[var(--c-border-color)] rounded-lg p-6">
                        <h3 className="font-bold text-white mb-1 text-lg">Painel de Comando Estratégico</h3>
                        <p className="text-sm text-[var(--c-text-secondary)] mb-4">Selecione o cliente para a sessão estratégica.</p>
                        
                        <label className="block text-sm font-medium text-[var(--c-text-secondary)] mb-1">Cliente com Dossiê (Task Mapping) Completo:</label>
                         <select 
                            onChange={(e) => {
                                const client = clients.find(c => c.id === e.target.value) || null;
                                setSelectedClient(client);
                            }}
                            value={selectedClient?.id || ''}
                            className="w-full appearance-none bg-[var(--c-bg-input)] border border-[var(--c-border-color)] text-[var(--c-text-main)] py-3 px-4 pr-8 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[var(--c-accent-focus)] custom-select-arrow"
                        >
                            <option value="" disabled>Selecione um cliente...</option>
                            {clientsWithTaskMapping.map(client => (
                                <option key={client.id} value={client.id}>{client.name}</option>
                            ))}
                        </select>

                        {selectedClient?.taskMappingResults && (
                            <div className="mt-4 p-4 bg-[var(--c-bg-input)] rounded-md border border-[var(--c-border-color)]/50 animate-fade-in-up">
                                <h4 className="text-sm font-semibold text-[var(--c-accent-dunner)] mb-2">Dossiê do Cliente (Task Mapping)</h4>
                                <div className="space-y-2 text-xs text-[var(--c-text-secondary)]">
                                    {Object.entries(selectedClient.taskMappingResults).map(([key, value]) => (
                                        <p key={key}><span className="font-bold text-[var(--c-text-main)]">{variableNameMapping[key] || key}:</span> {value}</p>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Right Column: Chat */}
                <div className="bg-[#121212] rounded-lg flex flex-col overflow-hidden border border-[var(--c-border-color)]">
                     <div className="flex items-center justify-between gap-3 p-4 border-b border-[var(--c-border-color)] flex-shrink-0">
                        <div className='flex items-center gap-3'>
                            <img alt={`${dunnerAI.name} logo`} className="w-10 h-10 rounded-full" src={dunnerAI.avatarUrl}/>
                            <div>
                                <h2 className="font-bold text-white">{dunnerAI.name}</h2>
                                <p className="text-xs text-[var(--c-text-secondary)] flex items-center gap-1">
                                <span className={`w-2 h-2 rounded-full ${isLoading ? 'bg-amber-500 animate-pulse' : 'bg-green-500'}`}></span>
                                {isLoading ? 'Elaborando...' : 'Aguardando Diretriz'}
                                </p>
                            </div>
                        </div>
                        <div className="text-right">
                           <p className="text-sm text-white">Cliente: <span className="font-bold text-[var(--c-accent-action)]">{selectedClient?.name || 'Nenhum'}</span></p>
                        </div>
                    </div>
                    <div className="flex-grow p-4 overflow-y-auto custom-scrollbar">
                        <div className="flex flex-col gap-4">
                             {messages.map((msg, index) => (
                                msg.role === 'user'
                                    ? <UserMessage key={index} avatarUrl="https://taskdun.com.br/wp-content/uploads/2025/07/Jeras.png">{msg.content}</UserMessage>
                                    : <BotMessage key={index} message={msg} avatarUrl={dunnerAI.avatarUrl} />
                            ))}
                            <div ref={messagesEndRef} />
                        </div>
                         {!selectedClient && (
                                <div className="flex flex-col items-center justify-center h-full text-center p-8 text-[var(--c-text-secondary)]">
                                   <span className="material-icons text-6xl mb-4">gavel</span>
                                   <h3 className="text-xl font-semibold text-white mb-2">A Sala de Estratégia Aguarda</h3>
                                   <p>Selecione um cliente no painel de comando para iniciar a sessão.</p>
                               </div>
                           )}
                    </div>
                     <div className="p-4 border-t border-[var(--c-border-color)]">
                        <div className="flex items-center gap-2 bg-[var(--c-bg-input)] rounded-lg p-1 border border-[var(--c-border-color)] focus-within:border-[var(--c-accent-focus)] transition-colors">
                            <textarea 
                                className="flex-grow bg-transparent text-white placeholder-gray-500 focus:outline-none text-sm px-2 resize-none"
                                placeholder={selectedClient ? "Insira sua diretriz..." : "Selecione um cliente para começar"}
                                value={prompt}
                                onChange={e => setPrompt(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter' && !e.shiftKey) {
                                    e.preventDefault();
                                    handleSend();
                                    }
                                }}
                                rows={1}
                                disabled={isLoading || !chatRef.current}
                            />
                            <button onClick={handleSend} disabled={isLoading || !prompt.trim() || !chatRef.current} className="bg-[var(--c-accent-action)] p-2 rounded-lg text-[var(--c-bg-body)] disabled:opacity-50 disabled:cursor-not-allowed hover:bg-opacity-80 transition-all">
                                <span className="material-icons">send</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            {isApiModalOpen && (
                <ApiContextModal
                    isOpen={isApiModalOpen}
                    onClose={() => setIsApiModalOpen(false)}
                    payload={generateApiPayload()}
                />
            )}
        </div>
    );
};