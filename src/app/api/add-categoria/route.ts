import { NextResponse } from "next/server";
import { PrismaClient } from "../../../../generated/client";
const prisma = new PrismaClient()
export async function POST(request) {
    const nomeCategoria = await request.json()
    try {
        const result = await prisma.categoria.create({
                data: {
                    nome: nomeCategoria,
                },
        });
          return NextResponse.json({ success: true, data: result });

    } catch (error) {
        console.error("Erro ao criar categoria:", error);
        return NextResponse.json({ success: false, error: "Erro ao criar categoria" });
    }
}