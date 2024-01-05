

import { NextResponse } from "next/server";
import { PrismaClient } from "../../../../generated/client";
const prisma = new PrismaClient()
export async function POST(request) {
    const idProduto = await request.json()
    try {
        const result = await prisma.produto.delete({
            where: { id: idProduto },
        });
          return NextResponse.json({ success: true, data: result });

    } catch (error) {
        console.error("Erro ao apagar Produto:", error);
        return NextResponse.json({ success: false, error: "Erro ao apagar Produto" });
    }
}