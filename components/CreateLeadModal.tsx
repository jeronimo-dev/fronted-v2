import React, { useState } from 'react';
import { Lead, LeadColumnStatus, BuyerJourney, LeadQualificationStatus } from '../types';

interface CreateLeadModalProps {
    onClose: () => void;
    onSubmit: (lead: Omit<Lead, 'id'>) => void;
}

const qualificationOptions = {
    motivation: [
        'Já tentou várias agências sem resultado',
        'Buscando a primeira agência de marketing',
        'Insatisfeito com os resultados atuais',
        'Quer expandir para novos mercados'
    ],
    origin: [
        'Indicação',
        'Google',
        'Instagram',
        'Evento'
    ],
    paymentCapacity: [
        'Até R$ 2 mil',
        'Entre R$ 2 mil e R$ 5 mil',
        'Entre R$ 5 mil e 10 mil',
        'Acima de R$ 10 mil'
    ],
    buyerJourney: [
        { label: "1 - Curioso, buscando informações iniciais", value: BuyerJourney.J1 },
        { label: "2 - Já sabe o que precisa, comparando opções", value: BuyerJourney.J2 },
        { label: "3 - Pronto para contratar, buscando a melhor proposta", value: BuyerJourney.J3 },
    ],
};

const getQualificationStatus = (capacity: string, journey: BuyerJourney | null): LeadQualificationStatus => {
    if (capacity === 'Até R$ 2 mil') {
        return LeadQualificationStatus.DESQUALIFICADO;
    }
    if (!capacity || !journey) {
        return LeadQualificationStatus.NAO_QUALIFICADO;
    }
    if (journey === BuyerJourney.J1) {
        return LeadQualificationStatus.BAIXA;
    }
    return LeadQualificationStatus.ALTA;
};

export const CreateLeadModal: React.FC<CreateLeadModalProps> = ({ onClose, onSubmit }) => {
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        motivation: qualificationOptions.motivation[0],
        origin: qualificationOptions.origin[0],
        paymentCapacity: qualificationOptions.paymentCapacity[0],
        buyerJourney: BuyerJourney.J1,
        interactions: ''
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: name === 'buyerJourney' ? Number(value) : value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const qualification = getQualificationStatus(formData.paymentCapacity, formData.buyerJourney);

        const newLeadData: Omit<Lead, 'id'> = {
            name: formData.name,
            capturedAt: new Date(),
            status: LeadColumnStatus.NOVAS_OPORTUNIDADES,
            qualification,
            phone: formData.phone,
            email: formData.email,
            motivation: formData.motivation,
            origin: formData.origin,
            paymentCapacity: formData.paymentCapacity,
            buyerJourney: formData.buyerJourney,
            contactAttempts: { first: false, second: false, third: false },
            meetingScheduled: null,
            proposalSent: 'NÃO',
            interactions: formData.interactions,
            history: [{
                timestamp: new Date().toLocaleString('pt-BR'),
                description: 'Lead cadastrado manualmente no sistema.'
            }]
        };
        onSubmit(newLeadData);
    };

    return (
         <div
            className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4 transition-opacity animate-fade-in-up"
            onClick={onClose}
        >
            <form
                onSubmit={handleSubmit}
                className="bg-[var(--c-bg-card)] shadow-2xl rounded-lg p-6 w-full max-w-4xl relative"
                onClick={(e) => e.stopPropagation()}
            >
                <button type="button" onClick={onClose} className="absolute top-4 right-4 text-[var(--c-text-secondary)] hover:text-[var(--c-text-main)]">
                    <span className="material-icons-outlined text-3xl">close</span>
                </button>

                <h2 className="text-2xl font-bold text-center mb-6 text-[var(--c-text-main)] tracking-wide">
                    <input type="text" name="name" value={formData.name} onChange={handleInputChange} required className="text-center bg-transparent w-full outline-none focus:ring-2 focus:ring-[var(--c-accent-focus)] rounded-md" placeholder="Digite o nome do lead" />
                </h2>

                <div className="space-y-4">
                    {/* Contatos */}
                    <div className="border-b border-[var(--c-border-color)]/50 py-4">
                        <h3 className="text-sm font-semibold uppercase text-[var(--c-text-secondary)] mb-3 tracking-wider">Contatos</h3>
                        <div className="grid grid-cols-2 gap-4">
                            <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} required className="w-full bg-[var(--c-bg-input)] border border-[var(--c-border-color)] p-2 rounded-md" placeholder="Digite o número de telefone do lead"/>
                            <input type="email" name="email" value={formData.email} onChange={handleInputChange} required className="w-full bg-[var(--c-bg-input)] border border-[var(--c-border-color)] p-2 rounded-md" placeholder="Digite o e-mail do lead"/>
                        </div>
                    </div>

                    {/* Qualificação */}
                     <div className="border-b border-[var(--c-border-color)]/50 py-4">
                        <h3 className="text-sm font-semibold uppercase text-[var(--c-text-secondary)] mb-3 tracking-wider">Qualificação</h3>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                            <select name="motivation" value={formData.motivation} onChange={handleInputChange} className="w-full bg-[var(--c-bg-input)] border border-[var(--c-border-color)] p-2 rounded-md custom-select-arrow">
                                {qualificationOptions.motivation.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                            </select>
                            <select name="origin" value={formData.origin} onChange={handleInputChange} className="w-full bg-[var(--c-bg-input)] border border-[var(--c-border-color)] p-2 rounded-md custom-select-arrow">
                                {qualificationOptions.origin.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                            </select>
                            <select name="paymentCapacity" value={formData.paymentCapacity} onChange={handleInputChange} className="w-full bg-[var(--c-bg-input)] border border-[var(--c-border-color)] p-2 rounded-md custom-select-arrow">
                                {qualificationOptions.paymentCapacity.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                            </select>
                            <select name="buyerJourney" value={formData.buyerJourney} onChange={handleInputChange} className="w-full bg-[var(--c-bg-input)] border border-[var(--c-border-color)] p-2 rounded-md custom-select-arrow">
                                 {qualificationOptions.buyerJourney.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
                            </select>
                        </div>
                    </div>
                    
                    {/* Ações, Resumo, Histórico are hidden for creation */}
                    <div className="text-center text-xs text-[var(--c-text-secondary)]">
                        Ações, Resumo e Histórico serão habilitados após a criação do lead.
                    </div>

                    <div className="flex justify-center space-x-4 py-4">
                        <button type="submit" className="bg-green-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-green-700">SALVAR LEAD</button>
                        <button type="button" onClick={onClose} className="bg-red-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-red-700">CANCELAR</button>
                    </div>
                </div>
            </form>
        </div>
    );
};
