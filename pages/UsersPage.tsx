import React from 'react';
import { TeamUser, Page } from '../types';

interface UsersPageProps {
    onNavigate: (page: Page) => void;
    teamUsers: TeamUser[];
    onOpenProfileModal: (user: TeamUser) => void;
}

const UserCard: React.FC<{ user: TeamUser; onEdit: () => void }> = ({ user, onEdit }) => (
    <div className="bg-[var(--c-bg-card)] p-4 rounded-xl shadow-lg flex items-center justify-between border border-[var(--c-border-color)] transition-all duration-200 hover:border-[var(--c-accent-focus)]">
        <div className="flex items-center space-x-4 min-w-0">
             <div className="w-16 h-16 rounded-full bg-[var(--c-bg-sidebar)] flex items-center justify-center text-2xl font-bold text-white flex-shrink-0">
                {user.name.charAt(0).toUpperCase()}
            </div>
            <div className="min-w-0">
                <h3 className="text-lg font-semibold text-[var(--c-text-main)] truncate">{user.name}</h3>
                <p className="text-sm font-medium text-[var(--c-text-secondary)]">Taskname: <span className="font-semibold text-[var(--c-text-main)]">{user.taskName}</span></p>
                <p className="text-sm text-[var(--c-text-secondary)] truncate">{user.email}</p>
                <p className="text-sm text-[var(--c-text-secondary)]">{user.phone}</p>
                <span className="text-xs bg-[var(--c-bg-body)] px-2 py-0.5 rounded-full text-[var(--c-text-secondary)] mt-1 inline-block">{user.role}</span>
            </div>
        </div>
        <button onClick={onEdit} className="bg-[var(--c-bg-body)] w-12 h-12 rounded-full flex items-center justify-center text-[var(--c-text-secondary)] hover:text-[var(--c-accent-focus)] hover:bg-[var(--c-border-color)] transition-colors flex-shrink-0">
            <span className="material-icons">edit</span>
        </button>
    </div>
);


const UsersPage: React.FC<UsersPageProps> = ({ onNavigate, teamUsers, onOpenProfileModal }) => {
    return (
        <main className="flex-1 p-8 text-[var(--c-text-main)]" style={{ fontFamily: "'Inter', sans-serif" }}>
             <header className="flex justify-between items-center mb-8">
                <h2 className="text-5xl font-bold text-white tracking-wider font-neue-machina">TIME</h2>
                <div className="flex items-center space-x-4">
                    <button onClick={() => onNavigate('create-user')} className="bg-[var(--c-accent-action)] text-[var(--c-bg-body)] rounded-lg px-6 py-3 font-semibold flex items-center space-x-2 hover:bg-opacity-80 transition-colors">
                        <span>Incluir Usuário / Colaborador</span>
                        <span className="material-icons text-2xl bg-black/20 text-[var(--c-bg-body)] rounded-full p-1">add</span>
                    </button>
                     <div className="relative">
                        <span className="material-icons text-3xl text-[var(--c-text-secondary)] cursor-pointer hover:text-[var(--c-text-main)]">notifications</span>
                        <span className="absolute top-0 right-0 h-3 w-3 bg-[var(--c-accent-error)] rounded-full border-2 border-[var(--c-bg-body)]"></span>
                    </div>
                </div>
            </header>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {teamUsers.map(user => (
                    <UserCard key={user.id} user={user} onEdit={() => onOpenProfileModal(user)} />
                ))}
            </div>
        </main>
    );
}

export default UsersPage;