/*
  Warnings:

  - You are about to drop the column `parcialId` on the `Pedido` table. All the data in the column will be lost.
  - Added the required column `pedidoId` to the `ValorParcial` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Pedido" DROP CONSTRAINT "Pedido_parcialId_fkey";

-- AlterTable
ALTER TABLE "Pedido" DROP COLUMN "parcialId";

-- AlterTable
ALTER TABLE "ValorParcial" ADD COLUMN     "pedidoId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "ValorParcial" ADD CONSTRAINT "ValorParcial_pedidoId_fkey" FOREIGN KEY ("pedidoId") REFERENCES "Pedido"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
