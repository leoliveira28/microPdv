/*
  Warnings:

  - You are about to drop the column `comandaNome` on the `Comanda` table. All the data in the column will be lost.
  - You are about to drop the column `pedidoEncerradoId` on the `PedidoComanda` table. All the data in the column will be lost.
  - Made the column `status` on table `Comanda` required. This step will fail if there are existing NULL values in that column.
  - Made the column `mesaId` on table `PedidoEncerrado` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "PedidoComanda" DROP CONSTRAINT "PedidoComanda_pedidoEncerradoId_fkey";

-- AlterTable
ALTER TABLE "Comanda" DROP COLUMN "comandaNome",
ADD COLUMN     "data" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "formaPagamento" TEXT NOT NULL DEFAULT 'default_value',
ADD COLUMN     "valor" DOUBLE PRECISION NOT NULL DEFAULT 0.0,
ALTER COLUMN "status" SET NOT NULL;

-- AlterTable
ALTER TABLE "PedidoComanda" DROP COLUMN "pedidoEncerradoId",
ADD COLUMN     "data" TIMESTAMP(3),
ADD COLUMN     "formaDePagamento" TEXT,
ADD COLUMN     "status" TEXT;

-- AlterTable
ALTER TABLE "PedidoEncerrado" ALTER COLUMN "mesaId" SET NOT NULL;
