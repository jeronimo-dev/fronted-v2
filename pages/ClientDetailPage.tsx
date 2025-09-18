import React, { useState } from 'react';
import { Client, ClientStat, OnboardingStatus } from '../types';

interface ClientDetailPageProps {
    client: Client;
    onClose: () => void;
    onStartTaskMapping: (client: Client) => void;
    onViewDocument: (type: 'pense' | 'tvid' | 'task-media', client: Client) => void;
    onViewTaskBot: (client: Client) => void;
}

const StatCard: React.FC<{ stat: ClientStat }> = ({ stat }) => (
    <div className={`${stat.color} p-3 rounded-md text-white`}>
        <p className="text-2xl font-bold">{stat.value}</p>
        <p className="text-xs font-semibold uppercase">{stat.label}</p>
    </div>
);

const LineChart: React.FC = () => {
    // Data points are illustrative, showing an ascending trend for presentation.
    const data = {
        labels: [0, 17, 24, 35, 53],
        series: [
            { name: 'Leads Total', color: '#3b82f6', points: [{x:0, y:50}, {x:17, y:120}, {x:24, y:180}, {x:35, y:250}, {x:53, y:350}] },
            { name: 'Leads Qualificados', color: '#22c55e', points: [{x:0, y:30}, {x:17, y:80}, {x:24, y:130}, {x:35, y:190}, {x:53, y:280}] },
            { name: 'Vendas', color: '#ef4444', points: [{x:0, y:10}, {x:17, y:40}, {x:24, y:70}, {x:35, y:110}, {x:53, y:160}] },
            { name: 'ROI', color: '#f59e0b', points: [{x:0, y:20}, {x:17, y:90}, {x:24, y:150}, {x:35, y:220}, {x:53, y:310}] },
        ]
    };
    const width = 500;
    const height = 300;
    const padding = 40;

    const toPath = (points: {x:number, y:number}[]) => "M" + points.map(p => `${padding + (p.x / 60) * (width - padding*2)},${height - padding - (p.y / 500) * (height - padding*2)}`).join(" L");

    return (
        <div className="mt-4">
            <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto">
                {/* Y-axis lines and labels */}
                {[0, 100, 200, 300, 400, 500].map(y => (
                    <g key={y}>
                        <line x1={padding} x2={width-padding} y1={height - padding - (y/500)*(height-padding*2)} y2={height - padding - (y/500)*(height-padding*2)} stroke="var(--c-border-color)" strokeDasharray="2,2" />
                        <text x={padding-10} y={height - padding - (y/500)*(height-padding*2) + 5} fill="var(--c-text-secondary)" textAnchor="end" fontSize="10">{y}</text>
                    </g>
                ))}
                {/* X-axis labels */}
                 {data.labels.map(x => (
                    <text key={x} x={padding + (x/60)*(width - padding*2)} y={height - padding + 20} fill="var(--c-text-secondary)" textAnchor="middle" fontSize="10">{x}</text>
                ))}
                <line x1={padding} x2={width-padding} y1={height - padding} y2={height-padding} stroke="var(--c-border-color)" />
                
                {/* Data lines */}
                {data.series.map(s => <path key={s.name} d={toPath(s.points)} stroke={s.color} strokeWidth="2" fill="none" />)}
            </svg>
            <div className="flex justify-center space-x-4 mt-4 text-xs">
                {data.series.map(s => <div key={s.name} className="flex items-center"><span className="w-3 h-3 rounded-full mr-2" style={{backgroundColor: s.color}}></span>{s.name}</div>)}
            </div>
        </div>
    );
};

const onboardingStatusConfig: { [key in OnboardingStatus]: { text: string; bgColor: string; textColor: string; dotColor: string;} } = {
    [OnboardingStatus.NAO_ACESSADO]: { text: 'NÃO ACESSADO', bgColor: 'bg-[#5a5a6e]', textColor: 'text-white', dotColor: 'bg-gray-400' },
    [OnboardingStatus.EM_PREENCHIMENTO]: { text: 'EM PREENCHIMENTO', bgColor: 'bg-[#2d77d7]', textColor: 'text-white', dotColor: 'bg-blue-400' },
    [OnboardingStatus.FALTAM_DADOS]: { text: 'FALTAM DADOS', bgColor: 'bg-yellow-500', textColor: 'text-black', dotColor: 'bg-yellow-400' },
    [OnboardingStatus.FINALIZADO]: { text: 'FINALIZADO', bgColor: 'bg-green-600', textColor: 'text-white', dotColor: 'bg-green-500' },
    [OnboardingStatus.EM_ATRASO]: { text: 'EM ATRASO', bgColor: 'bg-red-600', textColor: 'text-white', dotColor: 'bg-red-500' },
};

