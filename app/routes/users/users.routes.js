import express from 'express';
import {protect} from "../../middleware/protect.middleware.js";
import {deleteUser, getUserById, getUsers, updateUser} from "../../controllers/users/user.controller.js";

const router = express.Router()

router.get('/', protect, getUsers)
router.get('/:id', protect, getUserById)
router.delete('/:id', protect, deleteUser)
router.put('/:id', protect, updateUser)

export default router;