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

        res.status(200).json(activities);
    } catch (err) {
        console.error('Error fetching activity feed:', err);
        res.status(500).json({ message: 'Server Error' });
    }
});