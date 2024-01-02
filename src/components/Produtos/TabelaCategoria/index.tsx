"use client";

import { MagnifyingGlass, PencilSimple, X } from "@phosphor-icons/react";

const CategoryTable = ({ data }) => {
  return (
    <div className="flex flex-col gap-2">
<div className="relative overflow-x-auto shadow-md sm:rounded-lg">
    <div className="p-4 bg-white dark:bg-slate-500 flex items-center">
        <label htmlFor="table-search" className="sr-only">Pesquisar</label>
        <div className="relative mt-1">
            <div className="absolute inset-y-1 rtl:inset-r-0 -start-1 ps-3 pointer-events-none">
            <MagnifyingGlass className="text-slate-50" size={24} />
            </div>
            <input placeholder="Pesquisar" type="text" id="table-search" className="block pt-2 ps-10 text-base text-gray-100 border border-gray-100 rounded-lg w-80 bg-gray-500" />
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
            {data.map(
                (item, i) =>
            <tr key={i} className="border-b hover:bg-slate-200  bg-slate-300 transition-all duration-200">
                <th  scope="row" className=" px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                  {item.nome}
                </th>
                <td id={item.id} className="px-6 py-4">
                    <PencilSimple className="text-gray-800 hover:cursor-pointer" size={24}/>
                </td>
                <td id={item.id} className="px-6 py-4">
                    <X className="text-gray-800 hover:cursor-pointer"  size={24}/>
                </td>
                </tr>
            )}
        </tbody>
    </table>
    </div>
  );
};

export default CategoryTable;
