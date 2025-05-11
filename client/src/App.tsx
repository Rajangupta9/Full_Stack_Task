import React from 'react';
import TodoInput from './components/TodoInput';
import TodoList from './components/TodoList';
import { useWebSocket } from './hooks/useWebSocket';

const App: React.FC = () => {
  const { todos, addTodo, deleteTodo, isConnected } = useWebSocket();

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <div className="flex items-center mb-6">
          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-blue-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-800">Note App</h1>
          
          {/* Connection status indicator */}
          <div className="ml-auto">
            {isConnected ? (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                <span className="h-2 w-2 mr-1 bg-green-400 rounded-full"></span>
                Connected
              </span>
            ) : (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                <span className="h-2 w-2 mr-1 bg-red-400 rounded-full"></span>
                Offline
              </span>
            )}
          </div>
        </div>
        
        <TodoInput onAddTodo={addTodo} />
        
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-xl font-semibold text-gray-800">Notes</h2>
          <span className="text-sm font-medium bg-blue-100 text-blue-800 py-0.5 px-2 rounded-full">
            {todos.length}
          </span>
        </div>
        
        <TodoList todos={todos} onDelete={deleteTodo} />
        
        {!isConnected && (
          <div className="mt-4 p-3 bg-red-100 text-red-800 rounded flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            Not connected to the server. Please check your connection.
          </div>
        )}
      </div>
    </div>
  );
};

export default App;