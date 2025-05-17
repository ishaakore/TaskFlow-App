import React from 'react';
import { Task } from '../types';

interface ProgressSummaryProps {
  tasks: Task[];
  allTasks: Task[];
}

export const ProgressSummary: React.FC<ProgressSummaryProps> = ({ tasks, allTasks }) => {
  // Calculate statistics for visible tasks
  const totalVisible = tasks.length;
  const completedVisible = tasks.filter(task => task.completed).length;
  const visibleCompletionRate = totalVisible > 0 
    ? Math.round((completedVisible / totalVisible) * 100) 
    : 0;
  
  // Calculate statistics for all tasks
  const total = allTasks.length;
  const completed = allTasks.filter(task => task.completed).length;
  const overallCompletionRate = total > 0 
    ? Math.round((completed / total) * 100) 
    : 0;
  
  // Calculate high priority tasks
  const highPriorityTasks = allTasks.filter(task => 
    !task.completed && task.priority === 'high'
  ).length;
  
  // Calculate tasks due today
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  
  const tasksDueToday = allTasks.filter(task => 
    !task.completed && 
    task.dueDate && 
    task.dueDate >= today && 
    task.dueDate < tomorrow
  ).length;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4 mb-6">
      <h2 className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-4">Progress Summary</h2>
      
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-3">
          <p className="text-sm text-gray-500 dark:text-gray-400">Completion Rate</p>
          <div className="mt-2 flex items-end justify-between">
            <div className="w-full max-w-[180px]">
              <div className="h-2 w-full bg-gray-200 dark:bg-gray-600 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-green-500 rounded-full" 
                  style={{ width: `${overallCompletionRate}%` }}
                ></div>
              </div>
            </div>
            <span className="ml-2 text-lg font-medium text-gray-800 dark:text-gray-200">{overallCompletionRate}%</span>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            {completed} of {total} tasks completed
          </p>
        </div>
        
        <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-3">
          <p className="text-sm text-gray-500 dark:text-gray-400">Filtered View</p>
          <div className="mt-2 flex items-end justify-between">
            <div className="w-full max-w-[180px]">
              <div className="h-2 w-full bg-gray-200 dark:bg-gray-600 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-blue-500 rounded-full" 
                  style={{ width: `${visibleCompletionRate}%` }}
                ></div>
              </div>
            </div>
            <span className="ml-2 text-lg font-medium text-gray-800 dark:text-gray-200">{visibleCompletionRate}%</span>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            {completedVisible} of {totalVisible} tasks completed
          </p>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center mr-3">
            <span className="text-red-600 dark:text-red-400 font-medium">{highPriorityTasks}</span>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-800 dark:text-gray-200">High Priority</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">Tasks remaining</p>
          </div>
        </div>
        
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-full bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center mr-3">
            <span className="text-yellow-600 dark:text-yellow-400 font-medium">{tasksDueToday}</span>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-800 dark:text-gray-200">Due Today</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">Tasks to complete</p>
          </div>
        </div>
      </div>
    </div>
  );
};