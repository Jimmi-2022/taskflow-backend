import express from 'express'
import {protect} from '../../middleware/protect.middleware.js'
import {addActivity, getActivityFeed} from "../../controllers/activity/activity.controller.js";

const router = express.Router()

// Получение ленты активности
router.get('/', protect, getActivityFeed)

// Добавление новой активности
router.post('/', protect, addActivity)

export default router