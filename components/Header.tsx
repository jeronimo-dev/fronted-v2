import React from 'react';

interface HeaderProps {
  userName: string;
  time: string;
  notifications: number;
}

export const Header = ({ userName, time, notifications }: HeaderProps) => {
  return (
    <header className="flex justify-between items-center">
      <div>
        <h2 className="text-3xl font-medium text-[var(--c-text-main)] font-neue-machina">Olá {userName}, tudo de vento em polpa, capitão!</h2>
        <p className="text-[var(--c-text-secondary)] mt-1">Agora são <span className="text-xl font-bold text-[var(--c-accent-focus)]">{time}</span> (Brasília)</p>
      </div>
      <div className="relative">
        <span className="material-icons text-3xl text-[var(--c-text-secondary)] cursor-pointer hover:text-[var(--c-text-main)]">notifications</span>
        {notifications > 0 && (
          <div className="absolute -top-1 -right-1 bg-[var(--c-accent-error)] text-white rounded-full w-5 h-5 text-xs flex items-center justify-center font-bold border-2 border-[var(--c-bg-body)]">
            {notifications}
          </div>
        )}
      </div>
    </header>
  );
};