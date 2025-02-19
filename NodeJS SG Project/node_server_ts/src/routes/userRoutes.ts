import express from 'express';
import { Request , Response, NextFunction } from 'express';

const router = express.Router();

// Middleware de JWT

const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({ error: 'No hay Token' });
    }
};


router.post('/', authenticateToken, () => {});
router.get('/', authenticateToken, () => {});
router.get('/:id', authenticateToken, () => {});
router.put('/:id', authenticateToken, () => {});
router.delete('/:id', authenticateToken, () => {});

export default router;