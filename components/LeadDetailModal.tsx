import React, { useState } from 'react';
import { Lead, LeadHistoryItem, LeadColumnStatus } from '../types';

interface LeadDetailModalProps {
    lead: Lead;
    onClose: () => void;
    onUpdateLead: (lead: Lead) => void;
}

const InfoSection: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <div className="border-b border-[var(--c-border-color)]/50 py-4">
        <h3 className="text-sm font-semibold uppercase text-[var(--c-text-secondary)] mb-3 tracking-wider">{title}</h3>
        {children}
    </div>
);

const HistoryItem: React.FC<{ item: { timestamp: string, description: string } }> = ({ item }) => (
    <div className="flex items-start space-x-3">
        <div className="text-right">
            <p className="text-xs text-[var(--c-text-secondary)] whitespace-nowrap">{item.timestamp.split(' ')[0]}</p>
            <p className="text-xs text-[var(--c-text-secondary)] whitespace-nowrap">{item.timestamp.split(' ')[2]}</p>
        </div>
        <div className="flex-shrink-0 w-3 h-3 bg-[var(--c-border-color)] rounded-full mt-1 border-2 border-[var(--c-bg-card)]"></div>
        <p className="text-sm text-[var(--c-text-main)]">{item.description}</p>
    </div>
);

const ActionPopup: React.FC<{ message: string; icon?: string }> = ({ message, icon }) => (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[100]">
        <div className="bg-white/90 backdrop-blur-sm text-black rounded-lg p-8 shadow-2xl text-center animate-fade-in-up flex flex-col items-center gap-4">
            {icon && <span className="material-icons text-5xl text-green-500">{icon}</span>}
            <p className="text-2xl font-semibold">{message}</p>
        </div>
    </div>
);

