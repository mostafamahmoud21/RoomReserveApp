import { PrismaClient } from '@prisma/client';
import { ComparePassword, HashPassword } from '../utils/bcrypt';

const prisma = new PrismaClient();

export const changePasswordServices = async (userId: number, oldPassword: string, newPassword: string) => {

    const user = await prisma.user.findUnique({
    where: { id: userId }
  });

  if (!user) {
    throw new Error('User Not Found');
  }

  const isPasswordMatched = await ComparePassword(oldPassword, user.password);
  if (!isPasswordMatched) {
    throw new Error('Incorrect Password');
  }

  const hashedNewPassword = await HashPassword(newPassword);
  
  const updatedUser = await prisma.user.update({
    where: { id: userId },
    data: { password: hashedNewPassword }
  });

  return {
    message: 'Password changed successfully',
  };
};
