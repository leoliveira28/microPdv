"use client";
import { SpinnerGap } from "@phosphor-icons/react";
import { useState } from "react";

export const CadastroProduto = ({ categoria }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [novoProduto, setNovoProduto] = useState({
    id: 1,
    nome: "",
    preco: "",
    categoria: "",
  });
  const modalClasses = isModalOpen
  ? "fixed inset-0 flex items-center justify-center z-50"
  : "hidden";
  const closeModal = () => {
    setIsModalOpen(false);
  };
  const openModal = () => {
    setIsModalOpen(true);
  };
  const handleAddProduto = () => {
    setIsLoading(true)
    const res = fetch("/api/add-produto", {method: "POST", headers: {
        "Content-Type": "application/json"
       }, 
       body: JSON.stringify(novoProduto)
    }).then(res => res.statusText === "OK")
    .then(() => window.location.reload())
  };
  return (
    <div className="flex gap-5">
      <button onClick={openModal} className="p-2 rounded-md bg-yellow-500 shadow-sm">
        Adicionar novo
      </button>
      {isModalOpen && (
        <div className={modalClasses}>
          <div className="fixed inset-0 bg-black opacity-50"></div>
          <div className="bg-white p-4 rounded shadow-lg z-10">
            <div className="flex justify-end"></div>
            <div className="flex flex-col gap-3">
              <h2 className="font-medium ">Adicionar Produto:</h2>
              <label htmlFor="nome">Nome do produto</label>
              <input required name="nome" onChange={(e) => setNovoProduto({ ...novoProduto, nome: e.target.value })} className="p-2 bg-slate-300 rounded-md" />
              <label htmlFor="preço">Preço</label>
              <input
               onChange={(e) => setNovoProduto({ ...novoProduto, preco: e.target.value })}
                type="number"
                name="preço"
                className="p-2 bg-slate-300 rounded-md"
              />
              <label htmlFor="categoria">Categoria</label>
              <select onChange={(e) => setNovoProduto({ ...novoProduto, categoria: e.target.value })} className="bg-slate-300 p-2 rounded-md" name="categoria">
                <option value="">Selecionar</option>
                {categoria.map((item, i) => (
                  <option key={i} className="p-2 bg-slate-300" value={item.id}>
                    {item.nome}
                  </option>
                ))}
              </select>
              <div className="flex flex-col gap-4">
                <div className="flex gap-3">
                  {!isLoading ? (
                    <button
                      onClick={handleAddProduto}
                      className={`p-2 bg-green-500 hover:brightness-95 rounded-md`}
                    >
                      Adicionar
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
