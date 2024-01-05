export const dynamic = 'force-dynamic';

import Link from "next/link";
import { PrismaClient } from "../../../generated/client";
import { MesasCaixa } from "@/components/MesaResumoCaixa";
import { Navbar } from "@/components/Navbar";
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
    <div className="flex p-5">
      <Navbar />
    <div className="container mx-auto p-5">
      <div className="flex flex-col gap-4 bg-slate-100 p-5 rounded-md">
        <h1 className="font-bold text-2xl text-gray-800">Caixa</h1>
        {/* <MesasCaixa data={comanda} /> */}
        <MesasCaixa data={mesa} />
        <div className="flex flex-col gap-4">
        </div>
      </div>
    </div>
    </div>
  );
};

export default Caixa;
