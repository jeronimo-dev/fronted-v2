
import React, { useState, useMemo, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { DndContext, DragEndEvent, DragStartEvent, DragOverlay, useSensor, useSensors, PointerSensor, KeyboardSensor, closestCorners } from '@dnd-kit/core';
import { SortableContext, useSortable, arrayMove, sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Lead, LeadColumnStatus, LeadHistoryItem } from '../types';
import { LeadCard } from '../components/LeadCard';
import { LeadDetailModal } from '../components/LeadDetailModal';
import { CreateLeadModal } from '../components/CreateLeadModal';

interface TaskSalesPageProps {
    leads: Lead[];
    onAddLead: (lead: Omit<Lead, 'id'>) => void;
    onUpdateLead: (lead: Lead) => void;
    setLeads: React.Dispatch<React.SetStateAction<Lead[]>>;
}

const columnOrder: LeadColumnStatus[] = [
    LeadColumnStatus.NOVAS_OPORTUNIDADES,
    LeadColumnStatus.CONTATADOS,
    LeadColumnStatus.REUNIAO_AGENDADA,
    LeadColumnStatus.EM_NEGOCIACAO,
    LeadColumnStatus.VENDA_CONCLUIDA,
    LeadColumnStatus.VENDAS_PERDIDAS,
];

const SortableLeadCard: React.FC<{lead: Lead; onSelectLead: (lead: Lead) => void;}> = ({ lead, onSelectLead }) => {
    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: lead.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1,
        zIndex: isDragging ? 100 : 'auto',
    };

    return (
        <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
            <LeadCard lead={lead} onSelectLead={onSelectLead} />
        </div>
    );
};

