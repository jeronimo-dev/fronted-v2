import React, { useState, useMemo } from 'react';
import { Client } from '../types';

interface ImageItem {
    id: string;
    src: string;
    title: string;
    prompt: string;
}

// Data for clients with specific media
const clientMediaData: Record<string, { images: ImageItem[] }> = {
    '1': { // Corresponds to 'Estética Plena'
        images: [
            { 
                id: 'img1', 
                src: 'https://taskdun.com.br/wp-content/uploads/2025/07/estetica-plena-1.png', 
                title: 'Título 1', 
                prompt: 'Now that your eyes are open, make the sun jealous with your burning passion to start the day. Make the sun jealous or stay in bed.' 
            },
            { 
                id: 'img2', 
                src: 'https://taskdun.com.br/wp-content/uploads/2025/07/estetica-plena-2.png', 
                title: 'Título 1', 
                prompt: 'Now that your eyes are open, make the sun jealous with your burning passion to start the day. Make the sun jealous or stay in bed.' 
            },
            { 
                id: 'img3', 
                src: 'https://taskdun.com.br/wp-content/uploads/2025/07/estetica-plena-3.png', 
                title: 'Título 1', 
                prompt: 'Now that your eyes are open, make the sun jealous with your burning passion to start the day. Make the sun jealous or stay in bed.' 
            },
            { 
                id: 'img4', 
                src: 'https://taskdun.com.br/wp-content/uploads/2025/07/estetica-plena-4.png',
                title: 'Título 1', 
                prompt: 'Now that your eyes are open, make the sun jealous with your burning passion to start the day. Make the sun jealous or stay in bed.' 
            },
        ],
    },
    '3': { // Corresponds to 'RPI do Brasil Seguros'
         images: [
            { 
                id: 'rpi1', 
                src: 'https://taskdun.com.br/wp-content/uploads/2025/07/rpi-1.png', 
                title: 'Título 1', 
                prompt: 'Nós não encontramos casas. Nós Nós identificamos legados. Conheça a Curadoria de Legados Imobiliários".' 
            },
            { 
                id: 'rpi2', 
                src: 'https://taskdun.com.br/wp-content/uploads/2025/07/rpi-2.png', 
                title: 'Título 1', 
                prompt: 'Procurando um imóvel ou um novo problema para resolver?' 
            },
            { 
                id: 'rpi3', 
                src: 'https://taskdun.com.br/wp-content/uploads/2025/07/rpi-3.png', 
                title: 'Título 1', 
                prompt: 'Copy...' 
            },
            { 
                id: 'rpi4', 
                src: 'https://taskdun.com.br/wp-content/uploads/2025/07/rpi-4.png',
                title: 'Título 1', 
                prompt: 'Copy...' 
            },
        ],
    }
};

interface TaskMediaPageProps {
    client: Client;
    onClose: () => void;
}

export const TaskMediaPage: React.FC<TaskMediaPageProps> = ({ client, onClose }) => {
    const [copiedStates, setCopiedStates] = useState<Record<string, boolean>>({});

    const handleCopy = (text: string, id: string) => {
        navigator.clipboard.writeText(text).then(() => {
            setCopiedStates(prev => ({ ...prev, [id]: true }));
            setTimeout(() => {
                setCopiedStates(prev => ({ ...prev, [id]: false }));
            }, 2000);
        });
    };
    
    const currentMedia = useMemo(() => {
        return clientMediaData[client.id] || { images: [] };
    }, [client]);

    return (
        <div className="fixed inset-0 bg-black/80 z-50 p-4 flex items-center justify-center animate-fade-in-up" onClick={onClose}>
            <div className="bg-[var(--c-bg-sidebar)] w-full max-w-7xl h-[90vh] rounded-2xl flex flex-col shadow-2xl border border-white/10" onClick={e => e.stopPropagation()}>
                <header className="flex-shrink-0 flex justify-between items-center p-6 border-b border-white/10">
                    <h1 className="text-3xl font-bold text-white tracking-wider font-neue-machina">TASK MEDIA</h1>
                    <button onClick={onClose} className="text-[var(--c-text-secondary)] hover:text-white">
                        <span className="material-icons text-3xl">close</span>
                    </button>
                </header>
                <main className="flex-1 p-6 overflow-y-auto custom-scrollbar">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {currentMedia.images.map(item => (
                            <div key={item.id} className="bg-[var(--c-bg-card)] border border-[var(--c-border-color)] rounded-lg shadow-lg flex flex-col">
                                <div className="relative group">
                                    <img src={item.src} alt={item.title} className="w-full h-56 object-cover rounded-t-lg" />
                                    <a 
                                        href={item.src} 
                                        download={`${item.title.replace(/\s/g, '_')}.png`} 
                                        className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer"
                                    >
                                        <div className="bg-white/20 backdrop-blur-sm p-4 rounded-full">
                                            <span className="material-icons text-white text-4xl">download</span>
                                        </div>
                                    </a>
                                </div>
                                <div className="p-4 flex flex-col flex-grow">
                                    <div className="flex justify-between items-center mb-3">
                                        <h3 className="font-semibold text-[var(--c-text-main)] text-lg">{item.title}</h3>
                                        <button onClick={() => handleCopy(item.title, `title-${item.id}`)} title="Copiar Título" className="text-[var(--c-text-secondary)] hover:text-[var(--c-text-main)] p-1">
                                            <span className="material-icons-outlined text-lg">
                                                {copiedStates[`title-${item.id}`] ? 'check' : 'content_copy'}
                                            </span>
                                        </button>
                                    </div>
                                    <div className="mt-auto pt-3 border-t border-[var(--c-border-color)]">
                                        <div className="flex justify-between items-center">
                                            <h4 className="text-sm font-bold text-[var(--c-text-secondary)] uppercase">COPY</h4>
                                            <button onClick={() => handleCopy(item.prompt, `copy-${item.id}`)} title="Copiar Copy" className="text-[var(--c-text-secondary)] hover:text-[var(--c-text-main)] p-1">
                                                <span className="material-icons-outlined text-lg">
                                                     {copiedStates[`copy-${item.id}`] ? 'check' : 'content_copy'}
                                                </span>
                                            </button>
                                        </div>
                                        <p className="text-sm text-[var(--c-text-secondary)] mt-2">{item.prompt}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </main>
            </div>
        </div>
    );
};

export default TaskMediaPage;