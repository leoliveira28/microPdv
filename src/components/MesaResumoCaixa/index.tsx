import Link from "next/link"

interface MesaProps {
    id: number;
    numero: number;
    pedidos: PedidoProps[];
  }

  interface PedidoProps {
    id: number;
  }

export const MesasCaixa = ({ data }) => {
    return (
        <div className="flex flex-col gap-4 bg-slate-100 p-5 rounded-md">
             {data && (
          <div className="flex flex-col gap-4">
            <ul className="grid grid-cols-3 gap-4">
              {data.map((item) => (
                item.nome ?
                  <Link key={item.id} href={`/caixa/${item.id}`}>
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
               <Link key={item.id} href={`/caixa/${item.id}`}>
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
        )}
      </div>
    )
}