import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
const accesT = process.env.ACCESS_TOKEN_SECRET as string;;

declare global {
    namespace Express {
      interface Request {
        user?: any; 
      }
    }
  }

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  
  if (!authHeader) {
    return res.sendStatus(401); // Unauthorized
  }
  
  const token = authHeader.split(' ')[1] || null;
    
  if (!token) {
    return res.sendStatus(401); // Unauthorized
  }

  jwt.verify(token, accesT, (err, user) => {
    if (err) {
      return res.sendStatus(403); // Forbidden
    }
    req.user = user;
    next();
  });
};
