const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const prisma = require('./config/db');
const taskRoutes = require('./routes/taskRoutes');
const messageRoutes = require('./routes/messageRoutes');
const authRoutes = require('./routes/authRoutes');

dotenv.config();

const app = express();
app.use(bodyParser.json());

app.use('/api/tasks', taskRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));