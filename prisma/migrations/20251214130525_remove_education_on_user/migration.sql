/*
  Warnings:

  - You are about to drop the column `current_education` on the `User` table. All the data in the column will be lost.
  - Added the required column `current_education` to the `UserVerification` table without a default value. This is not possible if the table is not empty.
  - Made the column `identity_url` on table `UserVerification` required. This step will fail if there are existing NULL values in that column.
  - Made the column `full_name` on table `UserVerification` required. This step will fail if there are existing NULL values in that column.
  - Made the column `date_of_birth` on table `UserVerification` required. This step will fail if there are existing NULL values in that column.
  - Made the column `address` on table `UserVerification` required. This step will fail if there are existing NULL values in that column.
  - Made the column `residential_address` on table `UserVerification` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "current_education";

-- AlterTable
ALTER TABLE "UserVerification" ADD COLUMN     "current_education" TEXT NOT NULL,
ALTER COLUMN "identity_url" SET NOT NULL,
ALTER COLUMN "full_name" SET NOT NULL,
ALTER COLUMN "date_of_birth" SET NOT NULL,
ALTER COLUMN "address" SET NOT NULL,
ALTER COLUMN "residential_address" SET NOT NULL;