const TaskSalesPage: React.FC<TaskSalesPageProps> = ({ leads, onAddLead, onUpdateLead, setLeads }) => {
    const [isCreateModalOpen, setCreateModalOpen] = useState(false);
    const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
    const [boardData, setBoardData] = useState<Map<LeadColumnStatus, Lead[]>>(new Map());
    const [activeLead, setActiveLead] = useState<Lead | null>(null);

    useEffect(() => {
        const newBoardData = new Map<LeadColumnStatus, Lead[]>();
        columnOrder.forEach(status => {
            newBoardData.set(status, []);
        });
        leads.forEach(lead => {
            const columnLeads = newBoardData.get(lead.status);
            if(columnLeads) {
                columnLeads.push(lead);
            }
        });
        setBoardData(newBoardData);
    }, [leads]);

    const { columnsWithData, totalPipelineValue, totalPipelineLeads } = useMemo(() => {
        const columnsWithData = columnOrder.map(status => {
            const leadsInColumn = boardData.get(status) || [];
            const totalValue = leadsInColumn.reduce((sum, lead) => {
                const valueString = lead.paymentCapacity.replace(/[^0-9,-]+/g, "").replace(',', '.');
                const valueMatch = valueString.match(/(\d+(\.\d+)?)/g);
                if (!valueMatch) return sum;
                const value = parseFloat(valueMatch[0]) * 1000;
                return sum + (isNaN(value) ? 0 : value);
            }, 0);

            return {
                id: status,
                title: status,
                leads: leadsInColumn,
                totalValue: totalValue,
                leadCount: leadsInColumn.length
            };
        });

        const totalPipelineValue = columnsWithData.reduce((sum, col) => sum + col.totalValue, 0);
        const totalPipelineLeads = columnsWithData.reduce((sum, col) => sum + col.leadCount, 0);

        return { columnsWithData, totalPipelineValue, totalPipelineLeads };
    }, [boardData]);
    
    const sensors = useSensors(
        useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
        useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
    );

    const findColumnForLead = (id: string): LeadColumnStatus | null => {
        for (const [status, leads] of boardData.entries()) {
            if (leads.some(lead => lead.id === id)) {
                return status;
            }
        }
        return null;
    };

    const handleDragStart = (event: DragStartEvent) => {
        const { active } = event;
        const lead = leads.find(l => l.id === active.id);
        setActiveLead(lead || null);
    };

    const handleDragEnd = (event: DragEndEvent) => {
        setActiveLead(null);
        const { active, over } = event;

        if (!over) return;

        const activeId = active.id.toString();
        const overId = over.id.toString();

        const activeColumn = findColumnForLead(activeId);
        const overIsColumn = columnOrder.includes(overId as LeadColumnStatus);
        const overColumn = overIsColumn ? (overId as LeadColumnStatus) : findColumnForLead(overId);
        
        if (!activeColumn || !overColumn) return;

        const forbiddenColumns = [LeadColumnStatus.VENDA_CONCLUIDA, LeadColumnStatus.VENDAS_PERDIDAS];
        if (activeColumn !== overColumn && forbiddenColumns.includes(overColumn)) {
            return; 
        }
        
        const newBoardData = new Map(boardData.entries());

        if (activeColumn === overColumn) {
            if (activeId !== overId) {
                const columnLeads = newBoardData.get(activeColumn) || [];
                const oldIndex = columnLeads.findIndex(l => l.id === activeId);
                const newIndex = columnLeads.findIndex(l => l.id === overId);
                newBoardData.set(activeColumn, arrayMove(columnLeads, oldIndex, newIndex));
            }
        } else {
            const activeColumnLeads = newBoardData.get(activeColumn) || [];
            const overColumnLeads = newBoardData.get(overColumn) || [];
            
            const activeIndex = activeColumnLeads.findIndex(l => l.id === activeId);
            const [movedItem] = activeColumnLeads.splice(activeIndex, 1);

            const userName = "Marcos";
            const description = `${userName} movimentou lead da coluna ${movedItem.status} PARA A COLUNA ${overColumn}.`;
            const newHistoryItem: LeadHistoryItem = {
                timestamp: new Date().toLocaleString('pt-BR', { dateStyle: 'short', timeStyle: 'short' }).replace(',', ''),
                description,
            };
            movedItem.status = overColumn;
            movedItem.history = [...(movedItem.history || []), newHistoryItem];

            if (overIsColumn) {
                overColumnLeads.push(movedItem);
            } else {
                const overIndex = overColumnLeads.findIndex(l => l.id === overId);
                overColumnLeads.splice(overIndex, 0, movedItem);
            }
            
            newBoardData.set(activeColumn, activeColumnLeads);
            newBoardData.set(overColumn, overColumnLeads);
        }

        const finalLeads = columnOrder.flatMap(status => newBoardData.get(status) || []);
        setLeads(finalLeads);
    };

    const handleCreateLead = (newLeadData: Omit<Lead, 'id'>) => {
        onAddLead(newLeadData);
        setCreateModalOpen(false);
    }
    
    return (
        <main className="flex-1 flex flex-col h-screen font-inter bg-[var(--c-bg-body)] text-[var(--c-text-main)]">
            <header className="bg-[var(--c-bg-card)] shadow-md p-4 flex items-center justify-between flex-shrink-0 border-b border-[var(--c-border-color)]/50">
                <div className="flex items-center space-x-4">
                    <h1 className="text-2xl font-semibold">Sales</h1>
                    <div className="relative">
                        <span className="material-icons absolute left-3 top-1/2 transform -translate-y-1/2 text-[var(--c-text-secondary)]">search</span>
                        <input className="bg-[var(--c-bg-input)] border border-[var(--c-border-color)] rounded-full py-2 pl-10 pr-4 w-full focus:outline-none focus:ring-2 focus:ring-[var(--c-accent-focus)]" placeholder="Buscar Lead" type="text" />
                    </div>
                </div>
                <div className="flex items-center space-x-4">
                     <div className="text-center">
                        <p className="text-2xl font-bold">R$ {Math.round(totalPipelineValue / 1000)} mil - {totalPipelineLeads} Leads</p>
                    </div>
                    <button onClick={() => setCreateModalOpen(true)} className="bg-[var(--c-accent-action)] text-[var(--c-bg-body)] px-4 py-2 rounded-md font-semibold hover:bg-opacity-80 flex items-center">
                        <span className="material-icons-outlined mr-2">add</span> CADASTRAR LEAD
                    </button>
                </div>
            </header>
            
            <DndContext sensors={sensors} collisionDetection={closestCorners} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
                 <div className="flex-1 p-4 overflow-x-auto">
                    <div className="flex space-x-4 min-w-max h-full">
                        {columnsWithData.map((column) => (
                             <SortableContext key={column.id} items={column.leads.map(l => l.id)} id={column.id}>
                                <div className="bg-[var(--c-bg-card)] w-80 rounded-lg shadow-lg flex flex-col h-full">
                                    <div className="p-3 border-b border-[var(--c-border-color)]/50">
                                        <h2 className="font-semibold">{column.title}</h2>
                                        <p className="text-sm text-[var(--c-text-secondary)]">R$ {Math.round(column.totalValue / 1000)} mil - {column.leadCount} Leads</p>
                                        <div className="flex items-center space-x-2 mt-2 text-xs">
                                            <button className="flex items-center p-1 rounded-md border border-[var(--c-border-color)] hover:bg-[var(--c-border-color)] text-[var(--c-text-secondary)]">
                                                FILTRAR POR
                                                <span className="material-icons-outlined text-sm ml-1">arrow_drop_down</span>
                                            </button>
                                            <button className="flex items-center p-1 rounded-md border border-[var(--c-border-color)] hover:bg-[var(--c-border-color)] text-[var(--c-text-secondary)]">
                                                QUALIFICAÇÃO
                                                <span className="material-icons-outlined text-sm ml-1">arrow_drop_down</span>
                                            </button>
                                        </div>
                                    </div>
                                    <div className="p-3 space-y-3 overflow-y-auto flex-1 custom-scrollbar">
                                        {column.leads.map((lead) => (
                                            <SortableLeadCard key={lead.id} lead={lead} onSelectLead={() => setSelectedLead(lead)} />
                                        ))}
                                    </div>
                                </div>
                            </SortableContext>
                        ))}
                    </div>
                </div>
                 {createPortal(
                    <DragOverlay>
                        {activeLead ? <div className="w-80"><LeadCard lead={activeLead} onSelectLead={() => {}} /></div> : null}
                    </DragOverlay>,
                    document.body
                )}
            </DndContext>

            {selectedLead && (
                <LeadDetailModal 
                    lead={selectedLead} 
                    onClose={() => setSelectedLead(null)}
                    onUpdateLead={onUpdateLead}
                />
            )}

            {isCreateModalOpen && (
                <CreateLeadModal
                    onClose={() => setCreateModalOpen(false)}
                    onSubmit={handleCreateLead}
                />
            )}
        </main>
    )
};

export default TaskSalesPage;
