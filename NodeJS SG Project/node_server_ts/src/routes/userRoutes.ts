import express from 'express';
import { Request , Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import userController from '../controllers/userController';

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'default-secret';

// Middleware de JWT

const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).json({ error: 'No hay Token' });
    }
    jwt.verify(token, JWT_SECRET, (err , decoded) => {
        if (err) {
            return res.status(403).json({ error: 'Token invalido' });
        }
        next();
    });


router.post('/', authenticateToken, () => { return console.log('post') });
router.get('/', authenticateToken, () => { return console.log('getAll') });
router.get('/:id', authenticateToken, () => { return console.log('getById') });
router.put('/:id', authenticateToken, () => { return console.log('put') });
router.delete('/:id', authenticateToken, () => { return console.log('delete') });

};

export default router;