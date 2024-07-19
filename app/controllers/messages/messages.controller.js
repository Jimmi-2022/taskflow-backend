import prisma from '../../../prisma/client.js'
import asyncHandler from "express-async-handler";


//** Description: Send messages
//** Router: POST /api/messages
//** Access: Private
export const sendMessages = asyncHandler(async (req, res) => {
    const { content, senderId, receiverId } = req.body;

    if (!content || !senderId || !receiverId) {
        return res.status(400).json({ message: 'Please provide content, senderId, and receiverId' });
    }

    // Проверка существования отправителя
    const sender = await prisma.user.findUnique({
        where: { id: parseInt(senderId) }
    });

    if (!sender) {
        return res.status(404).json({ message: 'Sender not found' });
    }

    // Проверка существования получателя
    const receiver = await prisma.user.findUnique({
        where: { id: parseInt(receiverId) }
    });

    if (!receiver) {
        return res.status(404).json({ message: 'Receiver not found' });
    }

    try {
        const message = await prisma.message.create({
            data: {
                content,
                senderId: parseInt(senderId),
                receiverId: parseInt(receiverId),
            },
        });
        res.status(201).json(message);
    } catch (err) {
        console.error('Error creating message:', err);
        res.status(500).json({ message: 'Server Error' });
    }
})

//** Description: Get messages
//** Router: GET /api/messages
//** Access: Private
export const getMessages = asyncHandler(async (req, res) => {
    try {
        const messages = await prisma.message.findMany({
            where: {
                OR: [{ senderId: req.user.id }, { receiverId: req.user.id }],
            },
            include: {
                sender: {
                    select: { id: true, email: true, name: true }
                },
                receiver: {
                    select: { id: true, email: true, name: true }
                }
            },
            orderBy: {
                timestamp: 'desc'
            }
        });
        res.status(200).json(messages);
    } catch (err) {
        console.error('Error fetching messages:', err);
        res.status(500).json({ message: 'Server Error' });
    }
})


//** Description: Get message by id
//** Router: GET /api/messages/:id
//** Access: Private
export const getMessageById = asyncHandler(async (req, res) => {
    const { id } = req.params;
    try {
        const message = await prisma.message.findUnique({
            where: { id: parseInt(id) },
            include: {
                sender: {
                    select: { id: true, email: true, name: true }
                },
                receiver: {
                    select: { id: true, email: true, name: true }
                }
            }
        });

        if (!message) {
            return res.status(404).json({ message: 'Message not found' });
        }

        res.status(200).json(message);
    } catch (err) {
        console.error('Error fetching message:', err);
        res.status(500).json({ message: 'Server Error' });
    }
})

//** Description: Delete message by id
//** Router: DELETE /api/messages/:id
//** Access: Private
export const deleteMessage = asyncHandler(async (req, res) => {
    const { id } = req.params;
    try {
        const message = await prisma.message.findUnique({
            where: { id: parseInt(id) }
        });

        if (!message) {
            return res.status(404).json({ message: 'Message not found' });
        }

        await prisma.message.delete({
            where: { id: parseInt(id) }
        });

        res.status(200).json({ message: 'Message deleted successfully' });
    } catch (err) {
        console.error('Error deleting message:', err);
        res.status(500).json({ message: 'Server Error' });
    }
})

//** Description: Delete all messages
//** Router: DELETE /api/messages
//** Access: Private
export const deleteAllMessages = asyncHandler(async (req, res) => {
    try {
        await prisma.message.deleteMany({});
        res.status(200).json({ message: 'All messages deleted successfully' });
    } catch (err) {
        console.error('Error deleting all messages:', err);
        res.status(500).json({ message: 'Server Error' });
    }
})