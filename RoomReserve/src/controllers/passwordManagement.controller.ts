import { Request, Response } from "express";
import { changePasswordServices } from '../services/passwordManagement.service'
import { DecodedToken } from "../middlewares/auth.middleware";

export const changePassword = async (req: Request & { user?: DecodedToken }, res: Response) => {
    try {
        const { oldPassword, newPassword } = req.body
        if (!req.user || !req.user.id) {
            return res.status(401).json({ message: 'Unauthorized: User not authenticated' });
        }

        const userId = req.user.id
        const user = await changePasswordServices(userId, oldPassword, newPassword)
        res.status(200).json(user)
    } catch (error) {
        res.status(500).json({ message: (error as Error).message || "Internal server error" })
    }
}

export const forgetPassword = async (req: Request, res: Response) => {

}