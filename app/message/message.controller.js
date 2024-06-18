const prisma = require('../../config/db');

exports.getMessages = async (req, res) => {
    try {
        const messages = await prisma.message.findMany({
            where: {
                OR: [{ senderId: req.user.id }, { receiverId: req.user.id }],
            },
        });
        res.json(messages);
    } catch (err) {
        res.status(500).send('Server Error');
    }
};

exports.sendMessage = async (req, res) => {
    const { content, receiverId } = req.body;
    try {
        const message = await prisma.message.create({
            data: {
                content,
                senderId: req.user.id,
                receiverId,
            },
        });
        res.json(message);
    } catch (err) {
        res.status(500).send('Server Error');
    }
};