import React, { useState, useEffect } from 'react';
import type { Page } from '../types';

interface ProfilePageProps {
    onNavigate: (page: Page) => void;
}

const initialProfileData = {
  name: 'Jerônimo Souto Gonçalves',
  role: 'CEO',
  taskName: 'JERA',
  email: 'jeronimo@taskdun.com.br',
  quote: 'Nunca foi tão importante saber as perguntas a serem feitas.',
  avatarUrl: 'https://taskdun.com.br/wp-content/uploads/2025/07/Jeras.png',
  accessLevel: 'Administrador',
  functions: ['Gestão Estratégica', 'Análise PFD', 'Análise de Contratos', 'Gestão de Time'],
  productivity: { total: 15, onTime: 15, late: 0, canceled: 97, taskdun: 2 },
  adherence: 97,
  efficiency: 80,
};

const ProfilePage: React.FC<ProfilePageProps> = ({ onNavigate }) => {
    const [time, setTime] = useState(new Date());
    const [isEditing, setIsEditing] = useState(false);
    const [profile, setProfile] = useState(initialProfileData);
    const [formData, setFormData] = useState(initialProfileData);

    useEffect(() => {
        const timerId = setInterval(() => setTime(new Date()), 1000 * 60);
        return () => clearInterval(timerId);
    }, []);

    const handleEditToggle = () => {
        if (!isEditing) {
            setFormData(profile);
        }
        setIsEditing(!isEditing);
    };

    const handleCancel = () => {
        setIsEditing(false);
    };

    const handleSave = () => {
        setProfile(formData);
        setIsEditing(false);
    };

    const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleRemoveFunction = (funcToRemove: string) => {
        setFormData({
            ...formData,
            functions: formData.functions.filter(func => func !== funcToRemove)
        });
    }

    return (
        <div className="flex flex-col min-h-full font-inter" style={{ fontFamily: "'Inter', sans-serif" }}>
            <header className="p-4 flex justify-between items-center bg-[var(--c-bg-sidebar)] flex-shrink-0">
                <div>
                    <h2 className="text-2xl font-bold text-[var(--c-text-main)]">Olá John, tudo de vento em polpa, capitão!</h2>
                    <p className="text-sm text-[var(--c-text-secondary)]">Agora são <span className="text-[var(--c-accent-focus)]">{time.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}</span> (Brasília)</p>
                </div>
                <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1">
                        <span className="text-sm text-[var(--c-text-main)]">PT</span>
                        <span className="material-icons text-[var(--c-text-secondary)]">language</span>
                    </div>
                    <span className="material-icons text-[var(--c-text-secondary)]">notifications</span>
                </div>
            </header>
            
            <main className="flex-1 p-4 md:p-6">
                 <div className="bg-[var(--c-bg-card)] rounded-xl p-6 relative border border-[var(--c-border-color)]">
                    <button onClick={() => onNavigate('dashboard')} className="absolute top-4 right-4 text-[var(--c-text-secondary)] hover:text-[var(--c-text-main)]">
                        <span className="material-icons text-3xl">close</span>
                    </button>
                    <h3 className="text-center text-lg font-semibold mb-6 text-[var(--c-text-main)] font-neue-machina">
                        PERFIS E USUÁRIOS DO SISTEMA{isEditing && ': Edição'}
                    </h3>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Profile Card */}
                        <div className="bg-[var(--c-bg-body)] rounded-lg p-6 border border-[var(--c-border-color)]">
                             <div className="flex justify-between items-start mb-6">
                                <h4 className="text-xl font-semibold text-[var(--c-text-main)]">Meu Perfil</h4>
                                {!isEditing && (
                                    <button onClick={handleEditToggle} className="text-[var(--c-accent-focus)] underline font-semibold">Editar</button>
                                )}
                            </div>
                            
                            {isEditing ? (
                                /* EDIT MODE */
                                <div className="space-y-4">
                                    <div className="flex items-center mb-6">
                                        <div className="relative w-24 h-24 mr-6 shrink-0">
                                            <img alt="Foto de perfil" className="w-full h-full rounded-full object-cover" src={formData.avatarUrl}/>
                                            <button className="absolute bottom-0 right-0 text-xs text-[var(--c-accent-focus)] underline bg-black/50 px-1 rounded">Alterar Foto</button>
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-[var(--c-text-secondary)] mb-1">Nome Completo:</label>
                                        <input type="text" name="name" value={formData.name} onChange={handleFormChange} placeholder="Preencha o nome completo do colaborador" className="w-full bg-[var(--c-bg-input)] border border-[var(--c-border-color)] text-[var(--c-text-main)] p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--c-accent-focus)]" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-[var(--c-text-secondary)] mb-1">Cargo:</label>
                                        <input type="text" name="role" value={formData.role} onChange={handleFormChange} placeholder="Preencha o cargo do colaborador" className="w-full bg-[var(--c-bg-input)] border border-[var(--c-border-color)] text-[var(--c-text-main)] p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--c-accent-focus)]" />
                                    </div>
                                     <div>
                                        <label className="block text-sm font-medium text-[var(--c-text-secondary)] mb-1">E-mail Comercial:</label>
                                        <input type="email" name="email" value={formData.email} onChange={handleFormChange} placeholder="Preencha o e-mail do colaborador" className="w-full bg-[var(--c-bg-input)] border border-[var(--c-border-color)] text-[var(--c-text-main)] p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--c-accent-focus)]" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-[var(--c-text-secondary)] mb-1">Frase que Define:</label>
                                        <input name="quote" value={formData.quote} onChange={handleFormChange} placeholder="Preencha a frase que define o colaborador" className="w-full bg-[var(--c-bg-input)] border border-[var(--c-border-color)] text-[var(--c-text-main)] p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--c-accent-focus)]"></input>
                                    </div>
                                     <div>
                                        <label className="block text-sm font-medium text-[var(--c-text-secondary)] mb-1">TASKNAME:</label>
                                        <input type="text" name="taskName" value={formData.taskName} onChange={handleFormChange} placeholder="Preencha como o apelido do colaborador" className="w-full bg-[var(--c-bg-input)] border border-[var(--c-border-color)] text-[var(--c-text-main)] p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--c-accent-focus)]" />
                                    </div>
                                    <div className="mb-6">
                                        <label className="block text-sm font-medium text-[var(--c-text-secondary)] mb-1">Nível de acesso:</label>
                                        <select name="accessLevel" value={formData.accessLevel} onChange={handleFormChange} className="w-full appearance-none bg-[var(--c-bg-input)] border border-[var(--c-border-color)] text-[var(--c-text-main)] py-2 px-3 pr-8 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[var(--c-accent-focus)] custom-select-arrow">
                                            <option>Administrador</option>
                                            <option>Gerente</option>
                                            <option>Usuário</option>
                                        </select>
                                    </div>
                                     <div className="mb-6">
                                        <label className="block text-sm font-medium text-[var(--c-text-secondary)] mb-2">Funções:</label>
                                        <div className="flex flex-wrap gap-2 p-2 bg-[var(--c-bg-input)] border border-[var(--c-border-color)] rounded-md min-h-[40px]">
                                            {formData.functions.map(func => (
                                                <span key={func} className="bg-[var(--c-bg-sidebar)] text-[var(--c-text-main)] text-sm px-3 py-1 rounded-md flex items-center">
                                                    {func} <button onClick={() => handleRemoveFunction(func)} className="ml-2 text-[var(--c-text-secondary)] hover:text-[var(--c-text-main)] text-xs">x</button>
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                     <div>
                                        <label className="block text-sm font-medium text-[var(--c-text-secondary)] mb-2">Documentação Fornecida:</label>
                                        <button className="bg-[var(--c-bg-input)] border border-[var(--c-border-color)] text-[var(--c-text-main)] p-3 rounded-lg flex items-center space-x-2">
                                            <span className="material-icons">upload_file</span>
                                            <span>Importar Documentos</span>
                                        </button>
                                    </div>
                                    <div className="flex justify-end space-x-3 mt-4 pt-4 border-t border-[var(--c-border-color)]">
                                        <button onClick={handleCancel} className="py-2 px-4 rounded-md text-[var(--c-text-main)] bg-[var(--c-bg-card)] hover:bg-opacity-80">Cancelar</button>
                                        <button onClick={handleSave} className="py-2 px-4 rounded-md text-[var(--c-bg-body)] bg-[var(--c-accent-action)] font-semibold hover:bg-opacity-80">Salvar</button>
                                    </div>
                                </div>
                            ) : (
                                /* VIEW MODE */
                                <>
                                    <div className="flex items-center mb-6">
                                        <div className="relative w-24 h-24 mr-6 shrink-0">
                                            <img alt="Foto de perfil" className="w-full h-full rounded-full object-cover" src={profile.avatarUrl}/>
                                        </div>
                                        <div className="space-y-1">
                                            <p className="text-xl font-semibold text-[var(--c-text-main)]">{profile.name}</p>
                                            <p className="text-[var(--c-text-secondary)]">{profile.role}</p>
                                            <p className="text-sm text-white">TASKNAME: <span className="font-bold">{profile.taskName}</span></p>
                                            <p className="italic text-gray-300">"{profile.quote}"</p>
                                        </div>
                                    </div>
                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-medium text-[var(--c-text-secondary)] mb-1">Email:</label>
                                            <p className="text-sm text-[var(--c-text-main)]">{profile.email}</p>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-[var(--c-text-secondary)] mb-1">Nível de acesso:</label>
                                            <div className="inline-flex items-center bg-[var(--c-bg-input)] rounded-md px-3 py-1 text-sm text-[var(--c-text-main)] border border-[var(--c-border-color)]">
                                                <span>{profile.accessLevel}</span>
                                                <span className="material-icons text-sm ml-2">arrow_drop_down</span>
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-[var(--c-text-secondary)] mb-2">Funções:</label>
                                            <div className="flex flex-wrap gap-2">
                                                {profile.functions.map(func => (
                                                    <span key={func} className="bg-[var(--c-bg-input)] text-[var(--c-text-main)] text-sm px-3 py-1 rounded-md flex items-center border border-[var(--c-border-color)]">{func}</span>
                                                ))}
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-[var(--c-text-secondary)] mb-2">Documentação Fornecida:</label>
                                            <button className="bg-[var(--c-bg-input)] border border-[var(--c-border-color)] text-[var(--c-text-main)] p-3 rounded-lg flex items-center space-x-2">
                                                <span className="material-icons">download</span>
                                                <span>Download</span>
                                            </button>
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>

                        {/* Productivity Section */}
                        <div className="space-y-6">
                            <div className="bg-[var(--c-bg-body)] rounded-lg p-6 border border-[var(--c-border-color)]">
                                <h4 className="text-xl font-semibold mb-4 text-[var(--c-text-main)]">Produtividade</h4>
                                <div className="space-y-2 text-sm text-[var(--c-text-main)]">
                                    {Object.entries({
                                        'TASKS TOTAL': profile.productivity.total,
                                        'TASKS NO PRAZO': profile.productivity.onTime,
                                        'TASKS EM ATRASO': profile.productivity.late,
                                        'TASKS CANCELADAS': profile.productivity.canceled,
                                        'TASKDUN': profile.productivity.taskdun,
                                    }).map(([label, value]) => (
                                        <div key={label} className="flex justify-between items-center p-2 rounded bg-[var(--c-bg-input)] border border-[var(--c-border-color)]">
                                            <span>{label}:</span>
                                            <span className="font-semibold">{value}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-6">
                                <div className="bg-[var(--c-bg-body)] rounded-lg p-6 text-center border border-[var(--c-border-color)]">
                                    <h5 className="text-lg font-semibold mb-2 text-[var(--c-text-main)]">Aderência</h5>
                                    <p className="text-4xl font-bold text-cyan-400">{profile.adherence}%</p>
                                </div>
                                <div className="bg-[var(--c-bg-body)] rounded-lg p-6 text-center border border-[var(--c-border-color)]">
                                    <h5 className="text-lg font-semibold mb-2 text-[var(--c-text-main)]">Eficácia</h5>
                                    <p className="text-4xl font-bold text-orange-400">{profile.efficiency}%</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <footer className="text-center p-4 text-sm text-[var(--c-text-secondary)] flex-shrink-0">
                Dun with ❤️ to make your business even better Taskdun ®
            </footer>
        </div>
    );
};

export default ProfilePage;