import { Request, Response } from "express";
import { ComparePassword, HashPassword } from '../utils/bcrypt';
import { SignInServices, SignUpServices } from "../services/auth.service";

export const signUp = async (req: Request, res: Response) => {
    const { name, email, password } = req.body;
    try {
        const hashedPassword = await HashPassword(password);
        const newUser = await SignUpServices({ name, email, password: hashedPassword });

        // Generate a token for the new user

        return res.status(201).json({
            message: "SignUp successfully",
            user: { id: newUser.id, name: newUser.name, email: newUser.email },
        });
    } catch (error) {
        const errMsg = error instanceof Error ? error.message : String(error);
        if (errMsg === "Email already exists") {
            return res.status(400).json({ message: errMsg });
        }
        console.error(errMsg);
        return res.status(500).json({ message: "Internal server error" });
    }
};

export const signIn = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    try {
        const existUser = await SignInServices({ email, password });
        //const isPasswordCorrect = await ComparePassword(password, existUser.password);

        // if (!isPasswordCorrect) {
        //     return res.status(401).json({
        //         message: "Incorrect password",
        //     });
        // }

        // Generate a token for the user

        return res.status(200).json({
            message: "SignIn successfully",
            user: { id: existUser.id, name: existUser.name, email: existUser.email },
        });
    } catch (error) {
        const errMsg = error instanceof Error ? error.message : String(error);
        if (errMsg === "User Not Found") {
            return res.status(404).json({ message: errMsg });
        }
        if (errMsg === "Incorrect password") {
            return res.status(401).json({
                message: errMsg,
            });
        }
        console.error(errMsg);
        return res.status(500).json({ message: "Internal server error" });
    }
};
