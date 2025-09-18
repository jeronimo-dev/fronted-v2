

import React from 'react';

const AnalysisItem: React.FC<{ icon: string; title: string; subtitle?: string; status: 'ASSINADO' | 'ANALISAR' | 'BLOQUEADO'; }> = ({ icon, title, subtitle, status }) => {
    const statusConfig = {
        ASSINADO: { text: 'ASSINADO', classes: 'bg-green-600 text-white' },
        ANALISAR: { text: 'ANALISAR', classes: 'bg-yellow-400 text-black' },
        BLOQUEADO: { text: 'BLOQUEADO', classes: 'bg-[--c-border-color] text-[#c0c2d1]' },
    };
    const currentStatus = statusConfig[status];

    return (
        <div className="bg-[--c-bg-input] p-4 rounded-xl flex items-center justify-between transition-all duration-200 hover:shadow-lg hover:border-[--c-accent-focus] border border-transparent">
            <div className="flex items-center space-x-4">
                <div className="bg-[#4a4a5e]/50 p-3 rounded-lg flex-shrink-0">
                    <span className="material-icons-outlined text-3xl text-[--c-text-main]">{icon}</span>
                </div>
                <div>
                    <h4 className="font-semibold text-lg text-[--c-text-main]">{title}</h4>
                    {subtitle && <p className="text-sm text-[--c-text-secondary] mt-1">{subtitle}</p>}
                </div>
            </div>
            <span className={`px-4 py-1.5 rounded-md font-bold text-xs uppercase tracking-wider ${currentStatus.classes} flex-shrink-0`}>
                {currentStatus.text}
            </span>
        </div>
    );
};

const onboardingItems = [
    { icon: 'check_box', title: 'Contrato', status: 'ASSINADO' as const },
    { icon: 'lightbulb', title: 'Plano Estratégico', subtitle: 'Enviado há: 2 dias', status: 'ANALISAR' as const },
    { icon: 'palette', title: 'Orientações de Design', subtitle: 'Enviado há: 2 dias', status: 'ANALISAR' as const },
    { icon: 'forum', title: 'Fluxos e Chatbots', subtitle: 'Enviado há: 2 dias', status: 'ANALISAR' as const },
];

const setupItems = [
    { icon: 'theaters', title: 'Criativos Campanha', status: 'BLOQUEADO' as const },
    { icon: 'view_quilt', title: 'Estruturas Digitais', status: 'BLOQUEADO' as const },
];


const TaskInfoPage: React.FC = () => {
    return (
        <div className="relative flex flex-col h-full font-inter">
            <main className="flex-1 p-6 md:p-8 overflow-y-auto">
                <header className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl lg:text-4xl font-bold text-[--c-text-main] tracking-wide">TASK INFO</h1>
                    <div className="relative">
                        <span className="material-icons text-3xl text-[--c-text-secondary] cursor-pointer hover:text-[--c-text-main]">notifications</span>
                        <div className="absolute -top-1 -right-1 bg-[--c-accent-error] text-white rounded-full w-5 h-5 text-xs flex items-center justify-center font-bold border-2 border-[--c-bg-body]">
                            1
                        </div>
                    </div>
                </header>

                <div className="space-y-8">
                    {/* TASKLOADERS */}
                    <section>
                        <h2 className="text-xl font-semibold text-[--c-text-main] mb-4">TASKLOADERS</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {/* Card 1: Enviados */}
                            <div className="bg-[--c-bg-card] border border-[--c-border-color]/50 p-6 rounded-lg shadow-lg flex flex-col justify-between text-center">
                                <div>
                                    <p className="text-sm text-[--c-text-secondary] uppercase font-semibold">TASKLOADERS ENVIADOS</p>
                                    <p className="text-6xl font-bold text-[--c-text-main] my-4">3</p>
                                </div>
                                <button className="w-full bg-[--c-bg-sidebar] hover:bg-opacity-80 text-[--c-text-main] font-semibold py-2 px-4 rounded-md transition-colors">
                                    Listar Clientes
                                </button>
                            </div>

                            {/* Card 2: No Prazo */}
                            <div className="bg-lime-500 p-6 rounded-lg shadow-lg flex flex-col justify-between text-white text-center">
                                <div>
                                    <p className="text-sm uppercase font-semibold">TASKLOADERS NO PRAZO</p>
                                    <p className="text-6xl font-bold my-4">2</p>
                                </div>
                                <button className="w-full bg-[--c-bg-sidebar] hover:bg-opacity-80 text-[--c-text-main] font-semibold py-2 px-4 rounded-md transition-colors">
                                    Listar Clientes
                                </button>
                            </div>

                            {/* Card 3: Em Atraso */}
                            <div className="bg-[#f59e0b] p-6 rounded-lg shadow-lg flex flex-col justify-between text-white text-center">
                                <div>
                                    <p className="text-sm uppercase font-semibold">TASKLOADERS EM ATRASO</p>
                                    <p className="text-6xl font-bold my-4">1</p>
                                </div>
                                <button className="w-full bg-[--c-bg-sidebar] hover:bg-opacity-80 text-[--c-text-main] font-semibold py-2 px-4 rounded-md transition-colors">
                                    Listar Clientes
                                </button>
                            </div>
                        </div>
                    </section>

                    {/* ITENS PARA SUA ANÁLISE */}
                    <section className="bg-[--c-bg-card] border border-[--c-border-color]/50 p-6 rounded-lg shadow-lg">
                        <h2 className="text-xl font-semibold text-[--c-text-main] mb-6 text-center uppercase tracking-wider">Itens para sua Análise</h2>
                        <div className="space-y-12">
                            {/* FASE: ONBOARDING */}
                            <div>
                                <h3 className="text-base font-semibold text-[--c-text-secondary] mb-4 uppercase tracking-widest">FASE: ONBOARDING</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {onboardingItems.map(item => (
                                        <AnalysisItem key={item.title} {...item} />
                                    ))}
                                </div>
                            </div>
                             {/* FASE: SETUP */}
                            <div>
                                <h3 className="text-base font-semibold text-[--c-text-secondary] mb-4 uppercase tracking-widest">FASE: SETUP</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {setupItems.map(item => (
                                        <AnalysisItem key={item.title} {...item} />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </main>
        </div>
    );
};

export default TaskInfoPage;
