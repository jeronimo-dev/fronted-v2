import React from 'react';

interface BackButtonProps {
  onClick: () => void;
}

export const BackButton: React.FC<BackButtonProps> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="flex items-center space-x-2 text-[var(--c-text-main)] hover:text-[var(--c-accent-focus)] transition-colors duration-200 bg-[var(--c-bg-card)] hover:bg-[var(--c-border-color)] px-4 py-2 rounded-lg text-sm font-semibold"
    >
      <span className="material-icons">arrow_back</span>
      <span>Voltar</span>
    </button>
  );
};