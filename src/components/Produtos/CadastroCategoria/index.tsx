"use client";
import { useState } from "react";

export const CadastroCategoria = () => {
  const [nomeCategoria, setNomeCategoria] = useState("");
  const handleAddCategoria = () => {
    const res = fetch("/api/add-categoria", {method: "POST", headers: {
        "Content-Type": "application/json"
       }, 
       body: JSON.stringify(nomeCategoria)
    }).then(res => res.statusText === "OK")
    .then(() => window.location.reload())
  };
  return (
    <div className="flex gap-5">
      <input
        onChange={(e) => setNomeCategoria(e.target.value)}
        type="text"
        value={nomeCategoria}
        placeholder="Adocionar nova categoria"
        className="p-2 rounded-md"
      />
      <button onClick={handleAddCategoria} className="p-2 rounded-md bg-yellow-500 shadow-sm">
        Adicionar nova
      </button>
    </div>
  );
};
