import express from 'express'
import {
    createProject,
    deleteProject,
    getProjectById,
    getProjects,
    updateProject
} from '../../controllers/projects/projects.controller.js'
import {protect} from '../../middleware/protect.middleware.js'

const router = express.Router()

// Создание нового проекта
router.post('/', protect, createProject)

// Получение списка проектов
router.get('/', protect, getProjects)

// Получение информации о конкретном проекте
router.get('/:id', protect, getProjectById)

// Удаление проекта
router.delete('/:id', protect, deleteProject)

// Обновление проекта
router.put('/:id', protect, updateProject)

export default router