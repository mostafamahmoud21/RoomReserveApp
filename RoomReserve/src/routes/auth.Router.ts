import express from 'express';
import { signIn, signUp } from '../controllers/auth.controller';
import {validation} from '../middlewares/validations'
import { signInSchema, signUpSchema } from '../validations/auth.validation';
export const authRouter=express()

authRouter.post('/signup', validation(signUpSchema), signUp);
authRouter.post('/signin', validation(signInSchema), signIn);