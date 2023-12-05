"use client"
import { useState } from "react";

export const AdicionarMesa = () => {
  const [mesa, setMesa] = useState("");
  const handleAdicionarMesa = () => {
    const result = fetch("/api/adicionar-mesa", {
       method: "POST",
       headers: {
        "Content-Type": "application/json"
       }, 
       body: JSON.stringify(mesa)
    })
    console.log(result)
  };
  return (
    <div>
      <input
        type="text"
        placeholder="Nome - Tel"
        className="bg-slate-100 p-2"
        onChange={(e) => setMesa(e.target.value)}
      />
      <button onClick={handleAdicionarMesa} className="p-2 bg-green-500 rounded-md text-slate-900">
        Adicionar
      </button>
    </div>
  );
};
