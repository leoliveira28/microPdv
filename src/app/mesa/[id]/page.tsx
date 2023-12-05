import PedidoComponent from "@/components/Pedido";
import prisma from "../../../../lib/prisma";

async function getProdutos() {
  const produtos = await prisma.produto.findMany();
  return produtos;
}

async function PedidoMesa({ params }: { params: { id: string } }) {
  const produtos = await getProdutos();

  return (
    <div className="container mx-auto p-5">
      <div className="flex flex-col gap-5">
      <h1 className="font-bold text-gray-900 text-2xl">Pedido mesa {params.id}</h1>
        <div className="flex flex-col gap-4">
            <PedidoComponent produtos={produtos} mesaId={params.id} />
        <div>
        </div>
      </div>
      </div>
    </div>
  );
}

export default PedidoMesa;
