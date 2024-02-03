import { NextResponse } from "next/server";
import { PrismaClient } from "../../../../generated/client";
const prisma = new PrismaClient()
export async function POST(req) {
    const mesaId = await req.json()
    try {
        const result = await prisma.mesa.findUnique({
            where: {
                id: parseInt(mesaId)
            }
        });
        // console.log(result)
          return NextResponse.json({ success: true, data: result });

    } catch (error) {
        console.error("Erro ao buscar comanda", error);
        return NextResponse.json({ success: false, error: "Erro ao procurar comanda" });
    }
}