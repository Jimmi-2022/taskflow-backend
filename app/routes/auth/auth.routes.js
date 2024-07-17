import express from 'express';
import {authenticateUser, getProfile, registerUser} from '../../controllers/auth/auth.controller.js'
import {protect} from '../../middleware/protect.middleware.js'

const router = express.Router()

router.post('/register', registerUser)
router.post('/login', authenticateUser)
router.get('/profile', protect, getProfile) // Защищенный маршрут для получения профиля пользователя

export default router

