import express from 'express';
import {protect} from '../../middleware/protect.middleware.js'
import {
    addUserToTeam,
    createTeam,
    deleteTeamMember,
    getTeamMemberById,
    getTeamMembers,
    updateTeamMember
} from '../../controllers/teams/teams.controller.js'

const router = express.Router()

// Получение списка участников команды
router.get('/', protect, getTeamMembers)

// Получение информации о конкретном участнике
router.get('/:id', protect, getTeamMemberById)

// Создание новой команды
router.post('/', protect, createTeam)

// Добавление пользователя в команду
router.post('/:id/members', protect, addUserToTeam)

// Обновление информации о участнике
router.put('/:id', protect, updateTeamMember)

// Удаление участника
router.delete('/:id', protect, deleteTeamMember)

export default router