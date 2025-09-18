import React, { useState } from 'react';
import type { Client } from '../types';
import { OnboardingStatus } from '../types';

interface CreateClientPageProps {
    onClose: () => void;
    onAddClient: (client: Omit<Client, 'id'>) => void;
}

export const CreateClientPage: React.FC<CreateClientPageProps> = ({ onClose, onAddClient }) => {
    const [formData, setFormData] = useState({
        name: '',
        manager: '',
        contact: '',
        monthlyRevenue: '',
        startDate: '',
        contractTerm: '',
        planName: 'FUNNEL',
        billingStatus: 'PENDENTE' as 'PAGA' | 'PENDENTE',
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };
    
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const newClient: Omit<Client, 'id'> = {
            ...formData,
            grossProfit: '0,00', 
            stats: [
                { value: '0', label: 'CONTATOS', color: 'bg-blue-600' },
                { value: '0,00', label: 'TICKET MÉDIO', color: 'bg-pink-600' },
                { value: '0', label: 'QUALIFICADOS', color: 'bg-green-600' },
                { value: '0', label: 'INVESTIMENTO ADS', color: 'bg-red-600' },
                { value: '0', label: 'CONVERSÕES', color: 'bg-lime-500' },
                { value: '0', label: 'R.O.I.', color: 'bg-orange-500' },
            ],
            taskloaderStatus: OnboardingStatus.NAO_ACESSADO,
            infoStatus: {
                arquivos: OnboardingStatus.NAO_ACESSADO,
                acessos: OnboardingStatus.NAO_ACESSADO,
                contrato: OnboardingStatus.NAO_ACESSADO,
                design: OnboardingStatus.NAO_ACESSADO,
            },
        };
        onAddClient(newClient);
    };

    return (
        <div 
            className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4 animate-fade-in-up" 
            style={{ fontFamily: "'Inter', sans-serif" }}
            onClick={onClose}
        >
            <div 
                className="bg-[var(--c-bg-card)] rounded-xl p-8 relative shadow-2xl border border-[var(--c-border-color)] w-full max-w-4xl"
                onClick={(e) => e.stopPropagation()}
            >
                <header className="flex justify-between items-center mb-8">
                    <h2 className="text-3xl font-bold text-white tracking-wider font-neue-machina">INCLUIR NOVO CLIENTE</h2>
                    <button onClick={onClose} className="text-[var(--c-text-secondary)] hover:text-[var(--c-text-main)]">
                        <span className="material-icons text-4xl">close</span>
                    </button>
                </header>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                        {/* Column 1 */}
                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-[var(--c-text-secondary)] mb-1" htmlFor="name">Nome do Cliente:</label>
                                <input id="name" name="name" type="text" value={formData.name} onChange={handleInputChange} required className="w-full bg-[var(--c-bg-input)] border border-[var(--c-border-color)] text-[var(--c-text-main)] p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--c-accent-focus)]" placeholder="Ex: Estética Plena" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-[var(--c-text-secondary)] mb-1" htmlFor="manager">Nome do Gestor:</label>
                                <input id="manager" name="manager" type="text" value={formData.manager} onChange={handleInputChange} required className="w-full bg-[var(--c-bg-input)] border border-[var(--c-border-color)] text-[var(--c-text-main)] p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--c-accent-focus)]" placeholder="Ex: Maria da Silva" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-[var(--c-text-secondary)] mb-1" htmlFor="contact">Contato (Whatsapp):</label>
                                <input id="contact" name="contact" type="tel" value={formData.contact} onChange={handleInputChange} required className="w-full bg-[var(--c-bg-input)] border border-[var(--c-border-color)] text-[var(--c-text-main)] p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--c-accent-focus)]" placeholder="(00) 90000-0000" />
                            </div>
                             <div>
                                <label className="block text-sm font-medium text-[var(--c-text-secondary)] mb-1" htmlFor="monthlyRevenue">Receita Mensal:</label>
                                <input id="monthlyRevenue" name="monthlyRevenue" type="text" value={formData.monthlyRevenue} onChange={handleInputChange} required className="w-full bg-[var(--c-bg-input)] border border-[var(--c-border-color)] text-[var(--c-text-main)] p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--c-accent-focus)]" placeholder="R$ +0.000,00" />
                            </div>
                        </div>

                        {/* Column 2 */}
                        <div className="space-y-6">
                             <div>
                                <label className="block text-sm font-medium text-[var(--c-text-secondary)] mb-1" htmlFor="startDate">Data de Início:</label>
                                <input id="startDate" name="startDate" type="text" value={formData.startDate} onChange={handleInputChange} required className="w-full bg-[var(--c-bg-input)] border border-[var(--c-border-color)] text-[var(--c-text-main)] p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--c-accent-focus)]" placeholder="DD/MM/AAAA" />
                            </div>
                             <div>
                                <label className="block text-sm font-medium text-[var(--c-text-secondary)] mb-1" htmlFor="contractTerm">Prazo do Contrato:</label>
                                <input id="contractTerm" name="contractTerm" type="text" value={formData.contractTerm} onChange={handleInputChange} required className="w-full bg-[var(--c-bg-input)] border border-[var(--c-border-color)] text-[var(--c-text-main)] p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--c-accent-focus)]" placeholder="Ex: 12 MESES" />
                            </div>
                             <div>
                                <label className="block text-sm font-medium text-[var(--c-text-secondary)] mb-1" htmlFor="planName">Nome do Plano:</label>
                                <input id="planName" name="planName" type="text" value={formData.planName} onChange={handleInputChange} required className="w-full bg-[var(--c-bg-input)] border border-[var(--c-border-color)] text-[var(--c-text-main)] p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--c-accent-focus)]" placeholder="Ex: FUNNEL" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-[var(--c-text-secondary)] mb-1" htmlFor="billingStatus">Status da Fatura:</label>
                                <select id="billingStatus" name="billingStatus" value={formData.billingStatus} onChange={handleInputChange} required className="w-full appearance-none bg-[var(--c-bg-input)] border border-[var(--c-border-color)] text-[var(--c-text-main)] py-3 px-4 pr-8 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[var(--c-accent-focus)] custom-select-arrow">
                                    <option value="PENDENTE">Pendente</option>
                                    <option value="PAGA">Paga</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-end items-center gap-4 pt-6 border-t border-[var(--c-border-color)]/30">
                        <button type="button" onClick={onClose} className="bg-transparent text-[var(--c-text-secondary)] font-semibold hover:text-[var(--c-text-main)] px-8 py-3 rounded-lg transition-colors">
                            Cancelar
                        </button>
                        <button type="submit" className="bg-[var(--c-accent-action)] text-[var(--c-bg-body)] font-bold py-3 px-8 rounded-lg flex items-center space-x-2 hover:bg-opacity-80 transition-opacity shadow-lg hover:shadow-xl">
                            <span className="material-icons">save</span>
                            <span>Salvar Cliente</span>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};