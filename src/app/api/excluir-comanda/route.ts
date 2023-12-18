import { NextResponse } from "next/server";
import prisma from "../../../../lib/prisma";

export async function POST(request) {
  try {
    const mesaId = await request.json();
    const result = await prisma.mesa.delete({
        where: {
            id: parseInt(mesaId),
        },
    });
    return NextResponse.json({ success: true, data: result });
  } catch (error) {
    console.error("Erro ao excluir comanda:", error);
    return NextResponse.json({
      success: false,
      error: "Erro ao excluir comanda:",
    });
  }
}
