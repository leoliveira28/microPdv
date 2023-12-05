import prisma from "../../../../lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const result = await prisma.pedidoEncerrado.findMany();
          return NextResponse.json({ success: true, data: result });

    } catch (error) {
        console.error("Erro ao localizar pedidos encerrados:", error);
        return NextResponse.json({ success: false, error: "Erro ao localizar pedidos encerrados" });
    }
}