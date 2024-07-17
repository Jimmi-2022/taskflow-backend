import express from 'express'
import {protect} from '../../middleware/protect.middleware.js'
import {getMessages, sendMessages} from '../../controllers/message/message.controller.js';

const router = express.Router()

router.get('/', protect, getMessages);
router.post('/', protect, sendMessages);

export default router;