const ClientInfoItem: React.FC<{ icon: string; label: string; status: OnboardingStatus }> = ({ icon, label, status }) => {
    const statusInfo = onboardingStatusConfig[status];
    return (
        <div className="flex flex-col items-center justify-center text-center space-y-2">
            <button className="w-16 h-16 bg-[var(--c-bg-card)] rounded-full flex items-center justify-center hover:bg-[var(--c-border-color)] transition-colors">
                <span className="material-icons text-[var(--c-text-main)] text-3xl">{icon}</span>
            </button>
            <div className="flex items-center space-x-1.5">
                <div className={`w-2.5 h-2.5 rounded-full ${statusInfo.dotColor}`}></div>
                <p className="text-xs text-[var(--c-text-secondary)]">{label}</p>
            </div>
        </div>
    );
};


export const ClientDetailPage: React.FC<ClientDetailPageProps> = ({ client, onClose, onStartTaskMapping, onViewDocument, onViewTaskBot }) => {
    const [activeStage, setActiveStage] = useState('Validação');
    const taskloaderStatusInfo = onboardingStatusConfig[client.taskloaderStatus];

    const buttonBaseClasses = "flex items-center space-x-2 font-semibold py-2 px-5 rounded-full transition-all duration-200 shadow-md";
    const enabledClasses = "bg-gray-700 hover:bg-gray-600 text-white";
    const disabledClasses = "bg-gray-800 text-gray-500 cursor-not-allowed opacity-50";


    return (
        <div 
            className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-40 p-4 transition-opacity animate-fade-in-up"
            onClick={onClose}
            style={{ fontFamily: "'Inter', sans-serif" }}
        >
            <div 
                className="bg-[var(--c-bg-card)] rounded-xl p-6 relative shadow-2xl border border-[var(--c-border-color)] w-full max-w-7xl flex flex-col"
                onClick={(e) => e.stopPropagation()}
            >
                <header className="flex justify-between items-center mb-6">
                    <h2 className="text-3xl font-bold tracking-wider font-neue-machina">{client.name}</h2>
                    <div className="flex items-center space-x-4">
                        <button onClick={onClose} className="text-[var(--c-text-secondary)] hover:text-white">
                            <span className="material-icons text-3xl">close</span>
                        </button>
                    </div>
                </header>

                <div className="grid grid-cols-12 gap-6 flex-grow">
                    {/* Left Column */}
                    <aside className="col-span-12 lg:col-span-3 space-y-4">
                        <div className="bg-[var(--c-bg-body)] p-4 rounded-lg">
                            <p className="text-sm text-[var(--c-text-secondary)]">Gestor: {client.manager}</p>
                            <p className="text-sm text-[var(--c-text-secondary)]">Contato: {client.contact}</p>
                             <button className="mt-3 w-full bg-[var(--c-accent-action)] text-[var(--c-bg-body)] font-bold py-2 rounded-lg flex items-center justify-center space-x-2 hover:bg-opacity-80 transition-opacity">
                                <span className="material-icons">phone</span>
                                <span>Whatsapp</span>
                            </button>
                        </div>
                        <div className="bg-[var(--c-bg-body)] p-4 rounded-lg space-y-3">
                            <div className="grid grid-cols-2 gap-3">
                                {client.stats.map(stat => <StatCard key={stat.label} stat={stat} />)}
                            </div>
                            <div className="bg-[var(--c-accent-dunner)] text-[var(--c-bg-body)] p-3 rounded-md text-center">
                                <p className="text-xs font-bold">RESULTADO BRUTO FUNIL</p>
                                <p className="text-2xl font-bold">{client.grossProfit}</p>
                            </div>
                        </div>
                    </aside>
                    
                    {/* Center Column */}
                    <section className="col-span-12 lg:col-span-6 bg-[var(--c-bg-body)] p-4 rounded-lg">
                        <div className="flex justify-between items-center">
                            <div className="flex items-baseline space-x-2">
                                <span className="text-[var(--c-text-secondary)]">Etapa:</span>
                                <span className="font-bold text-xl text-white">{activeStage}</span>
                            </div>
                            <div className="text-right">
                                <p className="text-sm text-white">Tempo de Funil: <span className="font-bold">115 dias</span></p>
                            </div>
                        </div>
                        <LineChart />
                    </section>

                    {/* Right Column */}
                    <aside className="col-span-12 lg:col-span-3 flex flex-col space-y-4">
                        <div className="bg-[var(--c-bg-body)] p-4 rounded-lg text-center">
                            <p className="text-lg font-semibold text-white mb-2">Acessar Task Mapping</p>
                            <button onClick={() => onStartTaskMapping(client)} className="w-full bg-[var(--c-accent-action)] text-[var(--c-bg-body)] font-bold py-2 rounded-lg flex items-center justify-center space-x-2 hover:bg-opacity-80 transition-opacity">
                                <span>Iniciar Onboarding</span>
                                <span className="material-icons">rocket_launch</span>
                            </button>
                        </div>
                        
                        <div className="bg-[var(--c-bg-body)] p-4 rounded-lg text-center">
                            <p className="text-lg font-semibold text-white mb-3">Status Taskloader</p>
                            <div className={`inline-flex items-center justify-center space-x-2 font-bold py-2 px-4 rounded-lg w-full ${taskloaderStatusInfo.bgColor} ${taskloaderStatusInfo.textColor}`}>
                                <div className="w-3 h-3 bg-black/20 rounded-full"></div>
                                <span>{taskloaderStatusInfo.text}</span>
                            </div>
                        </div>

                         <div className="bg-[var(--c-bg-body)] p-4 rounded-lg text-center flex-grow flex flex-col">
                            <p className="text-lg font-semibold text-white mb-4">Informações do Cliente</p>
                            <div className="grid grid-cols-2 gap-x-4 gap-y-6 place-items-center h-full">
                                <ClientInfoItem icon="download" label="Arquivos" status={client.infoStatus.arquivos} />
                                <ClientInfoItem icon="lock" label="Acessos" status={client.infoStatus.acessos} />
                                <ClientInfoItem icon="description" label="Contrato" status={client.infoStatus.contrato} />
                                <ClientInfoItem icon="visibility" label="Design" status={client.infoStatus.design} />
                            </div>
                        </div>

                    </aside>
                </div>

                <div className="mt-8 pt-6 border-t border-[var(--c-border-color)]/50 flex justify-center items-center space-x-4">
                    <button 
                        onClick={() => onViewDocument('pense', client)}
                        disabled={!client.penseDocument}
                        className={`${buttonBaseClasses} ${client.penseDocument ? enabledClasses : disabledClasses}`}
                        title={!client.penseDocument ? "Documento P.E.N.S.E. não disponível" : "Visualizar P.E.N.S.E."}
                    >
                        <span className="material-icons-outlined text-xl">psychology</span>
                        <span>P.E.N.S.E.</span>
                    </button>
                    <button 
                        onClick={() => onViewDocument('tvid', client)}
                        disabled={!client.tvidDocument}
                        className={`${buttonBaseClasses} ${client.tvidDocument ? enabledClasses : disabledClasses}`}
                        title={!client.tvidDocument ? "Task Visual ID não disponível" : "Visualizar TVID"}
                    >
                        <span className="material-icons-outlined text-xl">sync_alt</span>
                        <span>VISUAL TASK ID</span>
                    </button>
                    <button 
                        onClick={() => onViewDocument('task-media', client)}
                        className={`${buttonBaseClasses} ${enabledClasses}`}
                        title={"Visualizar Task Media"}
                    >
                        <span className="material-icons-outlined text-xl">perm_media</span>
                        <span>TASK MEDIA</span>
                    </button>
                    <button 
                        onClick={() => onViewTaskBot(client)}
                        className={`${buttonBaseClasses} ${enabledClasses}`}
                        title="Acessar Task Bot"
                    >
                        <span className="material-icons-outlined text-xl">smart_toy</span>
                        <span>TASK BOT</span>
                    </button>
                </div>
            </div>
        </div>
    );
};