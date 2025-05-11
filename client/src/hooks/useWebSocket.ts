import { useEffect, useRef, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import type { Todo } from '../types/index';

const SOCKET_URL = 'http://localhost:3001';

export const useWebSocket = () => {
  const socketRef = useRef<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [todos, setTodos] = useState<Todo[]>([]);

  // Initialize WebSocket connection
  useEffect(() => {
    // Create socket connection
    socketRef.current = io(SOCKET_URL, {
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    });

    // Set up event listeners
    socketRef.current.on('connect', () => {
      setIsConnected(true);
      console.log('Connected to WebSocket server');
    });

    socketRef.current.on('disconnect', () => {
      setIsConnected(false);
      console.log('Disconnected from WebSocket server');
    });

    socketRef.current.on('todoAdded', (newTodo: Todo) => {
      setTodos(prevTodos => [...prevTodos, newTodo]);
    });

    socketRef.current.on('todoDeleted', (todoId: string | number) => {
      setTodos(prevTodos => prevTodos.filter(todo => todo.id !== todoId));
    });

    // Clean up on unmount
    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, []);

  // Fetch initial todos
  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await fetch(`${SOCKET_URL}/api/fetchAllTasks`);
        if (response.ok) {
          const data = await response.json();
          setTodos(data);
        }
      } catch (error) {
        console.error('Error fetching todos:', error);
      }
    };

    if (isConnected) {
      fetchTodos();
    }
  }, [isConnected]);

  // Function to add a new todo
  const addTodo = (text: string) => {
    if (socketRef.current && text.trim()) {
      socketRef.current.emit('add', text);
    }
  };

  // Function to delete a todo
  const deleteTodo = (id: string | number) => {
    if (socketRef.current && id) {
      socketRef.current.emit('delete', id);
    }
  };

  return { isConnected, todos, addTodo, deleteTodo };
};

// Don't export default - we're using named export
