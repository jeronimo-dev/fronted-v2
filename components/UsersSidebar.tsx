import React from 'react';
import type { Page } from '../types';

interface NavItemProps {
  icon: string;
  label: string;
  active?: boolean;
  onClick: () => void;
}

const NavItem = ({ icon, label, active = false, onClick }: NavItemProps) => {
  const activeClasses = 'bg-[#00e5ff] text-[#1e1e24] font-semibold';
  const hoverClasses = 'hover:bg-white/10';

  return (
    <button onClick={onClick} className={`flex items-center py-3 px-4 transition-colors duration-200 rounded-xl w-full text-left ${active ? activeClasses : 'text-[#e4e6ea]'} ${!active && hoverClasses}`}>
      <span className="material-icons mr-3">{icon}</span>
      <span>{label}</span>
    </button>
  );
};

interface UsersSidebarProps {
    currentPage: Page;
    onNavigate: (page: Page) => void;
}

export const UsersSidebar = ({ currentPage, onNavigate }: UsersSidebarProps) => {
    const navItems: { id: Page; icon: string; label: string }[] = [
        { id: 'dashboard', icon: 'home', label: 'Início' },
        { id: 'create-task', icon: 'add_circle_outline', label: 'Criar Task' },
        { id: 'clients', icon: 'people_outline', label: 'Clientes' },
        { id: 'task-ia', icon: 'smart_toy', label: 'Task IA' },
        { id: 'users', icon: 'groups', label: 'Usuários' },
    ];

  return (
    <aside className="w-64 p-6 h-screen flex flex-col bg-[#293e53] fixed top-0 left-0 z-10">
      <div className="text-center mb-10">
        <div className="flex items-center justify-center mb-2">
          <span className="material-icons text-4xl text-[#e4e6ea]">settings_suggest</span>
          <h1 className="text-3xl font-bold text-[#e4e6ea] ml-2">Taskdun</h1>
        </div>
        <p className="text-5xl font-extrabold text-[#e4e6ea] tracking-wider">PRO</p>
      </div>
      <nav className="space-y-3 flex-grow">
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
      {/* FIX: Removed the "Configurações" (Settings) button which was causing a TypeScript error because the 'settings' page type does not exist. */}
    </aside>
  );
};
