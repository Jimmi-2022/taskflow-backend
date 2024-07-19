import express from 'express';
import {protect} from '../../middleware/protect.middleware.js'
import {createTask, deleteTask, getTaskById, getTasks, updateTask} from '../../controllers/tasks/tasks.controller.js';

const router = express.Router()

// Создание новой задачи
router.post('/', protect, createTask)

// Получение списка задач
router.get('/', protect, getTasks)

// Получение информации о конкретной задаче
router.get('/:id', protect, getTaskById)

// Обновление информации о задаче
router.put('/:id', protect, updateTask)

// Удаление задачи
router.delete('/:id', protect, deleteTask)

export default router