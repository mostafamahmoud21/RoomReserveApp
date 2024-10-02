import express from 'express';
import AuthController from '../controllers/auth.controller';
import { signInValidator, signUpValidator } from '../validations/auth.validation';
export const authRouter = express()

authRouter.post('/signup', signUpValidator, AuthController.signup);
authRouter.post('/signin', signInValidator, AuthController.signin);