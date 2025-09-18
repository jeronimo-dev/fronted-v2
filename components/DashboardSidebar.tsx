import React, { useState } from 'react';
import type { Page } from '../types';

interface NavItemProps {
  icon: string;
  label: string;
  active?: boolean;
  onClick: () => void;
}

const NavItem = ({ icon, label, active = false, onClick }: NavItemProps) => {
  const activeClasses = 'bg-[var(--c-text-main)] text-[var(--c-bg-sidebar)] font-bold';
  const inactiveClasses = 'text-[var(--c-text-main)] hover:bg-white/10';
  
  return (
    <button onClick={onClick} className={`relative flex items-center justify-between space-x-4 py-3 px-4 rounded-lg transition-all duration-200 w-full text-left font-medium ${active ? activeClasses : inactiveClasses}`}>
        {active && (
             <div 
                className="absolute left-0 top-1/2 -translate-y-1/2 h-2/3 w-0.5 bg-[var(--c-accent-action)] rounded-r-md"
                style={{ boxShadow: '0 0 6px 1px var(--c-accent-action)' }}
            ></div>
        )}
        <div className="flex items-center space-x-4 pl-2">
            <span className={`material-icons transition-colors duration-200 ${active ? 'text-[var(--c-bg-sidebar)]' : 'text-[var(--c-text-main)]'}`}>{icon}</span>
            <span>{label}</span>
        </div>
    </button>
  );
};

interface SidebarProps {
    currentPage: Page;
    onNavigate: (page: Page) => void;
    onLogout: () => void;
}

export const DashboardSidebar = ({ currentPage, onNavigate, onLogout }: SidebarProps) => {
    const navItems: { id: Page; icon: string; label: string }[] = [
        { id: 'dashboard', icon: 'home', label: 'Início' },
        { id: 'clients', icon: 'people', label: 'Clientes' },
        { id: 'task-talk', icon: 'forum', label: 'Task Talk' },
        { id: 'users', icon: 'groups', label: 'Time' },
        { id: 'task-admin', icon: 'admin_panel_settings', label: 'Task Admin' },
    ];

  return (
    <aside className="w-64 bg-[var(--c-bg-sidebar)] text-[var(--c-text-main)] p-4 flex flex-col fixed top-0 left-0 h-full shadow-lg z-10">
      <div className="pt-6 pb-4 text-center">
        <div className="inline-flex items-baseline space-x-2">
            <span className="text-3xl font-bold tracking-tight text-white font-neue-machina">Taskdun</span>
            <span className="bg-white text-[var(--c-bg-sidebar)] text-sm font-bold px-2.5 py-1 rounded-md">PRO</span>
        </div>
      </div>
      
      <div className="my-6 mx-2 border border-white/20 rounded-md py-2 px-2 text-center">
        <span className="text-xs font-semibold tracking-wider text-white/70">
          A.I. GROWTH MARKETING HUB
        </span>
      </div>

      <nav className="flex-grow space-y-1">
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
      <div className="pt-2">
        <div className="px-2 mb-4 text-center">
            <button className="w-full bg-[var(--c-accent-action)] text-[var(--c-bg-body)] font-bold py-2 px-4 rounded-lg flex items-center justify-center space-x-2 hover:bg-opacity-80 transition-colors">
              <span>Task Help</span>
            </button>
            <p className="text-xs text-[var(--c-text-secondary)] italic font-light mt-2">
              Precisa de alguma ajuda?
            </p>
        </div>
        <NavItem 
            icon="logout" 
            label="Sair" 
            onClick={onLogout}
        />
      </div>
    </aside>
  );
};