export const dynamic = "force-dynamic"
"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

interface Produto {
  id: number;
  nome: string;
  preco: number;
}

interface Pedido {
  id: number;
  mesaId: number;
  produtoId: number;
  quantidade: number;
  produto: Produto;
}
const ConsumoMesa = ({ params }: { params: { id: string } }) => {
  const [totalConta, setTotalConta] = useState(0.0);
  const [pedido, setPedido] = useState<Pedido[]>();
  const [formaDePagamento, setFormaDePagamento] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  const modalClasses = isModalOpen
    ? "fixed inset-0 flex items-center justify-center z-50"
    : "hidden";

  useEffect(() => {
    const getPedido = async () => {
      try {
        const mesaId = parseInt(params.id);
        const response = await fetch("/api/consumo-mesa", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ mesaId }), // Make sure to stringify the object
        });

        const data = await response.json();
        setPedido(data.data);
      } catch (error) {
        console.error("Erro ao obter pedido:", error);
      }
    };
    if (pedido && pedido.length > 0) {
      const totalConta = pedido.reduce((total, item) => {
        return total + item.produto.preco * item.quantidade;
      }, 0);
    }
    getPedido();
    // Calculate totalConta whenever pedido changes
    if (pedido && pedido.length > 0) {
      const newTotalConta = pedido.reduce((total, item) => {
        return total + item.produto.preco * item.quantidade;
      }, 0);
      setTotalConta(newTotalConta);
    }
  }, [pedido]);

  const fecharMesa = async () => {
    const mesaId = parseInt(params.id);
    const pedidoEncerrado = {
      mesaId: mesaId,
      valor: totalConta,
      formaPagamento: formaDePagamento,
      data: new Date(),
       pedidos: pedido
    };
    closeModal();
    const result = await fetch("/api/fechar-mesa", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(pedidoEncerrado),
    });
    window.location.replace("/caixa")
  };

  return (
    <div className="container mx-auto p-5">
      <div className="flex flex-col gap-4 bg-slate-100 p-5 rounded-md">
        <h1 className="text-xl font-bold text-gray-800">
          Consumo Mesa: {params.id}
        </h1>
        <ul className="list-disc list-inside">
          {pedido &&
            pedido.map((item) => (
              <li key={item.id}>
                {item.produto.nome} - PREÇO {item.produto.preco} - QTDE:{" "}
                {item.quantidade}
              </li>
            ))}
        </ul>
        <strong>Total da mesa: R$ {totalConta}</strong>
        <div className="flex gap-4">
          <button
            onClick={openModal}
            className="bg-yellow-500 font-medium text-md p-2 rounded-md text-gray-900 hover:brightness-90 transition-all"
          >
            Ecencerrar Mesa
          </button>
          <button className="bg-green-500 font-medium text-md p-2 rounded-md text-gray-900 hover:brightness-90 transition-all">
            <Link href={"/caixa"}>Voltar</Link>
          </button>
        </div>
      </div>
      {isModalOpen && (
        <div className={modalClasses}>
          <div className="fixed inset-0 bg-black opacity-50"></div>
          <div className="bg-white p-4 rounded shadow-lg z-10">
            <div className="flex justify-end"></div>
            <div className="flex flex-col gap-3">
              <h2 className="text-lg font-medium">Resumo Mesa {params.id}</h2>
              <div className="flex flex-col gap-4">
                {pedido.map((item) => (
                  <li key={item.id}>
                    {item.produto.nome} - PREÇO {item.produto.preco} - QTDE:{" "}
                    {item.quantidade}
                  </li>
                ))}
                <select
                  onChange={(e) => setFormaDePagamento(e.target.value)}
                  className="bg-slate-100 p-2"
                  name="pagamento"
                >
                  <option value="null">Forma de pagamento:</option>
                  <option value="Pix">Pix</option>
                  <option value="Dinheiro">Dinheiro</option>
                  <option value="Débito">Débito</option>
                  <option value="Crédito">Crédito</option>
                </select>
                <strong>Total da mesa: R$ {totalConta}</strong>
                <div className="flex gap-3">
                  <button
                    className="p-2 bg-green-500 hover:brightness-95 rounded-md"
                    onClick={() =>
                      formaDePagamento === "" ? null : fecharMesa()
                    }
                  >
                    Encerrar
                  </button>
                  <button
                    className="p-2 bg-yellow-500 hover:brightness-95 rounded-md"
                    onClick={() => {
                      setFormaDePagamento("");
                      closeModal();
                    }}
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ConsumoMesa;
