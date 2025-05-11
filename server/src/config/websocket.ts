import { Server as HttpServer } from 'http';
import { Server, Socket } from 'socket.io';
import todoController from '../controllers/todoControllers';

export const setupWebSocketServer = (httpServer: HttpServer): Server => {
  // Initialize Socket.IO with CORS configuration
  const io = new Server(httpServer, {
    cors: {
      origin: ['http://localhost:5173', 'http://127.0.0.1:3000'],
      methods: ['GET', 'POST'],
      credentials: true
    }
  });

  // Set the io instance in the controller
  todoController.setIo(io);

  // Handle socket connections
  io.on('connection', (socket: Socket) => {
    console.log(`Client connected: ${socket.id}`);

    // Handle add todo event
    socket.on('add', async (text: string) => {
      await todoController.handleAddTodo(text);
    });

    // Handle delete todo event
    socket.on('delete', async (id: string | number) => {
      await todoController.handleDeleteTodo(id);
    });

    // Handle disconnection
    socket.on('disconnect', () => {
      console.log(`Client disconnected: ${socket.id}`);
    });
  });

  return io;
};