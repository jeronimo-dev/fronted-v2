import React from 'react';
import { Lead, LeadQualificationStatus, BuyerJourney, LeadColumnStatus } from '../types';

interface LeadCardProps {
    lead: Lead;
    onSelectLead: (lead: Lead) => void;
}

const getQualificationBorder = (qualification: LeadQualificationStatus) => {
    switch (qualification) {
        case LeadQualificationStatus.ALTA:
            return 'border-l-red-500';
        case LeadQualificationStatus.BAIXA:
            return 'border-l-blue-500';
        case LeadQualificationStatus.NAO_QUALIFICADO:
            return 'border-l-yellow-500';
        case LeadQualificationStatus.DESQUALIFICADO:
            return 'border-l-gray-500';
        default:
            return 'border-l-gray-400';
    }
};

const getJourneyColor = (journey: BuyerJourney | null) => {
    switch (journey) {
        case BuyerJourney.J1:
            return 'bg-blue-500';
        case BuyerJourney.J2:
            return 'bg-yellow-500';
        case BuyerJourney.J3:
            return 'bg-red-500';
        default:
            return 'bg-gray-400';
    }
};

const formatTimeAgo = (date: Date): string => {
    const now = new Date();
    const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    let interval = seconds / 31536000;
    if (interval > 1) return `há ${Math.floor(interval)} anos`;
    
    interval = seconds / 2592000;
    if (interval > 1) return `há ${Math.floor(interval)} meses`;

    interval = seconds / 86400;
    if (interval > 1) return `há ${Math.floor(interval)} dias`;
    
    interval = seconds / 3600;
    if (interval > 1) return `há ${Math.floor(interval)} horas`;
    
    interval = seconds / 60;
    if (interval > 1) return `há ${Math.floor(interval)} minutos`;
    
    return `há ${Math.floor(seconds)} segundos`;
};

export const LeadCard: React.FC<LeadCardProps> = ({ lead, onSelectLead }) => {
    const journeyColor = getJourneyColor(lead.buyerJourney);
    
    let borderColor;
    if (lead.status === LeadColumnStatus.VENDA_CONCLUIDA) {
        borderColor = 'border-l-green-500';
    } else if (lead.status === LeadColumnStatus.VENDAS_PERDIDAS) {
        borderColor = 'border-l-white';
    } else {
        borderColor = getQualificationBorder(lead.qualification);
    }

    return (
        <div 
            onClick={() => onSelectLead(lead)}
            className={`bg-[var(--c-bg-input)] p-3 rounded-md shadow-md border-l-4 ${borderColor} cursor-pointer hover:bg-white/5 transition-colors duration-200`}
        >
            <div className="flex justify-between items-start">
                <div>
                    <h3 className="font-semibold text-base text-[var(--c-text-main)]">{lead.name}</h3>
                    <p className="text-xs text-[var(--c-text-secondary)]">Captado {formatTimeAgo(lead.capturedAt)}</p>
                </div>
                {lead.buyerJourney && (
                    <div className={`${journeyColor} text-white text-xs font-bold px-2 py-1 rounded`}>
                        Buyer Journey {lead.buyerJourney}
                    </div>
                )}
            </div>
            
            <div className="mt-3">
                <p className="text-sm text-[var(--c-text-main)]">
                    <span className="text-[var(--c-text-secondary)]">Capacidade:</span> {lead.paymentCapacity}
                </p>
            </div>

            <div className="mt-3 border-t border-[var(--c-border-color)]/50 pt-2 flex justify-end">
                 <button className="bg-transparent border border-[var(--c-accent-action)] text-[var(--c-accent-action)] text-xs font-bold py-1 px-3 rounded hover:bg-[var(--c-accent-action)]/10">
                    ACESSAR TASKTALK
                </button>
            </div>
        </div>
    );
};