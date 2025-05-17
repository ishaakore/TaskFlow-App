import { useState, useEffect } from 'react';
import { Task, TaskFilter, Priority, FilterOption, SortOption } from '../types';

// Helper function to generate a unique ID
const generateId = (): string => {
  return Math.random().toString(36).substr(2, 9);
};

// Helper function to get demo tasks
const getDemoTasks = (): Task[] => {
  return [
    {
      id: generateId(),
      title: 'Complete project proposal',
      description: 'Draft the initial project proposal with budget estimates',
      completed: false,
      createdAt: new Date(),
      dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
      priority: 'high',
      tags: ['work', 'project']
    },
    {
      id: generateId(),
      title: 'Buy groceries',
      description: 'Get milk, eggs, bread, and vegetables',
      completed: true,
      createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      dueDate: new Date(Date.now() - 12 * 60 * 60 * 1000),
      priority: 'medium',
      tags: ['personal', 'shopping']
    },
    {
      id: generateId(),
      title: 'Schedule dentist appointment',
      description: 'Call Dr. Smith for a check-up',
      completed: false,
      createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      priority: 'low',
      tags: ['health', 'personal']
    }
  ];
};

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>(getDemoTasks());
  const [filter, setFilter] = useState<TaskFilter>({
    searchTerm: '',
    filterOption: 'all',
    sortOption: 'dueDate',
    tags: []
  });
  
  const [allTags, setAllTags] = useState<string[]>(['work', 'project', 'personal', 'shopping', 'health']);

  // Function to add a new task
  const addTask = (
    title: string, 
    description: string, 
    dueDate: Date | null, 
    priority: Priority,
    tags: string[]
  ) => {
    const newTask: Task = {
      id: generateId(),
      title,
      description,
      completed: false,
      createdAt: new Date(),
      dueDate,
      priority,
      tags
    };
    
    setTasks([...tasks, newTask]);
    
    // Update all tags
    const newTags = tags.filter(tag => !allTags.includes(tag));
    if (newTags.length > 0) {
      setAllTags([...allTags, ...newTags]);
    }
  };

  // Function to toggle task completion
  const toggleTaskCompletion = (id: string) => {
    setTasks(
      tasks.map(task => 
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  // Function to update a task
  const updateTask = (updatedTask: Task) => {
    setTasks(
      tasks.map(task => 
        task.id === updatedTask.id ? updatedTask : task
      )
    );
    
    // Update all tags
    const newTags = updatedTask.tags.filter(tag => !allTags.includes(tag));
    if (newTags.length > 0) {
      setAllTags([...allTags, ...newTags]);
    }
  };

  // Function to delete a task
  const deleteTask = (id: string) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  // Function to update filter options
  const updateFilter = (newFilter: Partial<TaskFilter>) => {
    setFilter({ ...filter, ...newFilter });
  };

  // Get filtered and sorted tasks
  const getFilteredTasks = (): Task[] => {
    // First filter by status
    let filteredTasks = tasks.filter(task => {
      if (filter.filterOption === 'completed') return task.completed;
      if (filter.filterOption === 'active') return !task.completed;
      return true; // 'all'
    });
    
    // Then filter by search term
    if (filter.searchTerm) {
      const searchLower = filter.searchTerm.toLowerCase();
      filteredTasks = filteredTasks.filter(
        task => 
          task.title.toLowerCase().includes(searchLower) || 
          task.description.toLowerCase().includes(searchLower)
      );
    }
    
    // Filter by tags if any are selected
    if (filter.tags.length > 0) {
      filteredTasks = filteredTasks.filter(
        task => task.tags.some(tag => filter.tags.includes(tag))
      );
    }
    
    // Sort the tasks
    return filteredTasks.sort((a, b) => {
      switch (filter.sortOption) {
        case 'dueDate':
          // Handle null due dates
          if (a.dueDate === null) return 1;
          if (b.dueDate === null) return -1;
          return a.dueDate.getTime() - b.dueDate.getTime();
        case 'priority':
          const priorityOrder = { high: 0, medium: 1, low: 2 };
          return priorityOrder[a.priority] - priorityOrder[b.priority];
        case 'createdAt':
          return b.createdAt.getTime() - a.createdAt.getTime();
        default:
          return 0;
      }
    });
  };

  return {
    tasks: getFilteredTasks(),
    allTasks: tasks,
    filter,
    allTags,
    addTask,
    toggleTaskCompletion,
    updateTask,
    deleteTask,
    updateFilter
  };
}