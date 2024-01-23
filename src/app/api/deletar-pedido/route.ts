

import { NextResponse } from "next/server";
import { PrismaClient } from "../../../../generated/client";
const prisma = new PrismaClient()
export async function POST(request) {
    const idPedido = await request.json()
    try {
        const result = await prisma.pedido.delete({
            where: { id: idPedido },
        });
          return NextResponse.json({ success: true, data: result });

    } catch (error) {
        console.error("Erro ao apagar Pedido:", error);
        return NextResponse.json({ success: false, error: "Erro ao apagar Pedido" });
    }
}