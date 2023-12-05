/*
  Warnings:

  - Added the required column `comandaId` to the `Pedido` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Mesa" ADD COLUMN     "nome" TEXT;

-- AlterTable
ALTER TABLE "Pedido" ADD COLUMN     "comandaId" INTEGER NOT NULL;
