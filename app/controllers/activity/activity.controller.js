import asyncHandler from 'express-async-handler'
import prisma from '../../../prisma/client.js'

//** Description: Get activity feed
//** Router: GET /api/activity
//** Access: Private
export const getActivityFeed = asyncHandler(async (req, res) => {
    try {
        const activities = await prisma.activity.findMany({
            include: {
                user: {
                    select: { id: true, name: true, email: true }
                },
                project: {
                    select: { id: true, name: true }
                }
            },
            orderBy: {
                createdAt: 'desc'
            }
        });

        if (!activities || activities.length === 0) {
            return res.status(404).json({ message: 'No activities found' });
        }

        res.status(200).json(activities);
    } catch (err) {
        console.error('Error fetching activity feed:', err);
        res.status(500).json({ message: 'Server Error' });
    }
});


//** Description: Add new activity
//** Router: POST /api/activity
//** Access: Private
export const addActivity = asyncHandler(async (req, res) => {
    const { description, userId, projectId } = req.body;

    if (!description || !userId) {
        return res.status(400).json({ message: 'Please provide a description and userId' });
    }

    try {
        // Проверка существования пользователя
        const userExists = await prisma.user.findUnique({
            where: { id: parseInt(userId) }
        });
        if (!userExists) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Проверка существования проекта, если указан projectId
        let projectExists = null;
        if (projectId) {
            projectExists = await prisma.project.findUnique({
                where: { id: parseInt(projectId) }
            });
            if (!projectExists) {
                return res.status(404).json({ message: 'Project not found' });
            }
        }

        // Создание новой записи активности
        const newActivity = await prisma.activity.create({
            data: {
                description,
                userId: parseInt(userId),
                projectId: projectId ? parseInt(projectId) : null,
                createdAt: new Date()
            }
        });

        res.status(201).json(newActivity);
    } catch (err) {
        console.error('Error creating activity:', err);
        res.status(500).json({ message: 'Server Error', error: err.message });
    }
});