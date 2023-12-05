/*
  Warnings:

  - You are about to drop the `Comanda` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PedidoComanda` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "PedidoComanda" DROP CONSTRAINT "PedidoComanda_comandaId_fkey";

-- DropForeignKey
ALTER TABLE "PedidoComanda" DROP CONSTRAINT "PedidoComanda_produtoId_fkey";

-- DropTable
DROP TABLE "Comanda";

-- DropTable
DROP TABLE "PedidoComanda";
