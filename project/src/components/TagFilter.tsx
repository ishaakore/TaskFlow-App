import React from 'react';
import { X } from 'lucide-react';

interface TagFilterProps {
  allTags: string[];
  selectedTags: string[];
  onTagSelect: (tag: string) => void;
  onTagRemove: (tag: string) => void;
  onClearTags: () => void;
}

export const TagFilter: React.FC<TagFilterProps> = ({
  allTags,
  selectedTags,
  onTagSelect,
  onTagRemove,
  onClearTags
}) => {
  if (allTags.length === 0) {
    return null;
  }

  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">Filter by tags</h3>
        {selectedTags.length > 0 && (
          <button
            onClick={onClearTags}
            className="text-xs text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
          >
            Clear all
          </button>
        )}
      </div>
      
      <div className="flex flex-wrap gap-2">
        {selectedTags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-2 w-full">
            {selectedTags.map(tag => (
              <span 
                key={tag}
                className="inline-flex items-center gap-1 px-2 py-1 rounded-md text-sm bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300"
              >
                {tag}
                <button 
                  onClick={() => onTagRemove(tag)}
                  className="ml-1 text-purple-600 hover:text-purple-800 dark:text-purple-400 dark:hover:text-purple-200"
                >
                  <X className="h-3 w-3" />
                </button>
              </span>
            ))}
          </div>
        )}
        
        {allTags
          .filter(tag => !selectedTags.includes(tag))
          .map(tag => (
            <button
              key={tag}
              onClick={() => onTagSelect(tag)}
              className="px-2 py-1 text-sm rounded-md border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 hover:border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
            >
              {tag}
            </button>
          ))}
      </div>
    </div>
  );
};