import prisma from '../../../prisma/client.js'
import asyncHandler from "express-async-handler";

//** Description: Get all teams members
//** Router: GET /api/teams
//** Access: Private
export const getTeamMembers = asyncHandler(async (req, res) => {
    try {
        const teams = await prisma.team.findMany({
            include: {
                members: {
                    include: {
                        user: {
                            select: { id: true, email: true, name: true }
                        }
                    }
                }
            }
        });

        res.status(200).json(teams);
    } catch (err) {
        console.error('Error fetching teams members:', err);
        res.status(500).json({ message: 'Server Error' });
    }
});

//** Description: Get team member by id
//** Router: GET /api/teams/:id
//** Access: Private
export const getTeamMemberById = asyncHandler(async (req, res) => {
    const { id } = req.params;

    try {
        const member = await prisma.userTeam.findUnique({
            where: { id: parseInt(id) },
            include: {
                user: {
                    select: { id: true, email: true, name: true }
                },
                team: {
                    select: { id: true, name: true }
                }
            }
        });

        if (!member) {
            return res.status(404).json({ message: 'Team member not found' });
        }

        res.status(200).json(member);
    } catch (err) {
        console.error('Error fetching team member:', err);
        res.status(500).json({ message: 'Server Error' });
    }
});

//** Description: Create a new team
//** Router: POST /api/teams
//** Access: Private
export const createTeam = asyncHandler(async (req, res) => {
    const { name, description } = req.body;

    if (!name) {
        return res.status(400).json({ message: 'Please provide a name for the team' });
    }

    try {
        const team = await prisma.team.create({
            data: {
                name,
                description,
                createdAt: new Date(),
                updatedAt: new Date()
            }
        });

        res.status(201).json(team);
    } catch (err) {
        console.error('Error creating team:', err);
        res.status(500).json({ message: 'Server Error' });
    }
});

//** Description: Add user to team
//** Router: POST /api/teams/:id/members
//** Access: Private
export const addUserToTeam = asyncHandler(async (req, res) => {
    const { id } = req.params; // Team ID
    const { userId } = req.body; // User ID

    try {
        // Проверка существования команды
        const team = await prisma.team.findUnique({
            where: { id: parseInt(id) }
        });

        if (!team) {
            return res.status(404).json({ message: 'Team not found' });
        }

        // Проверка существования пользователя
        const user = await prisma.user.findUnique({
            where: { id: parseInt(userId) }
        });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Добавление пользователя в команду
        const userTeam = await prisma.userTeam.create({
            data: {
                userId: parseInt(userId),
                teamId: parseInt(id)
            }
        });

        res.status(201).json(userTeam);
    } catch (err) {
        console.error('Error adding user to team:', err);
        res.status(500).json({ message: 'Server Error' });
    }
});

//** Description: Update team member by id
//** Router: PUT /api/teams/:id
//** Access: Private
export const updateTeamMember = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { role } = req.body;

    try {
        const member = await prisma.userTeam.findUnique({
            where: { id: parseInt(id) }
        });

        if (!member) {
            return res.status(404).json({ message: 'Team member not found' });
        }

        const updatedMember = await prisma.userTeam.update({
            where: { id: parseInt(id) },
            data: {
                role,
                updatedAt: new Date()
            }
        });

        res.status(200).json(updatedMember);
    } catch (err) {
        console.error('Error updating team member:', err);
        res.status(500).json({ message: 'Server Error' });
    }
});

//** Description: Delete team member by id
//** Router: DELETE /api/teams/:id
//** Access: Private
export const deleteTeamMember = asyncHandler(async (req, res) => {
    const { id } = req.params;

    try {
        const member = await prisma.userTeam.findUnique({
            where: { id: parseInt(id) }
        });

        if (!member) {
            return res.status(404).json({ message: 'Team member not found' });
        }

        await prisma.userTeam.delete({
            where: { id: parseInt(id) }
        });

        res.status(200).json({ message: 'Team member deleted successfully' });
    } catch (err) {
        console.error('Error deleting team member:', err);
        res.status(500).json({ message: 'Server Error' });
    }
});
