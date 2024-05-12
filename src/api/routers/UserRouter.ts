import express from 'express';
import { signup, login, refreshToken } from '../controllers/userController.js';

const UserRouter = express.Router();

UserRouter.post('/signup', signup);
UserRouter.post('/login', login);
UserRouter.post('/refresh-token', refreshToken);


export default UserRouter;