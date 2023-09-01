/*
  Warnings:

  - Added the required column `number` to the `Container` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Container" ADD COLUMN     "number" INTEGER NOT NULL;
