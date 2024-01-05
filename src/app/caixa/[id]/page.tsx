"use client";
import { Navbar } from "@/components/Navbar";
import Link from "next/link";
import { use, useEffect, useState } from "react";

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
interface ValorPago {
  valorParcial: ValorParcial[];
}

interface ValorParcial {
  id: number;
  valor: number;
  updatedAt: string;
  pedidoId: number;
}
const ConsumoMesa = ({ params }: { params: { id: string } }) => {
  const [totalConta, setTotalConta] = useState(0.0);
  const [pedido, setPedido] = useState<Pedido[]>();
  const [formaDePagamento, setFormaDePagamento] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [valorParcial, setValorParcial] = useState("");
  const [valorPago, setValorPago] = useState<ValorPago[]>();
  const [valorRecebido, setValorRecebido] = useState();
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
          body: JSON.stringify({ mesaId }),
        });
        const data = await response.json();
        setPedido(data.data);
      } catch (error) {
        console.error("Erro ao obter pedido:", error);
      }
    };
    const getParcial = async () => {
      const mesaId = params.id;
      const response = await fetch("/api/verifica-parcial", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(mesaId),
      });
      const data = await response.json();
      setValorPago(data.data);
      console.log();
      // console.log(valorPago)
    };
    getParcial();
    getPedido();
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
      pedidos: pedido,
    };

    closeModal();
    const result = await fetch("/api/fechar-mesa", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(pedidoEncerrado),
    });
    window.location.replace("/caixa");
  };
  const soma = valorPago?.map((valor) =>
    valor.valorParcial
      .map((item) => item.valor)
      .reduce((acumulador, valorAtual) => {
        return acumulador + valorAtual;
      }, 0)
  );

  const fecharMesaParcial = async (id) => {
    const pedidoParcial = {
      mesaId: parseInt(id),
      valorParcial: parseFloat(valorParcial),
      formaPagamento: "Parcial",
      data: new Date(),
    };
    const result = await fetch("/api/pedido-parcial", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(pedidoParcial),
    }).then((res) => (res.ok ? window.location.reload() : null));
  };
  const handleEexcluirComanda = async () => {
    const mesaId = parseInt(params.id);
    const result = await fetch("/api/excluir-comanda", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(mesaId),
    });
    window.location.replace("/caixa");
  };
  return (
    <div className="flex p-5">
      <Navbar />
      <div className="container mx-auto p-5">
        <div className="flex flex-col gap-4 bg-slate-200 p-5 rounded-md shadow-md">
          <h1 className="text-xl font-bold text-gray-800">
            Consumo Mesa / Comanda: {params.id}
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
          {valorPago && <strong>Valor Pago: R$ {soma}</strong>}
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
            <button
              onClick={handleEexcluirComanda}
              className="bg-red-500 font-medium text-md p-2 rounded-md text-gray-900 hover:brightness-90 transition-all"
            >
              Excluir
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
                    <option value="parcial">Parcial</option>
                  </select>
                  <strong>Total da mesa: R$ {totalConta}</strong>
                  {formaDePagamento === "parcial" ? (
                    <div className="flex flex-col gap-2">
                      <label htmlFor="parcial">Valor Parcial:</label>
                      <input
                        onChange={(e) => setValorParcial(e.target.value)}
                        name="parcial"
                        type="number"
                        className="p-2 bg-slate-200 rounded-md"
                      />
                      <button
                        className="p-2 bg-blue-500 hover:brightness-95 rounded-md"
                        onClick={() => fecharMesaParcial(params.id)}
                      >
                        Parcial
                      </button>
                    </div>
                  ) : null}

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
    </div>
  );
};

export default ConsumoMesa;
