"use client";

import { useEffect, useState } from "react";

const PedidoComponent = ({ produtos, mesaId }) => {
  const enviarPedido = async () => {
    try {
      const data = Object.entries(quantidades).map(
        ([produtoId, quantidade]) => ({
          produtoId: parseInt(produtoId),
          quantidade: quantidade,
          mesaId: parseInt(mesaId),
        })
      );
      if (data.length === 0) {
        console.log("Nenhum produto no pedido.");
        return;
      }

      // Envia a solicitação para o backend
      await fetch("/api/add-pedido", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      console.log("Pedido enviado com sucesso!");
      setQuantidades({});
      window.location.replace("/");
    } catch (error) {
      console.error("Erro ao enviar pedido:", error);
    }
  };

  // Estado local para armazenar as quantidades dos produtos
  const [quantidades, setQuantidades] = useState({});
  // Função para lidar com alterações nas quantidades dos produtos
  const handleQuantidadeChange = (produtoId, quantidade) => {
    setQuantidades((prevQuantidades) => ({
      ...prevQuantidades,
      [produtoId]: quantidade,
    }));
  };
  const cerveja600 = produtos.filter(
    (produto) => produto.categoria === "CERVEJA 600ML"
  );
  const cerveja1L = produtos.filter(
    (produto) => produto.categoria === "CERVEJA LITRÃO"
  );
  const longNeck = produtos.filter(
    (produto) => produto.categoria === "LONG NECK"
  );
  const drinks = produtos.filter((produto) => produto.categoria === "DRINKS");
  const bebidas = produtos.filter((produto) => produto.categoria === "BEBIDAS");
  const porcao = produtos.filter((produto) => produto.categoria === "PORÇÃO");
  const tiraGosto = produtos.filter(
    (produto) => produto.categoria === "TIRA GOSTO"
  );
  const cervejaLata = produtos.filter(
    (produto) => produto.categoria === "CERVEJA LATA"
  );
  const espeto = produtos.filter((produto) => produto.categoria === "ESPETO");
  console.log(produtos)
  const dadosPorCategoria: { [key: string]: any[] } = {};
  produtos.forEach((produto) => {
    if (!dadosPorCategoria[produto.categoria]) {
      dadosPorCategoria[produto.categoria] = [];
    }
    dadosPorCategoria[produto.categoria].push(produto);
  });
  return (
    <div className="flex flex-col gap-5 bg-slate-100 sm:p-4 p-2">
      <h2 className="text-gray-900 font-medium text-2xl">Lista de Produtos</h2>
      <ul className="list-disc list-inside flex flex-col gap-6 ">
      <div>
      {Object.entries(dadosPorCategoria).map(([categoria, produtos]) => (
        <div className="flex flex-col gap-4" key={categoria}>
          <h2 className="text-xl font-bold">{categoria}</h2>
          {produtos.map((produto, i) => (
           <div
           key={i}
            className="flex hover:bg-slate-300 transition-all duration-500  justify-between"
          >
            <li className="font-medium" key={produto.id}>{produto.nome} - QTDE:</li>
            <input
              className="p-2 bg-slate-200 sm:w-1/3 w-[50px] h-[35px] font-bold  rounded-sm"
              type="number"
              value={quantidades[produto.id] || 0}
              onChange={(e) =>
                handleQuantidadeChange(produto.id, parseInt(e.target.value, 10))
              }
            />
                  </div>
            ))}

        </div>
      ))}
    </div>
        {/* <h2 className="text-xl font-bold">CERVEJA 600ML</h2>
        {cerveja600.map((produto) => (
          <div
            key={produto.id}
            className="flex hover:bg-slate-300 transition-all duration-500 items-center justify-between"
          >
            <li className="font-medium">{produto.nome} - QTDE:</li>
            <input
              className="p-2 bg-slate-200 sm:w-1/3 w-[50px] h-[35px] font-bold  rounded-sm"
              type="number"
              value={quantidades[produto.id] || 0}
              onChange={(e) =>
                handleQuantidadeChange(produto.id, parseInt(e.target.value, 10))
              }
            />
          </div>
        ))} */}
        {/* <h2 className="text-xl font-bold">CERVEJA LITRÃO</h2>
        {cerveja1L.map((produto) => (
          <div
            key={produto.id}
            className="flex hover:bg-slate-300 transition-all duration-500 items-center justify-between"
          >
            <li className="font-medium">{produto.nome} - QTDE:</li>
            <input
              className="p-2 bg-slate-200 sm:w-1/3 w-[50px] h-[35px] font-bold  rounded-sm"
              type="number"
              value={quantidades[produto.id] || 0}
              onChange={(e) =>
                handleQuantidadeChange(produto.id, parseInt(e.target.value, 10))
              }
            />
          </div>
        ))}
        <h2 className="text-xl font-bold">CERVEJA LATA</h2>

        {cervejaLata.map((produto) => (
          <div
            key={produto.id}
            className="flex hover:bg-slate-300 transition-all duration-500 items-center justify-between"
          >
            <li className="font-medium">{produto.nome} - QTDE:</li>
            <input
              className="p-2 bg-slate-200 sm:w-1/3 w-[50px] h-[35px] font-bold  rounded-sm"
              type="number"
              value={quantidades[produto.id] || 0}
              onChange={(e) =>
                handleQuantidadeChange(produto.id, parseInt(e.target.value, 10))
              }
            />
          </div>
        ))}
        <h2 className="text-xl font-bold">CERVEJA LONG NECK</h2>
        {longNeck.map((produto) => (
          <div
            key={produto.id}
            className="flex hover:bg-slate-300 transition-all duration-500 items-center justify-between"
          >
            <li className="font-medium">{produto.nome} - QTDE:</li>
            <input
              className="p-2 bg-slate-200 sm:w-1/3 w-[50px] h-[35px] font-bold  rounded-sm"
              type="number"
              value={quantidades[produto.id] || 0}
              onChange={(e) =>
                handleQuantidadeChange(produto.id, parseInt(e.target.value, 10))
              }
            />
          </div>
        ))}
        <h2 className="text-xl font-bold">DRINKS</h2>
        {drinks.map((produto) => (
          <div
            key={produto.id}
            className="flex hover:bg-slate-300 transition-all duration-500 items-center justify-between"
          >
            <li className="font-medium">{produto.nome} - QTDE:</li>
            <input
              className="p-2 bg-slate-200 sm:w-1/3 w-[50px] h-[35px] font-bold  rounded-sm"
              type="number"
              value={quantidades[produto.id] || 0}
              onChange={(e) =>
                handleQuantidadeChange(produto.id, parseInt(e.target.value, 10))
              }
            />
          </div>
        ))}
        <h2 className="text-xl font-bold">BEBIDAS</h2>
        {bebidas.map((produto) => (
          <div
            key={produto.id}
            className="flex hover:bg-slate-300 transition-all duration-500 items-center justify-between"
          >
            <li className="font-medium">{produto.nome} - QTDE:</li>
            <input
              className="p-2 bg-slate-200 sm:w-1/3 w-[50px] h-[35px] font-bold  rounded-sm"
              type="number"
              value={quantidades[produto.id] || 0}
              onChange={(e) =>
                handleQuantidadeChange(produto.id, parseInt(e.target.value, 10))
              }
            />
          </div>
        ))}
        <h2 className="text-xl font-bold">PORÇÃO</h2>
        {porcao.map((produto) => (
          <div
            key={produto.id}
            className="flex hover:bg-slate-300 transition-all duration-500 items-center justify-between"
          >
            <li className="font-medium">{produto.nome} - QTDE:</li>
            <input
              className="p-2 bg-slate-200 sm:w-1/3 w-[50px] h-[35px] font-bold  rounded-sm"
              type="number"
              value={quantidades[produto.id] || 0}
              onChange={(e) =>
                handleQuantidadeChange(produto.id, parseInt(e.target.value, 10))
              }
            />
          </div>
        ))}
        <h2 className="text-xl font-bold">TIRA GOSTO</h2>
        {tiraGosto.map((produto) => (
          <div
            key={produto.id}
            className="flex hover:bg-slate-300 transition-all duration-500 items-center justify-between"
          >
            <li className="font-medium">{produto.nome} - QTDE:</li>
            <input
              className="p-2 bg-slate-200 sm:w-1/3 w-[50px] h-[35px] font-bold  rounded-sm"
              type="number"
              value={quantidades[produto.id] || 0}
              onChange={(e) =>
                handleQuantidadeChange(produto.id, parseInt(e.target.value, 10))
              }
            />
          </div>
        ))}
        <h2 className="text-xl font-bold">ESPETOS</h2>
        {espeto.map((produto) => (
          <div
            key={produto.id}
            className="flex hover:bg-slate-300 transition-all duration-500 items-center justify-between"
          >
            <li className="font-medium">{produto.nome} - QTDE:</li>
            <input
              className="p-2 bg-slate-200 sm:w-1/3 w-[50px] h-[35px] font-bold  rounded-sm"
              type="number"
              value={quantidades[produto.id] || 0}
              onChange={(e) =>
                handleQuantidadeChange(produto.id, parseInt(e.target.value, 10))
              }
            />
          </div>
        ))} */}
      </ul>
      <div className="flex gap-4">
        <button
          className="p-1 bg-yellow-500 font-medium text-xl text-slate-800 rounded-md hover:brightness-95 transition-all duration-300"
          onClick={enviarPedido}
        >
          Enviar Pedido
        </button>
        <button
          className="p-1 bg-green-500 font-medium text-xl text-slate-800 rounded-md hover:brightness-95 transition-all duration-300"
          onClick={() => window.location.replace("/")}
        >
          Voltar
        </button>
      </div>
    </div>
  );
};

export default PedidoComponent;
