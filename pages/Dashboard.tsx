
import React, { useState, useEffect } from 'react';
import { Header } from '../components/Header';
import { Page } from '../types';

interface DashboardPageProps {
    onNavigate: (page: Page) => void;
}

const TaskCoinsCard = () => (
    <div className="bg-[var(--c-bg-sidebar)] p-6 rounded-2xl shadow-lg border border-[var(--c-border-color)]/50 text-center flex flex-col justify-between h-full">
        <div>
            <h3 className="text-2xl font-bold text-[var(--c-text-main)] font-neue-machina">Task Coins</h3>
            <p className="text-sm text-[var(--c-text-secondary)] mb-4">Saldo</p>
            <div className="flex items-center justify-center space-x-2 my-4">
                 <p className="text-5xl font-bold"><span className="text-3xl align-middle">$</span> 1.950</p>
            </div>
        </div>
        <button className="w-full bg-[var(--c-accent-action)] hover:bg-opacity-80 text-[var(--c-bg-body)] font-bold py-3 px-4 rounded-lg transition duration-300 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2 mt-4">
            <span>Adicionar</span>
            <span className="material-icons">add_circle</span>
        </button>
    </div>
);

const PenseCard = () => (
    <div className="bg-[var(--c-bg-sidebar)] p-6 rounded-2xl shadow-lg border border-[var(--c-border-color)]/50 text-center flex flex-col justify-between h-full">
        <div>
            <h3 className="text-2xl font-bold text-[var(--c-text-main)] font-neue-machina">P.E.N.S.E</h3>
            <p className="text-sm text-[var(--c-text-secondary)] mb-4">Quantidade</p>
            <div className="my-4 bg-black rounded-lg py-4">
                <p className="text-6xl font-bold">2</p>
            </div>
        </div>
        <button className="w-full bg-[var(--c-accent-action)] hover:bg-opacity-80 text-[var(--c-bg-body)] font-bold py-3 px-4 rounded-lg transition duration-300 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2 mt-4">
            <span>Adquirir</span>
            <span className="material-icons">add_circle</span>
        </button>
    </div>
);

const MindMakerCard = () => (
    <div className="bg-[var(--c-bg-sidebar)] p-6 rounded-2xl shadow-lg border border-[var(--c-border-color)]/50 md:col-span-2">
        <h3 className="text-2xl font-bold text-[var(--c-text-main)] font-neue-machina mb-4">IA&H Mind Maker</h3>
        <p className="text-sm text-[var(--c-text-secondary)] leading-relaxed">
            Você pratica a Dicotomia de Controle? É uma prática que atravessou milênios e ainda é praticadas pelas mentes mais brilhantes do mundo. Ela parte do príncipio que tudo o que acontece na nossa vida provém de eventos que estão dentro ou fora do nosso controle. O problema é que sofremos demais por coisas que não estão no nosso controle e deixamos as que estão escaparem por não sabermos como agir. A dicotomia de controle é simplesmente trazer a sua consciência tudo o que está ou não no seu controle e agir com foco sobre o que pode controlar. Desse modo sua energia será usada para aquilo que realmente importa. Prática: ao final do dia peque uma folha de papel e divida-a no meio listando a esquerda tudo o está fora do seu controle e a direita tudo o que não está. Comprometa-se a agir no que listou dentro do seu controle, procurando não pensar no que não pode controlar.
        </p>
    </div>
);

const TaskNewsCard = () => (
    <div className="bg-[var(--c-bg-sidebar)] p-6 rounded-2xl shadow-lg border border-[var(--c-border-color)]/50 h-full">
        <h3 className="text-2xl font-bold text-center text-[var(--c-text-main)] font-neue-machina mb-6">Task News</h3>
        <div className="space-y-4">
            <div className="bg-[var(--c-bg-body)] p-4 rounded-lg">
                <p className="text-xs text-[var(--c-text-secondary)]">15/10/25</p>
                <h4 className="font-bold text-white mt-1">NOVA ATUALIZAÇÃO!</h4>
                <p className="text-sm text-[var(--c-text-secondary)] mt-1">Inclusão de Campanhas Google Ads</p>
            </div>
            <div className="bg-[var(--c-bg-body)] p-4 rounded-lg">
                <p className="text-xs text-[var(--c-text-secondary)]">14/10/25</p>
                <h4 className="font-bold text-white mt-1">POST NOVO NO BLOG:</h4>
                <p className="text-sm text-[var(--c-text-secondary)] mt-1">Marketing obtém 82% a mais de sucesso com chatbot para vendas b2b</p>
            </div>
            <div className="bg-[var(--c-bg-body)] p-4 rounded-lg">
                <p className="text-xs text-[var(--c-text-secondary)]">12/10/25</p>
                <h4 className="font-bold text-white mt-1">PROMOÇÃO TASKOFF</h4>
                <p className="text-sm text-[var(--c-text-secondary)] mt-1">Adicione Task Coin com até 50% de desconto até 25/10/25.</p>
            </div>
        </div>
    </div>
);


const DashboardPage: React.FC<DashboardPageProps> = ({ onNavigate }) => {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const timerId = setInterval(() => setTime(new Date()), 1000 * 60); // Update every minute
        return () => clearInterval(timerId);
    }, []);

    return (
        <main className="flex-1 p-8">
            <Header
                userName="John"
                time={time.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                notifications={1}
            />
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
                {/* Left and Center columns */}
                <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-8 content-start">
                    <TaskCoinsCard />
                    <PenseCard />
                    <MindMakerCard />
                </div>

                {/* Right column */}
                <div className="lg:col-span-1">
                    <TaskNewsCard />
                </div>
            </div>
        </main>
    );
};

export default DashboardPage;
