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
    <button onClick={onClick} className={`flex items-center space-x-3 py-3 px-4 rounded-lg w-full text-left ${active ? activeClasses : 'text-[#e4e6ea]'} ${!active && hoverClasses}`}>
        <span className="material-icons">{icon}</span>
        <span>{label}</span>
    </button>
  );
};

interface SidebarProps {
    currentPage: Page;
    onNavigate: (page: Page) => void;
}

export const TaskIASidebar = ({ currentPage, onNavigate }: SidebarProps) => {
    const navItems: { id: Page; icon: string; label: string }[] = [
        { id: 'dashboard', icon: 'home', label: 'Início' },
        { id: 'create-task', icon: 'add_circle_outline', label: 'Criar Task' },
        { id: 'clients', icon: 'people_outline', label: 'Clientes' },
        { id: 'task-ia', icon: 'psychology', label: 'Task IA' },
        { id: 'users', icon: 'groups', label: 'Usuários' },
    ];

  return (
    <aside className="w-64 bg-[#293e53] text-[#e4e6ea] p-6 flex flex-col fixed top-0 left-0 h-full shadow-lg z-10 font-helvetica">
        <div className="flex items-center mb-8">
            <img alt="Taskdun Logo" className="h-10 w-10 mr-3" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA7lGT7RLRkOEUTPXdMKGCfIobThdfJkfUGhyNjPJYva5sWIo90ijfBgrFG8GX8Lx21lfamEusNMFEtw2EDfScSveJmjgG7IT9EgqgKynWoEO_pJ_KPX9-CvsnoJc9vdon-jA3GySi9FfgYNmrWQgKzfFC6k-LHsL1mpmfh4Qt-guKmWpOqY8N1bhWKALuvbxWFFl3l1HpNJ4oUUKdUaDU0DHfjMNLVdE8kNiV-PrpDC22ed-pygHqFZ3mgB6Qv9Evsd9PK60lp1oI"/>
            <span className="text-2xl font-bold text-[#e4e6ea]">Taskdun</span>
        </div>
        <div className="mb-4">
            <button className="w-full bg-[#ffd700] text-[#1e1e24] py-2 px-4 rounded-lg font-semibold hover:bg-opacity-80 transition duration-300">
                PRO
            </button>
        </div>
      <nav className="flex-grow space-y-1">
        {navItems.map(item => (
            <NavItem 
                key={item.id}
                icon={item.icon}
                label={item.label}
                active={currentPage === item.id || (item.id === 'dashboard' && currentPage === 'create-task')}
                onClick={() => onNavigate(item.id)}
            />
        ))}
      </nav>
      {/* FIX: Removed the "Configurações" (Settings) NavItem which was causing a TypeScript error because the 'settings' page type does not exist. */}
    </aside>
  );
};
