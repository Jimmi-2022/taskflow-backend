const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const { getMessages, sendMessage } = require('../controllers/messageController');

router.route('/').get(authMiddleware, getMessages).post(authMiddleware, sendMessage);

module.exports = router;
