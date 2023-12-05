import { NextResponse } from "next/server";
import prisma from "../../../../lib/prisma";

export async function POST(request) {
  try {
    const pedidosData = await request.json();

    const result = await prisma.pedido.createMany({
      data: Array.isArray(pedidosData) ? 
        pedidosData.map(({ produtoId, quantidade, mesaId }) => ({
          produtoId,
          quantidade,
          mesaId,
        })) : 
        [{
          produtoId: pedidosData.produtoId,
          quantidade: pedidosData.quantidade,
          mesaId: pedidosData.mesaId,
        }],
    });

    console.log("Pedidos criados:", result);

    return NextResponse.json({ success: true, data: result });
  } catch (error) {
    console.error("Erro ao criar pedidos:", error);
    return NextResponse.json({ success: false, error: "Erro ao criar pedidos" });
  }
}
