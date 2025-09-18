import React from 'react';
import { ClientCard } from '../components/ClientCard';
import { Client, Page } from '../types';

interface ClientsPageProps {
    clients: Client[];
    onSelectClient: (client: Client) => void;
    onOpenCreateClientModal: () => void;
}

const ClientsPage: React.FC<ClientsPageProps> = ({ clients, onSelectClient, onOpenCreateClientModal }) => {
    return (
        <main className="flex-1 p-8 text-[var(--c-text-main)]" style={{ fontFamily: "'Inter', sans-serif" }}>
             <header className="flex justify-between items-center mb-8">
                <h2 className="text-5xl font-bold text-white tracking-wider font-neue-machina">CLIENTES</h2>
                <div className="flex items-center space-x-4">
                <button 
                    onClick={onOpenCreateClientModal}
                    className="bg-[var(--c-accent-action)] text-[var(--c-bg-body)] rounded-lg px-6 py-3 font-semibold flex items-center space-x-2 hover:bg-opacity-80 transition-colors">
                    <span>Novo Cliente</span>
                    <span className="material-icons text-2xl bg-black/20 text-[var(--c-bg-body)] rounded-full p-1">add</span>
                </button>
                <div className="relative">
                    <span className="material-icons text-3xl text-[var(--c-text-secondary)] cursor-pointer hover:text-[var(--c-text-main)]">notifications</span>
                    <span className="absolute top-0 right-0 h-3 w-3 bg-[var(--c-accent-error)] rounded-full border-2 border-[var(--c-bg-body)]"></span>
                </div>
                </div>
            </header>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {clients.map(client => (
                    <ClientCard key={client.id} client={client} onSelectClient={onSelectClient} />
                ))}
            </div>
            <div className="flex justify-center mt-8">
                <button className="bg-[var(--c-bg-card)] text-[var(--c-text-main)] rounded-lg py-2 px-4 text-sm font-semibold hover:bg-[var(--c-border-color)]">
                    Mostrar mais
                </button>
            </div>
        </main>
    );
}

export default ClientsPage;