"use client";
import {
  Bank,
  Cardholder,
  CaretDoubleRight,
  CaretLeft,
  MapTrifold,
  Package,
  PencilSimpleLine,
  Receipt,
  SquaresFour,
} from "@phosphor-icons/react";
import Link from "next/link";
import { useState } from "react";

export const Navbar = () => {
  const [trigger, setTrigger] = useState(true);
  return (
    <div className={`${trigger ? "mx-14" : ""} transition-all duration-200`}>
      <Link href={""} onClick={() => setTrigger(!trigger)}>
        <strong>Abrir Menu</strong>
        <CaretDoubleRight size={32} />
      </Link>
      <aside
        className={`bg-gray-400 p-5 h-screen rounded-md shadow-md fixed top-0 bottom-0 w-[200px] ${
          !trigger ? "-left-60" : "left-0"
        } transition-all duration-300 `}
      >
        <nav>
          <ul className="flex flex-col gap-5 text-slate-100">
            <li>
              <Link className="flex items-center gap-5" href={"/"}>
                <MapTrifold size={24} />
                Mesas
              </Link>
            </li>
            <li>
              <Link className="flex items-center gap-5" href={"/caixa"}>
                <Cardholder size={24} />
                Caixa
              </Link>
            </li>
            <li>
              <Link className="flex items-center gap-5" href={"/editar-pedido"}>
                <PencilSimpleLine size={24} /> Editar Pedido
              </Link>
            </li>
            <li>
              <Link
                className="flex items-center gap-5"
                href={"/caixa/fechamento"}
              >
                <Receipt size={24} />
                Fechamento
              </Link>
            </li>
            <li>
              <Link className="flex items-center gap-5" href={"/categoria"}>
                <SquaresFour size={24} />
                Categorias
              </Link>
            </li>
            <li>
              <Link className="flex items-center gap-5" href={"/produtos"}>
                <Package size={24} />
                Produtos
              </Link>
            </li>
            <li>
              <Link className="flex items-center gap-5" href={""}>
                <CaretLeft size={24} />
                <button onClick={() => setTrigger(!trigger)}>
                  Fechar
                </button>{" "}
              </Link>
            </li>
          </ul>
        </nav>
      </aside>
    </div>
  );
};
