import React from 'react';
import { Task, TaskPriority, TaskStatus } from '../types';

interface TaskItemProps {
  task: Task;
  onViewTask: (task: Task) => void;
}

const getPriorityClasses = (priority: TaskPriority) => {
  switch (priority) {
    case TaskPriority.HIGH: // 1 - Changed to Red as per original
      return 'bg-red-500';
    case TaskPriority.MEDIUM: // 2 - Changed to Amber as per original
      return 'bg-amber-500';
    case TaskPriority.LOW: // 3
      return 'bg-green-500';
    default:
      return 'bg-gray-400';
  }
};

const TaskItem = ({ task, onViewTask }: TaskItemProps) => {
  const priorityClasses = getPriorityClasses(task.priority);
  return (
    <div 
      className={`grid grid-cols-12 gap-4 items-center py-3 px-2 rounded-lg transition-all duration-200 border-b border-[var(--c-border-color)]/50 last:border-b-0 ${task.title ? 'cursor-pointer hover:bg-white/5' : ''}`}
      onClick={() => task.title && onViewTask(task)}
    >
      <div className="col-span-2 font-medium text-[var(--c-text-main)]">{task.time}</div>
      <div className="col-span-1 flex justify-start">
        <span className={`${priorityClasses} w-7 h-7 flex items-center justify-center rounded-full text-white font-bold text-sm shadow-sm`}>
          {task.priority}
        </span>
      </div>
      <div className="col-span-7">
        {task.isWindow ? (
          <div className="bg-[var(--c-bg-body)] py-2 rounded-md text-[var(--c-text-secondary)] text-center font-medium">
            {task.description}
          </div>
        ) : (
          <p className="text-[var(--c-text-main)]">{task.description}</p>
        )}
      </div>
      <div className="col-span-2 flex justify-center">
        {task.status === TaskStatus.DONE ? (
          <span className="material-icons text-[var(--c-accent-action)] text-3xl">check_circle</span>
        ) : (
          <span className="material-icons text-[var(--c-text-secondary)] text-3xl">radio_button_unchecked</span>
        )}
      </div>
    </div>
  );
};

interface TaskListProps {
  tasks: Task[];
  onViewTask: (task: Task) => void;
}

export const TaskList = ({ tasks, onViewTask }: TaskListProps) => {
  return (
    <div className="bg-[var(--c-bg-card)] rounded-2xl shadow-lg border border-[var(--c-border-color)]">
      <div className="bg-[var(--c-bg-sidebar)] p-6 text-white rounded-t-2xl">
        <h3 className="text-2xl font-bold text-center tracking-wider text-[var(--c-text-main)] font-neue-machina">YOUR TASK LIST</h3>
      </div>
      <div className="p-4 md:p-6">
        <div className="grid grid-cols-12 gap-4 mb-4 text-[var(--c-text-secondary)] font-semibold px-2">
          <div className="col-span-2">HORA</div>
          <div className="col-span-1">NP</div>
          <div className="col-span-7">TASK</div>
          <div className="col-span-2 text-center">DUN</div>
        </div>
        <div className="space-y-1">
          {tasks.map((task) => (
            <TaskItem key={task.id} task={task} onViewTask={onViewTask} />
          ))}
        </div>
      </div>
    </div>
  );
};