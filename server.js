import express from 'express'
import dotenv from 'dotenv'
import chalk from 'chalk'
import authRoutes from './app/routes/auth/auth.routes.js'
import usersRoutes from "./app/routes/users/users.routes.js";
import messageRoutes from "./app/routes/message/message.routes.js";
import projectRoutes from "./app/routes/projects/projects.routes.js";
import taskRoutes from "./app/routes/tasks/tasks.routes.js";
import teamsRoutes from "./app/routes/teams/teams.routes.js";
import activityRoutes from "./app/routes/acivity/activity.routes.js";
import scheduleRoutes from "./app/routes/schedule/schedule.routes.js";

// Загружаем переменные окружения из .env файла
dotenv.config()

const startServer = async () => {
    const app = express()
    const port = process.env.PORT || 5000

    app.use(express.json())

    // Логирование HTTP-запросов только в режиме разработки
    if (process.env.NODE_ENV === 'development') {
        const morgan = await import('morgan')
        app.use(morgan.default('dev'))
    }

    // Маршруты для аутентификации
    app.use('/api/auth', authRoutes)
    // Подключение маршрутов пользователей
    app.use('/api/users', usersRoutes)
    // Подключение сообщений
    app.use('/api/messages', messageRoutes)
    // Подключение маршрутов проектов
    app.use('/api/projects', projectRoutes)
    // Подключение маршрутов задач
    app.use('/api/tasks', taskRoutes)
    // Подключение маршрутов команд
    app.use('/api/teams', teamsRoutes)
    // Подключение маршрутов активности
    app.use('/api/activity', activityRoutes)
    // Подключение маршрутов для событий
    app.use('/api/schedule', scheduleRoutes)

    app.listen(port, () => {
        console.log(chalk.green(`Server running at http://localhost:${port}`))
    })
}

startServer()
