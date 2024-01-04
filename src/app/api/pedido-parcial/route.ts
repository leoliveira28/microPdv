import { NextResponse } from "next/server";
import { PrismaClient } from "../../../../generated/client";
const prisma = new PrismaClient()
export async function POST(request) {
  try {
    const pedidoParcial = await request.json();
    const result = await prisma.valorParcial.create({
      data: {
        pedidoId: pedidoParcial.mesaId,
        valor: pedidoParcial.valorParcial,
        updatedAt: new Date(),
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
