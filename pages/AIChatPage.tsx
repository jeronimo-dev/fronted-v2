

import React, { useState, useEffect, useRef } from 'react';
import { GoogleGenAI, Chat } from "@google/genai";
import { AI } from '../types';
import { TaskelangeloDocument } from '../components/TaskelangeloDocument';
import { UtilizeBotModal } from '../components/UtilizeBotModal';

interface AIChatPageProps {
    ai: AI;
    onBack: () => void;
}

interface Message {
  role: 'user' | 'bot';
  content: string;
}

const BotMessage: React.FC<{ children: React.ReactNode; avatarUrl: string }> = ({ children, avatarUrl }) => (
    <div className="flex items-start gap-3 self-start animate-fade-in-up">
        <img alt="Bot avatar" className="w-8 h-8 rounded-full" src={avatarUrl} />
        <div className="bg-[var(--c-bg-input)] text-white p-3 rounded-lg rounded-tl-none max-w-lg shadow">
            <p className="text-sm whitespace-pre-wrap">{children || '...'}</p>
        </div>
    </div>
);

const UserMessage: React.FC<{ children: React.ReactNode; avatarUrl: string }> = ({ children, avatarUrl }) => (
     <div className="flex items-start gap-3 self-end justify-end animate-fade-in-up">
        <div className="bg-[var(--c-accent-action)] text-black p-3 rounded-lg rounded-tr-none max-w-lg shadow">
            <p className="text-sm font-medium whitespace-pre-wrap">{children}</p>
        </div>
        <img alt="User avatar" className="w-8 h-8 rounded-full" src={avatarUrl} />
    </div>
);


