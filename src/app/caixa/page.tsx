export const dynamic = 'force-dynamic';

import Link from "next/link";
import { PrismaClient } from "../../../generated/client";
import { MesasCaixa } from "@/components/MesaResumoCaixa";
const prisma = new PrismaClient()
const getData = async () => {
  const result = await prisma.mesa.findMany({
    include: {
        pedidos: true,
    },
});
return result
}
async function getComanda() {
  const mesasComNome = await prisma.mesa.findMany({
    where: {
      nome: {
        not: null, 
      },
    },
  });

  return mesasComNome;
}
const Caixa = async () => {
  const mesa = await getData()
  const comanda = await getComanda()
  return (
    <div className="container mx-auto p-5">
      <div className="flex flex-col gap-4 bg-slate-100 p-5 rounded-md">
        <h1 className="font-bold text-2xl text-gray-800">Caixa</h1>
        <MesasCaixa data={comanda} />

        <MesasCaixa data={mesa} />
        <div className="flex flex-col gap-4">
          <Link href={"/caixa"}>
          <button
            className="p-1 bg-green-500 text-md w-1/3 rounded-md hover:brightness-95 transition-all duration-300"
          >
            Atualizar
          </button>
          </Link>
          <Link href={"/caixa/fechamento"}>
          <button className="p-1 bg-yellow-500 text-md w-1/3 rounded-md hover:brightness-95 transition-all duration-300">
            Resumo Caixa
          </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Caixa;
