-- AlterTable
ALTER TABLE "users" ADD COLUMN     "reseTokenExpire" TIMESTAMP(3),
ADD COLUMN     "resetToken" TEXT;
