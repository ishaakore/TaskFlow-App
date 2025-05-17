export type Priority = 'low' | 'medium' | 'high';

export interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  createdAt: Date;
  dueDate: Date | null;
  priority: Priority;
  tags: string[];
}

export type SortOption = 'dueDate' | 'priority' | 'createdAt';

export type FilterOption = 'all' | 'completed' | 'active';

export interface TaskFilter {
  searchTerm: string;
  filterOption: FilterOption;
  sortOption: SortOption;
  tags: string[];
}