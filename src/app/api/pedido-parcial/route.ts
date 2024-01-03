import { NextResponse } from "next/server";
import { PrismaClient } from "../../../../generated/client";
const prisma = new PrismaClient()
export async function POST(request) {
  try {
    const pedidoParcial = await request.json();
    const result = await prisma.pedidoEncerrado.create({
      data: {
        mesaId: pedidoParcial.mesaId,
        valorParcial: pedidoParcial.valorParcial,
        formaPagamento: pedidoParcial.formaPagamento,
        data: new Date(),
      },

    });
    return NextResponse.json({ success: true, data: result });
  } catch (error) {
    console.error("Erro ao encerrar pedido:", error);
    return NextResponse.json({
      success: false,
      error: "Erro ao encerrar pedido",
    });
  }
}
