import Link from "next/link"

interface MesaProps {
    id: number;
    numero: number;
    pedidos: PedidoProps[];
  }

  interface PedidoProps {
    id: number;
  }

export const ComandaCaixa = ({ data }) => {
    return (
        <div className="flex flex-col gap-4 bg-slate-100 p-5 rounded-md">
             {data && (
          <div className="flex flex-col gap-4">
            <ul className="grid grid-cols-3 gap-4">
              {data.map((item) => (
                  <Link key={item.id} href={`/caixa/comanda/${item.id}`}>
                  <li
                    className={`p-4 rounded-lg text-lg font-medium flex justify-center ${
                      item.formaPagamento === "Pago"
                        ? "bg-green-200"
                        : "bg-yellow-200"
                    }`}
                    key={item.id}
                  >
                    Comanda: {item.comandaNome}
                  </li>
                </Link>

              ))}
            </ul>
          </div>
        )}
      </div>
    )
}