
import React, { useState } from 'react';

interface LoginPageProps {
  onLogin: (email: string, pass: string) => void;
  error: string | null;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onLogin, error }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(email, password);
  };

  return (
    <div 
      className="min-h-screen flex flex-col items-center justify-center bg-cover bg-center p-4 relative" 
      style={{ 
        fontFamily: "'Inter', sans-serif",
        backgroundImage: "url('https://taskdun.com.br/wp-content/uploads/2025/07/3-1.png')"
      }}
    >
      <div className="absolute inset-0 bg-black/60 z-0"></div>
      
      <div className="relative z-10 mb-8 text-center">
        <div className="inline-flex items-baseline space-x-3">
            <span className="text-5xl font-extrabold tracking-tight text-white font-neue-machina">Taskdun</span>
            <span className="bg-white text-[var(--c-bg-sidebar)] text-xl font-bold px-3 py-1 rounded-md">PRO</span>
        </div>
        <p className="text-[var(--c-text-secondary)] mt-2 tracking-widest text-sm">A.I. GROWTH MARKETING HUB</p>
      </div>

      <div className="relative z-10 w-full max-w-md bg-[var(--c-bg-card)] rounded-xl shadow-2xl p-8 border border-[var(--c-border-color)]">
        <h2 className="text-3xl font-bold text-center text-[var(--c-text-main)] mb-8 font-neue-machina">
          Acessar Plataforma
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-[var(--c-text-secondary)] mb-2" htmlFor="email">
              E-mail
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 block w-full px-4 py-3 bg-[var(--c-bg-input)] border border-[var(--c-border-color)] rounded-md shadow-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[var(--c-accent-focus)] sm:text-sm text-[var(--c-text-main)]"
              placeholder="admin@taskdun.com.br"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[var(--c-text-secondary)] mb-2" htmlFor="password">
              Senha
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1 block w-full px-4 py-3 bg-[var(--c-bg-input)] border border-[var(--c-border-color)] rounded-md shadow-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[var(--c-accent-focus)] sm:text-sm text-[var(--c-text-main)]"
              placeholder="password"
            />
          </div>
          
          {error && (
            <div className="flex items-center justify-center space-x-2 text-sm text-[var(--c-accent-error)] animate-shake">
                <span className="material-icons-outlined text-base">error_outline</span>
                <span>{error}</span>
            </div>
           )}

          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-3 px-4 mt-4 border border-transparent rounded-lg shadow-lg text-sm font-bold text-[var(--c-bg-body)] bg-[var(--c-accent-action)] hover:bg-opacity-80 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[var(--c-bg-card)] focus:ring-[var(--c-accent-action)] transition-all"
            >
              ENTRAR
            </button>
          </div>
        </form>
        
        <div className="text-center mt-6">
          <a href="#" className="text-sm text-[var(--c-text-secondary)] hover:text-[var(--c-accent-focus)] hover:underline">
            Esqueci minha senha
          </a>
        </div>
      </div>
      
       <footer className="text-center p-4 text-sm text-[var(--c-text-secondary)] flex-shrink-0 mt-8 absolute bottom-0 z-10">
            Dun with ❤️ to make your business even better Taskdun ®
        </footer>
    </div>
  );
};
