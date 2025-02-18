import { Request, Response } from 'express';
import { hashPassword } from '../services/password.service';
import prisma from '../models/user'
import { generateToken } from '../services/auth.service';
import bcrypt from 'bcrypt';

export const register = async (req: Request, res: Response) : Promise<void> => {
    
    const { email, password } = req.body;

    try {

        if (!password) throw new Error('La contrasenia es requerida');
        if (!email) throw new Error('El email es requerido');
            res.status(400).json({ error: 'El email y la contraseña son requeridos' });
        const hashedPassword =  await hashPassword(password);
        console.log(hashedPassword);

        const user = await prisma.create({
            data: {
                email,
                password: hashedPassword
            }
        });

        const token = generateToken(user);
        res.status(201).json({ token });

    }
     catch (error:any) {

        if (!email) {
            res.status(400).json({ error: 'El email es requerido' });
        }
        if (!password) {
            res.status(400).json({ error: 'La contraseña es requerida' });
        }
        if (error?.code === 'P2002' && error?.meta?.target?.includes('email')) {
            res.status(400).json({ error: 'El email ya esta en uso' });
            
        }

        console.log(error);
        res.status(500).json({ error: 'Se produjo un error' });
    }

}

export const login = async (req: Request, res: Response) : Promise<void> => {
    
    const { email, password } = req.body;

    try {

        const user =  await prisma.findUnique({ where : {email} });
        if (!user) throw new Error('Usuario no encontrado');
        if (!password) throw new Error('La contrasenia es requerida');
        
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) throw new Error('Password invalida');

        const token = generateToken(user);
        res.status(200).json({ token });

    } catch (error) {
        res.status(401).json({ error: 'Credenciales invalidas' });
    }
}