import { PrismaClient } from '@prisma/client';
import { ComparePassword, HashPassword } from '../utils/bcrypt';
import crypto from 'crypto';
import { sendMail } from '../utils/sendMail';

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

export const forgetPasswordServices = async (email: string) => {
  const user = await prisma.user.findUnique({
      where: { email }
  });

  if (!user) {
      throw new Error('User Not Found');
  }

  const resetToken = crypto.randomBytes(20).toString("hex");
  const reseTokenExpire = new Date(Date.now() + 1000 * 60 * 60 * 24); // Token valid for 24 hours

  await prisma.user.update({
      where: { id: user.id },
      data: { resetToken, reseTokenExpire }
  });

  const resetTokenURL = `http://localhost:3000/api/reset-password?token=${resetToken}`;
  await sendMail(email, 'Reset Password', `Click the link to reset your password: ${resetTokenURL}`);
};

export const resetPasswordServices = async (token: string, newPassword: string) => {
  const user = await prisma.user.findFirst({
    where: { resetToken: token, reseTokenExpire: { gte: new Date() } }
  });

  if (!user) {
    throw new Error('Invalid or expired token');
  }

  const hashedNewPassword = await HashPassword(newPassword)

  await prisma.user.update({
    where: { id: user.id },
    data: { password: hashedNewPassword, resetToken: null, reseTokenExpire: null }
  })
}