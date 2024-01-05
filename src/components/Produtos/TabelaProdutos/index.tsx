"use client";
import { PencilSimple, SpinnerGap, X } from "@phosphor-icons/react";
import { useState } from "react";

interface Produto {
  id: number;
  nome: string;
  preco: number;
  categoria: string;
}
export const TabelaProdutos = ({ data, categoria }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [idCategoria, setIdCategoria] = useState({ id: 0, nome: "" });
  const [produtoAtualizado, setProdutoAtualizado] = useState({
    id: 1,
    nome: "",
    preco: "",
    categoria: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const openModal = (id) => {
    setProdutoAtualizado({ ...produtoAtualizado, id: id })
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  const modalClasses = isModalOpen
    ? "fixed inset-0 flex items-center justify-center z-50"
    : "hidden";
  const handleAlterarProduto = () => {
    setIsLoading(!isLoading);
    console.log(produtoAtualizado)
    const res = fetch("/api/atualizar-produto", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(produtoAtualizado),
    }).then((res) => (res.ok ? window.location.reload() : null));
  };
  const handleApagarProduto = (id) => {
    const res = fetch("/api/apagar-produto", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(id),
    }).then((res) => (res.ok ? window.location.reload() : null));
  };
  const format = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
  
  return (
    <div>
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 shadow-md">
        <thead className="text-sm text-gray-900 uppercase bg-slate-100">
          <tr>
            <th scope="col" className="px-6 py-3">
              Nome do Produto
            </th>
            <th scope="col" className="px-6 py-3">
              Preço
            </th>
            <th scope="col" className="px-6 py-3">
              Editar
            </th>
            <th scope="col" className="px-6 py-3">
              Excluir
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, i) => (
            <tr
              key={i}
              className="border-b hover:bg-slate-200  bg-slate-300 transition-all duration-200"
            >
              <th
                scope="row"
                className=" px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
              >
                {item.nome}
              </th>
              <td className="text-gray-800">
              {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(item.preco)}
              </td>
              <td id={item.id} className="px-6 py-4">
                <PencilSimple
                  onClick={() => openModal(item.id)}
                  className="text-gray-800 hover:cursor-pointer"
                  size={24}
                />
              </td>
              <td id={item.id} className="px-6 py-4">
                <X
                  onClick={() => handleApagarProduto(item.id)}
                  className="text-gray-800 hover:cursor-pointer"
                  size={24}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {isModalOpen && (
        <div className={modalClasses}>
          <div className="fixed inset-0 bg-black opacity-50"></div>
          <div className="bg-white p-4 rounded shadow-lg z-10">
            <div className="flex justify-end"></div>
            <div className="flex flex-col gap-3">
              <h2 className="font-medium ">Alterar Produto:</h2>
              <label htmlFor="nome">Nome do produto</label>
              <input name="nome" onChange={(e) => setProdutoAtualizado({ ...produtoAtualizado, nome: e.target.value })} className="p-2 bg-slate-300 rounded-md" />
              <label htmlFor="preço">Preço</label>
              <input
              onChange={(e) => setProdutoAtualizado({ ...produtoAtualizado, preco: e.target.value })}
                type="number"
                name="preço"
                className="p-2 bg-slate-300 rounded-md"
              />
              <label htmlFor="categoria">Categoria</label>
              <select onChange={(e) => setProdutoAtualizado({ ...produtoAtualizado, categoria: e.target.value })} className="bg-slate-300 p-2 rounded-md" name="categoria">
                {categoria.map((item, i) => (
                  <option key={i} className="p-2 bg-slate-300" value={item.nome}>
                    {item.nome}
                  </option>
                ))}
              </select>
              <div className="flex flex-col gap-4">
                <div className="flex gap-3">
                  {!isLoading ? (
                    <button
                      onClick={handleAlterarProduto}
                      className={`p-2 bg-green-500 hover:brightness-95 rounded-md`}
                    >
                      Alterar
                    </button>
                  ) : (
                    <button
                      disabled
                      type="button"
                      className="py-2.5 px-5 me-2 text-sm font-medium text-gray-900 bg-slate-300 rounded-lg border border-gray-200 hover:bg-gray-400 hover:text-blue-700 focus:z-10 focus:ring-4 focus:outline-none focus:ring-blue-700 focus:text-blue-700 inline-flex items-center"
                    >
                      <SpinnerGap
                        className="inline w-4 h-4 me-3 text-gray-200 animate-spin dark:text-gray-600"
                        size={32}
                      />
                      Carregando
                    </button>
                  )}
                  <button
                    className="p-2 bg-yellow-500 hover:brightness-95 rounded-md"
                    onClick={() => {
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
