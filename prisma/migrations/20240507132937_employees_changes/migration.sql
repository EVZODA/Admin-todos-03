/*
  Warnings:

  - Added the required column `hola` to the `Employee` table without a default value. This is not possible if the table is not empty.
  - The required column `id` was added to the `Employee` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- AlterTable
ALTER TABLE "Employee" ADD COLUMN     "hola" TEXT NOT NULL,
ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "Employee_pkey" PRIMARY KEY ("id");
