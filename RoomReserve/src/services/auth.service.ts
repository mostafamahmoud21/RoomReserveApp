import { PrismaClient } from '@prisma/client';
import { ComparePassword, HashPassword } from '../utils/bcrypt';
import { IUserRegister, IUserLogin } from '../interfaces/auth';
import { generateToken } from '../utils/jwt';

const prisma = new PrismaClient()

class AuthServices {
    async signup({ name, email, password }: IUserRegister) {
        const existUser = await prisma.user.findUnique({
            where: {
                email,
            }
        })
        if (existUser) {
            throw new Error('Email already exists')
        }


        const hashPassword = await HashPassword(password)
        const newUser = await prisma.user.create({
            data: {
                name, email, password: hashPassword
            }
        })
        const { password: _, ...resUserProperties } = newUser
        return { resUserProperties }
    }


    async signin({ email, password }: IUserLogin) {
        // Check if email exists
        const existUser = await prisma.user.findUnique({
            where: { email }
        });

        if (!existUser) {
            throw new Error('User Not Found');
        }

        // Compare password
        const matchPassword = await ComparePassword(password, existUser.password);
        if (!matchPassword) {
            throw new Error('Invalid Email or Password');
        }

        // Generate token
        const token = await generateToken({userId:existUser.id,email:existUser.email,role:existUser.role});

        // Respond with token and basic user info
        const { password: _, ...resUserProperties } = existUser
        return { token, resUserProperties }
    }


}

export default new AuthServices