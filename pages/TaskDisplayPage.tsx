import React, { useState } from 'react';
import { Task } from '../types';
import { BackButton } from '../components/BackButton';

interface TaskDisplayPageProps {
    task: Task;
    onClose: () => void;
}

const TaskDisplayPage: React.FC<TaskDisplayPageProps> = ({ task, onClose }) => {
    const [justification, setJustification] = useState('');

    return (
        <div className="flex-1 p-8" style={{ fontFamily: "'Inter', sans-serif" }}>
            <header className="flex justify-between items-center mb-8">
                <BackButton onClick={onClose} />
                <div className="relative">
                    <span className="material-icons text-3xl text-[var(--c-text-secondary)] hover:text-[var(--c-text-main)]">notifications</span>
                    <span className="absolute top-0 right-0 block h-3 w-3 rounded-full bg-[var(--c-accent-error)] border-2 border-[var(--c-bg-body)]"></span>
                </div>
            </header>

            <div className="bg-[var(--c-bg-card)] p-8 rounded-xl shadow-xl max-w-6xl mx-auto relative border border-[var(--c-border-color)]">
                <button onClick={onClose} className="absolute top-6 right-6 text-[var(--c-text-secondary)] hover:text-[var(--c-text-main)]">
                    <span className="material-icons text-3xl">close</span>
                </button>

                <div className="grid grid-cols-12 gap-6">
                    {/* Left Column */}
                    <div className="col-span-12 md:col-span-2 flex flex-col items-center justify-between py-4">
                        <div className="text-center">
                            <div className="bg-yellow-400 text-black w-24 h-24 rounded-full flex items-center justify-center text-5xl font-bold mb-4 shadow-md">
                                {task.priority}
                            </div>
                            <p className="text-[var(--c-text-main)] font-semibold mb-12">Prioridade</p>
                        </div>
                        <button className="flex flex-col items-center text-[var(--c-text-secondary)] hover:text-[var(--c-accent-focus)]">
                            <span className="material-icons text-4xl">keyboard_arrow_left</span>
                            <span className="text-xs mt-1">Visualizar Task anterior</span>
                        </button>
                    </div>

                    {/* Middle Column */}
                    <div className="col-span-12 md:col-span-8 border-l border-r border-[var(--c-border-color)]/50 px-6">
                        <div className="text-center mb-8">
                            <p className="text-sm text-[var(--c-text-secondary)] uppercase tracking-wider">Task Guide</p>
                            <h3 className="text-3xl font-bold text-[var(--c-text-main)] mt-1 font-neue-machina">{task.title || task.description}</h3>
                            <p className="text-sm text-[var(--c-text-secondary)] mt-1">{task.origin}</p>
                        </div>

                        <div className="mb-8">
                            <h4 className="text-lg font-semibold text-[var(--c-text-main)] mb-3 uppercase">QUANDO</h4>
                            <div className="text-base space-y-3">
                                <div>
                                    <p className="text-[var(--c-text-secondary)] text-sm">Data e Horário:</p>
                                    <p className="text-[var(--c-text-main)] font-medium">{task.dateTime}</p>
                                </div>
                                <div>
                                    <p className="text-[var(--c-text-secondary)] text-sm">Onde:</p>
                                    <div className="flex items-center">
                                        <p className="text-[var(--c-text-main)] font-medium mr-2">{task.location}</p>
                                        <a href={task.locationLink} className="text-[var(--c-accent-focus)] hover:underline text-sm">(Clique para acessar)</a>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="border-t border-[var(--c-border-color)]/50 pt-6">
                            <h4 className="text-lg font-semibold text-[var(--c-text-main)] mb-3 uppercase">COMO</h4>
                            <ol className="list-decimal list-inside text-[var(--c-text-main)] space-y-2.5 text-[15px]">
                                {task.instructions?.map((inst, index) => <li key={index}>{inst}</li>)}
                            </ol>
                        </div>
                    </div>

                    {/* Right Column */}
                    <div className="col-span-12 md:col-span-2 flex flex-col items-center justify-between py-4">
                        <div className="text-center mb-8">
                            <p className="text-xs text-[var(--c-accent-action)] font-semibold bg-green-500/20 px-3 py-1.5 rounded-full">VOCÊ ESTÁ</p>
                            <p className="text-2xl text-[var(--c-accent-action)] font-bold mt-1">EM TEMPO</p>
                        </div>
                        <div className="text-center mb-8">
                            <p className="text-xs text-[var(--c-text-secondary)] mb-2">Arquivos adicionados</p>
                            <button className="bg-[var(--c-bg-body)] p-4 rounded-full hover:bg-[var(--c-border-color)]">
                                <span className="material-icons text-[var(--c-text-main)] text-4xl">download</span>
                            </button>
                        </div>
                        <button className="flex flex-col items-center text-[var(--c-text-secondary)] hover:text-[var(--c-accent-focus)]">
                             <span className="material-icons text-4xl">keyboard_arrow_right</span>
                            <span className="text-xs mt-1">Visualizar próxima Task</span>
                        </button>
                    </div>
                </div>

                <div className="mt-10 pt-6 border-t border-[var(--c-border-color)]/50 grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-[var(--c-text-secondary)] mb-1" htmlFor="cancelamento">CANCELAMENTO DA TASK</label>
                        <textarea
                            className="w-full p-3 bg-[var(--c-bg-input)] border border-[var(--c-border-color)] rounded-lg focus:ring-[var(--c-accent-focus)] focus:border-[var(--c-accent-focus)] text-sm text-[var(--c-text-main)]"
                            id="cancelamento"
                            value={justification}
                            onChange={(e) => setJustification(e.target.value)}
                            placeholder="DIGITE A SUA JUSTIFICATIVA PARA O CANCELAMENTO DA TASK"
                            rows={3}
                        ></textarea>
                        <p className="text-xs text-[var(--c-text-secondary)] mt-2">Clique abaixo para CANCELAR essa Task. Atenção, essa ação é irreversível.</p>
                        <button className="mt-3 bg-[var(--c-accent-error)] hover:bg-opacity-80 text-white font-semibold py-3 px-6 rounded-lg flex items-center justify-center w-full sm:w-auto shadow-md hover:shadow-lg transition-all duration-150">
                            <span className="material-icons mr-2">cancel</span>
                            CANCELAR TASK
                        </button>
                    </div>
                    <div className="flex flex-col items-center md:items-end space-y-2 w-full mt-4 md:mt-0">
                        <p className="text-xs text-[var(--c-text-secondary)]">Ao cumprir a Task clique abaixo</p>
                        <button className="bg-[var(--c-accent-action)] hover:bg-opacity-80 text-[var(--c-bg-body)] font-semibold py-3 px-6 rounded-lg flex items-center justify-center w-full shadow-md hover:shadow-lg transition-all duration-150">
                            Taskdun
                            <span className="material-icons ml-2">check_circle</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TaskDisplayPage;