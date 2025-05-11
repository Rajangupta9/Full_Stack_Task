import { Request, Response } from "express";
import todoModel from "../models/todoModel";
import { Server as SocketIoServer } from 'socket.io';

class TodoController{
    private io: SocketIoServer | null = null;
    
    setIo(io: SocketIoServer): void{
        this.io = io;
    }
   
    async getAllTodos(req: Request, res: Response): Promise<void> {
        try {
            const todos = await todoModel.getAll();
            res.status(200).json(todos);
        } catch (error) {
            console.error('Error fetching todos:', error);
            res.status(500).json({ error: 'Failed to fetch todos' });
        }
    }
  
    // WebSocket handler to add a new todo
    async handleAddTodo(text: string): Promise<void> {
        try {
            const newTodo = await todoModel.create(text);
         
            // Broadcast to all connected clients
            if (this.io) {
                this.io.emit('todoAdded', newTodo);
            }
        } catch (error) {
            console.error('Error adding todo:', error);
        }
    }
   
    // WebSocket handler to delete a todo
    async handleDeleteTodo(id: string | number): Promise<void> {
        try {
            await todoModel.delete(id);
            
            // Broadcast the deletion to all connected clients
            if (this.io) {
                this.io.emit('todoDeleted', id);
            }
        } catch (error) {
            console.error('Error deleting todo:', error);
        }
    }
}

export default new TodoController();