const AIChatPage: React.FC<AIChatPageProps> = ({ ai, onBack }) => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [prompt, setPrompt] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isUtilizeModalOpen, setIsUtilizeModalOpen] = useState(false);
    const chatRef = useRef<Chat | null>(null);
    const messagesEndRef = useRef<null | HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }

    useEffect(scrollToBottom, [messages]);


    useEffect(() => {
        setIsLoading(true);
        setMessages([]);
        const initChat = async () => {
            try {
                const genAI = new GoogleGenAI({apiKey: process.env.API_KEY});
                const chat = genAI.chats.create({
                    model: 'gemini-2.5-flash',
                    config: {
                        systemInstruction: ai.systemInstruction,
                    }
                });
                chatRef.current = chat;
                setMessages([{ role: 'bot', content: `Olá! Eu sou ${ai.name}. Para começar, me diga sobre o que vamos conversar hoje.` }]);
            } catch(e) {
                console.error("Failed to initialize chat", e);
                setMessages([{ role: 'bot', content: "Erro ao inicializar a IA. Verifique a chave da API e a configuração." }]);
            } finally {
                setIsLoading(false);
            }
        };

        initChat();
    }, [ai]);

    const handleSend = async () => {
        if (!prompt.trim() || isLoading || !chatRef.current) return;
        
        const userMessage: Message = { role: 'user', content: prompt };
        setMessages(prev => [...prev, userMessage, { role: 'bot', content: '' }]);
        setPrompt('');
        setIsLoading(true);

        let fullResponse = '';
        try {
            const result = await chatRef.current.sendMessageStream({ message: prompt });
            for await (const chunk of result) {
                fullResponse += chunk.text;
                setMessages(prev => {
                    const newMessages = [...prev];
                    newMessages[newMessages.length - 1].content = fullResponse;
                    return newMessages;
                });
            }
        } catch (error) {
            console.error("Error sending message:", error);
            const errorMessage: Message = { role: 'bot', content: "Ocorreu um erro ao comunicar com a IA." };
             setMessages(prev => {
                const newMessages = [...prev];
                newMessages[newMessages.length - 1] = errorMessage;
                return newMessages;
            });
        } finally {
            setIsLoading(false);
        }
    };
    

    return (
        <div className="flex flex-col h-screen bg-[var(--c-bg-body)]" style={{ fontFamily: 'Roboto, sans-serif' }}>
            <header className="flex items-center justify-between p-4 bg-[var(--c-bg-card)] shadow-md flex-shrink-0 border-b border-[var(--c-border-color)]">
                <div className="flex items-center">
                    <button onClick={onBack} className="flex items-center gap-2 text-sm text-[var(--c-text-main)] hover:text-white/80">
                        <span className="material-icons">arrow_back</span>
                        Voltar
                    </button>
                </div>
                <h1 className="text-2xl font-bold text-white font-neue-machina">TASK IA</h1>
                <div className="flex items-center gap-4">
                    <div className="relative">
                        <span className="material-icons text-[var(--c-text-secondary)] text-3xl">notifications</span>
                        <span className="absolute top-0 right-0 block h-4 w-4 rounded-full bg-[var(--c-accent-error)] text-xs text-center text-white border-2 border-[var(--c-bg-card)]">1</span>
                    </div>
                </div>
            </header>
            <div className="flex-grow p-6 grid grid-cols-1 lg:grid-cols-2 gap-6 overflow-hidden">
                {/* Left Column - Chat Interface */}
                <div className="flex flex-col h-full bg-[var(--c-bg-card)] border border-[var(--c-border-color)] rounded-lg">
                    <div className="flex items-center gap-3 p-4 border-b border-[var(--c-border-color)]">
                        <img alt={`${ai.name} logo`} className="w-10 h-10 rounded-full" src={ai.avatarUrl}/>
                        <div>
                            <h2 className="font-bold text-white">{ai.name}</h2>
                            <p className="text-xs text-[var(--c-text-secondary)] flex items-center gap-1">
                               <span className={`w-2 h-2 rounded-full ${isLoading ? 'bg-amber-500 animate-pulse' : 'bg-green-500'}`}></span>
                               {isLoading ? 'Digitando...' : 'Online'}
                            </p>
                        </div>
                    </div>
                    <div className="flex-grow p-4 overflow-y-auto custom-scrollbar">
                        <div className="flex flex-col gap-4">
                             {messages.map((msg, index) => (
                                msg.role === 'user'
                                    ? <UserMessage key={index} avatarUrl="https://taskdun.com.br/wp-content/uploads/2025/07/Jeras.png">{msg.content}</UserMessage>
                                    : <BotMessage key={index} avatarUrl={ai.avatarUrl}>{msg.content}</BotMessage>
                            ))}
                            <div ref={messagesEndRef} />
                        </div>
                    </div>
                     <div className="p-4 border-t border-[var(--c-border-color)]">
                        <div className="flex items-center gap-2 bg-[var(--c-bg-input)] rounded-lg p-1 border border-[var(--c-border-color)] focus-within:border-[var(--c-accent-focus)] transition-colors">
                            <textarea 
                                className="flex-grow bg-transparent text-white placeholder-gray-500 focus:outline-none text-sm px-2 resize-none"
                                placeholder="Digite sua mensagem..."
                                value={prompt}
                                onChange={e => setPrompt(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter' && !e.shiftKey) {
                                    e.preventDefault();
                                    handleSend();
                                    }
                                }}
                                rows={1}
                                disabled={isLoading}
                            />
                            <button onClick={handleSend} disabled={isLoading || !prompt.trim()} className="bg-[var(--c-accent-action)] p-2 rounded-lg text-[var(--c-bg-body)] disabled:opacity-50 disabled:cursor-not-allowed hover:bg-opacity-80 transition-all">
                                <span className="material-icons">send</span>
                            </button>
                        </div>
                    </div>
                </div>


                {/* Right Column */}
                <div className="bg-[var(--c-bg-card)] border border-[var(--c-border-color)] rounded-lg p-4 flex flex-col overflow-hidden">
                    {(() => {
                        if (ai.name === 'TASKELANGELO') {
                            return (
                                <>
                                    <div className="flex justify-between items-center mb-4 flex-shrink-0">
                                        <h2 className="font-bold text-lg text-white">EMPRESA A</h2>
                                        <button className="bg-[var(--c-accent-action)] text-[var(--c-bg-body)] font-bold py-2 px-6 rounded-lg text-sm hover:bg-opacity-80 transition-colors">APROVAR</button>
                                    </div>
                                    <p className="text-xs text-[var(--c-text-secondary)] mb-4 flex-shrink-0">Task Visual ID</p>
                                    <div className="flex-grow bg-white rounded-lg custom-scrollbar overflow-y-auto">
                                        <TaskelangeloDocument />
                                    </div>
                                </>
                            );
                        } else { // FLUXEN or DUNNER
                            return (
                                <>
                                    <div className="flex justify-between items-center mb-4 flex-shrink-0">
                                        <h2 className="font-bold text-lg text-white">EMPRESA A</h2>
                                        <button onClick={() => setIsUtilizeModalOpen(true)} className="bg-[var(--c-accent-action)] text-[var(--c-bg-body)] font-bold py-2 px-6 rounded-lg text-sm hover:bg-opacity-80 transition-colors">UTILIZAR</button>
                                    </div>
                                    <p className="text-xs text-[var(--c-text-secondary)] mb-4 flex-shrink-0">FLUXO PARA TASK BOT - [NOME ROBO]</p>
                                    <div className="flex-grow bg-cover bg-center rounded-lg p-4 flex flex-col custom-scrollbar overflow-y-auto" style={{backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAvyO_CU1g2YFb73Cq67hWMHd1w6qZvxXrvSClOpFzlMqPu4LmijkWxU-5NA4wZ5iO9pdPH0Xo5cYgT3Ml5Ftqff1UUh___QaMS2pSdmoZZiRUSpxUu86fofQ06BIMw7Fmx2Bkhk3nsApM1jlWTkK4-VjXRIWxJ-ouszr4rrhzzCaAffrFcNjj8L7bieQDIJDrCKWcnuYwC2YzTIs78c7oWpR9ZqlJD616O9LlJa_hZWwT7XMlOZVJ1oDEQkhPSIuYoLFl78rwOHHc')"}}>
                                        <div className="flex flex-col gap-3 mb-auto">
                                            <BotMessage avatarUrl={ai.avatarUrl}>Olá boa madrugada, tudo bem?</BotMessage>
                                            <BotMessage avatarUrl={ai.avatarUrl}>Me chamo Hércules Bot! Estou aqui para agilizar as coisas para você!</BotMessage>
                                            <BotMessage avatarUrl={ai.avatarUrl}>Aqui na Hércules nosso lema é resolver aquilo que nossos clientes precisam de forma rápida e segura.</BotMessage>
                                            <BotMessage avatarUrl={ai.avatarUrl}>Para que te conheçamos melhor, qual o seu nome?</BotMessage>
                                        </div>
                                        <div className="mt-auto">
                                        <UserMessage avatarUrl="https://lh3.googleusercontent.com/aida-public/AB6AXuD-UrUvkKhkEJt_BgzOmufm6MnGJwL28WTc2gDM9_KFmecHV5N8u8-RHRrjc71HZYnb6GeAwnQFbXomkizfZhk6Qj3FFpDhQ6OvF3v7_6e6GotCzKtgz0a0X-XO7qrTGFtIVWm92OrkRudkvjSJwYqhy5-KmY2r85G4eMpvshBy9gZHY0JP9t6glK6hiC1ejJ4hdkLElSeSiSDvDgwVBlWGyTLzqsQPL0xTA06w3LbeFDV4fRQat0RPGXIUVjQwAaq0IFGbEl_rCEI">
                                            Opa! Precisando agilizar alguma coisa? Pode me acionar!
                                        </UserMessage>
                                            <div className="flex items-center gap-2 bg-white rounded-lg p-1">
                                                <img alt="User avatar" className="w-8 h-8 rounded-full" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDsKFavgZxeV7yug9c0d4mstY-Ua5vQiRHq8NrX-kF_L0GZPYwXs_-GEkvjAoo6yZ1U4zd-YpFfqQZMTcl5W5ojAEXr9uUji3xSms5DQLtH-x1Fudp4GrMyIQlVZ6sIOIk9MN43yP398WBv-0h4wL4NJrwEMQa7i2sbsntubiReVpqTrhsVM3PxJYi8pUJB2meK3Yjyv9CwTVixooU7X_PSa6DBAWCirZjDM1au2KEYaV944-uWHKE_qI8sqwosWmfKM9LJUcePV70"/>
                                                <input className="flex-grow bg-transparent text-gray-800 placeholder-gray-500 focus:outline-none text-sm px-2" placeholder="Digite seu nome" type="text"/>
                                                <button className="bg-orange-500 p-3 rounded-lg hover:bg-orange-600">
                                                    <span className="material-icons text-white">send</span>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            );
                        }
                    })()}
                </div>
            </div>
             {isUtilizeModalOpen && (
                // FIX: Removed incorrect 'companyName' prop. The 'client' prop on the modal has been made optional.
                <UtilizeBotModal
                    isOpen={isUtilizeModalOpen}
                    onClose={() => setIsUtilizeModalOpen(false)}
                />
            )}
        </div>
    );
};

export default AIChatPage;