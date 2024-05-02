/*
  Warnings:

  - Added the required column `isFavorite` to the `UserBoard` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "UserBoard" ADD COLUMN     "isFavorite" BOOLEAN NOT NULL;
