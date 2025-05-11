import React from 'react';
import TodoItem from './TodoItem';
import type { Todo } from '../types/index';

interface TodoListProps {
  todos: Todo[];
  onDelete?: (id: string | number) => void;
}

const TodoList: React.FC<TodoListProps> = ({ todos, onDelete }) => {
  if (todos.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-8 px-4 text-center">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-300 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
        <p className="text-gray-500">No notes yet. Add one!</p>
      </div>
    );
  }

  return (
    <div className="overflow-y-auto max-h-96 border rounded-lg">
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} onDelete={onDelete} />
      ))}
    </div>
  );
};

export default TodoList;