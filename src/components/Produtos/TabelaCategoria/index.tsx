"use client";

import {
  CircleNotch,
  MagnifyingGlass,
  PencilSimple,
  SpinnerGap,
  X,
} from "@phosphor-icons/react";
import { useState } from "react";

const CategoryTable = ({ data }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [idCategoria, setIdCategoria] = useState({ id: 0, nome: "" });
  const [novaCategoria, setNovaCategoria] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const openModal = (id) => {
    setIsModalOpen(true);
    const nomeCategoria = data.find((item) => item.id === id);
    setIdCategoria(nomeCategoria);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  const modalClasses = isModalOpen
    ? "fixed inset-0 flex items-center justify-center z-50"
    : "hidden";

  const handleAlterarCategoria = () => {
    setIsLoading(!isLoading)
    const dataCategoria = {
      id: idCategoria.id,
      nome: novaCategoria,
    };
    setIsLoading(!isLoading);
    console.log(dataCategoria);
    const res = fetch("/api/altera-categoria", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataCategoria),
    }).then((res) => res.ok ? window.location.reload() : null)
  };
  const handleApagarCategoria = (id) => {
    const res = fetch("/api/apaga-categoria", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(id),
    }).then((res) => res.ok ? window.location.reload() : null)
  }
  return (
    <div className="flex flex-col gap-2">
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <div className="p-4 bg-white dark:bg-slate-500 flex items-center">
          <label htmlFor="table-search" className="sr-only">
            Pesquisar
          </label>
          <div className="relative mt-1">
            <div className="absolute inset-y-1 rtl:inset-r-0 -start-1 ps-3 pointer-events-none">
              <MagnifyingGlass className="text-slate-50" size={24} />
            </div>
            <input
              placeholder="Pesquisar"
              type="text"
              id="table-search"
              className="block pt-2 ps-10 text-base text-gray-100 border border-gray-100 rounded-lg w-80 bg-gray-500"
            />
          </div>
        </div>
      </div>
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 shadow-md">
        <thead className="text-sm text-gray-900 uppercase bg-slate-100">
          <tr>
            <th scope="col" className="px-6 py-3">
              Nome da Categoria
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
              <td id={item.id} className="px-6 py-4">
                <PencilSimple
                  onClick={() => openModal(item.id)}
                  className="text-gray-800 hover:cursor-pointer"
                  size={24}
                />
              </td>
              <td id={item.id} className="px-6 py-4">
                <X onClick={() => handleApagarCategoria(item.id)} className="text-gray-800 hover:cursor-pointer" size={24} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {
        //INICIO MODAL
      }
      {isModalOpen && (
        <div className={modalClasses}>
          <div className="fixed inset-0 bg-black opacity-50"></div>
          <div className="bg-white p-4 rounded shadow-lg z-10">
            <div className="flex justify-end"></div>
            <div className="flex flex-col gap-3">
              <h2 className="font-medium ">Alterar categoria:</h2>
              <input
                className="p-2 bg-slate-300 rounded-md"
                onChange={(e) => setNovaCategoria(e.target.value)}
              />
              <div className="flex flex-col gap-4">
                <div className="flex gap-3">
                  {!isLoading ? (
                    <button
                      onClick={handleAlterarCategoria}
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

export default CategoryTable;
