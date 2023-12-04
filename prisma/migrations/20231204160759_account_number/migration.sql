/*
  Warnings:

  - A unique constraint covering the columns `[accountNumber]` on the table `Account` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `accountNumber` to the `Account` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `type` on the `Account` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "AccountType" AS ENUM ('SAVINGS', 'CURRENT');

-- AlterTable
ALTER TABLE "Account" ADD COLUMN     "accountNumber" TEXT NOT NULL,
DROP COLUMN "type",
ADD COLUMN     "type" "AccountType" NOT NULL,
ALTER COLUMN "balance" SET DEFAULT 0;

-- CreateIndex
CREATE UNIQUE INDEX "Account_accountNumber_key" ON "Account"("accountNumber");
