import express from 'express';
import {protect} from '../../middleware/protect.middleware.js'
import {createTask, deleteTask, getTasks, updateTask} from '../../controllers/task/task.controller.js';

const router = express.Router()

router.route('/').get(protect, getTasks).post(protect, createTask);
router.route('/:id').put(protect, updateTask).delete(protect, deleteTask);

export default router;