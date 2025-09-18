import React from 'react';
import { User, Page } from '../types';

interface ProfileCardProps {
  user: User;
  onNavigate: (page: Page) => void;
}

export const ProfileCard = ({ user, onNavigate }: ProfileCardProps) => {
  return (
    <div className="bg-[var(--c-bg-card)] p-4 text-center text-[var(--c-text-main)] rounded-2xl shadow-lg flex flex-col h-full border border-[var(--c-border-color)]">
      <img
        src={user.avatarUrl}
        alt={`${user.name}'s avatar`}
        className="w-20 h-20 rounded-full mx-auto mb-3 border-4 border-[var(--c-border-color)] shadow-lg"
      />
      <h4 className="text-lg font-semibold">{user.name}</h4>
      <p className="text-sm text-[var(--c-text-secondary)]">{user.title}</p>
      <p className="text-sm text-white mt-2">Taskname: <span className="font-bold">{user.taskName}</span></p>
      <blockquote className="text-xs text-gray-400 italic my-2 min-h-[40px]">
        "{user.quote}"
      </blockquote>
      <p className="text-xs text-[var(--c-text-secondary)] break-all mb-3">{user.email}</p>
      
      <div className="mt-auto space-y-3">
        <span className="inline-block bg-green-500/80 text-xs font-semibold px-3 py-1 rounded-full tracking-wide">
          {user.activityStatus}
        </span>
        <button onClick={() => onNavigate('profile')} className="w-full bg-[var(--c-bg-sidebar)] hover:bg-[var(--c-accent-action)] hover:text-[var(--c-bg-body)] text-white font-bold py-2 px-4 rounded-lg transition duration-300 shadow-md hover:shadow-lg">
          Perfil
        </button>
      </div>
    </div>
  );
};