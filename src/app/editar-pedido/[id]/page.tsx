import { Navbar } from "@/components/Navbar";
import { PrismaClient } from "../../../../generated/client";
import Produtos from "@/app/categoria/page";
import { DeletarPedido } from "@/components/DeletarPedido";
const prisma = new PrismaClient();

const getPedido = async (id) => {
  const mesa = await prisma.mesa.findUnique({
    where: {
      id: parseInt(id),
    },
    include: {
      pedidos: {
        include: {
          produto: true, // Inclui as informações do produto associado a cada pedido
        },
      },
    },
  });
  return mesa;
};

const Page = async ({ params }: { params: { id: string } }) => {
  const pedido = await getPedido(params.id);
  const produtos = pedido.pedidos.map((item) => item.produto);

  return (
    <div className="flex sm:p-5 p-2">
      <Navbar />
      <div className="container mx-auto sm:p-2">
        <div className="flex flex-col gap-4 bg-slate-100 p-5 rounded-md shadow-xl drop-shadow-xl">
          <h1 className="font-bold text-2xl text-gray-800">
            Editar Pedido: Mesa/Comanda {params.id}
          </h1>
          <div>
            <div className="flex flex-col gap-4 sm:w-1/2 p-5">
              {pedido.pedidos.map((item, i) => (
                <div key={i} className="flex gap-4 justify-between border-b-2">
                  <p key={i}>
                    ID pedido {item.id} {item.produto.nome}
                  </p>
                  <p>
                    Quantidade {item.quantidade}
                  </p>
                  <DeletarPedido id={item.id} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
