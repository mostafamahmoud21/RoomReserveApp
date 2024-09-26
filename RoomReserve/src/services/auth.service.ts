import { PrismaClient } from '@prisma/client';
import { ComparePassword, HashPassword } from '../utils/bcrypt';
import { IUserRegister ,IUserLogin} from '../interfaces/auth';

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
        return await prisma.user.create({
            data: {
                name, email, password: hashPassword
            }
        })
    }
async signin({email,password}:IUserLogin){
    // * check if email not found
    const existUser = await prisma.user.findUnique({
        where: {
            email,
        }
    })
    if (!existUser) {
        throw new Error('User Not Found')
    }
    // * compare password
    const matchPassword=await ComparePassword(password,existUser.password)
    if(!matchPassword){
        throw new Error('Invalid Email or Password')
    }
    // * generate token 
    
}

}

export default new AuthServices