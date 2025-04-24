/*
  Warnings:

  - You are about to drop the column `updatedAt` on the `Todo` table. All the data in the column will be lost.
  - Added the required column `updateAt` to the `Todo` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Todo" DROP COLUMN "updatedAt",
ADD COLUMN     "updateAt" TIMESTAMP(3) NOT NULL;
