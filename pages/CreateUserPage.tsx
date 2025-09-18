import React, { useState } from 'react';
import type { Page, UserRole } from '../types';

interface CreateUserPageProps {
    onNavigate: (page: Page) => void;
}

const CreateUserPage: React.FC<CreateUserPageProps> = ({ onNavigate }) => {
    const [name, setName] = useState('');
    const [taskName, setTaskName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [role, setRole] = useState<UserRole>('User');

    const handleSave = (e: React.FormEvent) => {
        e.preventDefault();
        // Here you would typically handle form submission, e.g., API call
        console.log({ name, taskName, email, phone, role });
        alert('Colaborador salvo!');
        onNavigate('users');
    };

    const handleCancel = () => {
        onNavigate('users');
    };

    return (
        <main className="flex-1 p-4 md:p-6" style={{ fontFamily: "'Inter', sans-serif" }}>
            <div className="bg-[var(--c-bg-card)] rounded-xl p-6 relative border border-[var(--c-border-color)]">
                <button onClick={handleCancel} className="absolute top-4 right-4 text-[var(--c-text-secondary)] hover:text-[var(--c-text-main)]">
                    <span className="material-icons text-3xl">close</span>
                </button>
                <h3 className="text-center text-lg font-semibold mb-6 text-[var(--c-text-main)] font-neue-machina">
                    PERFIS E USUÁRIOS DO SISTEMA: NOVO COLABORADOR
                </h3>
                <form onSubmit={handleSave}>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Form Section */}
                        <div className="lg:col-span-2 bg-[var(--c-bg-body)] rounded-lg p-6 border border-[var(--c-border-color)]">
                            <h4 className="text-xl font-semibold text-[var(--c-text-main)] mb-6">Dados do Colaborador</h4>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-[var(--c-text-secondary)] mb-1" htmlFor="nome">Nome Completo:</label>
                                    <input value={name} onChange={e => setName(e.target.value)} className="form-input w-full p-2 rounded-md text-white bg-[var(--c-bg-input)] border border-[var(--c-border-color)] focus:ring-2 focus:ring-[var(--c-accent-focus)] focus:outline-none" id="nome" placeholder="Digite o nome completo do colaborador" type="text" required />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-[var(--c-text-secondary)] mb-1" htmlFor="taskName">Taskname:</label>
                                    <input value={taskName} onChange={e => setTaskName(e.target.value)} className="form-input w-full p-2 rounded-md text-white bg-[var(--c-bg-input)] border border-[var(--c-border-color)] focus:ring-2 focus:ring-[var(--c-accent-focus)] focus:outline-none" id="taskName" placeholder="Digite o apelido do colaborador" type="text" required />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-[var(--c-text-secondary)] mb-1" htmlFor="email">Email de Acesso</label>
                                    <input value={email} onChange={e => setEmail(e.target.value)} className="form-input w-full p-2 rounded-md text-white bg-[var(--c-bg-input)] border border-[var(--c-border-color)] focus:ring-2 focus:ring-[var(--c-accent-focus)] focus:outline-none" id="email" type="email" placeholder="exemplo@taskdun.com.br" required />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-[var(--c-text-secondary)] mb-1" htmlFor="phone">Telefone:</label>
                                    <input value={phone} onChange={e => setPhone(e.target.value)} className="form-input w-full p-2 rounded-md text-white bg-[var(--c-bg-input)] border border-[var(--c-border-color)] focus:ring-2 focus:ring-[var(--c-accent-focus)] focus:outline-none" id="phone" type="tel" placeholder="(00) 90000-0000" required />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-[var(--c-text-secondary)] mb-1" htmlFor="role">Papel:</label>
                                    <select value={role} onChange={e => setRole(e.target.value as UserRole)} className="form-select w-full p-2 rounded-md text-white appearance-none bg-[var(--c-bg-input)] border border-[var(--c-border-color)] focus:ring-2 focus:ring-[var(--c-accent-focus)] focus:outline-none custom-select-arrow" id="role" required>
                                        <option value="User">User</option>
                                        <option value="Agent">Agent</option>
                                        <option value="Master">Master</option>
                                    </select>
                                </div>
                                <div className="flex justify-end gap-4 pt-4 border-t border-[var(--c-border-color)]">
                                    <button onClick={handleCancel} className="bg-[var(--c-bg-card)] hover:bg-opacity-80 px-6 py-2 rounded-md" type="button">Cancelar</button>
                                    <button className="bg-[var(--c-accent-action)] text-[var(--c-bg-body)] font-semibold hover:bg-opacity-80 px-6 py-2 rounded-md" type="submit">Salvar</button>
                                </div>
                            </div>
                        </div>

                        {/* Disabled Metrics Section */}
                        <div className="lg:col-span-1 space-y-6">
                            <div className="bg-[var(--c-bg-body)] rounded-lg p-6 opacity-50 border border-[var(--c-border-color)]">
                                <h4 className="text-xl font-semibold mb-4 text-[var(--c-text-main)]">Produtividade</h4>
                                <div className="space-y-3">
                                    {['TASKS TOTAL:', 'TASKS NO PRAZO:', 'TASKS EM ATRASO:', 'TASKS CANCELADAS:', 'TASKDUN:'].map(label => (
                                        <div key={label} className="flex justify-between items-center p-3 bg-[var(--c-bg-input)] rounded-md border border-[var(--c-border-color)]">
                                            <span className="text-[var(--c-text-main)]">{label}</span>
                                            <span className="text-[var(--c-text-main)]">-</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                             <div className="bg-[var(--c-bg-body)] rounded-lg p-6 opacity-50 border border-[var(--c-border-color)]">
                                <h3 className="text-xl font-bold mb-4 text-[var(--c-text-main)]">Aderência</h3>
                                <div className="w-full bg-[var(--c-bg-sidebar)] rounded-full h-2.5">
                                    <div className="bg-cyan-400 h-2.5 rounded-full" style={{width: '0%'}}></div>
                                </div>
                            </div>
                             <div className="bg-[var(--c-bg-body)] rounded-lg p-6 opacity-50 border border-[var(--c-border-color)]">
                                <h3 className="text-xl font-bold mb-4 text-[var(--c-text-main)]">Eficácia</h3>
                                <div className="w-full bg-[var(--c-bg-sidebar)] rounded-full h-2.5">
                                    <div className="bg-orange-400 h-2.5 rounded-full" style={{width: '0%'}}></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
             <footer className="text-center p-4 text-sm text-[var(--c-text-secondary)] flex-shrink-0 mt-4">
                Dun with ❤️ to make your business even better Taskdun ®
            </footer>
        </main>
    );
};

export default CreateUserPage;