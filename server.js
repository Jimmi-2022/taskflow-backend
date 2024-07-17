import express from 'express'
import dotenv from 'dotenv'
import chalk from 'chalk'
import authRoutes from './app/routes/auth/auth.routes.js'

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

    app.listen(port, () => {
        console.log(chalk.green(`Server running at http://localhost:${port}`))
    })
}

startServer()
