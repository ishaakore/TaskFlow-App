import React, { useState } from 'react';
import { Check, Clock, Edit, Tag, Trash } from 'lucide-react';
import { Task, Priority } from '../types';

interface TaskItemProps {
  task: Task;
  onToggleComplete: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (task: Task) => void;
}

export const TaskItem: React.FC<TaskItemProps> = ({ 
  task, 
  onToggleComplete, 
  onDelete,
  onEdit
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const priorityColors = {
    low: 'bg-blue-100 text-blue-800',
    medium: 'bg-yellow-100 text-yellow-800',
    high: 'bg-red-100 text-red-800'
  };

  const formatDate = (date: Date | null): string => {
    if (!date) return 'No due date';
    
    return new Intl.DateTimeFormat('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    }).format(date);
  };

  const isOverdue = (date: Date | null): boolean => {
    if (!date) return false;
    return !task.completed && date < new Date();
  };

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div 
      className={`mb-4 rounded-lg border ${
        task.completed 
          ? 'border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-800/50' 
          : 'border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800'
      } shadow-sm transition-all duration-300 hover:shadow-md transform hover:-translate-y-1`}
    >
      <div className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-3">
            <button
              onClick={() => onToggleComplete(task.id)}
              className={`mt-1 flex-shrink-0 h-5 w-5 rounded-full border ${
                task.completed 
                  ? 'border-green-500 bg-green-500 flex items-center justify-center' 
                  : 'border-gray-300 dark:border-gray-600'
              } transition-colors duration-200 hover:border-green-600`}
              aria-label={task.completed ? 'Mark as incomplete' : 'Mark as complete'}
            >
              {task.completed && <Check className="h-3 w-3 text-white" />}
            </button>
            
            <div>
              <h3 
                className={`font-medium text-lg cursor-pointer ${
                  task.completed 
                    ? 'text-gray-500 line-through dark:text-gray-400' 
                    : 'text-gray-800 dark:text-gray-200'
                }`}
                onClick={toggleExpand}
              >
                {task.title}
              </h3>
              
              <div className="mt-1 flex flex-wrap items-center gap-2">
                <span 
                  className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${priorityColors[task.priority]}`}
                >
                  {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                </span>
                
                {task.dueDate && (
                  <span 
                    className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium ${
                      isOverdue(task.dueDate) 
                        ? 'bg-red-100 text-red-800' 
                        : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
                    }`}
                  >
                    <Clock className="h-3 w-3" />
                    {formatDate(task.dueDate)}
                  </span>
                )}
              </div>
            </div>
          </div>
          
          <div className="flex space-x-1">
            <button
              onClick={() => onEdit(task)}
              className="p-1 text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors duration-200"
              aria-label="Edit task"
            >
              <Edit className="h-4 w-4" />
            </button>
            <button
              onClick={() => onDelete(task.id)}
              className="p-1 text-gray-500 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-400 transition-colors duration-200"
              aria-label="Delete task"
            >
              <Trash className="h-4 w-4" />
            </button>
          </div>
        </div>
        
        {isExpanded && (
          <div className="mt-3 pl-8 text-gray-600 dark:text-gray-400 animate-fadeIn">
            <p className="mb-2">{task.description || 'No description provided.'}</p>
            
            {task.tags.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-1">
                {task.tags.map(tag => (
                  <span 
                    key={tag} 
                    className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300"
                  >
                    <Tag className="h-3 w-3" />
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};