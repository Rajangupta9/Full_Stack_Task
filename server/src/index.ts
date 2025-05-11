import express from 'express';
import http from 'http';
import cors from 'cors';
import todoRoutes from './routes/todoRoutes';
import { setupWebSocketServer } from './config/websocket';

// Create Express app
const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// API routes
app.use('/api', todoRoutes);

// Create HTTP server
const server = http.createServer(app);

// Setup WebSocket server
const io = setupWebSocketServer(server);

// Start server
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`WebSocket server is ready`);
});

// Handle process termination
process.on('SIGINT', async () => {
  console.log('Shutting down server...');
  server.close();
  process.exit(0);
});