import { NextResponse } from "next/server";
import { PrismaClient } from "../../../../generated/client";
const prisma = new PrismaClient()
export async function POST(request) {
  try {
    const pedidoEncerrado = await request.json();
    pedidoEncerrado.valor = parseFloat(pedidoEncerrado.valor);
    const mesaId = pedidoEncerrado.mesaId
    const result = await prisma.pedidoEncerrado.create({
      data: {
        mesaId: pedidoEncerrado.mesaId,
        valor: pedidoEncerrado.valor,
        formaPagamento: pedidoEncerrado.formaPagamento,
        data: pedidoEncerrado.data,
        pedidos: {
          create: pedidoEncerrado.pedidos.map(pedido => ({
            mesaId: pedido.mesaId,
            produtoId: pedido.produtoId,
            quantidade: pedido.quantidade,
          })),
        },
        
      },

    });
    await prisma.pedido.deleteMany({
      where: {
          mesaId: parseInt(mesaId),
      },
  });
  await prisma.valorParcial.deleteMany({
    where: {
      pedidoId: parseInt(mesaId),
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
