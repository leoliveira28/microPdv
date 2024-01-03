

import { NextResponse } from "next/server";
import { PrismaClient } from "../../../../generated/client";
const prisma = new PrismaClient()
export async function POST(request) {
    const idCategoria = await request.json()
    try {
        const result = await prisma.categoria.delete({
            where: { id: idCategoria },
        });
          return NextResponse.json({ success: true, data: result });

    } catch (error) {
        console.error("Erro ao apagar categoria:", error);
        return NextResponse.json({ success: false, error: "Erro ao apagar categoria" });
    }
}