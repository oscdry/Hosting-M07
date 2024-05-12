import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { 
  getUserService, 
  getUserByIdService, 
  getUsersService, 
  createUserService, 
  updateUserService, 
  removeUserService 
} from '../../services/userService.js';
import type UserI from '../../types/UserI.js';
import { signupSchema, loginSchema } from '../models/userJoi.js';
import User from '../../models/User.js'; 
import dotenv from 'dotenv';
dotenv.config();


const refreshToken = (req: Request, res: Response) => {
  const refreshToken = req.headers['authorization']?.split(' ')[1];

  if (!refreshToken) {
      return res.status(401).json({ message: 'No se proporcionó el token de refresco.' });
  }
  const refresComp = process.env.REFRESH_TOKEN_SECRET as string;
  const accesT = process.env.ACCESS_TOKEN_SECRET as string;
  jwt.verify(refreshToken, refresComp, (err, decoded: any) => {
      if (err) {
          return res.status(403).json({ message: 'Token de refresco inválido.' });
      }

      const accessToken = jwt.sign({ userId: decoded.userId }, accesT, { expiresIn: '15m' });
      res.json({ accessToken });
  });
};




const login = async (req: Request, res: Response) => {
  try {
    const { error, value } = loginSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.message });
    }

    const { email, password } = value;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const accessToken = jwt.sign({ userId: user._id }, process.env.ACCESS_TOKEN_SECRET || "", { expiresIn: '15m' });

    const refreshToken = jwt.sign({ userId: user._id }, process.env.REFRESH_TOKEN_SECRET || "", { expiresIn: '1d' });

    res.status(200).json({ accessToken, refreshToken });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const signup = async (req: Request, res: Response) => {
    try {
      const { error, value } = signupSchema.validate(req.body);
      if (error) {
        return res.status(400).json({ message: error.message });
      }
  
      const { email, password } = value;
  
      const hashedPassword = await bcrypt.hash(password, 10);
  
      const user = new User({ email, password: hashedPassword });
      await user.save();
  
      res.status(201).json({ message: 'Usuario creado correctamente' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
const getUser = async (req: Request, res: Response) => {
  try {
    const user = await getUserService(req.query);
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

const getUserById = async (req: Request, res: Response) => {
  try {
    const user = await getUserByIdService(req.params.id);
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

const getUsers = async (req: Request, res: Response) => {
  try {
    const pagination = { skip: Number(req.query.skip) ||  0, limit: Number(req.query.limit) || 0};
    const users = await getUsersService(pagination);
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

const createUser = async (req: Request, res: Response) => {
  try {
    const userData: UserI = req.body;
    const user = await createUserService(userData);
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

const updateUser = async (req: Request, res: Response) => {
  try {
    const userData: UserI = req.body;
    const user = await updateUserService(userData);
    res.json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

const removeUser = async (req: Request, res: Response) => {
  try {
    const userId: string = req.params.id;
    const user = await removeUserService(userId);
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export { refreshToken, login, signup, getUser, getUserById, getUsers, createUser, updateUser, removeUser };
