import React from 'react';
import type { Page } from '../types';

interface NavItemProps {
  icon: string;
  label: string;
  active?: boolean;
  onClick: () => void;
}

const NavItem = ({ icon, label, active = false, onClick }: NavItemProps) => {
  return (
    <button
      onClick={onClick}
      className={`flex items-center p-3 rounded-lg w-full text-left transition-colors duration-200 ${
        active ? 'bg-[#00e5ff] text-[#1e1e24]' : 'text-[#e4e6ea] hover:bg-white/10'
      }`}
    >
      <span className="material-icons mr-4">{icon}</span>
      <span>{label}</span>
    </button>
  );
};

interface AIChatSidebarProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
}

export const AIChatSidebar: React.FC<AIChatSidebarProps> = ({ currentPage, onNavigate }) => {
  const navItems: { id: Page; icon: string; label: string }[] = [
    { id: 'dashboard', icon: 'home', label: 'Início' },
    { id: 'create-task', icon: 'add_circle_outline', label: 'Criar Task' },
    { id: 'clients', icon: 'people_outline', label: 'Clientes' },
    { id: 'task-ia', icon: 'smart_toy', label: 'Task IA' },
    { id: 'users', icon: 'groups', label: 'Usuários' },
  ];

  return (
    <aside className="w-64 bg-[#293e53] text-[#e4e6ea] p-6 flex flex-col fixed top-0 left-0 h-full shadow-lg z-10">
      <div className="text-center py-6 border-b border-white/10 mb-6">
        <img
          alt="Taskdun logo"
          className="h-12 mx-auto mb-2"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuBgoJFAHsUyvPPgTht93AiO4p8Hekyo2IHl13AQJAT2Kqc7l88ZY_gZAc-2fOT7XvzxuqC7ij4AdW3yePPoyoTJQMIHKts_wwgXUITisS2AdT8Nr4b2KeZsUaOFPt2N4RbgaTPUWSJSh5NQz7U8Rs3NQe-AhzxC0n9H9wPv1hFamuNK2Ig7mLLbmBZkdCTDcCLP7meqZY99yeZdVZ989SX-OumDKj-e78AmkKf_LgJwbalbQ39F0F2CMBdM__HTYU_UosLzwZQM0GQ"
        />
        <p className="text-2xl font-semibold">PRO</p>
      </div>
      <nav className="flex-grow space-y-2">
        {navItems.map((item) => (
          <NavItem
            key={item.id}
            icon={item.icon}
            label={item.label}
            active={item.id === currentPage}
            onClick={() => onNavigate(item.id)}
          />
        ))}
      </nav>
      {/* FIX: Removed the "Configurações" (Settings) NavItem which was causing a TypeScript error because the 'settings' page type does not exist. */}
    </aside>
  );
};
