/*
  Warnings:

  - You are about to drop the column `createAt` on the `Todo` table. All the data in the column will be lost.
  - The required column `id` was added to the `Account` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - The required column `id` was added to the `Session` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- AlterTable
ALTER TABLE "Account" ADD COLUMN     "id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Session" ADD COLUMN     "id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Todo" DROP COLUMN "createAt",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
