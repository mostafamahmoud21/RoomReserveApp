import express from 'express';
import AuthController from '../controllers/auth.controller';
export const authRouter = express()

authRouter.post('/signup', AuthController.signup);
authRouter.post('/signin', AuthController.signin);