import express from 'express';
import { changePassword, forgetPassword, resetPassword } from '../controllers/passwordManagement.controller';
import { authMiddleware } from '../middlewares/auth.middleware';
import { changePasswordValidator, forgetPasswordValidator, resetPasswordValidator } from '../validations/passwordManagement.validation';

export const passwordManagementRouter = express()

passwordManagementRouter.post('/change-password', authMiddleware, changePasswordValidator, changePassword)
passwordManagementRouter.post('/forget-password', forgetPasswordValidator, forgetPassword)
passwordManagementRouter.post('/reset-password', resetPasswordValidator, resetPassword)
