/*
  Warnings:

  - You are about to drop the column `pedidoId` on the `PedidoEncerrado` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "PedidoEncerrado" DROP CONSTRAINT "PedidoEncerrado_pedidoId_fkey";

-- AlterTable
ALTER TABLE "Pedido" ADD COLUMN     "pedidoEncerradoId" INTEGER;

-- AlterTable
ALTER TABLE "PedidoEncerrado" DROP COLUMN "pedidoId";

-- AddForeignKey
ALTER TABLE "Pedido" ADD CONSTRAINT "Pedido_pedidoEncerradoId_fkey" FOREIGN KEY ("pedidoEncerradoId") REFERENCES "PedidoEncerrado"("id") ON DELETE SET NULL ON UPDATE CASCADE;
