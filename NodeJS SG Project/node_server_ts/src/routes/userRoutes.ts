import express from 'express';
import { Request , Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { createUser, getAllUsers, getUserById, updateUser, deleteUser } from '../controllers/userController';

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'default-secret';

// Middleware de JWT

const authenticateToken = (req: Request, res: Response, next: NextFunction) : void  => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) {
     res.status(401).json({ error: 'No hay Token' });
    }
    jwt.verify(token, JWT_SECRET, (err , decoded) => {
        if (err) {
            res.status(403).json({ error: 'Token invalido' });
        }
        next();
    });
};

router.post('/', authenticateToken, createUser );
router.get('/', authenticateToken, getAllUsers );
router.get('/:id', authenticateToken, getUserById );
router.put('/:id', authenticateToken, updateUser );
router.delete('/:id', authenticateToken, deleteUser);

export default router;