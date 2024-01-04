import { NextResponse } from "next/server";
import prisma from "../../../../lib/prisma";

export async function POST(request) {
    try {
        const  {mesaId}  = await request.json();
        const result = await prisma.pedido.findMany({
            where: {
                mesaId: parseInt(mesaId),
            },
            include: {
                produto: true,
                
            },
        });
     return NextResponse.json({ success: true, data: result });
    } catch (error) {
        console.error("Erro ao criar pedido:", error);
        return NextResponse.json({ success: false, error: "Erro ao procurar mesa" });
    }
}
