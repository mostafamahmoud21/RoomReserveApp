// import { PrismaClient } from '@prisma/client';
// import { createUserDto, updateUserDto } from '../dtos/dto.users';

// const prisma = new PrismaClient()

// export const getAllUsers = async () => {
//     return await prisma.user.findMany()
// }

// export const deleteUser = async (id: number) => {
//     return await prisma.user.delete({
//         where: {
//             id,
//         }
//     })
// }

// export const addNewUser = async (user: createUserDto) => {

//     const existEmail = await prisma.user.findUnique({
//         where: {
//             email: user.email
//         }
//     })

//     if (existEmail) {
//         throw new Error('Email already exists');
//     }
    
//     return await prisma.user.create({
//         data: user,
//     })
// }

// export const updateUserById = async ({ data, id }: { data: updateUserDto, id: number }) => {
//     return await prisma.user.update({
//         data,
//         where: {
//             id,
//         }
//     })
// }
