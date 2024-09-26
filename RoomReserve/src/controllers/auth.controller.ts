import { Request, Response } from "express";
import AuthServices from "../services/auth.service";
class AuthController {
    async signup(req: Request, res: Response) {
        try {
            const { name, email, password } = req.body
            const user = await AuthServices.signup({ name, email, password })
            res.status(201).json(user)
        } catch (error) {
            const errMsg = error instanceof Error ? error.message : String(error)
            res.status(500).json({ error: errMsg });
        }
    }

    async signin(req: Request, res: Response) {
        try {
            const { email, password } = req.body
            const user = await AuthServices.signin({ email, password })
            res.status(200).json({ msg: "login successfully" })
        } catch (error) {
            const errMsg = error instanceof Error ? error.message : "unknown erron"
            res.status(500).json({ error: errMsg });
        }
    }
}

export default new AuthController