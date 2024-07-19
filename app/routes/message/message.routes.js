import express from 'express'
import {protect} from '../../middleware/protect.middleware.js'
import {
    deleteAllMessages,
    deleteMessage,
    getMessageById,
    getMessages,
    sendMessages
} from '../../controllers/messages/messages.controller.js';

const router = express.Router()

// Получение всех сообщений (входящие, исходящие, непрочитанные)
router.get('/', protect, getMessages)

// Отправка сообщения
router.post('/', protect, sendMessages)

// Получение деталей конкретного сообщения
router.get('/:id', protect, getMessageById)

// Удаление сообщения
router.delete('/:id', protect, deleteMessage)

// Удаление всех сообщений
router.delete('/', protect, deleteAllMessages)

export default router;
