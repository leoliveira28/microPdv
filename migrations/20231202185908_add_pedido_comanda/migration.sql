/*
  Warnings:

  - You are about to drop the column `comandaId` on the `Pedido` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Pedido" DROP CONSTRAINT "Pedido_comandaId_fkey";

-- AlterTable
ALTER TABLE "Pedido" DROP COLUMN "comandaId";

-- CreateTable
CREATE TABLE "PedidoComanda" (
    "id" SERIAL NOT NULL,
    "produtoId" INTEGER NOT NULL,
    "quantidade" INTEGER NOT NULL,
    "pedidoEncerradoId" INTEGER,
    "comandaId" INTEGER NOT NULL,

    CONSTRAINT "PedidoComanda_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "PedidoComanda" ADD CONSTRAINT "PedidoComanda_comandaId_fkey" FOREIGN KEY ("comandaId") REFERENCES "Comanda"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PedidoComanda" ADD CONSTRAINT "PedidoComanda_pedidoEncerradoId_fkey" FOREIGN KEY ("pedidoEncerradoId") REFERENCES "PedidoEncerrado"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PedidoComanda" ADD CONSTRAINT "PedidoComanda_produtoId_fkey" FOREIGN KEY ("produtoId") REFERENCES "Produto"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
