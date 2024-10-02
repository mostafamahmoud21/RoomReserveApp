import express, { Request ,Response} from 'express';
import {authMiddleware} from '../middlewares/auth.middleware';
import { AuthenticatedRequest, roleMiddleware } from '../middlewares/role.middleware';
import { RoleUser } from '../enums/user.enum';
export const roomRouter = express()

roomRouter.get('/rooms', authMiddleware,roleMiddleware(RoleUser.ADMIN),(req:AuthenticatedRequest,res:Response)=>{
res.json({msg:"welcome admin"})
});

