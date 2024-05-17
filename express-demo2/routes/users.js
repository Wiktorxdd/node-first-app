
import express from 'express';
import { createUser, getUserId, updateUser, deleteUser } from '../controllers/users.js';


const router = express.Router();

router.get('/', (req, res) => {
    res.send(users);
});
router.get('/:id', getUserId);
router.post('/', createUser);
router.delete('/:id', deleteUser);
router.patch('/:id', updateUser);

export default router;