import { Request, Response} from "express";
import { hashPassword } from "../services/password.service";
import prisma from "../models/user";

export const createUser = async (req: Request, res: Response) : Promise<void> => {
    try {
        const { email, password } = req.body;
        if (!email) throw new Error('El email es requerido');
        if (!password) throw new Error('La contrasenia es requerida');
        const hashedPassword = await hashPassword(password);
        const user = await prisma.create({
            data: {
                email,
                password: hashedPassword
            }
        });
        res.status(201).json(user);
    } catch (error:any) {
        
    }
};

export const getAllUsers = async (req: Request, res: Response) : Promise<void> => {
    try {
        const users = await prisma.findMany();
        res.status(200).json(users);
    } catch(error:any) {
        res.status(500).json({ error: 'Se produjo un error' });
    }
};

export const getUserById = async (req: Request, res: Response) : Promise<void> => {
    const userId = req.params.id;
    try {

        const user = await prisma.findUnique({
            where: {
                id: parseInt(userId)
            }
        });
        if (!user) {
            res.status(404).json({ error: 'Usuario no encontrado' });
        };
        res.status(200).json(user);
    }
    catch(error:any) {+
        res.status(500).json({ error: 'Se produjo un error' });
    }
};

export const updateUser = async (req: Request, res: Response) : Promise<void> => {
    const userId = req.params.id;
    const { email, password } = req.body;
    // intento traerme la contraseña si la cambia e intento hashearla
    try {
        let dataToUpdate: any = { ...req.body};
        // basciamente me traigo la password y se hashea
        if (password) {
            dataToUpdate.password = await hashPassword(password);
        }
        //mismo con mail
        if (email) {
            dataToUpdate.email = await email;
        }
        // busco para saber cual actualizar obvio
        const user = await prisma.findUnique({
            where: {
                id: parseInt(userId)
            }
    });
    if (!user) {
        res.status(404).json({ error: 'Usuario no encontrado' });
    }
} catch(error:any) {
    res.status(500).json({ error: 'Se produjo un error' });
}
};

export const deleteUser = async (req: Request, res: Response) : Promise<void> => {
    const userId = req.params.id;
    try {
        const user = await prisma.delete({
            where: {
                id: parseInt(userId)
            }
        });
        if (!user) {
            res.status(404).json({error : 'Usuario no encontrado'});
        }
        res.status(200).json();
    }
    catch(error:any) {
        res.status(500).json({ error: 'Se produjo un error'});
    }
};