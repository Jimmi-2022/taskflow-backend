import express from 'express'
import {protect} from '../../middleware/protect.middleware.js'
import {
    createEvent,
    deleteEventById,
    getEventById,
    getSchedule,
    updateEventById
} from "../../controllers/schedule/schedule.controller.js";

const router = express.Router()

// Получение расписания событий и задач
router.get('/', protect, getSchedule)

// Создание нового события
router.post('/', protect, createEvent)

// Получение информации о конкретном событии
router.get('/:id', protect, getEventById)

// Обновление информации о событии
router.put('/:id', protect, updateEventById)

// Удаление события
router.delete('/:id', protect, deleteEventById)

export default router