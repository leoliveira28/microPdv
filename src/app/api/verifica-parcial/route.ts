import prisma from "../../../../lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request) {
    const mesaId = await request.json()
    try {
        const result = await prisma.mesa.findMany({
            where: {
              id: parseInt(mesaId),
            },
            // Select only the valorParcial field:
            select: {
              valorParcial: true,
            },
          });
          return NextResponse.json({ success: true, data: result });

    } catch (error) {
        console.error("Erro ao criar pedido:", error);
        return NextResponse.json({ success: false, error: "Erro ao procurar mesa" });
    }
}