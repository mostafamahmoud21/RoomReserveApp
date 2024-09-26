import { PrismaClient } from '@prisma/client';
import { createNewUserDto, signIn } from '../dtos/dto.auth';
import { ComparePassword } from '../utils/bcrypt';

const prisma = new PrismaClient()

export const SignUpServices = async (user: createNewUserDto) => {

    const existEmail = await prisma.user.findUnique({
        where: {
            email: user.email
        }
    })

    if (existEmail) {
        throw new Error('Email already exists');
    }

    return await prisma.user.create({
        data: user,
    })
}

export const SignInServices = async (user: signIn) => {

    const existEmail = await prisma.user.findUnique({
        where: {
            email: user.email
        }
    })

    if (!existEmail) {
        throw new Error('User Not Found');
    }
    
    const isPasswordCorrect = await ComparePassword(user.password, existEmail.password);
    if (!isPasswordCorrect) {
        throw new Error('Incorrect password');
    }
    return existEmail
}