"use client"
import { useState } from "react";

export const AdicionarMesa = () => {
  const [mesa, setMesa] = useState("");
  const [loading, setLoading] = useState(false)
  const handleAdicionarMesa = () => {
    setLoading(!loading)
    const result = fetch("/api/adicionar-mesa", {
       method: "POST",
       headers: {
        "Content-Type": "application/json"
       }, 
       body: JSON.stringify(mesa)
    }).then(res => res.statusText === "OK").then(() => window.location.reload())
  };
  return (
    <div className="flex flex-col gap-5 w-72">
      <input
        type="text"
        placeholder="Nome - Tel"
        className="bg-slate-200 p-2"
        onChange={(e) => setMesa(e.target.value)}
      />
 <button
      onClick={handleAdicionarMesa}
      className={`p-2 rounded-md ${
        loading ? 'bg-gray-500 cursor-not-allowed' : 'bg-green-500'
      } text-slate-900`}
      disabled={loading}
    >
      {loading ? 'Carregando...' : 'Adicionar'}
    </button>
    </div>
  );
};
