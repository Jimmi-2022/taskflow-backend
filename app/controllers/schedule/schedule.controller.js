import prisma from '../../../prisma/client.js'
import asyncHandler from "express-async-handler";

//** Description: Get schedule of events and tasks
//** Router: GET /api/schedule
//** Access: Private
export const getSchedule = asyncHandler(async (req, res) => {
    try {
        // Получение событий
        const events = await prisma.event.findMany({
            where: { userId: req.user.id }, // Предполагается, что req.user.id содержит ID вошедшего пользователя
            orderBy: {
                startTime: 'asc'
            }
        });

        // Получение задач
        const tasks = await prisma.task.findMany({
            where: { userId: req.user.id }, // Предполагается, что req.user.id содержит ID вошедшего пользователя
            orderBy: {
                createdAt: 'asc'
            }
        });

        res.status(200).json({ events, tasks });
    } catch (err) {
        console.error('Error fetching schedule:', err);
        res.status(500).json({ message: 'Server Error', error: err.message });
    }
});

//** Description: Get specific event by ID
//** Router: GET /api/schedule/:id
//** Access: Private
export const getEventById = asyncHandler(async (req, res) => {
    const { id } = req.params;

    try {
        const event = await prisma.event.findUnique({
            where: { id: parseInt(id) },
            include: {
                user: {
                    select: { id: true, name: true, email: true }
                }
            }
        });

        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }

        res.status(200).json(event);
    } catch (err) {
        console.error('Error fetching event:', err);
        res.status(500).json({ message: 'Server Error', error: err.message });
    }
});

//** Description: Create new event
//** Router: POST /api/schedule
//** Access: Private
export const createEvent = asyncHandler(async (req, res) => {
    const { title, description, startTime, endTime, userId } = req.body;

    if (!title || !startTime || !endTime || !userId) {
        return res.status(400).json({ message: 'Please provide title, startTime, endTime, and userId' });
    }

    try {
        // Проверка существования пользователя
        const userExists = await prisma.user.findUnique({
            where: { id: parseInt(userId) }
        });
        if (!userExists) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Создание нового события
        const newEvent = await prisma.event.create({
            data: {
                title,
                description,
                startTime: new Date(startTime),
                endTime: new Date(endTime),
                userId: parseInt(userId),
                createdAt: new Date(),
                updatedAt: new Date()
            }
        });

        res.status(201).json(newEvent);
    } catch (err) {
        console.error('Error creating event:', err);
        res.status(500).json({ message: 'Server Error', error: err.message });
    }
});

//** Description: Update event by ID
//** Router: PUT /api/schedule/:id
//** Access: Private
export const updateEventById = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { title, description, startTime, endTime, userId } = req.body;

    if (!title || !startTime || !endTime || !userId) {
        return res.status(400).json({ message: 'Please provide title, startTime, endTime, and userId' });
    }

    try {
        // Проверка существования события
        const eventExists = await prisma.event.findUnique({
            where: { id: parseInt(id) }
        });
        if (!eventExists) {
            return res.status(404).json({ message: 'Event not found' });
        }

        // Проверка существования пользователя
        const userExists = await prisma.user.findUnique({
            where: { id: parseInt(userId) }
        });
        if (!userExists) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Обновление события
        const updatedEvent = await prisma.event.update({
            where: { id: parseInt(id) },
            data: {
                title,
                description,
                startTime: new Date(startTime),
                endTime: new Date(endTime),
                userId: parseInt(userId),
                updatedAt: new Date()
            }
        });

        res.status(200).json(updatedEvent);
    } catch (err) {
        console.error('Error updating event:', err);
        res.status(500).json({ message: 'Server Error', error: err.message });
    }
});

//** Description: Delete event by ID
//** Router: DELETE /api/schedule/:id
//** Access: Private
export const deleteEventById = asyncHandler(async (req, res) => {
    const { id } = req.params;

    try {
        // Проверка существования события
        const event = await prisma.event.findUnique({
            where: { id: parseInt(id) }
        });

        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }

        // Удаление события
        await prisma.event.delete({
            where: { id: parseInt(id) }
        });

        res.status(200).json({ message: 'Event deleted successfully' });
    } catch (err) {
        console.error('Error deleting event:', err);
        res.status(500).json({ message: 'Server Error', error: err.message });
    }
});