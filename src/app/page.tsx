export const dynamic = "force-dynamic"
import Link from "next/link";
import { PrismaClient } from "../../generated/client";
import { AdicionarMesa } from "@/components/CriarMesa";
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
  console.log(mesas)
  const comanda = await getComanda()
  return (
    <div className="container mx-auto p-5">
      <div className="flex flex-col gap-4 bg-slate-100 p-5 rounded-md">
        <h1 className="text-2xl font-bold text-gray-800">Adicionar Pedidos</h1>
        <div className="flex flex-col gap-4">
          <ul className="grid grid-cols-3 gap-4"></ul>
          <ul className="grid grid-cols-3 gap-4">
            {comanda.map((item) => (
              <Link key={item.id} href={`/mesa/${item.id}`}>
                <li
                  className={`p-4 rounded-lg text-lg font-medium flex justify-center ${
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
                  className={`p-4 rounded-lg text-lg font-medium flex justify-center ${
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
  );
}
