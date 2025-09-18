
import React, { useState } from 'react';

interface ApiContextModalProps {
    isOpen: boolean;
    onClose: () => void;
    payload: string | null;
}

export const ApiContextModal: React.FC<ApiContextModalProps> = ({ isOpen, onClose, payload }) => {
    const [isCopied, setIsCopied] = useState(false);

    const handleCopy = () => {
        if (payload) {
            navigator.clipboard.writeText(payload).then(() => {
                setIsCopied(true);
                setTimeout(() => setIsCopied(false), 2000);
            });
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4 animate-fade-in-up" onClick={onClose}>
            <div className="bg-[var(--c-bg-card)] shadow-2xl rounded-lg p-8 w-full max-w-2xl relative border border-[var(--c-border-color)]" onClick={(e) => e.stopPropagation()}>
                <button onClick={onClose} className="absolute top-4 right-4 text-[var(--c-text-secondary)] hover:text-[var(--c-text-main)]">
                    <span className="material-icons-outlined">close</span>
                </button>
                <h2 className="text-xl font-semibold text-center mb-2 text-[var(--c-text-main)] font-neue-machina">Contexto para API</h2>
                <p className="text-center text-sm text-[var(--c-text-secondary)] mb-6">Use este payload para inicializar o Dunner via API.</p>
                
                <div className="relative">
                    <pre className="bg-[var(--c-bg-input)] border border-[var(--c-border-color)] text-[var(--c-text-main)] p-4 rounded-md text-xs whitespace-pre-wrap overflow-auto custom-scrollbar max-h-96">
                        <code>{payload || 'Erro ao gerar payload.'}</code>
                    </pre>
                    <button 
                        onClick={handleCopy}
                        className={`absolute top-2 right-2 text-sm font-semibold py-2 px-4 rounded-lg transition-colors flex items-center justify-center ${isCopied ? 'bg-green-600 text-white' : 'bg-[var(--c-bg-sidebar)] text-white hover:bg-opacity-80'}`}
                    >
                        {isCopied ? <><span className="material-icons-outlined text-base mr-1">check</span>Copiado!</> : <><span className="material-icons-outlined text-base mr-1">content_copy</span>Copiar</>}
                    </button>
                </div>

                <div className="flex justify-end items-center gap-4 pt-4 mt-4">
                    <button 
                        type="button" 
                        onClick={onClose}
                        className="bg-[var(--c-accent-action)] text-[var(--c-bg-body)] font-bold py-2 px-6 rounded-lg flex items-center space-x-2 hover:bg-opacity-80 transition-opacity"
                    >
                        <span>Fechar</span>
                    </button>
                </div>
            </div>
        </div>
    );
};
