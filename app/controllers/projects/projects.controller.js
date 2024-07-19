import prisma from '../../../prisma/client.js'
import asyncHandler from "express-async-handler";


///** Description: Create new project
//** Router: POST /api/projects
//** Access: Private
export const createProject = asyncHandler(async (req, res) => {
    const { name, description } = req.body;

    if (!name) {
        return res.status(400).json({ message: 'Please provide a name for the project' });
    }

    try {
        const project = await prisma.project.create({
            data: {
                name,
                description,
                userId: req.user.id // Assuming req.user.id contains the ID of the logged-in user
            }
        });
        res.status(201).json(project);
    } catch (err) {
        console.error('Error creating project:', err);
        res.status(500).json({ message: 'Server Error' });
    }
});

//** Description: Get all projects
//** Router: GET /api/projects
//** Access: Private
export const getProjects = asyncHandler(async (req, res) => {
    try {
        const projects = await prisma.project.findMany({
            where: {
                userId: req.user.id // Предполагается, что мы получаем проекты для текущего пользователя
            },
            include: {
                user: {
                    select: { id: true, email: true, name: true }
                },
                tasks: true // Включаем связанные задачи, если необходимо
            }
        });
        res.status(200).json(projects);
    } catch (err) {
        console.error('Error fetching projects:', err);
        res.status(500).json({ message: 'Server Error' });
    }
});

//** Description: Get project by id
//** Router: GET /api/projects/:id
//** Access: Private
export const getProjectById = asyncHandler(async (req, res) => {
    const { id } = req.params;

    try {
        const project = await prisma.project.findUnique({
            where: { id: parseInt(id) },
            include: {
                user: {
                    select: { id: true, email: true, name: true }
                },
                tasks: true // Включаем связанные задачи, если необходимо
            }
        });

        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }

        // Убедитесь, что проект принадлежит текущему пользователю
        if (project.userId !== req.user.id) {
            return res.status(401).json({ message: 'Not authorized to view this project' });
        }

        res.status(200).json(project);
    } catch (err) {
        console.error('Error fetching project:', err);
        res.status(500).json({ message: 'Server Error' });
    }
});

//** Description: Delete project by id
//** Router: DELETE /api/projects/:id
//** Access: Private
export const deleteProject = asyncHandler(async (req, res) => {
    const { id } = req.params;

    try {
        const project = await prisma.project.findUnique({
            where: { id: parseInt(id) }
        });

        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }

        // Убедитесь, что проект принадлежит текущему пользователю
        if (project.userId !== req.user.id) {
            return res.status(401).json({ message: 'Not authorized to delete this project' });
        }

        await prisma.project.delete({
            where: { id: parseInt(id) }
        });

        res.status(200).json({ message: 'Project deleted successfully' });
    } catch (err) {
        console.error('Error deleting project:', err);
        res.status(500).json({ message: 'Server Error' });
    }
});

//** Description: Update project by id
//** Router: PUT /api/projects/:id
//** Access: Private
export const updateProject = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { name, description } = req.body;

    try {
        const project = await prisma.project.findUnique({
            where: { id: parseInt(id) }
        });

        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }

        // Убедитесь, что проект принадлежит текущему пользователю
        if (project.userId !== req.user.id) {
            return res.status(401).json({ message: 'Not authorized to update this project' });
        }

        const updatedProject = await prisma.project.update({
            where: { id: parseInt(id) },
            data: {
                name,
                description,
                updatedAt: new Date()
            }
        });

        res.status(200).json(updatedProject);
    } catch (err) {
        console.error('Error updating project:', err);
        res.status(500).json({ message: 'Server Error' });
    }
});
