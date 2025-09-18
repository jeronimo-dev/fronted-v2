
import React, { useState, useMemo } from 'react';
import { ClientStat } from '../types';

interface Taskdunner {
    id: string;
    name: string;
    taskCoins: number;
    penseCount: number;
    clientCount: number;
}

interface AdminClient {
    id: string;
    name: string;
    stats: ClientStat[];
    grossProfit: string;
}

const dummyTaskdunners: Taskdunner[] = [
    { id: 'td1', name: 'Agência XPTO', taskCoins: 1950, penseCount: 2, clientCount: 12 },
    { id: 'td2', name: 'Marketing Masters', taskCoins: 5200, penseCount: 5, clientCount: 25 },
    { id: 'td3', name: 'Creative Solutions', taskCoins: 850, penseCount: 1, clientCount: 8 },
];

const dummyClients: AdminClient[] = [
    { 
        id: 'c1', 
        name: 'Estética Plena', 
        stats: [
            { value: '401', label: 'CONTATOS', color: 'bg-blue-600' },
            { value: '9.000,00', label: 'TICKET MÉDIO', color: 'bg-pink-600' },
            { value: '129', label: 'QUALIFICADOS', color: 'bg-green-600' },
            { value: '5.765', label: 'INVESTIMENTO ADS', color: 'bg-red-600' },
            { value: '13', label: 'CONVERSÕES', color: 'bg-lime-500' },
            { value: '20', label: 'R.O.I.', color: 'bg-orange-500' },
        ],
        grossProfit: '111.235,44'
    },
    { 
        id: 'c2', 
        name: 'Clínica Luz Vida', 
        stats: [
             { value: '890', label: 'CONTATOS', color: 'bg-blue-600' },
            { value: '15.000,00', label: 'TICKET MÉDIO', color: 'bg-pink-600' },
            { value: '310', label: 'QUALIFICADOS', color: 'bg-green-600' },
            { value: '11.200', label: 'INVESTIMENTO ADS', color: 'bg-red-600' },
            { value: '25', label: 'CONVERSÕES', color: 'bg-lime-500' },
            { value: '22', label: 'R.O.I.', color: 'bg-orange-500' },
        ],
        grossProfit: '250.780,10'
    },
];

const StatDisplayCard: React.FC<{ value: string; label: string; subLabel?: string; color: string; }> = ({ value, label, subLabel, color }) => (
    <div className={`${color} p-2 rounded-md text-center text-white flex flex-col justify-center`}>
        <p className="text-lg font-bold">{value}</p>
        <p className="text-xs font-semibold uppercase leading-tight">{label}</p>
         {subLabel && <p className="text-[10px] opacity-80">{subLabel}</p>}
    </div>
);


