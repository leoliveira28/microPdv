import { NextResponse } from "next/server";
import { PrismaClient } from "../../../../generated/client";
const prisma = new PrismaClient()
export async function POST(request) {
    const mesa = await request.json()
    const quantidadeMesa = await prisma.mesa.findMany()
    const numeroMesa = quantidadeMesa.length + 1
    try {
        const result = await prisma.mesa.create({
                data: {
                    nome: mesa,
                    numero: numeroMesa,
                    status: ''
                },
        });
          return NextResponse.json({ success: true, data: result });

    } catch (error) {
        console.error("Erro ao criar mesa:", error);
        return NextResponse.json({ success: false, error: "Erro ao criar mesa" });
    }
}