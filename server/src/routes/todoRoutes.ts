import express from 'express';
import todoController from '../controllers/todoControllers';

const router = express.Router();

// Route to fetch all todos
router.get('/fetchAllTasks', todoController.getAllTodos.bind(todoController));

export default router;