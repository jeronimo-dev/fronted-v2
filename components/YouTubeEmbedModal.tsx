
import React, { useState, useEffect } from 'react';

interface YouTubeEmbedModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (url: string) => void;
    videoTitle: string;
    initialUrl?: string;
}

export const YouTubeEmbedModal: React.FC<YouTubeEmbedModalProps> = ({ isOpen, onClose, onSave, videoTitle, initialUrl }) => {
    const [url, setUrl] = useState(initialUrl || '');

    useEffect(() => {
        if (isOpen) {
            setUrl(initialUrl || '');
        }
    }, [isOpen, initialUrl]);

    if (!isOpen) return null;
    
    const getEmbedUrl = (inputUrl: string): string | null => {
        if (!inputUrl) return null;
        let videoId = null;
        
        const regexes = [
            /(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?v=([a-zA-Z0-9_-]{11})/,
            /(?:https?:\/\/)?youtu\.be\/([a-zA-Z0-9_-]{11})/,
            /(?:https?:\/\/)?(?:www\.)?youtube\.com\/embed\/([a-zA-Z0-9_-]{11})/
        ];

        for (const regex of regexes) {
            const match = inputUrl.match(regex);
            if (match && match[1]) {
                videoId = match[1];
                break;
            }
        }
    
        return videoId ? `https://www.youtube.com/embed/${videoId}` : null;
    };

    const handleSave = () => {
        const embedUrl = getEmbedUrl(url);
        if (embedUrl) {
            onSave(embedUrl);
        } else {
            alert("URL do YouTube inválida. Por favor, insira um link válido (ex: https://www.youtube.com/watch?v=...).");
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4 animate-fade-in-up" onClick={onClose}>
            <div className="bg-[var(--c-bg-card)] shadow-2xl rounded-lg p-8 w-full max-w-lg relative border border-[var(--c-border-color)]" onClick={(e) => e.stopPropagation()}>
                <button onClick={onClose} className="absolute top-4 right-4 text-[var(--c-text-secondary)] hover:text-[var(--c-text-main)]">
                    <span className="material-icons-outlined">close</span>
                </button>
                <h2 className="text-xl font-semibold text-center mb-2 text-[var(--c-text-main)] font-neue-machina">Incorporar Vídeo do YouTube</h2>
                <p className="text-center text-sm text-[var(--c-text-secondary)] mb-6">Para o vídeo: "{videoTitle}"</p>
                
                <div className="space-y-4">
                    <div>
                        <label htmlFor="youtube-url" className="block text-sm font-medium text-[var(--c-text-secondary)] mb-1">URL do Vídeo:</label>
                        <input 
                            id="youtube-url"
                            type="text"
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                            className="w-full bg-[var(--c-bg-input)] border border-[var(--c-border-color)] text-[var(--c-text-main)] p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--c-accent-focus)]"
                            placeholder="Cole o link do YouTube aqui..."
                        />
                    </div>
                    <div className="flex justify-end items-center gap-4 pt-4">
                        <button type="button" onClick={onClose} className="bg-transparent text-[var(--c-text-secondary)] font-semibold hover:text-[var(--c-text-main)] px-6 py-2 rounded-lg transition-colors">
                            Cancelar
                        </button>
                        <button 
                            type="button" 
                            onClick={handleSave}
                            className="bg-[var(--c-accent-action)] text-[var(--c-bg-body)] font-bold py-2 px-6 rounded-lg flex items-center space-x-2 hover:bg-opacity-80 transition-opacity"
                        >
                            <span className="material-icons">save</span>
                            <span>Salvar</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
