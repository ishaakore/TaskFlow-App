import React, { useState, useEffect } from 'react';
import { PlusCircle } from 'lucide-react';
import { useTasks } from './hooks/useTasks';
import { Header } from './components/Header';
import { TaskList } from './components/TaskList';
import { TaskForm } from './components/TaskForm';
import { TagFilter } from './components/TagFilter';
import { ProgressSummary } from './components/ProgressSummary';
import { Task, FilterOption, SortOption } from './types';

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Use our custom hook to manage tasks and filtering
  const { 
    tasks, 
    allTasks,
    filter, 
    allTags,
    addTask, 
    toggleTaskCompletion, 
    updateTask, 
    deleteTask, 
    updateFilter 
  } = useTasks();

  // Set up dark mode detection
  useEffect(() => {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setDarkMode(prefersDark);
  }, []);

  // Apply dark mode to document
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  // Handle search term changes
  const handleSearchChange = (term: string) => {
    updateFilter({ searchTerm: term });
  };

  // Handle filter option changes
  const handleFilterChange = (option: FilterOption) => {
    updateFilter({ filterOption: option });
  };

  // Handle sort option changes
  const handleSortChange = (option: SortOption) => {
    updateFilter({ sortOption: option });
  };

  // Handle tag selection
  const handleTagSelect = (tag: string) => {
    updateFilter({ tags: [...filter.tags, tag] });
  };

  // Handle tag removal
  const handleTagRemove = (tag: string) => {
    updateFilter({ tags: filter.tags.filter(t => t !== tag) });
  };

  // Handle clearing all tags
  const handleClearTags = () => {
    updateFilter({ tags: [] });
  };

  // Handle opening the form for editing
  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setShowForm(true);
  };

  // Handle cancelling the form
  const handleCancelForm = () => {
    setShowForm(false);
    setEditingTask(null);
  };

  // Handle adding a new task
  const handleAddTask = (
    title: string, 
    description: string, 
    dueDate: Date | null, 
    priority: Priority, 
    tags: string[]
  ) => {
    addTask(title, description, dueDate, priority, tags);
    setShowForm(false);
  };

  // Handle updating a task
  const handleUpdateTask = (updatedTask: Task) => {
    updateTask(updatedTask);
    setShowForm(false);
    setEditingTask(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-200">
      <Header 
        searchTerm={filter.searchTerm}
        onSearchChange={handleSearchChange}
        filterOption={filter.filterOption}
        onFilterChange={handleFilterChange}
        sortOption={filter.sortOption}
        onSortChange={handleSortChange}
        darkMode={darkMode}
        toggleDarkMode={toggleDarkMode}
        mobileMenuOpen={mobileMenuOpen}
        toggleMobileMenu={() => setMobileMenuOpen(!mobileMenuOpen)}
      />
      
      <main className="container mx-auto pt-24 pb-12 px-4">
        <div className="max-w-3xl mx-auto">
          <ProgressSummary tasks={tasks} allTasks={allTasks} />
          
          <div className="mb-6 flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
              {filter.filterOption === 'all' ? 'All Tasks' : 
               filter.filterOption === 'active' ? 'Active Tasks' : 
               'Completed Tasks'}
            </h1>
            
            <button
              onClick={() => {
                setEditingTask(null);
                setShowForm(true);
              }}
              className="flex items-center gap-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200"
            >
              <PlusCircle className="h-5 w-5" />
              <span className="hidden sm:inline">Add Task</span>
            </button>
          </div>
          
          <TagFilter 
            allTags={allTags}
            selectedTags={filter.tags}
            onTagSelect={handleTagSelect}
            onTagRemove={handleTagRemove}
            onClearTags={handleClearTags}
          />
          
          {showForm && (
            <div className="mb-6">
              <TaskForm 
                onAddTask={handleAddTask}
                onUpdateTask={handleUpdateTask}
                onCancel={handleCancelForm}
                editTask={editingTask}
                availableTags={allTags}
              />
            </div>
          )}
          
          <TaskList 
            tasks={tasks}
            onToggleComplete={toggleTaskCompletion}
            onDelete={deleteTask}
            onEdit={handleEditTask}
          />
        </div>
      </main>
    </div>
  );
}

export default App;