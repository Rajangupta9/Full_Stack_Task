import { v4 as uuidv4 } from 'uuid';
import cacheService from '../services/cacheService';
import { Todo } from '../types';

class TodoModel {
  // Get all todos from both cache and DB
  async getAll(): Promise<Todo[]> {
    try {
      return await cacheService.getAllTodosFromCacheAndDB();
    } catch (error) {
      console.error('Error in todo model getAll:', error);
      return [];
    }
  }

  // Create a new todo
  async create(text: string): Promise<Todo> {
    try {
      const newTodo: Todo = {
        id: uuidv4(),
        text,
        completed: false,
        createdAt: new Date()
      };
      
      await cacheService.addTodo(newTodo);
      return newTodo;
    } catch (error) {
      console.error('Error in todo model create:', error);
      throw error;
    }
  }

  // Delete a todo
  async delete(id: string | number): Promise<boolean> {
    try {
      // Since we have a distributed storage (Redis + MongoDB), 
      // we need to handle deletion from both sources
      await cacheService.deleteTodo(id);
      return true;
    } catch (error) {
      console.error('Error in todo model delete:', error);
      throw error;
    }
  }
}

export default new TodoModel();