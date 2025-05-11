import React, { useState } from 'react';

interface TodoInputProps {
  onAddTodo: (text: string) => void;
}

const TodoInput: React.FC<TodoInputProps> = ({ onAddTodo }) => {
  const [text, setText] = useState('');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      onAddTodo(text);
      setText('');
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="flex w-full mb-6">
      <input
        type="text"
        placeholder="New Note..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="flex-grow p-3 border rounded-l focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        type="submit"
        className="flex items-center justify-center px-4 py-3 bg-blue-600 text-white rounded-r hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-700"
        aria-label="Add note"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
        </svg>
        Add
      </button>
    </form>
  );
};

export default TodoInput;