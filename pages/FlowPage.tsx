import React from 'react';

const FlowPage: React.FC = () => {
    // The image URL is from the user's prompt for Task Talk.
    const imageUrl = 'https://storage.googleapis.com/garden-prod/attachments/0a9b31d0-de94-4363-8a9d-b8d4f0ab8888_task-talk.png';

    return (
        <main className="flex-1 p-8 flex flex-col items-center bg-black">
            <header className="w-full flex justify-between items-center mb-8">
                <h1 className="text-5xl font-bold text-white tracking-wider font-neue-machina">Task Talk</h1>
                <div className="relative">
                    <span className="material-icons text-3xl text-[var(--c-text-secondary)] cursor-pointer hover:text-[var(--c-text-main)]">notifications</span>
                    <span className="absolute top-0 right-0 h-3 w-3 bg-[var(--c-accent-error)] rounded-full border-2 border-[var(--c-bg-body)]"></span>
                </div>
            </header>
            <div className="w-full h-full flex-grow bg-black p-1 rounded-xl">
                <img 
                    src={imageUrl} 
                    alt="Interface do Task Talk"
                    className="w-full h-full object-contain rounded-lg"
                />
            </div>
        </main>
    );
};

export default FlowPage;
