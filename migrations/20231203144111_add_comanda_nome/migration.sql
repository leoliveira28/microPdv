/*
  Warnings:

  - Added the required column `comandaNome` to the `Comanda` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Comanda" ADD COLUMN     "comandaNome" TEXT NOT NULL;
