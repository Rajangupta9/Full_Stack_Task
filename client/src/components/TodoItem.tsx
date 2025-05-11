import React from 'react';
import type { Todo } from '../types/index';

interface TodoItemProps {
  todo: Todo;
  onDelete?: (id: string | number) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, onDelete }) => {
  return (
    <div className="group p-4 border-b border-gray-200 hover:bg-gray-50 flex justify-between items-center">
      <p className="text-gray-800 break-words">{todo.text}</p>
      {onDelete && (
        <button
          onClick={() => onDelete(todo.id)}
          className="opacity-0 group-hover:opacity-100 ml-3 text-red-500 hover:text-red-700 focus:outline-none transition-opacity"
          aria-label="Delete note"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
        </button>
      )}
    </div>
  );
};

export default TodoItem;