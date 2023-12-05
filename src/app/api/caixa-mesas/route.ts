import prisma from "../../../../lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const result = await prisma.mesa.findMany({
            include: {
                pedidos: true,
            },
        });
          return NextResponse.json({ success: true, data: result });

    } catch (error) {
        console.error("Erro ao criar pedido:", error);
        return NextResponse.json({ success: false, error: "Erro ao procurar mesa" });
    }
}