const TaskAdminPage: React.FC = () => {
    const [taskdunners] = useState<Taskdunner[]>(dummyTaskdunners);
    const [clients] = useState<AdminClient[]>(dummyClients);

    const [selectedTaskdunnerId, setSelectedTaskdunnerId] = useState<string>('');
    const [showTaskdunnerStats, setShowTaskdunnerStats] = useState(false);

    const [selectedClientId, setSelectedClientId] = useState<string>('');
    const [showClientStats, setShowClientStats] = useState(false);
    
    const [newsContent, setNewsContent] = useState('');

    const selectedTaskdunner = useMemo(() => {
        return taskdunners.find(t => t.id === selectedTaskdunnerId);
    }, [selectedTaskdunnerId, taskdunners]);

    const selectedClient = useMemo(() => {
        return clients.find(c => c.id === selectedClientId);
    }, [selectedClientId, clients]);
    
    return (
        <main className="flex-1 p-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Column 1: Taskdunners */}
                <div className="bg-[var(--c-bg-sidebar)] p-6 rounded-2xl shadow-lg border border-[var(--c-border-color)]/50 flex flex-col gap-4">
                    <h3 className="text-2xl font-bold text-center text-white font-neue-machina">Taskdunners</h3>
                    <p className="text-center text-sm text-[var(--c-text-secondary)] -mt-4">Base</p>
                    <div className="text-center bg-black/20 border border-[var(--c-border-color)] rounded-lg py-2">
                        <p className="text-7xl font-bold text-white">143</p>
                    </div>
                    <button className="w-full bg-[var(--c-accent-action)] text-[var(--c-bg-body)] font-bold py-2 rounded-lg hover:bg-opacity-80">Listar</button>
                    
                    <div className="relative">
                        <input type="text" placeholder="Pesquisar..." className="w-full bg-white text-black pl-4 pr-10 py-2 rounded-lg focus:outline-none" />
                        <span className="material-icons absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">search</span>
                    </div>
                    <button className="w-full bg-[var(--c-accent-action)] text-[var(--c-bg-body)] font-bold py-2 rounded-lg hover:bg-opacity-80">Buscar</button>

                    <p className="text-center text-sm text-[var(--c-text-secondary)] mt-2">Seleção</p>
                    <select value={selectedTaskdunnerId} onChange={e => {setSelectedTaskdunnerId(e.target.value); setShowTaskdunnerStats(false);}} className="w-full text-center bg-white text-black py-2 rounded-lg appearance-none custom-select-arrow" style={{backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%23000' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`}}>
                        <option value="" disabled>Selecione um Taskdunner</option>
                        {taskdunners.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
                    </select>

                    <button onClick={() => setShowTaskdunnerStats(true)} disabled={!selectedTaskdunner} className="w-full bg-white text-black font-bold py-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed">Taskdun</button>
                    
                    {showTaskdunnerStats && selectedTaskdunner && (
                         <div className="mt-2 space-y-2 animate-fade-in-up">
                             <div className="flex items-center justify-between bg-black/20 border border-[var(--c-border-color)] rounded-lg p-3">
                                 <span className="font-semibold text-white">Task Coins</span>
                                 <span className="font-bold text-lg text-white">$ {selectedTaskdunner.taskCoins.toLocaleString('pt-BR')}</span>
                             </div>
                             <div className="flex items-center justify-between bg-black/20 border border-[var(--c-border-color)] rounded-lg p-3">
                                 <span className="font-semibold text-white">P.E.N.S.E.</span>
                                 <span className="font-bold text-lg text-white">{selectedTaskdunner.penseCount}</span>
                             </div>
                             <div className="flex items-center justify-between bg-black/20 border border-[var(--c-border-color)] rounded-lg p-3">
                                 <span className="font-semibold text-white">Clientes</span>
                                 <span className="font-bold text-lg text-white">{selectedTaskdunner.clientCount}</span>
                             </div>
                              <button className="w-full bg-[var(--c-accent-action)] text-[var(--c-bg-body)] font-bold py-2 rounded-lg hover:bg-opacity-80 mt-2">Acessar</button>
                         </div>
                    )}
                </div>

                {/* Column 2: Base Clientes */}
                <div className="bg-[var(--c-bg-sidebar)] p-6 rounded-2xl shadow-lg border border-[var(--c-border-color)]/50 flex flex-col gap-4">
                    <h3 className="text-2xl font-bold text-center text-white font-neue-machina">Base Clientes</h3>
                    <p className="text-center text-sm text-[var(--c-text-secondary)] -mt-4">Base</p>
                    <div className="text-center bg-black/20 border border-[var(--c-border-color)] rounded-lg py-2">
                        <p className="text-7xl font-bold text-white">496</p>
                    </div>
                    <button className="w-full bg-[var(--c-accent-action)] text-[var(--c-bg-body)] font-bold py-2 rounded-lg hover:bg-opacity-80">Listar</button>
                    
                    <div className="relative">
                        <input type="text" placeholder="Pesquisar..." className="w-full bg-white text-black pl-4 pr-10 py-2 rounded-lg focus:outline-none" />
                        <span className="material-icons absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">search</span>
                    </div>
                    <button className="w-full bg-[var(--c-accent-action)] text-[var(--c-bg-body)] font-bold py-2 rounded-lg hover:bg-opacity-80">Buscar</button>

                    <p className="text-center text-sm text-[var(--c-text-secondary)] mt-2">Seleção</p>
                     <select value={selectedClientId} onChange={e => {setSelectedClientId(e.target.value); setShowClientStats(false);}} className="w-full text-center bg-white text-black py-2 rounded-lg appearance-none custom-select-arrow" style={{backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%23000' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`}}>
                        <option value="" disabled>Selecione um Cliente</option>
                        {clients.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                    </select>
                    
                    <button onClick={() => setShowClientStats(true)} disabled={!selectedClient} className="w-full bg-[var(--c-accent-action)] text-[var(--c-bg-body)] font-bold py-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-opacity-80">Selecionar</button>
                     
                    {showClientStats && selectedClient && (
                        <div className="mt-2 space-y-2 animate-fade-in-up">
                            <div className="grid grid-cols-2 gap-2">
                                {selectedClient.stats.map((stat, index) => (
                                    <StatDisplayCard key={index} {...stat} />
                                ))}
                            </div>
                            <div className="bg-[var(--c-accent-dunner)] text-[var(--c-bg-body)] p-2 rounded-md text-center">
                                <p className="text-xs font-bold">RESULTADO BRUTO FUNIL</p>
                                <p className="text-2xl font-bold">{selectedClient.grossProfit}</p>
                            </div>
                        </div>
                    )}
                </div>

                {/* Column 3: News & Coins */}
                <div className="flex flex-col gap-8">
                     <div className="bg-[var(--c-bg-sidebar)] p-6 rounded-2xl shadow-lg border border-[var(--c-border-color)]/50 flex flex-col gap-4">
                         <h3 className="text-2xl font-bold text-center text-white font-neue-machina">Task News</h3>
                         <textarea 
                            value={newsContent}
                            onChange={(e) => setNewsContent(e.target.value)}
                            placeholder="Escreva a novidade!"
                            className="w-full h-32 bg-[#EAEAEA] text-black p-3 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-[var(--c-accent-action)]"
                         />
                         <button className="w-full bg-[var(--c-accent-action)] text-[var(--c-bg-body)] font-bold py-2 rounded-lg hover:bg-opacity-80">Publicar</button>
                         <button className="w-full bg-orange-500 text-white font-bold py-2 rounded-lg hover:bg-orange-600">Programar</button>
                     </div>
                     <div className="bg-[var(--c-bg-sidebar)] p-6 rounded-2xl shadow-lg border border-[var(--c-border-color)]/50 flex flex-col gap-4">
                         <h3 className="text-2xl font-bold text-center text-white font-neue-machina">Task Coins Adquiridas</h3>
                         <div className="space-y-2">
                             <div className="flex items-center justify-between bg-black/20 border border-[var(--c-border-color)] rounded-lg p-3">
                                 <span className="font-semibold text-white">TC Hoje</span>
                                 <span className="font-bold text-lg text-white">$ 2.400</span>
                             </div>
                             <div className="flex items-center justify-between bg-black/20 border border-[var(--c-border-color)] rounded-lg p-3">
                                 <span className="font-semibold text-white">TC Semana</span>
                                 <span className="font-bold text-lg text-white">$ 7.300</span>
                             </div>
                              <div className="flex items-center justify-between bg-black/20 border border-[var(--c-border-color)] rounded-lg p-3">
                                 <span className="font-semibold text-white">TC Mês</span>
                                 <span className="font-bold text-lg text-white">$ 11.350</span>
                             </div>
                         </div>
                         <button className="w-full bg-[var(--c-accent-action)] text-[var(--c-bg-body)] font-bold py-2 rounded-lg hover:bg-opacity-80 mt-2">Criar Promoção</button>
                     </div>
                </div>
            </div>
        </main>
    );
};

export default TaskAdminPage;
