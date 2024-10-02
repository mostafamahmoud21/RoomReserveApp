import express from 'express';
import { changePassword } from '../controllers/passwordManagement.controller';
import { authMiddleware } from '../middlewares/auth.middleware';
import { changePasswordValidator } from '../validations/passwordManagement.validation';

export const passwordManagementRouter = express()

passwordManagementRouter.post('/change-password',authMiddleware,changePasswordValidator,changePassword)