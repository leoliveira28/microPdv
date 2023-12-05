/*
  Warnings:

  - You are about to drop the column `comanda` on the `Mesa` table. All the data in the column will be lost.
  - Added the required column `comandaId` to the `Pedido` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Mesa" DROP COLUMN "comanda";

-- AlterTable
ALTER TABLE "Pedido" ADD COLUMN     "comandaId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "Comanda" (
    "id" SERIAL NOT NULL,
    "comandaNome" TEXT NOT NULL,
    "status" TEXT,

    CONSTRAINT "Comanda_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Pedido" ADD CONSTRAINT "Pedido_comandaId_fkey" FOREIGN KEY ("comandaId") REFERENCES "Comanda"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
