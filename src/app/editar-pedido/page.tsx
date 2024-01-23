import { Navbar } from "@/components/Navbar"
import { PrismaClient } from "../../../generated/client"
import { MesasCaixa } from "@/components/MesaResumoCaixa"
import Link from "next/link"
const prisma = new PrismaClient()
const getMesas = async  () => {
    const mesas = await prisma.mesa.findMany({
        include: {
            pedidos: true
        }
    })
    return mesas
}
const Page = async () => {
    const data = await getMesas()
        return (
            <div className="flex sm:p-5 p-2">
            <Navbar />
          <div className="container mx-auto sm:p-2">
            <div className="flex flex-col gap-4 bg-slate-100 p-5 rounded-md">
              <h1 className="font-bold text-2xl text-gray-800">Editar Pedido</h1>
              <ul className="grid grid-cols-3 sm:gap-4 gap-2">
              {data.map((item) => (
                item.nome ?
                  <Link key={item.id} href={`/editar-pedido/${item.id}`}>
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
               :
               <Link key={item.id} href={`/editar-pedido/${item.id}`}>
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
            </ul>              <div className="flex flex-col gap-4">
              </div>
            </div>
          </div>
          </div>
    )
}

export default Page