export const LeadDetailModal: React.FC<LeadDetailModalProps> = ({ lead, onClose, onUpdateLead }) => {
    const [editedLead, setEditedLead] = useState<Lead>(lead);
    const [newInteraction, setNewInteraction] = useState('');
    
    const [saleState, setSaleState] = useState<'idle' | 'inputting'>('idle');
    const [saleValue, setSaleValue] = useState('');
    
    const [lostState, setLostState] = useState<'idle' | 'inputting'>('idle');
    const [lostReason, setLostReason] = useState('');

    const [popup, setPopup] = useState<{show: boolean, message: string, icon?: string}>({show: false, message: ''});
    
    const userName = "Marcos"; // Hardcoded user name as requested

    const addHistoryItem = (description: string, currentLeadState: Lead): Lead => {
        const newHistoryItem: LeadHistoryItem = {
            timestamp: new Date().toLocaleString('pt-BR', { dateStyle: 'short', timeStyle: 'short' }).replace(',', ''),
            description,
        };
        return {
            ...currentLeadState,
            history: [...currentLeadState.history, newHistoryItem]
        };
    };

    const handleContactAttemptChange = (attempt: 'first' | 'second' | 'third') => {
        const currentAttempts = editedLead.contactAttempts;
        const newAttempts = { ...currentAttempts, [attempt]: !currentAttempts[attempt] };
        
        let updatedLead: Lead = { ...editedLead, contactAttempts: newAttempts };

        if (newAttempts[attempt]) { // only log when checkbox is checked
            updatedLead = addHistoryItem(`${userName} efetuou a ${attempt === 'first' ? '1ª' : attempt === 'second' ? '2ª' : '3ª'} tentativa de contato com o lead.`, updatedLead);
        }
        
        setEditedLead(updatedLead);
        onUpdateLead(updatedLead);
    };

    const handleProposalChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value as 'SIM' | 'NÃO';
        let updatedLead: Lead = { ...editedLead, proposalSent: value };

        if (value === 'SIM' && lead.proposalSent === 'NÃO') {
            updatedLead = addHistoryItem(`${userName} enviou uma proposta para o lead.`, updatedLead);
        }

        setEditedLead(updatedLead);
        onUpdateLead(updatedLead);
    };
    
    const handleUploadProposal = () => {
        const updatedLead = addHistoryItem(`${userName} importou a proposta.`, editedLead);
        setEditedLead(updatedLead);
        onUpdateLead(updatedLead);
    };

    const handleAddInteraction = () => {
        if (!newInteraction.trim()) return;
        const updatedLead = addHistoryItem(newInteraction, editedLead);
        setEditedLead(updatedLead);
        onUpdateLead(updatedLead);
        setNewInteraction('');
    };

    const handleSaleConcluded = () => {
        if (!saleValue) return;
        let finalLead: Lead = {
            ...editedLead,
            status: LeadColumnStatus.VENDA_CONCLUIDA,
            saleValue: parseFloat(saleValue)
        };
        finalLead = addHistoryItem(`${userName} concluíu a venda no total de R$ ${parseFloat(saleValue).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}.`, finalLead);

        onUpdateLead(finalLead);
        setPopup({ show: true, message: `Parabéns ${userName}! Vender é uma arte!`, icon: 'attach_money' });
        setTimeout(() => {
            setPopup({ show: false, message: '' });
            onClose();
        }, 3000);
    };
    
    const handleSaleLost = () => {
        if (!lostReason.trim()) return;
        let finalLead: Lead = {
            ...editedLead,
            status: LeadColumnStatus.VENDAS_PERDIDAS,
            lostReason: lostReason
        };
        finalLead = addHistoryItem(`Cliente desistiu da proposta devido a: ${lostReason}.`, finalLead);

        onUpdateLead(finalLead);
        setPopup({ show: true, message: `Não desanime ${userName}! Persistência é o que mais importa. Pra cima!` });
        setTimeout(() => {
            setPopup({ show: false, message: '' });
            onClose();
        }, 3000);
    };


    return (
        <div
            className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4 transition-opacity animate-fade-in-up"
            onClick={onClose}
        >
            {popup.show && <ActionPopup message={popup.message} icon={popup.icon} />}
            <div
                className="bg-[var(--c-bg-card)] shadow-2xl rounded-lg p-6 w-full max-w-4xl relative"
                onClick={(e) => e.stopPropagation()}
            >
                <button onClick={onClose} className="absolute top-4 right-4 text-[var(--c-text-secondary)] hover:text-[var(--c-text-main)]">
                    <span className="material-icons-outlined text-3xl">close</span>
                </button>

                <h2 className="text-2xl font-bold text-center mb-6 text-[var(--c-text-main)] tracking-wide">{editedLead.name}</h2>
                
                <div className="space-y-4">
                    <InfoSection title="Contatos">
                        <div className="flex items-center justify-between">
                            <div>
                                <p><span className="font-semibold text-[var(--c-text-secondary)]">FONE / WHATSAPP:</span> {editedLead.phone}</p>
                                <p><span className="font-semibold text-[var(--c-text-secondary)]">E-MAIL:</span> {editedLead.email}</p>
                            </div>
                            <button className="bg-gray-700 text-white font-bold py-2 px-4 rounded-lg hover:bg-gray-600">
                                ACESSAR TASK TALK
                            </button>
                        </div>
                    </InfoSection>

                    <InfoSection title="Qualificação">
                        <div className="grid grid-cols-2 gap-4 text-sm">
                            <div><span className="font-semibold text-[var(--c-text-secondary)]">MOTIVO/DESAFIO:</span> <span className="bg-[var(--c-bg-input)] p-2 rounded-md inline-block">{editedLead.motivation}</span></div>
                            <div><span className="font-semibold text-[var(--c-text-secondary)]">ORIGEM:</span> <span className="bg-[var(--c-bg-input)] p-2 rounded-md inline-block">{editedLead.origin}</span></div>
                            <div><span className="font-semibold text-[var(--c-text-secondary)]">CAPACIDADE DE PAGAMENTO:</span> <span className="bg-[var(--c-bg-input)] p-2 rounded-md inline-block">{editedLead.paymentCapacity}</span></div>
                            <div>
                                <span className="font-semibold text-[var(--c-text-secondary)]">BUYER JOURNEY:</span> 
                                {editedLead.buyerJourney && <span className="bg-red-500 text-white font-bold p-2 rounded-md inline-flex items-center ml-2">{editedLead.buyerJourney}</span>}
                            </div>
                        </div>
                    </InfoSection>

                    <InfoSection title="Ações">
                        <div className="grid grid-cols-3 gap-4 items-start">
                             <div>
                                <span className="font-semibold text-[var(--c-text-secondary)] block mb-2">Tentativas de Contato:</span>
                                <div className="flex space-x-2">
                                    <label className="flex items-center cursor-pointer"><input type="checkbox" checked={editedLead.contactAttempts.first} onChange={() => handleContactAttemptChange('first')} className="form-checkbox h-5 w-5 text-green-500 bg-gray-700 border-gray-500 rounded focus:ring-green-500"/> <span className="ml-2">1ª</span></label>
                                    <label className="flex items-center cursor-pointer"><input type="checkbox" checked={editedLead.contactAttempts.second} onChange={() => handleContactAttemptChange('second')} className="form-checkbox h-5 w-5 text-green-500 bg-gray-700 border-gray-500 rounded focus:ring-green-500"/> <span className="ml-2">2ª</span></label>
                                    <label className="flex items-center cursor-pointer"><input type="checkbox" checked={editedLead.contactAttempts.third} onChange={() => handleContactAttemptChange('third')} className="form-checkbox h-5 w-5 text-green-500 bg-gray-700 border-gray-500 rounded focus:ring-green-500"/> <span className="ml-2">3ª</span></label>
                                </div>
                            </div>
                            <div className="text-center">
                                <span className="font-semibold text-[var(--c-text-secondary)]">Reunião Agendada:</span>
                                <p className="bg-[var(--c-bg-input)] p-2 rounded-md mt-1 h-[42px] flex items-center justify-center">{editedLead.meetingScheduled || 'N/A'}</p>
                                <button className="text-blue-400 font-bold mt-1 text-sm">ACESSAR AGENDA</button>
                            </div>
                             <div className="text-center">
                                <span className="font-semibold text-[var(--c-text-secondary)]">Proposta:</span>
                                 <select value={editedLead.proposalSent} onChange={handleProposalChange} className="w-full mt-1 bg-[var(--c-bg-input)] border border-[var(--c-border-color)] text-white p-2 rounded-md custom-select-arrow focus:ring-2 focus:ring-[var(--c-accent-focus)] outline-none">
                                    <option value="NÃO">Proposta Não Enviada</option>
                                    <option value="SIM">Proposta Enviada</option>
                                </select>
                                <button onClick={handleUploadProposal} className="text-blue-400 font-bold mt-1 text-sm">IMPORTAR PROPOSTA</button>
                            </div>
                        </div>
                        <div className="flex justify-center space-x-4 py-4 h-16 items-center mt-4 border-t border-[var(--c-border-color)]/50">
                            { saleState === 'idle' && lostState === 'idle' && (
                                <>
                                    <button onClick={() => setSaleState('inputting')} className="bg-green-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-green-700 transition-transform duration-300 ease-in-out">VENDA CONCLUÍDA</button>
                                    <button onClick={() => setLostState('inputting')} className="bg-red-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-red-700 transition-transform duration-300 ease-in-out">VENDA PERDIDA</button>
                                </>
                            )}

                            {saleState === 'inputting' && (
                                <div className="flex items-center gap-2 animate-fade-in-up">
                                <input value={saleValue} onChange={(e) => setSaleValue(e.target.value)} type="number" placeholder="Digite o valor da venda" className="bg-[var(--c-bg-input)] border border-[var(--c-border-color)] p-3 rounded-md w-64"/>
                                <button onClick={handleSaleConcluded} className="bg-green-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-green-700">Confirmar!</button>
                                <button onClick={() => setSaleState('idle')} className="text-xs text-gray-400">cancelar</button>
                                </div>
                            )}

                            {lostState === 'inputting' && (
                                <div className="flex items-center gap-2 animate-fade-in-up">
                                <input value={lostReason} onChange={(e) => setLostReason(e.target.value)} type="text" placeholder="Digite a justificativa" className="bg-[var(--c-bg-input)] border border-[var(--c-border-color)] p-3 rounded-md w-64"/>
                                <button onClick={handleSaleLost} className="bg-red-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-red-700">Enviar</button>
                                <button onClick={() => setLostState('idle')} className="text-xs text-gray-400">cancelar</button>
                                </div>
                            )}
                        </div>
                    </InfoSection>

                    <InfoSection title="Histórico">
                        <div className="space-y-4 max-h-40 overflow-y-auto custom-scrollbar pr-2">
                            {editedLead.history.slice().reverse().map((item, index) => <HistoryItem key={index} item={item} />)}
                        </div>
                        <div className="flex items-center gap-2 mt-4">
                            <input value={newInteraction} onChange={(e) => setNewInteraction(e.target.value)} type="text" placeholder="Adicionar nova interação..." className="flex-grow bg-[var(--c-bg-input)] border border-[var(--c-border-color)] p-2 rounded-md" onKeyDown={(e) => e.key === 'Enter' && handleAddInteraction()}/>
                            <button onClick={handleAddInteraction} className="bg-blue-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-700">Enviar</button>
                        </div>
                    </InfoSection>
                </div>
            </div>
        </div>
    );
};
