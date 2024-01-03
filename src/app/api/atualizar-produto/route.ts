

import { NextResponse } from "next/server";
import { PrismaClient } from "../../../../generated/client";

const prisma = new PrismaClient()
export async function POST(request) {
    const produtoAtualizado = await request.json()
    try {
        const result = await prisma.produto.update({
            where: { id: produtoAtualizado.id },
            data: {
                nome: produtoAtualizado.nome,
                preco: parseInt(produtoAtualizado.preco),
                categoria: produtoAtualizado.categoria
            },
        });
          return NextResponse.json({ success: true, data: result });

    } catch (error) {
        console.error("Erro ao alterar categoria:", error);
        return NextResponse.json({ success: false, error: "Erro ao alterar categoria" });
    }
}