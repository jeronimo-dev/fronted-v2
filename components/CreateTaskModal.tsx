import React, { useState, useEffect } from 'react';
import { Task, TaskPriority, TaskType } from '../types';

interface CreateTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (task: Omit<Task, 'id' | 'status'>) => void;
}

export const CreateTaskModal = ({ isOpen, onClose, onSubmit }: CreateTaskModalProps) => {
  const [taskType, setTaskType] = useState<TaskType>(TaskType.PADRAO);
  const [priority, setPriority] = useState<TaskPriority>(TaskPriority.HIGH);
  const [processo, setProcesso] = useState('');
  const [atribuicoes, setAtribuicoes] = useState('');
  const [dd, setDd] = useState('');
  const [mm, setMm] = useState('');
  const [aa, setAa] = useState('');
  const [hh, setHh] = useState('');
  const [min, setMin] = useState('');
  
  const [receberAviso, setReceberAviso] = useState(false);
  const [enviarWhatsapp, setEnviarWhatsapp] = useState(false);

  useEffect(() => {
    if (!isOpen) {
        setTaskType(TaskType.PADRAO);
        setPriority(TaskPriority.HIGH);
        setProcesso('');
        setAtribuicoes('');
        setDd('');
        setMm('');
        setAa('');
        setHh('');
        setMin('');
        setReceberAviso(false);
        setEnviarWhatsapp(false);
    }
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!processo.trim() || !dd || !mm || !aa || !hh || !min) {
        alert('Por favor, preencha todos os campos.');
        return;
    }
    
    const newTaskData: Omit<Task, 'id' | 'status'> = {
        description: processo,
        priority: priority,
        taskType: taskType,
        assignments: atribuicoes,
        dueDate: `${dd}/${mm}/${aa}`,
        time: `${hh}:${min}`,
    };
    onSubmit(newTaskData);
    onClose();
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4 transition-opacity" style={{ fontFamily: "'Inter', sans-serif" }}>
      <div className="bg-[var(--c-bg-card)] shadow-2xl rounded-lg p-8 w-full max-w-2xl relative animate-fade-in-up border border-[var(--c-border-color)]" onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-4 right-4 text-[var(--c-text-secondary)] hover:text-[var(--c-text-main)]">
          <span className="material-icons-outlined">close</span>
        </button>
        <h2 className="text-2xl font-semibold text-center mb-8 text-[var(--c-text-main)] tracking-wide font-neue-machina">CRIAÇÃO DE TASK</h2>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
                <label className="block text-sm font-medium text-[var(--c-text-secondary)] mb-1" htmlFor="task-type">Tipo de Task:</label>
                <div className="relative">
                    <select
                        id="task-type"
                        value={taskType}
                        onChange={(e) => setTaskType(e.target.value as TaskType)}
                        className="w-full appearance-none bg-[var(--c-bg-input)] border border-[var(--c-border-color)] text-[var(--c-text-main)] py-3 px-4 pr-8 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[var(--c-accent-focus)] custom-select-arrow"
                    >
                        <option value={TaskType.PADRAO}>Padrão</option>
                        <option value={TaskType.URGENTE}>Urgente</option>
                        <option value={TaskType.IMPORTANTE}>Importante</option>
                    </select>
                </div>
            </div>
            <div>
                <label className="block text-sm font-medium text-[var(--c-text-secondary)] mb-1" htmlFor="priority-level">Nível de Prioridade:</label>
                <div className="relative">
                    <select
                        id="priority-level"
                        value={priority}
                        onChange={(e) => setPriority(Number(e.target.value) as TaskPriority)}
                        className="w-full appearance-none bg-[var(--c-bg-input)] border border-[var(--c-border-color)] text-[var(--c-text-main)] py-3 px-4 pr-8 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[var(--c-accent-focus)] custom-select-arrow"
                    >
                        <option value={TaskPriority.HIGH}>1</option>
                        <option value={TaskPriority.MEDIUM}>2</option>
                        <option value={TaskPriority.LOW}>3</option>
                    </select>
                </div>
            </div>
          </div>
          <div className="mb-6">
              <label className="block text-sm font-medium text-[var(--c-text-secondary)] mb-1" htmlFor="process">Processo:</label>
              <textarea
                  id="process"
                  value={processo}
                  onChange={(e) => setProcesso(e.target.value)}
                  className="w-full bg-[var(--c-bg-input)] border border-[var(--c-border-color)] text-[var(--c-text-main)] py-2 px-3 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[var(--c-accent-focus)]"
                  rows={4}
                  required
                  placeholder="Descreva o processo da task..."
              />
          </div>
          <div className="mb-6">
              <label className="block text-sm font-medium text-[var(--c-text-secondary)] mb-1" htmlFor="assignments">Atribuições:</label>
              <textarea
                  id="assignments"
                  value={atribuicoes}
                  onChange={(e) => setAtribuicoes(e.target.value)}
                  className="w-full bg-[var(--c-bg-input)] border border-[var(--c-border-color)] text-[var(--c-text-main)] py-2 px-3 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[var(--c-accent-focus)]"
                  rows={3}
                  placeholder="Quem são os responsáveis?"
              />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                  <label className="block text-sm font-medium text-[var(--c-text-secondary)] mb-1">Dun até:</label>
                  <div className="flex items-center space-x-2">
                      <input value={dd} onChange={e => setDd(e.target.value)} maxLength={2} className="w-1/3 bg-[var(--c-bg-input)] border border-[var(--c-border-color)] py-2 px-3 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[var(--c-accent-focus)] text-center text-[var(--c-text-main)]" placeholder="DD" type="text" required />
                      <span className="text-gray-500">/</span>
                      <input value={mm} onChange={e => setMm(e.target.value)} maxLength={2} className="w-1/3 bg-[var(--c-bg-input)] border border-[var(--c-border-color)] py-2 px-3 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[var(--c-accent-focus)] text-center text-[var(--c-text-main)]" placeholder="MM" type="text" required />
                      <span className="text-gray-500">/</span>
                      <input value={aa} onChange={e => setAa(e.target.value)} maxLength={2} className="w-1/3 bg-[var(--c-bg-input)] border border-[var(--c-border-color)] py-2 px-3 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[var(--c-accent-focus)] text-center text-[var(--c-text-main)]" placeholder="AA" type="text" required />
                  </div>
              </div>
              <div>
                  <label className="block text-sm font-medium text-[var(--c-text-secondary)] mb-1">Horário:</label>
                  <div className="flex items-center space-x-2">
                      <input value={hh} onChange={e => setHh(e.target.value)} maxLength={2} className="w-1/2 bg-[var(--c-bg-input)] border border-[var(--c-border-color)] py-2 px-3 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[var(--c-accent-focus)] text-center text-[var(--c-text-main)]" placeholder="HH" type="text" required />
                      <span className="text-gray-500 text-xl">:</span>
                      <input value={min} onChange={e => setMin(e.target.value)} maxLength={2} className="w-1/2 bg-[var(--c-bg-input)] border border-[var(--c-border-color)] py-2 px-3 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[var(--c-accent-focus)] text-center text-[var(--c-text-main)]" placeholder="MM" type="text" required />
                  </div>
              </div>
          </div>
          <div className="mb-6 space-y-2 md:space-y-0 md:flex md:items-center md:justify-between">
              <div className="flex items-center">
                  <input id="taskdun-notification" type="checkbox" checked={receberAviso} onChange={e => setReceberAviso(e.target.checked)} className="h-4 w-4 text-[var(--c-accent-focus)] bg-[var(--c-bg-input)] border-[var(--c-border-color)] rounded focus:ring-[var(--c-accent-focus)]" />
                  <label htmlFor="taskdun-notification" className="ml-2 block text-sm text-[var(--c-text-secondary)]">Receber aviso de Taskdun?</label>
              </div>
              <div className="flex items-center">
                  <input id="whatsapp-notification" type="checkbox" checked={enviarWhatsapp} onChange={e => setEnviarWhatsapp(e.target.checked)} className="h-4 w-4 text-[var(--c-accent-focus)] bg-[var(--c-bg-input)] border-[var(--c-border-color)] rounded focus:ring-[var(--c-accent-focus)]" />
                  <label htmlFor="whatsapp-notification" className="ml-2 block text-sm text-[var(--c-text-secondary)]">Enviar via Whatsapp para Atribuídos?</label>
              </div>
          </div>
          <button type="submit" className="w-full bg-[var(--c-accent-action)] hover:bg-opacity-80 text-[var(--c-bg-body)] font-bold py-3 px-4 rounded-lg transition duration-300 shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--c-accent-action)]">
            CRIAR TASK
          </button>
          <div className="text-center text-sm text-[var(--c-text-secondary)] mt-4">
              <a href="#" className="hover:underline">ajuda?</a>
          </div>
        </form>
      </div>
    </div>
  );
};