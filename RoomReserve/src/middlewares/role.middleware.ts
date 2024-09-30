import { User } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import { RoleUser } from "../enums/user.enum";

export interface AuthenticatedRequest extends Request {
  user?: User;
}

export const roleMiddleware = (role: RoleUser) => {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    if (req.user?.role !== role) {
      return res.status(403).json({ message: "Forbidden" });
    }
    next();
  };
};