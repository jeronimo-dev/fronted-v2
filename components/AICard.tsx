import React from 'react';
import { AI } from '../types';

interface AICardProps {
    ai: AI;
    onSelectAi: () => void;
}

export const AICard: React.FC<AICardProps> = ({ ai, onSelectAi }) => {
    return (
        <div className="bg-[var(--c-bg-card)] rounded-xl shadow-lg border border-[var(--c-border-color)] h-full flex flex-col group">
            <div className="flex justify-center items-center h-16 bg-[var(--c-bg-body)] rounded-t-lg border-b border-[var(--c-border-color)]">
                <h2 className="text-2xl font-bold text-white font-neue-machina">{ai.name}</h2>
            </div>
            <div className="p-4 flex flex-col flex-grow">
                <div className="relative overflow-hidden rounded-md mb-4 cursor-pointer" onClick={onSelectAi}>
                    <img 
                        alt={`AI ${ai.name}`}
                        className="w-full h-auto object-cover transition-all duration-300 ease-in-out group-hover:scale-105" 
                        src={ai.imageUrl} 
                    />
                    <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out">
                        <div 
                          className="font-neue-machina bg-[var(--c-accent-action)] text-[var(--c-bg-body)] font-bold text-base uppercase tracking-wider px-6 py-3 rounded-md group-hover:scale-105 transition-all duration-300"
                        >
                            {ai.ctaText}
                        </div>
                    </div>
                </div>
                <p className="text-sm text-[var(--c-text-secondary)] leading-relaxed flex-grow">
                    {ai.description}
                </p>
            </div>
        </div>
    );
};