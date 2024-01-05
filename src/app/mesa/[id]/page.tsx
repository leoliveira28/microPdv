import PedidoComponent from "@/components/Pedido";
import prisma from "../../../../lib/prisma";

async function getProdutos() {
  const produtos = await prisma.produto.findMany({
    include: {
      categoria: true, // Include the related category data
    },
  });

  // Transform the result to return the name of the category instead of categoriaId
  const formattedProdutos = produtos.map((produto) => {
    return {
      id: produto.id,
      nome: produto.nome,
      preco: produto.preco,
      categoria: produto.categoria.nome, // Access the name property of the related category
    };
  });

  return formattedProdutos;
}

async function PedidoMesa({ params }: { params: { id: string } }) {
  const produtos = await getProdutos();

  return (
    <div className="container mx-auto sm:p-5 p-2">
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
