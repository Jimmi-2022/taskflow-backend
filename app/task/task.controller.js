const prisma = require('../../config/db');

exports.getTasks = async (req, res) => {
    try {
        const tasks = await prisma.task.findMany({
            where: { userId: req.user.id },
        });
        res.json(tasks);
    } catch (err) {
        res.status(500).send('Server Error');
    }
};

exports.createTask = async (req, res) => {
    const { title, description } = req.body;
    try {
        const task = await prisma.task.create({
            data: {
                title,
                description,
                userId: req.user.id,
            },
        });
        res.json(task);
    } catch (err) {
        res.status(500).send('Server Error');
    }
};

exports.updateTask = async (req, res) => {
    const { title, description, status } = req.body;
    try {
        let task = await prisma.task.findUnique({
            where: { id: parseInt(req.params.id) },
        });
        if (!task) return res.status(404).json({ msg: 'Task not found' });

        task = await prisma.task.update({
            where: { id: parseInt(req.params.id) },
            data: { title, description, status },
        });

        res.json(task);
    } catch (err) {
        res.status(500).send('Server Error');
    }
};

exports.deleteTask = async (req, res) => {
    try {
        await prisma.task.delete({
            where: { id: parseInt(req.params.id) },
        });
        res.json({ msg: 'Task removed' });
    } catch (err) {
        res.status(500).send('Server Error');
    }
};
