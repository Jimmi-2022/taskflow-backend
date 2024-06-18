const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const { getTasks, createTask, updateTask, deleteTask } = require('../controllers/taskController');

router.route('/').get(authMiddleware, getTasks).post(authMiddleware, createTask);
router.route('/:id').put(authMiddleware, updateTask).delete(authMiddleware, deleteTask);

module.exports = router;