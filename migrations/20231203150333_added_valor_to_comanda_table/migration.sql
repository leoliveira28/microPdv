-- AlterTable
ALTER TABLE "PedidoComanda" ADD COLUMN     "valor" DOUBLE PRECISION,
ALTER COLUMN "quantidade" DROP NOT NULL;
