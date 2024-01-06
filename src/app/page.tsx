export const dynamic = "force-dynamic"
import Link from "next/link";
import { PrismaClient } from "../../generated/client";
import { AdicionarMesa } from "@/components/CriarMesa";
import { Navbar } from "@/components/Navbar";
const prisma = new PrismaClient();
async function getMesa() {
  const mesa = await prisma.mesa.findMany({
    include: {
      pedidos: true,
    },
  });
  return mesa;
}
async function getComanda() {
  const mesasComNome = await prisma.mesa.findMany({
    where: {
      nome: {
        not: null,
      },
    },
    include: {
      pedidos: true,
    },
  });

  return mesasComNome;
}

export default async function Home() {
  const mesas = await getMesa();
  const comanda = await getComanda()
  return (
    <div className="flex sm:p-5 p-2">
      <div className="hidden sm:block">
      <Navbar />
      </div>
    <div className="container mx-auto sm:p-5 p-2">
      <div className="flex flex-col gap-4 bg-slate-100 sm:p-5 p-2 rounded-md">
        <h1 className="text-2xl font-bold text-gray-800">Adicionar Pedidos</h1>
        <div className="flex flex-col gap-4">
          <ul className="grid grid-cols-3 sm:gap-4 gap-2">
            {comanda.map((item) => (
              <Link key={item.id} href={`/mesa/${item.id}`}>
                <li
                  className={`sm:p-4 p-3 rounded-lg sm:text-lg text-base text-center font-medium flex justify-center ${
                    item.pedidos && item.pedidos.length > 0
                      ? "bg-yellow-200"
                      : "bg-green-200"
                  }`}
                  key={item.id}
                >
                  Comanda: {item.nome}
                </li>
              </Link>
            ))}
            {mesas.map((item) => (
              item.nome ? null :
              <Link key={item.id} href={`/mesa/${item.id}`}>
                <li
                  className={`p-4 rounded-lg sm:text-lg text-base text-center font-medium flex justify-center ${
                    item.pedidos && item.pedidos.length > 0
                      ? "bg-yellow-200"
                      : "bg-green-200"
                  }`}
                  key={item.id}
                >
                  Mesa: {item.numero}
                </li>
              </Link>
            ))}
          </ul>
        </div>
        <AdicionarMesa />
        <div></div>
      </div>
    </div>
    </div>
  );
}
