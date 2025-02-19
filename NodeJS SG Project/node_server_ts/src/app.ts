import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import authRoutes from './routes/authRoutes';
import userRoutes from './routes/userRoutes';




const app = express();

app.use(express.json());

// Rutas
app.use('/auth', authRoutes);
app.use('/users', authRoutes);

// Auth
// Usuarios

console.log('Executing app.ts');

export default app;