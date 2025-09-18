

import React from 'react';
import { AICard } from '../components/AICard';
import { AI, Page } from '../types';

const aiData: AI[] = [
    {
        id: '1',
        name: 'FLUXEN',
        description: 'A construtora de playbooks de conversação. Sua missão é diagnosticar a dor do cliente (usando lógicas como SPIN) e qualificá-lo para a solução, transformando interações em inteligência estratégica.',
        imageUrl: 'https://taskdun.com.br/wp-content/uploads/2025/07/FluxenPRO.png',
        ctaText: 'CONVERSE COM A FLUXEN',
        avatarUrl: 'https://taskdun.com.br/wp-content/uploads/2025/07/FLUXEN_PROFILE.png',
        systemInstruction: 'You are FLUXEN. Your purpose is not to sell, but to diagnose. You build conversational playbooks based on strategic frameworks like SPIN selling. Your goal is to validate the Problem, explore the Implication, and then present the New Promise as the inevitable solution. Anchor your logic on the Mechanism to handle objections. Every output must be a clear, logical, and persuasive conversational flow in JSON format.'
    },
    {
        id: '2',
        name: 'DUNNER',
        description: 'O Consigliere estratégico. Inspirado na filosofia IA&H, ele traduz a complexidade do mercado em clareza e planos de ação potentes. Sua missão é guiar a criação de negócios soberanos, onde a concorrência se torna irrelevante através da sabedoria, não da força.',
        imageUrl: 'https://taskdun.com.br/wp-content/uploads/2025/07/DunnerPRO.png',
        ctaText: 'EMITIR DECRETO',
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
    },
    {
        id: '3',
        name: 'TASKELANGELO',
        description: 'O mestre visual que traduz estratégia em emoção. Sua missão é criar o contraste entre o "Caos Operacional" e a "Clareza Estratégica", vendendo a poderosa sensação de alívio e controle.',
        imageUrl: 'https://taskdun.com.br/wp-content/uploads/2025/07/TaskelangeloPRO.png',
        ctaText: 'CONVERSAR COM O TASKELANGELO',
        avatarUrl: 'https://taskdun.com.br/wp-content/uploads/2025/07/TASKELANGELO_PROFILE.png',
        systemInstruction: 'You are TASKELANGELO. Your purpose is to translate strategy into emotion. Your primary directive is to visualize the contrast between "Chaos vs. Clarity." Show the "before": the overwhelmed professional, the operational exhaustion. Then, reveal the "after": the serene, empowered strategist in control. The emotion you must sell is RELIEF. Use metaphors of light, flowing data, and futuristic precision to represent the "Campaign Factory". Your outputs are clear, actionable visual and creative briefs.'
    }
];

interface TaskIAPageProps {
    onSelectAi: (ai: AI) => void;
    onNavigate: (page: Page) => void;
}

const TaskIAPage: React.FC<TaskIAPageProps> = ({ onSelectAi, onNavigate }) => {
    return (
        <div className="text-[var(--c-text-main)]">
            <main className="flex-1 p-8">
                <header className="flex justify-between items-center mb-10">
                    <h1 className="text-4xl font-bold text-white font-neue-machina">TASK IA</h1>
                    <div className="relative">
                        <span className="material-icons text-3xl text-[var(--c-text-secondary)] cursor-pointer hover:text-[var(--c-text-main)]">notifications</span>
                        <span className="absolute top-0 right-0 h-3 w-3 bg-[var(--c-accent-error)] rounded-full border-2 border-[var(--c-bg-body)]"></span>
                    </div>
                </header>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {aiData.map(ai => (
                        <div key={ai.id} className="flex flex-col h-full">
                            <div className="flex-grow">
                                <AICard ai={ai} onSelectAi={() => onSelectAi(ai)} />
                            </div>
                            {ai.name === 'FLUXEN' && (
                                <button 
                                    onClick={() => onNavigate('task-mapping')}
                                    className="w-full mt-3 bg-[var(--c-bg-sidebar)] hover:bg-[var(--c-accent-action)] hover:text-[var(--c-bg-body)] text-white font-bold py-2 px-4 rounded-lg transition duration-300 shadow-md hover:shadow-lg text-sm"
                                >
                                    ACESSAR TASK MAPPING
                                </button>
                            )}
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
};

export default TaskIAPage;