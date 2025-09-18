import React from 'react';
import { Client } from '../types';

interface ClientCardProps {
    client: Client;
    onSelectClient: (client: Client) => void;
}

const InfoItem: React.FC<{ label: string; value?: string, valueBold?: boolean }> = ({ label, value, valueBold }) => (
    <div className="bg-[var(--c-bg-body)] p-2 rounded-md text-xs flex flex-col justify-center h-full">
        <span className="text-[var(--c-text-secondary)] uppercase text-[10px] whitespace-nowrap">{label}</span>
        {value && <span className={`text-[var(--c-text-main)] ${valueBold ? 'font-bold' : 'font-medium'} whitespace-nowrap`}>{value}</span>}
    </div>
);

export const ClientCard: React.FC<ClientCardProps> = ({ client, onSelectClient }) => {
    return (
        <div onClick={() => onSelectClient(client)} className="bg-[var(--c-bg-card)] rounded-xl p-4 shadow-lg border border-[var(--c-border-color)] flex flex-col space-y-3 cursor-pointer hover:border-[var(--c-accent-focus)] transition-colors duration-200">
            <h3 className="font-semibold text-[var(--c-text-main)] text-center text-lg mb-1">{client.name}</h3>
            
            <div className="grid grid-cols-2 gap-2">
                <InfoItem label="RECEITA MENSAL:" value={client.monthlyRevenue} />
                <InfoItem label="DATA INÍCIO:" value={client.startDate} />
                <InfoItem label="PRAZO CONTRATO:" value={client.contractTerm} />
                <InfoItem label="PLANO:" value={client.planName} valueBold={true} />
                <div className="col-span-2">
                    <InfoItem label="FATURA:" value={client.billingStatus} />
                </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
                {client.stats.map((stat, index) => (
                    <div key={index} className={`${stat.color} p-2 rounded-md text-center text-white flex flex-col justify-center`}>
                        <p className="text-lg font-bold">{stat.value}</p>
                        <p className="text-xs font-semibold uppercase leading-tight" dangerouslySetInnerHTML={{ __html: stat.label.replace('<br/>', ' ') }}></p>
                         {stat.subLabel && <p className="text-[10px] opacity-80">{stat.subLabel}</p>}
                    </div>
                ))}
            </div>

            <div className="bg-[var(--c-accent-dunner)] text-[var(--c-bg-body)] p-2 rounded-md text-center">
                <p className="text-xs font-bold">RESULTADO BRUTO FUNIL</p>
                <p className="text-2xl font-bold">{client.grossProfit}</p>
            </div>
        </div>
    );
};