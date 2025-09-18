import React, { useState, useEffect } from 'react';
import { TeamUser, UserRole } from '../types';

interface ProfileModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (user: TeamUser) => void;
    user: TeamUser | null;
}

export const ProfileModal: React.FC<ProfileModalProps> = ({ isOpen, onClose, onSave, user }) => {
    const [formData, setFormData] = useState<TeamUser | null>(user);

    useEffect(() => {
        setFormData(user);
    }, [user]);

    if (!isOpen || !formData) {
        return null;
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => prev ? { ...prev, [name]: value } : null);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (formData) {
            onSave(formData);
        }
    };

    return (
        <div 
            className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4 animate-fade-in-up" 
            style={{ fontFamily: "'Inter', sans-serif" }}
            onClick={onClose}
        >
            <div 
                className="bg-[var(--c-bg-card)] rounded-xl p-6 relative shadow-2xl border border-[var(--c-border-color)] w-full max-w-lg"
                onClick={(e) => e.stopPropagation()}
            >
                <button onClick={onClose} className="absolute top-4 right-4 text-[var(--c-text-secondary)] hover:text-[var(--c-text-main)]">
                    <span className="material-icons text-3xl">close</span>
                </button>
                <h3 className="text-center text-lg font-semibold mb-6 text-[var(--c-text-main)] font-neue-machina">
                    EDITAR PERFIL DO COLABORADOR
                </h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-[var(--c-text-secondary)] mb-1" htmlFor="name">Nome Completo:</label>
                        <input id="name" name="name" type="text" value={formData.name} onChange={handleInputChange} required className="w-full bg-[var(--c-bg-input)] border border-[var(--c-border-color)] text-[var(--c-text-main)] p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--c-accent-focus)]" />
                    </div>
                     <div>
                        <label className="block text-sm font-medium text-[var(--c-text-secondary)] mb-1" htmlFor="taskName">Taskname:</label>
                        <input id="taskName" name="taskName" type="text" value={formData.taskName} onChange={handleInputChange} required className="w-full bg-[var(--c-bg-input)] border border-[var(--c-border-color)] text-[var(--c-text-main)] p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--c-accent-focus)]" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-[var(--c-text-secondary)] mb-1" htmlFor="email">Email de Acesso</label>
                        <input id="email" name="email" type="email" value={formData.email} onChange={handleInputChange} required className="w-full bg-[var(--c-bg-input)] border border-[var(--c-border-color)] text-[var(--c-text-main)] p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--c-accent-focus)]" />
                    </div>
                     <div>
                        <label className="block text-sm font-medium text-[var(--c-text-secondary)] mb-1" htmlFor="phone">Telefone:</label>
                        <input id="phone" name="phone" type="tel" value={formData.phone} onChange={handleInputChange} required className="w-full bg-[var(--c-bg-input)] border border-[var(--c-border-color)] text-[var(--c-text-main)] p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--c-accent-focus)]" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-[var(--c-text-secondary)] mb-1" htmlFor="role">Papel:</label>
                        <select id="role" name="role" value={formData.role} onChange={handleInputChange} required className="w-full appearance-none bg-[var(--c-bg-input)] border border-[var(--c-border-color)] text-[var(--c-text-main)] p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--c-accent-focus)] custom-select-arrow">
                            <option value="User">User</option>
                            <option value="Agent">Agent</option>
                            <option value="Master">Master</option>
                        </select>
                    </div>
                    <div className="flex justify-end items-center gap-4 pt-4 border-t border-[var(--c-border-color)]/30">
                        <button type="button" onClick={onClose} className="bg-[var(--c-bg-body)] text-[var(--c-text-main)] font-semibold hover:bg-[var(--c-border-color)] px-6 py-2 rounded-lg transition-colors">
                            Cancelar
                        </button>
                        <button type="submit" className="bg-[var(--c-accent-action)] text-[var(--c-bg-body)] font-bold py-2 px-6 rounded-lg flex items-center space-x-2 hover:bg-opacity-80 transition-opacity">
                            <span className="material-icons text-xl">save</span>
                            <span>Salvar</span>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};