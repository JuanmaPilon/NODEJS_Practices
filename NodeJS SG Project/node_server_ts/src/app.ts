import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import authRoutes from './routes/authRoutes';




const app = express();

app.use(express.json());

// Rutas
app.use('/auth', authRoutes)

// Auth
// Usuarios

console.log('Executing app.ts');

export default app;