-- DropForeignKey
ALTER TABLE "ValorParcial" DROP CONSTRAINT "ValorParcial_pedidoId_fkey";

-- AddForeignKey
ALTER TABLE "ValorParcial" ADD CONSTRAINT "ValorParcial_pedidoId_fkey" FOREIGN KEY ("pedidoId") REFERENCES "Mesa"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
