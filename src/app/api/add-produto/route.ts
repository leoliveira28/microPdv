import { NextResponse } from "next/server";
import { PrismaClient } from "../../../../generated/client";
const prisma = new PrismaClient()
export async function POST(request) {
    const novoProduto = await request.json()
    try {
        const result = await prisma.produto.create({
            data: {
                nome: novoProduto.nome,
                categoria: novoProduto.categoria,
                preco: parseFloat(novoProduto.preco)
            }
        });
          return NextResponse.json({ success: true, data: result });

    } catch (error) {
        console.error("Erro ao criar produto:", error);
        return NextResponse.json({ success: false, error: "Erro ao criar produto" });
    }
}