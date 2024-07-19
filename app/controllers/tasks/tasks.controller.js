import prisma from '../../../prisma/client.js'
import asyncHandler from "express-async-handler";

//** Description: Create new task
//** Router: POST /api/tasks
//** Access: Private
export const createTask = asyncHandler(async (req, res) => {
    const { title, description, status, projectId } = req.body;

    if (!title) {
        return res.status(400).json({ message: 'Please provide a title for the task' });
    }

    try {
        // Проверка существования projectId, если он передан
        if (projectId) {
            const project = await prisma.project.findUnique({
                where: { id: parseInt(projectId) }
            });

            if (!project) {
                return res.status(404).json({ message: 'Project not found' });
            }
        }

        const task = await prisma.task.create({
            data: {
                title,
                description,
                status: status || 'todo',
                userId: req.user.id, // Предполагается, что req.user.id содержит ID вошедшего пользователя
                projectId: projectId ? parseInt(projectId) : null // Убедитесь, что projectId является числом или null
            }
        });
        res.status(201).json(task);
    } catch (err) {
        console.error('Error creating task:', err);
        res.status(500).json({ message: 'Server Error' });
    }
});


//** Description: Get all tasks
//** Router: GET /api/tasks
//** Access: Private
export const getTasks = asyncHandler(async (req, res) => {
    try {
        const tasks = await prisma.task.findMany({
            where: {
                userId: req.user.id // Предполагается, что мы получаем задачи для текущего пользователя
            },
            include: {
                user: {
                    select: { id: true, email: true, name: true }
                },
                project: {
                    select: { id: true, name: true }
                }
            },
            orderBy: {
                createdAt: 'desc'
            }
        });
        res.status(200).json(tasks);
    } catch (err) {
        console.error('Error fetching tasks:', err);
        res.status(500).json({ message: 'Server Error' });
    }
});

//** Description: Get task by id
//** Router: GET /api/tasks/:id
//** Access: Private
export const getTaskById = asyncHandler(async (req, res) => {
    const { id } = req.params;

    try {
        const task = await prisma.task.findUnique({
            where: { id: parseInt(id) },
            include: {
                user: {
                    select: { id: true, email: true, name: true }
                },
                project: {
                    select: { id: true, name: true }
                }
            }
        });

        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        // Убедитесь, что задача принадлежит текущему пользователю
        if (task.userId !== req.user.id) {
            return res.status(401).json({ message: 'Not authorized to view this task' });
        }

        res.status(200).json(task);
    } catch (err) {
        console.error('Error fetching task:', err);
        res.status(500).json({ message: 'Server Error' });
    }
});

//** Description: Update task by id
//** Router: PUT /api/tasks/:id
//** Access: Private
export const updateTask = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { title, description, status, projectId } = req.body;

    if (!title) {
        return res.status(400).json({ message: 'Please provide a title for the task' });
    }

    try {
        // Найти задачу
        const task = await prisma.task.findUnique({
            where: { id: parseInt(id) }
        });

        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        // Убедитесь, что задача принадлежит текущему пользователю
        if (task.userId !== req.user.id) {
            return res.status(401).json({ message: 'Not authorized to update this task' });
        }

        // Проверка существования projectId, если он передан
        if (projectId) {
            const project = await prisma.project.findUnique({
                where: { id: parseInt(projectId) }
            });

            if (!project) {
                return res.status(404).json({ message: 'Project not found' });
            }
        }

        const updatedTask = await prisma.task.update({
            where: { id: parseInt(id) },
            data: {
                title,
                description,
                status: status || 'todo',
                projectId: projectId ? parseInt(projectId) : null,
                updatedAt: new Date()
            }
        });

        res.status(200).json(updatedTask);
    } catch (err) {
        console.error('Error updating task:', err);
        res.status(500).json({ message: 'Server Error' });
    }
});

//** Description: Delete task by id
//** Router: DELETE /api/tasks/:id
//** Access: Private
export const deleteTask = asyncHandler(async (req, res) => {
    const { id } = req.params;

    try {
        // Найти задачу
        const task = await prisma.task.findUnique({
            where: { id: parseInt(id) }
        });

        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        // Убедитесь, что задача принадлежит текущему пользователю
        if (task.userId !== req.user.id) {
            return res.status(401).json({ message: 'Not authorized to delete this task' });
        }

        await prisma.task.delete({
            where: { id: parseInt(id) }
        });

        res.status(200).json({ message: 'Task deleted successfully' });
    } catch (err) {
        console.error('Error deleting task:', err);
        res.status(500).json({ message: 'Server Error' });
    }
});