import React from 'react';
import type { Page } from '../types';

interface NavItemProps {
  icon: string;
  label: string;
  active?: boolean;
  onClick: () => void;
}

const NavItem = ({ icon, label, active, onClick }: NavItemProps) => {
  return (
    <button onClick={onClick} className={`flex items-center justify-between p-3 rounded-lg w-full ${active ? 'bg-[#00e5ff] text-[#1e1e24]' : 'text-[#e4e6ea] hover:bg-white/10'}`}>
      <span className="text-lg font-medium">{label}</span>
      <span className={`material-icons ${active ? 'text-[#1e1e24]' : 'text-[#ffd700]'}`}>{icon}</span>
    </button>
  );
};


interface ClientsSidebarProps {
    currentPage: Page;
    onNavigate: (page: Page) => void;
}

export const ClientsSidebar = ({ currentPage, onNavigate }: ClientsSidebarProps) => {
    const navItems: { id: Page; icon: string; label: string }[] = [
        { id: 'dashboard', icon: 'home', label: 'Início' },
        { id: 'create-task', icon: 'add_circle_outline', label: 'Criar Task' },
        { id: 'clients', icon: 'people', label: 'Clientes' },
        { id: 'task-ia', icon: 'psychology', label: 'Task IA' },
        { id: 'users', icon: 'groups', label: 'Usuários' },
    ];
  return (
    <aside className="w-64 flex-shrink-0 bg-[#293e53] flex flex-col p-6 space-y-4 text-gray-200 fixed top-0 left-0 h-full z-10">
        <div className="flex items-center space-x-3 mb-8">
            <img alt="Taskdun Logo" className="h-12" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBnBE50VjSjW-e7KLEbYHk5xb_a7hl4C2b3zplki-HAgL2wFja-244zdHU1prMJZG3YBb-i5l245DZjowe78ZggnPijAQ1XpWC4MnywODfmXj6zL5I9nrPJW2dBFD-1BlkC5Lu0R8kYuX0EUeZaCBNY4vwIoRHSYGhkewnW_dac-pyIgHVnlhRtmCfeC7bdCjprWlkUIdicMjkX_6zRUfMZ-uojgStH8aPSme70VNmrbllD6XwsesvbvhX5kcvZc3mE6Ucmt3sQJD1g"/>
            <div>
                <h1 className="text-2xl font-bold text-white">Taskdun</h1>
                <p className="text-lg font-semibold text-[#ffd700]">PRO</p>
            </div>
        </div>
        <nav className="flex-grow space-y-3">
            {navItems.map(item => (
                <NavItem 
                    key={item.id}
                    icon={item.icon}
                    label={item.label}
                    active={currentPage === item.id}
                    onClick={() => onNavigate(item.id)}
                />
            ))}
        </nav>
        {/* FIX: Removed the "Configurações" (Settings) NavItem which was causing a TypeScript error because the 'settings' page type does not exist. */}
    </aside>
  );
};
