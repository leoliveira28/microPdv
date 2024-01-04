-- DropForeignKey
ALTER TABLE "Pedido" DROP CONSTRAINT "Pedido_parcialId_fkey";

-- AlterTable
ALTER TABLE "Pedido" ALTER COLUMN "parcialId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Pedido" ADD CONSTRAINT "Pedido_parcialId_fkey" FOREIGN KEY ("parcialId") REFERENCES "ValorParcial"("id") ON DELETE SET NULL ON UPDATE CASCADE;
